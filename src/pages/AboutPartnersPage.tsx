import React, { useState } from 'react';
import { DemoDataBadge } from '../components/DemoDataBadge';
import {
  Leaf,
  Building,
  CheckCircle2,
  Handshake,
} from 'lucide-react';

export const AboutPartnersPage: React.FC = () => {
  const [coordinatorName, setCoordinatorName] = useState('');
  const [societyName, setSocietyName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [role, setRole] = useState('RWA / Society Secretary');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coordinatorName || !societyName || !emailOrPhone) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100/80 border border-teal-300 text-xs font-bold uppercase tracking-wider text-teal-900 rounded-md">
          <Leaf className="w-3.5 h-3.5 text-teal-800" />
          <span>Mission LiFE Community Movement</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
          About & Community Partners
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Connecting grassroots neighbourhood action with national energy transition priorities through collective habit flexibility.
        </p>
      </div>

      {/* Mission LiFE Connection Card (Curved Box) */}
      <div className="p-8 sm:p-10 bg-white border-2 border-slate-300 shadow-sm space-y-6 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-800 text-white flex items-center justify-center rounded-xl font-bold">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-teal-800 block">
              Global Initiative Anchor
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Aligned with Mission LiFE (Lifestyle for Environment)
            </h2>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          Introduced at COP26, <strong>Mission LiFE</strong> mobilizes individuals to become 'Pro-Planet People' (P3) through simple everyday behavioral modifications. LiFE Flex League focuses specifically on <strong className="text-slate-900">Theme 1: Energy Conservation & Demand Flexibility</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-5 bg-[#f8fbfe] border border-sky-200 space-y-2 rounded-xl">
            <span className="text-xs font-bold text-teal-900 uppercase tracking-wide block">From Guilt to Teamwork</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Traditional carbon apps focus on individual guilt. LiFE Flex League celebrates social camaraderie—neighbours coordinating flexible tasks like a team relay.
            </p>
          </div>

          <div className="p-5 bg-[#f8fbfe] border border-sky-200 space-y-2 rounded-xl">
            <span className="text-xs font-bold text-teal-900 uppercase tracking-wide block">Shifting vs. Rationing</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Flexibility does not ask families to sit in the dark or suffer discomfort. It encourages simple timer delays: running washing machines when solar is abundant and avoiding dinner peaks.
            </p>
          </div>

          <div className="p-5 bg-[#f8fbfe] border border-sky-200 space-y-2 rounded-xl">
            <span className="text-xs font-bold text-teal-900 uppercase tracking-wide block">Shared Community Rewards</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instead of private crypto tokens or gimmicks, targets unlock tangible neighborhood assets: solar garden pathway lanterns and community efficiency audits.
            </p>
          </div>
        </div>
      </div>

      {/* For Society Coordinators & Lead Capture Form (Curved Rectangles) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-teal-800" />
              <span className="text-xs font-bold uppercase tracking-widest text-teal-800">
                Community Leaders
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              How Society Coordinators Participate
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Are you a Resident Welfare Association (RWA) secretary, housing society committee member, or school eco-club leader? You can launch a pilot relay for your residents.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-white border border-sky-200 space-y-1 rounded-xl shadow-sm">
              <span className="text-xs font-bold text-slate-900 block">1. Register Your Society</span>
              <p className="text-xs text-slate-600">
                Define your apartment towers, approximate household count, and designate voluntary floor champions.
              </p>
            </div>
            <div className="p-4 bg-white border border-sky-200 space-y-1 rounded-xl shadow-sm">
              <span className="text-xs font-bold text-slate-900 block">2. Schedule Weekly Relays</span>
              <p className="text-xs text-slate-600">
                Select a convenient 2-3 hour window (e.g. Wednesday dinner peak or Sunday solar surge) that aligns with your community rhythm.
              </p>
            </div>
            <div className="p-4 bg-white border border-sky-200 space-y-1 rounded-xl shadow-sm">
              <span className="text-xs font-bold text-slate-900 block">3. Unlock Shared Common Area Assets</span>
              <p className="text-xs text-slate-600">
                Achieve the 80% participation milestone to earn common area solar lanterns or energy audit consultations for the society.
              </p>
            </div>
          </div>
        </div>

        {/* Lead Capture Form for Coordinators (Curved Panel) */}
        <div className="lg:col-span-6 p-6 sm:p-8 bg-white border-2 border-slate-300 shadow-sm space-y-5 rounded-2xl">
          <div className="space-y-1">
            <span className="text-xs font-bold text-teal-800 uppercase tracking-widest block">
              Pilot Coordination Interest
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Connect Your Housing Society
            </h3>
            <p className="text-xs text-slate-600">
              Submit your interest to test a prototype relay in your apartment complex or school.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-teal-50 border-2 border-teal-700 space-y-3 text-center rounded-xl animate-in fade-in">
              <div className="w-10 h-10 bg-teal-800 text-white flex items-center justify-center mx-auto rounded-xl font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Interest Registered!</h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Thank you, <strong className="text-teal-900">{coordinatorName}</strong>. Your society <strong className="text-slate-900">{societyName}</strong> has been logged in our demonstration pilot registry.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-teal-800 font-bold uppercase underline cursor-pointer"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={coordinatorName}
                  onChange={e => setCoordinatorName(e.target.value)}
                  placeholder="e.g. Rameshwar Patel"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-1">
                  Housing Society / School Name
                </label>
                <input
                  type="text"
                  value={societyName}
                  onChange={e => setSocietyName(e.target.value)}
                  placeholder="e.g. Shantiniketan Enclave, Ahmedabad"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-1">
                  Role in Community
                </label>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 cursor-pointer rounded-lg"
                >
                  <option value="RWA / Society Secretary">RWA / Society Secretary</option>
                  <option value="Managing Committee Member">Managing Committee Member</option>
                  <option value="School / College Coordinator">School / College Coordinator</option>
                  <option value="Active Resident Advocate">Active Resident Advocate</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-1">
                  Email or Mobile Contact (Demo Simulation)
                </label>
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={e => setEmailOrPhone(e.target.value)}
                  placeholder="coordinator@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 rounded-lg"
                  required
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Demo feedback only. No automated sales calls or commercial sharing.
                </span>
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all rounded-lg"
              >
                Register Pilot Society Interest
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Potential Sponsor & Partner Principles (Curved Panel) */}
      <div className="p-8 bg-white border border-slate-300 space-y-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2">
          <Handshake className="w-5 h-5 text-teal-800" />
          <h3 className="text-lg font-bold text-slate-900 font-display">
            Sponsor Guidelines & Ethical Guardrails
          </h3>
          <DemoDataBadge label="Concept Guidelines" />
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          How potential sponsors (sustainable brands, public transit authorities, clean energy providers) can support community relays:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 pt-2">
          <div className="p-4 bg-[#f8fbfe] border border-sky-200 rounded-xl">
            <strong className="text-slate-900 block mb-1">Tangible Community Assets Only</strong>
            Sponsorship gifts must offer genuine energy efficiency or sustainability benefits (such as solar lanterns, LED conversion kits, or public transit passes).
          </div>
          <div className="p-4 bg-[#f8fbfe] border border-sky-200 rounded-xl">
            <strong className="text-slate-900 block mb-1">Clear Disclosure & No Exclusivity</strong>
            All sample sponsor items are clearly disclosed. We do not promote speculative carbon offsets, cryptocurrency, or predatory loans.
          </div>
        </div>
      </div>
    </div>
  );
};
