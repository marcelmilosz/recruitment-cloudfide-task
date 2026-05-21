FileTree Explorer
A premium, interactive JSON directory visualization tool designed for developers. This application allows users to upload or paste a JSON directory structure and instantly navigate, search, and analyze their file system in a clean, macOS-inspired interface.

🚀 Getting Started
Clone the repository

Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
🛠 Tech Stack
Framework: React 18+ (Vite)

Language: TypeScript (Strict Mode)

Routing: React Router v6

State Management: Zustand (with Persistence middleware)

Styling: Tailwind CSS

Icons: Lucide React

🏗 Architectural Decisions

1. State Management (Zustand + Persist)
   I chose Zustand over React Context because it provides a cleaner, more performant API for global state. By using the persist middleware, I ensured the file system state survives page refreshes, providing a seamless experience—the user doesn't have to re-upload their JSON if they accidentally refresh the browser.

2. "Hydration" Pattern
   Raw JSON is stateless. I implemented a hydrateTree utility that recursively traverses the input JSON to inject an absolute path into every node ("root/src/index.ts"). This transforms a standard recursive structure into a flat-routing-friendly format, enabling deep-linking to any node via the URL.

3. Rendering Strategy
   Instead of using useEffect for syncing navigation and UI (which often triggers unnecessary re-renders), I utilized a "Render-Phase Update" pattern. By comparing the previous URL path to the current one directly in the render body, I ensured state updates are atomic and instantaneous, complying with React 18's strict concurrent rendering recommendations.

4. Centralized Configurations
   To ensure the codebase is maintainable:

paths.config.ts: All application routes are defined in a single dictionary. This eliminates "magic strings" and prevents routing typos.

styles.config.ts: Design tokens are centralized, ensuring consistent border-radii and animation durations across the entire application.

⚠️ Known Limitations
Memory Limits: The application parses and hydrates the entire JSON structure in memory. While sufficient for internal tooling, extremely large directory trees (thousands of files) might impact the main thread during the initial parse.

Recursive Search: Search currently iterates over the entire tree. For very deep structures, this could be optimized with a pre-indexed search map.

File System Limits: The app does not support file editing or drag-and-drop file system manipulation, as this was outside the requested scope.

🔮 Future Improvements
If I had more time to dedicate to this project, I would implement:

Virtualization: Use react-window or tanstack-virtual for the TreeSidebar to handle trees with thousands of nodes without DOM overhead.

Breadcrumb Interactivity: Allow users to click segments of the breadcrumb trail to navigate directly to parent folders.

Drag and Drop: Implement a file-system-like reordering feature using dnd-kit.

Dark/Light Mode: Toggle support using Tailwind's class strategy.

Worker Threads: Move the hydrateTree logic to a Web Worker to keep the UI completely responsive during the initial load of large JSON datasets.

Author
Marcel Miłosz — Built for the Cloudfide recruitment task.
