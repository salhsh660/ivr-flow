import { useEffect, useState } from 'react'
import FilterPanel from './components/FilterPanel'
import FlowCanvas from './components/FlowCanvas'
import NodeDetails from './components/NodeDetails'
import AudioPlayer from './components/AudioPlayer'
import AdminUI from './components/AdminUI'
import LanguageToggle from './components/LanguageToggle'
import { useApp } from './store'
import { mockDataset } from './mockData'
import { useLang, useT } from './i18n'

export default function App() {
  const setDataset = useApp((s) => s.setDataset)
  const dataset = useApp((s) => s.dataset)
  const flow = useApp((s) => s.activeFlow())
  const lang = useLang()
  const t = useT()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('ivr_dataset')
    if (saved) {
      try {
        setDataset(JSON.parse(saved))
      } catch {
        setDataset(mockDataset)
      }
    } else {
      setDataset(mockDataset)
    }
    useApp.setState({ filters: { type: 'Existing', status: 'Active', lang: 'عربي' } })
    setReady(true)

    let timer: ReturnType<typeof setTimeout> | undefined
    const unsub = useApp.subscribe((state) => {
      if (!state.dataset) return
      clearTimeout(timer)
      timer = setTimeout(() => {
        localStorage.setItem('ivr_dataset', JSON.stringify(state.dataset))
      }, 400)
    })
    return () => {
      clearTimeout(timer)
      unsub()
    }
  }, [setDataset])

  if (!ready) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div dir={lang === 'en' ? 'ltr' : 'rtl'} className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-bold text-xl md:text-2xl text-gray-900">{dataset?.appTitle ?? t.appTitle}</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5 truncate">
            {flow?.name ?? t.emptyHeader}
          </p>
        </div>
        <LanguageToggle />
      </header>
      <FilterPanel />
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        <FlowCanvas />
        <NodeDetails />
      </div>
      <AudioPlayer />
      <AdminUI />
    </div>
  )
}
