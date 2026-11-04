import React from 'react';
import { useApp } from '../context/AppContext';
import { DemoDataBadge } from '../components/DemoDataBadge';
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Activity,
  Layers,
  HeartHandshake,
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100/80 border border-teal-300 text-xs font-bold text-teal-900 rounded-md uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5 text-teal-800" />
          <span>Community Energy Coordination Model</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight text-balance">
          How LiFE Flex League Works
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Energy grids face daily stress when millions of households switch on heavy appliances simultaneously. Instead of rationing power or feeling guilty, neighbours coordinate simple time shifts.
        </p>
      </div>

      {/* The 3 Core Steps (Subtle Curved Rectangular Cards) */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="p-7 bg-white border border-sky-200 shadow-sm space-y-4 rounded-xl hover:border-teal-700 transition-colors">
            <div className="w-10 h-10 bg-teal-800 text-white flex items-center justify-center font-bold font-mono text-lg rounded-lg">
              1
            </div>
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Join a community
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Find your housing society, apartment complex, or school league. In LiFE Flex League, you are never an isolated user staring at confusing kilowatt graphs—you are part of a neighbourhood squad.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-800 shrink-0" />
                <span>No smart meter hardware required</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-800 shrink-0" />
                <span>RWA & committee friendly</span>
              </li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="p-7 bg-white border border-sky-200 shadow-sm space-y-4 rounded-xl hover:border-teal-700 transition-colors">
            <div className="w-10 h-10 bg-teal-800 text-white flex items-center justify-center font-bold font-mono text-lg rounded-lg">
              2
            </div>
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Choose a flexible action
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When a relay opens, select an action suitable for your home and schedule. Move dishwashing to noon when solar power is abundant, or bump AC to 26°C with ceiling fans during dinner peak.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-800 shrink-0" />
                <span>Comfort and family routines come first</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-800 shrink-0" />
                <span>Pick what fits your schedule</span>
              </li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="p-7 bg-white border border-sky-200 shadow-sm space-y-4 rounded-xl hover:border-teal-700 transition-colors">
            <div className="w-10 h-10 bg-teal-800 text-white flex items-center justify-center font-bold font-mono text-lg rounded-lg">
              3
            </div>
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Complete relay together
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Each household that checks in moves the community progress bar. Reaching the participation threshold unlocks shared benefits for your society, like solar pathway lights or community gardens.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-800 shrink-0" />
                <span>Unlocks shared assets for society</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-800 shrink-0" />
                <span>Eligible for sample sponsor drawings</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Critical Transparency Callout (Curved Panel) */}
      <div className="p-8 bg-white border-2 border-amber-300 shadow-sm space-y-4 rounded-2xl">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5 rounded-lg font-bold">
            <ShieldCheck className="w-5 h-5 text-amber-800" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                Understanding Data Transparency: Participation vs. Measured Savings
              </h2>
              <DemoDataBadge label="Core Principle" />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We believe in honest, credible community engagement without pseudo-scientific claims.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-[#f8fbfe] border border-sky-200 space-y-1.5 rounded-xl">
            <span className="text-xs font-bold text-teal-900 flex items-center gap-1.5 uppercase tracking-wide">
              <Activity className="w-4 h-4 text-teal-800" />
              What This Platform Tracks (Participation Data)
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Self-reported community coordination: households committing to and attesting to shifting specific high-wattage appliance tasks. This builds social cohesion, habit awareness, and neighbourhood synchronization.
            </p>
          </div>

          <div className="p-4 bg-[#f8fbfe] border border-sky-200 space-y-1.5 rounded-xl">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <Clock className="w-4 h-4 text-slate-600" />
              What Requires Real Utility Smart Meters (Measured Savings)
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Verifying exact kWh reduction or net grid impact requires real-time AMI bi-directional meter readings or utility DISCOM settlement integration. Because this prototype is an educational community demo, no measured energy reduction is claimed.
            </p>
          </div>
        </div>
      </div>

      {/* Comfort & Health First (Curved Banner) */}
      <div className="p-6 bg-white border border-sky-300 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <HeartHandshake className="w-8 h-8 text-teal-800 shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Comfort and Household Well-Being Always Come First
            </h3>
            <p className="text-xs text-slate-600">
              Never delay an appliance if it causes distress, interferes with medication or elderly care, or disrupts household routines. Energy relays are about flexible discretion, never deprivation.
            </p>
          </div>
        </div>
        <button
          onClick={() => navigateTo('relay')}
          className="cursor-pointer shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase tracking-wider rounded-lg"
        >
          <span>Try the live relay</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
