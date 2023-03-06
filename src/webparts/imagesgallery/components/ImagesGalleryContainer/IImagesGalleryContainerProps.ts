import { DisplayMode } from "@microsoft/sp-core-library";
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { IDataService } from '../../../../models/IDataService';

export interface IImagesGalleryContainerProps {
<<<<<<< HEAD
    imageLibraryRootFolderTitle: string;                // Document Library Root Title
    imageLibraryRootFolderUniqueId: string;             // Document Library Root Id
    imageLibraryFoldersOrderBy: string;                 // Folders in library order by logic
    imageLibraryFilesOrderBy: string;                 // Files in folders rrder by logic
    rootUrl: string;
    dataService: IDataService;
    webPartTitle: string;
    displayMode: DisplayMode;
    themeVariant: IReadonlyTheme | undefined;
    updateWebPartTitle: (value: string) => void;
=======
  imageLibraryRootFolderTitle: string;                // Document Library Root Title
  imageLibraryRootFolderUniqueId: string;             // Document Library Root Id
  rootUrl: string;
  dataService: IDataService;
  webPartTitle: string;
  displayMode: DisplayMode;
  themeVariant: IReadonlyTheme | undefined;
  updateWebPartTitle: (value: string) => void;
>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c
}
