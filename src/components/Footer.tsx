import React from 'react';
import { useApp } from '../context/AppContext';
import { Zap, RotateCcw, ShieldCheck, Leaf } from 'lucide-react';
import { PageId } from '../types';

export const Footer: React.FC = () => {
  const { navigateTo, resetDemoData } = useApp();

  const handleNav = (page: PageId) => {
    navigateTo(page);
  };

  return (
    <footer className="mt-24 border-t border-slate-300 bg-[#e4eef4] text-slate-700 relative z-10">
      {/* Top Banner with Mission LiFE Connection */}
      <div className="border-b border-slate-300 bg-[#d8e7ef] px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-teal-800 text-white flex items-center justify-center shrink-0 rounded-lg">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-display">
                Inspired by Mission LiFE (Lifestyle for Environment)
              </h4>
              <p className="text-xs text-slate-600">
                Action Theme 1: Save Energy through Demand Flexibility and Neighbourhood Teamwork.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
            <button
              onClick={resetDemoData}
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
              title="Reset all local progress, participations, and community selections"
            >
              <RotateCcw className="w-3.5 h-3.5 text-teal-700" />
              <span>Reset Demo State</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-teal-800 text-white flex items-center justify-center rounded-md font-bold text-xs">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <span className="font-display font-extrabold text-base text-slate-900 tracking-tight">
                LiFE Flex League
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Empowering residential societies, apartment towers, and schools to coordinate flexible appliance habits through timed, shared Energy Relays.
            </p>
            <div className="pt-1 text-[11px] text-teal-800 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Educational Community Prototype</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Explore Application
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-teal-800 transition-colors cursor-pointer text-left font-medium"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('how-it-works')}
                  className="hover:text-teal-800 transition-colors cursor-pointer text-left font-medium"
                >
                  How Energy Relays Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('relay')}
                  className="hover:text-teal-800 transition-colors cursor-pointer text-left font-semibold text-teal-900"
                >
                  Live Energy Relay
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('challenges')}
                  className="hover:text-teal-800 transition-colors cursor-pointer text-left font-medium"
                >
                  Relay Challenges & Rules
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Tools & Communities */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Community & Tools
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('leaderboard')}
                  className="hover:text-teal-800 transition-colors cursor-pointer text-left font-medium"
                >
                  League Leaderboard & Rewards
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('solar')}
                  className="hover:text-teal-800 transition-colors cursor-pointer text-left font-medium"
                >
                  Rooftop Solar Readiness Explorer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('communities')}
                  className="hover:text-teal-800 transition-colors cursor-pointer text-left font-medium"
                >
                  Find & Join Local Societies
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-teal-800 transition-colors cursor-pointer text-left font-medium"
                >
                  Mission LiFE & Coordinator Info
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust, Safety & Ethics */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Comfort & Safety Standards
            </h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              Household health and comfort always come first. Shifting flexible tasks is voluntary and never applies to essential cooling, medical needs, or child safety.
            </p>
            <div className="p-3 bg-white border border-slate-300 text-[11px] text-slate-700 rounded-lg">
              <span className="font-bold text-slate-900 block mb-0.5">Participation Data</span>
              Actions are self-reported community coordination commitments, not smart meter billing readings.
            </div>
          </div>
        </div>

        {/* Detailed Transparency & Disclaimer Section */}
        <div className="pt-6 border-t border-slate-300 text-[11px] text-slate-600 space-y-2 leading-relaxed">
          <p>
            <strong className="text-slate-800">Prototype Disclaimer:</strong> LiFE Flex League is a demonstration and community product concept. All metrics, participating society counts, relay participants, points, and sponsor rewards (such as LED packs, transit vouchers, and society solar lanterns) are fictional demo representations for testing community mechanics. No official endorsement or partnership with the Gujarat Energy Development Agency (GEDA), state DISCOMs (UGVCL, Torrent Power, etc.), or commercial sponsors is implied or confirmed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 text-xs text-slate-600">
            <span>© {new Date().getFullYear()} LiFE Flex League. Built for Mission LiFE community engagement.</span>
            <div className="flex items-center gap-3 font-medium">
              <span>Accessibility WCAG AA</span>
              <span>·</span>
              <span>Zero Personal Data Collected</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
