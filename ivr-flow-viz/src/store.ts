import { create } from 'zustand'
import type { FlowFilters, IVRDataset, IVRFlow, IVRNode } from './types'

interface AppState {
  dataset: IVRDataset | null
  filters: FlowFilters
  selectedNodeId: string | null
  playingNodeId: string | null
  collapsedNodeIds: Set<string>
  adminOpen: boolean
  setDataset: (d: IVRDataset) => void
  setFilter: (key: keyof FlowFilters, value: string | undefined) => void
  selectNode: (id: string | null) => void
  setPlayingNode: (id: string | null) => void
  toggleCollapse: (id: string) => void
  activeFlow: () => IVRFlow | null
  updateNodeAudio: (flowId: string, nodeId: string, audioFile: string) => void
  updateNode: (flowId: string, nodeId: string, patch: Partial<IVRNode>) => void
  setAdminOpen: (open: boolean) => void
}

export const useApp = create<AppState>((set, get) => ({
  dataset: null,
  filters: {},
  selectedNodeId: null,
  playingNodeId: null,
  collapsedNodeIds: new Set(),
  adminOpen: false,
  setAdminOpen: (open) => set({ adminOpen: open }),
  setDataset: (d) => set({ dataset: d }),
  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value } })),
  selectNode: (id) => set({ selectedNodeId: id }),
  setPlayingNode: (id) => set({ playingNodeId: id }),
  toggleCollapse: (id) =>
    set((s) => {
      const next = new Set(s.collapsedNodeIds)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return { collapsedNodeIds: next }
    }),
  updateNodeAudio: (flowId, nodeId, audioFile) =>
    set((s) => {
      if (!s.dataset) return s
      const nextFlows = s.dataset.flows.map((f) => {
        if (f.id !== flowId) return f
        const nextNodes = f.nodes.map((n) =>
          n.id === nodeId ? { ...n, audioFile } : n
        )
        return { ...f, nodes: nextNodes }
      })
      return { dataset: { ...s.dataset, flows: nextFlows } }
    }),
  updateNode: (flowId, nodeId, patch) =>
    set((s) => {
      if (!s.dataset) return s
      const nextFlows = s.dataset.flows.map((f) => {
        if (f.id !== flowId) return f
        const nextNodes = f.nodes.map((n) =>
          n.id === nodeId ? { ...n, ...patch } : n
        )
        return { ...f, nodes: nextNodes }
      })
      return { dataset: { ...s.dataset, flows: nextFlows } }
    }),
  activeFlow: () => {
    const { dataset, filters } = get()
    if (!dataset) return null
    return (
      dataset.flows.find((f) => {
        const fi = f.filters
        if (fi.type && filters.type && fi.type !== filters.type) return false
        if (fi.status && filters.status && fi.status !== filters.status)
          return false
        if (fi.lang && filters.lang && fi.lang !== filters.lang) return false
        if (fi.type && !filters.type) return false
        if (fi.status && !filters.status) return false
        return true
      }) ?? null
    )
  },
}))
