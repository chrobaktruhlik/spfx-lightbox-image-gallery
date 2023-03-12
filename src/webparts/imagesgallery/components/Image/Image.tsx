import * as React from 'react';
import { IImageProps } from './IImageProps';
import { LightgalleryItem } from "../../../../modules/modified-react-lightgallery";
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

        const isVideo = this._isVideo(imagePath);  // Detect video file. If video, return type of file. Other return null

        // <LightgalleryItem group="any"
        // LightBox options:
        //     src = {big_thumbnail_or_picture_in_LightBox}
        //     thumb = {small_thumbnail_in_LightBox}
        //     downloadUrl = {path_to_original_picture}
        //     subHtml = html_code_under_big_picture_in_LightBox
        //     itemClassName = custom class for image items in folder/files view 
        //     html = html code with video file - 'src' should not be provided when you use html5 video
        //     poster = {poster_picture_to_view_before_video player}        //     >
        // Folder/files view page options:
        //     <img src = {thumbnail_in_folder_view} title={picture_name} alt={picture_name_alt_text} />
        // </LightgalleryItem>
        return (
            <LightgalleryItem
                group = "any"
                src = {isVideo ? "" : thumbnailPathForLightBox}
                thumb = {thumbnailPath}
                downloadUrl = {isVideo ? false : imagePath}
                html = {isVideo ?
                    "<video class='lg-video-object lg-html5' controls preload='none' disablepictureinpicture controlslist='nodownload'> \
                        <source src='" + imagePath + "' type='video/" + isVideo + "'></source> \
                    </video>" : ""  }
                poster = {isVideo ? thumbnailPathForLightBox : ""} 
                >
                <img src={thumbnailPath} title={this.props.imageInfo.Name} alt={this.props.imageInfo.Name} /> 
            </LightgalleryItem>
        );
    }

    // Detect picture/video type. If video return value is type of video file, other is null.
    private _isVideo(_path: string) {
        const type: string = _path.toLocaleLowerCase().split('.').pop();
        return ["mp4"].indexOf(type) != -1 ? type : null;
    }

}
