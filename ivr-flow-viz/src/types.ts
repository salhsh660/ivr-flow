export type CustomerType = string
export type CustomerStatus = string
export type Language = string

export interface FlowFilters {
  type?: CustomerType
  status?: CustomerStatus
  lang?: Language
}

export interface IVRNode {
  id: string
  title: string
  promptText: string
  audioFile?: string
  condition?: string
  nextNodes: string[]
  branches?: Record<string, string>
}

export interface IVRFlow {
  id: string
  name: string
  filters: FlowFilters
  rootNodeId: string
  nodes: IVRNode[]
}

export interface IVRDataset {
  appTitle?: string
  customerTypes: string[]
  customerStatuses: string[]
  languages: string[]
  flows: IVRFlow[]
}
