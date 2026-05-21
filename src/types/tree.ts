/**
 * ============================================================================
 * SYSTEM TYPES (Hydrated State)
 * ============================================================================
 * These types represent the data used internally by the React application.
 * After loading the raw JSON, the app "hydrates" the tree by injecting an
 * absolute `path` into every node. This path is used as a unique ID for routing.
 */

/** Shared properties that exist on every node in the app */
export interface BaseNode {
    name: string;
    /** The absolute, unique path from the root (e.g., "root/src/components") */
    path: string;
}

export interface FileNode extends BaseNode {
    /** Discriminator for TypeScript narrowing */
    type: "file";
    /** Size of the file in bytes */
    size: number;
}

export interface FolderNode extends BaseNode {
    /** Discriminator for TypeScript narrowing */
    type: "folder";
    /** Recursive array of child nodes */
    children: FileSystemNode[];
}

/**
 * Discriminated Union representing any node in the system.
 * TypeScript will automatically know that if `type === "file"`, the `size` property exists.
 */
export type FileSystemNode = FileNode | FolderNode;

/**
 * ============================================================================
 * RAW TYPES (Incoming JSON State)
 * ============================================================================
 * These types strictly describe the exact JSON structure provided in the
 * recruitment task requirements, before any application logic modifies it.
 * Notice they lack the `path` property.
 */

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

/**
 * Discriminated Union representing the raw, unhydrated JSON data.
 */
export type RawFileSystemNode = RawFileNode | RawFolderNode;
