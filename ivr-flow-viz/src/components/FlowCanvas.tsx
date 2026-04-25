import { useEffect, useState, useCallback } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
  applyNodeChanges,
} from 'reactflow'
import type { Edge, Node, NodeChange } from 'reactflow'
import 'reactflow/dist/style.css'
import { useApp } from '../store'
import { layoutGraph } from '../layout'
import { useT } from '../i18n'
import CustomNode from './CustomNode'
import DecisionNode from './DecisionNode'
import { LayoutGrid } from 'lucide-react'
import type { IVRFlow } from '../types'

const nodeTypes = { ivr: CustomNode, decision: DecisionNode }

function getVisibleNodeIds(
  rootId: string,
  allNodes: { id: string; nextNodes: string[] }[],
  collapsed: Set<string>
): Set<string> {
  const map = new Map(allNodes.map((n) => [n.id, n]))
  const visible = new Set<string>()
  const queue = [rootId]
  while (queue.length) {
    const id = queue.shift()!
    if (visible.has(id)) continue
    visible.add(id)
    if (collapsed.has(id)) continue
    const node = map.get(id)
    if (node) queue.push(...node.nextNodes)
  }
  return visible
}

function buildLayout(
  flow: IVRFlow,
  collapsed: Set<string>
): { nodes: Node[]; edges: Edge[] } {
  const visible = getVisibleNodeIds(flow.rootNodeId, flow.nodes, collapsed)
  const visibleNodes = flow.nodes.filter((n) => visible.has(n.id))

  const rfNodes: Node[] = visibleNodes.map((n) => ({
    id: n.id,
    type: n.branches && Object.keys(n.branches).length > 0 ? 'decision' : 'ivr',
    data: n,
    position: { x: 0, y: 0 },
  }))
  const rfEdges: Edge[] = visibleNodes.flatMap((n) =>
    n.nextNodes
      .filter((targetId) => visible.has(targetId))
      .map((targetId) => {
        const label = n.branches?.[targetId]
        const isYes = label === 'نعم' || label?.toLowerCase() === 'yes'
        const isNo = label === 'لا' || label?.toLowerCase() === 'no'
        return {
          id: `${n.id}-${targetId}`,
          source: n.id,
          target: targetId,
          animated: true,
          label,
          labelStyle: label
            ? { fontSize: 11, fontWeight: 700, fill: isYes ? '#16a34a' : isNo ? '#dc2626' : '#64748b' }
            : undefined,
          labelBgStyle: label ? { fill: 'white', fillOpacity: 0.9, rx: 4 } : undefined,
          style: {
            stroke: isYes ? '#22c55e' : isNo ? '#ef4444' : '#94a3b8',
            strokeWidth: label ? 2 : 1,
          },
        }
      })
  )
  try {
    return layoutGraph(rfNodes, rfEdges)
  } catch {
    return { nodes: rfNodes, edges: rfEdges }
  }
}

function Canvas() {
  const flow = useApp((s) => s.activeFlow())
  const collapsed = useApp((s) => s.collapsedNodeIds)
  const rf = useReactFlow()
  const t = useT()

  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  const resetLayout = useCallback(() => {
    if (!flow) return
    const { nodes: n, edges: e } = buildLayout(flow, collapsed)
    setNodes(n)
    setEdges(e)
    setTimeout(() => rf.fitView({ padding: 0.2, duration: 600 }), 80)
  }, [flow, collapsed, rf])

  // Topology signature — triggers re-layout when node types or graph structure changes
  const topoSig = flow
    ? flow.nodes
        .map((n) => `${n.id}:${n.nextNodes.join(',')}:${n.branches && Object.keys(n.branches).length > 0 ? 'D' : 'N'}`)
        .join('|')
    : ''

  useEffect(() => {
    resetLayout()
  }, [flow?.id, collapsed, topoSig])

  // Sync node data changes (title, prompt, etc.) without re-layouting
  useEffect(() => {
    if (!flow) return
    setNodes((prev) =>
      prev.map((n) => {
        const updated = flow.nodes.find((fn) => fn.id === n.id)
        if (!updated) return n
        const newType = updated.branches && Object.keys(updated.branches).length > 0 ? 'decision' : 'ivr'
        return { ...n, data: updated, type: newType }
      })
    )
  }, [flow])

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  )

  if (!flow) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-center p-8">
        <div>
          <p className="text-lg font-medium">{t.noFlow}</p>
          <p className="text-sm mt-1">{t.tryDifferent}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 relative" dir="ltr">
      <ReactFlow
        key={flow.id}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        fitView
        minZoom={0.2}
        maxZoom={2}
      >
        <Background gap={20} />
        <Controls />
        <MiniMap pannable zoomable />
      </ReactFlow>
      <button
        onClick={resetLayout}
        title={t.rearrange}
        className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-colors"
      >
        <LayoutGrid size={14} />
        {t.rearrange}
      </button>
    </div>
  )
}

export default function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <Canvas />
    </ReactFlowProvider>
  )
}
