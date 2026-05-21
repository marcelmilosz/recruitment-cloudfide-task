import type { RawFileSystemNode, FileSystemNode } from "../types/tree";

// Convert raw JSON to System Types with full path injection
export const hydrateTree = (node: RawFileSystemNode, parentPath: string = ""): FileSystemNode => {
    const path = parentPath ? `${parentPath}/${node.name}` : node.name;

    if (node.type === "file") {
        return {
            name: node.name,
            path: path,
            type: "file",
            size: node.size,
        };
    }

    return {
        name: node.name,
        path: path,
        type: "folder",
        children: node.children.map((child) => hydrateTree(child, path)),
    };
};

export const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const calculateTotalSize = (node: FileSystemNode): number => {
    // TypeScript knows: if type is "file", this is FileNode
    if (node.type === "file") {
        return node.size;
    }
    // TypeScript knows: if type is "folder", this is FolderNode
    return node.children.reduce((acc, child) => acc + calculateTotalSize(child), 0);
};

export const searchNodes = (node: FileSystemNode, query: string): FileSystemNode[] => {
    let results: FileSystemNode[] = [];

    // Check if current node matches (case-insensitive)
    if (node.name.toLowerCase().includes(query.toLowerCase())) {
        results.push(node);
    }

    // If it's a folder, search all children
    if (node.type === "folder" && node.children) {
        for (const child of node.children) {
            results = [...results, ...searchNodes(child, query)];
        }
    }

    return results;
};
