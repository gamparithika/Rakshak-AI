import React, { useState, useEffect } from 'react';
import { ShieldAlert, Users, Phone, Zap, ArrowRight, CheckCircle, Network, Flame, Calendar, Activity, Database, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../lib/LanguageContext';

interface LandingPageProps {
  currentTheme: 'government' | 'intelligence';
  setActiveTab: (tab: string) => void;
  liveStats: any;
}

const LIVE_TICKERS = [
  { id: '1', time: '1 min ago', city: 'Delhi NCR', type: 'Digital Arrest Call blocked', severity: 'Critical', saved: '₹4,50,000 Saved' },
  { id: '2', time: '3 mins ago', city: 'Hyderabad Cyber Cell', type: 'Mule Account frozen', severity: 'High', saved: '₹12,00,000 Saved' },
  { id: '3', time: '5 mins ago', city: 'Mumbai State Bank', type: 'Counterfeit ₹500 batch intercepted', severity: 'Medium', saved: '₹2,50,000 Saved' },
  { id: '4', time: '8 mins ago', city: 'Bengaluru Core', type: 'AI Voice Cloning deepfake blocked', severity: 'Critical', saved: '₹85,000 Saved' },
  { id: '5', time: '12 mins ago', city: 'Chandigarh Zone', type: 'WhatsApp scam link blacklisted', severity: 'Low', saved: '₹40,000 Saved' }
];

const HISTORIC_SAVINGS = [
  { month: 'Jan', scamsBlocked: 410, amountSaved: 2.1 },
  { month: 'Feb', scamsBlocked: 590, amountSaved: 3.5 },
  { month: 'Mar', scamsBlocked: 720, amountSaved: 4.8 },
  { month: 'Apr', scamsBlocked: 980, amountSaved: 6.9 },
  { month: 'May', scamsBlocked: 1250, amountSaved: 8.4 },
  { month: 'Jun', scamsBlocked: 1420, amountSaved: 11.2 }
];

export default function LandingPage({ currentTheme, setActiveTab, liveStats }: LandingPageProps) {
  const [tickerIndex, setTickerIndex] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % LIVE_TICKERS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-full min-h-screen py-6 px-4 lg:px-8 ${
      currentTheme === 'government' ? 'bg-[#F7F8FA] text-slate-800' : 'bg-zinc-950 text-zinc-100'
    }`}>
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto mt-4 mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-zinc-900 text-[#003F7D] dark:text-cyan-300 border border-blue-200 dark:border-zinc-800 rounded-full text-xs font-bold shadow-sm">
            <ShieldAlert size={14} className="text-[#005CA9] dark:text-cyan-400" />
            <span>{t('AI-First National Cybersecurity Initiative')}</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {t('Proactive Public Safety')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-cyan-400 dark:to-teal-300">
              {t('Intelligence System')}
            </span>
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-slate-600 dark:text-zinc-400 max-w-2xl">
            {t('LandingDescription')}
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setActiveTab('citizen')}
              className="flex items-center gap-2 px-5 py-3 bg-[#005CA9] hover:bg-[#003F7D] text-white text-sm font-semibold rounded-lg shadow-md transition-all group"
            >
              <span>{t('Scan Suspicious Files / SMS')}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setActiveTab('police')}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg border transition-all ${
                currentTheme === 'government'
                  ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800'
                  : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-100'
              }`}
            >
              <Network size={16} className="text-cyan-500" />
              <span>{t('Explore Fraud Network AI')}</span>
            </button>
          </div>
        </div>

        {/* Hero Interactive Stat Board */}
        <div className="lg:col-span-5">
          <div className={`p-6 rounded-xl border shadow-xl ${
            currentTheme === 'government' 
              ? 'bg-white border-slate-300' 
              : 'bg-zinc-900/80 border-zinc-800 backdrop-blur-md'
          }`}>
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-500 dark:text-zinc-500 mb-4 flex justify-between items-center">
              <span>{t('National Operations Dashboard')}</span>
              <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-lg border border-slate-100 dark:border-zinc-900">
                <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 block uppercase">{t('Scams Intercepted')}</span>
                <span className="text-xl md:text-2xl font-extrabold font-mono text-blue-600 dark:text-cyan-400 mt-1 block">
                  {liveStats?.totalScamChecks || "1,420"}
                </span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-lg border border-slate-100 dark:border-zinc-900">
                <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 block uppercase">{t('Mule Accounts Flagged')}</span>
                <span className="text-xl md:text-2xl font-extrabold font-mono text-emerald-500 mt-1 block">
                  {liveStats?.muleAccountsDetected || "147"}
                </span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-lg border border-slate-100 dark:border-zinc-900">
                <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 block uppercase">{t('Active Investigations')}</span>
                <span className="text-xl md:text-2xl font-extrabold font-mono text-amber-500 mt-1 block">
                  {liveStats?.heatMapHotspots || "42"}
                </span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-lg border border-slate-100 dark:border-zinc-900">
                <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 block uppercase">{t('Threat Alert rate')}</span>
                <span className="text-xl md:text-2xl font-extrabold font-mono text-rose-500 mt-1 block">
                  98.7%
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-zinc-800 text-xs">
              <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                <span>Active Duty Officers Logged</span>
                <strong>4,812 Personnel</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module Navigation Grid */}
      <section className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Activity size={20} className="text-blue-600 dark:text-cyan-400" />
          <span>Interactive Department Portals</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1: Citizen Safety Portal */}
          <div 
            onClick={() => setActiveTab('citizen')}
            className={`p-6 rounded-xl border hover:shadow-xl hover:scale-[1.02] cursor-pointer transition-all ${
              currentTheme === 'government' 
                ? 'bg-white border-slate-300 shadow-sm' 
                : 'bg-zinc-900 border-zinc-800'
            }`}
          >
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center mb-4 text-[#005CA9] dark:text-cyan-400">
              <Users size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">1. Citizen Safety Portal</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed mb-4">
              Protect your family. Screen suspicious calls, fake WhatsApp chats, SMS phishing transcripts, and verify RBI banknote security markers instantly.
            </p>
            <span className="text-xs font-semibold text-[#005CA9] dark:text-cyan-400 hover:underline inline-flex items-center gap-1">
              <span>Open Portal</span>
              <ArrowRight size={12} />
            </span>
          </div>

          {/* Card 2: Cybercrime Police Cell */}
          <div 
            onClick={() => setActiveTab('police')}
            className={`p-6 rounded-xl border hover:shadow-xl hover:scale-[1.02] cursor-pointer transition-all ${
              currentTheme === 'government' 
                ? 'bg-white border-slate-300 shadow-sm' 
                : 'bg-zinc-900 border-zinc-800'
            }`}
          >
            <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
              <Network size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">2. Cyber Police Cell</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed mb-4">
              For law enforcement officials. Real-time complaint feeds, visual fraud networks (UPI paths, money mules), and automatic case briefings generation.
            </p>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1">
              <span>Access Police Cell</span>
              <ArrowRight size={12} />
            </span>
          </div>

          {/* Card 3: Banking Anomaly Hub */}
          <div 
            onClick={() => setActiveTab('bank')}
            className={`p-6 rounded-xl border hover:shadow-xl hover:scale-[1.02] cursor-pointer transition-all ${
              currentTheme === 'government' 
                ? 'bg-white border-slate-300 shadow-sm' 
                : 'bg-zinc-900 border-zinc-800'
            }`}
          >
            <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400">
              <Database size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">3. Banking Anomaly Hub</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed mb-4">
              For commercial banks and financial nodes. Identify transaction anomalies, scan fake notes under UV simulator, and track suspected money mule rings.
            </p>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1">
              <span>Launch Anomaly Hub</span>
              <ArrowRight size={12} />
            </span>
          </div>

          {/* Card 4: Administrator Central */}
          <div 
            onClick={() => setActiveTab('admin')}
            className={`p-6 rounded-xl border hover:shadow-xl hover:scale-[1.02] cursor-pointer transition-all ${
              currentTheme === 'government' 
                ? 'bg-white border-slate-300 shadow-sm' 
                : 'bg-zinc-900 border-zinc-800'
            }`}
          >
            <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center mb-4 text-amber-600 dark:text-amber-400">
              <Zap size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">4. Admin Central</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed mb-4">
              For nodal agencies. Manage digital public logs, check API response metrics, control incident thresholds, and deploy predictive policing rules.
            </p>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1">
              <span>View Audit Logs</span>
              <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </section>

      {/* Analytics Chart Section */}
      <section className="max-w-7xl mx-auto mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className={`lg:col-span-8 p-6 rounded-xl border shadow-md ${
          currentTheme === 'government' ? 'bg-white border-slate-300' : 'bg-zinc-900 border-zinc-800'
        }`}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-lg">National Interdiction & Asset Recovery Trends</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Monthly breakdown of intercepted financial scams (in Crores INR)</p>
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded">
              YTD Blocked: ₹36.8 Cr
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HISTORIC_SAVINGS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={currentTheme === 'government' ? '#E5E7EB' : '#27272A'} />
                <XAxis dataKey="month" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: currentTheme === 'government' ? '#FFFFFF' : '#18181B', borderColor: '#888888' }} />
                <Area type="monotone" dataKey="amountSaved" name="Recovered Funds (Crores)" stroke="#10B981" fillOpacity={1} fill="url(#colorSaved)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="scamsBlocked" name="Blocked Cyber Threats" stroke="#3B82F6" fillOpacity={1} fill="url(#colorBlocked)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Advisory Bulletins Panel */}
        <div className={`lg:col-span-4 p-6 rounded-xl border shadow-md ${
          currentTheme === 'government' ? 'bg-white border-slate-300' : 'bg-zinc-900 border-zinc-800'
        }`}>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <AlertCircle className="text-amber-500" />
            <span>Government Cyber Advisories</span>
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 rounded-r-md">
              <span className="text-[10px] font-bold text-amber-600 block uppercase mb-1">Advisory #412/26</span>
              <h4 className="font-bold text-xs text-slate-800 dark:text-zinc-200">Beware fake telecom suspension messages</h4>
              <p className="text-[11px] text-slate-600 dark:text-zinc-400 mt-1 leading-relaxed">
                Fraudsters claim eSIM is expiring or telecom connection is blocked under court direction. Real operators never demand money or Skype verifications.
              </p>
            </div>

            <div className="p-3 bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 rounded-r-md">
              <span className="text-[10px] font-bold text-red-600 block uppercase mb-1">Critical Warning</span>
              <h4 className="font-bold text-xs text-slate-800 dark:text-zinc-200">Fake CBI Skype Video Calls</h4>
              <p className="text-[11px] text-slate-600 dark:text-zinc-400 mt-1 leading-relaxed">
                CBI, ED, custom commissioners, or local police cells never mandate online video stay, nor do they conduct investigations in hotel rooms or Skype.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Architecture Diagram (SVG) */}
      <section className={`max-w-7xl mx-auto p-8 rounded-xl border shadow-lg mb-12 ${
        currentTheme === 'government' ? 'bg-white border-slate-300' : 'bg-zinc-900 border-zinc-800'
      }`}>
        <div className="text-center mb-8">
          <h2 className="text-xl lg:text-2xl font-bold">RakshakAI Platform Architecture</h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">Enterprise Gov-Cloud Distributed Data & Processing Pipeline</p>
        </div>

        <div className="flex justify-center items-center overflow-x-auto py-4">
          <svg width="850" height="340" viewBox="0 0 850 340" className="min-w-[800px]">
            {/* Definitions */}
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#888888" />
              </marker>
            </defs>

            {/* Stage 1: Client Layer */}
            <rect x="20" y="90" width="160" height="150" rx="10" fill={currentTheme === 'government' ? '#005CA9' : '#1e293b'} stroke={currentTheme === 'government' ? '#003F7D' : '#334155'} strokeWidth="2" />
            <text x="100" y="125" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold">React SPA Client</text>
            <text x="100" y="145" textAnchor="middle" fill={currentTheme === 'government' ? '#e0f2fe' : '#94a3b8'} fontSize="10">TypeScript & Vite</text>
            <text x="100" y="165" textAnchor="middle" fill={currentTheme === 'government' ? '#e0f2fe' : '#94a3b8'} fontSize="10">Tailwind & Motion</text>
            <text x="100" y="185" textAnchor="middle" fill={currentTheme === 'government' ? '#e0f2fe' : '#94a3b8'} fontSize="10">Recharts Analytic Charts</text>
            <text x="100" y="205" textAnchor="middle" fill={currentTheme === 'government' ? '#e0f2fe' : '#94a3b8'} fontSize="10">Offline LocalStorage</text>

            {/* Flow arrow client to proxy */}
            <path d="M 180 165 L 260 165" stroke="#888888" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />

            {/* Stage 2: Gateway & App Server */}
            <rect x="270" y="50" width="220" height="230" rx="10" fill={currentTheme === 'government' ? '#e0f2fe' : '#090d16'} stroke={currentTheme === 'government' ? '#005CA9' : '#1e1b4b'} strokeWidth="2" />
            <text x="380" y="85" textAnchor="middle" fill={currentTheme === 'government' ? '#003F7D' : '#38bdf8'} fontSize="13" fontWeight="bold">API Gateway & Server</text>
            <text x="380" y="105" textAnchor="middle" fill={currentTheme === 'government' ? '#0f172a' : '#94a3b8'} fontSize="10">Node.js Express Framework</text>
            
            <rect x="290" y="130" width="180" height="50" rx="6" fill={currentTheme === 'government' ? '#ffffff' : '#1e1b4b'} stroke="#6366f1" strokeWidth="1" />
            <text x="380" y="150" textAnchor="middle" fill={currentTheme === 'government' ? '#1e1b4b' : '#c7d2fe'} fontSize="10" fontWeight="bold">Spring Boot Security API</text>
            <text x="380" y="162" textAnchor="middle" fill={currentTheme === 'government' ? '#475569' : '#a5b4fc'} fontSize="8">Role-Based RBAC Auth Token</text>

            <rect x="290" y="200" width="180" height="50" rx="6" fill={currentTheme === 'government' ? '#ffffff' : '#111827'} stroke="#10b981" strokeWidth="1" />
            <text x="380" y="220" textAnchor="middle" fill={currentTheme === 'government' ? '#065f46' : '#a7f3d0'} fontSize="10" fontWeight="bold">Database Aggregator</text>
            <text x="380" y="232" textAnchor="middle" fill={currentTheme === 'government' ? '#475569' : '#a7f3d0'} fontSize="8">MongoDB, Neo4j, Redis Hub</text>

            {/* Flows to AI */}
            <path d="M 490 120 L 570 120" stroke="#888888" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M 490 220 L 570 220" stroke="#888888" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Stage 3: AI Microservices */}
            <rect x="580" y="40" width="240" height="250" rx="10" fill={currentTheme === 'government' ? '#f1f5f9' : '#042f2e'} stroke="#14b8a6" strokeWidth="2" />
            <text x="700" y="75" textAnchor="middle" fill={currentTheme === 'government' ? '#0f172a' : '#2dd4bf'} fontSize="13" fontWeight="bold">FastAPI AI Microservices</text>

            {/* AI Models Boxes */}
            <rect x="600" y="100" width="200" height="40" rx="5" fill={currentTheme === 'government' ? '#ffffff' : '#111827'} stroke="#3b82f6" strokeWidth="1" />
            <text x="700" y="124" textAnchor="middle" fill={currentTheme === 'government' ? '#1e3a8a' : '#93c5fd'} fontSize="10" fontWeight="bold">Gemini Multimodal LLM</text>

            <rect x="600" y="160" width="200" height="40" rx="5" fill={currentTheme === 'government' ? '#ffffff' : '#111827'} stroke="#10b981" strokeWidth="1" />
            <text x="700" y="184" textAnchor="middle" fill={currentTheme === 'government' ? '#065f46' : '#a7f3d0'} fontSize="10" fontWeight="bold">Computer Vision Banknote Net</text>

            <rect x="600" y="220" width="200" height="40" rx="5" fill={currentTheme === 'government' ? '#ffffff' : '#111827'} stroke="#f59e0b" strokeWidth="1" />
            <text x="700" y="244" textAnchor="middle" fill={currentTheme === 'government' ? '#78350f' : '#fde68a'} fontSize="10" fontWeight="bold">Neural Speech Deepfake Engine</text>

            {/* Connection labels */}
            <text x="220" y="150" textAnchor="middle" fill="#888888" fontSize="9" fontWeight="bold">JSON REST</text>
            <text x="530" y="105" textAnchor="middle" fill="#888888" fontSize="9" fontWeight="bold">Python API</text>
            <text x="530" y="205" textAnchor="middle" fill="#888888" fontSize="9" fontWeight="bold">Data Sync</text>
          </svg>
        </div>
      </section>
    </div>
  );
}
