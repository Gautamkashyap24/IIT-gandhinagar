import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageId } from '../types';
import {
  Zap,
  Menu,
  X,
  Sparkles,
  Users,
  Compass,
  Trophy,
  Sun,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, navigateTo, activeCommunity, userParticipation } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { id: 'how-it-works', label: 'How It Works', icon: <Layers className="w-4 h-4" /> },
    { id: 'relay', label: 'Live Relay', icon: <Zap className="w-4 h-4" /> },
    { id: 'challenges', label: 'Challenges', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'leaderboard', label: 'Leaderboard & Rewards', icon: <Trophy className="w-4 h-4" /> },
    { id: 'solar', label: 'Solar Explorer', icon: <Sun className="w-4 h-4" /> },
    { id: 'communities', label: 'Communities', icon: <Users className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: PageId) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0d222c]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3 transition-all shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg py-1 px-1.5"
          aria-label="LiFE Flex League Homepage"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-sky-400 flex items-center justify-center shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 text-white fill-white/20" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg text-white tracking-tight leading-tight flex items-center gap-1.5">
              LiFE Flex League
            </span>
            <span className="text-[10px] text-teal-300 font-medium tracking-wider uppercase">
              Mission LiFE · Community
            </span>
          </div>
        </button>

        {/* Desktop Pill Navigation (Visual Reference Match) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden xl:flex items-center gap-1 glass-nav px-3 py-1.5 rounded-full shadow-2xl border border-white/15"
        >
          {navItems.map(item => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-md shadow-emerald-900/40'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Medium Screen Nav (truncated) */}
        <nav
          aria-label="Tablet Navigation"
          className="hidden md:flex xl:hidden items-center gap-1 glass-nav px-3 py-1.5 rounded-full border border-white/15"
        >
          {navItems.slice(0, 5).map(item => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500 text-white font-semibold'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Zone: Primary CTA & Community Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="text-[11px] text-slate-400">Society Team</span>
            <span className="text-xs font-semibold text-emerald-300 max-w-[130px] truncate" title={activeCommunity.name}>
              {activeCommunity.name}
            </span>
          </div>

          <button
            onClick={() => handleNavClick('relay')}
            className={`cursor-pointer inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-full transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 shrink-0 ${
              userParticipation.hasJoined
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/40'
                : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-400 hover:opacity-95 text-slate-950 font-bold border border-white/20'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="whitespace-nowrap">{userParticipation.hasJoined ? 'Active in Relay' : 'Live Relay'}</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl glass-panel text-slate-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 rounded-2xl glass-panel p-4 border border-white/20 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="pb-3 border-b border-white/10 mb-3 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Current Community</span>
              <span className="text-sm font-semibold text-emerald-300">{activeCommunity.name}</span>
            </div>
            <button
              onClick={() => handleNavClick('communities')}
              className="text-xs text-teal-300 underline font-medium"
            >
              Change
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map(item => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600/40 text-emerald-200 border border-emerald-500/40'
                      : 'text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <span className={isActive ? 'text-emerald-300' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-[11px] text-slate-400">
            <span>Mission LiFE Energy Challenge</span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
              Demo Platform
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
