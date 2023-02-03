import { DisplayMode } from "@microsoft/sp-core-library";
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { IDataService } from '../../../../models/IDataService';

export interface IImagesGalleryContainerProps {
  imageLibraryRootFolderTitle: string;                // Document Library Root Title
  imageLibraryRootFolderUniqueId: string;             // Document Library Root Id
  rootUrl: string;
  dataService: IDataService;
  webPartTitle: string;
  displayMode: DisplayMode;
  themeVariant: IReadonlyTheme | undefined;
  updateWebPartTitle: (value: string) => void;
}
