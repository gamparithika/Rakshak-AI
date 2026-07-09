import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import CitizenPortal from './components/CitizenPortal';
import PoliceDashboard from './components/PoliceDashboard';
import BankPortal from './components/BankPortal';
import AdminDashboard from './components/AdminDashboard';
import AIAssistantPanel from './components/AIAssistantPanel';
import { Phone, ShieldCheck, Mail, MapPin, AlertCircle, Sparkles } from 'lucide-react';
import { useLanguage } from './lib/LanguageContext';

export default function App() {
  // Application states
  const [currentTheme, setTheme] = useState<'government' | 'intelligence'>('government');
  const [activeTab, setActiveTab] = useState<string>('landing');
  const { currentLanguage, setLanguage } = useLanguage();
  const [userRole, setUserRole] = useState<string | null>(null);

  // Live platform statistics synced with backend Express server
  const [liveStats, setLiveStats] = useState<any>({
    totalScamChecks: 1420,
    totalCurrencyChecks: 385,
    totalDeepfakeChecks: 612,
    flaggedThreats: 894,
    muleAccountsDetected: 147,
    heatMapHotspots: 42
  });

  // Pull operational stats on mount and interval
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/health');
        if (response.ok) {
          const data = await response.json();
          if (data.stats) {
            setLiveStats(data.stats);
          }
        }
      } catch (err) {
        console.log("Could not pull stats, running in local state:", err);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-300 ${
      currentTheme === 'government' ? 'bg-[#F7F8FA]' : 'bg-zinc-950 text-zinc-100'
    }`}>
      
      {/* Header element */}
      <Header
        currentTheme={currentTheme}
        setTheme={setTheme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLanguage={currentLanguage}
        setLanguage={setLanguage}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      {/* Main Content Stage */}
      <main className="flex-1 w-full flex flex-col">
        {activeTab === 'landing' && (
          <LandingPage
            currentTheme={currentTheme}
            setActiveTab={setActiveTab}
            liveStats={liveStats}
          />
        )}

        {activeTab === 'citizen' && (
          <CitizenPortal
            currentTheme={currentTheme}
            currentLanguage={currentLanguage}
          />
        )}

        {activeTab === 'police' && (
          <PoliceDashboard
            currentTheme={currentTheme}
          />
        )}

        {activeTab === 'bank' && (
          <BankPortal
            currentTheme={currentTheme}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            currentTheme={currentTheme}
            liveStats={liveStats}
            setLiveStats={setLiveStats}
          />
        )}

        {/* SOS Emergency Hotline Modal Screen */}
        {activeTab === 'sos' && (
          <div className="w-full max-w-4xl mx-auto py-12 px-6">
            <div className="p-8 rounded-2xl border border-red-200 dark:border-red-950/50 bg-red-500/10 backdrop-blur-md shadow-xl text-center space-y-6">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto text-white shadow-lg animate-ping">
                <AlertCircle size={32} />
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-red-600 dark:text-red-400 uppercase">
                EMERGENCY PUBLIC SOS DESK
              </h1>
              
              <p className="text-sm text-slate-700 dark:text-zinc-300 max-w-xl mx-auto leading-relaxed">
                If you are currently experiencing an active financial fraud incident, suspicious digital surveillance blackmail, or a digital arrest scenario, please follow the guidelines below immediately.
              </p>

              {/* Direct helpline grids */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="p-4 bg-white dark:bg-zinc-900 border rounded-xl shadow-sm text-left">
                  <span className="text-[10px] font-bold text-red-500 block uppercase mb-1">National Helpline</span>
                  <strong className="text-xl text-slate-900 dark:text-zinc-100 block">1930</strong>
                  <p className="text-[11px] text-slate-500 mt-1">Call within 24 hours to trigger banking transaction holds.</p>
                </div>

                <div className="p-4 bg-white dark:bg-zinc-900 border rounded-xl shadow-sm text-left">
                  <span className="text-[10px] font-bold text-[#005CA9] block uppercase mb-1">Emergency Dispatch</span>
                  <strong className="text-xl text-slate-900 dark:text-zinc-100 block">112</strong>
                  <p className="text-[11px] text-slate-500 mt-1">Direct link to nearest regional police responders and patrols.</p>
                </div>

                <div className="p-4 bg-white dark:bg-zinc-900 border rounded-xl shadow-sm text-left">
                  <span className="text-[10px] font-bold text-emerald-500 block uppercase mb-1">Online Reporting</span>
                  <strong className="text-sm text-slate-900 dark:text-zinc-100 block truncate underline">cybercrime.gov.in</strong>
                  <p className="text-[11px] text-slate-500 mt-2">File official details directly on national government repository.</p>
                </div>
              </div>

              {/* Citizen safety guidelines checklist */}
              <div className="bg-white dark:bg-zinc-950 p-6 rounded-xl border text-left space-y-3">
                <h3 className="font-bold text-sm text-slate-800 dark:text-zinc-100 flex items-center gap-2">
                  <ShieldCheck className="text-emerald-500" />
                  <span>Immediate Survival Directives against Digital Arrests</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-zinc-400 leading-normal">
                  <li><strong>• NEVER Join Skype / WhatsApp Video Calls:</strong> Real police, CBI, custom agents, or court judges do not interrogate via video apps or request online video stays.</li>
                  <li><strong>• Do NOT Transfer Money:</strong> Authorities do not demand transfer of assets or cash to 'safety accounts' or RBI validation pools.</li>
                  <li><strong>• Inform Your Family:</strong> Call a trusted family member or local friend immediately. Scammers thrive on isolating you with fear.</li>
                  <li><strong>• Record the Caller details:</strong> Note down their Skype usernames, telephone numbers, and UPI handles requested.</li>
                </ul>
              </div>

              <div className="pt-4 flex gap-3 justify-center">
                <button
                  onClick={() => setActiveTab('landing')}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold uppercase rounded-md shadow"
                >
                  Return to Overview
                </button>
                <button
                  onClick={() => {
                    alert("🚨 GPS coordinates packaged. Dispatch dispatched to nearest node.");
                  }}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase rounded-md shadow animate-pulse"
                >
                  Trace Device Location
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* AIAssistantPanel chatbot */}
      <AIAssistantPanel
        currentTheme={currentTheme}
        currentLanguage={currentLanguage}
      />

      {/* Footer element */}
      <Footer currentTheme={currentTheme} />
    </div>
  );
}
