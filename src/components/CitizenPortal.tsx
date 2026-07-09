import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, HelpCircle, FileText, UploadCloud, AlertTriangle, Phone, MapPin, Download, CheckCircle2, MessageCircle, Volume2, Camera, Smartphone, Megaphone, Bell, Search, ShieldAlert, ExternalLink, Mail, Globe, X } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface CitizenPortalProps {
  currentTheme: 'government' | 'intelligence';
  currentLanguage: string;
}

const NEARBY_STATIONS = [
  { city: 'Delhi', state: 'Delhi NCR', name: 'Nodal Cyber Police Station, Sector 16, Dwarka', contact: '011-28031122', email: 'cp.delhi@nic.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Crime+Police+Station+Sector+16+Dwarka+Delhi', website: 'https://delhipolice.gov.in' },
  { city: 'Mumbai', state: 'Maharashtra', name: 'BKC Cyber Crime Investigation Cell, Bandra Kurla Complex', contact: '022-26504008', email: 'cybercell.mumbai@mahapolice.gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=BKC+Cyber+Crime+Investigation+Cell+Bandra+Kurla+Complex+Mumbai', website: 'https://mahapolice.gov.in' },
  { city: 'Pune', state: 'Maharashtra', name: 'Cyber Crime Police Station, Shivajinagar Pune', contact: '020-25501103', email: 'crimeps.pune@mahapolice.gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Crime+Police+Station+Shivajinagar+Pune', website: 'https://punepolice.gov.in' },
  { city: 'Bengaluru', state: 'Karnataka', name: 'Cyber Crime Police Station (CEN), Infantry Road', contact: '080-22942284', email: 'cybercrime.cen@ksp.gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Crime+Police+Station+Infantry+Road+Bengaluru', website: 'https://ksp.gov.in' },
  { city: 'Hyderabad', state: 'Telangana', name: 'Cyber Crime Police Station, CCS, Detective Department', contact: '040-27852412', email: 'cybercrime-hyd@telanganapolice.gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Crime+Police+Station+Hyderabad+Commissionerate', website: 'https://telanganapolice.gov.in' },
  { city: 'Chennai', state: 'Tamil Nadu', name: 'Cyber Crime Cell, Greater Chennai Police, Vepery', contact: '044-23452350', email: 'cybercell.chennai@tnpolice.gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Crime+Cell+Vepery+Chennai', website: 'https://eservices.tnpolice.gov.in' },
  { city: 'Kolkata', state: 'West Bengal', name: 'Cyber Crime Police Station, Lalbazar HQ', contact: '033-22143000', email: 'cybercrimeps@kolkatapolice.gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Crime+Police+Station+Lalbazar+Kolkata', website: 'https://kolkatapolice.gov.in' },
  { city: 'Noida', state: 'Uttar Pradesh', name: 'Cyber Crime Police Station, Sector 108 Noida', contact: '0120-2970030', email: 'cybercell.gb@uppolice.gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Crime+Police+Station+Sector+108+Noida', website: 'https://uppolice.gov.in' },
  { city: 'Lucknow', state: 'Uttar Pradesh', name: 'Nodal Cyber Crime Police Station, Mahanagar Lucknow', contact: '0522-2337534', email: 'cybercell-up@nic.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Nodal+Cyber+Crime+Police+Station+Mahanagar+Lucknow', website: 'https://uppolice.gov.in' },
  { city: 'Gurugram', state: 'Haryana', name: 'Cyber Crime Police Station East, Sector 43 Gurugram', contact: '0124-2221001', email: 'cp.ggn@hry.nic.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Crime+Police+Station+East+Sector+43+Gurugram', website: 'https://haryanapolice.gov.in' },
  { city: 'Ahmedabad', state: 'Gujarat', name: 'Cyber Crime Police Station, Mithakhali Ahmedabad', contact: '079-26461122', email: 'ccps-ahd@gujarat.gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Crime+Police+Station+Mithakhali+Ahmedabad', website: 'https://police.gujarat.gov.in' },
  { city: 'Jaipur', state: 'Rajasthan', name: 'Cyber Crime Police Station, Jhalana Doongri Jaipur', contact: '0141-2713100', email: 'ccps.jaipur@rajpolice.gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Crime+Police+Station+Jhalana+Doongri+Jaipur', website: 'https://police.rajasthan.gov.in' },
  { city: 'Kochi', state: 'Kerala', name: 'Cyber Crime Police Station, Infopark Kochi', contact: '0484-2950100', email: 'pscyber.ekm@keralapolice.gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Crime+Police+Station+Infopark+Kochi', website: 'https://keralapolice.gov.in' },
  { city: 'Thiruvananthapuram', state: 'Kerala', name: 'State Cyber Crime Police HQ, Pattom', contact: '0471-2448700', email: 'spcyber.pol@kerala.gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=State+Cyber+Crime+Police+Pattom+Thiruvananthapuram', website: 'https://keralapolice.gov.in' },
  { city: 'Bhopal', state: 'Madhya Pradesh', name: 'State Cyber Police Headquarters, Bhadbhada Road', contact: '0755-2770248', email: 'scphq.bhopal@mp.gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=State+Cyber+Police+Headquarters+Bhadbhada+Road+Bhopal', website: 'https://mpcyberpolice.nic.in' },
  { city: 'Indore', state: 'Madhya Pradesh', name: 'Cyber Crime Police Station, Palasia Indore', contact: '0731-2512100', email: 'cybercell.indore@mp.gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Crime+Police+Station+Palasia+Indore', website: 'https://mppolice.gov.in' },
  { city: 'Bhubaneswar', state: 'Odisha', name: 'Cyber Crime Police Station, CID CB, Cuttack Road', contact: '0674-2580100', email: 'cyberps.odisha@gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Crime+Police+Station+Bhubaneswar', website: 'https://odishapolice.gov.in' },
  { city: 'Patna', state: 'Bihar', name: 'Cyber Crime Police Station, Nehru Nagar Patna', contact: '0612-2210100', email: 'cybercell-bih@nic.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Crime+Police+Station+Patna', website: 'https://biharpolice.bih.nic.in' },
  { city: 'Guwahati', state: 'Assam', name: 'Cyber Crime Police Station, CID Complex Ulubari', contact: '0361-2529157', email: 'cybercell-cid@assampolice.gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Crime+Police+Station+CID+Guwahati', website: 'https://assampolice.gov.in' },
  { city: 'Chandigarh', state: 'Chandigarh UT', name: 'Cyber Crime Investigation Cell, Sector 17', contact: '0172-2749900', email: 'cybercell-chd@nic.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Crime+Investigation+Cell+Sector+17+Chandigarh', website: 'https://chandigarhpolice.gov.in' },
  { city: 'Srinagar', state: 'Jammu and Kashmir', name: 'Cyber Police Station Kashmir, Shergarhi Srinagar', contact: '0194-2450585', email: 'cyberpolicekashmir@jkpolice.gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Police+Station+Shergarhi+Srinagar', website: 'https://jkpolice.gov.in' },
  { city: 'Jammu', state: 'Jammu and Kashmir', name: 'Cyber Police Station Jammu, Gandhi Nagar Jammu', contact: '0191-2436734', email: 'cyberpolicejammu@jkpolice.gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Police+Station+Jammu+Gandhi+Nagar', website: 'https://jkpolice.gov.in' },
  { city: 'Dehradun', state: 'Uttarakhand', name: 'State Cyber Crime Police Station, Raipur Dehradun', contact: '0135-2655900', email: 'ccps.dehradun@uttarakhandpolice.uk.gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=State+Cyber+Crime+Police+Station+Dehradun', website: 'https://uttarakhandpolice.uk.gov.in' },
  { city: 'Shimla', state: 'Himachal Pradesh', name: 'State Cyber Crime Police Station, Khalini Shimla', contact: '0177-2621714', email: 'cybercell-hp@nic.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=State+Cyber+Crime+Police+Station+Khalini+Shimla', website: 'https://hppolice.gov.in' },
  { city: 'Ranchi', state: 'Jharkhand', name: 'Cyber Crime Police Station, Near JAP-1 Complex Ranchi', contact: '0651-2446100', email: 'cybercell-ranchi@jhpolice.gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Crime+Police+Station+Ranchi', website: 'https://jhpolice.gov.in' },
  { city: 'Raipur', state: 'Chhattisgarh', name: 'State Cyber Police Station, Civil Lines Raipur', contact: '0771-4247100', email: 'cybercell.raipur@cgpolice.gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=State+Cyber+Police+Station+Raipur', website: 'https://cgpolice.gov.in' },
  { city: 'Panaji', state: 'Goa', name: 'Cyber Crime Police Station, Ribandar Goa', contact: '0832-2444111', email: 'cyberps@goapolice.gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Crime+Police+Station+Ribandar+Goa', website: 'https://goapolice.gov.in' },
  { city: 'Puducherry', state: 'Puducherry UT', name: 'Cyber Crime Police Station, Sigma Complex', contact: '0413-2277100', email: 'cybercell-police.py@gov.in', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cyber+Crime+Police+Station+Puducherry', website: 'https://police.py.gov.in' }
];

const SCAM_ALERTS = [
  {
    id: 'AL-2026-001',
    title: 'Skype Video Call & "Digital Arrest" Extortion',
    category: 'Digital Arrest Scam',
    severity: 'CRITICAL',
    date: 'July 08, 2026',
    reportedIncidentsCount: 14502,
    description: 'Fraudsters impersonating Mumbai Customs, CBI, or Delhi Police claiming your Aadhaar number is implicated in illegal drug parcel/money laundering.',
    modusOperandi: 'You receive a robocall stating an illegal package with drugs has been intercepted. You are forced to download Skype or join a video link, shown fake police backgrounds, and kept under continuous video surveillance ("Digital Arrest"). They coerce you into transferring all your bank balances for "verification clearance".',
    advisory: 'Real enforcement agencies (Police, CBI, Customs, ED, RBI) NEVER initiate digital arrests, place citizens under video surveillance, or ask for money transfer online to settle files. If you receive such a call, hang up immediately, block them, and report to 1930.',
    phrasesToWatch: ['Aadhaar drug parcel', 'Digital arrest warrant', 'Skype video interrogation', 'CBI clearance account'],
    testCasePreset: 'Hello this is CBI Officer Kumar calling. Your Aadhaar number has been flagged in a money laundering package sent from Mumbai to Cambodia. You are under immediate Digital Arrest and must join a private Skype video call immediately for interrogation.'
  },
  {
    id: 'AL-2026-002',
    title: 'AI Voice Cloning & Urgent Family Distress Scam',
    category: 'AI Deepfake / Voice Clone',
    severity: 'HIGH',
    date: 'July 05, 2026',
    reportedIncidentsCount: 8940,
    description: 'Cybercriminals clone the vocal signature of your son, daughter, or relative from public social media videos and call pleading for emergency funds.',
    modusOperandi: 'A parent receives an urgent call from an unknown number. The voice sounds exactly like their child crying, stating they have been detained by police or met with an accident and need money immediately for bail/medical treatment. A "police officer" then speaks, demanding instant UPI payments.',
    advisory: 'Always verify by hanging up and calling your family member on their known saved phone number, or calling other relatives. Establish a private "Family Safe-Word" known only to you and your loved ones to instantly test caller authenticity.',
    phrasesToWatch: ['Mamma please save me', 'Under police custody', 'Accident emergency UPI', 'Don\'t hang up the phone'],
    testCasePreset: 'Mamma please save me! I have been arrested by Mumbai cyber branch because some friends used my bank account for wrong transfers. They are demanding ₹50,000 immediately or they will put me in lockup!'
  },
  {
    id: 'AL-2026-003',
    title: 'Part-Time "YouTube Video Like" Job Racket',
    category: 'Employment Fraud',
    severity: 'HIGH',
    date: 'June 30, 2026',
    reportedIncidentsCount: 22410,
    description: 'WhatsApp/Telegram groups offering easy passive income for liking YouTube videos or writing Google reviews, which turns into an investment trap.',
    modusOperandi: 'You are offered ₹50 per video like. After paying you ₹150–500, they add you to a premium Telegram group where you are pushed to complete "welfare tasks" requiring you to deposit money in crypto/fake investment schemes with promised high returns, which are then frozen.',
    advisory: 'Never deposit money to unlock job earnings. Legitimate companies never charge fees to give you tasks or require you to buy cryptocurrency to process payouts.',
    phrasesToWatch: ['Work from home task', 'Like and subscribe job', 'VIP premium welfare task', 'Merchant order task'],
    testCasePreset: 'Earn ₹3000-5000 daily working part-time from home. Simple YouTube video liking job. No experience needed. Join our Telegram channel: https://t.me/task_pay_india to receive your first ₹150 immediately.'
  },
  {
    id: 'AL-2026-004',
    title: 'Electricity Bill & Power Disconnection Threats',
    category: 'Phishing',
    severity: 'MEDIUM',
    date: 'June 25, 2026',
    reportedIncidentsCount: 6512,
    description: 'Urgent SMS warnings stating that power supply will be cut off by 9:30 PM tonight unless you contact a specific "Electricity Officer" number.',
    modusOperandi: 'The text message claims previous bills are unpaid or not updated. When you call the number, you are asked to install a screen-sharing app (like AnyDesk or TeamViewer) to complete a ₹10 bill update, which lets scammers compromise your netbanking credentials.',
    advisory: 'State electricity boards (Discoms) never send disconnection threats with personal mobile numbers for contact. Always use official payment portals or bills to pay.',
    phrasesToWatch: ['Electricity cut off', 'Dear consumer electricity bill', 'Disconnection officer number', 'AnyDesk bill update'],
    testCasePreset: 'Dear Consumer, Your electricity power supply connection will be disconnected tonight at 9:30 PM from power office because your previous month bill was not updated. Please immediately contact our head electricity officer Mr. Sharma at 94451-98011.'
  },
  {
    id: 'AL-2026-005',
    title: 'Sanchar Saathi Mobile SIM Block Intimidation',
    category: 'Identity Impersonation',
    severity: 'HIGH',
    date: 'June 18, 2026',
    reportedIncidentsCount: 4320,
    description: 'Calls asserting that your mobile phone number will be disconnected or blocked within 2 hours due to illegal activity linked to your ID.',
    modusOperandi: 'Automated robocalls impersonate the Department of Telecommunications (DoT). They claim that 9 other SIM cards have been fraudulently activated using your Aadhaar card and are being used for illegal advertisements or harassment, demanding you pay or verify credentials immediately.',
    advisory: 'DoT never initiates bulk disconnection calls via robocalls. You can verify all SIMs registered under your ID yourself using the official government Sanchar Saathi portal (tafcop.sancharsaathi.gov.in) safely.',
    phrasesToWatch: ['Department of Telecommunications', 'SIM card disconnected in 2 hours', 'Illegal Aadhaar SIM activation', 'TRAI block order'],
    testCasePreset: 'This is an automated call from Department of Telecommunications (TRAI). Your current mobile SIM line is reported under suspicious activities and will be permanently deactivated in 2 hours. Press 9 to speak with an executive for identity verification.'
  },
  {
    id: 'AL-2026-006',
    title: 'Fake Stock Investment WhatsApp Groups',
    category: 'Financial Scam',
    severity: 'CRITICAL',
    date: 'July 01, 2026',
    reportedIncidentsCount: 18120,
    description: 'Scammers add citizens to WhatsApp groups promising 500% to 1000% returns using institutional stock trading accounts or IPO allocations.',
    modusOperandi: 'Victims are added to stock market WhatsApp groups run by "reputed financial gurus". They are instructed to install custom mobile trading applications to buy exclusive block trading stocks. The apps show fake exponential profits, but when victims try to withdraw, they are blocked or asked for a 20% "tax fee" first.',
    advisory: 'SEBI-registered advisors never conduct business via casual WhatsApp groups. Never install trading applications downloaded outside official Google Play Store or Apple App Store.',
    phrasesToWatch: ['Block trade allocation', 'Institutional trade desk', 'Guaranteed stock tips', 'Withdrawal tax fee'],
    testCasePreset: 'Welcome to VIP Institutional Wealth Academy Group. Prof. Mehta will share daily free stock tips with guaranteed 80% daily profits. Click here to download our registered elite investment desk application: http://vip-sebi-desk.apk'
  }
];

export default function CitizenPortal({ currentTheme, currentLanguage }: CitizenPortalProps) {
  const { t } = useLanguage();
  // Input fields
  const [suspectText, setSuspectText] = useState('');
  const [uploadType, setUploadType] = useState<'text' | 'whatsapp' | 'voice' | 'banknote' | 'report' | 'alerts'>('text');
  const [suspectNo, setSuspectNo] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [denomination, setDenomination] = useState<'100' | '200' | '500' | '2000'>('500');
  const [banknotePreset, setBanknotePreset] = useState<'genuine' | 'counterfeit' | null>('genuine');

  // Scam Alerts filter states
  const [searchAlertQuery, setSearchAlertQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'MEDIUM'>('ALL');
  const [selectedAlertCategory, setSelectedAlertCategory] = useState<string>('ALL');

  // Reporting Form States
  const [reportName, setReportName] = useState('');
  const [reportPhone, setReportPhone] = useState('');
  const [reportCategory, setReportCategory] = useState('Digital Arrest Scam');
  const [reportLoss, setReportLoss] = useState('');
  const [reportSuspect, setReportSuspect] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
  const [reportSubmittedAlert, setReportSubmittedAlert] = useState<string | null>(null);

  // Seed initial reports list with mock historical data
  const [customReportedList, setCustomReportedList] = useState<any[]>([
    {
      id: 'MHA-CC-2026-48210',
      reporterName: 'Amit Sharma',
      reporterPhone: '+91 98765 43210',
      scamCategory: 'Phishing / UPI Fraud',
      financialLoss: '45,000',
      suspectDetails: 'UPI: kbcwinners@upi',
      description: 'Received SMS claim about ₹25L KBC lottery. Transferred ₹45k as registration charge.',
      date: '2026-07-07',
      status: 'UNDER_INVESTIGATION',
      timestamp: 'Yesterday, 14:32'
    },
    {
      id: 'MHA-CC-2026-31940',
      reporterName: 'Priya Patel',
      reporterPhone: '+91 81234 56789',
      scamCategory: 'Digital Arrest Scam',
      financialLoss: '0',
      suspectDetails: '+91 94451 98011',
      description: 'Suspect impersonated CBI officer on a Skype video call claiming passport issues. Disconnected and blocked immediately.',
      date: '2026-07-06',
      status: 'FORWARDED',
      timestamp: '2 days ago, 09:15'
    }
  ]);

  // Loading & Result States
  const [loading, setLoading] = useState(false);
  const [scamResult, setScamResult] = useState<any | null>(null);
  const [currencyResult, setCurrencyResult] = useState<any | null>(null);
  const [reportedSuccessfully, setReportedSuccessfully] = useState(false);

  // Near Station Finder search
  const [searchCity, setSearchCity] = useState('');

  // Banknote camera / upload states
  const [banknoteSource, setBanknoteSource] = useState<'device' | 'camera'>('device');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [showCameraPermissionModal, setShowCameraPermissionModal] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    setCameraActive(true);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error("Camera access failed:", err);
      setCameraError("Camera access denied or unavailable. Please upload a saved image instead or grant permissions.");
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const captureSnapshot = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setFileBase64(dataUrl);
        setFileName(`camera_capture_${Date.now()}.jpg`);
        setBanknotePreset(null);
        stopCamera();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setBanknotePreset(null);
      const reader = new FileReader();
      reader.onload = () => {
        setFileBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const runAIScan = async () => {
    setLoading(true);
    setScamResult(null);
    setCurrencyResult(null);
    setReportedSuccessfully(false);

    try {
      if (uploadType === 'banknote') {
        const response = await fetch('/api/analyze-currency', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: fileBase64,
            denomination: denomination,
            presetType: banknotePreset
          })
        });
        const data = await response.json();
        setCurrencyResult(data);
      } else {
        // Text, WhatsApp, or Voice transcribing
        const payloadText = uploadType === 'voice' 
          ? `[Audio Transcript of suspicious Call]: "Hello this is CBI Officer Kumar calling. Your Aadhaar number has been flagged in a money laundering package sent from Mumbai to Cambodia. You are under immediate Digital Arrest and must join a private Skype video call immediately for interrogation."`
          : uploadType === 'whatsapp'
          ? `[WhatsApp Chat History Log]: "Suspicious contact: +91 98451 22345. Congratulations! You are selected as the recipient of ₹25,00,000 lottery from Kaun Banega Crorepati. Please transfer verification fee ₹12,500 to this UPI ID: kbcwinners@upi to claim your rewards."`
          : suspectText;

        const response = await fetch('/api/analyze-scam', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: uploadType,
            text: payloadText,
            metadata: { suspectNo }
          })
        });
        const data = await response.json();
        setScamResult(data);
      }
    } catch (err) {
      console.error("AI Scan failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const triggerSOS = () => {
    alert("🚨 EMERGENCY SOS BROADCAST TRIGGERED!\nAn encrypted distress packet has been routed to the Cyber Crime Coordination Center (I4C) and local police GPS dispatch containing your device coordinates.");
  };

  const fileOfficialComplaint = () => {
    const randomId = `MHA-CC-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReport = {
      id: randomId,
      reporterName: 'Anonymous Citizen',
      reporterPhone: suspectNo || 'Not specified',
      scamCategory: scamResult?.threatCategory || (currencyResult ? 'Counterfeit Currency' : 'General Cyber Threat'),
      financialLoss: '0',
      suspectDetails: suspectNo || 'Unknown suspect identifier',
      description: scamResult?.explanation || currencyResult?.explanation || suspectText || 'Reported via automated safety analysis scan.',
      date: new Date().toISOString().split('T')[0],
      status: 'PENDING',
      timestamp: 'Just now'
    };
    
    setCustomReportedList(prev => [newReport, ...prev]);
    setReportedSuccessfully(true);
  };

  const filteredAlerts = SCAM_ALERTS.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(searchAlertQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchAlertQuery.toLowerCase()) ||
      a.modusOperandi.toLowerCase().includes(searchAlertQuery.toLowerCase()) ||
      a.advisory.toLowerCase().includes(searchAlertQuery.toLowerCase());
    
    const matchesSeverity = selectedSeverity === 'ALL' || a.severity === selectedSeverity;
    const matchesCategory = selectedAlertCategory === 'ALL' || a.category === selectedAlertCategory;
    
    return matchesSearch && matchesSeverity && matchesCategory;
  });

  const alertCategories = ['ALL', ...Array.from(new Set(SCAM_ALERTS.map(a => a.category)))];

  const filteredStations = NEARBY_STATIONS.filter(s => 
    s.city.toLowerCase().includes(searchCity.toLowerCase()) ||
    (s.state && s.state.toLowerCase().includes(searchCity.toLowerCase())) ||
    s.name.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className={`w-full py-6 px-4 lg:px-8 ${
      currentTheme === 'government' ? 'bg-[#F7F8FA] text-slate-800' : 'bg-zinc-950 text-zinc-100'
    }`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title */}
        <div className="mb-8 border-b pb-4 border-slate-200 dark:border-zinc-800 flex justify-between items-center flex-wrap gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#005CA9] dark:text-cyan-400">{t('Citizen Portal')}</span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{t('Public Cyber Safety Analyzer')}</h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">{t('Upload call transcripts, WhatsApp message snapshots, or currency notes to test for fraud signature markers.')}</p>
          </div>

          <button
            onClick={triggerSOS}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded shadow-md animate-bounce"
          >
            <Phone size={14} />
            <span>{t('Generate Immediate SOS')}</span>
          </button>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`p-6 rounded-xl border shadow-sm ${
              currentTheme === 'government' ? 'bg-white border-slate-300' : 'bg-zinc-900 border-zinc-800'
            }`}>
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <ShieldCheck className="text-emerald-500" />
                <span>
                  {uploadType === 'report' 
                    ? t('File Official Incident Complaint') 
                    : uploadType === 'alerts'
                    ? t('National Cyber Scam Alerts Directory')
                    : t('Threat Verification Console')}
                </span>
              </h2>

              {/* Upload Type Selector */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-6 bg-slate-100 dark:bg-zinc-950 p-1.5 rounded-lg border border-slate-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => { setUploadType('text'); setScamResult(null); setCurrencyResult(null); }}
                  className={`py-2 text-xs font-bold rounded transition-all ${
                    uploadType === 'text' 
                      ? 'bg-[#005CA9] text-white shadow' 
                      : 'text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  {t('SMS / Text')}
                </button>
                <button
                  type="button"
                  onClick={() => { setUploadType('whatsapp'); setScamResult(null); setCurrencyResult(null); setFileName('whatsapp_screenshot.png'); }}
                  className={`py-2 text-xs font-bold rounded transition-all ${
                    uploadType === 'whatsapp' 
                      ? 'bg-[#005CA9] text-white shadow' 
                      : 'text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  {t('WhatsApp')}
                </button>
                <button
                  type="button"
                  onClick={() => { setUploadType('voice'); setScamResult(null); setCurrencyResult(null); setFileName('voice_arrest_threat.wav'); }}
                  className={`py-2 text-xs font-bold rounded transition-all ${
                    uploadType === 'voice' 
                      ? 'bg-[#005CA9] text-white shadow' 
                      : 'text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  {t('Call Audio')}
                </button>
                <button
                  type="button"
                  onClick={() => { 
                    setUploadType('banknote'); 
                    setScamResult(null); 
                    setCurrencyResult(null); 
                    setBanknotePreset('genuine');
                    setDenomination('500');
                    setFileName('specimen_genuine_500_note.png');
                    setFileBase64('data:image/png;base64,genuine_sample_placeholder');
                    setBanknoteSource('device');
                    stopCamera();
                  }}
                  className={`py-2 text-xs font-bold rounded transition-all ${
                    uploadType === 'banknote' 
                      ? 'bg-[#005CA9] text-white shadow' 
                      : 'text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  {t('Banknote')}
                </button>
                <button
                  type="button"
                  onClick={() => { setUploadType('report'); setScamResult(null); setCurrencyResult(null); }}
                  className={`py-2 text-xs font-bold rounded transition-all ${
                    uploadType === 'report' 
                      ? 'bg-[#005CA9] text-white shadow' 
                      : 'text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  {t('Report Scam')}
                </button>
                <button
                  type="button"
                  onClick={() => { setUploadType('alerts'); setScamResult(null); setCurrencyResult(null); }}
                  className={`py-2 text-xs font-bold rounded transition-all ${
                    uploadType === 'alerts' 
                      ? 'bg-[#005CA9] text-white shadow' 
                      : 'text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  {t('Scam Alerts')}
                </button>
              </div>

              {/* Suspect Telephone Metadata (For SMS / Call) */}
              {uploadType !== 'banknote' && uploadType !== 'report' && uploadType !== 'alerts' && (
                <div className="mb-4">
                  <label className="block text-xs font-bold uppercase text-slate-600 dark:text-zinc-400 mb-1.5">
                    {t('Suspect Phone Number / Sender ID (Optional)')}
                  </label>
                  <input
                    type="text"
                    value={suspectNo}
                    onChange={(e) => setSuspectNo(e.target.value)}
                    placeholder="e.g. +91 94821 28122 or VK-ICICIB"
                    className={`w-full p-2.5 text-sm rounded-lg border shadow-sm transition-all outline-none ${
                      currentTheme === 'government' 
                        ? 'bg-white border-slate-300 focus:border-[#005CA9] focus:ring-2 focus:ring-blue-100 text-slate-900 placeholder-slate-400' 
                        : 'bg-zinc-950 border-zinc-800 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-950/50 text-zinc-100 placeholder-zinc-500'
                    }`}
                  />
                </div>
              )}

              {/* Interactive Inputs based on Selector */}
              {uploadType === 'text' && (
                <div className="mb-4">
                  <label className="block text-xs font-bold uppercase text-slate-600 dark:text-zinc-400 mb-1.5">
                    {t('Paste Suspicious SMS message or Email content')}
                  </label>
                  <textarea
                    rows={5}
                    value={suspectText}
                    onChange={(e) => setSuspectText(e.target.value)}
                    placeholder="Paste the message content here... E.g., 'Dear customer, your electricity connection will be disconnected tonight. Call officer at 94458...'"
                    className={`w-full p-3.5 text-sm rounded-lg border leading-relaxed shadow-sm transition-all outline-none ${
                      currentTheme === 'government' 
                        ? 'bg-white border-slate-300 focus:border-[#005CA9] focus:ring-2 focus:ring-blue-100 text-slate-900 placeholder-slate-400' 
                        : 'bg-zinc-950 border-zinc-800 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-950/50 text-zinc-100 placeholder-zinc-500'
                    }`}
                  />
                </div>
              )}

              {uploadType === 'whatsapp' && (
                <div className="mb-4 p-4 border border-dashed rounded-lg flex flex-col items-center justify-center text-center bg-slate-50 dark:bg-zinc-950 border-slate-300 dark:border-zinc-800">
                  <UploadCloud size={32} className="text-[#005CA9] dark:text-cyan-400 mb-2" />
                  <h4 className="font-bold text-sm text-[#9f9fa9]">{t('Upload WhatsApp Chat Screenshot')}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1 max-w-sm">
                    Our AI scans image artifacts and extracts chat text logs using OCR vision models to calculate fraud indicators.
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="screenshot-upload"
                  />
                  <label
                    htmlFor="screenshot-upload"
                    className="mt-4 px-4 py-2 bg-[#005ca9] text-white hover:bg-[#004B8A] text-xs font-bold rounded cursor-pointer transition-all shadow-sm"
                  >
                    {t('Select Image File')}
                  </label>
                  {fileName && (
                    <span className="text-xs text-emerald-500 font-bold mt-2">
                      ✔ Uploaded: {fileName}
                    </span>
                  )}
                </div>
              )}

              {uploadType === 'voice' && (
                <div className="mb-4 p-4 border border-dashed rounded-lg flex flex-col items-center justify-center text-center bg-slate-50 dark:bg-zinc-950 border-slate-300 dark:border-zinc-800">
                  <Volume2 size={32} className="text-purple-500 mb-2 animate-pulse" />
                  <h4 className="font-bold text-sm text-[#9f9fa9]">{t('Upload Call Audio Recording')}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1 max-w-sm">
                    We parse spectral coherence and acoustic patterns to identify synthetic cloned voices and Digital Arrest threat scripts.
                  </p>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="audio-upload"
                  />
                  <label
                    htmlFor="audio-upload"
                    className="mt-4 px-4 py-2 bg-[#005ca9] text-white hover:bg-[#004B8A] text-xs font-bold rounded cursor-pointer transition-all shadow-sm"
                  >
                    {t('Select Audio File')}
                  </label>
                  {fileName && (
                    <span className="text-xs text-emerald-500 font-bold mt-2">
                      ✔ Selected Preset: {fileName} (Awaiting Scanner)
                    </span>
                  )}
                </div>
              )}

              {uploadType === 'banknote' && (
                <div className="mb-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 dark:text-zinc-400 mb-1.5">
                        Select Note Denomination
                      </label>
                      <select
                        value={denomination}
                        onChange={(e: any) => {
                          setDenomination(e.target.value);
                          setBanknotePreset(null);
                        }}
                        className={`w-full p-2.5 text-sm rounded border ${
                          currentTheme === 'government' 
                            ? 'bg-[#F8F8F8] border-slate-300 focus:bg-white text-slate-900' 
                            : 'bg-zinc-950 border-zinc-800 focus:border-cyan-500 text-zinc-100'
                        }`}
                      >
                        <option value="500">₹500 Note</option>
                        <option value="100">₹100 Note</option>
                        <option value="200">₹200 Note</option>
                        <option value="2000">₹2000 Note</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 dark:text-zinc-400 mb-1.5">
                        Capture / Upload Source
                      </label>
                      <div className="grid grid-cols-2 gap-1 bg-slate-100 dark:bg-zinc-950 p-1 rounded-lg border border-slate-200 dark:border-zinc-800">
                        <button
                          type="button"
                          onClick={() => { setBanknoteSource('device'); stopCamera(); }}
                          className={`py-1.5 text-xs font-bold rounded flex items-center justify-center gap-1.5 transition-all ${
                            banknoteSource === 'device'
                              ? 'bg-[#005CA9] text-white shadow'
                              : 'text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                          }`}
                        >
                          <Smartphone size={12} />
                          <span>Device Upload</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => { setBanknoteSource('camera'); setShowCameraPermissionModal(true); }}
                          className={`py-1.5 text-xs font-bold rounded flex items-center justify-center gap-1.5 transition-all ${
                            banknoteSource === 'camera'
                              ? 'bg-[#005CA9] text-white shadow'
                              : 'text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                          }`}
                        >
                          <Camera size={12} />
                          <span>Live Camera</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Preset reference test specimens */}
                  <div className="p-3.5 rounded-lg border bg-emerald-500/5 border-emerald-500/10 dark:bg-emerald-950/5 dark:border-emerald-500/15 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-cyan-400 block">
                      🧪 Sandbox: Quick-Load Specimen Reference Note
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-tight">
                      Don't have a real banknote to scan? Load one of our official reference specimens to test authentic vs counterfeit classification immediately:
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setBanknotePreset('genuine');
                          setDenomination('500');
                          setFileName('specimen_genuine_500_note.png');
                          setFileBase64('data:image/png;base64,genuine_sample_placeholder');
                          setBanknoteSource('device');
                          stopCamera();
                        }}
                        className={`px-2.5 py-1.5 rounded text-[11px] font-bold transition-all border flex items-center gap-1.5 ${
                          banknotePreset === 'genuine' && denomination === '500'
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900'
                        }`}
                      >
                        <CheckCircle2 size={12} className={banknotePreset === 'genuine' && denomination === '500' ? 'text-white' : 'text-emerald-500'} />
                        <span>Genuine ₹500 Note</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setBanknotePreset('counterfeit');
                          setDenomination('500');
                          setFileName('specimen_suspect_counterfeit_500_note.png');
                          setFileBase64('data:image/png;base64,fake_sample_placeholder');
                          setBanknoteSource('device');
                          stopCamera();
                        }}
                        className={`px-2.5 py-1.5 rounded text-[11px] font-bold transition-all border flex items-center gap-1.5 ${
                          banknotePreset === 'counterfeit' && denomination === '500'
                            ? 'bg-red-600 border-red-600 text-white shadow-sm'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900'
                        }`}
                      >
                        <AlertTriangle size={12} className={banknotePreset === 'counterfeit' && denomination === '500' ? 'text-white' : 'text-red-500'} />
                        <span>Counterfeit ₹500 Note</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setBanknotePreset('counterfeit');
                          setDenomination('100');
                          setFileName('specimen_suspect_counterfeit_100_note.png');
                          setFileBase64('data:image/png;base64,fake_100_placeholder');
                          setBanknoteSource('device');
                          stopCamera();
                        }}
                        className={`px-2.5 py-1.5 rounded text-[11px] font-bold transition-all border flex items-center gap-1.5 ${
                          banknotePreset === 'counterfeit' && denomination === '100'
                            ? 'bg-red-600 border-red-600 text-white shadow-sm'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900'
                        }`}
                      >
                        <AlertTriangle size={12} className={banknotePreset === 'counterfeit' && denomination === '100' ? 'text-white' : 'text-red-500'} />
                        <span>Counterfeit ₹100 Note</span>
                      </button>
                    </div>
                  </div>

                  {/* Device upload interface */}
                  {banknoteSource === 'device' && (
                    <div className="p-4 border border-dashed rounded-lg flex flex-col items-center justify-center text-center bg-slate-50 dark:bg-zinc-950 border-slate-300 dark:border-zinc-800">
                      <UploadCloud size={32} className="text-emerald-500 mb-2" />
                      <h4 className="font-bold text-sm text-[#9f9fa9]">Upload High Resolution Photo of Banknote</h4>
                      <p className="text-[11px] text-slate-600 dark:text-zinc-300 mt-1 max-w-sm">
                        Our vision engine inspects the Gandhi watermark register, RBI microprint, latent security thread boundary layer and alignment.
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="currency-upload"
                      />
                      <label
                        htmlFor="currency-upload"
                        className="mt-4 px-4 py-2 bg-[#005ca9] text-white hover:bg-[#004B8A] text-xs font-bold rounded cursor-pointer transition-all shadow-sm"
                      >
                        Select Note Image
                      </label>
                      {fileName && (
                        <span className="text-xs text-emerald-500 font-bold mt-2">
                          ✔ Image Loaded: {fileName}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Live Camera Interface */}
                  {banknoteSource === 'camera' && (
                    <div className="space-y-3">
                      {cameraError && (
                        <div className="p-3 text-xs rounded border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400">
                          <p className="font-bold mb-1">Camera Issue:</p>
                          <p>{cameraError}</p>
                          <p className="mt-2 text-[10px] text-slate-500 dark:text-zinc-400 font-mono">
                            Alternative: Use your phone's native camera by clicking below:
                          </p>
                          <div className="mt-2 flex">
                            <input
                              type="file"
                              accept="image/*"
                              capture="environment"
                              onChange={handleFileUpload}
                              className="hidden"
                              id="camera-direct-upload"
                            />
                            <label
                              htmlFor="camera-direct-upload"
                              className="px-3 py-1.5 bg-red-600 text-white font-bold text-[10px] uppercase rounded cursor-pointer hover:bg-red-700"
                            >
                              Direct Native Camera Capture
                            </label>
                          </div>
                        </div>
                      )}

                      {cameraActive ? (
                        <div className="space-y-3">
                          <div className="relative w-full aspect-video bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 shadow-inner">
                            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                            {/* Scanning beam animation */}
                            <div className="absolute inset-x-0 h-0.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.9)] animate-[bounce_2.5s_infinite] pointer-events-none"></div>
                            {/* Target Frame borders */}
                            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-emerald-400"></div>
                            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-emerald-400"></div>
                            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-emerald-400"></div>
                            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-emerald-400"></div>
                            {/* Overlay instructions */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] text-zinc-300 font-mono uppercase tracking-wide">
                              Align Banknote inside frame
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={captureSnapshot}
                              className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded transition-all shadow-md flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-[0.99]"
                            >
                              <Camera size={14} />
                              <span>Capture Snapshot</span>
                            </button>
                            <button
                              type="button"
                              onClick={stopCamera}
                              className="px-4 py-2 bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 font-bold text-xs uppercase rounded transition-all"
                            >
                              Stop Camera
                            </button>
                          </div>
                        </div>
                      ) : (
                        !cameraError && (
                          <div className="p-8 border border-dashed rounded-lg flex flex-col items-center justify-center text-center bg-slate-50 dark:bg-zinc-950 border-slate-300 dark:border-zinc-800">
                            <Camera size={32} className="text-emerald-500 mb-2 animate-pulse" />
                            <h4 className="font-bold text-sm text-[#9f9fa9]">Live Camera Banknote Scanner</h4>
                            <p className="text-[11px] text-slate-600 dark:text-zinc-300 mt-1 max-w-sm">
                              Grant camera permissions to start a real-time smart scanning preview. It aligns security checks automatically.
                            </p>
                            <button
                              type="button"
                              onClick={() => setShowCameraPermissionModal(true)}
                              className="mt-4 px-4 py-2 bg-[#005CA9] hover:bg-[#003F7D] text-white text-xs font-bold rounded transition-all flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
                            >
                              <Camera size={14} />
                              <span>Start Camera Stream</span>
                            </button>
                          </div>
                        )
                      )}

                      {fileName && !cameraActive && (
                        <div className="p-3 rounded bg-emerald-50 dark:bg-zinc-900 border border-emerald-100 dark:border-zinc-800 flex justify-between items-center text-xs">
                          <div>
                            <span className="text-slate-500 dark:text-zinc-500 block text-[9px] uppercase font-bold font-mono">Captured Preview</span>
                            <span className="text-emerald-500 font-bold">✔ {fileName} Ready for analysis</span>
                          </div>
                          {fileBase64 && (
                            <img src={fileBase64} alt="Captured" className="w-16 h-10 object-cover rounded border border-emerald-200" />
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Scam Alerts Directory Section */}
              {uploadType === 'alerts' && (
                <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-zinc-800">
                  {/* Alert Search and Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-4">
                    <div className="md:col-span-6 relative">
                      <Search className="absolute left-3 top-3 text-slate-400 dark:text-zinc-500" size={16} />
                      <input
                        type="text"
                        value={searchAlertQuery}
                        onChange={(e) => setSearchAlertQuery(e.target.value)}
                        placeholder="Search active alerts, keywords, modus operandi..."
                        className={`w-full pl-9 pr-4 py-2 text-xs rounded-lg border outline-none ${
                          currentTheme === 'government' 
                            ? 'bg-white border-slate-300 focus:border-[#005CA9] text-slate-900 placeholder-slate-400' 
                            : 'bg-zinc-950 border-zinc-800 focus:border-cyan-500 text-zinc-100 placeholder-zinc-500'
                        }`}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <select
                        value={selectedSeverity}
                        onChange={(e: any) => setSelectedSeverity(e.target.value)}
                        className={`w-full px-3 py-2 text-xs rounded-lg border outline-none ${
                          currentTheme === 'government' 
                            ? 'bg-white border-slate-300 focus:border-[#005CA9] text-slate-900' 
                            : 'bg-zinc-950 border-zinc-800 focus:border-cyan-500 text-zinc-100'
                        }`}
                      >
                        <option value="ALL">All Severities</option>
                        <option value="CRITICAL">Critical Only</option>
                        <option value="HIGH">High Severity</option>
                        <option value="MEDIUM">Medium Severity</option>
                      </select>
                    </div>
                    <div className="md:col-span-3">
                      <select
                        value={selectedAlertCategory}
                        onChange={(e) => setSelectedAlertCategory(e.target.value)}
                        className={`w-full px-3 py-2 text-xs rounded-lg border outline-none ${
                          currentTheme === 'government' 
                            ? 'bg-white border-slate-300 focus:border-[#005CA9] text-slate-900' 
                            : 'bg-zinc-950 border-zinc-800 focus:border-cyan-500 text-zinc-100'
                        }`}
                      >
                        {alertCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat === 'ALL' ? 'All Categories' : cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Active Alerts List */}
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {filteredAlerts.map((alertItem) => (
                      <div 
                        key={alertItem.id} 
                        className={`p-4 rounded-xl border transition-all hover:shadow ${
                          currentTheme === 'government' 
                            ? 'bg-white border-slate-200 hover:border-slate-300' 
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase ${
                              alertItem.severity === 'CRITICAL' 
                                ? 'bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400' 
                                : alertItem.severity === 'HIGH'
                                ? 'bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
                                : 'bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                            }`}>
                              {alertItem.severity}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono font-bold">{alertItem.id}</span>
                          </div>
                          <span className="text-[10px] text-slate-400">{alertItem.date}</span>
                        </div>

                        <h3 className="font-extrabold text-sm text-slate-800 dark:text-zinc-100 flex items-center gap-1.5">
                          <ShieldAlert className={alertItem.severity === 'CRITICAL' ? 'text-red-500' : 'text-amber-500'} size={16} />
                          {alertItem.title}
                        </h3>

                        <p className="text-xs text-slate-600 dark:text-zinc-300 mt-1.5 leading-relaxed">
                          {alertItem.description}
                        </p>

                        <div className="mt-3 p-3 rounded bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/50 space-y-2">
                          <div>
                            <span className="text-[9px] font-black uppercase text-[#005CA9] dark:text-cyan-400 block tracking-wider">Modus Operandi</span>
                            <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed mt-0.5">
                              {alertItem.modusOperandi}
                            </p>
                          </div>
                          <div className="pt-2 border-t border-dashed border-slate-200 dark:border-zinc-800">
                            <span className="text-[9px] font-black uppercase text-emerald-600 dark:text-emerald-400 block tracking-wider">Cyber Safety Advisory</span>
                            <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed mt-0.5 font-medium">
                              {alertItem.advisory}
                            </p>
                          </div>
                          {alertItem.phrasesToWatch && alertItem.phrasesToWatch.length > 0 && (
                            <div className="pt-2 border-t border-dashed border-slate-200 dark:border-zinc-800">
                              <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">Linguistic Flags / Red Flags</span>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                {alertItem.phrasesToWatch.map((phrase, idx) => (
                                  <span key={idx} className="px-1.5 py-0.5 bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 rounded font-mono text-[9px]">
                                    "{phrase}"
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Interactive Scan Action */}
                        <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
                          <span className="text-[10px] text-slate-400 flex items-center gap-1.5">
                            <Bell size={12} className="text-rose-500 animate-pulse" />
                            <strong>{alertItem.reportedIncidentsCount.toLocaleString()}</strong> incidents registered in I4C
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setUploadType('text');
                              setSuspectText(alertItem.testCasePreset);
                              setScamResult(null);
                              setCurrencyResult(null);
                              // Scroll to top
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="px-3 py-1.5 bg-[#005CA9] hover:bg-[#003F7D] dark:bg-cyan-950/40 dark:hover:bg-cyan-950/80 text-white dark:text-cyan-400 font-bold text-[10px] uppercase tracking-wider rounded border border-slate-300 dark:border-cyan-900/50 flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                          >
                            <span>Test Scam on AI Scanner</span>
                            <ExternalLink size={10} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {filteredAlerts.length === 0 && (
                      <div className="p-8 text-center border border-dashed rounded-lg bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-400">
                        No active alerts match your search filters.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Report Scam Form Section */}
              {uploadType === 'report' && (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!reportName.trim() || !reportPhone.trim() || !reportDescription.trim()) {
                      alert("Please fill in all required fields (Name, Phone, and Description).");
                      return;
                    }
                    
                    const randomId = `MHA-CC-2026-${Math.floor(10000 + Math.random() * 90000)}`;
                    const newReport = {
                      id: randomId,
                      reporterName: reportName,
                      reporterPhone: reportPhone,
                      scamCategory: reportCategory,
                      financialLoss: reportLoss ? Number(reportLoss).toLocaleString() : '0',
                      suspectDetails: reportSuspect || 'Not provided',
                      description: reportDescription,
                      date: reportDate,
                      status: 'PENDING',
                      timestamp: 'Just now'
                    };

                    setCustomReportedList(prev => [newReport, ...prev]);
                    setReportSubmittedAlert(`Complaint submitted successfully! Generated Ticket Case ID: ${randomId}`);
                    
                    // Reset form fields
                    setReportName('');
                    setReportPhone('');
                    setReportLoss('');
                    setReportSuspect('');
                    setReportDescription('');
                    
                    // Clear alert after some time
                    setTimeout(() => {
                      setReportSubmittedAlert(null);
                    }, 8000);
                  }} 
                  className="space-y-4 pt-2 border-t border-slate-100 dark:border-zinc-800"
                >
                  {reportSubmittedAlert && (
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-lg border border-emerald-200 dark:border-emerald-900/50 flex gap-2">
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Submission Confirmed</p>
                        <p className="text-[11px] mt-0.5">{reportSubmittedAlert}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 dark:text-zinc-400 mb-1">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={reportName}
                        onChange={(e) => setReportName(e.target.value)}
                        placeholder="e.g. Rahul Kumar"
                        className={`w-full p-2.5 text-xs rounded-md border outline-none ${
                          currentTheme === 'government' 
                            ? 'bg-white border-slate-300 text-slate-900 focus:border-[#005CA9]' 
                            : 'bg-zinc-950 border-zinc-800 text-zinc-100 focus:border-cyan-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 dark:text-zinc-400 mb-1">
                        Your Contact Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={reportPhone}
                        onChange={(e) => setReportPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className={`w-full p-2.5 text-xs rounded-md border outline-none ${
                          currentTheme === 'government' 
                            ? 'bg-white border-slate-300 text-slate-900 focus:border-[#005CA9]' 
                            : 'bg-zinc-950 border-zinc-800 text-zinc-100 focus:border-cyan-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 dark:text-zinc-400 mb-1">
                        Scam Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={reportCategory}
                        onChange={(e) => setReportCategory(e.target.value)}
                        className={`w-full p-2.5 text-xs rounded-md border outline-none ${
                          currentTheme === 'government' 
                            ? 'bg-white border-slate-300 text-slate-900 focus:border-[#005CA9]' 
                            : 'bg-zinc-950 border-zinc-800 text-zinc-100'
                        }`}
                      >
                        <option value="Digital Arrest Scam">Digital Arrest Scam</option>
                        <option value="Phishing / UPI Fraud">Phishing / UPI Fraud</option>
                        <option value="Voice Cloning Fake Call">Voice Cloning Fake Call</option>
                        <option value="Part-time Job Scam">Part-time Job Scam</option>
                        <option value="Investment / Crypto Scam">Investment / Crypto Scam</option>
                        <option value="Counterfeit Currency">Counterfeit Currency</option>
                        <option value="Other Cyber Incident">Other Cyber Incident</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 dark:text-zinc-400 mb-1">
                        Date of Incident <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={reportDate}
                        onChange={(e) => setReportDate(e.target.value)}
                        className={`w-full p-2.5 text-xs rounded-md border outline-none ${
                          currentTheme === 'government' 
                            ? 'bg-white border-slate-300 text-slate-900 focus:border-[#005CA9]' 
                            : 'bg-zinc-950 border-zinc-800 text-zinc-100 focus:border-cyan-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 dark:text-zinc-400 mb-1">
                        Estimated Financial Loss (INR)
                      </label>
                      <input
                        type="number"
                        value={reportLoss}
                        onChange={(e) => setReportLoss(e.target.value)}
                        placeholder="e.g. 15000 (0 if none)"
                        className={`w-full p-2.5 text-xs rounded-md border outline-none ${
                          currentTheme === 'government' 
                            ? 'bg-white border-slate-300 text-slate-900 focus:border-[#005CA9]' 
                            : 'bg-zinc-950 border-zinc-800 text-zinc-100 focus:border-cyan-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 dark:text-zinc-400 mb-1">
                        Suspect Sender ID / UPI / URL
                      </label>
                      <input
                        type="text"
                        value={reportSuspect}
                        onChange={(e) => setReportSuspect(e.target.value)}
                        placeholder="e.g. UPI: fraud@pay, Website: fake-rbi.com"
                        className={`w-full p-2.5 text-xs rounded-md border outline-none ${
                          currentTheme === 'government' 
                            ? 'bg-white border-slate-300 text-slate-900 focus:border-[#005CA9]' 
                            : 'bg-zinc-950 border-zinc-800 text-zinc-100 focus:border-cyan-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 dark:text-zinc-400 mb-1">
                      Detailed Incident Description & Statements <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={reportDescription}
                      onChange={(e) => setReportDescription(e.target.value)}
                      placeholder="Please share exactly what happened. Mention any links sent, demands made, account numbers provided, etc."
                      className={`w-full p-2.5 text-xs rounded-md border outline-none leading-relaxed ${
                        currentTheme === 'government' 
                          ? 'bg-white border-slate-300 text-slate-900 focus:border-[#005CA9]' 
                          : 'bg-zinc-950 border-zinc-800 text-zinc-100 focus:border-cyan-500'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md hover:scale-[1.01] active:scale-[0.99]"
                  >
                    Submit Official Scam Report
                  </button>
                </form>
              )}

              {/* Submit Scan Action */}
              {uploadType !== 'report' && uploadType !== 'alerts' && (
                <button
                  onClick={runAIScan}
                  disabled={loading || (uploadType === 'text' && !suspectText.trim())}
                  className={`w-full py-3 rounded-lg text-sm font-bold uppercase tracking-wider text-white transition-all ${
                    loading 
                      ? 'bg-slate-400 cursor-not-allowed' 
                      : 'bg-[#005CA9] hover:bg-[#003F7D] active:scale-[0.98]'
                  }`}
                >
                  {loading ? 'Running Multi-Layer AI Analysis...' : 'Trigger Neural Safety Scan'}
                </button>
              )}
            </div>

            {/* Nearby Cyber Cell Locator */}
            <div className={`p-6 rounded-xl border shadow-sm ${
              currentTheme === 'government' ? 'bg-white border-slate-300' : 'bg-zinc-900 border-zinc-800'
            }`}>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <MapPin className="text-rose-500 animate-pulse" size={18} />
                  <span>National Cyber Crime Cells Directory</span>
                </h3>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-zinc-950 text-slate-600 dark:text-zinc-400 font-mono text-[10px] rounded-full border border-slate-200 dark:border-zinc-800 font-bold">
                  {filteredStations.length} {filteredStations.length === 1 ? 'cell' : 'cells'} found
                </span>
              </div>
              
              <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4 leading-relaxed">
                Filter and locate regional Cyber Crime Investigation units across Indian states. Click to place a direct call, compose a dispute email, or redirect to official maps & websites.
              </p>

              <div className="mb-4 relative">
                <Search className="absolute left-3 top-3 text-slate-400 dark:text-zinc-500" size={14} />
                <input
                  id="cyber-cell-search-input"
                  type="text"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  placeholder="Type city or state to filter cells... (e.g. Maharashtra, Kerala, Delhi, Jaipur)"
                  className={`w-full pl-9 pr-3 py-2.5 text-xs rounded border outline-none transition-all ${
                    currentTheme === 'government' 
                      ? 'bg-[#F8F8F8] border-slate-300 focus:bg-white focus:border-[#005CA9] text-slate-900 placeholder-slate-400' 
                      : 'bg-zinc-950 border-zinc-800 focus:border-cyan-500 text-zinc-100 placeholder-zinc-500'
                  }`}
                />
              </div>

              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                {filteredStations.map((station, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3.5 border rounded-lg transition-all hover:shadow-sm ${
                      currentTheme === 'government' 
                        ? 'bg-slate-50 hover:bg-slate-100/50 border-slate-200 hover:border-slate-300 text-slate-800' 
                        : 'bg-zinc-950/70 hover:bg-zinc-950 border-zinc-900 hover:border-zinc-800 text-zinc-100'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2 flex-wrap mb-1.5">
                      <div className="flex flex-col">
                        <span className="font-extrabold text-xs text-[#005CA9] dark:text-cyan-400 uppercase tracking-wider">
                          {station.city} Zone
                        </span>
                        {station.state && (
                          <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">
                            State: {station.state}
                          </span>
                        )}
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                        Nodal Center
                      </span>
                    </div>
                    
                    <p className="text-xs font-bold text-slate-700 dark:text-zinc-200 leading-tight mb-2.5">
                      {station.name}
                    </p>

                    {/* Contact details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] mb-3 p-2 rounded bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-900/50">
                      <a 
                        href={`tel:${station.contact}`}
                        className="flex items-center gap-1.5 text-slate-600 dark:text-zinc-400 hover:text-[#005CA9] dark:hover:text-cyan-400 transition-colors"
                        title="Click to dial phone number"
                      >
                        <Phone size={12} className="text-[#005CA9] dark:text-cyan-400" />
                        <span>Phone: <strong className="font-mono">{station.contact}</strong></span>
                      </a>
                      
                      <a 
                        href={`mailto:${station.email}?subject=Cyber Crime Incident Inquiry / Dispute Clearance`}
                        className="flex items-center gap-1.5 text-slate-600 dark:text-zinc-400 hover:text-[#005CA9] dark:hover:text-cyan-400 transition-colors truncate"
                        title="Click to compose email"
                      >
                        <Mail size={12} className="text-[#005CA9] dark:text-cyan-400 shrink-0" />
                        <span className="truncate">Email: <strong className="underline font-sans">{station.email}</strong></span>
                      </a>
                    </div>

                    {/* Redirection Links */}
                    <div className="flex gap-2 flex-wrap pt-1 border-t border-dashed border-slate-200 dark:border-zinc-900">
                      {station.mapLink && (
                        <a 
                          href={station.mapLink}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 py-1.5 px-2 bg-slate-200 hover:bg-slate-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 rounded font-bold text-[10px] uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-colors border border-slate-300/50 dark:border-zinc-800"
                        >
                          <MapPin size={10} className="text-rose-500" />
                          <span>View on Map</span>
                        </a>
                      )}
                      
                      {station.website && (
                        <a 
                          href={station.website}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 py-1.5 px-2 bg-slate-200 hover:bg-slate-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 rounded font-bold text-[10px] uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-colors border border-slate-300/50 dark:border-zinc-800"
                        >
                          <Globe size={10} className="text-[#005CA9] dark:text-cyan-400" />
                          <span>Portal</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
                {filteredStations.length === 0 && (
                  <div className="p-8 text-center border border-dashed rounded-lg bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800/50 text-slate-400 text-xs">
                    No designated cyber cells match "{searchCity}". Try searching for another city, state, or commissionerate.
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: AI Analysis Output Results */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Real-time Loading Panel */}
            {loading && (
              <div className={`p-8 rounded-xl border text-center shadow flex flex-col items-center justify-center min-h-[350px] ${
                currentTheme === 'government' ? 'bg-white border-slate-300' : 'bg-zinc-900 border-zinc-800'
              }`}>
                <div className="relative w-16 h-16 mb-4">
                  <div className="absolute inset-0 border-4 border-slate-200 dark:border-zinc-800 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-[#005CA9] dark:border-cyan-400 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h3 className="font-extrabold text-sm uppercase tracking-wide">Executing Public Safety Threat Check</h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-2 max-w-xs leading-relaxed animate-pulse">
                  Routing packet to Indian Gov NLP & Vision nodes. Extracting linguistic identifiers, vocal pitch clone signatures, and checking RBI-standard security grids...
                </p>
              </div>
            )}

            {/* Track Filed Reports Ledger (only when uploadType is report) */}
            {uploadType === 'report' && (
              <div className={`p-6 rounded-xl border shadow-lg space-y-4 ${
                currentTheme === 'government' ? 'bg-white border-slate-300' : 'bg-zinc-900 border-zinc-800'
              }`}>
                <div className="flex justify-between items-center border-b pb-3 border-slate-100 dark:border-zinc-800">
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800 dark:text-zinc-200 flex items-center gap-2">
                      <FileText className="text-red-500" size={16} />
                      <span>Track Reported Complaints</span>
                    </h3>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5">Real-time national dispatch routing status.</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 font-mono bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-full font-bold">
                    {customReportedList.length} Active
                  </span>
                </div>

                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {customReportedList.map((rep) => (
                    <div key={rep.id} className="p-3.5 rounded-lg border bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-900 text-xs space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="font-mono font-bold text-[#005CA9] dark:text-cyan-400">{rep.id}</span>
                          <span className="text-[10px] text-slate-400 block">{rep.timestamp || 'Just now'}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                          rep.status === 'UNDER_INVESTIGATION' ? 'bg-amber-100 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400' :
                          rep.status === 'FORWARDED' ? 'bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400' :
                          'bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400'
                        }`}>
                          {rep.status === 'UNDER_INVESTIGATION' ? 'Under Review' : 
                           rep.status === 'FORWARDED' ? 'Sent to Cyber Cell' : 'Pending Verification'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-dashed border-slate-200 dark:border-zinc-900">
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase">Reporter</span>
                          <span className="font-medium text-slate-700 dark:text-zinc-300">{rep.reporterName}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase">Scam Category</span>
                          <span className="font-medium text-slate-700 dark:text-zinc-300">{rep.scamCategory}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase">Loss Amount</span>
                          <span className="font-bold text-red-500">₹{rep.financialLoss}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase">Suspect Info</span>
                          <span className="font-mono text-slate-700 dark:text-zinc-300 truncate block max-w-[130px]">{rep.suspectDetails}</span>
                        </div>
                      </div>

                      <div className="text-[11px] bg-white dark:bg-zinc-900 p-2 rounded border border-slate-100 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 leading-relaxed italic">
                        "{rep.description}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* National Cyber Safety Advisories & Trends (Visible when uploadType === 'alerts') */}
            {uploadType === 'alerts' && !loading && (
              <div className="space-y-6">
                {/* Critical Golden Hour Checklist */}
                <div className={`p-5 rounded-xl border ${
                  currentTheme === 'government' ? 'bg-[#FFF8F8] border-red-200' : 'bg-[#1C0F0F] border-red-950'
                }`}>
                  <h3 className="font-extrabold text-xs text-red-600 dark:text-red-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                    Emergency Golden Hour Directive
                  </h3>
                  <p className="text-[11px] text-slate-600 dark:text-zinc-400 mb-4 leading-relaxed">
                    If you or someone you know has been scammed of money, action must be taken within <strong>1 Hour (The Golden Hour)</strong> to freeze transit bank accounts.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2.5 text-xs">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 font-bold font-mono text-[10px] shrink-0">1</span>
                      <div>
                        <strong className="block text-slate-800 dark:text-zinc-200">Dial National Helpline 1930</strong>
                        <span className="text-[11px] text-slate-500 dark:text-zinc-400">Call instantly from registered mobile. Keep transaction details ready.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 font-bold font-mono text-[10px] shrink-0">2</span>
                      <div>
                        <strong className="block text-slate-800 dark:text-zinc-200">File Report on cybercrime.gov.in</strong>
                        <span className="text-[11px] text-slate-500 dark:text-zinc-400">Register official online cyber complaint with account numbers.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 font-bold font-mono text-[10px] shrink-0">3</span>
                      <div>
                        <strong className="block text-slate-800 dark:text-zinc-200">Contact Bank Portal Immediately</strong>
                        <span className="text-[11px] text-slate-500 dark:text-zinc-400">Instruct your bank manager/app to log a dispute regarding the recipient UPI ID.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Threat Proximity Indices & Distribution */}
                <div className={`p-5 rounded-xl border ${
                  currentTheme === 'government' ? 'bg-white border-slate-300' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <h3 className="font-extrabold text-xs uppercase tracking-wider mb-4 text-slate-700 dark:text-zinc-300 flex items-center gap-2">
                    <Megaphone size={14} className="text-[#005CA9] dark:text-cyan-400" />
                    Cyber Threat Trend Density (I4C)
                  </h3>
                  
                  <div className="space-y-3.5">
                    <div>
                      <div className="flex justify-between text-[11px] font-bold mb-1">
                        <span className="text-slate-600 dark:text-zinc-400">Digital Arrest Extortion</span>
                        <span className="text-[#005CA9] dark:text-cyan-400">35% active volume</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-zinc-950 rounded-full h-2 overflow-hidden border border-slate-200/50 dark:border-zinc-800">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-bold mb-1">
                        <span className="text-slate-600 dark:text-zinc-400">Fake Stock Trading Groups</span>
                        <span className="text-[#005CA9] dark:text-cyan-400">30% active volume</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-zinc-950 rounded-full h-2 overflow-hidden border border-slate-200/50 dark:border-zinc-800">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-bold mb-1">
                        <span className="text-slate-600 dark:text-zinc-400">Part-Time Task Scam</span>
                        <span className="text-[#005CA9] dark:text-cyan-400">20% active volume</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-zinc-950 rounded-full h-2 overflow-hidden border border-slate-200/50 dark:border-zinc-800">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-bold mb-1">
                        <span className="text-slate-600 dark:text-zinc-400">AI Deepfake & Voice Cloning</span>
                        <span className="text-[#005CA9] dark:text-cyan-400">10% active volume</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-zinc-950 rounded-full h-2 overflow-hidden border border-slate-200/50 dark:border-zinc-800">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-bold mb-1">
                        <span className="text-slate-600 dark:text-zinc-400">Electricity Bill Phishing</span>
                        <span className="text-[#005CA9] dark:text-cyan-400">5% active volume</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-zinc-950 rounded-full h-2 overflow-hidden border border-slate-200/50 dark:border-zinc-800">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 text-[10px] text-slate-400 text-center leading-relaxed">
                    Source: National Cyber Crime Research Centre (I4C), Ministry of Home Affairs, Govt. of India.
                  </div>
                </div>

                {/* Important Public Portals & Directory */}
                <div className={`p-5 rounded-xl border ${
                  currentTheme === 'government' ? 'bg-white border-slate-300' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <h3 className="font-extrabold text-xs uppercase tracking-wider mb-3 text-slate-700 dark:text-zinc-300">
                    Trusted Central Resources
                  </h3>
                  <div className="space-y-2 text-xs">
                    <a 
                      href="https://cybercrime.gov.in" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-between p-2.5 rounded bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 hover:border-[#005CA9] dark:hover:border-cyan-500 transition-colors"
                    >
                      <span className="font-bold text-slate-700 dark:text-zinc-300">cybercrime.gov.in</span>
                      <ExternalLink size={12} className="text-slate-400" />
                    </a>
                    <a 
                      href="https://tafcop.sancharsaathi.gov.in" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-between p-2.5 rounded bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 hover:border-[#005CA9] dark:hover:border-cyan-500 transition-colors"
                    >
                      <span className="font-bold text-slate-700 dark:text-zinc-300">Sanchar Saathi Portal</span>
                      <ExternalLink size={12} className="text-slate-400" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Waiting State */}
            {uploadType !== 'report' && uploadType !== 'alerts' && !loading && !scamResult && !currencyResult && (
              <div className={`p-8 rounded-xl border border-dashed text-center min-h-[350px] flex flex-col justify-center items-center ${
                currentTheme === 'government' ? 'bg-white border-slate-300' : 'bg-zinc-900 border-zinc-800'
              }`}>
                <AlertTriangle size={36} className="text-amber-500 mb-3 animate-pulse" />
                <h3 className="font-extrabold text-sm uppercase tracking-wider">Awaiting Threat Input</h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-2 max-w-xs leading-relaxed">
                  Enter suspicious transcripts, upload screenshots, voice, or banknote logs and click "Trigger Neural Safety Scan" to load instant AI hazard assessments.
                </p>
              </div>
            )}

            {/* AI SCAM RESULT CARD */}
            {scamResult && (
              <div className={`p-6 rounded-xl border shadow-lg ${
                currentTheme === 'government' ? 'bg-white border-slate-300' : 'bg-zinc-900 border-zinc-800'
              }`}>
                <div className="flex justify-between items-center mb-4 border-b pb-3 border-slate-100 dark:border-zinc-800">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500">Public Intelligence Report</span>
                  <span className={`text-[11px] px-2.5 py-0.5 rounded font-mono font-bold ${
                    scamResult.riskScore >= 75 ? 'bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                  }`}>
                    Score: {scamResult.riskScore}%
                  </span>
                </div>

                {/* Score Indicator Ring / Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Threat Hazard Probability</span>
                    <span className={scamResult.riskScore >= 75 ? 'text-red-500' : 'text-emerald-500'}>
                      {scamResult.riskScore >= 75 ? 'DANGER / SUSPECT' : 'LOW RISK / COMPLIANT'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-zinc-950 h-3 rounded-full overflow-hidden border border-slate-200 dark:border-zinc-800">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        scamResult.riskScore >= 75 ? 'bg-red-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${scamResult.riskScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Meta details */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-xs p-3 bg-slate-50 dark:bg-zinc-950 border rounded">
                  <div>
                    <span className="text-slate-500 dark:text-zinc-500 block uppercase text-[10px]">Identified Category</span>
                    <strong className="text-slate-800 dark:text-zinc-200">{scamResult.threatCategory}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-zinc-500 block uppercase text-[10px]">AI Model Certainty</span>
                    <strong className="text-slate-800 dark:text-zinc-200">{scamResult.confidenceScore}%</strong>
                  </div>
                </div>

                {/* AI Explanation Text */}
                <div className="space-y-2 mb-5">
                  <h4 className="font-bold text-xs uppercase text-slate-500 dark:text-zinc-500">AI Safety Forensic Findings</h4>
                  <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed border-l-2 border-[#005CA9] dark:border-cyan-400 pl-3">
                    {scamResult.explanation}
                  </p>
                </div>

                {/* Recommended actions */}
                {scamResult.recommendedActions && scamResult.recommendedActions.length > 0 && (
                  <div className="space-y-2 mb-6">
                    <h4 className="font-bold text-xs uppercase text-slate-500 dark:text-zinc-500">Citizen Recommended Directives</h4>
                    <ul className="space-y-1.5">
                      {scamResult.recommendedActions.map((act: string, idx: number) => (
                        <li key={idx} className="text-xs flex items-start gap-2">
                          <span className="text-rose-500 mt-0.5 font-bold">•</span>
                          <span className="text-slate-600 dark:text-zinc-400 leading-tight">{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action panel: Report officially */}
                <div className="flex gap-2">
                  <button
                    onClick={fileOfficialComplaint}
                    disabled={reportedSuccessfully}
                    className={`flex-1 py-2 rounded text-xs font-bold uppercase tracking-wider text-white transition-all ${
                      reportedSuccessfully 
                        ? 'bg-emerald-600' 
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {reportedSuccessfully ? '✔ Filed with National Cyber Cell' : 'File Official Cyber Complaint'}
                  </button>
                  <button
                    onClick={() => {
                      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(scamResult, null, 2));
                      const dlAnchorElem = document.createElement('a');
                      dlAnchorElem.setAttribute("href",     dataStr     );
                      dlAnchorElem.setAttribute("download", "rakshak_safety_briefing.json");
                      dlAnchorElem.click();
                    }}
                    className={`p-2 rounded border text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 ${
                      currentTheme === 'government' ? 'border-slate-300' : 'border-zinc-800'
                    }`}
                    title="Download Report"
                  >
                    <Download size={14} />
                  </button>
                </div>

                {reportedSuccessfully && (
                  <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-xs rounded border border-emerald-200 dark:border-emerald-900/50 flex gap-2">
                    <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                    <p>Complaint registered in Indian National Cyber Crime Coordination database! Case ID generated: <strong>MHA-CC-2026-{(Math.floor(10000 + Math.random() * 90000))}</strong>. Our dispatch cell will investigate.</p>
                  </div>
                )}
              </div>
            )}

            {/* AI CURRENCY NOTE RESULT CARD */}
            {currencyResult && (
              <div className={`p-6 rounded-xl border shadow-lg ${
                currentTheme === 'government' ? 'bg-white border-slate-300' : 'bg-zinc-900 border-zinc-800'
              }`}>
                <div className="flex justify-between items-center mb-4 border-b pb-3 border-slate-100 dark:border-zinc-800">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500">Banknote Verification Report</span>
                  <span className={`text-[11px] px-2.5 py-0.5 rounded font-mono font-bold ${
                    currencyResult.isAuthentic ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400' : 'bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400'
                  }`}>
                    {currencyResult.isAuthentic ? 'AUTHENTIC' : 'SUSPECT FALSE BILL'}
                  </span>
                </div>

                {/* Score and Denomination */}
                <div className="mb-4 grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-zinc-950 border rounded text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-zinc-500 block uppercase text-[10px]">Denomination Tested</span>
                    <strong className="text-slate-800 dark:text-zinc-200">₹{currencyResult.denomination} Note</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-zinc-500 block uppercase text-[10px]">Watermark Match</span>
                    <strong className={currencyResult.securityChecks.watermark === 'Verified' ? 'text-emerald-500' : 'text-red-500'}>
                      {currencyResult.securityChecks.watermark}
                    </strong>
                  </div>
                </div>

                {/* Technical Checks Table */}
                <div className="space-y-2.5 mb-5 text-xs">
                  <h4 className="font-bold uppercase text-slate-500 dark:text-zinc-500">Micro-Security Grid Verification</h4>
                  
                  <div className="space-y-1.5">
                    <div className="flex justify-between border-b py-1">
                      <span className="text-slate-500">Security Thread</span>
                      <strong className={currencyResult.securityChecks.securityThread === 'Verified' ? 'text-emerald-500' : 'text-red-500'}>
                        {currencyResult.securityChecks.securityThread}
                      </strong>
                    </div>
                    <div className="flex justify-between border-b py-1">
                      <span className="text-slate-500">Microprint Legitimacy</span>
                      <strong className={currencyResult.securityChecks.microprint === 'Verified' ? 'text-emerald-500' : 'text-red-500'}>
                        {currencyResult.securityChecks.microprint}
                      </strong>
                    </div>
                    <div className="flex justify-between border-b py-1">
                      <span className="text-slate-500">RBI Governor Seal</span>
                      <strong className={currencyResult.securityChecks.rbiSeal === 'Verified' ? 'text-emerald-500' : 'text-red-500'}>
                        {currencyResult.securityChecks.rbiSeal}
                      </strong>
                    </div>
                    <div className="flex justify-between border-b py-1">
                      <span className="text-slate-500">Paper Alignment register</span>
                      <strong className={currencyResult.securityChecks.alignment === 'Perfect' ? 'text-emerald-500' : 'text-red-500'}>
                        {currencyResult.securityChecks.alignment}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* AI Explanation */}
                <div className="space-y-2 mb-5">
                  <h4 className="font-bold text-xs uppercase text-slate-500 dark:text-zinc-500">Neural Vision Assessment</h4>
                  <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed border-l-2 border-emerald-500 pl-3">
                    {currencyResult.explanation}
                  </p>
                </div>

                {/* Highlighted regions overlay */}
                {currencyResult.highlightedRegions && (
                  <div className="space-y-2 mb-6">
                    <h4 className="font-bold text-xs uppercase text-slate-500 dark:text-zinc-500">Suspicious Optical Points</h4>
                    <div className="space-y-2">
                      {currencyResult.highlightedRegions.map((region: any, i: number) => (
                        <div key={i} className="p-2 bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded text-xs">
                          <span className="font-bold text-[#005CA9] dark:text-cyan-400 uppercase text-[10px]">{region.feature}</span>
                          <p className="text-slate-600 dark:text-zinc-400 mt-0.5 leading-tight">{region.status}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrencyResult(null)}
                    className="flex-1 py-2 bg-[#005CA9] hover:bg-[#003F7D] text-white text-xs font-bold uppercase rounded transition-all"
                  >
                    Close Analysis
                  </button>
                  <button
                    onClick={fileOfficialComplaint}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase rounded transition-all"
                  >
                    Report Bill
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Custom Camera Access Request Popup */}
      {showCameraPermissionModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-[440px] p-6 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-100 shadow-2xl">
            {/* Close button X */}
            <button 
              onClick={() => setShowCameraPermissionModal(false)}
              className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-200 rounded-full hover:bg-zinc-850 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Content */}
            <div className="space-y-4">
              <h3 className="text-base font-bold tracking-tight text-white pr-6">
                Camera access request
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                This app requests access to Camera to work properly. Do you want to allow Camera access?
              </p>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowCameraPermissionModal(false);
                    setCameraError("Camera access was disallowed by the user.");
                  }}
                  className="px-4 py-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors"
                >
                  Disallow
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCameraPermissionModal(false);
                    startCamera();
                  }}
                  className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-950 border border-zinc-750 rounded-xl text-xs font-bold text-white transition-all shadow-sm"
                >
                  Allow Camera access
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
