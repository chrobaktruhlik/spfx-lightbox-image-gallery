import * as React from 'react';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'ImagesGalleryWebPartStrings';
import styles from '../ImagesGalleryWebPart.module.scss';

import { IImagesGalleryContainerProps } from './IImagesGalleryContainerProps';
import { IImagesGalleryContainerState } from './IImagesGalleryContainerState';

import { isEqual, isEmpty, findIndex } from "@microsoft/sp-lodash-subset";
import { Icon } from '@fluentui/react/lib/Icon';

import {
    Spinner,
    SpinnerSize,
    MessageBar,
    MessageBarType,
    Breadcrumb,
    IBreadcrumbItem,
    Overlay,
    ITheme,
    IDividerAsProps
} from "office-ui-fabric-react";

import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

import ImageList from '../ImageList/ImageList';
import { IFolderInfo } from '@pnp/sp/folders';
import FolderList from '../FolderList/FolderList';


export class ImagesGalleryContainer extends React.Component<IImagesGalleryContainerProps, IImagesGalleryContainerState> {

    constructor(props: IImagesGalleryContainerProps) {
        super(props);

        this.state = {
            hasError: false,
            areResultsLoading: false,
            errorMessage: '',
            folderData: {
                folder: null,
                files: [],
                subFolders: []
            },
            breadCrumb: [],
        };
    }

    public async componentDidMount() {
        await this._fetchDocumentLibraryItems(this.props.imageLibraryRootFolderUniqueId, true);
    }

    public async componentDidUpdate(prevProps: IImagesGalleryContainerProps, prevState: IImagesGalleryContainerState) {
        if (!isEqual(this.props, prevProps)) {
            await this._fetchDocumentLibraryItems(this.props.imageLibraryRootFolderUniqueId, true);
        }
    }

    public render(): React.ReactElement<IImagesGalleryContainerProps> {
        const areResultsLoading = this.state.areResultsLoading;
        const hasError = this.state.hasError;
        const errorMessage = this.state.errorMessage;
        const subFolders = this.state.folderData.subFolders;
        const images = this.state.folderData.files;

        const { semanticColors }: IReadonlyTheme = this.props.themeVariant;

<<<<<<< HEAD
        let renderWebPartTitle: JSX.Element = null;         // WebPart title
        let renderWebPartContent: JSX.Element = null;
        let renderWebPartEmptyMessage: JSX.Element = null;  // No photos to display
        let renderOverlay: JSX.Element = null;              // Spinner
        let renderLightbox: JSX.Element = null;             // Files
=======
        let renderWebPartTitle: JSX.Element = null;
        let renderWebPartContent: JSX.Element = null;
        let renderWebPartEmptyMessage: JSX.Element = null;
        let renderOverlay: JSX.Element = null;
        let renderLightbox: JSX.Element = null;
>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c

        // Loading behavior
        if (areResultsLoading) {
            renderOverlay = <React.Fragment>
                <Overlay isDarkThemed={false} theme={this.props.themeVariant as ITheme} className={styles.overlay}>
<<<<<<< HEAD
                    <Spinner size={SpinnerSize.large} />
                </Overlay>
            </React.Fragment>;

        } else {
            renderLightbox = <React.Fragment>
                <div>
                    <ImageList rootUrl={this.props.rootUrl} imagesInfo={images} />
                </div>
            </React.Fragment>;
=======
                    <Spinner size={SpinnerSize.medium} />
                </Overlay>
            </React.Fragment>;
>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c
        }

        // WebPart title
        renderWebPartTitle = <WebPartTitle displayMode={this.props.displayMode} title={this.props.webPartTitle} updateProperty={(value: string) => this.props.updateWebPartTitle(value)} />;

<<<<<<< HEAD
        // Error text: "No photos to display."
        if (isEmpty(subFolders) && isEmpty(images)) {
            renderWebPartEmptyMessage = <MessageBar messageBarType={MessageBarType.info}>{strings.ShowBlankInfoMessage}</MessageBar>;
        }

        renderWebPartContent =
            <React.Fragment>
                {renderOverlay}
                <Breadcrumb
                    items={this._getBreadCrumbData()}
                    maxDisplayedItems={5}
                    theme={this.props.themeVariant as ITheme}
                    onRenderOverflowIcon={this._getCustomOverflowIcon}
                // dividerAs={this._getCustomDivider}
                />
                {renderWebPartEmptyMessage}
                <FolderList foldersInfo={subFolders} onClick={async (folderInfo) => await this._fetchDocumentLibraryItems(folderInfo.UniqueId)} />
                {renderLightbox}
                {/* <ImageList rootUrl={this.props.rootUrl} imagesInfo={images} /> */}
                {/* <ImageList rootUrl={this.props.rootUrl} imagesInfo={images} /> */}
=======
        if (isEmpty(subFolders) && isEmpty(images)) {
            renderWebPartEmptyMessage = <MessageBar messageBarType={MessageBarType.info}>{strings.ShowBlankInfoMessage}</MessageBar>; // "No photos to display."
        }
        renderWebPartContent =
            <React.Fragment>
                {renderOverlay}
                <Breadcrumb items={this._getBreadCrumbData()} dividerAs={this._getCustomDivider} maxDisplayedItems={5} theme={this.props.themeVariant as ITheme} />
                {renderWebPartEmptyMessage}
                <FolderList foldersInfo={subFolders} onClick={async (folderInfo) => await this._fetchDocumentLibraryItems(folderInfo.UniqueId)} />
                {renderLightbox}
                <ImageList rootUrl={this.props.rootUrl} imagesInfo={images} />
>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c
            </React.Fragment>;

        // Error Message
        if (hasError) {
            renderWebPartContent = <MessageBar messageBarType={MessageBarType.error}>{errorMessage}</MessageBar>;
        }

        return (   // Render WebPart
            <div style={{ backgroundColor: semanticColors.bodyBackground }}>
                <div className={styles.imagesGalleryWebpart}>
                    {renderWebPartTitle}
                    {renderWebPartContent}
                </div>
            </div>
        );
    }

    private _getBreadCrumbData(): IBreadcrumbItem[] {
<<<<<<< HEAD

        return this.state.breadCrumb.map((f, i) => ({
            text: (i == 0) ? this.props.imageLibraryRootFolderTitle : f.Name,      // Fix Document Library root Name to Title
=======
        
        return this.state.breadCrumb.map((f, i) => (            {
            text: (i == 0) ? this.props.imageLibraryRootFolderTitle : f.Name, // Fix Document Library root Name to Title
>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c
            key: f.UniqueId,
            onClick: async (ev, item) => await this._fetchDocumentLibraryItems(item.key)
        } as IBreadcrumbItem));
    }

    private _getBreadCrumbState(prevBreadCrumbState: IFolderInfo[], folder: IFolderInfo, reset: boolean): IFolderInfo[] {
        if (reset) {
            return [folder];
        }

        let existingItemIndex = findIndex(prevBreadCrumbState, f => f.UniqueId === folder.UniqueId);
        if (existingItemIndex > -1) {
            return prevBreadCrumbState.slice(0, existingItemIndex + 1);
        }

        return [...prevBreadCrumbState, folder];
    }

<<<<<<< HEAD
    // Custom Overflow Icon
    private _getCustomOverflowIcon(): JSX.Element {     // Render a custom overflow icon in place of the default icon ...
        return <Icon iconName={'CollapseMenu'} />;
    }

    // Custom Divider
    private _getCustomDivider(dividerProps: IDividerAsProps): JSX.Element {             // Custom Breadcrumb DividerAs
        return (
            <span aria-hidden="true" style={{ cursor: 'default', padding: 5 }}>
                /
            </span>
        );
    }
=======

    private _getCustomDivider(dividerProps: IDividerAsProps): JSX.Element {             // Custom Breadcrumb DividerAs
        return (
            <span aria-hidden="true" style={{ cursor: 'default', padding: 5 }}>
              /
            </span>
        );
      }


>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c


    private async _fetchDocumentLibraryItems(uniqueFolderId: string, reset: boolean = false): Promise<void> {
        try {
            this.setState({
                areResultsLoading: true,
                hasError: false,
                errorMessage: ""
            });

<<<<<<< HEAD
            let folderData = await this.props.dataService.getFolderData(uniqueFolderId, this.props.imageLibraryFoldersOrderBy, this.props.imageLibraryFilesOrderBy);
=======
            let folderData = await this.props.dataService.getFolderData(uniqueFolderId);
>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c

            this.setState((prevState) => ({
                areResultsLoading: false,
                folderData: folderData,
                breadCrumb: this._getBreadCrumbState(prevState.breadCrumb, folderData.folder, reset)
            }));

        } catch (error) {
            this.setState({
                areResultsLoading: false,
                hasError: true,
                errorMessage: error.message
            });
        }
    }
}
