// https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/localize-web-parts

// The default locale used by the SharePoint Framework is en-US.
// If your web part is used on a site that uses a locale not supported by your web part,
// the SharePoint Framework uses en-US as the default locale.

// You can override this behavior by creating a locale file named default.js with the translations in your preferred language.
// While the name default.js doesn't follow the locale naming convention, it signals to the SharePoint Framework
// build process to use that particular locale file as the fallback locale instead of the standard US English locale.

// Defines language files: ./src/webparts/imagesgallery/ImagesGalleryWebPart.ts


declare interface IImagesGalleryWebPartStrings {
<<<<<<< HEAD
    ImageLibraryRootFolderUniqueIdLabel: string;               // "Document library"
    PropertyPanePageHeaderDescription: string,                 // "Change the photo library and its display options.""
    PropertyPaneGroupViewOptionsName: string,                  // "View options"

    ShowBlankInfoMessage: string;                              // "No photos to display."

    ImageLibraryFoldersOrderByLabel: string;                   // "Sort folders by:"
    ImageLibraryFilesOrderByLabel: string;                     // "Sort files by:"
    ImageLibraryOrderByTimeDESC: string;                       // "Time created - from newest to oldest"
    ImageLibraryOrderByTimeASC: string;                        // "Time created - from oldest to newest"
    ImageLibraryOrderByNameASC: string;                        // "Name"
    ImageLibraryOrderByNameDESC: string;                       // "Name in reverse order"

    // React component strings
    WebPartPlaceholderDescription: string;                     // "Please configure the web part."
    WebPartPlaceholderName: string;                            // "Configure your web part"
=======
    ImageLibraryRootFolderUniqueIdLabel: string;    // "Document library"
    PropertyPanePageHeaderDescription: string,      // "Change the photo library and its display options.""
    ShowBlankInfoMessage: string;                   // "No photos to display."
    WebPartPlaceholderDescription: string;          // "Please configure the web part."
    WebPartPlaceholderName: string;                 // "Configure your web part"
>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c
}

declare module 'ImagesGalleryWebPartStrings' {
    const strings: IImagesGalleryWebPartStrings;
    export = strings;
}
