import { X, Upload, Pencil, Plus, Trash2 } from 'lucide-react'
import { useApp } from '../store'
import { useT, useIsAdmin } from '../i18n'

export default function NodeDetails() {
  const flow = useApp((s) => s.activeFlow())
  const selectedId = useApp((s) => s.selectedNodeId)
  const select = useApp((s) => s.selectNode)
  const updateAudio = useApp((s) => s.updateNodeAudio)
  const updateNode = useApp((s) => s.updateNode)
  const t = useT()
  const isAdmin = useIsAdmin()

  const node = flow?.nodes.find((n) => n.id === selectedId)
  if (!node) return null

  const patch = (p: { title?: string; promptText?: string; condition?: string }) => {
    if (flow) updateNode(flow.id, node.id, p)
  }

  const patchBranches = (branches: Record<string, string>) => {
    if (!flow) return
    const nextNodes = Object.keys(branches)
    updateNode(flow.id, node.id, { branches, nextNodes })
  }

  const updateBranchLabel = (targetId: string, newLabel: string) => {
    const updated = { ...node.branches, [targetId]: newLabel }
    patchBranches(updated)
  }

  const updateBranchTarget = (oldTarget: string, newTarget: string) => {
    if (!newTarget.trim() || !node.branches) return
    const entries = Object.entries(node.branches).map(([k, v]) =>
      k === oldTarget ? [newTarget.trim(), v] : [k, v]
    )
    patchBranches(Object.fromEntries(entries))
  }

  const removeBranch = (targetId: string) => {
    if (!node.branches) return
    const updated = { ...node.branches }
    delete updated[targetId]
    patchBranches(updated)
  }

  const addBranch = () => {
    const updated = { ...(node.branches ?? {}), '': 'نعم' }
    patchBranches(updated)
  }

  const hasBranches = node.branches && Object.keys(node.branches).length > 0

  return (
    <>
      <div
        className="absolute inset-0 bg-black/20 z-40 sm:hidden backdrop-blur-sm"
        onClick={() => select(null)}
      />
      <div className="absolute top-0 bottom-0 left-0 z-50 w-80 max-w-[85%] bg-white shadow-2xl border-r border-gray-200 p-5 overflow-y-auto animate-[slideIn_0.2s_ease-out]">

        <div className="flex items-start justify-between mb-2">
          {isAdmin ? (
            <input
              value={node.title}
              onChange={(e) => patch({ title: e.target.value })}
              className="font-bold text-gray-900 bg-transparent border-b border-dashed border-gray-300 focus:border-blue-500 outline-none flex-1 min-w-0"
            />
          ) : (
            <h2 className="font-bold text-gray-900">{node.title}</h2>
          )}
          <button onClick={() => select(null)} className="text-gray-400 hover:text-gray-600 ms-2 shrink-0">
            <X size={18} />
          </button>
        </div>

        <div className="mb-4 flex items-center gap-1.5">
          <span className="text-[11px] text-gray-400">ID:</span>
          <code className="text-[11px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-mono select-all" dir="ltr">
            {node.id}
          </code>
        </div>

        {isAdmin && (
          <div className="flex items-center gap-1.5 mb-4 text-[11px] text-green-700 bg-green-50 rounded px-2 py-1 w-fit">
            <Pencil size={10} /> {t.savedIndicator}
          </div>
        )}

        <Field label={t.promptLabel}>
          {isAdmin ? (
            <textarea
              value={node.promptText}
              onChange={(e) => patch({ promptText: e.target.value })}
              rows={3}
              className="w-full text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-md p-2 outline-none focus:border-blue-400 resize-y"
            />
          ) : (
            node.promptText
          )}
        </Field>

        {(isAdmin || node.condition) && (
          <Field label={t.conditionLabel}>
            {isAdmin ? (
              <input
                value={node.condition ?? ''}
                onChange={(e) => patch({ condition: e.target.value || undefined })}
                placeholder="—"
                className="w-full text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:border-blue-400"
              />
            ) : (
              node.condition
            )}
          </Field>
        )}

        <Field label={t.audioLabel}>
          <div className="flex items-center gap-2">
            <span className="truncate flex-1 text-left" dir="ltr">
              {node.audioFile ? node.audioFile.split('/').pop() : t.noFile}
            </span>
            <label className="cursor-pointer shrink-0 text-blue-600 hover:text-blue-800 p-1.5 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors" title={t.uploadTitle}>
              <Upload size={14} />
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file && flow) {
                    const url = URL.createObjectURL(file)
                    updateAudio(flow.id, node.id, url)
                  }
                }}
              />
            </label>
          </div>
        </Field>

        <Field label={t.branchesLabel}>
          {isAdmin ? (
            <div className="flex flex-col gap-2">
              {hasBranches && Object.entries(node.branches!).map(([targetId, label], i) => {
                const isYes = label === 'نعم' || label.toLowerCase() === 'yes'
                const isNo = label === 'لا' || label.toLowerCase() === 'no'
                return (
                  <div key={i} className="border border-gray-100 rounded-lg p-2 bg-gray-50 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <input
                        value={label}
                        onChange={(e) => updateBranchLabel(targetId, e.target.value)}
                        placeholder="نعم / لا"
                        className={`flex-1 text-xs font-bold text-center px-2 py-1 rounded border outline-none ${
                          isYes ? 'bg-green-50 border-green-300 text-green-700 focus:border-green-500'
                          : isNo ? 'bg-red-50 border-red-300 text-red-700 focus:border-red-500'
                          : 'bg-white border-gray-200 text-gray-600 focus:border-blue-400'
                        }`}
                      />
                      <button
                        onClick={() => removeBranch(targetId)}
                        className="shrink-0 text-red-400 hover:text-red-600 p-1 rounded hover:bg-red-50"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-400 text-xs shrink-0">→</span>
                      <input
                        value={targetId}
                        onChange={(e) => updateBranchTarget(targetId, e.target.value)}
                        placeholder="node id"
                        dir="ltr"
                        className="flex-1 min-w-0 text-xs text-gray-700 bg-white border border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-400"
                      />
                    </div>
                  </div>
                )
              })}
              <button
                onClick={addBranch}
                className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md px-2 py-1.5 transition-colors w-fit"
              >
                <Plus size={12} /> {t.addBranch}
              </button>
            </div>
          ) : hasBranches ? (
            <div className="flex flex-col gap-1">
              {Object.entries(node.branches!).map(([targetId, label]) => {
                const isYes = label === 'نعم' || label.toLowerCase() === 'yes'
                const isNo = label === 'لا' || label.toLowerCase() === 'no'
                return (
                  <div key={targetId} className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      isYes ? 'bg-green-100 text-green-700' : isNo ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {label}
                    </span>
                    <span className="text-gray-500">→ {targetId}</span>
                  </div>
                )
              })}
            </div>
          ) : (
            <span className="text-gray-400">—</span>
          )}
        </Field>

        {!hasBranches && (
          <Field label={t.nextLabel}>
            {node.nextNodes.length ? node.nextNodes.join('، ') : '—'}
          </Field>
        )}
      </div>
    </>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="text-xs font-semibold text-gray-400 uppercase mb-1">{label}</p>
      <div className="text-sm text-gray-800">{children}</div>
    </div>
  )
}
