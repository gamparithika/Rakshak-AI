import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Layers, 
  FileSymlink, 
  Network, 
  MapPin, 
  Sliders, 
  PlayCircle, 
  Eye, 
  RefreshCw, 
  FileText, 
  CheckSquare, 
  ListOrdered, 
  Clipboard, 
  TrendingUp, 
  AlertTriangle, 
  User, 
  Download, 
  Send, 
  Phone, 
  CreditCard, 
  Laptop, 
  Globe, 
  Users, 
  ArrowRight, 
  Video, 
  Music, 
  Check, 
  Ban, 
  X,
  FileCheck,
  Building,
  Volume2,
  Image as ImageIcon
} from 'lucide-react';

interface PoliceDashboardProps {
  currentTheme: 'government' | 'intelligence';
}

interface Evidence {
  type: 'image' | 'audio' | 'video' | 'chat' | 'document';
  title: string;
  fileName: string;
  size: string;
  url: string;
  transcript?: string;
}

interface Complaint {
  id: string;
  citizenName: string;
  scamType: string;
  riskLevel: number;
  confidence: number;
  status: 'New' | 'Assigned' | 'Under Investigation' | 'Closed';
  assignedOfficer: string;
  date: string;
  location: string;
  description: string;
  phone: string;
  upiId: string;
  bankAccount: string;
  ipAddress: string;
  deviceId: string;
  victimCount: number;
  estimatedLoss: string;
  evidenceList: Evidence[];
}

// 1. Interactive Core Complaints Data State
const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'CP-2026-9042',
    citizenName: 'Rajesh Iyer',
    scamType: 'Digital Arrest Scam',
    riskLevel: 99,
    confidence: 98,
    status: 'New',
    assignedOfficer: 'Unassigned',
    date: '2026-07-08',
    location: 'South Mumbai, Maharashtra',
    phone: '+91 94211 20211',
    upiId: 'central-regulatory@okaxis',
    bankAccount: 'SBI - 309928189021',
    ipAddress: '103.45.2.14',
    deviceId: 'OnePlus 11 Pro',
    victimCount: 48,
    estimatedLoss: '₹72 Lakhs',
    description: 'Received a VoIP Skype call from suspects posing as CBI Deputy Directors. Falsely claimed an international drug cartel shipment had my Aadhaar registration. Forced an immediate online digital arrest staying on webcam for 14 hours and coerced ₹15,00,000 for verification.',
    evidenceList: [
      { type: 'image', title: 'CBI Letterhead Arrest Order', fileName: 'fake_cbi_warrant_stamp.png', size: '2.4 MB', url: '#' },
      { type: 'audio', title: 'Scammer Interrogation Voice Link', fileName: 'voip_threat_record_3.mp3', size: '5.2 MB', url: '#', transcript: '"If you log off this video feed, military police will arrive at your door in 30 minutes. Real-time verification is active. Transfer funds to safe verification account now."' },
      { type: 'video', title: 'Recorded Skype Courtroom Feed', fileName: 'fake_interrogation_room.mp4', size: '24.1 MB', url: '#' },
      { type: 'chat', title: 'WhatsApp Threat Logs Screenshot', fileName: 'whatsapp_blackmail_chat.jpg', size: '940 KB', url: '#' },
      { type: 'document', title: 'Supreme Court Frozen Asset Writ', fileName: 'sc_forgery_specimen.pdf', size: '1.2 MB', url: '#' }
    ]
  },
  {
    id: 'CP-2026-7712',
    citizenName: 'Amina Begum',
    scamType: 'Part-Time Tasks Fraud',
    riskLevel: 92,
    confidence: 95,
    status: 'Assigned',
    assignedOfficer: 'Insp. Sneha Patil',
    date: '2026-07-07',
    location: 'Hyderabad, Telangana',
    phone: '+91 88412 10998',
    upiId: 'earn-easy-task@paytm',
    bankAccount: 'HDFC - 918230129481',
    ipAddress: '202.141.56.8',
    deviceId: 'Samsung Galaxy S23 Ultra',
    victimCount: 32,
    estimatedLoss: '₹28 Lakhs',
    description: 'Invited to a Telegram channel promising easy passive income for clicking YouTube thumbs-up and rating hotels. Progressed to merchant investment liquidity tasks where funds got locked, requesting supplementary fees to unlock accumulated phantom earnings.',
    evidenceList: [
      { type: 'chat', title: 'Telegram Coordinator Group Instructions', fileName: 'tg_task_log.png', size: '1.8 MB', url: '#' },
      { type: 'image', title: 'Fictional Merchant Portfolio Dashboard', fileName: 'locked_balance_portal.jpg', size: '750 KB', url: '#' },
      { type: 'document', title: 'Fake RBI Liquidity Clearance Certificate', fileName: 'rbi_spoofed_approval.pdf', size: '1.6 MB', url: '#' }
    ]
  },
  {
    id: 'CP-2026-5210',
    citizenName: 'Dr. Vivek Saxena',
    scamType: 'Voice Deepfake Kidnapping',
    riskLevel: 95,
    confidence: 97,
    status: 'Under Investigation',
    assignedOfficer: 'Insp. Vikram Rathore',
    date: '2026-07-06',
    location: 'Dwarka Sector 12, Delhi NCR',
    phone: '+91 90123 48123',
    upiId: 'police-settlement@oksbi',
    bankAccount: 'ICICI - 481290458845',
    ipAddress: '103.111.42.9',
    deviceId: 'Redmi Note 12 Pro',
    victimCount: 14,
    estimatedLoss: '₹18 Lakhs',
    description: 'Received a panic-inducing call with a synthetic voice perfectly mimicking my daughter weeping, stating she was held in custody for a hit-and-run incident. Scammers posed as police inspectors demanding ₹2,50,000 for out-of-court settlement bail.',
    evidenceList: [
      { type: 'audio', title: 'Sobbing Daughter Cloned Recording', fileName: 'weeping_daughter_synth.wav', size: '3.1 MB', url: '#', transcript: '"Papa please save me, there is a big car accident and police locked me up, they will send me to Tihar jail, give them whatever they want..."' },
      { type: 'chat', title: 'Demands for Instant UPI transfer SMS', fileName: 'settlement_sms_threat.jpg', size: '420 KB', url: '#' }
    ]
  },
  {
    id: 'CP-2026-3814',
    citizenName: 'Sunita Deshpande',
    scamType: 'Electricity Power Disconnection',
    riskLevel: 81,
    confidence: 91,
    status: 'Closed',
    assignedOfficer: 'Sub-Insp. Kabir Khan',
    date: '2026-07-05',
    location: 'Pune, Maharashtra',
    phone: '+91 77123 44812',
    upiId: 'mahadiscom-bill@ybl',
    bankAccount: 'BOI - 201294812390',
    ipAddress: '49.36.12.115',
    deviceId: 'Realme 11',
    victimCount: 110,
    estimatedLoss: '₹42 Lakhs',
    description: 'Received SMS threat warning power disconnection within 1 hour due to previous unpaid dues. Coerced into downloading a remote-access app (AnyDesk) to fix the issue, allowing scammers to view screen OTPs and sweep saving deposits.',
    evidenceList: [
      { type: 'image', title: 'SMS Warning Disconnection Notice', fileName: 'disconnect_text.png', size: '610 KB', url: '#' },
      { type: 'document', title: 'Bank Transaction Log Showing Sweeps', fileName: 'sbi_bank_statement.pdf', size: '2.1 MB', url: '#' }
    ]
  }
];

// Initial Heatmap coordinates & locations
const INITIAL_HOTSPOTS = [
  { name: 'Jamtara', state: 'Jharkhand', type: 'Fraud Hotspot', count: 412, lat: '24.1283° N', lng: '86.8028° E', color: 'bg-red-500' },
  { name: 'Mewat / Nuh', state: 'Haryana', type: 'Fraud Hotspot', count: 385, lat: '28.1154° N', lng: '77.0185° E', color: 'bg-red-500' },
  { name: 'Outer West District', state: 'New Delhi', type: 'Complaint Location', count: 214, lat: '28.6139° N', lng: '77.2090° E', color: 'bg-indigo-500' },
  { name: 'Bandra BKC Complex', state: 'Mumbai', type: 'Counterfeit Seizure', count: 18, lat: '19.0760° N', lng: '72.8777° E', color: 'bg-amber-500' },
  { name: 'Hitech City Area', state: 'Hyderabad', type: 'Complaint Location', count: 147, lat: '17.3850° N', lng: '78.4867° E', color: 'bg-indigo-500' },
  { name: 'Salt Lake Sector V', state: 'Kolkata', type: 'Counterfeit Seizure', count: 9, lat: '22.5726° N', lng: '88.3639° E', color: 'bg-amber-500' }
];

export default function PoliceDashboard({ currentTheme }: PoliceDashboardProps) {
  // Navigation
  const [currentView, setCurrentView] = useState<'all' | 'investigation' | 'threat_alerts'>('all');

  // Core dynamic states
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);
  const [selectedCaseId, setSelectedCaseId] = useState<string>('CP-2026-9042');
  const [heatspots, setHeatspots] = useState(INITIAL_HOTSPOTS);

  // Active filters for Heatmap
  const [showHotspots, setShowHotspots] = useState(true);
  const [showComplaints, setShowComplaints] = useState(true);
  const [showCounterfeits, setShowCounterfeits] = useState(true);

  // Active inspectors list
  const OFFICERS = ['Insp. Vikram Rathore', 'Insp. Sneha Patil', 'Sub-Insp. Kabir Khan', 'A.S.P. Divya Sharma'];

  // Current selected case object helper
  const activeCase = complaints.find(c => c.id === selectedCaseId) || complaints[0];

  // 3. Evidence inspection viewer state
  const [inspectingEvidence, setInspectingEvidence] = useState<Evidence | null>(null);

  // 8. Public alerts composer state
  const [alertForm, setAlertForm] = useState({
    title: '⚠ New Digital Arrest Scam',
    text: 'Avoid sharing OTP. Do not transfer money. Report suspicious calls claiming customs violations immediately to 1930.'
  });
  const [broadcastLog, setBroadcastLog] = useState<Array<{id: string, title: string, text: string, sentAt: string}>>([
    { 
      id: 'ALR-001', 
      title: '⚠ Skype/WhatsApp Video Fraud', 
      text: 'Cyber police alerts that real inspectors do not conduct trials or hold video interrogations on social media.',
      sentAt: '09:12'
    }
  ]);
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // 9. Report generator states
  const [downloadingReport, setDownloadingReport] = useState<'pdf' | 'evidence' | 'summary' | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Trigger Case Action updates
  const handleUpdateStatus = (status: 'New' | 'Assigned' | 'Under Investigation' | 'Closed') => {
    setComplaints(prev => prev.map(c => {
      if (c.id === selectedCaseId) {
        return { ...c, status };
      }
      return c;
    }));
  };

  const handleAssignOfficer = (officerName: string) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === selectedCaseId) {
        return { ...c, assignedOfficer: officerName, status: c.status === 'New' ? 'Assigned' : c.status };
      }
      return c;
    }));
  };

  // Preset Alert Filler
  const loadAlertTemplate = () => {
    setAlertForm({
      title: '⚠ New Digital Arrest Scam',
      text: 'Fraudsters impersonating CBI, Customs, or Police. Avoid sharing OTP. Do not transfer money. Real authorities never place citizens under online "digital arrest". Report suspicious calls immediately.'
    });
  };

  const handleBroadcastAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertForm.title || !alertForm.text) return;

    const newAlert = {
      id: `ALR-${Math.floor(100 + Math.random() * 900)}`,
      title: alertForm.title,
      text: alertForm.text,
      sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setBroadcastLog(prev => [newAlert, ...prev]);
    setBroadcastSuccess(true);
    setTimeout(() => setBroadcastSuccess(false), 3000);
  };

  // Simulation of dossier download
  const triggerReportDownload = (type: 'pdf' | 'evidence' | 'summary') => {
    setDownloadingReport(type);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadingReport(null);
            
            // Client side file generate & download
            const content = `========================================================
CYBER INTELLIGENCE BRANCH - CONFIDENTIAL INVESTIGATION DOSSIER
GENERATE TIME: ${new Date().toLocaleString()}
CASE ID: ${activeCase.id}
CITIZEN NAME: ${activeCase.citizenName}
SCAM CATEGORY: ${activeCase.scamType}
AI CLASSIFICATION RISK INDEX: ${activeCase.riskLevel}% Match
SYSTEM INTEL CONFIDENCE: ${activeCase.confidence}%
========================================================

1. INCIDENT SYNOPSIS:
"${activeCase.description}"

2. TRACE TELEMETRY NEXUS (AI LINKED GRAPH):
- Associated Phone Number: ${activeCase.phone}
- Linked UPI Account Address: ${activeCase.upiId}
- Layering Bank Account: ${activeCase.bankAccount}
- Intrusion IP Address: ${activeCase.ipAddress}
- Connected Device Signature: ${activeCase.deviceId}

3. COLLATERAL DAMAGE METRICS:
- Linked Victims in Network Signature: ${activeCase.victimCount} citizens
- Estimated Aggregate Financial Damage: ${activeCase.estimatedLoss}

4. CASE OFFICER METRICS:
- Active Status: ${activeCase.status}
- Appointed Investigating Authority: ${activeCase.assignedOfficer}
- Regional Sourced Node: ${activeCase.location}

========================================================
END OF SECURE DOSSIER. TRANSMITTED UNDER SECTION 43A IT ACT.
========================================================`;
            
            const fileBlob = new Blob([content], { type: 'text/plain' });
            const fileURL = URL.createObjectURL(fileBlob);
            const downloadAnchor = document.createElement('a');
            downloadAnchor.href = fileURL;
            downloadAnchor.download = `Cyber_Police_Dossier_${activeCase.id}_${type.toUpperCase()}.txt`;
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            document.body.removeChild(downloadAnchor);
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  // Filter spots based on toggles
  const filteredHotspots = heatspots.filter(spot => {
    if (spot.type === 'Fraud Hotspot' && !showHotspots) return false;
    if (spot.type === 'Complaint Location' && !showComplaints) return false;
    if (spot.type === 'Counterfeit Seizure' && !showCounterfeits) return false;
    return true;
  });

  return (
    <div id="cyber-police-dashboard-root" className={`w-full min-h-screen py-6 px-4 lg:px-8 transition-all duration-300 ${
      currentTheme === 'government' ? 'bg-[#F2F5F8] text-slate-800' : 'bg-zinc-950 text-zinc-100'
    }`}>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* 1. Header & Identity Control */}
        <div id="police-dashboard-header" className={`p-5 rounded-2xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm ${
          currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-black tracking-widest bg-indigo-600 text-white">
                Cyber Intelligence Cell
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-zinc-400 font-mono">
                SECURE UNIT DESK // INTRUSION DIVISION
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight mt-1 flex items-center gap-2">
              <ShieldAlert className="text-indigo-600 dark:text-cyan-400" />
              <span>Cyber Police Forensic Command</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 max-w-xl">
              Nodal intelligence hub tracking fake currency, digital arrest networks, state-wide mule structuring circles, and hosting rapid public safety response advisories.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentView('all')}
              className={`px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                currentView === 'all'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'hover:bg-slate-200/50 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400'
              }`}
            >
              <Layers size={14} />
              <span>Dossiers & Investigation</span>
            </button>
            <button
              onClick={() => setCurrentView('threat_alerts')}
              className={`px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                currentView === 'threat_alerts'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'hover:bg-slate-200/50 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400'
              }`}
            >
              <Send size={14} />
              <span>Public Safety Advisories</span>
            </button>
          </div>
        </div>

        {/* View Toggle Controller (Default: Dashboard) */}
        {currentView === 'all' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left Col: View New Complaints (Component 1) */}
            <div id="complaints-list-pane" className="lg:col-span-4 flex flex-col space-y-4">
              <div className={`p-4 rounded-2xl border shadow-sm flex flex-col flex-1 ${
                currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-black text-sm uppercase tracking-wider text-indigo-600 dark:text-cyan-400 flex items-center gap-1.5">
                    <ListOrdered size={16} />
                    <span>1. View New Complaints</span>
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-slate-100 text-slate-700 dark:bg-zinc-950 dark:text-zinc-400">
                    {complaints.length} Records
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-normal mb-3">
                  Live national cyber fraud queue. Select a folder file to map investigation path, review logs, and execute admin freeze actions.
                </p>

                {/* Complaints Stack */}
                <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                  {complaints.map((c) => {
                    const isSelected = c.id === selectedCaseId;
                    return (
                      <div
                        key={c.id}
                        onClick={() => {
                          setSelectedCaseId(c.id);
                          setInspectingEvidence(null);
                        }}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-indigo-600/5 border-indigo-500 ring-1 ring-indigo-500/50'
                            : 'bg-slate-50 dark:bg-zinc-950 border-slate-150 dark:border-zinc-850 hover:bg-slate-100 dark:hover:bg-zinc-900'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <strong className="text-xs font-mono text-slate-900 dark:text-zinc-100">
                            {c.id}
                          </strong>
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                            c.status === 'New'
                              ? 'bg-rose-500 text-white'
                              : c.status === 'Assigned'
                              ? 'bg-blue-500 text-white'
                              : c.status === 'Under Investigation'
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-emerald-600 text-white'
                          }`}>
                            {c.status}
                          </span>
                        </div>

                        <div className="flex justify-between text-[11px] mb-1.5">
                          <span className="font-bold text-slate-700 dark:text-zinc-300">
                            {c.citizenName}
                          </span>
                          <span className="text-slate-500 dark:text-zinc-400 font-mono">
                            {c.date}
                          </span>
                        </div>

                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-indigo-600 dark:text-cyan-400 font-extrabold">
                            {c.scamType}
                          </span>
                          <span className="text-rose-500 font-black font-mono bg-rose-50 dark:bg-rose-950/20 px-1 rounded">
                            Risk: {c.riskLevel}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 5. Crime Heatmap Control Interface */}
              <div id="heatmap-pane" className={`p-4 rounded-2xl border shadow-sm ${
                currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
              }`}>
                <h3 className="font-black text-sm uppercase tracking-wider text-indigo-600 dark:text-cyan-400 mb-2 flex items-center gap-1.5">
                  <MapPin size={16} />
                  <span>5. Crime Heatmap</span>
                </h3>
                
                {/* Simulated Heatmap Plotting Graphic */}
                <div className="bg-slate-100 dark:bg-zinc-950 rounded-xl p-3 border relative overflow-hidden h-[180px] flex items-center justify-center">
                  
                  {/* Grid Lines mockup representing maps coordinates */}
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-10 pointer-events-none">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="border border-slate-400 dark:border-zinc-150"></div>
                    ))}
                  </div>

                  {/* Outline India Map SVG Graphic mock */}
                  <svg className="absolute w-2/3 h-2/3 opacity-30 text-indigo-500 pointer-events-none" viewBox="0 0 100 100">
                    <path fill="currentColor" d="M30,10 L50,5 L70,12 L85,30 L90,50 L80,75 L55,95 L40,90 L20,70 L15,50 L10,35 Z" />
                  </svg>

                  {/* Dynamic plotted points from active state */}
                  {filteredHotspots.map((spot, i) => (
                    <div
                      key={i}
                      title={`${spot.name} - ${spot.type}`}
                      className={`absolute w-3 h-3 rounded-full flex items-center justify-center animate-pulse ${
                        spot.type === 'Fraud Hotspot' 
                          ? 'bg-rose-600 ring-4 ring-rose-500/30' 
                          : spot.type === 'Complaint Location'
                          ? 'bg-indigo-600 ring-4 ring-indigo-500/30'
                          : 'bg-amber-500 ring-4 ring-amber-500/30'
                      }`}
                      style={{
                        top: `${20 + (i * 24) % 70}%`,
                        left: `${25 + (i * 14) % 60}%`
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    </div>
                  ))}

                  <span className="absolute bottom-2 left-2 text-[8px] font-mono bg-white/80 dark:bg-zinc-900/90 py-0.5 px-1.5 rounded border">
                    GPS TRACKER STABLE
                  </span>
                </div>

                {/* Interactive Legends & Toggle Filter Switches */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-slate-100 dark:border-zinc-800 text-[10px] font-bold">
                  <button
                    onClick={() => setShowHotspots(p => !p)}
                    className={`p-1.5 rounded flex flex-col items-center gap-1 border transition-all ${
                      showHotspots 
                        ? 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/20 dark:border-rose-900/40 dark:text-rose-400' 
                        : 'bg-slate-50 border-slate-200 text-slate-400 dark:bg-zinc-900 dark:border-zinc-800'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                    <span>Fraud Hotspots</span>
                  </button>

                  <button
                    onClick={() => setShowComplaints(p => !p)}
                    className={`p-1.5 rounded flex flex-col items-center gap-1 border transition-all ${
                      showComplaints 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/20 dark:border-indigo-900/40 dark:text-indigo-400' 
                        : 'bg-slate-50 border-slate-200 text-slate-400 dark:bg-zinc-900 dark:border-zinc-800'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                    <span>Complaints</span>
                  </button>

                  <button
                    onClick={() => setShowCounterfeits(p => !p)}
                    className={`p-1.5 rounded flex flex-col items-center gap-1 border transition-all ${
                      showCounterfeits 
                        ? 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/20 dark:border-amber-900/40 dark:text-amber-400' 
                        : 'bg-slate-50 border-slate-200 text-slate-400 dark:bg-zinc-900 dark:border-zinc-800'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>Seizures</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Col: Active Case Dossier Deep Dive */}
            <div id="case-dossier-pane" className="lg:col-span-8 space-y-6">

              {/* Bento Row 1: Case Detail Header, AI Risk Analysis (Comp 2) & Telemetry Metrics (Comp 7) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* 2. Review AI Risk Analysis Panel */}
                <div id="ai-risk-card" className={`md:col-span-5 p-5 rounded-2xl border shadow-sm flex flex-col justify-between ${
                  currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <div>
                    <h3 className="font-black text-xs uppercase tracking-wider text-rose-500 flex items-center gap-1.5 mb-3">
                      <ShieldAlert size={14} />
                      <span>2. Review AI Risk Analysis</span>
                    </h3>

                    {/* Massive Risk Percent Indicator */}
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-mono font-black text-rose-600 dark:text-red-400">
                        {activeCase.riskLevel}%
                      </span>
                      <span className="text-xs font-black uppercase text-rose-500 tracking-wide">
                        Extreme Threat Risk
                      </span>
                    </div>

                    <div className="p-2.5 bg-rose-500/5 border border-rose-500/10 rounded-xl space-y-1 mb-3">
                      <strong className="text-xs text-slate-900 dark:text-zinc-100 block">
                        {activeCase.scamType} Match
                      </strong>
                      <p className="text-[10px] text-slate-500 dark:text-zinc-400 leading-normal">
                        Machine learning matching identifies severe signatures with {activeCase.confidence}% operational prediction confidence index.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-zinc-800">
                    <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">AI Classification Indicators</span>
                    <ul className="text-[10px] text-slate-600 dark:text-zinc-300 space-y-1 list-disc pl-3">
                      <li>Voice biometric matching confirms clone (97% ratio)</li>
                      <li>Payment channels trace directly to known mule networks</li>
                      <li>Geographical proximity linked to central Jamtara ring</li>
                    </ul>
                  </div>
                </div>

                {/* 7. AI Investigation Summary Widget */}
                <div id="ai-summary-card" className={`md:col-span-7 p-5 rounded-2xl border shadow-sm flex flex-col justify-between ${
                  currentTheme === 'government' ? 'bg-indigo-900 border-indigo-950 text-white' : 'bg-indigo-950/40 border-indigo-500/25 text-indigo-100'
                }`}>
                  <div>
                    <span className="px-2 py-0.5 rounded text-[9px] uppercase font-black tracking-widest bg-emerald-600 text-white inline-block mb-3">
                      AI Automatic Nexus Detection
                    </span>

                    <h3 className="text-lg font-black tracking-tight mb-2">
                      7. AI Investigation Summary
                    </h3>
                    
                    <p className="text-xs text-slate-300 dark:text-zinc-400 leading-normal mb-4">
                      Neural engines automatically trace global digital print similarities across incoming state police reports. The system identified an identical modus-operandi footprint:
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-black/20 p-3 rounded-xl border border-white/5 font-mono text-center">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Linked Sourced Nodes</span>
                      <strong className="text-lg font-black text-emerald-400 block mt-0.5">
                        {activeCase.victimCount} Victims
                      </strong>
                      <span className="text-[9px] text-slate-500">Same UPI & Phone</span>
                    </div>

                    <div>
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Est. Financial Drain</span>
                      <strong className="text-lg font-black text-rose-400 block mt-0.5">
                        {activeCase.estimatedLoss}
                      </strong>
                      <span className="text-[9px] text-slate-500">Structured Asset Sweeps</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-300 dark:text-zinc-400 mt-2 text-center">
                    🔒 Telemetry pattern matches regional Mewat/Nuh tower footprint coordinates.
                  </div>
                </div>

              </div>

              {/* 3. View Uploaded Evidence Interactive Hub */}
              <div id="evidence-inspection-pane" className={`p-5 rounded-2xl border shadow-sm ${
                currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
              }`}>
                <h3 className="font-black text-sm uppercase tracking-wider text-indigo-600 dark:text-cyan-400 mb-2 flex items-center gap-1.5">
                  <Eye size={16} />
                  <span>3. View Uploaded Evidence</span>
                </h3>
                
                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed mb-4">
                  Citizen-supplied multimedia and forensic documents available for court submission. Click an evidence file to launch secure forensic inspection view.
                </p>

                {/* Evidence thumbnails horizontal stack */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {activeCase.evidenceList.map((e, index) => {
                    const isInspecting = inspectingEvidence?.title === e.title;
                    return (
                      <button
                        key={index}
                        onClick={() => setInspectingEvidence(e)}
                        className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between h-[100px] ${
                          isInspecting
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow'
                            : 'bg-slate-50 dark:bg-zinc-950 border-slate-150 dark:border-zinc-850 hover:border-slate-300 dark:hover:border-zinc-800'
                        }`}
                      >
                        <div>
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center mb-2 ${
                            isInspecting ? 'bg-white/20 text-white' : 'bg-indigo-50 dark:bg-zinc-900 text-indigo-600'
                          }`}>
                            {e.type === 'image' && <ImageIcon size={14} />}
                            {e.type === 'audio' && <Volume2 size={14} />}
                            {e.type === 'video' && <Video size={14} />}
                            {e.type === 'chat' && <PlayCircle size={14} />}
                            {e.type === 'document' && <FileText size={14} />}
                          </div>

                          <span className="text-[10px] font-bold truncate block">
                            {e.title}
                          </span>
                        </div>

                        <span className={`text-[9px] font-mono ${isInspecting ? 'text-indigo-200' : 'text-slate-400'}`}>
                          {e.size}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Live Inspection Drawer HUD */}
                {inspectingEvidence && (
                  <div className="mt-4 p-4 rounded-xl border bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 space-y-3 relative">
                    <button
                      onClick={() => setInspectingEvidence(null)}
                      className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
                    >
                      <X size={15} />
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 dark:bg-zinc-900 dark:text-cyan-400">
                        FORENSIC ANALYSIS // COMPLETED
                      </span>
                      <strong className="text-xs font-black text-slate-900 dark:text-zinc-100">
                        {inspectingEvidence.title} ({inspectingEvidence.fileName})
                      </strong>
                    </div>

                    {/* Media Mock Player Content based on evidence type */}
                    {inspectingEvidence.type === 'audio' ? (
                      <div className="bg-slate-100 dark:bg-zinc-900 p-3 rounded-lg border space-y-2">
                        {/* Audio Waveform mockup */}
                        <div className="flex items-center gap-1.5 h-8">
                          <Music size={14} className="text-rose-500 animate-bounce" />
                          {[...Array(24)].map((_, i) => {
                            const heights = [2, 6, 8, 4, 3, 7, 5, 2, 8, 9, 4, 6, 3, 5, 8, 7, 3, 2, 6, 9, 5, 2, 4, 1];
                            return (
                              <span 
                                key={i} 
                                className="w-1 bg-indigo-500 dark:bg-cyan-400 rounded-full transition-all"
                                style={{ height: `${heights[i % heights.length] * 10}%` }}
                              ></span>
                            );
                          })}
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-zinc-300 italic font-mono bg-white/50 dark:bg-black/20 p-2 rounded">
                          AI Audio Transcript: {inspectingEvidence.transcript || '"No audio dialogue detected in this capture"'}
                        </p>
                      </div>
                    ) : inspectingEvidence.type === 'image' || inspectingEvidence.type === 'chat' ? (
                      <div className="bg-slate-100 dark:bg-zinc-900 p-4 rounded-lg border flex flex-col items-center justify-center min-h-[140px] relative">
                        {/* Evidence preview box */}
                        <div className="border border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2 text-center rounded-lg max-w-sm space-y-1.5 shadow">
                          <div className="w-full h-12 bg-[#005CA9]/10 rounded flex items-center justify-center text-[#005CA9] dark:text-cyan-400">
                            <ImageIcon size={24} />
                          </div>
                          <span className="text-[10px] font-mono text-slate-500">{inspectingEvidence.fileName}</span>
                          <span className="text-[9px] uppercase font-black tracking-widest text-emerald-600 block">✓ OCR TEXT VERIFIED</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-100 dark:bg-zinc-900 p-4 rounded-lg border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-[#005CA9]/10 text-[#005CA9] dark:text-cyan-400 flex items-center justify-center">
                            <FileText size={20} />
                          </div>
                          <div>
                            <strong className="text-xs font-bold block">{inspectingEvidence.fileName}</strong>
                            <span className="text-[10px] text-slate-400">Validated PDF/Document Container Signature</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => alert("Simulating secure document viewer download...")}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-bold font-mono"
                        >
                          View PDF Container
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 4. Fraud Network Investigation Flow Mapping */}
              <div id="fraud-network-pane" className={`p-5 rounded-2xl border shadow-sm ${
                currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-black text-sm uppercase tracking-wider text-indigo-600 dark:text-cyan-400 flex items-center gap-1.5">
                      <Network size={16} />
                      <span>4. Fraud Network Investigation Flow</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 leading-normal">
                      AI automatically tracks footprint patterns across network nodes. Traced pathway: <strong className="text-indigo-600 dark:text-cyan-400">Phone ➔ UPI ➔ Bank ➔ Victims</strong>
                    </p>
                  </div>
                </div>

                {/* Lineage Flow Map Chart */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 relative">
                  
                  {/* Step 1: Phone */}
                  <div className="p-3.5 rounded-xl border bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-850 space-y-1 text-center relative">
                    <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-1">
                      <Phone size={16} />
                    </div>
                    <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">SUSPECT PHONE</span>
                    <strong className="text-xs font-mono text-slate-900 dark:text-zinc-100 block">
                      {activeCase.phone}
                    </strong>
                    <span className="text-[10px] text-rose-500 font-bold block">12 Cell Towers Active</span>
                    
                    {/* Connecting Arrow for Desktop */}
                    <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-slate-400 dark:text-zinc-700">
                      <ArrowRight size={16} />
                    </div>
                  </div>

                  {/* Step 2: UPI */}
                  <div className="p-3.5 rounded-xl border bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-850 space-y-1 text-center relative">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-1">
                      <CreditCard size={16} />
                    </div>
                    <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">ROUTING UPI ID</span>
                    <strong className="text-xs font-mono text-slate-900 dark:text-zinc-100 block truncate">
                      {activeCase.upiId}
                    </strong>
                    <span className="text-[10px] text-amber-500 font-bold block">Blacklisted Registry Match</span>

                    {/* Connecting Arrow for Desktop */}
                    <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-slate-400 dark:text-zinc-700">
                      <ArrowRight size={16} />
                    </div>
                  </div>

                  {/* Step 3: Bank Account */}
                  <div className="p-3.5 rounded-xl border bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-850 space-y-1 text-center relative">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto mb-1">
                      <Building size={16} />
                    </div>
                    <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">TARGET BANK</span>
                    <strong className="text-xs font-mono text-slate-900 dark:text-zinc-100 block truncate">
                      {activeCase.bankAccount}
                    </strong>
                    <span className="text-[10px] text-indigo-500 font-bold block">Mule Liquidity Account</span>

                    {/* Connecting Arrow for Desktop */}
                    <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-slate-400 dark:text-zinc-700">
                      <ArrowRight size={16} />
                    </div>
                  </div>

                  {/* Step 4: Victims */}
                  <div className="p-3.5 rounded-xl border bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-850 space-y-1 text-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-1">
                      <Users size={16} />
                    </div>
                    <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">CITIZEN VICTIMS</span>
                    <strong className="text-xs font-bold text-slate-900 dark:text-zinc-100 block">
                      {activeCase.victimCount} Linked Reports
                    </strong>
                    <span className="text-[10px] text-emerald-500 font-bold block">Jamtara Group Signature</span>
                  </div>

                </div>
              </div>

              {/* Bento Row 3: Manage Cases (Comp 6) & Generate Reports (Comp 9) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* 6. Manage Cases Panel */}
                <div id="case-actions-card" className={`p-5 rounded-2xl border shadow-sm space-y-4 ${
                  currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <h3 className="font-black text-sm uppercase tracking-wider text-indigo-600 dark:text-cyan-400 flex items-center gap-1.5">
                    <Clipboard size={16} />
                    <span>6. Manage Cases Operations</span>
                  </h3>

                  <div className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl border space-y-2">
                    <span className="text-[10px] text-slate-400 block font-bold font-mono">
                      ACTIVE COMPLAINT: {activeCase.id}
                    </span>

                    <div className="flex justify-between items-center text-xs">
                      <span>Assigned Officer:</span>
                      <strong className="text-[#005CA9] dark:text-cyan-400">
                        {activeCase.assignedOfficer === 'Unassigned' ? 'Not Assigned' : activeCase.assignedOfficer}
                      </strong>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span>Dossier Stage:</span>
                      <strong className="font-mono text-rose-500 uppercase">{activeCase.status}</strong>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Accept case action */}
                    {activeCase.assignedOfficer === 'Unassigned' && (
                      <button
                        onClick={() => handleAssignOfficer('Insp. Vikram Rathore')}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all"
                      >
                        <Check size={14} />
                        <span>Accept & Start Case Investigation</span>
                      </button>
                    )}

                    {/* Officer selector dropdown */}
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                        Delegate Assigned Officer
                      </label>
                      <select
                        value={activeCase.assignedOfficer}
                        onChange={(e) => handleAssignOfficer(e.target.value)}
                        className={`w-full p-2 text-xs rounded border ${
                          currentTheme === 'government'
                            ? 'bg-slate-50 border-slate-200 text-slate-900'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-100'
                        }`}
                      >
                        <option value="Unassigned">-- Select Regional Officer --</option>
                        {OFFICERS.map((officer) => (
                          <option key={officer} value={officer}>{officer}</option>
                        ))}
                      </select>
                    </div>

                    {/* Status updater controllers */}
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                        Update Case Audit Stage
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleUpdateStatus('Under Investigation')}
                          className={`py-1.5 text-[10px] font-black rounded border transition-all ${
                            activeCase.status === 'Under Investigation'
                              ? 'bg-amber-500 border-amber-500 text-slate-950 shadow'
                              : 'bg-slate-50 dark:bg-zinc-950 hover:bg-slate-100 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-800'
                          }`}
                        >
                          Investigate
                        </button>
                        <button
                          onClick={() => {
                            handleUpdateStatus('Closed');
                            alert(`🚨 Dossier ${activeCase.id} finalized and moved to ARCHIVE.`);
                          }}
                          className={`py-1.5 text-[10px] font-black rounded border transition-all ${
                            activeCase.status === 'Closed'
                              ? 'bg-emerald-600 border-emerald-600 text-white shadow'
                              : 'bg-slate-50 dark:bg-zinc-950 hover:bg-slate-100 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-800'
                          }`}
                        >
                          Close Case File
                        </button>
                      </div>
                    </div>

                    {/* Prototyped freezing button (Feature 4 requirement) */}
                    <button
                      onClick={() => {
                        handleUpdateStatus('Closed');
                        alert(`❄️ PROTOTYPED DIRECTIVE SENT: Requesting SBI/HDFC Nodal desk to freeze suspect account details ${activeCase.bankAccount} linked with ${activeCase.upiId} immediately.`);
                      }}
                      className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Ban size={13} />
                      <span>Recommend Account Freeze (Simulate)</span>
                    </button>
                  </div>
                </div>

                {/* 9. Generate Reports Center */}
                <div id="generate-reports-card" className={`p-5 rounded-2xl border shadow-sm space-y-4 ${
                  currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <h3 className="font-black text-sm uppercase tracking-wider text-indigo-600 dark:text-cyan-400 flex items-center gap-1.5">
                    <Download size={16} />
                    <span>9. Generate Reports Hub</span>
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                    Download authentic intelligence files ready to be presented in judicial courtrooms or transmitted to the RBI financial monitoring division.
                  </p>

                  <div className="space-y-3 pt-2">
                    {/* PDF Dossier */}
                    <button
                      onClick={() => triggerReportDownload('pdf')}
                      disabled={downloadingReport !== null}
                      className="w-full p-3 bg-slate-50 dark:bg-zinc-950 hover:bg-slate-100 dark:hover:bg-zinc-900 rounded-xl border text-left flex justify-between items-center transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center">
                          <FileText size={16} />
                        </div>
                        <div>
                          <strong className="text-xs font-bold block group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
                            Complete Case PDF Dossier
                          </strong>
                          <span className="text-[10px] text-slate-400 font-mono">Format: PDF (Aadhaar / Case Logs)</span>
                        </div>
                      </div>
                      <Download size={15} className="text-slate-400" />
                    </button>

                    {/* Evidence Package */}
                    <button
                      onClick={() => triggerReportDownload('evidence')}
                      disabled={downloadingReport !== null}
                      className="w-full p-3 bg-slate-50 dark:bg-zinc-950 hover:bg-slate-100 dark:hover:bg-zinc-900 rounded-xl border text-left flex justify-between items-center transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                          <FileSymlink size={16} />
                        </div>
                        <div>
                          <strong className="text-xs font-bold block group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
                            Evidence Audit Package
                          </strong>
                          <span className="text-[10px] text-slate-400 font-mono">Format: ZIP (Audio wavs + Screenshots)</span>
                        </div>
                      </div>
                      <Download size={15} className="text-slate-400" />
                    </button>

                    {/* AI Summary report */}
                    <button
                      onClick={() => triggerReportDownload('summary')}
                      disabled={downloadingReport !== null}
                      className="w-full p-3 bg-slate-50 dark:bg-zinc-950 hover:bg-slate-100 dark:hover:bg-zinc-900 rounded-xl border text-left flex justify-between items-center transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                          <FileCheck size={16} />
                        </div>
                        <div>
                          <strong className="text-xs font-bold block group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
                            AI Investigation Summary
                          </strong>
                          <span className="text-[10px] text-slate-400 font-mono">Format: CSV/JSON (Network nodes links)</span>
                        </div>
                      </div>
                      <Download size={15} className="text-slate-400" />
                    </button>
                  </div>

                  {/* Downloading status indicator */}
                  {downloadingReport && (
                    <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="animate-pulse">Compiling forensic {downloadingReport.toUpperCase()} report...</span>
                        <span>{downloadProgress}%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-600 dark:bg-cyan-400 transition-all duration-200"
                          style={{ width: `${downloadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>
        ) : (
          /* THREAT ALERTS & PUBLIC SAFETY BROADCAST VIEW (Feature 8) */
          <div id="threat-alerts-view" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Col: Composer form */}
            <div className="lg:col-span-5">
              <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
                currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
              }`}>
                <h3 className="font-black text-sm uppercase tracking-wider text-indigo-600 dark:text-cyan-400 flex items-center gap-1.5">
                  <Send size={16} />
                  <span>8. Send Public Alerts Control</span>
                </h3>

                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-normal">
                  Draft and broadcast real-time threat intelligence bulletins. Sent directly to citizen dashboards, regional SMS servers, and bank warning feeds.
                </p>

                {/* Template Fast Loader */}
                <div className="p-3 bg-indigo-50 dark:bg-zinc-950 rounded-xl border border-indigo-100 dark:border-zinc-850">
                  <span className="text-[10px] font-black uppercase text-indigo-600 dark:text-cyan-400 block mb-1">
                    Template Presets
                  </span>
                  <button
                    type="button"
                    onClick={loadAlertTemplate}
                    className="w-full text-left p-1.5 bg-white dark:bg-zinc-900 border hover:bg-slate-50 text-[11px] rounded font-bold flex items-center justify-between"
                  >
                    <span>Load: "New Digital Arrest Scam" template</span>
                    <ArrowRight size={12} className="text-slate-400" />
                  </button>
                </div>

                <form onSubmit={handleBroadcastAlert} className="space-y-4">
                  <div>
                    <label className="text-[11px] font-black uppercase text-slate-400 block mb-1">Alert Title / Headline</label>
                    <input
                      type="text"
                      value={alertForm.title}
                      onChange={(e) => setAlertForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g. ⚠ Critical UPI Malware Warning"
                      className={`w-full p-2.5 text-xs font-bold rounded border ${
                        currentTheme === 'government'
                          ? 'bg-slate-50 border-slate-200 text-slate-900'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-100'
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-black uppercase text-slate-400 block mb-1">Alert content advisory</label>
                    <textarea
                      rows={4}
                      value={alertForm.text}
                      onChange={(e) => setAlertForm(prev => ({ ...prev, text: e.target.value }))}
                      placeholder="Enter safety bullet points for immediate dispatch..."
                      className={`w-full p-2.5 text-xs rounded border leading-relaxed ${
                        currentTheme === 'government'
                          ? 'bg-slate-50 border-slate-200 text-slate-900'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-100'
                      }`}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase rounded-lg shadow flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Send size={13} />
                    <span>Broadcast Public Alert</span>
                  </button>

                  {broadcastSuccess && (
                    <div className="p-2.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 rounded-lg text-center text-xs font-bold">
                      ✓ Alert Broadcast successfully routed to all active cells!
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Right Col: Active Live Advisory Stream Log */}
            <div className="lg:col-span-7">
              <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
                currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
              }`}>
                <h3 className="font-black text-sm uppercase tracking-wider text-indigo-600 dark:text-cyan-400 flex items-center gap-1.5">
                  <TrendingUp size={16} />
                  <span>Live Safety Advisories Feed</span>
                </h3>

                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-normal">
                  Advisory history stream active on official citizen web layouts. Regional towers are broadcast-notified.
                </p>

                <div className="space-y-3">
                  {broadcastLog.map((log) => (
                    <div
                      key={log.id}
                      className="p-4 rounded-xl border bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-850 space-y-2 relative"
                    >
                      <span className="absolute top-2 right-2 text-[10px] font-mono text-slate-400 font-bold">
                        Sent At: {log.sentAt} • {log.id}
                      </span>

                      <h4 className="text-sm font-bold text-rose-500 flex items-center gap-1.5">
                        <AlertTriangle size={14} />
                        <span>{log.title}</span>
                      </h4>

                      <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed font-mono">
                        {log.text}
                      </p>

                      <div className="flex gap-2 pt-1">
                        <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-slate-200 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400">
                          Channel: National Web SMS
                        </span>
                        <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-indigo-500/10 text-indigo-600">
                          Target: All Districts
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
