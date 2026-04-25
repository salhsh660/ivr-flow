import { useApp } from './store'

type Lang = 'ar' | 'en'

const LABELS = {
  ar: {
    appTitle: 'عارض مخططات IVR',
    emptyHeader: 'اختر الفلاتر لعرض مخطط مطابق',
    customerType: 'نوع العميل',
    customerStatus: 'حالة العميل',
    all: 'الكل',
    New: 'جديد',
    Existing: 'حالي',
    VIP: 'VIP',
    Active: 'نشط',
    Suspended: 'موقوف',
    Dunning: 'متعثر',
    Blacklisted: 'محظور',
    noFlow: 'لا يوجد مخطط مطابق للفلاتر الحالية',
    tryDifferent: 'جرّب اختيار نوع أو حالة مختلفة.',
    promptLabel: 'النص المسموع',
    conditionLabel: 'الشرط',
    audioLabel: 'الملف الصوتي',
    nextLabel: 'الخطوات التالية',
    noFile: 'لا يوجد ملف',
    uploadTitle: 'رفع ملف صوتي جديد',
    editTitle: 'عنوان المحطة',
    editPrompt: 'النص المسموع',
    editCondition: 'الشرط (اختياري)',
    savedIndicator: 'تم الحفظ تلقائياً',
    adminBtn: 'إدارة البيانات (Admin)',
    adminTitle: 'إدارة بيانات الـ Flows (Admin)',
    adminHint: 'قم بتعديل الـ JSON مباشرة (المسارات، النصوص، الملفات الصوتية).',
    adminReset: 'استعادة البيانات الافتراضية',
    adminCancel: 'إلغاء',
    adminSave: 'حفظ التغييرات',
    adminError: 'بيانات JSON غير صالحة. تأكد من وجود flows و customerTypes.',
    adminResetConfirm: 'هل أنت متأكد من مسح التعديلات والعودة للبيانات الافتراضية؟',
    rearrange: 'إعادة ترتيب',
    branchesLabel: 'فروع القرار',
    addBranch: 'إضافة فرع',
    adminExport: 'تصدير JSON',
    adminImport: 'استيراد JSON',
    adminImportError: 'فشل استيراد الملف. تأكد من أنه ملف JSON صالح.',
  },
  en: {
    appTitle: 'IVR Flow Visualizer',
    emptyHeader: 'Select filters to view a matching flow',
    customerType: 'Customer Type',
    customerStatus: 'Customer Status',
    all: 'All',
    New: 'New',
    Existing: 'Existing',
    VIP: 'VIP',
    Active: 'Active',
    Suspended: 'Suspended',
    Dunning: 'Dunning',
    Blacklisted: 'Blacklisted',
    noFlow: 'No flow matches the current filters',
    tryDifferent: 'Try selecting a different type or status.',
    promptLabel: 'Prompt',
    conditionLabel: 'Condition',
    audioLabel: 'Audio File',
    nextLabel: 'Next Steps',
    noFile: 'No file',
    uploadTitle: 'Upload new audio file',
    editTitle: 'Node Title',
    editPrompt: 'Prompt Text',
    editCondition: 'Condition (optional)',
    savedIndicator: 'Auto-saved',
    adminBtn: 'Manage Data (Admin)',
    adminTitle: 'Flow Data Management (Admin)',
    adminHint: 'Edit the JSON directly (paths, text, audio files).',
    adminReset: 'Reset to defaults',
    adminCancel: 'Cancel',
    adminSave: 'Save Changes',
    adminError: 'Invalid JSON. Ensure flows and customerTypes exist.',
    adminResetConfirm: 'Are you sure you want to reset changes and return to defaults?',
    rearrange: 'Re-arrange',
    branchesLabel: 'Decision Branches',
    addBranch: 'Add Branch',
    adminExport: 'Export JSON',
    adminImport: 'Import JSON',
    adminImportError: 'Failed to import file. Make sure it is a valid JSON file.',
  },
} as const satisfies Record<Lang, Record<string, string>>

export function useLang(): Lang {
  const lang = useApp((s) => s.filters.lang)
  return lang === 'English' ? 'en' : 'ar'
}

export function useT() {
  const lang = useLang()
  return LABELS[lang]
}

export function useIsAdmin(): boolean {
  return (
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).has('admin')
  )
}
