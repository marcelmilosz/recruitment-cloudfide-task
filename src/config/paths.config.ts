/**
 * ============================================================================
 * CENTRALIZED ROUTING DICTIONARY
 * ============================================================================
 * Single source of truth for all application paths.
 * Prevents typos and makes global URL refactoring effortless.
 */
export const APP_PATHS = {
    // --- Static Routes ---
    HOME: "/",
    TREE: "/tree",
    SEARCH: "/search",

    // --- Dynamic Route Generators ---

    /**
     * Generates the URL for viewing a specific node in the tree.
     * @param nodePath - The absolute path of the node (e.g., "root/src")
     */
    treeNode: (nodePath: string) => `/tree/${nodePath}`,

    /**
     * Generates the URL for the search page with a safe query parameter.
     * @param query - The user's search string
     */
    searchQuery: (query: string) => `/search?q=${encodeURIComponent(query.trim())}`,
} as const;
