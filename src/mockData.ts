import type { IVRDataset, IVRFlow } from './types'

const A = '/audio/dummy.mp3'

const existingActiveAr: IVRFlow = {
  id: 'flow_existing_active_ar',
  name: 'عميل نشط - عربي',
  filters: { type: 'Existing', status: 'Active', lang: 'عربي' },
  rootNodeId: 'root',
  nodes: [
    { id: 'root', title: 'الترحيب', promptText: 'أهلاً بك في خدمة العملاء، نسعد بخدمتك', audioFile: A, nextNodes: ['lang'] },
    { id: 'lang', title: 'اختيار اللغة', promptText: 'للعربية اضغط 1، for English press 2', audioFile: A, nextNodes: ['menu'] },
    { id: 'menu', title: 'القائمة الرئيسية', promptText: 'للحساب 1، للعروض 2، للدعم 3، للموظف 0', audioFile: A, nextNodes: ['account', 'offers', 'tech', 'agent'] },
    { id: 'account', title: 'حسابي', promptText: 'خدمات الحساب والرصيد', condition: 'اضغط 1', audioFile: A, nextNodes: ['balance', 'info', 'recharge'] },
    { id: 'balance', title: 'الرصيد الحالي', promptText: 'رصيدك الحالي X ريال، وباقتك تنتهي في Y', condition: 'اضغط 1', audioFile: A, nextNodes: [] },
    { id: 'info', title: 'بيانات الاشتراك', promptText: 'عرض بيانات الباقة الحالية', condition: 'اضغط 2', audioFile: A, nextNodes: [] },
    { id: 'recharge', title: 'شحن الرصيد', promptText: 'شحن عبر بطاقة أو تحويل رصيد', condition: 'اضغط 3', audioFile: A, nextNodes: [] },
    { id: 'offers', title: 'العروض', promptText: 'العروض الحالية المتاحة لك', condition: 'اضغط 2', audioFile: A, nextNodes: ['offer_data', 'offer_calls'] },
    { id: 'offer_data', title: 'عروض الإنترنت', promptText: 'باقات إنترنت من 10GB إلى 100GB', condition: 'اضغط 1', audioFile: A, nextNodes: [] },
    { id: 'offer_calls', title: 'عروض المكالمات', promptText: 'باقات مكالمات محلية ودولية', condition: 'اضغط 2', audioFile: A, nextNodes: [] },
    { id: 'tech', title: 'الدعم الفني', promptText: 'مشاكل الاتصال والإنترنت', condition: 'اضغط 3', audioFile: A, nextNodes: [] },
    { id: 'agent', title: 'تحويل لموظف', promptText: 'الرجاء الانتظار، جارِ التحويل لأحد موظفينا', condition: 'اضغط 0', audioFile: A, nextNodes: [] },
  ],
}

const existingSuspendedAr: IVRFlow = {
  id: 'flow_existing_suspended_ar',
  name: 'عميل موقوف - عربي',
  filters: { type: 'Existing', status: 'Suspended', lang: 'عربي' },
  rootNodeId: 'root',
  nodes: [
    { id: 'root', title: 'الترحيب', promptText: 'أهلاً بك، خدمتك موقوفة حالياً', audioFile: A, nextNodes: ['notice'] },
    { id: 'notice', title: 'تنبيه إيقاف الخدمة', promptText: 'تم إيقاف خدمتك لعدم سداد الفاتورة', audioFile: A, nextNodes: ['menu'] },
    { id: 'menu', title: 'قائمة الخيارات', promptText: 'للسداد 1، لمعرفة المبلغ 2، لموظف 0', audioFile: A, nextNodes: ['pay', 'amount', 'agent'] },
    { id: 'amount', title: 'مبلغ المديونية', promptText: 'إجمالي المستحق X ريال', condition: 'اضغط 2', audioFile: A, nextNodes: ['pay'] },
    { id: 'pay', title: 'طرق السداد', promptText: 'اختر طريقة الدفع المناسبة', condition: 'اضغط 1', audioFile: A, nextNodes: ['pay_card', 'pay_bank', 'pay_sadad'] },
    { id: 'pay_card', title: 'بطاقة ائتمانية', promptText: 'الدفع عبر فيزا أو ماستركارد', condition: 'اضغط 1', audioFile: A, nextNodes: ['confirm'] },
    { id: 'pay_bank', title: 'تحويل بنكي', promptText: 'تحويل لحساب الشركة البنكي', condition: 'اضغط 2', audioFile: A, nextNodes: ['confirm'] },
    { id: 'pay_sadad', title: 'سداد', promptText: 'الدفع عبر نظام سداد', condition: 'اضغط 3', audioFile: A, nextNodes: ['confirm'] },
    { id: 'confirm', title: 'تأكيد الدفع', promptText: 'هل تريد تأكيد عملية الدفع؟', audioFile: A, nextNodes: ['done', 'cancel'], branches: { done: 'نعم', cancel: 'لا' } },
    { id: 'done', title: 'تم السداد', promptText: 'سيتم إعادة تفعيل خدمتك خلال 30 دقيقة', audioFile: A, nextNodes: [] },
    { id: 'cancel', title: 'إلغاء العملية', promptText: 'تم إلغاء عملية الدفع، لن يتم خصم أي مبلغ', audioFile: A, nextNodes: [] },
    { id: 'agent', title: 'تحويل لموظف', promptText: 'جارِ التحويل لموظف خدمة العملاء', condition: 'اضغط 0', audioFile: A, nextNodes: [] },
  ],
}

const existingDunningAr: IVRFlow = {
  id: 'flow_existing_dunning_ar',
  name: 'عميل متأخر - عربي',
  filters: { type: 'Existing', status: 'Dunning', lang: 'عربي' },
  rootNodeId: 'root',
  nodes: [
    { id: 'root', title: 'الترحيب', promptText: 'أهلاً بك، لديك فاتورة متأخرة', audioFile: A, nextNodes: ['warning'] },
    { id: 'warning', title: 'تنبيه تأخر السداد', promptText: 'فاتورتك متأخرة، يرجى السداد قبل إيقاف الخدمة', audioFile: A, nextNodes: ['menu'] },
    { id: 'menu', title: 'قائمة الخيارات', promptText: 'للسداد 1، لخطة تقسيط 2، لتأجيل 3، لموظف 0', audioFile: A, nextNodes: ['pay_now', 'installment', 'postpone', 'agent'] },
    { id: 'pay_now', title: 'السداد الفوري', promptText: 'سداد كامل المبلغ الآن', condition: 'اضغط 1', audioFile: A, nextNodes: ['pay_card', 'pay_bank'] },
    { id: 'pay_card', title: 'بطاقة ائتمانية', promptText: 'الدفع عبر البطاقة', condition: 'اضغط 1', audioFile: A, nextNodes: [] },
    { id: 'pay_bank', title: 'تحويل بنكي', promptText: 'تحويل لحساب الشركة', condition: 'اضغط 2', audioFile: A, nextNodes: [] },
    { id: 'installment', title: 'خطة تقسيط', promptText: 'تقسيط المبلغ على 3 أو 6 أشهر', condition: 'اضغط 2', audioFile: A, nextNodes: ['plan_3', 'plan_6'] },
    { id: 'plan_3', title: 'تقسيط 3 أشهر', promptText: 'قسط شهري 33% من المبلغ', condition: 'اضغط 1', audioFile: A, nextNodes: [] },
    { id: 'plan_6', title: 'تقسيط 6 أشهر', promptText: 'قسط شهري 17% من المبلغ', condition: 'اضغط 2', audioFile: A, nextNodes: [] },
    { id: 'postpone', title: 'تأجيل السداد', promptText: 'تأجيل لمدة 7 أيام (متاح مرة واحدة)', condition: 'اضغط 3', audioFile: A, nextNodes: [] },
    { id: 'agent', title: 'تحويل لموظف', promptText: 'موظف التحصيل سيتواصل معك', condition: 'اضغط 0', audioFile: A, nextNodes: [] },
  ],
}

const newAr: IVRFlow = {
  id: 'flow_new_ar',
  name: 'عميل جديد - عربي',
  filters: { type: 'New', lang: 'عربي' },
  rootNodeId: 'root',
  nodes: [
    { id: 'root', title: 'الترحيب', promptText: 'أهلاً بك، يسعدنا اهتمامك بخدماتنا', audioFile: A, nextNodes: ['lang'] },
    { id: 'lang', title: 'اختيار اللغة', promptText: 'للعربية 1، for English 2', audioFile: A, nextNodes: ['menu'] },
    { id: 'menu', title: 'قائمة العميل الجديد', promptText: 'للاشتراك 1، للاستفسار عن الباقات 2، للأسعار 3، لموظف 0', audioFile: A, nextNodes: ['subscribe', 'packages', 'pricing', 'agent'] },
    { id: 'subscribe', title: 'الاشتراك الجديد', promptText: 'خطوات فتح حساب جديد', condition: 'اضغط 1', audioFile: A, nextNodes: ['sub_mobile', 'sub_internet', 'sub_both'] },
    { id: 'sub_mobile', title: 'اشتراك جوال', promptText: 'خط جوال مع باقة', condition: 'اضغط 1', audioFile: A, nextNodes: [] },
    { id: 'sub_internet', title: 'اشتراك إنترنت', promptText: 'إنترنت منزلي فايبر', condition: 'اضغط 2', audioFile: A, nextNodes: [] },
    { id: 'sub_both', title: 'باقة مشتركة', promptText: 'جوال + إنترنت بخصم', condition: 'اضغط 3', audioFile: A, nextNodes: [] },
    { id: 'packages', title: 'الباقات المتاحة', promptText: 'استعراض كافة الباقات', condition: 'اضغط 2', audioFile: A, nextNodes: ['pkg_basic', 'pkg_premium'] },
    { id: 'pkg_basic', title: 'الباقات الأساسية', promptText: 'من 50 ريال شهرياً', condition: 'اضغط 1', audioFile: A, nextNodes: [] },
    { id: 'pkg_premium', title: 'الباقات المميزة', promptText: 'من 200 ريال شهرياً', condition: 'اضغط 2', audioFile: A, nextNodes: [] },
    { id: 'pricing', title: 'قائمة الأسعار', promptText: 'تفاصيل الأسعار والعروض الترويجية', condition: 'اضغط 3', audioFile: A, nextNodes: [] },
    { id: 'agent', title: 'تحويل لمندوب مبيعات', promptText: 'مندوب المبيعات سيتواصل معك', condition: 'اضغط 0', audioFile: A, nextNodes: [] },
  ],
}

const existingActiveEn: IVRFlow = {
  id: 'flow_existing_active_en',
  name: 'Active Customer - English',
  filters: { type: 'Existing', status: 'Active', lang: 'English' },
  rootNodeId: 'root',
  nodes: [
    { id: 'root', title: 'Welcome', promptText: 'Welcome to customer service', audioFile: A, nextNodes: ['lang'] },
    { id: 'lang', title: 'Language Selection', promptText: 'Press 1 for Arabic, 2 for English', audioFile: A, nextNodes: ['menu'] },
    { id: 'menu', title: 'Main Menu', promptText: 'Account 1, Offers 2, Support 3, Agent 0', audioFile: A, nextNodes: ['account', 'offers', 'tech', 'agent'] },
    { id: 'account', title: 'My Account', promptText: 'Account and balance services', condition: 'Press 1', audioFile: A, nextNodes: ['balance', 'info', 'recharge'] },
    { id: 'balance', title: 'Current Balance', promptText: 'Your balance is X SAR', condition: 'Press 1', audioFile: A, nextNodes: [] },
    { id: 'info', title: 'Subscription Info', promptText: 'View current plan details', condition: 'Press 2', audioFile: A, nextNodes: [] },
    { id: 'recharge', title: 'Recharge', promptText: 'Card or balance transfer', condition: 'Press 3', audioFile: A, nextNodes: [] },
    { id: 'offers', title: 'Offers', promptText: 'Current offers available for you', condition: 'Press 2', audioFile: A, nextNodes: ['offer_data', 'offer_calls'] },
    { id: 'offer_data', title: 'Data Offers', promptText: 'From 10GB to 100GB', condition: 'Press 1', audioFile: A, nextNodes: [] },
    { id: 'offer_calls', title: 'Call Offers', promptText: 'Local and international calls', condition: 'Press 2', audioFile: A, nextNodes: [] },
    { id: 'tech', title: 'Technical Support', promptText: 'Connection and internet issues', condition: 'Press 3', audioFile: A, nextNodes: [] },
    { id: 'agent', title: 'Transfer to Agent', promptText: 'Please hold, transferring you', condition: 'Press 0', audioFile: A, nextNodes: [] },
  ],
}

const existingSuspendedEn: IVRFlow = {
  id: 'flow_existing_suspended_en',
  name: 'Suspended Customer - English',
  filters: { type: 'Existing', status: 'Suspended', lang: 'English' },
  rootNodeId: 'root',
  nodes: [
    { id: 'root', title: 'Welcome', promptText: 'Your service is currently suspended', audioFile: A, nextNodes: ['notice'] },
    { id: 'notice', title: 'Suspension Notice', promptText: 'Service suspended due to unpaid invoice', audioFile: A, nextNodes: ['menu'] },
    { id: 'menu', title: 'Options Menu', promptText: 'Pay 1, Amount 2, Agent 0', audioFile: A, nextNodes: ['pay', 'amount', 'agent'] },
    { id: 'amount', title: 'Outstanding Amount', promptText: 'Total due is X SAR', condition: 'Press 2', audioFile: A, nextNodes: ['pay'] },
    { id: 'pay', title: 'Payment Methods', promptText: 'Choose payment method', condition: 'Press 1', audioFile: A, nextNodes: ['pay_card', 'pay_bank', 'pay_sadad'] },
    { id: 'pay_card', title: 'Credit Card', promptText: 'Visa or Mastercard', condition: 'Press 1', audioFile: A, nextNodes: ['confirm'] },
    { id: 'pay_bank', title: 'Bank Transfer', promptText: 'Transfer to company account', condition: 'Press 2', audioFile: A, nextNodes: ['confirm'] },
    { id: 'pay_sadad', title: 'Sadad', promptText: 'Payment via Sadad system', condition: 'Press 3', audioFile: A, nextNodes: ['confirm'] },
    { id: 'confirm', title: 'Confirm Payment', promptText: 'Do you want to confirm this payment?', audioFile: A, nextNodes: ['done', 'cancel'], branches: { done: 'Yes', cancel: 'No' } },
    { id: 'done', title: 'Payment Done', promptText: 'Service will be restored in 30 minutes', audioFile: A, nextNodes: [] },
    { id: 'cancel', title: 'Payment Cancelled', promptText: 'Payment cancelled, no charge will be applied', audioFile: A, nextNodes: [] },
    { id: 'agent', title: 'Transfer to Agent', promptText: 'Transferring to customer service', condition: 'Press 0', audioFile: A, nextNodes: [] },
  ],
}

const existingDunningEn: IVRFlow = {
  id: 'flow_existing_dunning_en',
  name: 'Dunning Customer - English',
  filters: { type: 'Existing', status: 'Dunning', lang: 'English' },
  rootNodeId: 'root',
  nodes: [
    { id: 'root', title: 'Welcome', promptText: 'You have an overdue invoice', audioFile: A, nextNodes: ['warning'] },
    { id: 'warning', title: 'Overdue Notice', promptText: 'Please pay before service suspension', audioFile: A, nextNodes: ['menu'] },
    { id: 'menu', title: 'Options Menu', promptText: 'Pay 1, Installment 2, Postpone 3, Agent 0', audioFile: A, nextNodes: ['pay_now', 'installment', 'postpone', 'agent'] },
    { id: 'pay_now', title: 'Pay Now', promptText: 'Full payment now', condition: 'Press 1', audioFile: A, nextNodes: ['pay_card', 'pay_bank'] },
    { id: 'pay_card', title: 'Credit Card', promptText: 'Card payment', condition: 'Press 1', audioFile: A, nextNodes: [] },
    { id: 'pay_bank', title: 'Bank Transfer', promptText: 'Transfer to company account', condition: 'Press 2', audioFile: A, nextNodes: [] },
    { id: 'installment', title: 'Installment Plan', promptText: '3 or 6 months installments', condition: 'Press 2', audioFile: A, nextNodes: ['plan_3', 'plan_6'] },
    { id: 'plan_3', title: '3-Month Plan', promptText: '33% monthly', condition: 'Press 1', audioFile: A, nextNodes: [] },
    { id: 'plan_6', title: '6-Month Plan', promptText: '17% monthly', condition: 'Press 2', audioFile: A, nextNodes: [] },
    { id: 'postpone', title: 'Postpone Payment', promptText: '7-day postponement (one-time)', condition: 'Press 3', audioFile: A, nextNodes: [] },
    { id: 'agent', title: 'Transfer to Collections', promptText: 'Agent will contact you', condition: 'Press 0', audioFile: A, nextNodes: [] },
  ],
}

const newEn: IVRFlow = {
  id: 'flow_new_en',
  name: 'New Customer - English',
  filters: { type: 'New', lang: 'English' },
  rootNodeId: 'root',
  nodes: [
    { id: 'root', title: 'Welcome', promptText: 'Welcome, thank you for your interest', audioFile: A, nextNodes: ['lang'] },
    { id: 'lang', title: 'Language Selection', promptText: 'Press 1 for Arabic, 2 for English', audioFile: A, nextNodes: ['menu'] },
    { id: 'menu', title: 'New Customer Menu', promptText: 'Subscribe 1, Packages 2, Pricing 3, Agent 0', audioFile: A, nextNodes: ['subscribe', 'packages', 'pricing', 'agent'] },
    { id: 'subscribe', title: 'New Subscription', promptText: 'Steps to open a new account', condition: 'Press 1', audioFile: A, nextNodes: ['sub_mobile', 'sub_internet', 'sub_both'] },
    { id: 'sub_mobile', title: 'Mobile Subscription', promptText: 'Mobile line with package', condition: 'Press 1', audioFile: A, nextNodes: [] },
    { id: 'sub_internet', title: 'Internet Subscription', promptText: 'Fiber home internet', condition: 'Press 2', audioFile: A, nextNodes: [] },
    { id: 'sub_both', title: 'Bundled Package', promptText: 'Mobile + Internet with discount', condition: 'Press 3', audioFile: A, nextNodes: [] },
    { id: 'packages', title: 'Available Packages', promptText: 'Browse all packages', condition: 'Press 2', audioFile: A, nextNodes: ['pkg_basic', 'pkg_premium'] },
    { id: 'pkg_basic', title: 'Basic Packages', promptText: 'From 50 SAR/month', condition: 'Press 1', audioFile: A, nextNodes: [] },
    { id: 'pkg_premium', title: 'Premium Packages', promptText: 'From 200 SAR/month', condition: 'Press 2', audioFile: A, nextNodes: [] },
    { id: 'pricing', title: 'Price List', promptText: 'Pricing details and promotions', condition: 'Press 3', audioFile: A, nextNodes: [] },
    { id: 'agent', title: 'Transfer to Sales', promptText: 'Sales representative will contact you', condition: 'Press 0', audioFile: A, nextNodes: [] },
  ],
}

const vipAr: IVRFlow = {
  id: 'flow_vip_ar',
  name: 'عميل VIP - عربي',
  filters: { type: 'VIP', lang: 'عربي' },
  rootNodeId: 'root',
  nodes: [
    { id: 'root', title: 'ترحيب كبار العملاء', promptText: 'أهلاً بك عميلنا المميز، تم التعرف عليك كعميل VIP', audioFile: A, nextNodes: ['priority'] },
    { id: 'priority', title: 'خط الخدمة المباشر', promptText: 'سيتم تحويلك مباشرة لمدير حسابك، أو اختر خدمة', audioFile: A, nextNodes: ['manager', 'concierge', 'exclusive', 'priority_support'] },
    { id: 'manager', title: 'مدير الحساب الشخصي', promptText: 'تحويل فوري لمدير حسابك المخصص', condition: 'اضغط 1', audioFile: A, nextNodes: [] },
    { id: 'concierge', title: 'خدمة الكونسيرج', promptText: 'خدمة مساعد شخصي على مدار الساعة', condition: 'اضغط 2', audioFile: A, nextNodes: [] },
    { id: 'exclusive', title: 'العروض الحصرية', promptText: 'عروض خاصة لعملاء VIP فقط', condition: 'اضغط 3', audioFile: A, nextNodes: [] },
    { id: 'priority_support', title: 'الدعم ذو الأولوية', promptText: 'فريق دعم مخصص بدون انتظار', condition: 'اضغط 0', audioFile: A, nextNodes: [] },
  ],
}

const vipEn: IVRFlow = {
  id: 'flow_vip_en',
  name: 'VIP Customer - English',
  filters: { type: 'VIP', lang: 'English' },
  rootNodeId: 'root',
  nodes: [
    { id: 'root', title: 'VIP Welcome', promptText: 'Welcome, valued customer. You have been identified as VIP', audioFile: A, nextNodes: ['priority'] },
    { id: 'priority', title: 'Priority Service Line', promptText: 'You will be routed to your account manager, or select a service', audioFile: A, nextNodes: ['manager', 'concierge', 'exclusive', 'priority_support'] },
    { id: 'manager', title: 'Personal Account Manager', promptText: 'Immediate transfer to your dedicated manager', condition: 'Press 1', audioFile: A, nextNodes: [] },
    { id: 'concierge', title: 'Concierge Service', promptText: '24/7 personal assistant service', condition: 'Press 2', audioFile: A, nextNodes: [] },
    { id: 'exclusive', title: 'Exclusive Offers', promptText: 'Special offers for VIP customers only', condition: 'Press 3', audioFile: A, nextNodes: [] },
    { id: 'priority_support', title: 'Priority Support', promptText: 'Dedicated support team, no waiting', condition: 'Press 0', audioFile: A, nextNodes: [] },
  ],
}

const blacklistedAr: IVRFlow = {
  id: 'flow_blacklisted_ar',
  name: 'عميل محظور - عربي',
  filters: { type: 'Existing', status: 'Blacklisted', lang: 'عربي' },
  rootNodeId: 'root',
  nodes: [
    { id: 'root', title: 'إشعار حظر الخدمة', promptText: 'نعتذر، حسابك محظور حالياً عن استخدام الخدمة', audioFile: A, nextNodes: ['menu'] },
    { id: 'menu', title: 'قائمة الخيارات المتاحة', promptText: 'لتقديم اعتراض 1، للقسم القانوني 2، لموظف 0', audioFile: A, nextNodes: ['appeal', 'legal', 'agent'] },
    { id: 'appeal', title: 'تقديم اعتراض', promptText: 'إرسال طلب مراجعة الحظر', condition: 'اضغط 1', audioFile: A, nextNodes: [] },
    { id: 'legal', title: 'القسم القانوني', promptText: 'التواصل مع إدارة الامتثال والشؤون القانونية', condition: 'اضغط 2', audioFile: A, nextNodes: [] },
    { id: 'agent', title: 'تحويل لموظف', promptText: 'موظف مختص سيتواصل معك خلال 48 ساعة', condition: 'اضغط 0', audioFile: A, nextNodes: [] },
  ],
}

const blacklistedEn: IVRFlow = {
  id: 'flow_blacklisted_en',
  name: 'Blacklisted Customer - English',
  filters: { type: 'Existing', status: 'Blacklisted', lang: 'English' },
  rootNodeId: 'root',
  nodes: [
    { id: 'root', title: 'Service Block Notice', promptText: 'We apologize, your account is currently blocked from service', audioFile: A, nextNodes: ['menu'] },
    { id: 'menu', title: 'Available Options', promptText: 'Appeal 1, Legal Department 2, Agent 0', audioFile: A, nextNodes: ['appeal', 'legal', 'agent'] },
    { id: 'appeal', title: 'File an Appeal', promptText: 'Submit a request to review the block', condition: 'Press 1', audioFile: A, nextNodes: [] },
    { id: 'legal', title: 'Legal Department', promptText: 'Contact compliance and legal affairs', condition: 'Press 2', audioFile: A, nextNodes: [] },
    { id: 'agent', title: 'Transfer to Agent', promptText: 'A specialist will contact you within 48 hours', condition: 'Press 0', audioFile: A, nextNodes: [] },
  ],
}

export const mockDataset: IVRDataset = {
  appTitle: 'عارض مخططات IVR',
  customerTypes: ['New', 'Existing', 'VIP'],
  customerStatuses: ['Active', 'Suspended', 'Dunning', 'Blacklisted'],
  languages: ['عربي', 'English'],
  flows: [
    existingActiveAr,
    existingSuspendedAr,
    existingDunningAr,
    blacklistedAr,
    newAr,
    vipAr,
    existingActiveEn,
    existingSuspendedEn,
    existingDunningEn,
    blacklistedEn,
    newEn,
    vipEn,
  ],
}
