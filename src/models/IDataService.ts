import { IFolderData } from "./IFolderData";

export interface IDataService {
    getFolderData(folderUniqueId: string, foldersOrderBy: string, filesOrderBy: string): Promise<IFolderData>;
}
