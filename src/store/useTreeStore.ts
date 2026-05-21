import { create } from "zustand";
import { persist } from "zustand/middleware";
import { hydrateTree } from "../utils/treeUtils";
import type { FileSystemNode, RawFileSystemNode } from "../types/tree";

interface TreeState {
    /** The fully hydrated, absolute root of the file system */
    root: FileSystemNode | null;
    /** Action to process raw JSON and save it into the store */
    setRoot: (data: RawFileSystemNode) => void;
    /** Utility to instantly locate any node in the tree using its path */
    findNode: (path: string) => FileSystemNode | undefined;
    /** Resets the state and clears the persisted storage */
    clearRoot: () => void;
}

/**
 * Recursively searches the tree to find a specific node by its absolute path.
 * Kept outside the Zustand store to keep the store logic pure and avoid recreating the function.
 *
 * @param node - The current node being inspected
 * @param path - The target path (e.g., "root/src/index.ts")
 */
const findNodeRecursive = (node: FileSystemNode, path: string): FileSystemNode | undefined => {
    // Base Case: We found the exact node we are looking for
    if (node.path === path) return node;

    // Recursive Case: If it's a folder, search through its children
    if (node.type === "folder") {
        for (const child of node.children) {
            const found = findNodeRecursive(child, path);
            // If the child (or its children) found the target, bubble it up immediately
            if (found) return found;
        }
    }

    // The target path does not exist in this branch of the tree
    return undefined;
};

/**
 * Global State Management using Zustand.
 * Chosen over React Context to avoid unnecessary re-renders of the entire app
 * when only specific nodes change or are queried.
 */
export const useTreeStore = create<TreeState>()(
    // The `persist` middleware automatically saves the tree to localStorage.
    // This ensures that if the user refreshes the page, their loaded JSON is not lost!
    persist(
        (set, get) => ({
            root: null,

            // This clears the memory state. The persist middleware
            // will automatically sync this change to localStorage.
            clearRoot: () => set({ root: null }),

            // Hydrates the raw JSON with absolute paths before saving it to state
            setRoot: (data: RawFileSystemNode) => set({ root: hydrateTree(data) }),

            findNode: (path: string) => {
                const root = get().root;
                if (!root) return undefined;
                return findNodeRecursive(root, path);
            },
        }),
        {
            name: "file-tree-storage",
        },
    ),
);
