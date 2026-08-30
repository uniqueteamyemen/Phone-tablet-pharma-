import React, { useState } from 'react';
import { 
  Building2, 
  FileText, 
  ArrowLeftRight, 
  AlertCircle, 
  TrendingUp, 
  Plus, 
  ShieldCheck, 
  Calendar,
  Sparkles,
  MapPin,
  CheckCircle2,
  Phone
} from 'lucide-react';
import { PharmaEntity, PharmaOffer, PharmaRequest, PharmaMatch } from '../types/pharmayemen';
import { PharmaLogo } from './PharmaLogo';
import { Pharma24hActivityWidget } from './Pharma24hActivityWidget';

interface PharmaOverviewProps {
  entity: PharmaEntity;
  offers: PharmaOffer[];
  requests: PharmaRequest[];
  matches: PharmaMatch[];
  onNavigateTab: (tab: 'catalog' | 'offers' | 'requests' | 'matches' | 'clinical') => void;
  onOpenCreateOffer: () => void;
  onOpenCreateRequest: () => void;
}

export const PharmaOverview: React.FC<PharmaOverviewProps> = ({
  entity,
  offers,
  requests,
  matches,
  onNavigateTab,
  onOpenCreateOffer,
  onOpenCreateRequest,
}) => {
  const activeOffers = offers.filter((o) => o.status === 'active');
  const openRequests = requests.filter((r) => r.status === 'open');
  const criticalRequests = openRequests.filter((r) => r.urgency === 'critical' || r.urgency === 'high');

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      
      {/* Welcome Banner with Official Logo */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-5 sm:p-6 rounded-3xl shadow-lg border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative overflow-hidden">
        <div className="flex items-start sm:items-center gap-4 relative z-10">
          <div className="p-2.5 rounded-2xl bg-slate-950/80 border border-teal-500/30 shadow-inner shrink-0 hidden sm:flex">
            <PharmaLogo variant="icon" size="lg" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                لوحة ذكاء سوق الدواء الوطني
              </span>
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                {entity.city} - {entity.governorate}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="sm:hidden">
                <PharmaLogo variant="icon" size="sm" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                أهلاً بك، {entity.name}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              منظومة الرصد والتوريد الصيدلاني الموحدة في اليمن. تنظيم إشارات العرض والطلب، تدوير الفائض، وتأمين الاحتياجات العلاجية العاجلة.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 relative z-10 shrink-0 self-stretch sm:self-auto justify-end">
          <button
            onClick={onOpenCreateRequest}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            تسجيل احتياج (طلب)
          </button>
          <button
            onClick={onOpenCreateOffer}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            تسجيل فائض (عرض)
          </button>
        </div>
      </div>

      {/* 24-Hour Market Activity & Growth Indicator Widget */}
      <Pharma24hActivityWidget
        offers={offers}
        requests={requests}
        matches={matches}
        onNavigateTab={onNavigateTab}
      />

      {/* 4 Main Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div 
          onClick={() => onNavigateTab('offers')}
          className="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700/70 shadow-sm cursor-pointer hover:border-emerald-500/50 transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">العروض النشطة (فائض)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{activeOffers.length}</span>
            <span className="text-[11px] text-emerald-600 font-bold">صنف معروض</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">توفير أصناف للمنشآت الأخرى</p>
        </div>

        {/* Metric 2 */}
        <div 
          onClick={() => onNavigateTab('requests')}
          className="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700/70 shadow-sm cursor-pointer hover:border-amber-500/50 transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">طلبات الاحتياج (شح)</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{openRequests.length}</span>
            <span className="text-[11px] text-amber-600 font-bold">{criticalRequests.length} عاجل/حرج</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">إشارات نقص دوائي مسجلة</p>
        </div>

        {/* Metric 3 */}
        <div 
          onClick={() => onNavigateTab('matches')}
          className="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700/70 shadow-sm cursor-pointer hover:border-emerald-500/50 transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">المطابقات الذكية اللحظية</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center text-teal-600">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{matches.length}</span>
            <span className="text-[11px] text-emerald-600 font-bold">فرصة ربط متطابقة</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">مطابقة العرض مع الطلب آلياً</p>
        </div>

        {/* Metric 4 */}
        <div 
          onClick={() => onNavigateTab('catalog')}
          className="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700/70 shadow-sm cursor-pointer hover:border-blue-500/50 transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">الكتالوج الوطني NEML</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">743</span>
            <span className="text-[11px] text-blue-600 font-bold">صنف أساسي معتمد</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">تحديث القائمة الرسمية الموحدة</p>
        </div>

      </div>

      {/* Smart Matches Spotlight Section */}
      {matches.length > 0 && (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/20 dark:to-slate-800/80 p-5 rounded-2xl border border-emerald-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                أحدث المطابقات المكتشفة بين المنشآت ({matches.length})
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('matches')}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              عرض كافة المطابقات ←
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {matches.slice(0, 2).map((match) => (
              <div
                key={match.id}
                className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/60 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                      {match.drugName}
                    </span>
                    <span className="text-[10px] font-black bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                      تطابق {match.matchScore}%
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-2 space-y-1">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">الجهة العارضة:</span>
                      <span>{match.offeringEntity}</span>
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded font-mono">
                        ({match.offerQuantity})
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">الجهة الطالبة:</span>
                      <span>{match.requestingEntity}</span>
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded font-mono">
                        ({match.requestQuantity})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={() => onNavigateTab('matches')}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    تفاصيل الاتصال والتنسيق ←
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Split Grid: Recent Offers & Recent Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Offers */}
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">أحدث عروض السوق (فائض)</h3>
            </div>
            <button
              onClick={() => onNavigateTab('offers')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              عرض الكل
            </button>
          </div>

          <div className="space-y-3">
            {offers.slice(0, 3).map((offer) => (
              <div
                key={offer.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    {offer.genericName || offer.brandName || offer.freeTextName}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    الكمية: <span className="font-semibold text-slate-800 dark:text-slate-200">{offer.quantity} {offer.unit}</span>
                    {offer.price ? ` • السعر: ${offer.price} ${offer.currency}` : ''}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    {offer.entityName}
                  </p>
                </div>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded">
                  {offer.status === 'active' ? 'نشط' : offer.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">أحدث طلبات الاحتياج (شح)</h3>
            </div>
            <button
              onClick={() => onNavigateTab('requests')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              عرض الكل
            </button>
          </div>

          <div className="space-y-3">
            {requests.slice(0, 3).map((req) => (
              <div
                key={req.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    {req.genericName || req.freeTextName}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    الكمية المطلوبة: <span className="font-semibold text-slate-800 dark:text-slate-200">{req.quantity} {req.unit}</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    {req.entityName}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    req.urgency === 'critical'
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      : req.urgency === 'high'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {req.urgency === 'critical' ? 'حرج جداً' : req.urgency === 'high' ? 'عاجل' : 'عادي'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
