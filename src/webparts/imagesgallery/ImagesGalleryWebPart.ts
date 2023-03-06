import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import { ThemeProvider, IReadonlyTheme, ThemeChangedEventArgs } from '@microsoft/sp-component-base';
import {
    IPropertyPaneConfiguration,
    PropertyPaneChoiceGroup,
    PropertyPaneDropdown,
<<<<<<< HEAD
    IPropertyPaneDropdownOption
=======
    PropertyPaneChoiceGroup
>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c
} from '@microsoft/sp-property-pane';

import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { isEqual, isEmpty } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/pnpjs";
import * as strings from 'ImagesGalleryWebPartStrings';
import { ImagesGalleryContainer, IImagesGalleryContainerProps } from './components/ImagesGalleryContainer';
import { IDataService } from '../../models/IDataService';
import DataService from '../../services/DataService';
import { IImagesGalleryWebPartProps } from './IImagesGalleryWebPartProps';
import { PropertyPaneHelpers } from '@pnp/spfx-property-controls/lib/helpers';                         // Spinner


export default class ImagesGalleryWebPart extends BaseClientSideWebPart<IImagesGalleryWebPartProps> {

    private _availableLists: IPropertyPaneDropdownOption[] = [];
    private _dataService: IDataService;
    private _placeholder = null;
    private _themeProvider: ThemeProvider;
    private _themeVariant: IReadonlyTheme;
    private _initComplete = false;
<<<<<<< HEAD
=======
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
>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c

    
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

        // Default Choice Folders order by: FolderNameASC, FolderNameDESC, FolderTimeASC, FolderTimeDESC
        this.properties.imageLibraryFoldersOrderBy = this.properties.imageLibraryFoldersOrderBy || "FolderNameASC";
         // Default Choice Files order by: FileNameASC, FileNameDESC, FileTimeASC, FileTimeDESC
        this.properties.imageLibraryFilesOrderBy = this.properties.imageLibraryFilesOrderBy || "FileNameASC";


        this.renderCompleted();
    }

    protected get isRenderAsync(): boolean {
        return true;
    }

    protected renderCompleted(): void {
        // super.renderCompleted();
        let renderElement = null;

        if (this._isWebPartConfigured()) {
            renderElement = React.createElement(
                ImagesGalleryContainer,
                {
<<<<<<< HEAD
                    imageLibraryRootFolderTitle: this.properties.imageLibraryRootFolderTitle,          // Document Library Root Title
                    imageLibraryRootFolderUniqueId: this.properties.imageLibraryRootFolderUniqueId,    // Document Library Root Id
                    imageLibraryFoldersOrderBy: this.properties.imageLibraryFoldersOrderBy,            // Document Library folders order by logic
                    imageLibraryFilesOrderBy: this.properties.imageLibraryFilesOrderBy,                // Folders in files order by logic
=======
                    imageLibraryRootFolderTitle: this.properties.imageLibratyRootFolderTitle,         // Document Library Root Title
                    imageLibraryRootFolderUniqueId: this.properties.imageLibraryRootFolderUniqueId,   // Document Library Root Id
>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c
                    rootUrl: this.context.pageContext.web.serverRelativeUrl,
                    themeVariant: this._themeVariant,
                    dataService: this._dataService,
                    displayMode: this.displayMode,
<<<<<<< HEAD
                    webPartTitle: this.properties.webPartTitle,                                        // Sample text that is created when scaffolding your web part.
=======
                    webPartTitle: this.properties.webPartTitle,                                       // Sample text that is created when scaffolding your web part.
>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c
                    updateWebPartTitle: (value: string) => {
                        this.properties.webPartTitle = value;
                    }
                } as IImagesGalleryContainerProps
            );

        } else {
<<<<<<< HEAD
            if (this.displayMode === DisplayMode.Edit) {                                               // Create WebPart
=======
            if (this.displayMode === DisplayMode.Edit) {                                              // Create WebPart
>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c
                // this.properties.webPartTitle = "WebPart title";  // Replace default webPartTitle text
                const placeholder: React.ReactElement<any> = React.createElement(
                    this._placeholder,
                    {
<<<<<<< HEAD
                        iconName: 'Settings',
                        iconText: strings.WebPartPlaceholderName,                                      // "Configure your web part"
                        description: strings.WebPartPlaceholderDescription,                            // "Please configure the web part."
                        // onConfigure: () => { this._setupWebPart(); }
=======
                        iconText: strings.WebPartPlaceholderName,                                     // "Configure your web part"
                        description: strings.WebPartPlaceholderDescription,                           // "Please configure the web part."
                        onConfigure: () => { this._setupWebPart(); }
>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c
                    }
                );
                renderElement = placeholder;

            } else {
                renderElement = React.createElement('div', null);
            }
        }

        ReactDom.render(renderElement, this.domElement);
        super.renderCompleted();
    }

    // This event method is called when the web part is initialized.
    public async onInit(): Promise<void> {
        this._initThemeVariant();
        this._dataService = new DataService();

        sp.setup({
            spfxContext: this.context
        });

        this._initComplete = true;

        return super.onInit();

    }

    // This API is called at the end of the web part lifecycle on a page.
    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

<<<<<<< HEAD
    // The value of this property is stored in the serialized data of the web part to allow developers to manage versioning of their web part. The default version is 1.0
    protected get dataVersion(): Version {                                                             // @ts-ignore
        return Version.parse("1.0");
    }


    // This API is invoked after updating the new value of the property in the property bag.
    protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
        if (propertyPath === "imageLibraryRootFolderUniqueId") {
            // Save custom WebPart property 'imageLibraryRootFolderTitle'
            this.properties.imageLibraryRootFolderTitle = this._availableLists.filter(element => { return element.key == newValue; })[0].text;
=======
    protected get dataVersion(): Version {                                                            // @ts-ignore
        return Version.parse("1.0");
    }

    protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {  // This API is invoked after updating the new value of the property in the property bag.
        if (propertyPath === "imageLibraryRootFolderUniqueId") {
            // Save custom WebPart property 'imageLibraryRootFolderTitle'
            this.properties.imageLibratyRootFolderTitle = this._availableLists.filter(value => { return value.RootFolder.UniqueId == this.properties.imageLibraryRootFolderUniqueId; })[0].Title;
>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c
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
<<<<<<< HEAD
                                PropertyPaneDropdown("imageLibraryRootFolderUniqueId", {               // Dropdown menu: Select Document Library
                                    label: strings.ImageLibraryRootFolderUniqueIdLabel,
                                    options: this._availableLists
                                })
                            ]
                        },
                        {
                            groupName: strings.PropertyPaneGroupViewOptionsName,                       // View options
                            groupFields: [
                                
                                PropertyPaneDropdown("imageLibraryFoldersOrderBy", {
                                    label: strings.ImageLibraryFoldersOrderByLabel,
                                    options: [
                                        {
                                            key: 'FolderNameASC',                                      // By alphabet - normal
                                            text: strings.ImageLibraryOrderByNameASC
                                        },
                                        {
                                            key: 'FolderNameDESC',                                     // By alphabet in reverse mode
                                            text: strings.ImageLibraryOrderByNameDESC
                                        },
                                        {
                                            key: 'FolderTimeDESC',                                     // By time - from newest to oldest
                                            text: strings.ImageLibraryOrderByTimeDESC
                                        },
                                        {
                                            key: 'FolderTimeASC',                                      // By time - from oldest to newest
                                            text: strings.ImageLibraryOrderByTimeASC
                                        }
                                    ]
                                }),
                                PropertyPaneDropdown('imageLibraryFilesOrderBy', {                     // Choice: Files/Images in folder order by
                                    label: strings.ImageLibraryFilesOrderByLabel,
                                    options: [
                                        {
                                            key: 'FileNameASC',                                        // By alphabet - normal
                                            text: strings.ImageLibraryOrderByNameASC
                                        },
                                        {
                                            key: 'FileNameDESC',                                       // By alphabet in reverse mode
                                            text: strings.ImageLibraryOrderByNameDESC
                                        },
                                        {
                                            key: 'FileTimeDESC',                                       // By time - from newest to oldest
                                            text: strings.ImageLibraryOrderByTimeDESC
                                        },
                                        {
                                            key: 'FileTimeASC',                                        // By time - from oldest to newest
                                            text: strings.ImageLibraryOrderByTimeASC
=======
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
>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c
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

<<<<<<< HEAD
    
    // This method is called before any property pane APIs are called. Other property pane APIs cannot be called until this promise is resolved.
    protected async loadPropertyPaneResources(): Promise<void> {                                      

        PropertyPaneHelpers.setSpinner();                                                              // Showing a spinner while loading the property pane
        // Get Document Library root folders for PropertyPane DropDownMenu
        let lists = await sp.web.lists.select("Title", "BaseTemplate", "RootFolder").filter("Hidden ne true").orderBy("Title").expand('RootFolder').get();
        lists = lists.filter(item => item["BaseTemplate"] === 109 || item["BaseTemplate"] === 101);    // 101 = Document Library, 109 = Picture Library
        
        lists.forEach(element => {
            this._availableLists.push({ key: element.RootFolder.UniqueId, text: element.Title });
        });

        PropertyPaneHelpers.clearSpinner(200);
    }

    private _isWebPartConfigured(): boolean {                                                          // Testing if WebPart has been configured
=======
    protected async loadPropertyPaneResources(): Promise<void> {                                      // Showing a spinner while loading the property pane
        PropertyPaneHelpers.setSpinner();
        this._availableLists = await this._dataService.getLists();                                    // Code load resources - get lists of document/picture library
        PropertyPaneHelpers.clearSpinner(200);
    }

    private _isWebPartConfigured(): boolean {                                                         // Testing if WebPart has been configured
>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c
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

    // private _setupWebPart() {
    //     this.context.propertyPane.open();
    // }

}
