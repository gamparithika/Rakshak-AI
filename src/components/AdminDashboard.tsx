import React, { useState } from 'react';
import { Sliders, ShieldCheck, PlayCircle, Eye, RefreshCw, FileText, Lock, Users, Activity } from 'lucide-react';

interface AdminDashboardProps {
  currentTheme: 'government' | 'intelligence';
  liveStats: any;
  setLiveStats: any;
}

const NODAL_OFFICERS = [
  { name: 'Dr. G. R. Sreenivasan, IPS', designation: 'Joint Director, Cyber Coordination Center (I4C)', zone: 'Central Ministry HQ' },
  { name: 'Smt. Shalini Mathur, IPS', designation: 'Superintendent of Police, Cyber Crime Cell', zone: 'Delhi Outer Zone' },
  { name: 'Shri Vikramjeet Chawla', designation: 'Nodal Compliance Officer, RBI Cyber Cell', zone: 'Financial Regulation Nodal' },
  { name: 'Dr. Debabrata Das', designation: 'Nodal Coordinator, CERT-In Incident Response', zone: 'Metropolitan CERT Cell' }
];

const INITIAL_AUDITS = [
  { id: 'AUD-901', time: '10:52:14', actor: 'Audit System', action: 'eSIM Spoofing registry signature scan deployed', category: 'Predictive policing', level: 'Standard' },
  { id: 'AUD-892', time: '10:48:02', actor: 'Nodal Officer Mathur', action: 'Account linked to TXN-9021 frozen manually', category: 'Administrative Freeze', level: 'High' },
  { id: 'AUD-874', time: '10:14:35', actor: 'IGP Sreenivasan', action: 'Approved CBI Impersonation safety alert push', category: 'Public Warning Policy', level: 'Critical' },
  { id: 'AUD-852', time: '09:41:00', actor: 'System Daemon', action: 'Neural model weights synchronized successfully', category: 'AI Inference config', level: 'Standard' }
];

export default function AdminDashboard({ currentTheme, liveStats, setLiveStats }: AdminDashboardProps) {
  const [audits, setAudits] = useState(INITIAL_AUDITS);
  const [alertThreshold, setAlertThreshold] = useState<number>(75);

  const resetOperationalSystem = () => {
    alert("⚙ SYSTEM INFRASTRUCTURE OPTIMIZED!\nAll memory buffers pruned, NLP/Vision inference caches flushed, and SSL connection gateways synchronized.");
  };

  const triggerMockAudit = () => {
    const newAud = {
      id: 'AUD-' + Math.floor(910 + Math.random() * 80),
      time: new Date().toTimeString().split(' ')[0],
      actor: 'Admin Console',
      action: `Adjusted global threat notification threshold to ${alertThreshold}%`,
      category: 'Policy Edit',
      level: 'Standard'
    };
    setAudits([newAud, ...audits]);
  };

  return (
    <div className={`w-full py-6 px-4 lg:px-8 ${
      currentTheme === 'government' ? 'bg-[#F7F8FA] text-slate-800' : 'bg-zinc-950 text-zinc-100'
    }`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title */}
        <div className="mb-6 border-b pb-4 border-slate-200 dark:border-zinc-800 flex justify-between items-center flex-wrap gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-amber-600 dark:text-amber-400">Nodal Administration</span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Admin System Central</h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Nodal administrative settings, active security guidelines, and real-time ledger audit trails.</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={resetOperationalSystem}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#005CA9] hover:bg-[#003F7D] text-white text-xs font-bold uppercase rounded transition-all shadow"
            >
              <RefreshCw size={12} />
              <span>Optimise System</span>
            </button>
          </div>
        </div>

        {/* Core Admin Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Settings Console & Parameters */}
          <div className="lg:col-span-6 space-y-6">
            <div className={`p-6 rounded-xl border shadow-sm ${
              currentTheme === 'government' ? 'bg-white border-slate-300' : 'bg-zinc-900 border-zinc-800'
            }`}>
              <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                <Sliders className="text-blue-500" />
                <span>Nodal Platform Parameters</span>
              </h3>

              <div className="space-y-5">
                {/* Score threshold slider */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                    <span>Scam Trigger Severity Threshold</span>
                    <span className="text-[#005CA9] dark:text-cyan-400 font-mono">{alertThreshold}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="95"
                    value={alertThreshold}
                    onChange={(e) => { setAlertThreshold(Number(e.target.value)); }}
                    className="w-full h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#005CA9]"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1 leading-tight">
                    Any reported digital conversation with a neural risk score above this threshold triggers automated administrative alerts in Bank Nodal Hubs and nearest regional cyber offices.
                  </p>
                </div>

                {/* Submit Policy Update */}
                <button
                  onClick={triggerMockAudit}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase rounded transition-all"
                >
                  Publish New Compliance Rule Policy
                </button>
              </div>
            </div>

            {/* Active Duty Nodal Officers roster */}
            <div className={`p-6 rounded-xl border shadow-sm ${
              currentTheme === 'government' ? 'bg-white border-slate-300' : 'bg-zinc-900 border-zinc-800'
            }`}>
              <h3 className="font-bold text-base mb-3 flex items-center gap-2">
                <Users className="text-[#005CA9] dark:text-cyan-400" />
                <span>National Nodal Officers Council</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4">
                List of active regional cyber coordination officers assigned to security and money mule tracking committees.
              </p>

              <div className="space-y-3">
                {NODAL_OFFICERS.map((officer, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-zinc-950 border rounded text-xs border-slate-150 dark:border-zinc-900">
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-800 dark:text-zinc-200">{officer.name}</span>
                      <span className="text-[10px] text-emerald-500 uppercase font-mono">Duty Active</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">{officer.designation}</p>
                    <div className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">Jurisdiction: {officer.zone}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Administrative Ledger Audit Trails */}
          <div className="lg:col-span-6 space-y-6">
            <div className={`p-6 rounded-xl border shadow-sm ${
              currentTheme === 'government' ? 'bg-white border-slate-300' : 'bg-zinc-900 border-zinc-800'
            }`}>
              <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                <Activity className="text-rose-500" />
                <span>Nodal Operations Audit Ledger</span>
              </h3>

              <div className="space-y-3.5 max-h-[420px] overflow-y-auto pr-2">
                {audits.map((aud, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-zinc-950 border rounded-lg text-xs border-slate-150 dark:border-zinc-900">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-[#005CA9] dark:text-cyan-400">{aud.id}</span>
                        <span className="text-[10px] text-slate-400">{aud.time}</span>
                      </div>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        aud.level === 'Critical' 
                          ? 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400' 
                          : aud.level === 'High'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40'
                          : 'bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300'
                      }`}>
                        {aud.level}
                      </span>
                    </div>

                    <p className="font-semibold text-slate-800 dark:text-zinc-200 mt-1">{aud.action}</p>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 font-mono">
                      <span>Operator: <strong>{aud.actor}</strong></span>
                      <span>Category: <strong>{aud.category}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
