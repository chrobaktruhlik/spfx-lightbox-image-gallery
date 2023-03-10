// SPFx WebPart variables

export interface IImagesGalleryWebPartProps {
    imageLibraryRootFolderTitle: string;                     // Document Library Title instead of Name
    imageLibraryRootFolderUniqueId: string;                  // Document Library Id
    
    webPartTitle: string;
    
    imageLibraryFoldersOrderBy: string;                      // Folder sort logic
    imageLibraryFilesOrderBy: string;                        // Files in folders sort logic
} 
