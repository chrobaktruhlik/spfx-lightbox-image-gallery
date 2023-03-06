import { IDataService } from "../models/IDataService";
import { sp } from "@pnp/pnpjs";
import { IFolderInfo, IFolder } from "@pnp/sp/folders";
import { IFileInfo, IFile } from "@pnp/sp/files";
import { IFolderData } from "../models/IFolderData";


export default class DataService implements IDataService {
<<<<<<< HEAD

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
=======
    public async getLists(): Promise<IListInfo[]> {
        let lists = await sp.web.lists.select("Title", "BaseTemplate", "RootFolder").expand('RootFolder').get();
        lists = lists.filter(item => item["BaseTemplate"] === 109 || item["BaseTemplate"] === 101); // 101 = Document Library, 109 = Picture Library

        return lists;
    }

    public async getFolderData(folderUniqueId: string): Promise<IFolderData> {
        let folder = await sp.web.getFolderById(folderUniqueId);
        let folderInfo = await folder.get();
        let subFolders = await this.getSubFolders(folder);
        let files = await this.getFilesFromFolder(folder);

        return {
            folder: folderInfo,
            subFolders: subFolders,
            files: files
        };
    }

    private async getSubFolders(folder: IFolder): Promise<IFolderInfo[]> {  // Get folders
        let folders = await folder.folders.orderBy("Name", true).get();     // TimeCreated, false / Name, true
>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c
        folders = folders.filter(sf => !sf.IsWOPIEnabled && sf.ItemCount > 0);
        return folders;
    }

<<<<<<< HEAD

    private async getFilesFromFolder(folder: IFolder, filesOrderBy: string): Promise<IFileInfo[]> {                                               // Get files
        const orderby = this._orderBy.get(filesOrderBy).orderby;
        const ascending = this._orderBy.get(filesOrderBy).ascending;

        let files = await folder.files.orderBy(orderby, ascending).get();
        
=======
    private async getFilesFromFolder(folder: IFolder): Promise<IFileInfo[]> {
        let files = await folder.files.orderBy("TimeCreated", true).get();
>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c
        files = files.filter(fileData => ["jpg", "jpeg", "png"].indexOf(fileData.Name.toLocaleLowerCase().split('.').pop()) !== -1);
        return files;
    }
}