import React from 'react';
import { ShieldAlert, PhoneCall, HelpCircle, Lock } from 'lucide-react';

interface FooterProps {
  currentTheme: 'government' | 'intelligence';
}

export default function Footer({ currentTheme }: FooterProps) {
  return (
    <footer className={`w-full border-t text-sm py-10 px-6 lg:px-12 ${
      currentTheme === 'government'
        ? 'bg-slate-100 text-slate-700 border-slate-300'
        : 'bg-zinc-950 text-zinc-400 border-zinc-800'
    }`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert size={20} className={currentTheme === 'government' ? 'text-[#005CA9]' : 'text-cyan-400'} />
            <span className="font-bold tracking-tight text-base uppercase">RAKSHAK AI</span>
          </div>
          <p className="text-xs leading-relaxed mb-4">
            A state-of-the-art national intelligence system designed to proactively mitigate digital arrests, deepfake threats, banking anomalies, and counterfeit fraud across jurisdictions.
          </p>
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <Lock size={12} className="text-emerald-500" />
            <span>AES-256 Bit Encrypted Sandbox</span>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider mb-4 border-b pb-1.5 border-slate-300 dark:border-zinc-800">
            Emergency Contacts
          </h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2">
              <PhoneCall size={12} className="text-rose-500" />
              <span>Cyber Helpline: <strong className="text-rose-500">1930</strong> (24/7 Toll-Free)</span>
            </li>
            <li>Police Control Room: <strong>112</strong></li>
            <li>Women Helpline: <strong>1091</strong></li>
            <li>E-mail: support-cybercell@gov.in</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider mb-4 border-b pb-1.5 border-slate-300 dark:border-zinc-800">
            Nodal Cyber Cells
          </h4>
          <ul className="space-y-2 text-xs">
            <li>National Cyber Crime Coordination Centre (I4C)</li>
            <li>CERT-In (Indian Computer Emergency Response Team)</li>
            <li>Reserve Bank of India (FMR Department)</li>
            <li>Ministry of Home Affairs - Cyber Division</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider mb-4 border-b pb-1.5 border-slate-300 dark:border-zinc-800">
            Resources & Policies
          </h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#compliance" className="hover:underline">Cyber Law Compliance (IT Act 2000)</a></li>
            <li><a href="#provisions" className="hover:underline">Prevention of Money Laundering (PMLA)</a></li>
            <li><a href="#guidance" className="hover:underline">Citizens Safety Advisory Guide</a></li>
            <li><a href="#api" className="hover:underline">Developer Integration APIs (REST)</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-300 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center text-[11px]">
        <p className="text-center sm:text-left mb-2 sm:mb-0">
          © 2026 RakshakAI. Built in collaboration with Indian Cyber Security Coordination Center. All Rights Reserved.
        </p>
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <HelpCircle size={10} />
            <span>WCAG 2.1 AA Compliant</span>
          </span>
          <span>|</span>
          <span>Security Audit: Passed (July 2026)</span>
        </div>
      </div>
    </footer>
  );
}
