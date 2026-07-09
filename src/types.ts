export interface CitizenReport {
  id: string;
  timestamp: string;
  title: string;
  category: 'Digital Arrest' | 'Counterfeit Currency' | 'Voice Deepfake' | 'Sms Phishing' | 'WhatsApp Fraud' | 'UPI/Financial Scam';
  mediaType: 'audio' | 'image' | 'text' | 'document';
  status: 'Pending' | 'Under Investigation' | 'Resolved' | 'Action Required';
  riskScore: number;
  reporterName: string;
  phoneNumber: string;
  details: string;
  evidenceName?: string;
  recommendedActions: string[];
  findings?: string;
}

export interface LiveThreatAlert {
  id: string;
  timestamp: string;
  type: string;
  district: string;
  severity: 'High' | 'Medium' | 'Low' | 'Critical';
  description: string;
  source: 'Citizen Portal' | 'Bank Alert' | 'Telecom Feed' | 'Dark Web Monitor';
  status: 'active' | 'assigned' | 'mitigated';
}

export interface BankAnomaly {
  id: string;
  timestamp: string;
  accountNo: string;
  holderName: string;
  upiId?: string;
  amount: number;
  type: 'Velocity Spike' | 'Multiple Mule Links' | 'Suspicious Offshore Transfer' | 'High-Risk UPI Chain';
  riskScore: number;
  status: 'Flagged' | 'Frozen' | 'Cleared' | 'Under Audit';
}

export interface CounterfeitCheckResult {
  isAuthentic: boolean;
  confidenceScore: number;
  denomination: '100' | '200' | '500' | '2000';
  serialNumber: string;
  securityChecks: {
    watermark: 'Verified' | 'Suspicious' | 'Missing';
    securityThread: 'Verified' | 'Suspicious' | 'Imitation';
    microprint: 'Verified' | 'Suspicious' | 'Unreadable';
    rbiSeal: 'Verified' | 'Suspicious' | 'Missing';
    alignment: 'Perfect' | 'Misaligned';
  };
  highlightedRegions: { x: number; y: number; w: number; h: number; feature: string; status: string }[];
  explanation: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'phone' | 'bank_account' | 'upi' | 'victim' | 'mule' | 'scammer' | 'location';
}

export interface GraphLink {
  source: string;
  target: string;
  type: 'transacted' | 'called' | 'registered' | 'associated';
}
