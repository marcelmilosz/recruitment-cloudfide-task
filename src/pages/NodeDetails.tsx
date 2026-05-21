import { useParams } from 'react-router-dom';
import { useTreeStore } from '../store/useTreeStore';
import { formatBytes, calculateTotalSize } from '../utils/treeUtils';
import { stylesConfig } from '../config/styles.config';
import Icon from '../components/Icon';
import Breadcrumbs from '../components/Breadcrumbs';
import DataCard from '../components/Tree/DataCard';
import FolderChildCard from '../components/Tree/FolderChildCard';

export default function NodeDetails() {
    const params = useParams();
    const path = params['*'] || "";

    const findNode = useTreeStore((state) => state.findNode);
    const node = findNode(path);

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
        <div className="h-full flex flex-col gap-6">
            <div className="flex flex-col">
                <Breadcrumbs path={node.path} />
                <h2 className="text-4xl font-bold text-text">{node.name}</h2>
            </div>

            {/* Top Grid: Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

            {/* Main Content: Big Icon or Grid */}
            <div className={`flex-1 ${stylesConfig.border.default} ${stylesConfig.borderRadius.parent} bg-surface p-8 overflow-y-auto`}>
                {node.type === "file" ? (
                    <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto">
                        <Icon
                            name="File"
                            variant="file"
                            size={128}
                            className="mb-6 opacity-80"
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