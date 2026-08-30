import React, { useState, useMemo } from 'react';
import { Search, Pill, Filter, CheckCircle2, BookmarkPlus } from 'lucide-react';
import { PharmaCatalogDrug, CATEGORY_TRANSLATIONS } from '../types/pharmayemen';
import { rankMedicinesBySearch, getMedicineSearchMatch } from '../medicineSearch';

interface PharmaCatalogViewProps {
  catalog: PharmaCatalogDrug[];
  onSelectDrugForOffer: (drug: PharmaCatalogDrug) => void;
  onSelectDrugForRequest: (drug: PharmaCatalogDrug) => void;
}

export const PharmaCatalogView: React.FC<PharmaCatalogViewProps> = ({
  catalog,
  onSelectDrugForOffer,
  onSelectDrugForRequest,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDrug, setSelectedDrug] = useState<PharmaCatalogDrug | null>(catalog[0] || null);

  // Filter and Rank with PharmaYemen's fuzzy matching engine
  const filteredCatalog = useMemo(() => {
    let list = catalog;

    if (selectedCategory !== 'all') {
      list = list.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      list = rankMedicinesBySearch(list, searchQuery.trim());
    }

    return list;
  }, [catalog, selectedCategory, searchQuery]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    catalog.forEach((item) => {
      if (item.category) cats.add(item.category);
    });
    return Array.from(cats);
  }, [catalog]);

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden bg-slate-50 dark:bg-slate-900">
      
      {/* Left List Pane */}
      <div className="w-full lg:w-[460px] flex flex-col border-b lg:border-b-0 lg:border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden">
        
        {/* Search and Category Filter Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3 bg-slate-50/70 dark:bg-slate-900/80">
          <div>
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Pill className="w-4 h-4 text-emerald-600" />
              دليل الأدوية الأساسية الموحد (NEML)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              كتالوج الأدوية الوطني المعتمد في الجمهورية اليمنية ({catalog.length} صنف علمي)
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم العلمي، التجاري، أو التركيز (بحث مرن)..."
              className="w-full pl-3 pr-9 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 py-1.5 px-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="all">جميع الفئات العلاجية ({catalog.length})</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY_TRANSLATIONS[cat] || cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800/40 text-[11px] font-medium text-slate-600 dark:text-slate-400 flex items-center justify-between">
          <span>نتائج البحث: {filteredCatalog.length} صنف</span>
          {searchQuery && (
            <span className="text-emerald-600 font-semibold">مطابقة محرك البحث الدوائي</span>
          )}
        </div>

        {/* List of Drugs */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
          {filteredCatalog.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <p className="text-sm font-medium">لم يتم العثور على أدوية مطابقة في الكتالوج</p>
              <p className="text-xs mt-1">يمكنك تسجيل طلب أو عرض دواء كـ "نص حر" من القائمة العلوية.</p>
            </div>
          ) : (
            filteredCatalog.map((drug) => {
              const isSelected = selectedDrug?.id === drug.id;
              return (
                <div
                  key={drug.id}
                  onClick={() => setSelectedDrug(drug)}
                  className={`p-3.5 cursor-pointer transition flex items-start justify-between gap-2 ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-r-4 border-emerald-600'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight truncate">
                        {drug.genericName}
                      </h3>
                      {drug.dosageForm && (
                        <span className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-1.5 py-0.2 rounded font-medium">
                          {drug.dosageForm}
                        </span>
                      )}
                    </div>
                    {drug.strength && (
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5">
                        التركيز: {drug.strength}
                      </p>
                    )}
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">
                      {CATEGORY_TRANSLATIONS[drug.category] || drug.category}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Right Detail / Monograph Pane */}
      <div className="flex-1 flex flex-col overflow-y-auto p-6 bg-white dark:bg-slate-900">
        {selectedDrug ? (
          <div className="max-w-2xl space-y-6">
            
            {/* Header */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/50 px-2.5 py-1 rounded-md">
                  مسجل في القائمة الوطنية NEML
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {selectedDrug.id}</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase mt-2">
                {selectedDrug.genericName}
              </h2>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                {CATEGORY_TRANSLATIONS[selectedDrug.category] || selectedDrug.category}
              </p>
            </div>

            {/* Quick Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                  الشكل الصيدلاني (Dosage Form)
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 block">
                  {selectedDrug.dosageForm || 'غير محدد'}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                  التركيز المعياري (Strength)
                </span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
                  {selectedDrug.strength || 'معيار قياسي'}
                </span>
              </div>
            </div>

            {/* Market Intelligence Actions */}
            <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-slate-900/10 p-5 rounded-2xl border border-emerald-500/20 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  إشارات السوق الذكية لهذا الصنف
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  يمكنك استخدام هذا الصنف المعياري فوراً لتسجيل فائض صيدليتك (عرض) أو تسجيل نقص واحتياج عاجل (طلب) ليتم مطابقته آلياً عبر المنصة.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  onClick={() => onSelectDrugForOffer(selectedDrug)}
                  className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold text-center shadow transition flex items-center justify-center gap-2"
                >
                  <BookmarkPlus className="w-4 h-4" />
                  تسجيل عرض فائض لهذا الدواء
                </button>
                <button
                  onClick={() => onSelectDrugForRequest(selectedDrug)}
                  className="flex-1 py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold text-center shadow transition flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  تسجيل طلب احتياج لهذا الدواء
                </button>
              </div>
            </div>

            {/* Note & Policy */}
            <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-4">
              📌 <strong>ضابط المنصة:</strong> هذا الكتالوج مأخوذ من القائمة الوطنية للأدوية الأساسية في اليمن (NEML). ظهور الصنف في الكتالوج لا يعني بالضرورة توفره الفعلي في مخازن المنصة، وإنما يُستخدم للتعرف المنضبط والمطابقة بين إشارات المنشآت الصحية.
            </div>

          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            اختر دواء من القائمة لعرض تفاصيله وإجراءات السوق.
          </div>
        )}
      </div>

    </div>
  );
};
