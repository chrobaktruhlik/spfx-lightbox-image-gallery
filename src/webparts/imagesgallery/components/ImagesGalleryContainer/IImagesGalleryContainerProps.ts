import { DisplayMode } from "@microsoft/sp-core-library";
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { IDataService } from '../../../../models/IDataService';

// @ts-ignore
import { WebPartFormFactor } from '@microsoft/sp-webpart-base';


export interface IImagesGalleryContainerProps {
    imageLibraryRootFolderTitle: string;                // Document Library Root Title
    imageLibraryRootFolderUniqueId: string;             // Document Library Root Id
    imageLibraryFoldersOrderBy: string;                 // Folders in library order by logic
    imageLibraryFilesOrderBy: string;                   // Files in folders rrder by logic
    rootUrl: string;
    dataService: IDataService;
    webPartTitle: string;
    displayMode: DisplayMode;
    themeVariant: IReadonlyTheme | undefined;
    updateWebPartTitle: (value: string) => void;
    webPartFormFactor: WebPartFormFactor;
}
