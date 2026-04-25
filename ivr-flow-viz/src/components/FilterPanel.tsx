import { useApp } from '../store'
import { useT } from '../i18n'

export default function FilterPanel() {
  const dataset = useApp((s) => s.dataset)
  const filters = useApp((s) => s.filters)
  const setFilter = useApp((s) => s.setFilter)
  const t = useT()

  if (!dataset) return null

  const showStatus = filters.type === 'Existing'

  const typeLabels = {
    New: t.New,
    Existing: t.Existing,
    VIP: t.VIP,
  } as Record<string, string>
  const statusLabels = {
    Active: t.Active,
    Suspended: t.Suspended,
    Dunning: t.Dunning,
    Blacklisted: t.Blacklisted,
  } as Record<string, string>

  return (
    <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-4 flex-wrap">
      <Select
        label={t.customerType}
        value={filters.type ?? 'Existing'}
        options={dataset.customerTypes}
        labels={typeLabels}
        onChange={(v) => {
          setFilter('type', v)
          if (v !== 'Existing') setFilter('status', undefined)
          else if (!filters.status) setFilter('status', 'Active')
        }}
      />
      {showStatus && (
        <Select
          label={t.customerStatus}
          value={filters.status ?? 'Active'}
          options={dataset.customerStatuses}
          labels={statusLabels}
          onChange={(v) => setFilter('status', v)}
        />
      )}
    </div>
  )
}

function Select({
  label,
  value,
  options,
  labels,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  labels?: Record<string, string>
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-1 w-full sm:w-auto sm:min-w-40">
      <label className="text-xs font-medium text-gray-500">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-blue-400 w-full bg-white"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {labels?.[o] ?? o}
          </option>
        ))}
      </select>
    </div>
  )
}
