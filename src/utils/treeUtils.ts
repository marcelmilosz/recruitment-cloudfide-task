import type { RawFileSystemNode, FileSystemNode } from "../types/tree";

/**
 * Transforms the raw JSON data into usable application state.
 * Raw JSON only knows its own name, not where it lives in the tree.
 * This recursive function walks the entire tree and injects an absolute `path`
 * (e.g., "root/src/components/Button.tsx") into every single node.
 *
 * @param node - The current node being processed
 * @param parentPath - The accumulated path from the root down to this node's parent
 * @returns A fully hydrated FileSystemNode with a guaranteed `path` property
 */
export const hydrateTree = (node: RawFileSystemNode, parentPath: string = ""): FileSystemNode => {
    // 1. Build the path. If there's a parent, append this node's name. Otherwise, this is the root.
    const path = parentPath ? `${parentPath}/${node.name}` : node.name;

    // 2. Base Case: If it's a file, we stop here and return the fully formed FileNode
    if (node.type === "file") {
        return {
            name: node.name,
            path: path,
            type: "file",
            size: node.size,
        };
    }

    // 3. Recursive Case: If it's a folder, we must process all of its children.
    // We pass our newly created `path` down as the `parentPath` for the next level.
    return {
        name: node.name,
        path: path,
        type: "folder",
        children: node.children.map((child) => hydrateTree(child, path)),
    };
};

/**
 * Converts raw bytes into a human-readable format (B, KB, MB, GB).
 * Requirement for the recruitment task.
 */
export const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 B";

    const k = 1024; // In computing, 1 KB = 1024 Bytes (not 1000)
    const sizes = ["B", "KB", "MB", "GB"];

    // Logarithm base 1024 tells us which unit array index to use.
    // e.g., 1024 -> log(1024)/log(1024) = 1 (KB)
    // e.g., 1048576 -> log(1048576)/log(1024) = 2 (MB)
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    // Divide the bytes by the appropriate power of 1024, round to 2 decimals, and append the string
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * Recursively calculates the total byte size of a folder.
 * Folders don't have an inherent size in the JSON; their size is the sum of all files inside them.
 */
export const calculateTotalSize = (node: FileSystemNode): number => {
    // Base Case: We hit a file. Just return its size.
    // TypeScript's type narrowing knows that if type is "file", the `size` property exists.
    if (node.type === "file") {
        return node.size;
    }

    // Recursive Case: We hit a folder.
    // We use `.reduce()` to loop over every child and add their sizes together.
    // If a child is also a folder, it will recursively call this function again until it hits files.
    return node.children.reduce((acc, child) => acc + calculateTotalSize(child), 0);
};

/**
 * Recursively searches the entire file tree for a specific search query.
 * Flattens the nested tree structure into a simple 1D array of matching results.
 */
export const searchNodes = (node: FileSystemNode, query: string): FileSystemNode[] => {
    let results: FileSystemNode[] = [];

    // 1. Check if the current node matches the query.
    // We convert both to lowercase to make the search case-insensitive (e.g., "button" finds "Button.tsx")
    if (node.name.toLowerCase().includes(query.toLowerCase())) {
        results.push(node);
    }

    // 2. If the current node is a folder, we must look inside it to see if any children match.
    if (node.type === "folder" && node.children) {
        for (const child of node.children) {
            // Recursively search the child.
            // The spread operator (`...`) takes the array returned by the child and merges it into our main results.
            results = [...results, ...searchNodes(child, query)];
        }
    }

    // 3. Return the array. If nothing matched, it will return an empty array [].
    return results;
};
