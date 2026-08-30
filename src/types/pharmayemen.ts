import { MedicineSearchRecord, getMedicineSearchMatch, rankMedicinesBySearch } from '../medicineSearch';
import nemlData from '../data/nemlCatalog.json';

export type PharmaSubscriptionPlan = 'free' | 'pro' | 'enterprise';
export type PharmaUserRole = 'admin' | 'pharmacy';

export interface PharmaStockAlert {
  id: string;
  entityId: string;
  entityName: string;
  drugName: string;
  genericName?: string;
  brandName?: string;
  type: 'near_expiry' | 'stagnant_stock' | 'market_shortage' | 'price_disruption';
  severity: 'low' | 'medium' | 'high' | 'critical';
  quantity: number;
  unit: string;
  expiryDate?: string;
  daysUntilExpiry?: number;
  governorate?: string;
  recommendedAction: string;
  isProOnly: boolean;
  createdAt: string;
}

export interface SocialBroadcastPayload {
  type: 'offer' | 'request' | 'urgent_shortage';
  drugName: string;
  genericName?: string;
  brandName?: string;
  quantity: number;
  unit: string;
  price?: number;
  currency?: string;
  entityName: string;
  governorate: string;
  phone: string;
  expiryDate?: string;
  urgency?: string;
  notes?: string;
}

export interface PharmaEntity {
  id: string;
  name: string;
  type: 'pharmacy' | 'hospital' | 'distributor' | 'clinic' | 'wholesaler';
  licenseNumber: string;
  governorate: string;
  city: string;
  address: string;
  phone: string;
  status: 'verified' | 'pending' | 'rejected';
  subscriptionPlan?: PharmaSubscriptionPlan;
  subscriptionExpiresAt?: string;
  createdAt: string;
}

export interface PharmaOffer {
  id: string;
  entityId: string;
  entityName: string;
  drugId?: string;
  isFreeText: boolean;
  freeTextName?: string;
  genericName?: string;
  brandName?: string;
  category?: string;
  quantity: number;
  unit: string;
  price?: number;
  currency: string;
  batchNumber?: string;
  expiryDate: string;
  status: 'active' | 'closed' | 'expired';
  notes?: string;
  createdAt: string;
}

export interface PharmaRequest {
  id: string;
  entityId: string;
  entityName: string;
  drugId?: string;
  isFreeText: boolean;
  freeTextName?: string;
  genericName?: string;
  category?: string;
  quantity: number;
  unit: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'fulfilled' | 'closed';
  notes?: string;
  createdAt: string;
}

export interface PharmaMatch {
  id: string;
  offerId: string;
  requestId: string;
  drugName: string;
  offeringEntity: string;
  requestingEntity: string;
  offerQuantity: number;
  requestQuantity: number;
  matchScore: number;
  matchType: 'exact' | 'prefix' | 'fuzzy';
  createdAt: string;
  status: 'new' | 'viewed' | 'connected';
}

export interface PharmaCatalogDrug extends MedicineSearchRecord {
  id: string;
  genericName: string;
  genericNameAr?: string;
  brandName?: string;
  brandNameAr?: string;
  dosageForm?: string;
  strength?: string;
  category: string;
  nemlCategory?: string;
  isYemeniLocal?: boolean;
  manufacturer?: string;
}

// Convert NEML JSON into typed Catalog Drugs
export const INITIAL_NEML_CATALOG: PharmaCatalogDrug[] = nemlData.catalog.map((item, idx) => ({
  id: `neml-${idx + 1}`,
  genericName: item.genericName,
  genericNameAr: item.genericName,
  brandName: item.genericName,
  brandNameAr: item.genericName,
  dosageForm: item.dosageForm,
  strength: item.strength?.replace(/^:\s*/, '') || '',
  category: item.category || 'عام',
  nemlCategory: item.category || 'NEML Essential',
  isYemeniLocal: false,
  manufacturer: 'مسجل في قائمة الأدوية الأساسية اليمنية (NEML)',
}));

// Arabic Category Translation Map
export const CATEGORY_TRANSLATIONS: Record<string, string> = {
  'all': 'جميع الفئات العلاجية',
  'ANTI-INFECTIVE MEDICINES': 'المضادات الحيوية والعدوى',
  'ANALGESICS, ANTIPYRETICS, NSAIDS': 'المسكنات ومضادات الالتهاب',
  'CARDIOVASCULAR MEDICINES': 'أدوية القلب والدورة الدموية والضغط',
  'MEDICINES AFFECTING THE BLOOD': 'أدوية الدم والتخثر',
  'GASTROINTESTINAL MEDICINES': 'أدوية الجهاز الهضمي والمعدة',
  'RESPIRATORY MEDICINES': 'أدوية الجهاز التنفسي والربو',
  'CENTRAL NERVOUS SYSTEM': 'أدوية الجهاز العصبي والنفسي',
  'HORMONES, OTHER ENDOCRINE MEDICINES AND CONTRACEPTIVES': 'الهرمونات والغدد والسكري',
  'IMMUNOLOGICALS': 'اللقاحات والأمصال والمناعة',
  'OPHTHALMOLOGICAL PREPARATIONS': 'مستحضرات العيون',
  'DERMATOLOGICAL MEDICINES (TOPICAL)': 'الأدوية الجلدية والموضعية',
  'DISINFECTANTS AND ANTISEPTICS': 'المطهرات والمعقمات',
  'DIURETICS': 'مدرات البول',
  'VITAMINS AND MINERALS': 'الفيتامينات والمعادن',
  'EAR, NOSE AND THROAT PREPARATIONS': 'مستحضرات الأنف والأذن والحنجرة',
  'MEDICINES FOR REPRODUCTIVE HEALTH AND PERINATAL CARE': 'الصحة الإنجابية والنساء والولادة',
};
