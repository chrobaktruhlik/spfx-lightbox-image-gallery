// https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/localize-web-parts

// The default locale used by the SharePoint Framework is en-US.
// If your web part is used on a site that uses a locale not supported by your web part,
// the SharePoint Framework uses en-US as the default locale.

// You can override this behavior by creating a locale file named default.js with the translations in your preferred language.
// While the name default.js doesn't follow the locale naming convention, it signals to the SharePoint Framework
// build process to use that particular locale file as the fallback locale instead of the standard US English locale.

// Defines language files: ./src/webparts/imagesgallery/ImagesGalleryWebPart.ts


declare interface IImagesGalleryWebPartStrings {
    NumberOfColumns: string;
    ImageLibraryRootFolderUniqueId: string;
    PlaceholderIconName: string;
    PlaceholderName: string;
    PlaceholderDescription: string;
    PlaceholderButton: string;
    ShowBlankEditInfoMessage: string;
}

declare module 'ImagesGalleryWebPartStrings' {
    const strings: IImagesGalleryWebPartStrings;
    export = strings;
}
