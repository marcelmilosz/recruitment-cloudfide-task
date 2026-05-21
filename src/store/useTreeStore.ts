import { create } from "zustand";
import { persist } from "zustand/middleware";
import { hydrateTree } from "../utils/treeUtils";
import type { FileSystemNode, RawFileSystemNode } from "../types/tree";

interface TreeState {
    root: FileSystemNode | null;
    setRoot: (data: RawFileSystemNode) => void;
    findNode: (path: string) => FileSystemNode | undefined;
}

const findNodeRecursive = (node: FileSystemNode, path: string): FileSystemNode | undefined => {
    if (node.path === path) return node;

    if (node.type === "folder") {
        for (const child of node.children) {
            const found = findNodeRecursive(child, path);
            if (found) return found;
        }
    }
    return undefined;
};

export const useTreeStore = create<TreeState>()(
    persist(
        (set, get) => ({
            root: null,
            setRoot: (data: RawFileSystemNode) => set({ root: hydrateTree(data) }),
            findNode: (path: string) => {
                const root = get().root;
                if (!root) return undefined;
                return findNodeRecursive(root, path);
            },
        }),
        { name: "file-tree-storage" },
    ),
);
