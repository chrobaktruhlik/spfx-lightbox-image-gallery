import { IDataService } from "../models/IDataService";
import { sp } from "@pnp/pnpjs";
import { IFolderInfo, IFolder } from "@pnp/sp/folders";
import { IFileInfo, IFile } from "@pnp/sp/files";
import { IFolderData } from "../models/IFolderData";


export default class DataService implements IDataService {

    private _orderBy = new Map ([
        [ "FolderNameASC",  { orderby: "Name", ascending: true }],                                                          // By alphabet - mormal
        [ "FolderNameDESC", { orderby: "Name", ascending: false }],                                                         // By alphabet in reverse order
        [ "FolderTimeASC",  { orderby: "TimeCreated", ascending: true }],                                                   // By time - from oldest to newest
        [ "FolderTimeDESC", { orderby: "TimeCreated", ascending: false }],                                                  // By time - from newest to oldest
        [ "FileNameASC",    { orderby: "Name", ascending: true }],                                                          // By alphabet - mormal
        [ "FileNameDESC",   { orderby: "Name", ascending: false }],                                                         // By alphabet in reverse order
        [ "FileTimeASC",    { orderby: "TimeCreated", ascending: true }],                                                   // By time - from oldest to newest
        [ "FileTimeDESC",   { orderby: "TimeCreated", ascending: false }]                                                   // By time - from newest to oldest
    ]);


    public async getFolderData(folderUniqueId: string, foldersOrderBy: string, filesOrderBy: string): Promise<IFolderData> {
        let folder = await sp.web.getFolderById(folderUniqueId);
        let folderInfo = await folder.get();
        let subFolders = await this.getSubFolders(folder, foldersOrderBy);                                                  // Get subfolders
        let files = await this.getFilesFromFolder(folder, filesOrderBy);

        return {
            folder: folderInfo,
            subFolders: subFolders,
            files: files
        };
    }

    
    private async getSubFolders(folder: IFolder, foldersOrderBy: string): Promise<IFolderInfo[]> {                          // Get folders
        const orderby = this._orderBy.get(foldersOrderBy).orderby;
        const ascending = this._orderBy.get(foldersOrderBy).ascending;

        let folders = await folder.folders.orderBy(orderby, ascending).get();
        folders = folders.filter(sf => !sf.IsWOPIEnabled && sf.ItemCount > 0);
        return folders;
    }


    private async getFilesFromFolder(folder: IFolder, filesOrderBy: string): Promise<IFileInfo[]> {                                               // Get files
        const orderby = this._orderBy.get(filesOrderBy).orderby;
        const ascending = this._orderBy.get(filesOrderBy).ascending;

        let files = await folder.files.orderBy(orderby, ascending).get();
        
        files = files.filter(fileData => ["jpg", "jpeg", "png", "mp4"].indexOf(fileData.Name.toLocaleLowerCase().split('.').pop()) !== -1);
        return files;
    }
}