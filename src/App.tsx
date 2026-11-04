import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { LiveRelayPage } from './pages/LiveRelayPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { SolarExplorerPage } from './pages/SolarExplorerPage';
import { JoinCommunityPage } from './pages/JoinCommunityPage';
import { AboutPartnersPage } from './pages/AboutPartnersPage';
import { CheckCircle2, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentPage, toastMessage, clearToast } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'relay':
        return <LiveRelayPage />;
      case 'challenges':
        return <ChallengesPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'solar':
        return <SolarExplorerPage />;
      case 'communities':
        return <JoinCommunityPage />;
      case 'about':
        return <AboutPartnersPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#eef5f9] text-slate-900 selection:bg-teal-500/20 selection:text-teal-900">
      {/* Toast Notification Container (Subtle curved box) */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md p-4 bg-white border-2 border-teal-800 shadow-xl flex items-start gap-3 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-5 h-5 text-teal-800 shrink-0 mt-0.5" />
          <div className="text-xs font-medium text-slate-800 pr-2 leading-relaxed">
            {toastMessage}
          </div>
          <button
            onClick={clearToast}
            className="text-slate-500 hover:text-slate-900 p-1 ml-auto shrink-0 cursor-pointer rounded-lg"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main App Navigation */}
      <Navbar />

      {/* Page View Container */}
      <main className="flex-1 w-full" id="main-content">
        {renderPage()}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
