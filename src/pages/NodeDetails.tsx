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

    if (!node) return <div className="text-text">Node not found</div>;

    return (
        <div className="h-full flex flex-col gap-6">
            <div className="flex flex-col">
                <Breadcrumbs path={node.path} />
                <h2 className="text-4xl font-bold text-text">{node.name}</h2>
            </div>

            {/* Top Grid: Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <DataCard label="Type" value={<span className="capitalize">{node.type}</span>} />
                <DataCard label="Path" value={<span className="font-mono text-xs">{node.path}</span>} />
                {node.type === "file" ? (
                    <DataCard label="Size" value={formatBytes(node.size)} />
                ) : (
                    <>
                        <DataCard label="Items" value={node.children.length} />
                        <DataCard label="Total Size" value={formatBytes(calculateTotalSize(node))} />
                    </>
                )}
            </div>

            {/* Main Content: Big Icon or Grid */}
            <div className={`flex-1 ${stylesConfig.border.default} ${stylesConfig.borderRadius.parent} bg-surface p-8`}>
                {node.type === "file" ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <Icon name="File" variant="file" size={128} className="mb-6 opacity-80" />
                        <p className="text-xl text-text/70">This is a file {node.name}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {node.children.map((child) => (
                            <FolderChildCard key={child.path} node={child} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}