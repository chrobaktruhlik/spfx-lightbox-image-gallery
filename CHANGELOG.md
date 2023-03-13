# Change Log

All notable changes to the `spfx-lightbox-image-gallery` extension.

## [Unreleased]
- Nothing

## [2.1.1] - 2023-03-14
- Fix: Missing download button for video files.

## [2.1.0] - 2023-03-13
- New: Support for .mp4 files.

## [2.0.0] - 2023-03-10
First public release. It retains the version numbering continuing from the original. Release 2.0.0 is first new, modified version.

- New: Ordering the root document library in the properties panel by name (custom name instead of internal name).
- New: Folders in Library order by choice: Name (default), Name reverse, TimeCreated, TimeCreated reverse.
- New: Files in Folders order by choice: Name (default), Name reverse, TimeCreated, TimeCreated reverse.
- New: Folder name in two lines.
- New: Both photo thumbnails in folders and thumbnails/photos in Lightbox presentation are created using SharePoint Image Helper API to achieve faster speed and smaller size of transferred data.
- Change: Update to SPFx v1.14.0
- Change: The thumbnails of the photos in the folders are displayed from left to right, top to bottom. Previously, they were displayed in columns like a newspaper article.
- Change: This web part is disabled on SharePoint classic pages. Target is only Sharepoint Online Modern sites.
- Change: Update Toolbox, App page and Package icons.
- Fix: Show library root folder title instead of name.
- Fix: Hidden libraries no longer appear in the properties panel.
- Fix: [Images in the upper level folder overrides those in the lower level folder](https://github.com/chrobaktruhlik/spfx-lightbox-image-gallery/issues/7#issue-1603108675).

## [1.0.1] - 2023-01-29
- Cleanup and edit project workspace. Start of work on the project.

## [1.0.0] - 2023-01-25
- Fork from [YannickRe / spfx-lightbox-image-gallery](https://github.com/chrobaktruhlik/spfx-lightbox-image-gallery) v1.0.0 - Initial release.
