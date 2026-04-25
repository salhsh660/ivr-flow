import { Settings } from 'lucide-react'
import { useApp } from '../store'

export default function LanguageToggle() {
  const dataset = useApp((s) => s.dataset)
  const filters = useApp((s) => s.filters)
  const setFilter = useApp((s) => s.setFilter)
  const adminOpen = useApp((s) => s.adminOpen)
  const setAdminOpen = useApp((s) => s.setAdminOpen)

  if (!dataset || dataset.languages.length === 0) return null

  const isAdmin =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).has('admin')

  return (
    <div className="flex items-center gap-1">
      {dataset.languages.map((lang) => {
        const isActive = filters.lang === lang
        return (
          <button
            key={lang}
            onClick={() => setFilter('lang', lang)}
            className={`h-8 px-3 rounded-lg text-xs font-bold transition-colors ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
            }`}
            title={lang}
          >
            {lang === 'English' ? 'EN' : lang}
          </button>
        )
      })}
      {isAdmin && (
        <button
          onClick={() => setAdminOpen(!adminOpen)}
          className={`h-8 w-8 flex items-center justify-center rounded-lg transition-colors group ${
            adminOpen
              ? 'bg-gray-900 text-white'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
          }`}
          title="Admin"
        >
          <Settings size={16} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      )}
    </div>
  )
}
