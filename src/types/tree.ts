// --- System Types (The ones you requested) ---
export interface BaseNode {
    name: string;
    path: string;
}

export interface FileNode extends BaseNode {
    type: "file";
    size: number;
}

export interface FolderNode extends BaseNode {
    type: "folder";
    children: FileSystemNode[];
}

export type FileSystemNode = FileNode | FolderNode;

// --- Raw Types (For incoming JSON before hydration) ---
export interface RawFileNode {
    name: string;
    type: "file";
    size: number;
}

export interface RawFolderNode {
    name: string;
    type: "folder";
    children: RawFileSystemNode[];
}

export type RawFileSystemNode = RawFileNode | RawFolderNode;
