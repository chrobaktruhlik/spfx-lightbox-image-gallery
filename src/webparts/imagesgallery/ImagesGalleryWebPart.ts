import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType, DisplayMode } from '@microsoft/sp-core-library';
import { ThemeProvider, IReadonlyTheme, ThemeChangedEventArgs } from '@microsoft/sp-component-base';
import {
    IPropertyPaneConfiguration,
    PropertyPaneDropdown,
    PropertyPaneChoiceGroup
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { isEqual, isEmpty } from '@microsoft/sp-lodash-subset';

import { sp } from "@pnp/pnpjs";
import * as strings from 'ImagesGalleryWebPartStrings';
import { ImagesGalleryContainer, IImagesGalleryContainerProps } from './components/ImagesGalleryContainer';
import { IDataService } from '../../models/IDataService';
import DataService from '../../services/DataService';
import { IImagesGalleryWebPartProps } from './IImagesGalleryWebPartProps';
import { IListInfo } from '@pnp/sp/lists';
import { PropertyPaneHelpers } from '@pnp/spfx-property-controls/lib/helpers';

export default class ImagesGalleryWebPart extends BaseClientSideWebPart<IImagesGalleryWebPartProps> {
    private _dataService: IDataService;
    private _placeholder = null;
    private _themeProvider: ThemeProvider;
    private _themeVariant: IReadonlyTheme;
    private _initComplete = false;
    private _availableLists: IListInfo[] = [];

    // // The locales variable lists all languages supported by SharePoint Online:
    // // https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/localize-web-parts
    // private locales = {
    //     1029: 'cs-CZ',
    //     1033: 'en-US',
    //     1051: 'sk-SK',
    // };

    // private getLocaleId(localeName: string): number {                                            // Get the LCID from the locale name
    //     const pos: number = (Object as any).values(this.locales).indexOf(localeName);
    //     if (pos > -1) {
    //         return parseInt(Object.keys(this.locales)[pos]);
    //     }
    //     else {
    //         return 0;
    //     }
    // }

    // private getLocaleName(localeId: number): string {                                            // Get locale name from the LCID
    //     const pos: number = Object.keys(this.locales).indexOf(localeId.toString());
    //     if (pos > -1) {
    //         return (Object as any).values(this.locales)[pos];
    //     }
    //     else {
    //         return '';
    //     }
    // }

    public async render(): Promise<void> {
        if (!this._initComplete) {
            return;
        }

        if (this.displayMode === DisplayMode.Edit) {
            const { Placeholder } = await import(
                /* webpackChunkName: 'search-property-pane' */
                '@pnp/spfx-controls-react/lib/Placeholder'
            );
            this._placeholder = Placeholder;
        }

        this.renderCompleted();
    }

    protected get isRenderAsync(): boolean {
        return true;
    }

    protected renderCompleted(): void {
        super.renderCompleted();
        let renderElement = null;

        if (this._isWebPartConfigured()) {
            renderElement = React.createElement(
                ImagesGalleryContainer,
                {
                    imageLibraryRootFolderTitle: this.properties.imageLibratyRootFolderTitle,         // Document Library Root Title
                    imageLibraryRootFolderUniqueId: this.properties.imageLibraryRootFolderUniqueId,   // Document Library Root Id
                    rootUrl: this.context.pageContext.web.serverRelativeUrl,
                    themeVariant: this._themeVariant,
                    dataService: this._dataService,
                    displayMode: this.displayMode,
                    webPartTitle: this.properties.webPartTitle,                                       // Sample text that is created when scaffolding your web part.
                    updateWebPartTitle: (value: string) => {
                        this.properties.webPartTitle = value;
                    }
                } as IImagesGalleryContainerProps
            );
        } else {
            if (this.displayMode === DisplayMode.Edit) {                                              // Create WebPart
                // this.properties.webPartTitle = "WebPart title";  // Replace default webPartTitle text
                const placeholder: React.ReactElement<any> = React.createElement(
                    this._placeholder,
                    {
                        iconText: strings.WebPartPlaceholderName,                                     // "Configure your web part"
                        description: strings.WebPartPlaceholderDescription,                           // "Please configure the web part."
                        onConfigure: () => { this._setupWebPart(); }
                    }
                );
                renderElement = placeholder;
            } else {
                renderElement = React.createElement('div', null);
            }
        }

        ReactDom.render(renderElement, this.domElement);
    }

    public async onInit(): Promise<void> {
        this._initThemeVariant();
        this._dataService = new DataService();

        sp.setup({
            spfxContext: this.context
        });

        this._initComplete = true;

        return super.onInit();

    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected get dataVersion(): Version {                                                            // @ts-ignore
        return Version.parse("1.0");
    }

    protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {  // This API is invoked after updating the new value of the property in the property bag.
        if (propertyPath === "imageLibraryRootFolderUniqueId") {
            // Save custom WebPart property 'imageLibraryRootFolderTitle'
            this.properties.imageLibratyRootFolderTitle = this._availableLists.filter(value => { return value.RootFolder.UniqueId == this.properties.imageLibraryRootFolderUniqueId; })[0].Title;
        }
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPanePageHeaderDescription
                    },
                    groups: [
                        {
                            groupFields: [
                                PropertyPaneDropdown("imageLibraryRootFolderUniqueId", {
                                    label: strings.ImageLibraryRootFolderUniqueIdLabel,
                                    options: this._availableLists.map((listitem, i) => {
                                        return {
                                            key: listitem.RootFolder.UniqueId,
                                            text: listitem.Title,
                                            index: i
                                        };
                                    })
                                }),
                            ]
                        },
                        {
                            groupFields: [
                                PropertyPaneChoiceGroup('textOrImageType', {
                                    label: 'Zoradiť zložky podľa:',
                                    options: [
                                        {
                                            key: 'Txxxx',
                                            text: 'Času uverejnenia',
                                            checked: true
                                        },
                                        {
                                            key: 'Yxxxxx',
                                            text: 'Názvu',
                                        }
                                    ]
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    }

    protected async loadPropertyPaneResources(): Promise<void> {                                      // Showing a spinner while loading the property pane
        PropertyPaneHelpers.setSpinner();
        this._availableLists = await this._dataService.getLists();                                    // Code load resources - get lists of document/picture library
        PropertyPaneHelpers.clearSpinner(200);
    }

    private _isWebPartConfigured(): boolean {                                                         // Testing if WebPart has been configured
        return !isEmpty(this.properties.imageLibraryRootFolderUniqueId);
    }

    private _initThemeVariant(): void {
        // Consume the new ThemeProvider service
        this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

        // If it exists, get the theme variant
        this._themeVariant = this._themeProvider.tryGetTheme();

        // Register a handler to be notified if the theme variant changes
        this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent.bind(this));
    }

    private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
        if (!isEqual(this._themeVariant, args.theme)) {
            this._themeVariant = args.theme;
            this.render();
        }
    }

    private _setupWebPart() {
        this.context.propertyPane.open();
    }
}