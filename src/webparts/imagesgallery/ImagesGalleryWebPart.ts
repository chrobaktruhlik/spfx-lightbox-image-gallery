import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import { ThemeProvider, IReadonlyTheme, ThemeChangedEventArgs } from '@microsoft/sp-component-base';
import {
    IPropertyPaneConfiguration,
    PropertyPaneChoiceGroup,
    PropertyPaneDropdown,
    IPropertyPaneDropdownOption
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
                    imageLibraryRootFolderTitle: this.properties.imageLibraryRootFolderTitle,          // Document Library Root Title
                    imageLibraryRootFolderUniqueId: this.properties.imageLibraryRootFolderUniqueId,    // Document Library Root Id
                    imageLibraryFoldersOrderBy: this.properties.imageLibraryFoldersOrderBy,            // Document Library folders order by logic
                    imageLibraryFilesOrderBy: this.properties.imageLibraryFilesOrderBy,                // Folders in files order by logic
                    rootUrl: this.context.pageContext.web.serverRelativeUrl,
                    themeVariant: this._themeVariant,
                    dataService: this._dataService,
                    displayMode: this.displayMode,
                    webPartTitle: this.properties.webPartTitle,                                        // Sample text that is created when scaffolding your web part.
                    updateWebPartTitle: (value: string) => {
                        this.properties.webPartTitle = value;
                    }
                } as IImagesGalleryContainerProps
            );

        } else {
            if (this.displayMode === DisplayMode.Edit) {                                               // Create WebPart
                // this.properties.webPartTitle = "WebPart title";  // Replace default webPartTitle text
                const placeholder: React.ReactElement<any> = React.createElement(
                    this._placeholder,
                    {
                        iconName: 'Settings',
                        iconText: strings.WebPartPlaceholderName,                                      // "Configure your web part"
                        description: strings.WebPartPlaceholderDescription,                            // "Please configure the web part."
                        // onConfigure: () => { this._setupWebPart(); }
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

    // The value of this property is stored in the serialized data of the web part to allow developers to manage versioning of their web part. The default version is 1.0
    protected get dataVersion(): Version {                                                             // @ts-ignore
        return Version.parse("1.0");
    }


    // This API is invoked after updating the new value of the property in the property bag.
    protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
        if (propertyPath === "imageLibraryRootFolderUniqueId") {
            // Save custom WebPart property 'imageLibraryRootFolderTitle'
            this.properties.imageLibraryRootFolderTitle = this._availableLists.filter(element => { return element.key == newValue; })[0].text;
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
