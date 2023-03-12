import * as React from 'react';
import styles from './../ImagesGalleryWebPart.module.scss';
import { IImageListProps } from './IImageListProps';
import Image from '../Image/Image';
import { LightgalleryProvider } from "../../../../modules/modified-react-lightgallery";

import "lightgallery.js/dist/css/lightgallery.css";
import "lightgallery.js/dist/css/lg-transitions.css";  // lightgallery mode for other than lg-slide and lg-fade
import '../LightGalleryCustomStyles.css';              // lightgalleryjs custom css styles


export default class ImageList extends React.Component<IImageListProps, {}> {

    constructor(props: IImageListProps) {
        super(props);
    }

    public render(): React.ReactElement<IImageListProps> {
        const allImages = [];
        this.props.imagesInfo.forEach((image, index) => {
            allImages.push(<Image key={index} imageInfo={image} rootUrl={this.props.rootUrl} />);
        });

        return (
            <LightgalleryProvider
                lightgallerySettings = {
                    {
                        // Settings: https://sachinchoolur.github.io/lightgallery.js/docs/api.html
                        // https://www.lightgalleryjs.com/docs/settings/
                        counter: true,              // Whether to show total number of images and index number of currently displayed image.
                        closable: false,            // Allows clicks on dimmer to close gallery.
                        escKey: true,               // Whether the LightGallery could be closed by pressing the "Esc" key.
                        // thumbnail: false,           // Enable thumbnails for the gallery. (Thumbnail plugin)
                        mode: "lg-lollipop-rev",
                        loop: false,                // If false, will disable the ability to loop back to the beginning of the gallery when on the last element.
                        keyPress: true,             // Enable keyboard navigation.
                        hideBarsDelay: 0,           // Delay for hiding gallery controls in ms. Pass 0 if you don't want to hide the controls.
                        preload: 2,                 // Number of preload slides. will execute only after the current slide is fully loaded.
                                                    // If you clicked on 4th image and if preload = 1 then 3rd slide and 5th slide will be loaded in the background after the 4th slide is fully loaded.
                                                    // If preload is 2 then 2nd 3rd 5th 6th slides will be preloaded.
                                                    // Functional only when 'thumbnail: true'
                        speed: 600,                 // Transition duration (in ms).
                        mousewheel: true,           // Ability to navigate to next/prev slides on mousewheel.
                        // download: false,            // Enable download button.
                        addClass: 'lg-custom-class',// Add custom class for gallery, can be used to set different style for different gallery.
                        fullScreen: true,           // Enable/Disable fullscreen mode (require ' plugin'lg-fullscreen.js' plugin)
                        numberOfSlideItemsInDom: 3
                    }
                }
                // List of enabled plugins. Default = [ "lg-fullscreen.js", "lg-thumbnail.js", "lg-video.js", "lg-zoom.js" ]    
                // List of supported plugins: lg-autoplay.js, lg-fullscreen.js, lg-hash.js, lg-pager.js, lg-thumbnail.js, lg-video.js, lg-zoom.js, lg-share.j
                plugins = "[ lg-fullscreen.js, lg-thumbnail.js, lg-video.js ]"
            >
                <div className={styles.imageList}>
                    {allImages}
                </div>
            </LightgalleryProvider>
        );
    }
}
