import dagre from 'dagre'
import { Position } from 'reactflow'
import type { Edge, Node } from 'reactflow'

const NODE_W = 240
const NODE_H = 110
const DECISION_W = 170
const DECISION_H = 170

export function layoutGraph(nodes: Node[], edges: Edge[]): { nodes: Node[]; edges: Edge[] } {
  const g = new dagre.graphlib.Graph()
  g.setGraph({ rankdir: 'TB', nodesep: 90, ranksep: 110, acyclicer: 'greedy' })
  g.setDefaultEdgeLabel(() => ({}))

  nodes.forEach((n) => {
    const isDecision = n.type === 'decision'
    g.setNode(n.id, { width: isDecision ? DECISION_W : NODE_W, height: isDecision ? DECISION_H : NODE_H })
  })
  edges.forEach((e) => g.setEdge(e.source, e.target))

  dagre.layout(g)

  const laidOut = nodes.map((n) => {
    const pos = g.node(n.id)
    const isDecision = n.type === 'decision'
    const w = isDecision ? DECISION_W : NODE_W
    const h = isDecision ? DECISION_H : NODE_H
    return {
      ...n,
      position: { x: pos.x - w / 2, y: pos.y - h / 2 },
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
    }
  })

  return { nodes: laidOut, edges }
}
