import * as React from 'react';
import { IFolderProps } from './IFolderProps';
import styles from '../ImagesGalleryWebPart.module.scss';

const _foldericonright: any = require('./icons/folderIconRight.svg');
const _foldericonleft: any = require('./icons/folderIconLeft.svg');

export default class Folder extends React.Component<IFolderProps, {}> {

    constructor(props: IFolderProps) {
        super(props);
    }

<<<<<<< HEAD
    public render(): React.ReactElement<IFolderProps> {  // Render folders list icons
        return (
            <div title={this.props.folderInfo.Name} className={styles.folderTile} onClick={(e) => this.props.onClick(this.props.folderInfo)}>
=======
    public render(): React.ReactElement<IFolderProps> {  // Render folders list
        return (
            <div title={this.props.folderInfo.Name} className={styles.folderTile} onClick={(e) => this.props.onClick(this.props.folderInfo)}>
                <div>Folder.tsx</div>
>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c
                <div className={styles.folderTileContent}>
                    <div className={styles.folderIcon}>
                        <i aria-hidden="true">
                            <img src={_foldericonleft} />
                        </i>
                        <div className={styles.folderPaper}></div>
                        <i aria-hidden="true" className={styles.folderFront}>
                            <img src={_foldericonright} />
                        </i>
                        <span className={styles.folderCount}>{this.props.folderInfo.ItemCount}</span>
                    </div>
<<<<<<< HEAD
                    <div className={styles.folderTileNamePlate}>{this.props.folderInfo.Name}</div>
=======
                    <span className={styles.folderTileNamePlate}>
                        <span className={styles.folderTileName}>
                            <div className={styles.folderTileNameText}>{this.props.folderInfo.Name}</div>
                        </span>
                    </span>
>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c
                </div>
            </div>
        );
    }
}
