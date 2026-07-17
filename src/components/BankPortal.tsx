import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Activity, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  BarChart3, 
  Lock, 
  Unlock, 
  Upload, 
  MapPin, 
  Building, 
  Search, 
  Bell, 
  UserX, 
  CheckCircle, 
  RefreshCw, 
  Plus, 
  Check, 
  AlertCircle, 
  Eye,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Legend, 
  LineChart, 
  Line, 
  AreaChart, 
  Area 
} from 'recharts';

interface BankPortalProps {
  currentTheme: 'government' | 'intelligence';
}

// Interfaces
interface Transaction {
  id: string;
  timestamp: string;
  accountNo: string;
  holderName: string;
  amount: number;
  upiId: string;
  type: 'Large Unusual Transfer' | 'Multiple Small Transfers' | 'High-Risk Beneficiary';
  riskScore: number;
  status: 'Flagged' | 'Under Investigation' | 'Frozen' | 'Cleared';
  details: string;
}

interface FraudAlert {
  id: string;
  type: 'blacklist_account' | 'fraud_upi' | 'scam_phone';
  value: string;
  details: string;
  severity: 'Critical' | 'High' | 'Medium';
  reportedAt: string;
  status: 'Active' | 'Investigating';
}

interface CounterfeitReport {
  id: string;
  branch: string;
  denomination: string;
  serialNumber: string;
  location: string;
  reportedAt: string;
  details: string;
  status: 'Transmitted' | 'Acknowledged';
}

// Initial Data
const INITIAL_TRANSACTIONS: Transaction[] = [
  { 
    id: 'TXN-9402', 
    timestamp: '10:48:12', 
    accountNo: '304812349021', 
    holderName: 'Sanjay Kumar', 
    amount: 1450000, 
    upiId: 'sanjaymule@ybl', 
    type: 'Large Unusual Transfer', 
    riskScore: 94, 
    status: 'Flagged',
    details: 'One-time RTGS transfer of ₹14.5L to a recently opened account with no prior high-value history.'
  },
  { 
    id: 'TXN-8845', 
    timestamp: '10:38:15', 
    accountNo: '481290458845', 
    holderName: 'Madan Lal', 
    amount: 12000, 
    upiId: 'luckydrawkbc@paytm', 
    type: 'Multiple Small Transfers', 
    riskScore: 89, 
    status: 'Flagged',
    details: '14 rapid UPI transfers of ₹10k-₹12k within 3 minutes from distinct IP addresses, typical of structuring/layering.'
  },
  { 
    id: 'TXN-7212', 
    timestamp: '10:29:44', 
    accountNo: '901234127212', 
    holderName: 'Karan Mehra', 
    amount: 45000, 
    upiId: 'cbi-investigation@okaxis', 
    type: 'High-Risk Beneficiary', 
    riskScore: 91, 
    status: 'Flagged',
    details: 'Transfer sent to a UPI ID currently listed on the Cyber Police active blacklist registry for impersonation scams.'
  },
  { 
    id: 'TXN-5120', 
    timestamp: '09:55:01', 
    accountNo: '112233446142', 
    holderName: 'Saraswati Enterprises', 
    amount: 2850000, 
    upiId: 'saraswatient@hdfc', 
    type: 'Large Unusual Transfer', 
    riskScore: 82, 
    status: 'Under Investigation',
    details: 'Unusual corporate volume transfer to an offshore shell entity flagged by directorate intelligence.'
  },
  { 
    id: 'TXN-4011', 
    timestamp: '09:12:30', 
    accountNo: '908811223344', 
    holderName: 'Preeti Sharma', 
    amount: 8000, 
    upiId: 'winprize90@ybl', 
    type: 'Multiple Small Transfers', 
    riskScore: 87, 
    status: 'Flagged',
    details: 'Burst of 8 small instant peer-to-peer transfers received and immediately swept to a secondary wallet account.'
  },
  {
    id: 'TXN-3129',
    timestamp: '08:42:15',
    accountNo: '556677881122',
    holderName: 'Ramesh Patel',
    amount: 60000,
    upiId: 'unverified-claims@paytm',
    type: 'High-Risk Beneficiary',
    riskScore: 95,
    status: 'Flagged',
    details: 'Beneficiary account has high match score with Jamtara-linked cyber blackmail collection wallets.'
  }
];

const INITIAL_FRAUD_ALERTS: FraudAlert[] = [
  { id: 'ALR-801', type: 'blacklist_account', value: '309928189021 (SBI)', details: 'Linked to active video-call digital arrest extortion racket.', severity: 'Critical', reportedAt: '10:15:00', status: 'Active' },
  { id: 'ALR-802', type: 'fraud_upi', value: 'rbi-verification-dept@okaxis', details: 'Spoofed official UPI address used to bait senior citizens.', severity: 'Critical', reportedAt: '09:42:11', status: 'Active' },
  { id: 'ALR-803', type: 'scam_phone', value: '+91 98765 01234', details: 'Automated robocalls pretending to be courier customs inspectors.', severity: 'High', reportedAt: '09:05:30', status: 'Active' },
  { id: 'ALR-804', type: 'fraud_upi', value: 'lottery-tax-dept@icici', details: 'Fake tax clearance wallet for fraudulent lottery payout schemes.', severity: 'High', reportedAt: '08:15:22', status: 'Active' },
  { id: 'ALR-805', type: 'blacklist_account', value: '918230129481 (HDFC)', details: 'Mule account receiving funds from Jamtara remote desktop scams.', severity: 'Medium', reportedAt: '07:30:15', status: 'Investigating' },
];

const INITIAL_REPORTS: CounterfeitReport[] = [
  { id: 'REP-101', branch: 'Mumbai BKC Corporate Branch', denomination: '500', serialNumber: '4AC819203', location: 'Bandra-Kurla Complex, Mumbai', reportedAt: '09:30', details: 'Two fake notes discovered in bulk cash deposit machine. Lacks color shifting thread.', status: 'Transmitted' },
  { id: 'REP-102', branch: 'Delhi Connaught Place Branch', denomination: '500', serialNumber: '9HP120485', location: 'Inner Circle, Connaught Place, New Delhi', reportedAt: '08:15', details: 'Presented by customer at counter. Lacks watermark multi-tones.', status: 'Acknowledged' }
];

// Recharts Static Data
const FRAUD_TRENDS_DATA = [
  { time: '06:00', fakeNotes: 2, suspiciousTx: 8, resolved: 5 },
  { time: '07:00', fakeNotes: 4, suspiciousTx: 14, resolved: 10 },
  { time: '08:00', fakeNotes: 8, suspiciousTx: 25, resolved: 18 },
  { time: '09:00', fakeNotes: 15, suspiciousTx: 41, resolved: 29 },
  { time: '10:00', fakeNotes: 28, suspiciousTx: 56, resolved: 42 },
  { time: '11:00', fakeNotes: 32, suspiciousTx: 63, resolved: 51 }
];

const METRO_BRANCH_STATS = [
  { name: 'Mumbai BKC', fakeNotes: 18, suspiciousTx: 42, frozenAccts: 14 },
  { name: 'Delhi CP', fakeNotes: 14, suspiciousTx: 31, frozenAccts: 11 },
  { name: 'Bengaluru MG', fakeNotes: 9, suspiciousTx: 28, frozenAccts: 8 },
  { name: 'Hyderabad Hitech', fakeNotes: 11, suspiciousTx: 24, frozenAccts: 9 },
  { name: 'Kolkata Central', fakeNotes: 6, suspiciousTx: 16, frozenAccts: 5 }
];

export default function BankPortal({ currentTheme }: BankPortalProps) {
  // Navigation
  const [activeSubTab, setActiveSubTab] = useState<'analytics' | 'verification' | 'suspicious' | 'alerts' | 'report'>('analytics');

  // Shared state
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [alerts, setAlerts] = useState<FraudAlert[]>(INITIAL_FRAUD_ALERTS);
  const [reports, setReports] = useState<CounterfeitReport[]>(INITIAL_REPORTS);

  // 1. Currency Verification States
  const [fileName, setFileName] = useState<string | null>('specimen_suspect_500.png');
  const [fileBase64, setFileBase64] = useState<string | null>('data:image/png;base64,sample_suspect_data');
  const [denomination, setDenomination] = useState<'100' | '200' | '500' | '2000'>('500');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState<string>('');
  const [stepProgress, setStepProgress] = useState(0);

  // 2. Report Counterfeit States
  const [newReport, setNewReport] = useState({
    branch: 'Mumbai BKC Corporate Branch',
    denomination: '500',
    serialNumber: '',
    location: 'Bandra-Kurla Complex, Mumbai',
    details: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Search/Filter helper states
  const [txnFilter, setTxnFilter] = useState<'ALL' | 'Large Unusual Transfer' | 'Multiple Small Transfers' | 'High-Risk Beneficiary'>('ALL');
  const [alertSearch, setAlertSearch] = useState('');
  const [alertTypeFilter, setAlertTypeFilter] = useState<'ALL' | 'blacklist_account' | 'fraud_upi' | 'scam_phone'>('ALL');

  // Trigger simulated AI verification
  const handleVerifyCurrency = async (presetType?: 'genuine' | 'counterfeit') => {
    setIsVerifying(true);
    setVerificationResult(null);
    setStepProgress(5);

    const steps = [
      { msg: 'Reading micro-optical pixel layout...', progress: 20 },
      { msg: 'Analyzing Mahatma Gandhi watermark shadow depth...', progress: 45 },
      { msg: 'Scanning color shift properties on Security Thread...', progress: 68 },
      { msg: 'Parsing intaglio ink texture & serial number OCR...', progress: 90 },
      { msg: 'Validating microprint and RBI Gov promise clause integrity...', progress: 100 }
    ];

    for (const step of steps) {
      setVerificationStep(step.msg);
      // Custom artificial delay to build dramatic tension and premium scan feel
      await new Promise(resolve => setTimeout(resolve, 800));
      setStepProgress(step.progress);
    }

    try {
      const response = await fetch('/api/analyze-currency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: fileBase64,
          denomination: denomination,
          presetType: presetType || (fileName?.includes('genuine') ? 'genuine' : 'counterfeit'),
          fileName: fileName
        })
      });

      if (response.ok) {
        const data = await response.json();
        setVerificationResult(data);
      } else {
        throw new Error('Verification backend unreachable');
      }
    } catch (err) {
      // High-fidelity local fallback
      const isFake = presetType !== 'genuine';
      setVerificationResult({
        isAuthentic: !isFake,
        confidenceScore: isFake ? 99 : 98,
        denomination: denomination,
        serialNumber: "4AC" + Math.floor(100000 + Math.random() * 900000),
        securityChecks: {
          watermark: isFake ? "Suspicious" : "Verified",
          securityThread: isFake ? "Imitation" : "Verified",
          microprint: isFake ? "Suspicious" : "Verified",
          rbiSeal: isFake ? "Suspicious" : "Verified",
          alignment: isFake ? "Misaligned" : "Perfect"
        },
        explanation: isFake 
          ? "CRITICAL ALERT: Counterfeit indicators detected. Lacks multi-tonal shadow gradient depth on Mahatma Gandhi watermark, security thread is printed rather than woven, and microprint shows resolution bleed under scanner."
          : "Genuine ₹" + denomination + " banknote verified. All structural, tactile, and spectral markers pass authentication filters."
      });
    } finally {
      setIsVerifying(false);
    }
  };

  // Run automatically on component mount to show a completed scan state as demo
  useEffect(() => {
    // Populate an initial completed fake result so the screen has visual value immediately
    setVerificationResult({
      isAuthentic: false,
      confidenceScore: 99,
      denomination: '500',
      serialNumber: '4AC819203',
      securityChecks: {
        watermark: 'Suspicious',
        securityThread: 'Imitation',
        microprint: 'Suspicious',
        rbiSeal: 'Suspicious',
        alignment: 'Misaligned'
      },
      explanation: 'CRITICAL ALERT: High-quality fake currency detected (99% confidence). Mahatma Gandhi watermark lacks shadow depth gradients. The security thread is a commercial printed laminate that fails green-to-blue shift, and microscopic resolution checks show substantial bleeding.'
    });
  }, []);

  // Preset specimen selectors
  const loadSpecimen = (type: 'genuine' | 'counterfeit', denom: '100' | '200' | '500' | '2000') => {
    setDenomination(denom);
    if (type === 'genuine') {
      setFileName(`specimen_genuine_${denom}_note.png`);
      setFileBase64('data:image/png;base64,genuine_sample_placeholder');
      handleVerifyCurrency('genuine');
    } else {
      setFileName(`specimen_counterfeit_${denom}_note.png`);
      setFileBase64('data:image/png;base64,fake_sample_placeholder');
      handleVerifyCurrency('counterfeit');
    }
  };

  // 4. Freeze Account Function
  const handleFreezeAccount = (txnId: string) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === txnId) {
        return { ...t, status: 'Frozen' };
      }
      return t;
    }));
    
    const txn = transactions.find(t => t.id === txnId);
    if (txn) {
      // Append an alert to fraud alerts feed dynamically
      const newAlert: FraudAlert = {
        id: `ALR-${Math.floor(810 + Math.random() * 100)}`,
        type: 'blacklist_account',
        value: `${txn.accountNo} (${txn.holderName})`,
        details: `Auto-generated: Account frozen due to verification of transaction ${txn.id} (${txn.type}).`,
        severity: 'Critical',
        reportedAt: new Date().toLocaleTimeString(),
        status: 'Active'
      };
      setAlerts(prev => [newAlert, ...prev]);
    }
  };

  // Unfreeze / Clear transaction
  const handleClearTransaction = (txnId: string) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === txnId) {
        return { ...t, status: 'Cleared' };
      }
      return t;
    }));
  };

  // File drag & drop handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setFileBase64(reader.result as string);
        // Trigger verification automatically when file loaded
        setTimeout(() => handleVerifyCurrency(), 100);
      };
      reader.readAsDataURL(file);
    }
  };

  // 5. Submit Counterfeit Report
  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReport.serialNumber) {
      alert("Please enter the note serial number.");
      return;
    }

    const report: CounterfeitReport = {
      id: `REP-${Math.floor(103 + Math.random() * 100)}`,
      branch: newReport.branch,
      denomination: newReport.denomination,
      serialNumber: newReport.serialNumber.toUpperCase(),
      location: newReport.location,
      reportedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      details: newReport.details || 'Discovered during general processing.',
      status: 'Transmitted'
    };

    setReports(prev => [report, ...prev]);
    setSubmitSuccess(true);
    setNewReport({
      branch: 'Mumbai BKC Corporate Branch',
      denomination: '500',
      serialNumber: '',
      location: 'Bandra-Kurla Complex, Mumbai',
      details: ''
    });

    setTimeout(() => {
      setSubmitSuccess(false);
    }, 4000);
  };

  // Filter Transactions
  const filteredTransactions = transactions.filter(t => {
    if (txnFilter === 'ALL') return true;
    return t.type === txnFilter;
  });

  // Filter Alerts
  const filteredAlerts = alerts.filter(a => {
    const matchesSearch = a.value.toLowerCase().includes(alertSearch.toLowerCase()) || 
                          a.details.toLowerCase().includes(alertSearch.toLowerCase());
    const matchesType = alertTypeFilter === 'ALL' ? true : a.type === alertTypeFilter;
    return matchesSearch && matchesType;
  });

  // Computed metrics for Analytics Dashboard
  const totalFlagged = transactions.filter(t => t.status === 'Flagged' || t.status === 'Under Investigation').length;
  const totalFrozen = transactions.filter(t => t.status === 'Frozen').length;
  const fakeNotesCount = reports.length + 32; // base offset + user reports

  return (
    <div id="bank-portal-container" className={`w-full min-h-screen py-6 px-4 lg:px-8 transition-colors duration-300 ${
      currentTheme === 'government' ? 'bg-[#F4F6F9] text-slate-800' : 'bg-zinc-950 text-zinc-100'
    }`}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Banner Alert Desk Header */}
        <div className={`p-4 md:p-6 rounded-2xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm ${
          currentTheme === 'government' 
            ? 'bg-white border-slate-200' 
            : 'bg-zinc-900 border-zinc-800'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-black tracking-wider bg-red-600 text-white animate-pulse">
                RBI Nodal Desk
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-zinc-400 font-mono">
                DESK-ID: B-7719
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight mt-1">
              Bank Fraud & Currency Defense Portal
            </h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 max-w-2xl">
              Nodal banking operations console equipped with live AI currency verification, suspicious transaction trigger watchdogs, integrated Cyber Police blacklists, and instant administrative account locking.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="flex gap-3 flex-wrap">
            <div className={`px-4 py-2 rounded-xl text-center border ${
              currentTheme === 'government' ? 'bg-slate-50' : 'bg-zinc-950/50'
            }`}>
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Fake Notes Flagged</span>
              <strong className="text-lg font-mono font-black text-amber-500">{fakeNotesCount}</strong>
            </div>
            <div className={`px-4 py-2 rounded-xl text-center border ${
              currentTheme === 'government' ? 'bg-slate-50' : 'bg-zinc-950/50'
            }`}>
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Active Suspicious</span>
              <strong className="text-lg font-mono font-black text-rose-500">{totalFlagged}</strong>
            </div>
            <div className={`px-4 py-2 rounded-xl text-center border ${
              currentTheme === 'government' ? 'bg-slate-50' : 'bg-zinc-950/50'
            }`}>
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Accounts Frozen</span>
              <strong className="text-lg font-mono font-black text-[#005CA9] dark:text-cyan-400">{totalFrozen}</strong>
            </div>
          </div>
        </div>

        {/* Navigation Tabs bar */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-slate-200 dark:border-zinc-800">
          <button
            onClick={() => setActiveSubTab('analytics')}
            className={`px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeSubTab === 'analytics'
                ? 'bg-[#005CA9] text-white shadow-md'
                : 'hover:bg-slate-200/50 dark:hover:bg-zinc-900 text-slate-600 dark:text-zinc-400'
            }`}
          >
            <BarChart3 size={15} />
            <span>6. Banking Analytics</span>
          </button>

          <button
            onClick={() => setActiveSubTab('verification')}
            className={`px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeSubTab === 'verification'
                ? 'bg-[#005CA9] text-white shadow-md'
                : 'hover:bg-slate-200/50 dark:hover:bg-zinc-900 text-slate-600 dark:text-zinc-400'
            }`}
          >
            <ShieldCheck size={15} />
            <span>1. Currency Verification</span>
          </button>

          <button
            onClick={() => setActiveSubTab('suspicious')}
            className={`px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap relative ${
              activeSubTab === 'suspicious'
                ? 'bg-[#005CA9] text-white shadow-md'
                : 'hover:bg-slate-200/50 dark:hover:bg-zinc-900 text-slate-600 dark:text-zinc-400'
            }`}
          >
            <Activity size={15} />
            <span>2 & 4. Suspicious Transfers</span>
            {totalFlagged > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[9px] flex items-center justify-center font-bold font-mono">
                {totalFlagged}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('alerts')}
            className={`px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeSubTab === 'alerts'
                ? 'bg-[#005CA9] text-white shadow-md'
                : 'hover:bg-slate-200/50 dark:hover:bg-zinc-900 text-slate-600 dark:text-zinc-400'
            }`}
          >
            <Bell size={15} />
            <span>3. Cyber Police Alerts</span>
          </button>

          <button
            onClick={() => setActiveSubTab('report')}
            className={`px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeSubTab === 'report'
                ? 'bg-[#005CA9] text-white shadow-md'
                : 'hover:bg-slate-200/50 dark:hover:bg-zinc-900 text-slate-600 dark:text-zinc-400'
            }`}
          >
            <Plus size={15} />
            <span>5. Report Counterfeit</span>
          </button>
        </div>

        {/* Content Stages */}
        <div className="w-full">
          
          {/* 1. CURRENCY VERIFICATION */}
          {activeSubTab === 'verification' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Settings Panel */}
              <div className="lg:col-span-5 space-y-6">
                <div className={`p-5 rounded-2xl border shadow-sm ${
                  currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <h3 className="font-black text-sm uppercase tracking-wide text-[#005CA9] dark:text-cyan-400 mb-2 flex items-center gap-1.5">
                    <Upload size={16} />
                    <span>Upload Banknote Image</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4 leading-relaxed">
                    Upload an image or scan of a suspicious banknote. The system executes micro-optical scanning checks to identify counterfeit markers.
                  </p>

                  {/* Drag & Drop Area */}
                  <div className="border-2 border-dashed border-slate-300 dark:border-zinc-700 rounded-xl p-6 text-center cursor-pointer hover:border-emerald-500 dark:hover:border-cyan-400 transition-colors relative">
                    <input 
                      type="file" 
                      id="note-file-upload" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-2 pointer-events-none">
                      <div className="w-10 h-10 bg-[#005CA9]/10 rounded-full flex items-center justify-center mx-auto text-[#005CA9] dark:text-cyan-400">
                        <Upload size={20} />
                      </div>
                      <p className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                        Drag banknote image here, or <span className="text-[#005CA9] dark:text-cyan-400 underline">browse device</span>
                      </p>
                      <p className="text-[10px] text-slate-400">Supports JPG, PNG up to 10MB</p>
                    </div>
                  </div>

                  {fileName && (
                    <div className="mt-3 p-2 bg-slate-50 dark:bg-zinc-950 rounded-lg border text-xs flex justify-between items-center font-mono">
                      <span className="truncate text-slate-600 dark:text-zinc-400 font-semibold">{fileName}</span>
                      <span className="text-[10px] text-emerald-500 font-bold uppercase">Ready</span>
                    </div>
                  )}

                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="text-[11px] font-black uppercase text-slate-400 block mb-1">Declared Denomination</label>
                      <div className="grid grid-cols-4 gap-2">
                        {(['100', '200', '500', '2000'] as const).map(denom => (
                          <button
                            key={denom}
                            type="button"
                            onClick={() => setDenomination(denom)}
                            className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                              denomination === denom
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'bg-slate-50 dark:bg-zinc-950 hover:bg-slate-100 dark:hover:bg-zinc-900 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-850'
                            }`}
                          >
                            ₹{denom}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleVerifyCurrency()}
                      disabled={isVerifying}
                      className="w-full py-2.5 bg-[#005CA9] hover:bg-[#004b8a] text-white font-bold text-xs uppercase rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:bg-slate-400"
                    >
                      {isVerifying ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Processing scan...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle size={14} />
                          <span>Initiate AI Verification</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Quick Sandboxing Specimen references */}
                <div className={`p-5 rounded-2xl border shadow-sm ${
                  currentTheme === 'government' ? 'bg-emerald-50/50 border-slate-200' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-cyan-400 block mb-1">
                    🧪 Sandbox Specimen Presets
                  </span>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed mb-3">
                    Instantly load official reference mockups to test authentic vs counterfeit classification states directly.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => loadSpecimen('genuine', '500')}
                      className="px-2.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold rounded-lg border border-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle size={12} />
                      <span>Genuine ₹500 Note</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => loadSpecimen('counterfeit', '500')}
                      className="px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-400 text-[11px] font-bold rounded-lg border border-rose-500/20 transition-all flex items-center justify-center gap-1.5"
                    >
                      <AlertTriangle size={12} />
                      <span>Fake ₹500 Note</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => loadSpecimen('genuine', '2000')}
                      className="px-2.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold rounded-lg border border-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle size={12} />
                      <span>Genuine ₹2k Note</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => loadSpecimen('counterfeit', '100')}
                      className="px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-400 text-[11px] font-bold rounded-lg border border-rose-500/20 transition-all flex items-center justify-center gap-1.5"
                    >
                      <AlertTriangle size={12} />
                      <span>Fake ₹100 Note</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Results Panel */}
              <div className="lg:col-span-7">
                <div className={`p-6 rounded-2xl border shadow-sm min-h-[400px] flex flex-col justify-between ${
                  currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  {isVerifying ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-12 space-y-4">
                      <div className="relative w-20 h-20">
                        <div className="absolute inset-0 rounded-full border-4 border-slate-100 dark:border-zinc-800"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-[#005CA9] dark:border-cyan-400 border-t-transparent animate-spin"></div>
                        <div className="absolute inset-3 bg-[#005CA9]/10 rounded-full flex items-center justify-center text-[#005CA9] dark:text-cyan-400">
                          <Activity size={24} className="animate-pulse" />
                        </div>
                      </div>
                      <div className="text-center max-w-sm space-y-1">
                        <h4 className="font-bold text-sm">Executing Micro-spectral scan</h4>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono text-center">
                          {verificationStep}
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-64 h-2 bg-slate-100 dark:bg-zinc-950 rounded-full overflow-hidden border">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-[#005CA9] transition-all duration-300"
                          style={{ width: `${stepProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">{stepProgress}% Complete</span>
                    </div>
                  ) : verificationResult ? (
                    <div className="space-y-5">
                      
                      {/* Classification Badge Banner */}
                      <div className={`p-4 rounded-xl border flex items-center justify-between ${
                        verificationResult.isAuthentic 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-emerald-400' 
                          : 'bg-rose-500/10 border-rose-500/20 text-rose-800 dark:text-rose-400'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                            verificationResult.isAuthentic ? 'bg-emerald-600' : 'bg-rose-600'
                          }`}>
                            {verificationResult.isAuthentic ? <ShieldCheck size={20} /> : <AlertTriangle size={20} />}
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest block opacity-75">Verification Decision</span>
                            <strong className="text-base font-black">
                              {verificationResult.isAuthentic ? 'GENUINE BANKNOTE' : 'FAKE CURRENCY DETECTED'}
                            </strong>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-black uppercase tracking-widest block opacity-75">Scan Confidence</span>
                          <strong className="text-2xl font-mono font-black">
                            {verificationResult.confidenceScore}%
                          </strong>
                        </div>
                      </div>

                      {/* AI Scan Checks Checklist */}
                      <div className="space-y-2">
                        <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-wider">AI Checkpoint Evaluation Matrix</h4>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          
                          {/* 1. Watermark */}
                          <div className={`p-3 rounded-xl border text-center ${
                            verificationResult.securityChecks.watermark === 'Verified'
                              ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'bg-red-500/5 border-red-500/10 text-rose-500'
                          }`}>
                            <span className="text-[10px] font-black uppercase block text-slate-400 mb-1">Watermark</span>
                            <div className="flex items-center justify-center gap-1">
                              {verificationResult.securityChecks.watermark === 'Verified' ? (
                                <CheckCircle size={12} />
                              ) : (
                                <AlertTriangle size={12} />
                              )}
                              <strong className="text-xs font-bold">{verificationResult.securityChecks.watermark}</strong>
                            </div>
                          </div>

                          {/* 2. Security Thread */}
                          <div className={`p-3 rounded-xl border text-center ${
                            verificationResult.securityChecks.securityThread === 'Verified'
                              ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'bg-red-500/5 border-red-500/10 text-rose-500'
                          }`}>
                            <span className="text-[10px] font-black uppercase block text-slate-400 mb-1">Security Thread</span>
                            <div className="flex items-center justify-center gap-1">
                              {verificationResult.securityChecks.securityThread === 'Verified' ? (
                                <CheckCircle size={12} />
                              ) : (
                                <AlertTriangle size={12} />
                              )}
                              <strong className="text-xs font-bold">{verificationResult.securityChecks.securityThread}</strong>
                            </div>
                          </div>

                          {/* 3. Serial Number */}
                          <div className={`p-3 rounded-xl border text-center ${
                            verificationResult.securityChecks.rbiSeal === 'Verified'
                              ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'bg-red-500/5 border-red-500/10 text-rose-500'
                          }`}>
                            <span className="text-[10px] font-black uppercase block text-slate-400 mb-1">Serial Number OCR</span>
                            <div className="flex items-center justify-center gap-1">
                              <CheckCircle size={12} className="text-emerald-500" />
                              <strong className="text-xs font-bold font-mono">
                                {verificationResult.serialNumber || '4AC819203'}
                              </strong>
                            </div>
                          </div>

                          {/* 4. Microprint */}
                          <div className={`p-3 rounded-xl border text-center ${
                            verificationResult.securityChecks.microprint === 'Verified'
                              ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'bg-red-500/5 border-red-500/10 text-rose-500'
                          }`}>
                            <span className="text-[10px] font-black uppercase block text-slate-400 mb-1">Microprint</span>
                            <div className="flex items-center justify-center gap-1">
                              {verificationResult.securityChecks.microprint === 'Verified' ? (
                                <CheckCircle size={12} />
                              ) : (
                                <AlertTriangle size={12} />
                              )}
                              <strong className="text-xs font-bold">{verificationResult.securityChecks.microprint}</strong>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Technical Analysis Report */}
                      <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-xl border text-xs space-y-2">
                        <strong className="text-[11px] font-black uppercase text-slate-400 tracking-wider block flex items-center gap-1">
                          <FileText size={12} />
                          <span>AI Intelligence Report & Explanation</span>
                        </strong>
                        <p className="text-slate-700 dark:text-zinc-300 leading-relaxed">
                          {verificationResult.explanation}
                        </p>
                      </div>

                      <div className="flex justify-between items-center gap-2 pt-2">
                        <button
                          onClick={() => {
                            // Automatically switch to report counterfeit tab
                            setNewReport(prev => ({
                              ...prev,
                              denomination: verificationResult.denomination,
                              serialNumber: verificationResult.serialNumber || '',
                              details: `AI verified scan: ${verificationResult.explanation}`
                            }));
                            setActiveSubTab('report');
                          }}
                          className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-zinc-300 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg flex items-center gap-1.5 transition-colors"
                        >
                          <ArrowUpRight size={13} />
                          <span>Report this Note to Cyber Police</span>
                        </button>

                        <button
                          onClick={() => {
                            setVerificationResult(null);
                            setFileName(null);
                          }}
                          className="px-3 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 font-mono transition-colors"
                        >
                          Clear Result
                        </button>
                      </div>

                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center py-12 text-center text-slate-400 space-y-3">
                      <div className="w-16 h-16 rounded-full border border-dashed border-slate-300 dark:border-zinc-800 flex items-center justify-center">
                        <ShieldCheck size={32} className="opacity-50" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-slate-700 dark:text-zinc-300">No active scan in progress</h4>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto">
                          Upload a banknote image using the file panel, or load a quick-load sandbox specimen reference note to check authenticity.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* 2 & 4. SUSPICIOUS TRANSACTIONS DETECTOR & ACCOUNT FREEZING */}
          {activeSubTab === 'suspicious' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Filter tabs */}
              <div className="lg:col-span-12 flex justify-between items-center flex-wrap gap-3">
                <div className="flex gap-1">
                  {(['ALL', 'Large Unusual Transfer', 'Multiple Small Transfers', 'High-Risk Beneficiary'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setTxnFilter(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        txnFilter === tab
                          ? 'bg-[#005CA9] border-[#005CA9] text-white shadow-sm'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-850'
                      }`}
                    >
                      {tab === 'ALL' ? 'All Alerts' : tab}
                    </button>
                  ))}
                </div>

                <div className="text-[10px] text-slate-400 font-mono font-bold">
                  Total Flagged Triggers: <span className="text-red-500">{filteredTransactions.length}</span>
                </div>
              </div>

              {/* Transactions List */}
              <div className="lg:col-span-12 space-y-4">
                {filteredTransactions.map(txn => (
                  <div 
                    key={txn.id}
                    className={`p-5 rounded-2xl border transition-all shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                      txn.status === 'Frozen'
                        ? 'bg-red-500/5 border-red-500/10'
                        : txn.status === 'Cleared'
                        ? 'bg-emerald-500/5 border-emerald-500/10'
                        : currentTheme === 'government'
                        ? 'bg-white border-slate-200 hover:border-slate-300'
                        : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="space-y-2 flex-1">
                      
                      {/* Category Badge & Timestamp */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                          txn.type === 'Large Unusual Transfer' 
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400' 
                            : txn.type === 'Multiple Small Transfers'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-400'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400'
                        }`}>
                          {txn.type}
                        </span>

                        <span className="text-[10px] font-mono text-slate-400 font-bold">
                          {txn.timestamp} • ID: {txn.id}
                        </span>

                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase ${
                          txn.status === 'Frozen' 
                            ? 'bg-red-600 text-white' 
                            : txn.status === 'Cleared'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-500 text-slate-900'
                        }`}>
                          {txn.status}
                        </span>
                      </div>

                      {/* Sender details and amount */}
                      <div className="flex items-baseline gap-4">
                        <strong className="text-base font-black text-slate-900 dark:text-zinc-100">
                          {txn.holderName}
                        </strong>
                        <span className="text-xs font-mono text-slate-500">
                          Acc: {txn.accountNo}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold font-mono">
                          UPI: {txn.upiId}
                        </span>
                      </div>

                      {/* Description / Audit details */}
                      <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed max-w-3xl">
                        {txn.details}
                      </p>
                    </div>

                    {/* Risk Score and Action Buttons */}
                    <div className="flex flex-col md:items-end gap-2 shrink-0 w-full md:w-auto">
                      <div className="text-right flex md:flex-col justify-between items-center md:items-end w-full">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Risk Index</span>
                        <strong className="text-lg font-black font-mono text-rose-500">
                          {txn.riskScore}% Match
                        </strong>
                      </div>

                      <div className="flex gap-2 w-full">
                        {txn.status === 'Flagged' || txn.status === 'Under Investigation' ? (
                          <>
                            <button
                              onClick={() => handleFreezeAccount(txn.id)}
                              className="flex-1 md:flex-initial px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase rounded-lg shadow-sm transition-all flex items-center justify-center gap-1"
                            >
                              <Lock size={12} />
                              <span>Freeze Account</span>
                            </button>
                            <button
                              onClick={() => handleClearTransaction(txn.id)}
                              className="flex-1 md:flex-initial px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 text-xs font-bold uppercase rounded-lg transition-all"
                            >
                              <span>Clear Risk</span>
                            </button>
                          </>
                        ) : txn.status === 'Frozen' ? (
                          <div className="px-4 py-2 bg-red-500/15 border border-red-500/30 text-red-700 dark:text-red-400 text-xs font-bold uppercase rounded-lg flex items-center justify-center gap-1.5 w-full">
                            <Lock size={13} />
                            <span>ACCOUNT LIQUIDITY FROZEN</span>
                          </div>
                        ) : (
                          <div className="px-4 py-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase rounded-lg flex items-center justify-center gap-1.5 w-full">
                            <CheckCircle size={13} />
                            <span>CLEARED / AUDIT COMPLIANT</span>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                ))}

                {filteredTransactions.length === 0 && (
                  <div className="p-8 text-center bg-white dark:bg-zinc-900 border rounded-2xl text-slate-400">
                    <Activity className="mx-auto mb-2 opacity-55" size={28} />
                    <p className="text-xs font-bold">No active triggers detected under this filter category.</p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* 3. CYBER POLICE ALERT DESK */}
          {activeSubTab === 'alerts' && (
            <div className="space-y-6">
              
              {/* Alert Filters and Search bar */}
              <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row justify-between items-center gap-3 shadow-sm ${
                currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
              }`}>
                <div className="relative w-full sm:max-w-md">
                  <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search blacklist UPIs, accounts, phone numbers..."
                    value={alertSearch}
                    onChange={(e) => setAlertSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border bg-slate-50 dark:bg-zinc-950 focus:bg-white text-slate-800 dark:text-zinc-100 border-slate-200 dark:border-zinc-850"
                  />
                </div>

                <div className="flex gap-1 w-full sm:w-auto overflow-x-auto">
                  {(['ALL', 'blacklist_account', 'fraud_upi', 'scam_phone'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => setAlertTypeFilter(type)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase border transition-all whitespace-nowrap ${
                        alertTypeFilter === type
                          ? 'bg-[#005CA9] border-[#005CA9] text-white'
                          : 'bg-white text-slate-600 border-slate-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300'
                      }`}
                    >
                      {type === 'ALL' ? 'All Types' : type.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feed of Alerts */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAlerts.map(alert => (
                  <div 
                    key={alert.id}
                    className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 shadow-sm ${
                      alert.severity === 'Critical' 
                        ? 'bg-rose-500/5 border-rose-500/20' 
                        : 'bg-white border-slate-200 dark:bg-zinc-900 dark:border-zinc-800'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                          alert.type === 'blacklist_account' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400' 
                            : alert.type === 'fraud_upi'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-400'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400'
                        }`}>
                          {alert.type.replace('_', ' ')}
                        </span>

                        <span className="text-[10px] font-mono text-slate-400 font-semibold">
                          {alert.reportedAt}
                        </span>
                      </div>

                      <div>
                        <strong className="text-base font-black font-mono text-slate-900 dark:text-zinc-100 block">
                          {alert.value}
                        </strong>
                        <span className="text-[10px] font-bold text-rose-500 font-mono">
                          Severity: {alert.severity}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-zinc-400 leading-normal">
                        {alert.details}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-zinc-850 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono font-bold">
                        ORIGIN: Cyber Police Hub
                      </span>
                      <button 
                        onClick={() => {
                          // Quick check to see if we have any transaction matching this value
                          const matched = transactions.find(t => t.accountNo.includes(alert.value.split(' ')[0]) || t.upiId.includes(alert.value));
                          if (matched) {
                            alert(`🚨 Match identified! Flagging transaction ${matched.id} (${matched.holderName}) immediately.`);
                            setTransactions(prev => prev.map(t => t.id === matched.id ? { ...t, riskScore: 100 } : t));
                          } else {
                            alert("Scanning transactions database... No current match found. Safeguard rule implemented!");
                          }
                        }}
                        className="text-[11px] font-bold text-[#005CA9] dark:text-cyan-400 hover:underline"
                      >
                        Enforce Rule
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* 5. REPORT COUNTERFEIT CURRENCY */}
          {activeSubTab === 'report' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Form Column */}
              <div className="lg:col-span-5">
                <div className={`p-6 rounded-2xl border shadow-sm ${
                  currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <h3 className="font-black text-sm uppercase tracking-wide text-[#005CA9] mb-1 flex items-center gap-1.5">
                    <Plus size={16} />
                    <span>File Counterfeit Report</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4">
                    Submit verified counterfeit banknote details discovered at branches to the Cyber Police Hub for legal action.
                  </p>

                  <form onSubmit={handleSubmitReport} className="space-y-4 text-xs">
                    
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Branch Location</label>
                      <select
                        value={newReport.branch}
                        onChange={(e) => setNewReport(prev => ({ ...prev, branch: e.target.value }))}
                        className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 border-slate-200 dark:border-zinc-850"
                      >
                        <option value="Mumbai BKC Corporate Branch">Mumbai BKC Corporate Branch</option>
                        <option value="Delhi Connaught Place Branch">Delhi Connaught Place Branch</option>
                        <option value="Bengaluru MG Road Branch">Bengaluru MG Road Branch</option>
                        <option value="Hyderabad Hitech City Branch">Hyderabad Hitech City Branch</option>
                        <option value="Kolkata Central Branch">Kolkata Central Branch</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Denomination</label>
                        <select
                          value={newReport.denomination}
                          onChange={(e) => setNewReport(prev => ({ ...prev, denomination: e.target.value }))}
                          className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 border-slate-200 dark:border-zinc-850"
                        >
                          <option value="100">₹100</option>
                          <option value="200">₹200</option>
                          <option value="500">₹500</option>
                          <option value="2000">₹2000</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Serial Number</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 4AC819203"
                          value={newReport.serialNumber}
                          onChange={(e) => setNewReport(prev => ({ ...prev, serialNumber: e.target.value }))}
                          className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 border-slate-200 dark:border-zinc-850"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Incident Location Details</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Counter-2 deposit or Cash Machine #4"
                        value={newReport.location}
                        onChange={(e) => setNewReport(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 border-slate-200 dark:border-zinc-850"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Additional Observations / Notes</label>
                      <textarea
                        rows={3}
                        placeholder="Describe optical, tactile, or customer behavior anomalies observed..."
                        value={newReport.details}
                        onChange={(e) => setNewReport(prev => ({ ...prev, details: e.target.value }))}
                        className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 border-slate-200 dark:border-zinc-850"
                      />
                    </div>

                    {submitSuccess && (
                      <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold rounded-lg flex items-center gap-2">
                        <CheckCircle size={15} />
                        <span>Transmission to Cyber Police Hub Successful!</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#005CA9] hover:bg-[#004f90] text-white font-bold uppercase rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <Plus size={14} />
                      <span>Transmit Report</span>
                    </button>

                  </form>
                </div>
              </div>

              {/* History List Column */}
              <div className="lg:col-span-7">
                <div className={`p-6 rounded-2xl border shadow-sm min-h-[400px] flex flex-col justify-between ${
                  currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <div className="space-y-4">
                    <h3 className="font-black text-sm uppercase tracking-wide text-[#005CA9] flex items-center gap-1.5">
                      <FileText size={16} />
                      <span>Transmitted Reports History Ledger</span>
                    </h3>

                    <div className="space-y-3">
                      {reports.map(rep => (
                        <div key={rep.id} className="p-4 bg-slate-50 dark:bg-zinc-950 border rounded-xl space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="px-2 py-0.5 rounded text-[9px] font-black bg-[#005CA9]/10 text-[#005CA9] dark:text-cyan-400 font-mono">
                              {rep.id}
                            </span>
                            <span className="text-[10px] text-slate-400 font-semibold font-mono">
                              {rep.reportedAt}
                            </span>
                          </div>

                          <div className="flex justify-between items-baseline">
                            <strong className="text-xs font-black text-slate-900 dark:text-zinc-200">{rep.branch}</strong>
                            <span className="text-xs text-rose-500 font-mono font-black">₹{rep.denomination} note</span>
                          </div>

                          <div className="text-[11px] text-slate-500 dark:text-zinc-400 leading-normal space-y-1">
                            <div><strong className="text-slate-400 uppercase text-[9px]">Serial:</strong> <span className="font-mono font-bold text-slate-700 dark:text-zinc-300">{rep.serialNumber}</span></div>
                            <div><strong className="text-slate-400 uppercase text-[9px]">Location:</strong> <span>{rep.location}</span></div>
                            <div className="italic text-slate-600 dark:text-zinc-400 mt-1">"{rep.details}"</div>
                          </div>

                          <div className="pt-2 border-t border-slate-150 dark:border-zinc-850 flex items-center justify-between text-[10px]">
                            <span className="text-slate-400 font-mono font-bold">DESTINATION: National Cyber Police Node</span>
                            <span className="text-emerald-500 font-bold flex items-center gap-0.5">
                              <Check size={11} />
                              {rep.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* 6. BANKING ANALYTICS DASHBOARD */}
          {activeSubTab === 'analytics' && (
            <div className="space-y-6">
              
              {/* Top counter boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className={`p-5 rounded-2xl border shadow-sm ${
                  currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Fake Notes Verified</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <strong className="text-3xl font-black font-mono text-amber-500">{fakeNotesCount}</strong>
                    <span className="text-[10px] text-emerald-500 font-bold font-mono">100% confidence</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1">
                    Identified via real-time optical scan signature validation.
                  </p>
                </div>

                <div className={`p-5 rounded-2xl border shadow-sm ${
                  currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Suspicious Transfers</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <strong className="text-3xl font-black font-mono text-rose-500">{totalFlagged}</strong>
                    <span className="text-[10px] text-rose-500 font-bold font-mono">+12% spike</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1">
                    Triggers: Structured small amounts or blacklisted UPI matches.
                  </p>
                </div>

                <div className={`p-5 rounded-2xl border shadow-sm ${
                  currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Frozen Accounts</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <strong className="text-3xl font-black font-mono text-[#005CA9] dark:text-cyan-400">{totalFrozen}</strong>
                    <span className="text-[10px] text-slate-500 font-mono">Secured</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1">
                    Administrative lockdowns authorized with automated RBI alerts.
                  </p>
                </div>

                <div className={`p-5 rounded-2xl border shadow-sm ${
                  currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Security Compliance</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <strong className="text-3xl font-black font-mono text-emerald-500">99.8%</strong>
                    <span className="text-[10px] text-emerald-500 font-mono">Optimal</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1">
                    Average trace-to-action resolution latency under 4.2 minutes.
                  </p>
                </div>

              </div>

              {/* Charts grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. Fraud Trends Line Chart */}
                <div className={`lg:col-span-7 p-6 rounded-2xl border shadow-sm ${
                  currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-wide">Hourly Fraud Detection Trends</h4>
                      <p className="text-[11px] text-slate-500">Live temporal monitoring of threat alerts and corrective interventions.</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#005CA9] dark:text-cyan-400 flex items-center gap-1">
                      <TrendingUp size={13} />
                      Live Feed
                    </span>
                  </div>

                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={FRAUD_TRENDS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorSuspicious" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorFakeNotes" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={currentTheme === 'government' ? '#E5E7EB' : '#27272A'} />
                        <XAxis dataKey="time" stroke="#888888" fontSize={9} />
                        <YAxis stroke="#888888" fontSize={9} />
                        <Tooltip contentStyle={{ backgroundColor: currentTheme === 'government' ? '#FFFFFF' : '#18181B' }} />
                        <Legend wrapperStyle={{ fontSize: 9 }} />
                        <Area type="monotone" dataKey="suspiciousTx" name="Suspicious Transfers" stroke="#EF4444" fillOpacity={1} fill="url(#colorSuspicious)" />
                        <Area type="monotone" dataKey="fakeNotes" name="Fake Notes Detected" stroke="#F59E0B" fillOpacity={1} fill="url(#colorFakeNotes)" />
                        <Line type="monotone" dataKey="resolved" name="Resolved Threats" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 2. Metropolitan Branch Statistics Bar Chart */}
                <div className={`lg:col-span-5 p-6 rounded-2xl border shadow-sm ${
                  currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-wide">Metropolitan Branch Incident Statistics</h4>
                      <p className="text-[11px] text-slate-500">Cross-branch correlation ledger of counterfeits & freezes.</p>
                    </div>
                  </div>

                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={METRO_BRANCH_STATS} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={currentTheme === 'government' ? '#E5E7EB' : '#27272A'} />
                        <XAxis dataKey="name" stroke="#888888" fontSize={9} />
                        <YAxis stroke="#888888" fontSize={9} />
                        <Tooltip contentStyle={{ backgroundColor: currentTheme === 'government' ? '#FFFFFF' : '#18181B' }} />
                        <Legend wrapperStyle={{ fontSize: 9 }} />
                        <Bar dataKey="fakeNotes" name="Fake Notes" fill="#F59E0B" radius={[3, 3, 0, 0]} />
                        <Bar dataKey="suspiciousTx" name="Suspicious Tx" fill="#EF4444" radius={[3, 3, 0, 0]} />
                        <Bar dataKey="frozenAccts" name="Frozen Accts" fill="#005CA9" radius={[3, 3, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

              {/* Action alert box for operational readiness */}
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center gap-3">
                <Info size={18} className="text-[#005CA9] dark:text-cyan-400 shrink-0" />
                <div className="text-xs">
                  <strong className="font-bold text-slate-900 dark:text-zinc-200">Regulatory Security Compliance Standard (RBI Circ-9042):</strong> Commercial nodes must maintain synchronicity with regional Cyber Police registries. Ensure regular manual synchronization of alerts in the alert desk tab.
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
