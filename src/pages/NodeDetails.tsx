import { useParams } from 'react-router-dom';
import { useTreeStore } from '../store/useTreeStore';
import { formatBytes, calculateTotalSize } from '../utils/treeUtils';
import { Breadcrumbs } from '../components/Breadcrumbs';
import DataCard from '../components/Tree/DataCard';

export default function NodeDetails() {
    const params = useParams();
    const path = params['*'] || "";

    const findNode = useTreeStore((state) => state.findNode);
    const node = findNode(path);

    if (!node) {
        return (
            <div>
                <h2 className="text-xl font-semibold text-text">Node not found</h2>
            </div>
        );
    }

    return (
        <div className="h-full">
            <Breadcrumbs path={node.path} />

            <h2 className="text-3xl font-bold text-text mb-6">{node.name}</h2>

            <div className="space-y-4 text-text/90">
                <DataCard label="Type" value={<span className="capitalize">{node.type}</span>} />

                <DataCard label="Full Path" value={<span className="font-mono">{node.path}</span>} />

                {node.type === "file" ? (
                    <DataCard label="Size" value={formatBytes(node.size)} />
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        <DataCard label="Direct Children" value={node.children.length} />
                        <DataCard label="Total Subtree Size" value={formatBytes(calculateTotalSize(node))} />
                    </div>
                )}
            </div>
        </div>
    );
}