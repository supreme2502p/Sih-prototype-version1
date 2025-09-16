export interface TutorialStep {
  id: string
  title: string
  description: string
  icon: string
  details: string[]
  tips?: string[]
}

export const tutorialSteps = {
  en: [
    {
      id: "understand-dbt",
      title: "Understanding DBT",
      description: "Learn what Direct Benefit Transfer means and why it's important",
      icon: "info",
      details: [
        "DBT allows government subsidies to be transferred directly to your bank account",
        "It eliminates middlemen and reduces corruption",
        "Ensures faster and more transparent benefit delivery",
        "Required for receiving LPG subsidies, scholarships, and other government benefits",
      ],
      tips: ["DBT is mandatory for most government schemes", "Your account must be linked to Aadhaar first"],
    },
    {
      id: "check-current-status",
      title: "Check Your Current Status",
      description: "Find out if your account is already DBT-enabled",
      icon: "search",
      details: [
        "Use our account checker tool on the previous page",
        "Enter your 12-digit Aadhaar number",
        "Enter your bank account number",
        "Click 'Check Status' to see your current DBT status",
      ],
      tips: ["Keep your Aadhaar card and bank passbook handy", "Make sure you enter the correct details"],
    },
    {
      id: "gather-documents",
      title: "Gather Required Documents",
      description: "Collect all necessary documents before visiting the bank",
      icon: "file",
      details: [
        "Original Aadhaar card and a photocopy",
        "Bank passbook or account statement",
        "PAN card (if available)",
        "Recent passport-size photograph",
        "Mobile number linked to Aadhaar",
      ],
      tips: ["Ensure your mobile number is updated in Aadhaar", "Carry both original and photocopies of all documents"],
    },
    {
      id: "visit-bank",
      title: "Visit Your Bank Branch",
      description: "Go to your bank branch to enable DBT",
      icon: "building",
      details: [
        "Visit the branch where you opened your account",
        "Ask for the DBT enablement form at the customer service desk",
        "Fill the form completely with accurate information",
        "Submit the form along with required documents",
        "Get an acknowledgment receipt",
      ],
      tips: ["Visit during working hours (usually 10 AM to 4 PM)", "Carry a pen and be prepared to wait in queue"],
    },
    {
      id: "verification-process",
      title: "Verification Process",
      description: "Understand what happens after form submission",
      icon: "check",
      details: [
        "Bank will verify your Aadhaar details with UIDAI",
        "Your account details will be cross-checked",
        "Bank will update your account status in their system",
        "You may receive SMS confirmation once enabled",
        "Process typically takes 2-3 working days",
      ],
      tips: ["Keep your mobile phone active for SMS updates", "You can check status again using our tool after 3 days"],
    },
    {
      id: "post-enablement",
      title: "After DBT Enablement",
      description: "What to expect once your account is DBT-enabled",
      icon: "success",
      details: [
        "You'll start receiving government benefits directly",
        "LPG subsidies will be credited to your account",
        "Scholarship amounts will be transferred directly",
        "No need to visit offices for benefit collection",
        "You can track all transactions in your bank statement",
      ],
      tips: [
        "Monitor your account regularly for benefit credits",
        "Contact bank if you don't receive expected benefits",
      ],
    },
  ],
  hi: [
    {
      id: "understand-dbt",
      title: "डीबीटी को समझना",
      description: "जानें कि प्रत्यक्ष लाभ हस्तांतरण का क्या मतलब है और यह क्यों महत्वपूर्ण है",
      icon: "info",
      details: [
        "डीबीटी सरकारी सब्सिडी को सीधे आपके बैंक खाते में स्थानांतरित करने की अनुमति देता है",
        "यह बिचौलियों को समाप्त करता है और भ्रष्टाचार को कम करता है",
        "तेज़ और अधिक पारदर्शी लाभ वितरण सुनिश्चित करता है",
        "एलपीजी सब्सिडी, छात्रवृत्ति और अन्य सरकारी लाभ प्राप्त करने के लिए आवश्यक",
      ],
      tips: ["अधिकांश सरकारी योजनाओं के लिए डीबीटी अनिवार्य है", "आपका खाता पहले आधार से जुड़ा होना चाहिए"],
    },
    {
      id: "check-current-status",
      title: "अपनी वर्तमान स्थिति जांचें",
      description: "पता करें कि क्या आपका खाता पहले से डीबीटी-सक्षम है",
      icon: "search",
      details: [
        "पिछले पेज पर हमारे खाता जांचकर्ता उपकरण का उपयोग करें",
        "अपना 12-अंकीय आधार नंबर दर्ज करें",
        "अपना बैंक खाता नंबर दर्ज करें",
        "अपनी वर्तमान डीबीटी स्थिति देखने के लिए 'स्थिति जांचें' पर क्लिक करें",
      ],
      tips: ["अपना आधार कार्ड और बैंक पासबुक तैयार रखें", "सुनिश्चित करें कि आप सही विवरण दर्ज करते हैं"],
    },
    {
      id: "gather-documents",
      title: "आवश्यक दस्तावेज़ इकट्ठे करें",
      description: "बैंक जाने से पहले सभी आवश्यक दस्तावेज़ एकत्र करें",
      icon: "file",
      details: [
        "मूल आधार कार्ड और एक फोटोकॉपी",
        "बैंक पासबुक या खाता विवरण",
        "पैन कार्ड (यदि उपलब्ध हो)",
        "हाल की पासपोर्ट साइज़ फोटो",
        "आधार से जुड़ा मोबाइल नंबर",
      ],
      tips: ["सुनिश्चित करें कि आपका मोबाइल नंबर आधार में अपडेट है", "सभी दस्तावेज़ों की मूल और फोटोकॉपी दोनों ले जाएं"],
    },
    {
      id: "visit-bank",
      title: "अपनी बैंक शाखा में जाएं",
      description: "डीबीटी सक्षम करने के लिए अपनी बैंक शाखा में जाएं",
      icon: "building",
      details: [
        "उस शाखा में जाएं जहां आपने अपना खाता खोला था",
        "ग्राहक सेवा डेस्क पर डीबीटी सक्षमता फॉर्म मांगें",
        "सटीक जानकारी के साथ फॉर्म पूरी तरह भरें",
        "आवश्यक दस्तावेज़ों के साथ फॉर्म जमा करें",
        "पावती रसीद प्राप्त करें",
      ],
      tips: ["कार्य समय के दौरान जाएं (आमतौर पर सुबह 10 बजे से शाम 4 बजे तक)", "पेन ले जाएं और कतार में इंतज़ार करने के लिए तैयार रहें"],
    },
    {
      id: "verification-process",
      title: "सत्यापन प्रक्रिया",
      description: "फॉर्म जमा करने के बाद क्या होता है, यह समझें",
      icon: "check",
      details: [
        "बैंक UIDAI के साथ आपके आधार विवरण सत्यापित करेगा",
        "आपके खाते के विवरण की जांच की जाएगी",
        "बैंक अपने सिस्टम में आपके खाते की स्थिति अपडेट करेगा",
        "सक्षम होने पर आपको SMS पुष्टि मिल सकती है",
        "प्रक्रिया में आमतौर पर 2-3 कार्य दिवस लगते हैं",
      ],
      tips: ["SMS अपडेट के लिए अपना मोबाइल फोन सक्रिय रखें", "3 दिन बाद हमारे उपकरण का उपयोग करके फिर से स्थिति जांच सकते हैं"],
    },
    {
      id: "post-enablement",
      title: "डीबीटी सक्षम करने के बाद",
      description: "एक बार आपका खाता डीबीटी-सक्षम हो जाने पर क्या उम्मीद करें",
      icon: "success",
      details: [
        "आपको सरकारी लाभ सीधे मिलना शुरू हो जाएगा",
        "एलपीजी सब्सिडी आपके खाते में जमा होगी",
        "छात्रवृत्ति की राशि सीधे स्थानांतरित होगी",
        "लाभ संग्रह के लिए कार्यालयों में जाने की आवश्यकता नहीं",
        "आप अपने बैंक स्टेटमेंट में सभी लेनदेन ट्रैक कर सकते हैं",
      ],
      tips: ["लाभ क्रेडिट के लिए नियमित रूप से अपने खाते की निगरानी करें", "यदि आपको अपेक्षित लाभ नहीं मिलता है तो बैंक से संपर्क करें"],
    },
  ],
}

export function getTutorialSteps(language: "en" | "hi"): TutorialStep[] {
  return tutorialSteps[language]
}
