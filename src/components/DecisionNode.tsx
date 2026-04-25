import { Handle, Position } from 'reactflow'
import { Play, Pause } from 'lucide-react'
import { useApp } from '../store'
import type { IVRNode } from '../types'

export default function DecisionNode({ data }: { data: IVRNode }) {
  const playingId = useApp((s) => s.playingNodeId)
  const setPlaying = useApp((s) => s.setPlayingNode)
  const select = useApp((s) => s.selectNode)
  const isPlaying = playingId === data.id

  return (
    <div
      onClick={() => select(data.id)}
      style={{ width: 170, height: 170 }}
      className="relative cursor-pointer"
    >
      <Handle type="target" position={Position.Top} className="!bg-amber-500" style={{ zIndex: 10 }} />

      {/* Diamond background */}
      <div
        className="absolute inset-0 bg-amber-50 border-2 border-amber-400 hover:border-amber-500 transition-colors shadow-sm"
        style={{ clipPath: 'polygon(50% 4%, 96% 50%, 50% 96%, 4% 50%)' }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center gap-1.5">
        <p className="font-semibold text-xs text-amber-900 leading-tight line-clamp-3">{data.title}</p>
        {data.audioFile && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setPlaying(isPlaying ? null : data.id)
            }}
            className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center hover:bg-amber-200"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          </button>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-amber-500" style={{ zIndex: 10 }} />
    </div>
  )
}
