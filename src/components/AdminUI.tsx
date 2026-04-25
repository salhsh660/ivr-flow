import { useState, useEffect, useRef } from 'react'
import { X, Save, FileJson, Download, Upload } from 'lucide-react'
import { useApp } from '../store'
import { useT, useLang } from '../i18n'
import type { IVRDataset } from '../types'

export default function AdminUI() {
  const isOpen = useApp((s) => s.adminOpen)
  const setIsOpen = useApp((s) => s.setAdminOpen)
  const dataset = useApp((s) => s.dataset)
  const setDataset = useApp((s) => s.setDataset)
  const t = useT()
  const lang = useLang()

  const [jsonText, setJsonText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && dataset) {
      setJsonText(JSON.stringify(dataset, null, 2))
      setError(null)
    }
  }, [isOpen, dataset])

  if (!isOpen) return null

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonText) as IVRDataset
      if (!parsed.flows || !parsed.customerTypes) {
        throw new Error(t.adminError)
      }
      setDataset(parsed)
      localStorage.setItem('ivr_dataset', jsonText)
      setIsOpen(false)
    } catch (e) {
      setError(e instanceof Error ? e.message : t.adminError)
    }
  }

  const handleExport = () => {
    const blob = new Blob([jsonText], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ivr-data-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const text = String(ev.target?.result ?? '')
        const parsed = JSON.parse(text) as IVRDataset
        if (!parsed.flows || !parsed.customerTypes) {
          throw new Error(t.adminImportError)
        }
        setJsonText(JSON.stringify(parsed, null, 2))
        setError(null)
      } catch {
        setError(t.adminImportError)
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleReset = () => {
    if (confirm(t.adminResetConfirm)) {
      localStorage.removeItem('ivr_dataset')
      window.location.reload()
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col relative z-10 overflow-hidden animate-in zoom-in-95 duration-200" dir={lang === 'en' ? 'ltr' : 'rtl'}>
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex items-center gap-2 text-gray-800">
            <FileJson size={20} className="text-blue-600" />
            <h2 className="font-bold text-lg">{t.adminTitle}</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-200 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-hidden flex flex-col gap-3 bg-gray-100">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <p className="text-sm text-gray-600 font-medium">{t.adminHint}</p>
            <div className="flex items-center gap-2">
              <button onClick={handleExport} className="flex items-center gap-1.5 text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                <Download size={14} />
                {t.adminExport}
              </button>
              <button onClick={handleImportClick} className="flex items-center gap-1.5 text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                <Upload size={14} />
                {t.adminImport}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={handleImportFile}
              />
              <button onClick={handleReset} className="text-xs text-red-600 hover:text-red-800 underline">
                {t.adminReset}
              </button>
            </div>
          </div>
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200 font-medium">{error}</div>}
          <textarea
            dir="ltr"
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            className="flex-1 w-full p-4 rounded-xl border border-gray-300 font-mono text-sm leading-relaxed resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-shadow shadow-inner"
            spellCheck={false}
          />
        </div>

        <div className="border-t border-gray-200 p-4 bg-white flex justify-end gap-3">
          <button onClick={() => setIsOpen(false)} className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors font-semibold">
            {t.adminCancel}
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition-all font-semibold">
            <Save size={18} />
            {t.adminSave}
          </button>
        </div>
      </div>
    </div>
  )
}
