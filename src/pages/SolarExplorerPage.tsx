import React, { useState } from 'react';
import { calculateSolarReadiness } from '../utils/solarCalculator';
import { DemoDataBadge } from '../components/DemoDataBadge';
import {
  Sun,
  Calculator,
  HelpCircle,
  Building,
} from 'lucide-react';

export const SolarExplorerPage: React.FC = () => {
  const [monthlyBill, setMonthlyBill] = useState<number>(3200);
  const [city, setCity] = useState<string>('Ahmedabad');
  const [pinCode, setPinCode] = useState<string>('380009');
  const [roofAreaSqFt, setRoofAreaSqFt] = useState<number>(450);
  const [shadingLevel, setShadingLevel] = useState<'none' | 'partial' | 'heavy'>('none');

  const result = calculateSolarReadiness({
    monthlyBill: Number(monthlyBill) || 2500,
    city,
    pinCode,
    roofAreaSqFt: Number(roofAreaSqFt) || 0,
    shadingLevel,
  });

  const gujaratPresetCities = [
    { name: 'Ahmedabad', pin: '380009' },
    { name: 'Surat', pin: '395007' },
    { name: 'Vadodara', pin: '390001' },
    { name: 'Rajkot', pin: '360001' },
    { name: 'Gandhinagar', pin: '382010' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100/80 border border-amber-300 text-xs font-bold uppercase tracking-wider text-amber-900 rounded-md">
          <Sun className="w-3.5 h-3.5 text-amber-800" />
          <span>PM Surya Ghar Readiness Tool</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
          Rooftop Solar Explorer
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Estimate indicative rooftop solar system size, monthly generation, space requirements, and national subsidy eligibility for Gujarat households.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols - Curved Box) */}
        <div className="lg:col-span-5 p-6 sm:p-7 bg-white border border-slate-300 shadow-sm space-y-6 rounded-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h2 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-700" />
              <span>Household Inputs</span>
            </h2>
            <DemoDataBadge label="Indicative Model" />
          </div>

          {/* City Preset */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              City & PIN Code
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {gujaratPresetCities.map(c => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => {
                    setCity(c.name);
                    setPinCode(c.pin);
                  }}
                  className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-md ${
                    city === c.name
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="City Name"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-600 rounded-lg"
              />
              <input
                type="text"
                value={pinCode}
                onChange={e => setPinCode(e.target.value)}
                placeholder="PIN Code"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-600 rounded-lg"
              />
            </div>
          </div>

          {/* Monthly Bill */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold uppercase tracking-wider text-slate-700">
                Monthly Electricity Bill
              </label>
              <span className="font-mono font-bold text-teal-800 text-sm">
                ₹{Number(monthlyBill).toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={800}
              max={12000}
              step={200}
              value={monthlyBill}
              onChange={e => setMonthlyBill(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 cursor-pointer accent-teal-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>₹800/mo</span>
              <span>₹6,000/mo</span>
              <span>₹12,000+/mo</span>
            </div>
          </div>

          {/* Roof Area */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold uppercase tracking-wider text-slate-700">
                Usable Roof Area (sq ft)
              </label>
              <span className="font-mono font-bold text-slate-900 text-sm">
                {roofAreaSqFt > 0 ? `${roofAreaSqFt} sq ft` : 'Unknown'}
              </span>
            </div>
            <input
              type="range"
              min={100}
              max={1500}
              step={50}
              value={roofAreaSqFt}
              onChange={e => setRoofAreaSqFt(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 cursor-pointer accent-teal-800 rounded-lg"
            />
            <span className="text-[10px] text-slate-500 block">
              Typical terraced house or RWA shared roof allocation.
            </span>
          </div>

          {/* Shading */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Surrounding Trees / Building Shadow
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'none', label: 'Clear Sky' },
                  { id: 'partial', label: 'Partial Shade' },
                  { id: 'heavy', label: 'Heavy Trees' },
                ] as const
              ).map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setShadingLevel(opt.id)}
                  className={`py-2 px-2 text-xs font-bold uppercase tracking-wider border text-center transition-all cursor-pointer rounded-lg ${
                    shadingLevel === opt.id
                      ? 'bg-teal-800 border-teal-800 text-white'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Indicative Results Display (7 cols - Curved Box) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 bg-white border-2 border-slate-300 shadow-sm space-y-6 rounded-2xl">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-800 block">
                  Indicative Solar Assessment
                </span>
                <h3 className="text-2xl font-black text-slate-900 font-display">
                  Recommended: {result.recommendedKw} kWp Grid-Tied System
                </h3>
              </div>
              <span className="px-2.5 py-1 text-xs font-bold bg-teal-100 text-teal-900 border border-teal-300 font-mono rounded-md">
                ~{result.estimatedMonthlyUnits} units / month
              </span>
            </div>

            {/* Metric Strip (Curved Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-[#f5f9fc] border border-sky-200 space-y-1 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Estimated Savings</span>
                <span className="text-base sm:text-lg font-bold text-teal-800 font-mono">
                  ~₹{result.indicativeMonthlySavings.toLocaleString()}/mo
                </span>
                <span className="text-[10px] text-slate-500 block">
                  ~₹{result.indicativeAnnualSavings.toLocaleString()}/yr
                </span>
              </div>

              <div className="p-3.5 bg-[#f5f9fc] border border-sky-200 space-y-1 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Central Subsidy</span>
                <span className="text-base sm:text-lg font-bold text-amber-800 font-mono">
                  ₹{result.indicativeGovtSubsidy.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  PM Surya Ghar Slabs
                </span>
              </div>

              <div className="p-3.5 bg-[#f5f9fc] border border-sky-200 space-y-1 col-span-2 sm:col-span-1 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Estimated Payback</span>
                <span className="text-base sm:text-lg font-bold text-slate-900 font-mono">
                  ~{result.indicativeSimplePaybackYears} Years
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Based on current tariffs
                </span>
              </div>
            </div>

            {/* Roof Area Feasibility Check (Curved Box) */}
            <div className="p-4 bg-[#f8fbfe] border border-sky-200 space-y-2 rounded-xl">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-800 font-bold flex items-center gap-1.5 uppercase tracking-wide">
                  <Building className="w-4 h-4 text-teal-800" />
                  Rooftop Space Feasibility
                </span>
                <span
                  className={`font-bold px-2 py-0.5 text-[10px] uppercase rounded-md ${
                    result.isRoofSufficient
                      ? 'bg-teal-100 text-teal-900 border border-teal-300'
                      : 'bg-rose-100 text-rose-900 border border-rose-300'
                  }`}
                >
                  {result.isRoofSufficient ? 'Space Appears Sufficient' : 'Limited Roof Space'}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                A {result.recommendedKw} kWp installation requires approximately{' '}
                <strong className="text-slate-900">{result.requiredRoofAreaSqFt} sq ft</strong> of shadow-free rooftop area.
                {result.roofAreaSqFt > 0 && ` You specified ${result.roofAreaSqFt} sq ft.`}
              </p>
            </div>

            {/* Cost and Investment Summary */}
            <div className="p-4 bg-white border border-slate-300 text-xs space-y-2 rounded-xl">
              <div className="flex justify-between text-slate-600">
                <span>Indicative Turnkey System Cost:</span>
                <span className="text-slate-900 font-mono font-medium">
                  ₹{result.indicativeSystemCostRange[0].toLocaleString()} – ₹{result.indicativeSystemCostRange[1].toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimated Direct Subsidy Credit:</span>
                <span className="text-teal-800 font-mono font-bold">
                  - ₹{result.indicativeGovtSubsidy.toLocaleString()}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-sm">
                <span>Estimated Net Investment:</span>
                <span className="text-teal-900 font-mono">
                  ₹{result.indicativeNetCostRange[0].toLocaleString()} – ₹{result.indicativeNetCostRange[1].toLocaleString()}
                </span>
              </div>
            </div>

            {/* Mandatory Disclaimers */}
            <div className="p-3.5 bg-amber-50 border border-amber-300 text-[11px] text-amber-950 leading-relaxed rounded-xl">
              <strong className="text-amber-900 block mb-0.5 uppercase tracking-wide">Educational Prototype Notice:</strong>
              {result.disclaimer} We do not sell equipment, process loan applications, or claim DISCOM partnership.
            </div>
          </div>

          {/* Questions to Ask an Empanelled Installer (Curved Box) */}
          <div className="p-6 bg-white border border-slate-300 space-y-4 rounded-2xl shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-teal-800" />
              5 Key Questions to Ask an Empanelled Vendor
            </h4>
            <ul className="text-xs text-slate-700 space-y-2.5">
              {result.questionsForInstaller.map((q, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-teal-800 text-white font-mono flex items-center justify-center shrink-0 text-[10px] rounded-md font-bold">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
