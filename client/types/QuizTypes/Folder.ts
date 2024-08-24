export interface Folder {
  folderId: string;        // UUID
  userId: string;          // UUID
  folderTitle?: string;    // Folder title, can be null
  createdAt?: string;      // Timestamp, can be null
}
