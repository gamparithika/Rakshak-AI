import React, { createContext, useContext, useState, useEffect } from 'react';

// Define Supported Languages Interface
export interface Language {
  code: string;
  name: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'mr', name: 'मराठी' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'or', name: 'ଓଡ଼ିଆ' },
  { code: 'ur', name: 'اردو' }
];

// Context Type definition
interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Core translation dictionary covering all key navigation text, main titles, buttons, and section headers
const DICTIONARY: Record<string, Record<string, string>> = {
  en: {
    // Header Navigation
    'Overview': 'Overview',
    'Citizen Portal': 'Citizen Portal',
    'Cyber Police Cell': 'Cyber Police Cell',
    'Banking Anomaly Hub': 'Banking Anomaly Hub',
    'Admin Central': 'Admin Central',
    'SOS Emergency': 'SOS Emergency',
    'Ministry of Electronics & IT / Cyber Coordination Centre (I4C)': 'Ministry of Electronics & IT / Cyber Coordination Centre (I4C)',
    'CRITICAL HELPLINE: 1930': 'CRITICAL HELPLINE: 1930',
    'Satyameva Jayate': 'Satyameva Jayate',
    'Digital Public Safety Intelligence Platform': 'Digital Public Safety Intelligence Platform',
    'Intel View': 'Intel View',
    'Govt View': 'Govt View',

    // Landing Page
    'AI-First National Cybersecurity Initiative': 'AI-First National Cybersecurity Initiative',
    'Proactive Public Safety': 'Proactive Public Safety',
    'Intelligence System': 'Intelligence System',
    'LandingDescription': 'RakshakAI protects Indian citizens, law enforcement cells, and banks from highly coordinated modern digital scams. Our platform utilizes advanced multimodal neural models to detect and prevent digital arrest intimidation, counterfeit banknotes, money-mule structures, and cloned deepfake audio in real-time.',
    'Scan Suspicious Files / SMS': 'Scan Suspicious Files / SMS',
    'Explore Fraud Network AI': 'Explore Fraud Network AI',
    'National Operations Dashboard': 'National Operations Dashboard',
    'Scams Intercepted': 'Scams Intercepted',
    'Mule Accounts Flagged': 'Mule Accounts Flagged',
    'Active Investigations': 'Active Investigations',
    'Public Safe-Guard Ledger': 'Public Safe-Guard Ledger',
    'Emergency Live Ticker Feed': 'Emergency Live Ticker Feed',
    'Cyber Crime Incidents (India Map Visualizer)': 'Cyber Crime Incidents (India Map Visualizer)',
    'Real-time state and regional visual risk mapping.': 'Real-time state and regional visual risk mapping.',
    'Select City': 'Select City',
    'Total Savings & Recoveries Tracked': 'Total Savings & Recoveries Tracked',
    'Historical Recovery Growth (₹ in Crores)': 'Historical Recovery Growth (₹ in Crores)',

    // Citizen Portal
    'Citizen Portals': 'Citizen Portals',
    'Public Cyber Safety Analyzer': 'Public Cyber Safety Analyzer',
    'PortalDescription': 'Upload call transcripts, WhatsApp message snapshots, or currency notes to test for fraud signature markers.',
    'Generate Immediate SOS': 'Generate Immediate SOS',
    'Threat Verification Console': 'Threat Verification Console',
    'SMS / Text': 'SMS / Text',
    'WhatsApp Chat': 'WhatsApp Chat',
    'Call Audio': 'Call Audio',
    'Banknote Verify': 'Banknote Verify',
    'Suspect Telephone Number / UPI ID': 'Suspect Telephone Number / UPI ID',
    'Enter phone number or UPI handle involved in the threat (Optional)': 'Enter phone number or UPI handle involved in the threat (Optional)',
    'Suspicious Conversation text / Call Transcript': 'Suspicious Conversation text / Call Transcript',
    'Paste text message or transcript details here...': 'Paste text message or transcript details here...',
    'Select Image File': 'Select Image File',
    'Select Audio File': 'Select Audio File',
    'Select Note Image': 'Select Note Image',
    'Upload WhatsApp Chat Screenshot': 'Upload WhatsApp Chat Screenshot',
    'Upload Call Audio Recording': 'Upload Call Audio Recording',
    'Upload High Resolution Photo of Banknote': 'Upload High Resolution Photo of Banknote',
    'Live Camera Banknote Scanner': 'Live Camera Banknote Scanner',
    'Denomination Value': 'Denomination Value',
    'Analyze Scam Markers': 'Analyze Scam Markers',
    'Verifying Authenticity...': 'Verifying Authenticity...',
    'Threat Assessment Report': 'Threat Assessment Report',
    'Nearby Cyber Crime Police Stations': 'Nearby Cyber Crime Police Stations',
    'Locate nearest cell to file physical complaints and receive immediate enforcement support.': 'Locate nearest cell to file physical complaints and receive immediate enforcement support.',
    'Search city or district...': 'Search city or district...',
    'Contact Cyber Cell': 'Contact Cyber Cell',
    'File Official Police Complaint': 'File Official Police Complaint',
    'Official Police Complaint Filed': 'Official Police Complaint Filed',
    'Complaint filed successfully with National Cyber Crime Reporting Portal (I4C). An investigator has been assigned.': 'Complaint filed successfully with National Cyber Crime Reporting Portal (I4C). An investigator has been assigned.',
  },
  hi: {
    'Overview': 'अवलोकन',
    'Citizen Portal': 'नागरिक पोर्टल',
    'Cyber Police Cell': 'साइबर पुलिस सेल',
    'Banking Anomaly Hub': 'बैंकिंग विसंगति हब',
    'Admin Central': 'प्रशासनिक केंद्र',
    'SOS Emergency': 'एसओएस आपातकालीन',
    'Ministry of Electronics & IT / Cyber Coordination Centre (I4C)': 'इलेक्ट्रॉनिक्स और आईटी मंत्रालय / साइबर समन्वय केंद्र (I4C)',
    'CRITICAL HELPLINE: 1930': 'महत्वपूर्ण हेल्पलाइन: 1930',
    'Satyameva Jayate': 'सत्यमेव जयते',
    'Digital Public Safety Intelligence Platform': 'डिजिटल सार्वजनिक सुरक्षा खुफिया मंच',
    'Intel View': 'इंटेल व्यू',
    'Govt View': 'सरकारी व्यू',
    'AI-First National Cybersecurity Initiative': 'एआई-प्रथम राष्ट्रीय साइबर सुरक्षा पहल',
    'Proactive Public Safety': 'सक्रिय सार्वजनिक सुरक्षा',
    'Intelligence System': 'खुफिया प्रणाली',
    'LandingDescription': 'रक्षक एआई भारतीय नागरिकों, कानून प्रवर्तन इकाइयों और बैंकों को डिजिटल घोटालों से बचाता है। हमारा मंच डिजिटल गिरफ्तारी, नकली बैंक नोट, मनी-म्यूल और क्लोन की गई डीपफेक आवाज का रीयल-टाइम में पता लगाने और रोकने के लिए उन्नत बहु-मॉडल तंत्रिका मॉडल का उपयोग करता है।',
    'Scan Suspicious Files / SMS': 'संदिग्ध फाइलों / एसएमएस को स्कैन करें',
    'Explore Fraud Network AI': 'धोखाधड़ी नेटवर्क एआई का अन्वेषण करें',
    'National Operations Dashboard': 'राष्ट्रीय संचालन डैशबोर्ड',
    'Scams Intercepted': 'रोके गए घोटाले',
    'Mule Accounts Flagged': 'चिह्नित म्यूल खाते',
    'Active Investigations': 'सक्रिय जांच',
    'Public Safe-Guard Ledger': 'सार्वजनिक सुरक्षा बहीखाता',
    'Emergency Live Ticker Feed': 'आपातकालीन लाइव टिकर फ़ीड',
    'Cyber Crime Incidents (India Map Visualizer)': 'साइबर अपराध घटनाएं (भारत मानचित्र विज़ुअलाइज़र)',
    'Real-time state and regional visual risk mapping.': 'वास्तविक समय राज्य और क्षेत्रीय दृश्य जोखिम मानचित्रण।',
    'Select City': 'शहर चुनें',
    'Total Savings & Recoveries Tracked': 'ट्रैक की गई कुल बचत और रिकवरी',
    'Historical Recovery Growth (₹ in Crores)': 'ऐतिहासिक रिकवरी वृद्धि (₹ करोड़ में)',
    'Citizen Portals': 'नागरिक पोर्टल',
    'Public Cyber Safety Analyzer': 'सार्वजनिक साइबर सुरक्षा विश्लेषक',
    'PortalDescription': 'धोखाधड़ी के संकेतों का परीक्षण करने के लिए कॉल ट्रांसक्रिप्ट, व्हाट्सएप संदेश स्नैपशॉट, या मुद्रा नोट अपलोड करें।',
    'Generate Immediate SOS': 'तत्काल एसओएस भेजें',
    'Threat Verification Console': 'खतरा सत्यापन कंसोल',
    'SMS / Text': 'एसएमएस / टेक्स्ट',
    'WhatsApp Chat': 'व्हाट्सएप चैट',
    'Call Audio': 'कॉल ऑडियो',
    'Banknote Verify': 'बैंक नोट सत्यापन',
    'Suspect Telephone Number / UPI ID': 'संदिग्ध टेलीफोन नंबर / यूपीआई आईडी',
    'Enter phone number or UPI handle involved in the threat (Optional)': 'खतरे में शामिल फोन नंबर या यूपीआई हैंडल दर्ज करें (वैकल्पिक)',
    'Suspicious Conversation text / Call Transcript': 'संदिग्ध बातचीत पाठ / कॉल ट्रांसक्रिप्ट',
    'Paste text message or transcript details here...': 'पाठ संदेश या ट्रांसक्रिप्ट विवरण यहाँ पेस्ट करें...',
    'Select Image File': 'छवि फ़ाइल चुनें',
    'Select Audio File': 'ऑडियो फ़ाइल चुनें',
    'Select Note Image': 'नोट छवि चुनें',
    'Upload WhatsApp Chat Screenshot': 'व्हाट्सएप चैट स्क्रीनशॉट अपलोड करें',
    'Upload Call Audio Recording': 'कॉल ऑडियो रिकॉर्डिंग अपलोड करें',
    'Upload High Resolution Photo of Banknote': 'बैंक नोट की उच्च रिज़ॉल्यूशन फोटो अपलोड करें',
    'Live Camera Banknote Scanner': 'लाइव कैमरा बैंकनोट स्कैनर',
    'Denomination Value': 'मूल्य वर्ग का मान',
    'Analyze Scam Markers': 'घोटाले के संकेतों का विश्लेषण करें',
    'Verifying Authenticity...': 'प्रामाणिकता का सत्यापन किया जा रहा है...',
    'Threat Assessment Report': 'खतरा मूल्यांकन रिपोर्ट',
    'Nearby Cyber Crime Police Stations': 'निकटतम साइबर अपराध पुलिस स्टेशन',
    'Locate nearest cell to file physical complaints and receive immediate enforcement support.': 'शारीरिक शिकायतें दर्ज करने और तत्काल सहायता प्राप्त करने के लिए निकटतम सेल का पता लगाएं।',
    'Search city or district...': 'शहर या जिला खोजें...',
    'Contact Cyber Cell': 'साइबर सेल से संपर्क करें',
    'File Official Police Complaint': 'आधिकारिक पुलिस शिकायत दर्ज करें',
    'Official Police Complaint Filed': 'आधिकारिक पुलिस शिकायत दर्ज की गई',
    'Complaint filed successfully with National Cyber Crime Reporting Portal (I4C). An investigator has been assigned.': 'राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल (I4C) के साथ शिकायत सफलतापूर्वक दर्ज की गई। एक जांचकर्ता नियुक्त किया गया है।'
  },
  te: {
    'Overview': 'అవలోకనం',
    'Citizen Portal': 'పౌర పోర్టల్',
    'Cyber Police Cell': 'సైబర్ పోలీస్ సెల్',
    'Banking Anomaly Hub': 'బ్యాంకింగ్ అనోమలీ హబ్',
    'Admin Central': 'అడ్మిన్ సెంట్రల్',
    'SOS Emergency': 'SOS అత్యవసర',
    'Ministry of Electronics & IT / Cyber Coordination Centre (I4C)': 'మినిస్ట్రీ ఆఫ్ ఎలక్ట్రానిక్స్ & ఐటి / సైబర్ కోఆర్డినేషన్ సెంటర్ (I4C)',
    'CRITICAL HELPLINE: 1930': 'కీలక హెల్ప్‌లైన్: 1930',
    'Satyameva Jayate': 'సత్యమేవ జయతే',
    'Digital Public Safety Intelligence Platform': 'డిజిటల్ పబ్లిక్ సేఫ్టీ ఇంటెలిజెన్స్ ప్లాట్‌ఫారమ్',
    'Intel View': 'ఇంటెల్ వ్యూ',
    'Govt View': 'ప్రభుత్వ వ్యూ',
    'AI-First National Cybersecurity Initiative': 'AI-మొదటి జాతీయ సైబర్ సెక్యూరిటీ చొరవ',
    'Proactive Public Safety': 'క్రియాశీల పబ్లిక్ సేఫ్టీ',
    'Intelligence System': 'ఇంటెలిజెన్స్ సిస్టమ్',
    'LandingDescription': 'రక్షక్ AI డిజిటల్ స్కామ్‌ల నుండి భారతీయ పౌరులు, చట్ట అమలు విభాగాలు మరియు బ్యాంకులను రక్షిస్తుంది. మా ప్లాట్‌ఫారమ్ డిజిటల్ అరెస్ట్, నకిలీ నోట్లు, మనీ-మ్యూల్ మరియు క్లోన్ చేయబడిన డీప్‌ఫేక్ వాయిస్‌లను నిజ సమయంలో గుర్తించడానికి ఆధునిక న్యూరల్ మోడల్‌లను ఉపయోగిస్తుంది.',
    'Scan Suspicious Files / SMS': 'అనుమానాస్పద ఫైళ్లను / SMS స్కాన్ చేయండి',
    'Explore Fraud Network AI': 'ఫ్రాడ్ నెట్‌వర్క్ AIని అన్వేషించండి',
    'National Operations Dashboard': 'జాతీయ కార్యకలాపాల డాష్‌బోర్డ్',
    'Scams Intercepted': 'నిరోధించబడిన మోసాలు',
    'Mule Accounts Flagged': 'గుర్తించబడిన మ్యూల్ ఖాతాలు',
    'Active Investigations': 'క్రియాశీల విచారణలు',
    'Public Safe-Guard Ledger': 'పబ్లిక్ సేఫ్-గార్డ్ లెడ్జర్',
    'Emergency Live Ticker Feed': 'అత్యవసర లైవ్ టిక్కర్ ఫీడ్',
    'Cyber Crime Incidents (India Map Visualizer)': 'సైబర్ క్రైమ్ సంఘటనలు (ఇండియా మ్యాప్ విజువలైజర్)',
    'Real-time state and regional visual risk mapping.': 'నిజ సమయ రాష్ట్ర మరియు ప్రాంతీయ దృశ్య ప్రమాద మ్యాపింగ్.',
    'Select City': 'నగరాన్ని ఎంచుకోండి',
    'Total Savings & Recoveries Tracked': 'ట్రాక్ చేయబడిన మొత్తం పొదుపులు & రికవరీలు',
    'Historical Recovery Growth (₹ in Crores)': 'చారిత్రక రికవరీ వృద్ధి (₹ కోట్లలో)',
    'Citizen Portals': 'పౌర పోర్టల్స్',
    'Public Cyber Safety Analyzer': 'పబ్లిక్ సైబర్ సేఫ్టీ ఎనలైజర్',
    'PortalDescription': 'మోసం సంకేతాలను పరీక్షించడానికి కాల్ ట్రాన్స్క్రిప్ట్‌లు, వాట్సాప్ సందేశాల స్క్రీన్‌షాట్‌లు లేదా కరెన్సీ నోట్లను అప్‌లోడ్ చేయండి.',
    'Generate Immediate SOS': 'తక్షణమే SOS పంపండి',
    'Threat Verification Console': 'ముప్పు ధృవీకరణ కన్సోల్',
    'SMS / Text': 'SMS / టెక్స్ట్',
    'WhatsApp Chat': 'వాట్సాప్ చాట్',
    'Call Audio': 'కాల్ ఆడియో',
    'Banknote Verify': 'కరెన్సీ నోటు ధృవీకరణ',
    'Suspect Telephone Number / UPI ID': 'అనుమానాస్పద టెలిఫోన్ నంబర్ / UPI ID',
    'Enter phone number or UPI handle involved in the threat (Optional)': 'ముప్పులో పాల్గొన్న ఫోన్ నంబర్ లేదా UPI హ్యాండిల్‌ను నమోదు చేయండి (ఐచ్ఛికం)',
    'Suspicious Conversation text / Call Transcript': 'అనుమానాస్పద సంభాషణ వచనం / కాల్ ట్రాన్స్క్రిప్ట్',
    'Paste text message or transcript details here...': 'వచన సందేశాన్ని లేదా ట్రాన్స్క్రిప్ట్ వివరాలను ఇక్కడ పేస్ట్ చేయండి...',
    'Select Image File': 'చిత్ర ఫైల్‌ను ఎంచుకోండి',
    'Select Audio File': 'ఆడియో ఫైల్‌ను ఎంచుకోండి',
    'Select Note Image': 'నోట్ చిత్రాన్ని ఎంచుకోండి',
    'Upload WhatsApp Chat Screenshot': 'వాట్సాప్ చాట్ స్క్రీన్‌షాట్ అప్‌లోడ్ చేయండి',
    'Upload Call Audio Recording': 'కాల్ ఆడియో రికార్డింగ్ అప్‌లోడ్ చేయండి',
    'Upload High Resolution Photo of Banknote': 'కరెన్సీ నోటు యొక్క అధిక రిజల్యూషన్ ఫోటోను అప్‌లోడ్ చేయండి',
    'Live Camera Banknote Scanner': 'లైవ్ కెమెరా కరెన్సీ నోటు స్కానర్',
    'Denomination Value': 'కరెన్సీ నోటు విలువ',
    'Analyze Scam Markers': 'స్కామ్ మార్కర్లను విశ్లేషించండి',
    'Verifying Authenticity...': 'ప్రామాణికత ధృవీకరించబడుతోంది...',
    'Threat Assessment Report': 'ముప్పు అంచనా నివేదిక',
    'Nearby Cyber Crime Police Stations': 'సమీప సైబర్ క్రైమ్ పోలీస్ స్టేషన్లు',
    'Locate nearest cell to file physical complaints and receive immediate enforcement support.': 'భౌతిక ఫిర్యాదులను దాఖలు చేయడానికి మరియు తక్షణ సహాయాన్ని స్వీకరించడానికి సమీప విభాగాన్ని గుర్తించండి.',
    'Search city or district...': 'నగరం లేదా జిల్లాను శోధించండి...',
    'Contact Cyber Cell': 'సైబర్ సెల్‌ను సంప్రదించండి',
    'File Official Police Complaint': 'అధికారిక పోలీస్ ఫిర్యాదును నమోదు చేయండి',
    'Official Police Complaint Filed': 'అధికారిక పోలీస్ ఫిర్యాదు నమోదు చేయబడింది',
    'Complaint filed successfully with National Cyber Crime Reporting Portal (I4C). An investigator has been assigned.': 'జాతీయ సైబర్ క్రైమ్ రిపోర్టింగ్ పోర్టల్ (I4C) తో ఫిర్యాదు విజయవంతంగా దాఖలు చేయబడింది. ఒక పరిశోధకుడు నియమించబడ్డారు.'
  },
  ta: {
    'Overview': 'கண்ணோட்டம்',
    'Citizen Portal': 'குடிமகன் போர்டல்',
    'Cyber Police Cell': 'சைபர் போலீஸ் செல்',
    'Banking Anomaly Hub': 'வங்கி ஒழுங்கற்ற மையம்',
    'Admin Central': 'நிர்வாக மையம்',
    'SOS Emergency': 'SOS அவசரநிலை',
    'Ministry of Electronics & IT / Cyber Coordination Centre (I4C)': 'மின்னணு மற்றும் தகவல் தொழில்நுட்ப அமைச்சகம் / சைபர் ஒருங்கிணைப்பு மையம் (I4C)',
    'CRITICAL HELPLINE: 1930': 'முக்கிய உதவி எண்: 1930',
    'Satyameva Jayate': 'வாய்மையே வெல்லும்',
    'Digital Public Safety Intelligence Platform': 'டிஜிட்டல் பொது பாதுகாப்பு நுண்ணறிவு தளம்',
    'Intel View': 'இன்டெல் காட்சி',
    'Govt View': 'அரசு காட்சி',
    'AI-First National Cybersecurity Initiative': 'AI-முதல் தேசிய சைபர் பாதுகாப்பு முயற்சி',
    'Proactive Public Safety': 'செயலூக்கமான பொது பாதுகாப்பு',
    'Intelligence System': 'நுண்ணறிவு அமைப்பு',
    'LandingDescription': 'ரக்சக் AI இந்திய குடிமக்கள், சட்ட அமலாக்க பிரிவுகள் மற்றும் வங்கிகளை டிஜிட்டல் மோசடிகளில் இருந்து பாதுகாக்கிறது. எங்கள் தளம் டிஜிட்டல் கைது, போலி ரூபாய் நோட்டுகள், பண மோசடி மற்றும் போலி குரல்களை நிகழ்நேரத்தில் கண்டறிய மேம்பட்ட நரம்பியல் மாதிரிகளைப் பயன்படுத்துகிறது.',
    'Scan Suspicious Files / SMS': 'சந்தேகத்திற்கிடமான கோப்புகள் / எஸ்எம்எஸ் ஸ்கேன் செய்க',
    'Explore Fraud Network AI': 'மோசடி நெட்வொர்க் AI ஐ ஆராய்க',
    'National Operations Dashboard': 'தேசிய செயல்பாட்டு டாஷ்போர்டு',
    'Scams Intercepted': 'தடுக்கப்பட்ட மோசடிகள்',
    'Mule Accounts Flagged': 'குறிக்கப்பட்ட முள் கணக்குகள்',
    'Active Investigations': 'செயலில் உள்ள விசாரணைகள்',
    'Public Safe-Guard Ledger': 'பொது பாதுகாப்பு பேரேடு',
    'Emergency Live Ticker Feed': 'அவசர நேரடி செய்தி ஊட்டம்',
    'Cyber Crime Incidents (India Map Visualizer)': 'சைபர் குற்ற சம்பவங்கள் (இந்திய வரைபட காட்சிப்படுத்தி)',
    'Real-time state and regional visual risk mapping.': 'நிகழ்நேர மாநில மற்றும் பிராந்திய காட்சி ஆபத்து வரைபடம்.',
    'Select City': 'நகரத்தைத் தேர்ந்தெடுக்கவும்',
    'Total Savings & Recoveries Tracked': 'கண்டறியப்பட்ட மொத்த சேமிப்பு மற்றும் மீட்புகள்',
    'Historical Recovery Growth (₹ in Crores)': 'வரலாற்று மீட்பு வளர்ச்சி (₹ கோடிகளில்)',
    'Citizen Portals': 'குடிமகன் போர்டல்கள்',
    'Public Cyber Safety Analyzer': 'பொது சைபர் பாதுகாப்பு பகுப்பாய்வி',
    'PortalDescription': 'மோசடி அறிகுறிகளை சோதிக்க அழைப்பு பிரதிகள், வாட்ஸ்அப் செய்தி ஸ்கிரீன்ஷாட்கள் அல்லது ரூபாய் நோட்டுகளை பதிவேற்றவும்.',
    'Generate Immediate SOS': 'உடனடி SOS ஐ உருவாக்கவும்',
    'Threat Verification Console': 'அச்சுறுத்தல் சரிபார்ப்பு கன்சோல்',
    'SMS / Text': 'SMS / உரை',
    'WhatsApp Chat': 'வாட்ஸ்அப் அரட்டை',
    'Call Audio': 'அழைப்பு ஆடியோ',
    'Banknote Verify': 'ரூபாய் நோட்டு சரிபார்ப்பு',
    'Suspect Telephone Number / UPI ID': 'சந்தேகத்திற்கிடமான தொலைபேசி எண் / UPI முகவரி',
    'Enter phone number or UPI handle involved in the threat (Optional)': 'அச்சுறுத்தலில் ஈடுபட்டுள்ள தொலைபேசி எண் அல்லது UPI முகவரியை உள்ளிடவும் (விருப்பத்தேர்வு)',
    'Suspicious Conversation text / Call Transcript': 'சந்தேகத்திற்கிடமான உரையாடல் உரை / அழைப்பு பிரதி',
    'Paste text message or transcript details here...': 'உரை செய்தி அல்லது அழைப்பு பிரதி விவரங்களை இங்கே ஒட்டவும்...',
    'Select Image File': 'படக் கோப்பைத் தேர்ந்தெடுக்கவும்',
    'Select Audio File': 'ஒலி கோப்பைத் தேர்ந்தெடுக்கவும்',
    'Select Note Image': 'நோட்டுப் படத்தைத் தேர்ந்தெடுக்கவும்',
    'Upload WhatsApp Chat Screenshot': 'வாட்ஸ்அப் அரட்டை ஸ்கிரீன்ஷாட்டை பதிவேற்றவும்',
    'Upload Call Audio Recording': 'அழைப்பு ஆடியோ பதிவை பதிவேற்றவும்',
    'Upload High Resolution Photo of Banknote': 'ரூபாய் நோட்டின் உயர் தெளிவுத்திறன் கொண்ட புகைப்படத்தை பதிவேற்றவும்',
    'Live Camera Banknote Scanner': 'நேரடி கேமரா ரூபாய் நோட்டு ஸ்கேனர்',
    'Denomination Value': 'மதிப்பு பிரிவு',
    'Analyze Scam Markers': 'மோசடி குறிகாட்டிகளை பகுப்பாய்வு செய்க',
    'Verifying Authenticity...': 'உண்மைத்தன்மை சரிபார்க்கப்படுகிறது...',
    'Threat Assessment Report': 'அச்சுறுத்தல் மதிப்பீட்டு அறிக்கை',
    'Nearby Cyber Crime Police Stations': 'அருகிலுள்ள சைபர் குற்ற காவல் நிலையங்கள்',
    'Locate nearest cell to file physical complaints and receive immediate enforcement support.': 'நேரில் புகார் அளிக்கவும் உடனடி அமலாக்க ஆதரவைப் பெறவும் அருகிலுள்ள பிரிவைக் கண்டறியவும்.',
    'Search city or district...': 'நகரம் அல்லது மாவட்டத்தைத் தேடுக...',
    'Contact Cyber Cell': 'சைபர் செல்லைத் தொடர்பு கொள்ளவும்',
    'File Official Police Complaint': 'அதிகாரப்பூர்வ காவல் புகாரை பதிவு செய்க',
    'Official Police Complaint Filed': 'அதிகாரப்பூர்வ காவல் புகார் பதிவு செய்யப்பட்டது',
    'Complaint filed successfully with National Cyber Crime Reporting Portal (I4C). An investigator has been assigned.': 'தேசிய சைபர் குற்றப் புகாரளிப்பு போர்ட்டலில் (I4C) புகார் வெற்றிகரமாகப் பதிவு செய்யப்பட்டது. விசாரணை அதிகாரி நியமிக்கப்பட்டுள்ளார்.'
  },
  kn: {
    'Overview': 'ಅವಲೋಕನ',
    'Citizen Portal': 'ನಾಗರಿಕ ಪೋರ್ಟಲ್',
    'Cyber Police Cell': 'ಸೈಬರ್ ಪೊಲೀಸ್ ಸೆಲ್',
    'Banking Anomaly Hub': 'ಬ್ಯಾಂಕಿಂಗ್ ಅಸಂಗತತೆ ಹಬ್',
    'Admin Central': 'ಅಡ್ಮಿನ್ ಸೆಂಟ್ರಲ್',
    'SOS Emergency': 'SOS ತುರ್ತು',
    'Ministry of Electronics & IT / Cyber Coordination Centre (I4C)': 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ ಮತ್ತು ಐಟಿ ಸಚಿವಾಲಯ / ಸೈಬರ್ ಸಮನ್ವಯ ಕೇಂದ್ರ (I4C)',
    'CRITICAL HELPLINE: 1930': 'ನಿರ್ಣಾಯಕ ಸಹಾಯವಾಣಿ: 1930',
    'Satyameva Jayate': 'ಸತ್ಯಮೇವ ಜಯತೇ',
    'Digital Public Safety Intelligence Platform': 'ಡಿಜಿಟಲ್ ಸಾರ್ವಜನಿಕ ಸುರಕ್ಷತೆ ಬುದ್ಧಿಮತ್ತೆ ವೇದಿಕೆ',
    'Intel View': 'ಇಂಟೆಲ್ ನೋಟ',
    'Govt View': 'ಸರ್ಕಾರಿ ನೋಟ',
    'AI-First National Cybersecurity Initiative': 'AI-ಮೊದಲ ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಸುರಕ್ಷತೆ ಉಪಕ್ರಮ',
    'Proactive Public Safety': 'ಸಕ್ರಿಯ ಸಾರ್ವಜನಿಕ ಸುರಕ್ಷತೆ',
    'Intelligence System': 'ಬುದ್ಧಿಮತ್ತೆ ವ್ಯವಸ್ಥೆ',
    'LandingDescription': 'ಡಿಜಿಟಲ್ ಹಗರಣಗಳಿಂದ ರಕ್ಷಕ್ AI ಭಾರತೀಯ ನಾಗರಿಕರನ್ನು, ಕಾನೂನು ಜಾರಿ ವಿಭಾಗಗಳನ್ನು ಮತ್ತು ಬ್ಯಾಂಕ್‌ಗಳನ್ನು ರಕ್ಷಿಸುತ್ತದೆ. ನಮ್ಮ ವೇದಿಕೆಯು ಡಿಜಿಟಲ್ ಬಂಧನ, ನಕಲಿ ನೋಟುಗಳು, ಹಣದ ಜಾಲಗಳು ಮತ್ತು ಕ್ಲೋನ್ ಮಾಡಿದ ಧ್ವನಿಯನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಸುಧಾರಿತ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಮಾದರಿಗಳನ್ನು ಬಳಸುತ್ತದೆ.',
    'Scan Suspicious Files / SMS': 'ಅನುಮಾನಾಸ್ಪದ ಫೈಲ್‌ಗಳು / SMS ಅನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
    'Explore Fraud Network AI': 'ವಂಚನೆ ಜಾಲ AI ಅನ್ನು ಅನ್ವೇಷಿಸಿ',
    'National Operations Dashboard': 'ರಾಷ್ಟ್ರೀಯ ಕಾರ್ಯಾಚರಣೆಗಳ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'Scams Intercepted': 'ತಡೆದ ವಂಚನೆಗಳು',
    'Mule Accounts Flagged': 'ಚಿಹ್ನಿತ ಮ್ಯೂಲ್ ಖಾತೆಗಳು',
    'Active Investigations': 'ಸಕ್ರಿಯ ತನಿಖೆಗಳು',
    'Public Safe-Guard Ledger': 'ಸಾರ್ವಜನಿಕ ಸುರಕ್ಷಾ ವಹಿ',
    'Emergency Live Ticker Feed': 'ತುರ್ತು ಲೈವ್ ಟಿಕ್ಕರ್ ಫೀಡ್',
    'Cyber Crime Incidents (India Map Visualizer)': 'ಸೈಬರ್ ಅಪರಾಧ ಘಟನೆಗಳು (ಭಾರತ ನಕ್ಷೆ ದೃಶ್ಯೀಕರಣ)',
    'Real-time state and regional visual risk mapping.': 'ನೈಜ-ಸಮಯದ ರಾಜ್ಯ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ದೃಶ್ಯ ಅಪಾಯದ ಮ್ಯಾಪಿಂಗ್.',
    'Select City': 'ನಗರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    'Total Savings & Recoveries Tracked': 'ಟ್ರ್ಯಾಕ್ ಮಾಡಲಾದ ಒಟ್ಟು ಉಳಿತಾಯ ಮತ್ತು ಮರುಪಡೆಯುವಿಕೆಗಳು',
    'Historical Recovery Growth (₹ in Crores)': 'ಐತಿಹಾಸಿಕ ಮರುಪಡೆಯುವಿಕೆ ಬೆಳವಣಿಗೆ (₹ ಕೋಟಿಗಳಲ್ಲಿ)',
    'Citizen Portals': 'ನಾಗರಿಕ ಪೋರ್ಟಲ್‌ಗಳು',
    'Public Cyber Safety Analyzer': 'ಸಾರ್ವಜನಿಕ ಸೈಬರ್ ಸುರಕ್ಷತೆ ವಿಶ್ಲೇಷಕ',
    'PortalDescription': 'ವಂಚನೆ ಚಿಹ್ನೆಗಳನ್ನು ಪರೀಕ್ಷಿಸಲು ಕರೆ ಪ್ರತಿಲಿಪಿಗಳು, ವಾಟ್ಸಾಪ್ ಸಂದೇಶಗಳ ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳು ಅಥವಾ ಕರೆನ್ಸಿ ನೋಟುಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
    'Generate Immediate SOS': 'ತಕ್ಷಣದ SOS ಅನ್ನು ರಚಿಸಿ',
    'Threat Verification Console': 'ಮುಪ್ಪು ಪರಿಶೀಲನೆ ಕನ್ಸೋಲ್',
    'SMS / Text': 'SMS / ಪಠ್ಯ',
    'WhatsApp Chat': 'ವಾಟ್ಸಾಪ್ ಚಾಟ್',
    'Call Audio': 'ಕರೆ ಆಡಿಯೋ',
    'Banknote Verify': 'ನೋಟು ಪರಿಶೀಲನೆ',
    'Suspect Telephone Number / UPI ID': 'ಅನುಮಾನಾಸ್ಪದ ದೂರವಾಣಿ ಸಂಖ್ಯೆ / UPI ID',
    'Enter phone number or UPI handle involved in the threat (Optional)': 'ಮುಪ್ಪಿನಲ್ಲಿ ಭಾಗಿಯಾಗಿರುವ ಫೋನ್ ಸಂಖ್ಯೆ ಅಥವಾ UPI ಹ್ಯಾಂಡಲ್ ಅನ್ನು ನಮೂದಿಸಿ (ಐಚ್ಛಿಕ)',
    'Suspicious Conversation text / Call Transcript': 'ಅನುಮಾನಾಸ್ಪದ ಸಂಭಾಷಣೆ ಪಠ್ಯ / ಕರೆ ಪ್ರತಿಲಿಪಿ',
    'Paste text message or transcript details here...': 'ಪಠ್ಯ ಸಂದೇಶ ಅಥವಾ ಪ್ರತಿಲಿಪಿ ವಿವರಗಳನ್ನು ಇಲ್ಲಿ ಅಂಟಿಸಿ...',
    'Select Image File': 'ಚಿತ್ರ ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ',
    'Select Audio File': 'ಆಡಿಯೋ ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ',
    'Select Note Image': 'ನೋಟು ಚಿತ್ರ ಆಯ್ಕೆಮಾಡಿ',
    'Upload WhatsApp Chat Screenshot': 'ವಾಟ್ಸಾಪ್ ಚಾಟ್ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    'Upload Call Audio Recording': 'ಕರೆ ಆಡಿಯೋ ರೆಕಾರ್ಡಿಂಗ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    'Upload High Resolution Photo of Banknote': 'ನೋಟಿನ ಉನ್ನತ ರೆಸಲ್ಯೂಶನ್ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    'Live Camera Banknote Scanner': 'ಲೈವ್ ಕ್ಯಾಮೆರಾ ನೋಟು ಸ್ಕ್ಯಾನರ್',
    'Denomination Value': 'ಮುಖಬೆಲೆ ಮೌಲ್ಯ',
    'Analyze Scam Markers': 'ವಂಚನೆ ಮಾರ್ಕರ್‌ಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ',
    'Verifying Authenticity...': 'ಅಧಿಕೃತತೆಯನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
    'Threat Assessment Report': 'ಮುಪ್ಪು ಮೌಲ್ಯಮಾಪನ ವರದಿ',
    'Nearby Cyber Crime Police Stations': 'ಹತ್ತಿರದ ಸೈಬರ್ ಅಪರಾಧ ಪೊಲೀಸ್ ಠಾಣೆಗಳು',
    'Locate nearest cell to file physical complaints and receive immediate enforcement support.': 'ಭೌತಿಕ ದೂರುಗಳನ್ನು ಸಲ್ಲಿಸಲು ಮತ್ತು ತಕ್ಷಣದ ಬೆಂಬಲ ಪಡೆಯಲು ಹತ್ತಿರದ ವಿಭಾಗವನ್ನು ಪತ್ತೆಹಚ್ಚಿ.',
    'Search city or district...': 'ನಗರ ಅಥವಾ ಜಿಲ್ಲೆಯನ್ನು ಹುಡುಕಿ...',
    'Contact Cyber Cell': 'ಸೈಬರ್ ಸೆಲ್ ಸಂಪರ್ಕಿಸಿ',
    'File Official Police Complaint': 'ಅಧಿಕೃತ ಪೊಲೀಸ್ ದೂರು ಸಲ್ಲಿಸಿ',
    'Official Police Complaint Filed': 'ಅಧಿಕೃತ ಪೊಲೀಸ್ ದೂರು ಸಲ್ಲಿಸಲಾಗಿದೆ',
    'Complaint filed successfully with National Cyber Crime Reporting Portal (I4C). An investigator has been assigned.': 'ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಅಪರಾಧ ವರದಿ ಪೋರ್ಟಲ್ (I4C) ಗೆ ಯಶಸ್ವಿಯಾಗಿ ದೂರು ಸಲ್ಲಿಸಲಾಗಿದೆ. ತನಿಖಾಧಿಕಾರಿಯನ್ನು ನಿಯೋಜಿಸಲಾಗಿದೆ.'
  },
  ml: {
    'Overview': 'അവലോകനം',
    'Citizen Portal': 'പൗരൻ പോർട്ടൽ',
    'Cyber Police Cell': 'സൈബർ പോലീസ് സെൽ',
    'Banking Anomaly Hub': 'ബാങ്കിംഗ് അപാകത ഹബ്',
    'Admin Central': 'അഡ്മിൻ സെൻട്രൽ',
    'SOS Emergency': 'SOS അടിയന്തിരാവസ്ഥ',
    'Ministry of Electronics & IT / Cyber Coordination Centre (I4C)': 'ഇലക്ട്രോണിക്സ് & ഐടി മന്ത്രാലയം / സൈബർ കോർഡിനേഷൻ സെന്റർ (I4C)',
    'CRITICAL HELPLINE: 1930': 'പ്രധാന ഹെൽപ്പ്‌ലൈൻ: 1930',
    'Satyameva Jayate': 'സത്യമേവ ജയതേ',
    'Digital Public Safety Intelligence Platform': 'ഡിജിറ്റൽ പൊതുജന സുരക്ഷാ ഇന്റലിജൻസ് പ്ലാറ്റ്‌ഫോം',
    'Intel View': 'ഇന്റൽ വ്യൂ',
    'Govt View': 'ഗവൺമെന്റ് വ്യൂ',
    'AI-First National Cybersecurity Initiative': 'AI-ഫസ്റ്റ് നാഷണൽ സൈബർ സുരക്ഷാ സംരംഭം',
    'Proactive Public Safety': 'പ്രോആക്ടീവ് പബ്ലിക് സേഫ്റ്റി',
    'Intelligence System': 'ഇന്റലിജൻസ് സിസ്റ്റം',
    'LandingDescription': 'ഡിജിറ്റൽ തട്ടിപ്പുകളിൽ നിന്ന് രക്ഷക് AI ഇന്ത്യൻ പൗരന്മാരെയും നിയമപാലകരെയും ബാങ്കുകളെയും സംരക്ഷിക്കുന്നു. ഡിജിറ്റൽ അറസ്റ്റ് ഭീഷണി, വ്യാജ കറൻസി നോട്ടുകൾ, മണി മ്യൂൾ ഇടപാടുകൾ, വ്യാജ ശബ്ദം എന്നിവ കണ്ടെത്താൻ ഞങ്ങളുടെ പ്ലാറ്റ്‌ഫോം അത്യാധുനിക കൃത്രിമ ബുദ്ധി ഉപയോഗിക്കുന്നു.',
    'Scan Suspicious Files / SMS': 'സംശയാസ്പദമായ ഫയലുകൾ / എസ്എംഎസ് സ്കാൻ ചെയ്യുക',
    'Explore Fraud Network AI': 'ഫ്രോഡ് നെറ്റ്‌വർക്ക് AI പര്യവേക്ഷണം ചെയ്യുക',
    'National Operations Dashboard': 'നാഷണൽ ഓപ്പറേഷൻസ് ഡാഷ്‌ബോർഡ്',
    'Scams Intercepted': 'തടഞ്ഞ തട്ടിപ്പുകൾ',
    'Mule Accounts Flagged': 'ഫ്ളാഗ് ചെയ്ത മ്യൂൾ അക്കൗണ്ടുകൾ',
    'Active Investigations': 'സജീവ അന്വേഷണങ്ങൾ',
    'Public Safe-Guard Ledger': 'പബ്ലിക് സേഫ്-ഗാർഡ് ലെഡ്ജർ',
    'Emergency Live Ticker Feed': 'അടിയന്തിര ലൈവ് ടിക്കർ ഫീഡ്',
    'Cyber Crime Incidents (India Map Visualizer)': 'സൈബർ ക്രൈം സംഭവങ്ങൾ (ഇന്ത്യ മാപ്പ് വിഷ്വലൈസർ)',
    'Real-time state and regional visual risk mapping.': 'തത്സമയ സംസ്ഥാന-പ്രാദേശിക വിഷ്വൽ റിസ്ക് മാപ്പിംഗ്.',
    'Select City': 'നഗരം തിരഞ്ഞെടുക്കുക',
    'Total Savings & Recoveries Tracked': 'കണ്ടെത്തിയ ആകെ സമ്പാദ്യവും വീണ്ടെടുക്കലുകളും',
    'Historical Recovery Growth (₹ in Crores)': 'ചരിത്രപരമായ വീണ്ടെടുക്കൽ വളർച്ച (₹ കോടിയിൽ)',
    'Citizen Portals': 'പൗരൻ പോർട്ടലുകൾ',
    'Public Cyber Safety Analyzer': 'പബ്ലിക് സൈബർ സുരക്ഷാ അനലൈസർ',
    'PortalDescription': 'തട്ടിപ്പ് ലക്ഷണങ്ങൾ പരിശോധിക്കാൻ കോൾ ട്രാൻസ്ക്രിപ്റ്റുകൾ, വാട്സാപ്പ് സന്ദേശങ്ങളുടെ സ്ക്രീൻഷോട്ടുകൾ അല്ലെങ്കിൽ കറൻസി നോട്ടുകൾ അപ്‌ലോഡ് ചെയ്യുക.',
    'Generate Immediate SOS': 'ഉടൻ തന്നെ SOS അയക്കുക',
    'Threat Verification Console': 'ഭീഷണി പരിശോധനാ കൺസോൾ',
    'SMS / Text': 'SMS / ടെക്സ്റ്റ്',
    'WhatsApp Chat': 'വാട്സാപ്പ് ചാറ്റ്',
    'Call Audio': 'കോൾ ഓഡിയോ',
    'Banknote Verify': 'നോട്ട് പരിശോധന',
    'Suspect Telephone Number / UPI ID': 'സംശയാസ്പദമായ ഫോൺ നമ്പർ / UPI ഐഡി',
    'Enter phone number or UPI handle involved in the threat (Optional)': 'ഭീഷണിയിൽ ഉൾപ്പെട്ടിരിക്കുന്ന ഫോൺ നമ്പറോ യുപിഐ ഐഡിയോ നൽകുക (ഓപ്ഷണൽ)',
    'Suspicious Conversation text / Call Transcript': 'സംശയാസ്പദമായ സംഭാഷണ വിവരങ്ങൾ / കോൾ ട്രാൻസ്ക്രിപ്റ്റ്',
    'Paste text message or transcript details here...': 'ടെക്സ്റ്റ് സന്ദേശമോ ട്രാൻസ്ക്രിപ്റ്റോ ഇവിടെ പേസ്റ്റ് ചെയ്യുക...',
    'Select Image File': 'ചിത്ര ഫയൽ തിരഞ്ഞെടുക്കുക',
    'Select Audio File': 'ഓഡിയോ ഫയൽ തിരഞ്ഞെടുക്കുക',
    'Select Note Image': 'നോട്ട് ചിത്രം തിരഞ്ഞെടുക്കുക',
    'Upload WhatsApp Chat Screenshot': 'വാട്സാപ്പ് ചാറ്റ് സ്ക്രീൻഷോട്ട് അപ്‌ലോഡ് ചെയ്യുക',
    'Upload Call Audio Recording': 'കോൾ ഓഡിയോ റെക്കോർഡിംഗ് അപ്‌ലോഡ് ചെയ്യുക',
    'Upload High Resolution Photo of Banknote': 'നോട്ടിന്റെ ഉയർന്ന റെസല്യൂഷൻ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക',
    'Live Camera Banknote Scanner': 'ലൈവ് ക്യാമറ നോട്ട് സ്കാനർ',
    'Denomination Value': 'മൂല്യം',
    'Analyze Scam Markers': 'തട്ടിപ്പ് ലക്ഷണങ്ങൾ വിശകലനം ചെയ്യുക',
    'Verifying Authenticity...': 'ആധികാരികത പരിശോധിക്കുന്നു...',
    'Threat Assessment Report': 'ഭീഷണി വിലയിരുത്തൽ റിപ്പോർട്ട്',
    'Nearby Cyber Crime Police Stations': 'അടുത്തുള്ള സൈബർ ക്രൈം പോലീസ് സ്റ്റേഷനുകൾ',
    'Locate nearest cell to file physical complaints and receive immediate enforcement support.': 'പരാതികൾ ഫയൽ ചെയ്യാനും അടിയന്തിര സഹായം നേടാനും അടുത്തുള്ള സൈബർ സെൽ കണ്ടെത്തുക.',
    'Search city or district...': 'നഗരമോ ജില്ലയോ തിരയുക...',
    'Contact Cyber Cell': 'സൈബർ സെല്ലുമായി ബന്ധപ്പെടുക',
    'File Official Police Complaint': 'ഔദ്യോഗിക പോലീസ് പരാതി നൽകുക',
    'Official Police Complaint Filed': 'ഔദ്യോഗിക പോലീസ് പരാതി ഫയൽ ചെയ്തു',
    'Complaint filed successfully with National Cyber Crime Reporting Portal (I4C). An investigator has been assigned.': 'ദേശീയ സൈബർ ക്രൈം റിപ്പോർട്ടിംഗ് പോർട്ടലിൽ (I4C) പരാതി വിജയകരമായി രജിസ്റ്റർ ചെയ്തു. ഒരു അന്വേഷണ ഉദ്യോഗസ്ഥനെ ചുമതലപ്പെടുത്തിയിട്ടുണ്ട്.'
  },
  mr: {
    'Overview': 'अवलोकन',
    'Citizen Portal': 'नागरिक पोर्टल',
    'Cyber Police Cell': 'सायबर पोलीस सेल',
    'Banking Anomaly Hub': 'बँकिंग विसंगती हब',
    'Admin Central': 'प्रशासकीय केंद्र',
    'SOS Emergency': 'SOS आपत्कालीन',
    'Ministry of Electronics & IT / Cyber Coordination Centre (I4C)': 'इलेक्ट्रॉनिक्स आणि आयटी मंत्रालय / सायबर समन्वय केंद्र (I4C)',
    'CRITICAL HELPLINE: 1930': 'महत्त्वाची हेल्पलाइन: 1930',
    'Satyameva Jayate': 'सत्यमेव जयते',
    'Digital Public Safety Intelligence Platform': 'डिजिटल सार्वजनिक सुरक्षा माहिती मंच',
    'Intel View': 'इंटेल व्ह्यू',
    'Govt View': 'शासकीय व्ह्यू',
    'AI-First National Cybersecurity Initiative': 'एआय-प्रथम राष्ट्रीय सायबर सुरक्षा उपक्रम',
    'Proactive Public Safety': 'सक्रिय सार्वजनिक सुरक्षा',
    'Intelligence System': 'माहिती यंत्रणा',
    'LandingDescription': 'रक्षक एआय भारतीय नागरिकांना, कायदा अंमलबजावणी युनिट्सना आणि बँकांना डिजिटल घोटाळ्यांपासून वाचवते. आमचा मंच डिजिटल अटक, बनावट बँक नोटा, मनी-म्यूल आणि क्लोन केलेल्या डीपफेक आवाजाचा रिअल-टाइम शोध आणि प्रतिबंधासाठी प्रगत न्यूरल मॉडेल्स वापरतो.',
    'Scan Suspicious Files / SMS': 'संशयास्पद फाइल्स / एसएमएस स्कॅन करा',
    'Explore Fraud Network AI': 'सायबर फ्रॉड नेटवर्क एआय एक्सप्लोर करा',
    'National Operations Dashboard': 'राष्ट्रीय ऑपरेशन्स डॅशबोर्ड',
    'Scams Intercepted': 'अडकवलेले घोटाळे',
    'Mule Accounts Flagged': 'चिन्हांकित म्यूल खाती',
    'Active Investigations': 'सक्रिय तपास',
    'Public Safe-Guard Ledger': 'सार्वजनिक सुरक्षा बहीखाते',
    'Emergency Live Ticker Feed': 'आपत्कालीन लाइव्ह टिकर फीड',
    'Cyber Crime Incidents (India Map Visualizer)': 'सायबर गुन्हे घटना (भारत नकाशा व्हिज्युअलायझर)',
    'Real-time state and regional visual risk mapping.': 'रिअल-टाइम राज्य आणि प्रादेशिक दृश्य जोखीम मॅपिंग.',
    'Select City': 'शहर निवडा',
    'Total Savings & Recoveries Tracked': 'ट्रॅक केलेली एकूण बचत आणि रिकव्हरी',
    'Historical Recovery Growth (₹ in Crores)': 'ऐतिहासिक रिकव्हरी वाढ (₹ कोटीत)',
    'Citizen Portals': 'नागरिक पोर्टल',
    'Public Cyber Safety Analyzer': 'सार्वजनिक सायबर सुरक्षा विश्लेषक',
    'PortalDescription': 'घोटाळ्याचे संकेत तपासण्यासाठी कॉल ट्रान्सक्रिप्ट, व्हॉट्सॲप मेसेज स्क्रीनशॉट किंवा चलनी नोटा अपलोड करा.',
    'Generate Immediate SOS': 'तात्काळ SOS पाठवा',
    'Threat Verification Console': 'धोका पडताळणी कन्सोल',
    'SMS / Text': 'एसएमएस / मजकूर',
    'WhatsApp Chat': 'व्हॉट्सॲप चॅट',
    'Call Audio': 'कॉल ऑडिओ',
    'Banknote Verify': 'बँक नोट पडताळणी',
    'Suspect Telephone Number / UPI ID': 'संशयास्पद टेलिफोन नंबर / युपीआय आयडी',
    'Enter phone number or UPI handle involved in the threat (Optional)': 'धमकीमध्ये समाविष्ट असलेला फोन नंबर किंवा युपीआय आयडी प्रविष्ट करा (पर्यायी)',
    'Suspicious Conversation text / Call Transcript': 'संशयास्पद संभाषण मजकूर / कॉल ट्रान्सक्रिप्ट',
    'Paste text message or transcript details here...': 'मजकूर संदेश किंवा ट्रान्सक्रिप्ट तपशील येथे पेस्ट करा...',
    'Select Image File': 'प्रतिमा फाइल निवडा',
    'Select Audio File': 'ऑडिओ फाइल निवडा',
    'Select Note Image': 'नोट प्रतिमा निवडा',
    'Upload WhatsApp Chat Screenshot': 'व्हॉट्सॲप चॅट स्क्रीनशॉट अपलोड करा',
    'Upload Call Audio Recording': 'कॉल ऑडिओ रेकॉर्डिंग अपलोड करा',
    'Upload High Resolution Photo of Banknote': 'बँक नोटचा उच्च रिझोल्यूशन फोटो अपलोड करा',
    'Live Camera Banknote Scanner': 'लाइव्ह कॅमेरा बँकनोट स्कॅनर',
    'Denomination Value': 'मूल्य वर्ग',
    'Analyze Scam Markers': 'घोटाळ्याच्या लक्षणांचे विश्लेषण करा',
    'Verifying Authenticity...': 'प्रामाणिकता तपासत आहे...',
    'Threat Assessment Report': 'धोका मूल्यांकन अहवाल',
    'Nearby Cyber Crime Police Stations': 'जवळचे सायबर क्राईम पोलीस स्टेशन',
    'Locate nearest cell to file physical complaints and receive immediate enforcement support.': 'तक्रार दाखल करण्यासाठी आणि तात्काळ मदत मिळवण्यासाठी जवळच्या सायबर सेलचा शोध घ्या।',
    'Search city or district...': 'शहर किंवा जिल्हा शोधा...',
    'Contact Cyber Cell': 'सायबर सेलशी संपर्क साधा',
    'File Official Police Complaint': 'अधिकृत पोलीस तक्रार नोंदवा',
    'Official Police Complaint Filed': 'अधिकृत पोलीस तक्रार नोंदवली गेली',
    'Complaint filed successfully with National Cyber Crime Reporting Portal (I4C). An investigator has been assigned.': 'राष्ट्रीय सायबर क्राईम रिपोर्टिंग पोर्टल (I4C) कडे तक्रार यशस्वीरित्या दाखल केली आहे. एक तपास अधिकारी नियुक्त केला गेला आहे.'
  },
  pa: {
    'Overview': 'ਪੂਰਵਦਰਸ਼ਨ',
    'Citizen Portal': 'ਨਾਗਰਿਕ ਪੋਰਟਲ',
    'Cyber Police Cell': 'ਸਾਈਬਰ ਪੁਲਿਸ ਸੈੱਲ',
    'Banking Anomaly Hub': 'ਬੈਂਕਿੰਗ ਵਿਸੰਗਤੀ ਹੱਬ',
    'Admin Central': 'ਪ੍ਰਸ਼ਾਸਕੀ ਕੇਂਦਰ',
    'SOS Emergency': 'SOS ਐਮਰਜੈਂਸੀ',
    'Ministry of Electronics & IT / Cyber Coordination Centre (I4C)': 'ਇਲੈਕਟ੍ਰਾਨਿਕਸ ਅਤੇ ਆਈ.ਟੀ. ਮੰਤਰਾਲਾ / ਸਾਈਬਰ ਕੋਆਰਡੀਨੇਸ਼ਨ ਸੈਂਟਰ (I4C)',
    'CRITICAL HELPLINE: 1930': 'ਮਹੱਤਵਪੂਰਨ ਹੈਲਪਲਾਈਨ: 1930',
    'Satyameva Jayate': 'ਸਤਿਮੇਵ ਜੈਤੇ',
    'Digital Public Safety Intelligence Platform': 'ਡਿਜੀਟਲ ਪਬਲਿਕ ਸੇਫਟੀ ਇੰਟੈਲੀਜੈਂਸ ਪਲੇਟਫਾਰਮ',
    'Intel View': 'ਇੰਟੈਲ ਦ੍ਰਿਸ਼',
    'Govt View': 'ਸਰਕਾਰੀ ਦ੍ਰਿਸ਼',
    'AI-First National Cybersecurity Initiative': 'ਏ.ਆਈ.-ਪਹਿਲੀ ਰਾਸ਼ਟਰੀ ਸਾਈਬਰ ਸੁਰੱਖਿਆ ਪਹਿਲਕਦਮੀ',
    'Proactive Public Safety': 'ਸਰਗਰਮ ਜਨਤਕ ਸੁਰੱਖਿਆ',
    'Intelligence System': 'ਇੰਟੈਲੀਜੈਂਸ ਸਿਸਟਮ',
    'LandingDescription': 'ਰਕਸ਼ਕ ਏ.ਆਈ. ਭਾਰਤੀ ਨਾਗਰਿਕਾਂ, ਕਾਨੂੰਨ ਲਾਗੂ ਕਰਨ ਵਾਲੀਆਂ ਇਕਾਈਆਂ ਅਤੇ ਬੈਂਕਾਂ ਨੂੰ ਡਿਜੀਟਲ ਘੁਟਾਲਿਆਂ ਤੋਂ ਬਚਾਉਂਦਾ ਹੈ। ਸਾਡਾ ਪਲੇਟਫਾਰਮ ਡਿਜੀਟਲ ਗ੍ਰਿਫਤਾਰੀ, ਨਕਲੀ ਨੋਟਾਂ, ਮਨੀ-ਮਿਊਲ ਅਤੇ ਕਲੋਨ ਕੀਤੀ ਡੀਪਫੇਕ ਆਵਾਜ਼ ਦਾ ਰੀਅਲ-ਟਾਈਮ ਪਤਾ ਲਗਾਉਣ ਲਈ ਉੱਨਤ ਨਿਊਰਲ ਮਾਡਲਾਂ ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ।',
    'Scan Suspicious Files / SMS': 'ਸ਼ੱਕੀ ਫਾਈਲਾਂ / ਐਸ.ਐਮ.ਐਸ. ਨੂੰ ਸਕੈਨ ਕਰੋ',
    'Explore Fraud Network AI': 'ਧੋਖਾਧੜੀ ਨੈੱਟਵਰਕ ਏ.ਆਈ. ਦੀ ਪੜਚੋਲ ਕਰੋ',
    'National Operations Dashboard': 'ਰਾਸ਼ਟਰੀ ਸੰਚਾਲਨ ਡੈਸ਼ਬੋਰਡ',
    'Scams Intercepted': 'ਰੋਕੇ ਗਏ ਘੁਟਾਲੇ',
    'Mule Accounts Flagged': 'ਨਿਸ਼ਾਨਬੱਧ ਮਿਊਲ ਖਾਤੇ',
    'Active Investigations': 'ਸਰਗਰਮ ਜਾਂਚਾਂ',
    'Public Safe-Guard Ledger': 'ਜਨਤਕ ਸੁਰੱਖਿਆ ਬਹੀ ਖਾਤਾ',
    'Emergency Live Ticker Feed': 'ਐਮਰਜੈਂਸੀ ਲਾਈਵ ਟਿਕਰ ਫੀਡ',
    'Cyber Crime Incidents (India Map Visualizer)': 'ਸਾਈਬਰ ਅਪਰਾਧ ਘਟਨਾਵਾਂ (ਭਾਰਤ ਨਕਸ਼ਾ ਵਿਜ਼ੂਅਲਾਈਜ਼ਰ)',
    'Real-time state and regional visual risk mapping.': 'ਰੀਅਲ-ਟਾਈਮ ਰਾਜ ਅਤੇ ਖੇਤਰੀ ਵਿਜ਼ੂਅਲ ਜੋਖਮ ਮੈਪਿੰਗ।',
    'Select City': 'ਸ਼ਹਿਰ ਚੁਣੋ',
    'Total Savings & Recoveries Tracked': 'ਟਰੈਕ ਕੀਤੀਆਂ ਕੁੱਲ ਬੱਚਤਾਂ ਅਤੇ ਰਿਕਵਰੀਆਂ',
    'Historical Recovery Growth (₹ in Crores)': 'ਇਤਿਹਾਸਕ ਰਿਕਵਰੀ ਵਾਧਾ (₹ ਕਰੋੜਾਂ ਵਿੱਚ)',
    'Citizen Portals': 'ਨਾਗਰਿਕ ਪੋਰਟਲ',
    'Public Cyber Safety Analyzer': 'ਪਬਲਿਕ ਸਾਈਬਰ ਸੁਰੱਖਿਆ ਵਿਸ਼ਲੇਸ਼ਕ',
    'PortalDescription': 'ਘੁਟਾਲੇ ਦੇ ਸੰਕੇਤਾਂ ਦੀ ਜਾਂਚ ਕਰਨ ਲਈ ਕਾਲ ਟ੍ਰਾਂਸਕ੍ਰਿਪਟ, ਵਟਸਐਪ ਸੰਦੇਸ਼ ਸਕ੍ਰੀਨਸ਼ੌਟ, ਜਾਂ ਕਰੰਸੀ ਨੋਟ ਅਪਲੋਡ ਕਰੋ।',
    'Generate Immediate SOS': 'ਤੁਰੰਤ SOS ਭੇਜੋ',
    'Threat Verification Console': 'ਖਤਰਾ ਪੁਸ਼ਟੀਕਰਨ ਕੰਸੋਲ',
    'SMS / Text': 'ਐਸ.ਐਮ.ਐਸ. / ਟੈਕਸਟ',
    'WhatsApp Chat': 'ਵਟਸਐਪ ਚੈਟ',
    'Call Audio': 'ਕਾਲ ਆਡੀਓ',
    'Banknote Verify': 'ਕਰੰਸੀ ਨੋਟ ਪੁਸ਼ਟੀਕਰਨ',
    'Suspect Telephone Number / UPI ID': 'ਸ਼ੱਕੀ ਟੈਲੀਫੋਨ ਨੰਬਰ / ਯੂ.ਪੀ.ਆਈ. ਆਈ.ਡੀ.',
    'Enter phone number or UPI handle involved in the threat (Optional)': 'ਖ਼ਤਰੇ ਵਿੱਚ ਸ਼ਾਮਲ ਫ਼ੋਨ ਨੰਬਰ ਜਾਂ ਯੂ.ਪੀ.ਆਈ. ਆਈ.ਡੀ. ਦਰਜ ਕਰੋ (ਵੈਕਲਪਿਕ)',
    'Suspicious Conversation text / Call Transcript': 'ਸ਼ੱਕੀ ਗੱਲਬਾਤ ਟੈਕਸਟ / ਕਾਲ ਟ੍ਰਾਂਸਕ੍ਰਿਪਟ',
    'Paste text message or transcript details here...': 'ਟੈਕਸਟ ਸੁਨੇਹਾ ਜਾਂ ਟ੍ਰਾਂਸਕ੍ਰਿਪਟ ਵੇਰਵੇ ਇੱਥੇ ਪੇਸਟ ਕਰੋ...',
    'Select Image File': 'ਚਿੱਤਰ ਫਾਈਲ ਚੁਣੋ',
    'Select Audio File': 'ਆਡੀਓ ਫਾਈਲ ਚੁਣੋ',
    'Select Note Image': 'ਨੋਟ ਚਿੱਤਰ ਚੁਣੋ',
    'Upload WhatsApp Chat Screenshot': 'ਵਟਸਐਪ ਚੈਟ ਸਕ੍ਰੀਨਸ਼ੌਟ ਅਪਲੋਡ ਕਰੋ',
    'Upload Call Audio Recording': 'ਕਾਲ ਆਡੀਓ ਰਿਕਾਰਡਿੰਗ ਅਪਲੋਡ ਕਰੋ',
    'Upload High Resolution Photo of Banknote': 'ਕਰੰਸੀ ਨੋਟ ਦੀ ਉੱਚ ਰੈਜ਼ੋਲਿਊਸ਼ਨ ਫੋਟੋ ਅਪਲੋड ਕਰੋ',
    'Live Camera Banknote Scanner': 'ਲਾਈਵ ਕੈਮਰਾ ਨੋਟ ਸਕੈਨਰ',
    'Denomination Value': 'ਨੋਟ ਦੀ ਕੀਮਤ',
    'Analyze Scam Markers': 'ਘੁਟਾਲੇ ਦੇ ਸੰਕੇਤਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ',
    'Verifying Authenticity...': 'ਪ੍ਰਮਾਣਿਕਤਾ ਦੀ ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...',
    'Threat Assessment Report': 'ਖਤਰਾ ਮੁਲਾਂਕਣ ਰਿਪੋਰਟ',
    'Nearby Cyber Crime Police Stations': 'ਨਜ਼ਦੀਕੀ ਸਾਈਬਰ ਅਪਰਾਧ ਪੁਲਿਸ ਸਟੇਸ਼ਨ',
    'Locate nearest cell to file physical complaints and receive immediate enforcement support.': 'ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰਵਾਉਣ ਅਤੇ ਤੁਰੰਤ ਮਦਦ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਨਜ਼ਦੀਕੀ ਸਾਈਬਰ ਸੈੱਲ ਲੱਭੋ।',
    'Search city or district...': 'ਸ਼ਹਿਰ ਜਾਂ ਜ਼ਿਲ੍ਹਾ ਖੋਜੋ...',
    'Contact Cyber Cell': 'ਸਾਈਬਰ ਸੈੱਲ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
    'File Official Police Complaint': 'ਅਧਿਕਾਰਤ ਪੁਲਿਸ ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ',
    'Official Police Complaint Filed': 'ਅਧਿਕਾਰਤ ਪੁਲਿਸ ਸ਼ਿਕਾਇਤ ਦਰਜ ਕੀਤੀ ਗਈ',
    'Complaint filed successfully with National Cyber Crime Reporting Portal (I4C). An investigator has been assigned.': 'ਰਾਸ਼ਟਰੀ ਸਾਈਬਰ ਅਪਰਾਧ ਰਿਪੋਰਟਿੰਗ ਪੋਰਟਲ (I4C) ਕੋਲ ਸ਼ਿਕਾਇत ਸਫਲਤਾਪੂਰਵਕ ਦਰਜ ਕੀਤੀ ਗਈ ਹੈ। ਇਕ ਜਾਂਚਕਰਤਾ ਨਿਯੁਕਤ ਕੀਤਾ ਗਿਆ ਹੈ।'
  },
  gu: {
    'Overview': 'અવલોકન',
    'Citizen Portal': 'નાગરિક પોર્ટલ',
    'Cyber Police Cell': 'સાયબર પોલીસ સેલ',
    'Banking Anomaly Hub': 'બેંકિંગ વિસંગતતા હબ',
    'Admin Central': 'એડમિન સેન્ટ્રલ',
    'SOS Emergency': 'SOS કટોકટી',
    'Ministry of Electronics & IT / Cyber Coordination Centre (I4C)': 'ઇલેક્ટ્રોનિક્સ અને આઇટી મંત્રાલય / સાયબર કોઓર્ડિનેશન સેન્ટર (I4C)',
    'CRITICAL HELPLINE: 1930': 'મહત્વપૂર્ણ હેલ્પલાઇન: 1930',
    'Satyameva Jayate': 'સત્યમેવ જયતે',
    'Digital Public Safety Intelligence Platform': 'ડિજિટલ પબ્લિક સેફ્ટી ઇન્ટેલિજન્સ પ્લેટફોર્મ',
    'Intel View': 'ઇન્ટેલ વ્યુ',
    'Govt View': 'સરકારી વ્યુ',
    'AI-First National Cybersecurity Initiative': 'એઆઈ-પ્રથમ રાષ્ટ્રીય સાયબર સુરક્ષા પહેલ',
    'Proactive Public Safety': 'સક્રિય જાહેર સુરક્ષા',
    'Intelligence System': 'ઇન્ટેલિજન્સ સિસ્ટમ',
    'LandingDescription': 'રક્ષક AI ડિજિટલ કૌભાંડોથી ભારતીય નાગરિકો, કાયદા અમલીકરણ એકમો અને બેંકોનું રક્ષણ કરે છે. અમારું પ્લેટફોર્મ ડિજિટલ ધરપકડ, નકલી ચલણી નોટો, મની-મ્યુલ અને ક્લોન કરેલ ડીપફેક અવાજને વાસ્તવિક સમયમાં શોધવા માટે અદ્યતન ન્યુરલ મોડલ્સનો ઉપયોગ કરે છે.',
    'Scan Suspicious Files / SMS': 'શંકાસ્પદ ફાઇલો / એસએમએસ સ્કેન કરો',
    'Explore Fraud Network AI': 'ફ્રોડ નેટવર્ક AI નું અન્વેષણ કરો',
    'National Operations Dashboard': 'રાષ્ટ્રીય કામગીરી ડેશબોર્ડ',
    'Scams Intercepted': 'અટકાવેલા કૌભાંડો',
    'Mule Accounts Flagged': 'ચિહ્નિત મ્યુલ ખાતાઓ',
    'Active Investigations': 'સક્રિય તપાસ',
    'Public Safe-Guard Ledger': 'જાહેર સુરક્ષા બહીખાતું',
    'Emergency Live Ticker Feed': 'કટોકટી લાઇવ ટીકર ફીડ',
    'Cyber Crime Incidents (India Map Visualizer)': 'સાયબર ક્રાઇમ ઘટનાઓ (ઇન્ડિયા મેપ વિઝ્યુલાઇઝર)',
    'Real-time state and regional visual risk mapping.': 'રીઅલ-ટાઇમ રાજ્ય અને પ્રાદેશિક જોખમ મેપિંગ.',
    'Select City': 'શહેર પસંદ કરો',
    'Total Savings & Recoveries Tracked': 'ટ્રેક કરેલી કુલ બચત અને પુનઃપ્રાપ્તિ',
    'Historical Recovery Growth (₹ in Crores)': 'ઐતિહાસિક રિકવરી વૃદ્ધિ (₹ કરોડમાં)',
    'Citizen Portals': 'નાગરિક પોર્ટલ',
    'Public Cyber Safety Analyzer': 'જાહેર સાયબર સુરક્ષા વિશ્લેષક',
    'PortalDescription': 'કૌભાંડના સંકેતો ચકાસવા માટે કૉલ ટ્રાન્સક્રિપ્ટ, વોટ્સએપ મેસેજ સ્ક્રીનશોટ અથવા ચલણી નોટો અપલોડ કરો.',
    'Generate Immediate SOS': 'તાત્કાલિક SOS મોકલો',
    'Threat Verification Console': 'જોખમ ચકાસણી કન્સોલ',
    'SMS / Text': 'એસએમએસ / ટેક્સ્ટ',
    'WhatsApp Chat': 'વોટ્સએપ ચેટ',
    'Call Audio': 'કૉલ ઓડિયો',
    'Banknote Verify': 'ચલણી નોટ ચકાસણી',
    'Suspect Telephone Number / UPI ID': 'શંકાસ્પદ ટેલિફોન નંબર / યુપીઆઈ આઈડી',
    'Enter phone number or UPI handle involved in the threat (Optional)': 'જોખમમાં સામેલ ફોન નંબર અથવા યુપીઆઈ આઈડી દાખલ કરો (વૈકલ્પિક)',
    'Suspicious Conversation text / Call Transcript': 'શંકાસ્પદ વાતચીત લખાણ / કૉલ ટ્રાન્સક્રિપ્ટ',
    'Paste text message or transcript details here...': 'લખાણ સંદેશ અથવા ટ્રાન્સક્રિપ્ટ વિગતો અહીં પેસ્ટ કરો...',
    'Select Image File': 'છબી ફાઇલ પસંદ કરો',
    'Select Audio File': 'ઓડિયો ફાઇલ પસંદ કરો',
    'Select Note Image': 'નોટ છબી પસંદ કરો',
    'Upload WhatsApp Chat Screenshot': 'વોટ્સએપ ચેટ સ્ક્રીનશોટ અપલોડ કરો',
    'Upload Call Audio Recording': 'કૉલ ઓડિયો રેકોર્ડિંગ અપલોડ કરો',
    'Upload High Resolution Photo of Banknote': 'બેંક નોટનો ઉચ્ચ રીઝોલ્યુશન ફોટો અપલોડ કરો',
    'Live Camera Banknote Scanner': 'લાઇવ કેમેરા બેંકનોટ સ્કેનર',
    'Denomination Value': 'મૂલ્ય વર્ગ',
    'Analyze Scam Markers': 'કૌભાંડના ચિહ્નોનું વિશ્લેષણ કરો',
    'Verifying Authenticity...': 'પ્રમાણભૂતતા ચકાસવામાં આવી રહી છે...',
    'Threat Assessment Report': 'જોખમ મૂલ્યાંકન અહેવાલ',
    'Nearby Cyber Crime Police Stations': 'નજીકના સાયબર ક્રાઈમ પોલીસ સ્ટેશન',
    'Locate nearest cell to file physical complaints and receive immediate enforcement support.': 'તકલીફ નોંધાવવા અને તાત્કાલિક સહાય મેળવવા નજીકના સાયબર સેલ શોધો.',
    'Search city or district...': 'શહેર અથવા જિલ્લો શોધો...',
    'Contact Cyber Cell': 'સાયબર સેલનો સંપર્ક કરો',
    'File Official Police Complaint': 'સત્તાવાર પોલીસ ફરિયાદ નોંધાવો',
    'Official Police Complaint Filed': 'સત્તાવાર પોલીસ ફરિયાદ નોંધાઈ',
    'Complaint filed successfully with National Cyber Crime Reporting Portal (I4C). An investigator has been assigned.': 'રાષ્ટ્રીય સાયબર ક્રાઇમ રિપોર્ટિંગ પોર્ટલ (I4C) પર ફરિયાદ સફળતાપૂર્વક નોંધાઈ ગઈ છે. તપાસ અધિકારી નિયુક્ત કરવામાં આવ્યા છે.'
  },
  bn: {
    'Overview': 'সারসংক্ষেপ',
    'Citizen Portal': 'নাগরিক পোর্টাল',
    'Cyber Police Cell': 'সাইবার পুলিশ সেল',
    'Banking Anomaly Hub': 'ব্যাংকিং অনিয়ম হাব',
    'Admin Central': 'অ্যাডমিন সেন্ট্রাল',
    'SOS Emergency': 'SOS জরুরি অবস্থা',
    'Ministry of Electronics & IT / Cyber Coordination Centre (I4C)': 'ইলেকট্রনিক্স ও আইটি মন্ত্রক / সাইবার সমন্বয় কেন্দ্র (I4C)',
    'CRITICAL HELPLINE: 1930': 'গুরুত্বপূর্ণ হেল্পলাইন: 1930',
    'Satyameva Jayate': 'সত্যমেব জয়তে',
    'Digital Public Safety Intelligence Platform': 'ডিজিটাল গণনিরাপত্তা গোয়েন্দা প্ল্যাটফর্ম',
    'Intel View': 'ইন্টেল ভিউ',
    'Govt View': 'সরকারি ভিউ',
    'AI-First National Cybersecurity Initiative': 'এআই-প্রথম জাতীয় সাইবার নিরাপত্তা উদ্যোগ',
    'Proactive Public Safety': 'সক্রিয় জননিরাপত্তা',
    'Intelligence System': 'গোয়েন্দা ব্যবস্থা',
    'LandingDescription': 'রক্ষক এআই ডিজিটাল কেলেঙ্কারী থেকে ভারতীয় নাগরিক, আইন প্রয়োগকারী সংস্থা এবং ব্যাঙ্কগুলিকে রক্ষা করে। আমাদের প্ল্যাটফর্ম ডিজিটাল গ্রেপ্তার, জাল ব্যাংক নোট, মানি-মিউল এবং ক্লোন করা ভয়েস রিয়েল-টাইমে সনাক্ত করতে উন্নত এআই মডেল ব্যবহার করে।',
    'Scan Suspicious Files / SMS': 'সন্দেহজনক ফাইল / এসএমএস স্ক্যান করুন',
    'Explore Fraud Network AI': 'জালিয়াতি নেটওয়ার্ক এআই অন্বেষণ করুন',
    'National Operations Dashboard': 'জাতীয় অপারেশন ড্যাশবোর্ড',
    'Scams Intercepted': 'অবরুদ্ধ কেলেঙ্কারী',
    'Mule Accounts Flagged': 'চিহ্নিত মিউল অ্যাকাউন্ট',
    'Active Investigations': 'সক্রিয় তদন্ত',
    'Public Safe-Guard Ledger': 'জনসাধারণের নিরাপত্তা লেজার',
    'Emergency Live Ticker Feed': 'জরুরি লাইভ টিকার ফিড',
    'Cyber Crime Incidents (India Map Visualizer)': 'সাইবার অপরাধের ঘটনা (ভারত মানচিত্র ভিজ্যুয়ালাইজার)',
    'Real-time state and regional visual risk mapping.': 'রিয়েল-টাইম রাজ্য এবং আঞ্চলিক ভিজ্যুয়াল ঝুঁকি ম্যাপিং।',
    'Select City': 'শহর নির্বাচন করুন',
    'Total Savings & Recoveries Tracked': 'মোট সঞ্চয় ও পুনরুদ্ধার ট্র্যাক করা হয়েছে',
    'Historical Recovery Growth (₹ in Crores)': 'ঐতিহাসিক পুনরুদ্ধার বৃদ্ধি (₹ কোটিতে)',
    'Citizen Portals': 'নাগরিক পোর্টাল',
    'Public Cyber Safety Analyzer': 'পাবলিক সাইবার নিরাপত্তা বিশ্লেষক',
    'PortalDescription': 'জালিয়াতি সনাক্তকরণের জন্য কল ট্রান্সক্রিপ্ট, হোয়াটসঅ্যাপ স্ক্রিনশট বা ব্যাংক নোট আপলোড করুন।',
    'Generate Immediate SOS': 'অবিলম্বে SOS পাঠান',
    'Threat Verification Console': 'হুমকি যাচাইকরণ কনসোল',
    'SMS / Text': 'এসএমএস / টেক্সট',
    'WhatsApp Chat': 'হোয়াটসঅ্যাপ চ্যাট',
    'Call Audio': 'কল অডিও',
    'Banknote Verify': 'ব্যাংক নোট যাচাইকরণ',
    'Suspect Telephone Number / UPI ID': 'সন্দেহভাজন টেলিফোন নম্বর / ইউপিআই আইডি',
    'Enter phone number or UPI handle involved in the threat (Optional)': 'হুমকির সাথে জড়িত ফোন নম্বর বা ইউপিআই আইডি লিখুন (ঐচ্ছিক)',
    'Suspicious Conversation text / Call Transcript': 'সন্দেহজনক কথোপকথন পাঠ্য / কল ট্রান্সক্রিপ্ট',
    'Paste text message or transcript details here...': 'টেক্সট মেসেজ বা ট্রান্সক্রিপ্ট বিবরণ এখানে পেস্ট করুন...',
    'Select Image File': 'ছবি নির্বাচন করুন',
    'Select Audio File': 'অডিও ফাইল নির্বাচন করুন',
    'Select Note Image': 'নোট ছবি নির্বাচন করুন',
    'Upload WhatsApp Chat Screenshot': 'হোয়াটসঅ্যাপ চ্যাট স্ক্রিনশট আপলোড করুন',
    'Upload Call Audio Recording': 'কল অডিও রেকর্ডিং আপলোড করুন',
    'Upload High Resolution Photo of Banknote': 'ব্যাংক নোটের উচ্চ রেজোলিউশনের ছবি আপলোড করুন',
    'Live Camera Banknote Scanner': 'লাইভ ক্যামেরা ব্যাংকনোট স্ক্যানার',
    'Denomination Value': 'মূল্যমান',
    'Analyze Scam Markers': 'কেলেঙ্কারীর লক্ষণ বিশ্লেষণ করুন',
    'Verifying Authenticity...': 'সত্যতা যাচাই করা হচ্ছে...',
    'Threat Assessment Report': 'হুমকি মূল্যায়ন রিপোর্ট',
    'Nearby Cyber Crime Police Stations': 'নিকটস্থ সাইবার অপরাধ থানা',
    'Locate nearest cell to file physical complaints and receive immediate enforcement support.': 'অভিযোগ দায়ের এবং অবিলম্বে সহায়তা পেতে নিকটস্থ সাইবার সেলটি সন্ধান করুন।',
    'Search city or district...': 'শহর বা জেলা খুঁজুন...',
    'Contact Cyber Cell': 'সাইবার সেলের সাথে যোগাযোগ করুন',
    'File Official Police Complaint': 'অফিসিয়াল পুলিশ অভিযোগ দায়ের করুন',
    'Official Police Complaint Filed': 'অফিসিয়াল পুলিশ অভিযোগ দায়ের করা হয়েছে',
    'Complaint filed successfully with National Cyber Crime Reporting Portal (I4C). An investigator has been assigned.': 'ন্যাশনাল সাইবার ক্রাইম রিপোর্টিং পোর্টালে (I4C) অভিযোগটি সফলভাবে দায়ের করা হয়েছে। একজন তদন্তকারী নিযুক্ত করা হয়েছে।'
  },
  or: {
    'Overview': 'ସଂକ୍ଷିପ୍ତ ସୂଚନା',
    'Citizen Portal': 'ନାଗରିକ ପୋର୍ଟାଲ',
    'Cyber Police Cell': 'ସାଇବର ପୋଲିସ ସେଲ୍',
    'Banking Anomaly Hub': 'ବ୍ୟାଙ୍କିଙ୍ଗ ଅସଙ୍ଗତି ହବ୍',
    'Admin Central': 'ଆଡମିନ ସେଣ୍ଟ୍ରାଲ',
    'SOS Emergency': 'SOS ଜରୁରୀକାଳୀନ',
    'Ministry of Electronics & IT / Cyber Coordination Centre (I4C)': 'ଇଲେକ୍ଟ୍ରୋନିକ୍ସ ଏବଂ ଆଇଟି ମନ୍ତ୍ରଣାଳୟ / ସାଇବର ସମନ୍ୱୟ କେନ୍ଦ୍ର (I4C)',
    'CRITICAL HELPLINE: 1930': 'ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ହେଲ୍ପଲାଇନ: 1930',
    'Satyameva Jayate': 'ସତ୍ୟମେବ ଜୟତେ',
    'Digital Public Safety Intelligence Platform': 'ଡିଜିଟାଲ୍ ଜନସାଧାରଣ ସୁରକ୍ଷା ଗୁପ୍ତଚର ପ୍ଲାଟଫର୍ମ',
    'Intel View': 'ଇଣ୍ଟେଲ ଭିୟୁ',
    'Govt View': 'ସରକାରୀ ଭିୟୁ',
    'AI-First National Cybersecurity Initiative': 'AI-ପ୍ରଥମ ଜାତୀୟ ସାଇବର ସୁରକ୍ଷା ପଦକ୍ଷେପ',
    'Proactive Public Safety': 'ସକ୍ରିୟ ଜନସାଧାରଣ ସୁରକ୍ଷା',
    'Intelligence System': 'ଗୁପ୍ତଚର ପ୍ରଣାଳୀ',
    'LandingDescription': 'ରକ୍ଷକ AI ଡିଜିଟାଲ୍ ସ୍କାମରୁ ଭାରତୀୟ ନାଗରିକ, ଆଇନ ପ୍ରଣୟନକାରୀ ଏବଂ ବ୍ୟାଙ୍କଗୁଡ଼ିକୁ ସୁରକ୍ଷିତ ରଖେ। ଆମର ପ୍ଲାଟଫର୍ମ ଡିଜିଟାଲ୍ ଗିରଫ ଭୟ, ନକଲି ନୋଟ୍, ମନି-ମ୍ୟୁଲ୍ ଏବଂ କ୍ଲୋନ ହୋଇଥିବା କଣ୍ଠସ୍ୱକୁ ଚିହ୍ନଟ କରିବାକୁ କୃତ୍ରିମ ବୁଦ୍ଧିମତ୍ତାର ବ୍ୟବହାର କରିଥାଏ।',
    'Scan Suspicious Files / SMS': 'ସନ୍ଦିଗ୍ଧ ଫାଇଲ୍ / SMS ସ୍କାନ କରନ୍ତୁ',
    'Explore Fraud Network AI': 'ଠକେଇ ନେଟୱର୍କ AI ଅନୁସନ୍ଧାନ କରନ୍ତୁ',
    'National Operations Dashboard': 'ଜାତୀୟ କାର୍ଯ୍ୟକ୍ଷମ ଡ୍ୟାସବୋର୍ଡ',
    'Scams Intercepted': 'ଅବରୋଧିତ ଠକେଇ',
    'Mule Accounts Flagged': 'ଚିହ୍ନିତ ମ୍ୟୁଲ୍ ଆକାଉଣ୍ଟ୍',
    'Active Investigations': 'ସକ୍ରିୟ ଅନୁସନ୍ଧାନ',
    'Public Safe-Guard Ledger': 'ଜନସାଧାରଣ ସୁରକ୍ଷା ଖାତା',
    'Emergency Live Ticker Feed': 'ଜରୁରୀକାଳୀନ ଲାଇଭ୍ ଟିକର୍ ଫିଡ୍',
    'Cyber Crime Incidents (India Map Visualizer)': 'ସାଇବର ଅପରାଧ ଘଟଣା (ଭାରତ ମାନଚିତ୍ର ପ୍ରଦର୍ଶନକାରୀ)',
    'Real-time state and regional visual risk mapping.': 'ରିଅଲ୍-ଟାଇମ୍ ରାଜ୍ୟ ଏବଂ ଆଞ୍ଚଳିକ ବିପଦ ମାନଚିତ୍ର।',
    'Select City': 'ସହର ଚୟନ କରନ୍ତୁ',
    'Total Savings & Recoveries Tracked': 'ଟ୍ରାକ୍ ହୋଇଥିବା ମୋଟ ସଞ୍ଚୟ ଏବଂ ପୁନରୁଦ୍ଧାର',
    'Historical Recovery Growth (₹ in Crores)': 'ଐତିହାସିକ ପୁନରୁଦ୍ଧାର ବୃଦ୍ଧି (₹ କୋଟିରେ)',
    'Citizen Portals': 'ନାଗରିକ ପୋର୍ଟାଲ୍',
    'Public Cyber Safety Analyzer': 'ସର୍ବସାଧାରଣ ସାଇବର ସୁରକ୍ଷା ବିଶ୍ଳେଷକ',
    'PortalDescription': 'ଠକେଇ ସଙ୍କେତ ପରୀକ୍ଷା କରିବାକୁ କଲ୍ ଟ୍ରାନ୍ସକ୍ରିପ୍ଟ, ହ୍ୱାଟସଆପ୍ ସ୍କ୍ରିନସଟ୍ କିମ୍ବା ବ୍ୟାଙ୍କ ନୋଟ୍ ଅପଲୋଡ୍ କରନ୍ତୁ।',
    'Generate Immediate SOS': 'ତୁରନ୍ତ SOS ପଠାନ୍ତୁ',
    'Threat Verification Console': 'ବିପଦ ଯାଞ୍ଚ କନସୋଲ୍',
    'SMS / Text': 'SMS / ପାଠ୍ୟ',
    'WhatsApp Chat': 'ହ୍ୱାଟସଆପ୍ ଚାଟ୍',
    'Call Audio': 'କଲ୍ ଅଡିଓ',
    'Banknote Verify': 'ବ୍ୟାଙ୍କ ନୋଟ୍ ଯାଞ୍ଚ',
    'Suspect Telephone Number / UPI ID': 'ସନ୍ଦିଗ୍ଧ ଫୋନ୍ ନମ୍ବର / UPI ଆଇଡି',
    'Enter phone number or UPI handle involved in the threat (Optional)': 'ବିପଦରେ ସଂଶ୍ଳିଷ୍ଟ ଫୋନ୍ ନମ୍ବର କିମ୍ବା UPI ଆଇଡି ପ୍ରବେଶ କରନ୍ତୁ (ବିକଳ୍ପ)',
    'Suspicious Conversation text / Call Transcript': 'ସନ୍ଦିଗ୍ଧ କଥାବାର୍ତ୍ତା / କଲ୍ ଟ୍ରାନ୍ସକ୍ରିପ୍ଟ',
    'Paste text message or transcript details here...': 'ପାଠ୍ୟ ବାର୍ତ୍ତା କିମ୍ବା ଟ୍ରାନ୍ସକ୍ରିପ୍ଟ ବିବରଣୀ ଏଠାରେ ପେଷ୍ଟ କରନ୍ତୁ...',
    'Select Image File': 'ଚିତ୍ର ଫାଇଲ୍ ଚୟନ କରନ୍ତୁ',
    'Select Audio File': 'ଅଡିଓ ଫାଇଲ୍ ଚୟନ କରନ୍ତୁ',
    'Select Note Image': 'ନୋଟ୍ ଚିତ୍ର ଚୟନ କରନ୍ତୁ',
    'Upload WhatsApp Chat Screenshot': 'ହ୍ୱାଟସଆପ୍ ଚାଟ୍ ସ୍କ୍ରିନସଟ୍ ଅପଲୋଡ୍ କରନ୍ତୁ',
    'Upload Call Audio Recording': 'କଲ୍ ଅଡିଓ ରେକର୍ଡିଂ ଅପଲୋଡ୍ କରନ୍ତୁ',
    'Upload High Resolution Photo of Banknote': 'ବ୍ୟାଙ୍କ ନୋଟର ଉଚ୍ଚ ରେଜୋଲ୍ୟୁସନ ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ',
    'Live Camera Banknote Scanner': 'ଲାଇଭ୍ କ୍ୟାମେରା ବ୍ୟାଙ୍କନୋଟ୍ ସ୍କାନର୍',
    'Denomination Value': 'ମୂଲ୍ୟ',
    'Analyze Scam Markers': 'ଠକେଇ ଚିହ୍ନଗୁଡିକ ବିଶ୍ଳେଷଣ କରନ୍ତୁ',
    'Verifying Authenticity...': 'ସତ୍ୟତା ଯାଞ୍ଚ କରାଯାଉଛି...',
    'Threat Assessment Report': 'ବିପଦ ମୂଲ୍ୟାଙ୍କନ ରିପୋର୍ଟ',
    'Nearby Cyber Crime Police Stations': 'ନିକଟସ୍ଥ ସାଇବର ଅପରାଧ ଥାନା',
    'Locate nearest cell to file physical complaints and receive immediate enforcement support.': 'ଅଭିଯୋଗ ଦାଖଲ ଏବଂ ସହାୟତା ପାଇଁ ନିକଟସ୍ଥ ସାଇବର ସେଲ୍ ଖୋଜନ୍ତୁ।',
    'Search city or district...': 'ସହର କିମ୍ବା ଜିଲ୍ଲା ଖୋଜନ୍ତು...',
    'Contact Cyber Cell': 'ସାଇବର ସେଲ୍ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ',
    'File Official Police Complaint': 'ଆଧିକାରିକ ପୋଲିସ ଅଭିଯୋଗ ଦାୟର କରନ୍ତୁ',
    'Official Police Complaint Filed': 'ଆଧିକାରିକ ପୋଲିସ ଅଭିଯୋଗ ଦାୟର ହେଲା',
    'Complaint filed successfully with National Cyber Crime Reporting Portal (I4C). An investigator has been assigned.': 'ଜାତୀୟ ସାଇବର ଅପରାଧ ରିପୋର୍ଟିଂ ପୋର୍ଟାଲରେ ଅଭିଯୋଗ ସଫଳତାର ସହ ଦାଖଲ ହୋଇଛି। ଜଣେ ଅନୁସନ୍ଧାନକାରୀ ନିଯୁକ୍ତ ହୋଇଛନ୍ତି।'
  },
  ur: {
    'Overview': 'خلاصہ',
    'Citizen Portal': 'شہری پورٹل',
    'Cyber Police Cell': 'سائبر پولیس سیل',
    'Banking Anomaly Hub': 'بینکنگ بے ضابطگی مرکز',
    'Admin Central': 'ایڈمن سینٹرل',
    'SOS Emergency': 'SOS ایمرجنسی',
    'Ministry of Electronics & IT / Cyber Coordination Centre (I4C)': 'وزارت الیکٹرانکس اور آئی ٹی / سائبر کوآرڈینیشن سنٹر (I4C)',
    'CRITICAL HELPLINE: 1930': 'اہم ہیلپ لائن: 1930',
    'Satyameva Jayate': 'सत्यमेव जयते',
    'Digital Public Safety Intelligence Platform': 'ڈیجیٹل پبلک سیفٹی انٹیلیجنس پلیٹ فارم',
    'Intel View': 'انٹیل ویو',
    'Govt View': 'سرکاری ویو',
    'AI-First National Cybersecurity Initiative': 'اے آئی-پہلی قومی سائبر سیکیورٹی اقدام',
    'Proactive Public Safety': 'فعال عوامی تحفظ',
    'Intelligence System': 'انٹیلیجنس سسٹم',
    'LandingDescription': 'رکھشک AI بھارتی شہریوں، قانون نافذ کرنے والے اداروں اور بینکوں کو ڈیجیٹل گھوٹالوں سے بچاتا ہے۔ ہمارا پلیٹ فارم ڈیجیٹل گرفتاری، جعلی بینک نوٹ، منی میول، اور کلون شدہ ڈیپ فیک آواز کا حقیقی وقت میں پتہ لگانے کے لیے جدید نیورل ماڈل استعمال کرتا ہے۔',
    'Scan Suspicious Files / SMS': 'مشتبہ فائلیں / ایس ایم ایس اسکین کریں',
    'Explore Fraud Network AI': 'فراڈ نیٹ ورک اے آئی دریافت کریں',
    'National Operations Dashboard': 'قومی آپریشنز ڈیش بورڈ',
    'Scams Intercepted': 'روکے گئے گھوٹالے',
    'Mule Accounts Flagged': 'نشان زد میول اکاؤنٹس',
    'Active Investigations': 'سرگرم تحقیقات',
    'Public Safe-Guard Ledger': 'عوامی تحفظ لیجر',
    'Emergency Live Ticker Feed': 'ایمرجنسی لائیو ٹکر فیڈ',
    'Cyber Crime Incidents (India Map Visualizer)': 'سائبر کرائم کے واقعات (انڈیا میپ ویژولائزر)',
    'Real-time state and regional visual risk mapping.': 'حقیقی وقت کی ریاستی اور علاقائی بصری خطرے کی میپنگ۔',
    'Select City': 'شہر منتخب کریں',
    'Total Savings & Recoveries Tracked': 'ٹریک کردہ کل بچت اور ریکوریاں',
    'Historical Recovery Growth (₹ in Crores)': 'تاریخی ریکوری نمو (₹ کروڑ میں)',
    'Citizen Portals': 'شہری پورٹل',
    'Public Cyber Safety Analyzer': 'عوامی سائبر سیکیورٹی تجزیہ کار',
    'PortalDescription': 'فراڈ کے اشارے جانچنے کے لیے کال ٹرانسکرپٹ، واٹس ایپ اسکرین شاٹ یا بینک نوٹ اپ لوڈ کریں۔',
    'Generate Immediate SOS': 'فوری SOS بھیجیں',
    'Threat Verification Console': 'خطرہ تصدیق کنسول',
    'SMS / Text': 'ایس ایم ایس / متن',
    'WhatsApp Chat': 'واٹس ایپ چیٹ',
    'Call Audio': 'کال آڈیو',
    'Banknote Verify': 'بینک نوٹ تصدیق',
    'Suspect Telephone Number / UPI ID': 'مشتبہ ٹیلی فون نمبر / یو پی آئی آئی ڈی',
    'Enter phone number or UPI handle involved in the threat (Optional)': 'خطرہ میں ملوث فون نمبر یا یو پی آئی ہینڈل درج کریں (اختیاری)',
    'Suspicious Conversation text / Call Transcript': 'مشتبہ گفتگو کا متن / کال ٹرانسکرپٹ',
    'Paste text message or transcript details here...': 'متنی پیغام یا ٹرانسکرپٹ کی تفصیلات یہاں پیسٹ کریں...',
    'Select Image File': 'تصویر فائل منتخب کریں',
    'Select Audio File': 'آڈیو فائل منتخب کریں',
    'Select Note Image': 'نوٹ تصویر منتخب کریں',
    'Upload WhatsApp Chat Screenshot': 'واٹس ایپ چیٹ اسکرین شاٹ اپ لوڈ کریں',
    'Upload Call Audio Recording': 'کال آڈیو ریکارڈنگ اپ لوڈ کریں',
    'Upload High Resolution Photo of Banknote': 'بینک نوٹ کی اعلیٰ ریزولوشن تصویر اپ لوڈ کریں',
    'Live Camera Banknote Scanner': 'لائیو کیمرہ بینک نوٹ اسکینر',
    'Denomination Value': 'نوٹ کی مالیت',
    'Analyze Scam Markers': 'اسکام مارکرز کا تجزیہ کریں',
    'Verifying Authenticity...': 'تصدیق کی جا رہی ہے...',
    'Threat Assessment Report': 'خطرہ تشخیص رپورٹ',
    'Nearby Cyber Crime Police Stations': 'قریبی سائبر کرائم تھانے',
    'Locate nearest cell to file physical complaints and receive immediate enforcement support.': 'شکایات درج کرنے اور فوری مدد حاصل کرنے کے لیے قریبی سائبر سیل تلاش کریں۔',
    'Search city or district...': 'شہر یا ضلع تلاش کریں...',
    'Contact Cyber Cell': 'سائبر سیل سے رابطہ کریں',
    'File Official Police Complaint': 'سرکاری پولیس شکایت درج کریں',
    'Official Police Complaint Filed': 'سرکاری پولیس شکایت درج کی گئی',
    'Complaint filed successfully with National Cyber Crime Reporting Portal (I4C). An investigator has been assigned.': 'شکایت کامیابی کے ساتھ قومی سائبر کرائم رپورٹنگ پورٹل (I4C) پر درج کر دی گئی ہے۔ ایک تفتیشی افسر تفویض کر دیا گیا ہے۔'
  }
};

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setLanguageState] = useState<string>(() => {
    return localStorage.getItem('rakshak_language') || 'en';
  });

  useEffect(() => {
    // 1. Ensure invisible Google Translate container element exists
    // We style it off-screen instead of display: none so the widget layout calculations initialize correctly
    let gtDiv = document.getElementById('google_translate_element');
    if (!gtDiv) {
      gtDiv = document.createElement('div');
      gtDiv.id = 'google_translate_element';
      gtDiv.style.position = 'absolute';
      gtDiv.style.top = '-9999px';
      gtDiv.style.left = '-9999px';
      gtDiv.style.opacity = '0';
      gtDiv.style.pointerEvents = 'none';
      document.body.appendChild(gtDiv);
    }

    // 2. Define global CSS to hide Google Translate banners, hover widgets, and highlights
    const styleId = 'google-translate-hidden-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        .goog-te-banner-frame, .goog-te-banner, .goog-te-balloon, .goog-te-gadget-icon, .goog-te-gadget-simple {
          display: none !important;
          visibility: hidden !important;
        }
        body {
          top: 0px !important;
          position: static !important;
        }
        #goog-gt-tt, .goog-te-tooltip, .goog-te-tooltip:hover, .goog-te-menu-frame, .goog-te-menu-value {
          display: none !important;
          visibility: hidden !important;
        }
        .goog-text-highlight {
          background-color: transparent !important;
          box-shadow: none !important;
          border: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    // 3. Define global googleTranslateElementInit callback
    const initTranslate = () => {
      try {
        if ((window as any).google && (window as any).google.translate) {
          new (window as any).google.translate.TranslateElement({
            pageLanguage: 'en',
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          }, 'google_translate_element');
        }
      } catch (e) {
        console.error("Google Translate init error:", e);
      }
    };

    (window as any).googleTranslateElementInit = initTranslate;

    // 4. Load script if not already present
    const existingScript = document.querySelector('script[src*="translate.google.com"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    } else if ((window as any).google && (window as any).google.translate) {
      initTranslate();
    }

    // 5. Ensure current language cookie is in sync on mount
    const lang = localStorage.getItem('rakshak_language') || 'en';
    if (lang !== 'en') {
      document.cookie = `googtrans=/en/${lang}; path=/; SameSite=None; Secure;`;
      document.cookie = `googtrans=/en/${lang}; path=/;`;
    } else {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    // 6. Polling fallback to programmatically set and trigger the translate select dropdown.
    // This is the absolute bulletproof fallback for cross-origin iframes where cookies might be restricted!
    if (lang !== 'en') {
      let attempts = 0;
      const interval = setInterval(() => {
        const selectEl = document.querySelector('select.goog-te-combo') as HTMLSelectElement;
        if (selectEl) {
          selectEl.value = lang;
          selectEl.dispatchEvent(new Event('change'));
          clearInterval(interval);
        }
        attempts++;
        if (attempts > 30) { // Limit to 15 seconds
          clearInterval(interval);
        }
      }, 500);
    }
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('rakshak_language', lang);

    // Clear existing translation cookies
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure;";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    if (lang !== 'en') {
      // Set the translation cookie with SameSite=None and Secure to allow running inside the development iframe
      document.cookie = `googtrans=/en/${lang}; path=/; SameSite=None; Secure;`;
      document.cookie = `googtrans=/en/${lang}; path=/;`;
    }

    // Try to trigger the Google Translate select dropdown manually before reload
    try {
      const selectEl = document.querySelector('select.goog-te-combo') as HTMLSelectElement;
      if (selectEl) {
        selectEl.value = lang === 'en' ? '' : lang;
        selectEl.dispatchEvent(new Event('change'));
      }
    } catch (err) {
      console.error("Error manual trigger google translate combo:", err);
    }

    // Fast refresh to apply Google Translate across the entire DOM instantly
    window.location.reload();
  };

  const t = (key: string): string => {
    // English is absolute default fallback
    const languageDict = DICTIONARY[currentLanguage] || DICTIONARY['en'];
    return languageDict[key] || DICTIONARY['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for using context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
