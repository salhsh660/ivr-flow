import { Handle, Position } from 'reactflow'
import { Play, Pause, ChevronDown, ChevronRight } from 'lucide-react'
import { useApp } from '../store'
import type { IVRNode } from '../types'

export default function CustomNode({ data }: { data: IVRNode }) {
  const playingId = useApp((s) => s.playingNodeId)
  const setPlaying = useApp((s) => s.setPlayingNode)
  const select = useApp((s) => s.selectNode)
  const collapsed = useApp((s) => s.collapsedNodeIds)
  const toggle = useApp((s) => s.toggleCollapse)
  const isPlaying = playingId === data.id
  const isCollapsed = collapsed.has(data.id)
  const hasChildren = data.nextNodes.length > 0

  return (
    <div
      onClick={() => select(data.id)}
      className="bg-white border-2 border-gray-200 rounded-xl p-3 shadow-sm w-60 hover:border-blue-400 transition cursor-pointer"
    >
      <Handle type="target" position={Position.Top} className="!bg-gray-400" />
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 truncate">{data.title}</p>
          <p className="text-xs text-gray-500 line-clamp-2 mt-1">{data.promptText}</p>
        </div>
        {data.audioFile && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setPlaying(isPlaying ? null : data.id)
            }}
            className="shrink-0 w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
        )}
      </div>
      {data.condition && (
        <div className="mt-2 text-[11px] text-purple-700 bg-purple-50 rounded px-2 py-1 truncate">
          {data.condition}
        </div>
      )}
      {hasChildren && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggle(data.id)
          }}
          className="mt-2 w-full text-xs text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1 py-1 rounded hover:bg-gray-50"
        >
          {isCollapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
          {isCollapsed ? `Show ${data.nextNodes.length}` : 'Hide'}
        </button>
      )}
      <Handle type="source" position={Position.Bottom} className="!bg-gray-400" />
    </div>
  )
}
