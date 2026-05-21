import { useParams } from 'react-router-dom';
import { useTreeStore } from '../store/useTreeStore';
import { formatBytes, calculateTotalSize } from '../utils/treeUtils';
import { stylesConfig } from '../config/styles.config';
import Icon from '../components/Icon';
import Breadcrumbs from '../components/Breadcrumbs';
import DataCard from '../components/Tree/DataCard';
import FolderChildCard from '../components/Tree/FolderChildCard';

export default function NodeView() {
    const params = useParams();
    const path = params['*'] || "";
    const findNode = useTreeStore((state) => state.findNode);

    // 1. DEFAULT VIEW: If the user is on exactly `/tree` with no file selected
    if (!path) {
        return (
            <div className="h-full flex items-center justify-center p-6 text-center">
                <div className={`flex flex-col items-center justify-center p-12 max-w-md w-full ${stylesConfig.borderRadius.parent} ${stylesConfig.border.default_dashed} bg-surface/30`}>
                    <div className={`w-16 h-16 flex items-center justify-center bg-primary/10 ${stylesConfig.borderRadius.child} mb-6`}>
                        <Icon name="MousePointerClick" size={32} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-text mb-2">Select an item</h2>
                    <p className="text-text/60">
                        Choose a file or folder from the sidebar on the left to view its details.
                    </p>
                </div>
            </div>
        );
    }

    const node = findNode(path);

    // 2. NOT FOUND: If they typed a path that doesn't exist in the JSON
    if (!node) {
        return (
            <div className="h-full flex items-center justify-center text-text/50">
                <div className="flex flex-col items-center gap-4">
                    <Icon name="SearchX" size={48} className="opacity-50" />
                    <p className="text-xl">Node not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col gap-4 md:gap-6 p-4 md:p-8 overflow-y-auto">

            {/* Header */}
            <div className="flex flex-col shrink-0 min-w-0">
                <Breadcrumbs path={node.path} />
                <h2 className="text-2xl md:text-4xl font-bold text-text truncate pb-1">
                    {node.name}
                </h2>
            </div>

            {/* Data Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
                <DataCard
                    label="Type"
                    icon="File"
                    value={<span className="capitalize">{node.type}</span>}
                />

                <DataCard
                    label="Path"
                    icon="Map"
                    value={
                        <span className="font-mono text-sm truncate block" title={node.path}>
                            {node.path}
                        </span>
                    }
                />

                {node.type === "file" ? (
                    <DataCard
                        label="Size"
                        icon="HardDrive"
                        value={formatBytes(node.size)}
                    />
                ) : (
                    <>
                        <DataCard
                            label="Items"
                            icon="Layers"
                            value={node.children.length}
                        />
                        <DataCard
                            label="Total Size"
                            icon="HardDrive"
                            value={formatBytes(calculateTotalSize(node))}
                        />
                    </>
                )}
            </div>


            {/* Content Area */}
            <div className={`flex-1 ${stylesConfig.border.default} ${stylesConfig.borderRadius.parent} bg-surface p-4 md:p-8`}>
                {node.type === "file" ? (
                    <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto py-10">
                        <Icon
                            name="File"
                            variant="file"
                            size={80}
                            className="mb-6 opacity-80 md:w-32 md:h-32"
                        />
                        <h3 className="text-2xl font-semibold text-text mb-2">
                            {node.name}
                        </h3>
                        <p className="text-text/60">
                            This is a file taking up {formatBytes(node.size)} of space.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {node.children.length > 0 ? (
                            node.children.map((child) => (
                                <FolderChildCard key={child.path} node={child} />
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-text/50">
                                <Icon name="FolderOpen" size={48} className="mb-4 opacity-50" />
                                <p>This folder is empty.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}