import * as React from 'react';
import { IImageProps } from './IImageProps';
import { LightgalleryItem } from "react-lightgallery";

import { ImageHelper, IImageHelperRequest } from "@microsoft/sp-image-helper";

export default class Image extends React.Component<IImageProps, {}> {

    constructor(props: IImageProps) {
        super(props);
    }

    public render(): React.ReactElement<IImageProps> {
        let imagePath = encodeURIComponent(this.props.imageInfo.ServerRelativeUrl);
        imagePath = imagePath.replace(/%2F/g, '/');

        // https://vitalyzhukov.com/en/sharepoint-online-document-thumbnail
        // https://learn.microsoft.com/en-us/sharepoint/dev/spfx/image-helper-api
        // SharePoint's server-side image processing has a list of resolution breakpoints widths it supports, including: 200, 400, 960, 1600, & 2560.
        // While you can specify any width to resize the image to, SharePoint will pick the nearest largest resolution breakpoint.
        // For example, if you specify width: 250, the resized image width will be 400 px.
        
        // https://elischei.com/how-to-upgrade-your-spfx-project-to-the-latest-version-and-how-to-fix-avoid-common-issues/
        // const thumbnailPath = this.props.rootUrl.replace(/\/$/, '') + "/_layouts/15/getpreview.ashx?path=" + imagePath; // SharePoint Online Document Thumbnail width = 300px (default value)
        // const thumbnailPath = `${this.props.rootUrl.replace(/\/$/, '')}/_layouts/15/getpreview.ashx?path=${imagePath}`; // SharePoint Online Document Thumbnail width = 300px (default value)

        const thumbnailPath = ImageHelper.convertToImageUrl(                    // Thumbnails in folder
            {
                sourceUrl: imagePath,
                width: 300
            } as IImageHelperRequest
        );

        const thumbnailPathForLightBox = ImageHelper.convertToImageUrl(         // Lightbox full image
            {
                sourceUrl: imagePath,
                width: window.screen.width
            } as IImageHelperRequest
        );

        return (
            // <LightgalleryItem group="any" src={this.props.imageInfo.ServerRelativeUrl}>
            // <LightgalleryItem group={"any"} src={this.props.imageInfo.ServerRelativeUrl} thumb={thumbnailPath}>
            // <LightgalleryItem group="any" src={thumbnailPath + "&resolution=5"} thumb={thumbnailPath} downloadUrl={imagePath}>
            <LightgalleryItem group="any" src={thumbnailPathForLightBox} thumb={thumbnailPath} downloadUrl={imagePath}>
                <img src={thumbnailPath} title={this.props.imageInfo.Name} alt={this.props.imageInfo.Name} />
            </LightgalleryItem>
        );
    }
}
