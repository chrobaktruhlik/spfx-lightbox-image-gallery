import * as React from 'react';
import { IImageProps } from './IImageProps';
import { LightgalleryItem } from "react-lightgallery";
// import { LightgalleryItem } from "../../../../modules/src";


import { ImageHelper, IImageHelperRequest } from "@microsoft/sp-image-helper";

export default class Image extends React.Component<IImageProps, {}> {

    constructor(props: IImageProps) {
        super(props);
    }

    public render(): React.ReactElement<IImageProps> {
        let imagePath = encodeURIComponent(this.props.imageInfo.ServerRelativeUrl);
        imagePath = imagePath.replace(/%2F/g, '/');

        // https://learn.microsoft.com/en-us/sharepoint/dev/spfx/image-helper-api
        // SharePoint's server-side image processing has a list of resolution breakpoints widths it supports, including: 200, 400, 960, 1600, & 2560.
        // While you can specify any width to resize the image to, SharePoint will pick the nearest largest resolution breakpoint.
        // For example, if you specify width: 250, the resized image width will be 400 px.
        // Maybe? .wmv, .3gp, .3g2, .3gp2, .asf, .mts, .m2ts, .avi, .mod, .dv, .ts, .vob, .xesc, .mp4, .mpeg, .mpg, .m2v, .ismv, .mov, .m4v, .docm, .docx, .dotx, .dotm, .bmp, .jpg, .jpeg, .tiff, .tif, .png, .gif, .emf, .wmf, .psd, .svg, .ai, .eps, .pdf, .pptm, .pptx, .potm, .potx, .ppsm, .ppsx, .xlsm, .xlsx, .aspx
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

        // console.log("thumbnailPath:", thumbnailPath)
        console.log("imagePath:", imagePath);
        // <LightgalleryItem group="any"
        // LightBox options:
        //     src = {big_thumbnail_or_picture_in_LightBox}
        //     thumb = {small_thumbnail_in_LightBox}
        //     downloadUrl = {path_to_original_picture}
        //     subHtml = html_code_under_big_picture_in_LightBox
        //     >
        // Folder/files view page options:
        //     <img src = {thumbnail_in_folder_view} title={picture_name} alt={picture_name_alt_text} />
        // </LightgalleryItem>
        return (
            <LightgalleryItem group="any" src={imagePath} thumb={thumbnailPath} downloadUrl={imagePath} subHtml="<h4>Nadpis</h4><p>Krátky popis....</p>" html={imagePath}>
                
                <img src={thumbnailPath} title={this.props.imageInfo.Name} alt={this.props.imageInfo.Name} data-html={imagePath} />
                
            </LightgalleryItem>

            // <LightgalleryItem group="any" src={thumbnailPathForLightBox} thumb={thumbnailPath} downloadUrl={imagePath}>
            //     <img src={thumbnailPath} title={this.props.imageInfo.Name} alt={this.props.imageInfo.Name} />
            // </LightgalleryItem>

        );
    }
}
