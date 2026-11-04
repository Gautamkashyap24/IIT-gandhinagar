import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DemoDataBadge } from '../components/DemoDataBadge';
import {
  Users,
  Search,
  MapPin,
  Check,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const JoinCommunityPage: React.FC = () => {
  const { communities, activeCommunity, selectCommunity, navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredCommunities = communities.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = cityFilter === 'All' || c.city === cityFilter;
    const matchesType = typeFilter === 'All' || c.type === typeFilter;
    return matchesSearch && matchesCity && matchesType;
  });

  const handleSelect = (id: string) => {
    selectCommunity(id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100/80 border border-teal-300 text-xs font-bold uppercase tracking-wider text-teal-900 rounded-md">
          <Users className="w-3.5 h-3.5 text-teal-800" />
          <span>Local Neighbourhood Networks</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
          Join a Community
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Find your residential society, apartment tower, or school campus to collaborate on timed Energy Relays together.
        </p>
      </div>

      {/* Currently Joined Banner (Curved Panel) */}
      <div className="p-6 bg-white border-2 border-teal-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-800 text-white flex items-center justify-center font-bold rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-teal-800 block">
              Active Selected Team
            </span>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              {activeCommunity.name} · {activeCommunity.city}
            </h2>
            <span className="text-xs text-slate-600 font-medium">
              {activeCommunity.membersCount} participating households · Rank #{activeCommunity.currentRank} in Gujarat
            </span>
          </div>
        </div>

        <button
          onClick={() => navigateTo('relay')}
          className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all shrink-0 rounded-lg"
        >
          <span>View Team Relay</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Search & Filter Controls (Curved Box) */}
      <div className="p-5 bg-white border border-slate-300 shadow-sm space-y-3 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by society name, area, or city..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-700 rounded-lg"
            />
          </div>

          {/* City Filter */}
          <div className="md:col-span-3">
            <select
              value={cityFilter}
              onChange={e => setCityFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 cursor-pointer rounded-lg"
            >
              <option value="All">All Cities</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Surat">Surat</option>
              <option value="Vadodara">Vadodara</option>
              <option value="Rajkot">Rajkot</option>
              <option value="Gandhinagar">Gandhinagar</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="md:col-span-3">
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 cursor-pointer rounded-lg"
            >
              <option value="All">All Community Types</option>
              <option value="Housing Society">Housing Society</option>
              <option value="Apartment Complex">Apartment Complex</option>
              <option value="School / College">School / College</option>
              <option value="Neighbourhood Ward">Neighbourhood Ward</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
          <span>Showing {filteredCommunities.length} sample communities</span>
          <DemoDataBadge label="Fictional Registry" />
        </div>
      </div>

      {/* Communities Grid (Curved Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCommunities.map(comm => {
          const isCurrent = comm.id === activeCommunity.id;

          return (
            <div
              key={comm.id}
              className={`p-6 bg-white border flex flex-col justify-between space-y-5 shadow-sm rounded-2xl transition-all ${
                isCurrent
                  ? 'border-2 border-teal-800'
                  : 'border-sky-200 hover:border-slate-400'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-900 bg-teal-50 px-2 py-0.5 border border-teal-200 rounded-md">
                    {comm.type}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">
                    Rank #{comm.currentRank}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-display">
                  {comm.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>
                    {comm.area}, {comm.city} · {comm.pinCode}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                  <div className="p-2 bg-[#f8fbfe] border border-sky-200 rounded-lg">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Members</span>
                    <span className="font-mono font-bold text-slate-900">{comm.membersCount}</span>
                  </div>
                  <div className="p-2 bg-[#f8fbfe] border border-sky-200 rounded-lg">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Relays</span>
                    <span className="font-mono font-bold text-teal-800">
                      {comm.relaysCompleted}
                    </span>
                  </div>
                  <div className="p-2 bg-[#f8fbfe] border border-sky-200 rounded-lg">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Points</span>
                    <span className="font-mono font-bold text-slate-900">
                      {comm.totalPoints.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                {isCurrent ? (
                  <span className="py-2.5 px-3 text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-900 border border-teal-300 flex items-center gap-1.5 w-full justify-center rounded-lg">
                    <Check className="w-4 h-4 text-teal-800" />
                    <span>Your Active Society</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleSelect(comm.id)}
                    className="cursor-pointer w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider bg-white hover:bg-teal-800 hover:text-white text-slate-800 border border-slate-300 transition-all text-center rounded-lg"
                  >
                    Select this community
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Privacy Notice */}
      <div className="p-5 bg-white border border-slate-300 text-xs text-slate-600 flex items-start gap-3 rounded-2xl shadow-sm">
        <ShieldCheck className="w-5 h-5 text-teal-800 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-900 font-bold">Privacy & Data Governance:</strong> This prototype does not require accounts, phone numbers, or passwords. Selecting a community allows you to simulate neighbourhood team participation safely in your local browser.
        </p>
      </div>
    </div>
  );
};
