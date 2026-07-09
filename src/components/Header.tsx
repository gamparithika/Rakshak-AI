import React from 'react';
import { Shield, AlertOctagon, Smartphone, Moon, Sun, Flame, Globe } from 'lucide-react';
import { useLanguage, LANGUAGES } from '../lib/LanguageContext';

interface HeaderProps {
  currentTheme: 'government' | 'intelligence';
  setTheme: (theme: 'government' | 'intelligence') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  userRole: string | null;
  setUserRole: (role: string | null) => void;
}

export default function Header({
  currentTheme,
  setTheme,
  activeTab,
  setActiveTab,
  currentLanguage,
  setLanguage,
  userRole,
  setUserRole
}: HeaderProps) {
  const { t } = useLanguage();

  return (
    <header className="w-full flex flex-col z-50">
      {/* Top Banner: Indian Government Authority Tag */}
      <div className={`w-full text-xs py-1.5 px-4 flex justify-between items-center ${
        currentTheme === 'government' 
          ? 'bg-slate-900 text-slate-300 border-b border-slate-700' 
          : 'bg-zinc-950 text-slate-400 border-b border-zinc-800'
      }`}>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
          <span className="font-semibold tracking-wider uppercase text-[10px]">{t('Ministry of Electronics & IT / Cyber Coordination Centre (I4C)')}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-rose-500 font-bold animate-pulse">
            <Flame size={12} />
            <span>{t('CRITICAL HELPLINE: 1930')}</span>
          </div>
          <span className="text-slate-500">|</span>
          <span>{t('Satyameva Jayate')}</span>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className={`w-full py-4 px-4 lg:px-8 flex flex-col md:flex-row justify-between items-center border-b ${
        currentTheme === 'government'
          ? 'bg-[#005CA9] text-white border-blue-800 shadow-sm'
          : 'bg-zinc-900 text-zinc-100 border-zinc-800 shadow-lg'
      }`}>
        {/* Brand & Emblem */}
        <div className="flex items-center gap-3 cursor-pointer mb-4 md:mb-0" onClick={() => setActiveTab('landing')}>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg lg:text-xl tracking-tight uppercase">RAKSHAK AI</span>
            </div>
            <p className={`text-[11px] leading-tight ${
              currentTheme === 'government' ? 'text-blue-100' : 'text-zinc-400'
            }`}>{t('Digital Public Safety Intelligence Platform')}</p>
          </div>
        </div>

        {/* Action Controls & Navigation tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-6">
          <nav className="flex gap-1 bg-black/10 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('landing')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'landing'
                  ? currentTheme === 'government' ? 'bg-white text-[#005CA9]' : 'bg-zinc-800 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {t('Overview')}
            </button>
            <button
              onClick={() => setActiveTab('citizen')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'citizen'
                  ? currentTheme === 'government' ? 'bg-white text-[#005CA9]' : 'bg-zinc-800 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {t('Citizen Portal')}
            </button>
            <button
              onClick={() => setActiveTab('police')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'police'
                  ? currentTheme === 'government' ? 'bg-white text-[#005CA9]' : 'bg-zinc-800 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {t('Cyber Police Cell')}
            </button>
            <button
              onClick={() => setActiveTab('bank')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'bank'
                  ? currentTheme === 'government' ? 'bg-white text-[#005CA9]' : 'bg-zinc-800 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {t('Banking Anomaly Hub')}
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'admin'
                  ? currentTheme === 'government' ? 'bg-white text-[#005CA9]' : 'bg-zinc-800 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {t('Admin Central')}
            </button>
          </nav>

          {/* SOS Emergency button */}
          <button 
            onClick={() => setActiveTab('sos')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-md transition-all shadow-md animate-pulse"
          >
            <AlertOctagon size={14} />
            <span>{t('SOS Emergency')}</span>
          </button>

          {/* Divider */}
          <span className="text-blue-400 hidden lg:inline">|</span>

          {/* Language Selector */}
          <div className="flex items-center gap-1.5 bg-black/10 hover:bg-black/20 p-1.5 rounded-md text-xs">
            <Globe size={13} className="text-slate-300" />
            <select
              value={currentLanguage}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none border-none cursor-pointer"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="text-slate-900 bg-white">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(currentTheme === 'government' ? 'intelligence' : 'government')}
            className={`p-2 rounded-md transition-all ${
              currentTheme === 'government' 
                ? 'bg-[#003F7D] text-amber-300 hover:bg-[#002D5A]' 
                : 'bg-zinc-800 text-cyan-400 hover:bg-zinc-700 border border-zinc-700'
            }`}
            title="Switch Dashboard Mode"
          >
            {currentTheme === 'government' ? (
              <div className="flex items-center gap-1 text-[11px] font-bold">
                <Moon size={14} />
                <span className="hidden sm:inline">{t('Intel View')}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-[11px] font-bold">
                <Sun size={14} />
                <span className="hidden sm:inline">{t('Govt View')}</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
