export type Language = "en" | "hi" | "mr";

export type TranslationKey =
  | "appName"
  | "heroSubtitle"
  | "liveMonitoring"
  | "logout"
  | "loading"
  | "systemCapacity"
  | "estimatedPanels"
  | "panels"
  | "currentOutput"
  | "todaysProduction"
  | "systemEfficiency"
  | "monthlyTotal"
  | "realTimePower"
  | "accumulatedEnergy"
  | "panelPerformance"
  | "totalEnergyMonth"
  | "weatherConditions"
  | "cloudCover"
  | "windSpeed"
  | "solarEfficiency"
  | "clearSky"
  | "partlyCloudy"
  | "foggy"
  | "rainy"
  | "snowy"
  | "stormy"
  | "locationRequired"
  | "enableLocation"
  | "costSavings"
  | "basedOnRates"
  | "thisMonthSavings"
  | "generated"
  | "dailyAverage"
  | "yearlyProjection"
  | "howMuchSaving"
  | "gridCost"
  | "solarCost"
  | "netSavings"
  | "envImpact"
  | "co2Offset"
  | "smartAlerts"
  | "noAlerts"
  | "generateAlerts"
  | "refreshAlerts"
  | "production"
  | "weather"
  | "performance"
  | "maintenance"
  | "optimization"
  | "panelOrientation"
  | "orientationDesc"
  | "directionAzimuth"
  | "tiltAngle"
  | "fromHorizontal"
  | "optimalSettings"
  | "directionSouth"
  | "tiltLatitude"
  | "efficiencyOptimal"
  | "solarPanel"
  | "directionIndicator"
  | "energyProduction"
  | "day"
  | "week"
  | "month"
  | "configureSystem"
  | "configureDesc"
  | "systemCapacityKw"
  | "systemTypeSmall"
  | "systemTypeMedium"
  | "systemTypeLarge"
  | "systemTypeCommercial"
  | "systemTypeIndustrial"
  | "dailyProductionAvg"
  | "saveConfiguration"
  | "saving"
  | "typicalRange"
  | "systemType"
  | "started"
  | "optimal"
  | "good"
  | "fair"
  | "poor"
  | "navDashboard"
  | "navReports"
  | "navConfigure"
  | "navHelp"
  | "footerTagline"
  | "quickLinks"
  | "privacyPolicy"
  | "termsOfService"
  | "contactUs"
  | "allRightsReserved"
  | "environmentalImpact"
  | "co2SavedMonth"
  | "treesEquivalent"
  | "coalAvoided"
  | "co2Saved"
  | "language"
  | "theme"
  | "reportsSubtitle"
  | "configureSubtitle"
  | "userGuide"
  | "userGuideSubtitle"
  | "helpDashboardTitle"
  | "helpDashboardDesc"
  | "helpReportsTitle"
  | "helpReportsDesc"
  | "helpConfigureTitle"
  | "helpConfigureDesc"
  | "helpWeatherTitle"
  | "helpWeatherDesc"
  | "helpAlertsTitle"
  | "helpAlertsDesc"
  | "helpSavingsTitle"
  | "helpSavingsDesc"
  | "faqTitle"
  | "faq1Q"
  | "faq1A"
  | "faq2Q"
  | "faq2A"
  | "faq3Q"
  | "faq3A"
  | "faq4Q"
  | "faq4A";

type Translations = Record<Language, Record<TranslationKey, string>>;

export const translations: Translations = {
  en: {
    appName: "Sun Peek Insight",
    heroSubtitle: "Monitor your solar panel performance in real-time. Track energy production, weather conditions, and optimize your solar efficiency.",
    liveMonitoring: "Live Monitoring Active",
    logout: "Logout",
    loading: "Loading...",
    systemCapacity: "System Capacity",
    estimatedPanels: "Estimated Panels",
    panels: "panels",
    currentOutput: "Current Output",
    todaysProduction: "Today's Production",
    systemEfficiency: "System Efficiency",
    monthlyTotal: "Monthly Total",
    realTimePower: "Real-time power generation",
    accumulatedEnergy: "Accumulated energy today",
    panelPerformance: "Panel performance rating",
    totalEnergyMonth: "Total energy this month",
    weatherConditions: "Weather Conditions",
    cloudCover: "Cloud Cover",
    windSpeed: "Wind Speed",
    solarEfficiency: "Solar Efficiency",
    clearSky: "Clear Sky",
    partlyCloudy: "Partly Cloudy",
    foggy: "Foggy",
    rainy: "Rainy",
    snowy: "Snowy",
    stormy: "Stormy",
    locationRequired: "Location access is required to show weather data",
    enableLocation: "Enable Location",
    costSavings: "Cost Savings Calculator",
    basedOnRates: "Based on Mumbai electricity rates",
    thisMonthSavings: "This Month's Savings",
    generated: "generated",
    dailyAverage: "Daily Average",
    yearlyProjection: "Yearly Projection",
    howMuchSaving: "How much you're saving:",
    gridCost: "Grid electricity cost",
    solarCost: "Your solar cost",
    netSavings: "Net savings",
    envImpact: "Environmental Impact",
    co2Offset: "You've offset approximately",
    smartAlerts: "Smart Alerts",
    noAlerts: "No alerts at this time",
    generateAlerts: "Generate alerts",
    refreshAlerts: "Refresh alerts with latest weather data",
    production: "Production",
    weather: "Weather",
    performance: "Performance",
    maintenance: "Maintenance",
    optimization: "Optimization",
    panelOrientation: "Panel Orientation",
    orientationDesc: "Adjust the direction and angle of your solar panels for optimal energy production",
    directionAzimuth: "Direction (Azimuth)",
    tiltAngle: "Tilt Angle",
    fromHorizontal: "from horizontal",
    optimalSettings: "Mumbai Optimal Settings:",
    directionSouth: "Direction: 180° (South-facing)",
    tiltLatitude: "Tilt: 19° (matches latitude)",
    efficiencyOptimal: "Efficiency: ~100% at these settings",
    solarPanel: "Solar Panel",
    directionIndicator: "Direction Indicator",
    energyProduction: "Energy Production",
    day: "Day",
    week: "Week",
    month: "Month",
    configureSystem: "Configure Your Solar System",
    configureDesc: "Enter your solar panel system capacity to get accurate production estimates and savings calculations.",
    systemCapacityKw: "System Capacity (kW)",
    systemTypeSmall: "Small",
    systemTypeMedium: "Medium",
    systemTypeLarge: "Large",
    systemTypeCommercial: "Commercial",
    systemTypeIndustrial: "Industrial",
    dailyProductionAvg: "Daily Production (avg):",
    saveConfiguration: "Save Configuration",
    saving: "Saving...",
    typicalRange: "Typical residential systems range from 3-10 kW. Commercial systems can be up to 100 kW.",
    systemType: "System Type:",
    started: "Started:",
    optimal: "Optimal",
    good: "Good",
    fair: "Fair",
    poor: "Poor",
    navDashboard: "Dashboard",
    navReports: "Reports",
    navConfigure: "Configure",
    navHelp: "Help",
    footerTagline: "Professional solar monitoring for smarter energy decisions. Track, optimize, and save with real-time insights.",
    quickLinks: "Quick Links",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    contactUs: "Contact Us",
    allRightsReserved: "All rights reserved.",
    environmentalImpact: "Environmental Impact",
    co2SavedMonth: "CO₂ saved this month",
    treesEquivalent: "Trees equivalent",
    coalAvoided: "Coal avoided",
    co2Saved: "CO₂ Saved",
    language: "Language",
    theme: "Theme",
    reportsSubtitle: "View smart alerts, environmental impact, and cost savings analysis.",
    configureSubtitle: "Set up your solar panel system, orientation, and configuration.",
    userGuide: "User Guide",
    userGuideSubtitle: "Learn how to use Sun Peek Insight to monitor and optimize your solar system.",
    helpDashboardTitle: "Dashboard",
    helpDashboardDesc: "The Dashboard shows real-time energy stats, performance charts, and weather data. It gives you an overview of your system's current output and monthly totals.",
    helpReportsTitle: "Reports",
    helpReportsDesc: "Reports contain smart alerts about your system, environmental impact metrics (CO₂ saved, trees equivalent), and a detailed cost savings calculator.",
    helpConfigureTitle: "Configure",
    helpConfigureDesc: "Configure your solar system capacity, panel orientation (azimuth and tilt angle), and view the 2D panel visualization to optimize your setup.",
    helpWeatherTitle: "Weather Data",
    helpWeatherDesc: "Weather data is fetched using your location. It shows temperature, cloud cover, wind speed, and estimated solar efficiency based on current conditions.",
    helpAlertsTitle: "Smart Alerts",
    helpAlertsDesc: "Smart alerts are generated daily based on weather conditions and your system performance. They include production tips, maintenance reminders, and optimization suggestions.",
    helpSavingsTitle: "Cost Savings",
    helpSavingsDesc: "The cost savings calculator estimates your monthly and yearly savings based on Mumbai electricity rates (₹8.50/kWh) and your system's energy production.",
    faqTitle: "Frequently Asked Questions",
    faq1Q: "How accurate are the energy production estimates?",
    faq1A: "Estimates are based on your system capacity, panel orientation, and real-time weather data. Actual production may vary by 5-15% depending on panel condition and local shading.",
    faq2Q: "How do I change my solar system size?",
    faq2A: "Go to the Configure tab and use the system capacity slider to adjust your panel size. Changes are saved automatically to your account.",
    faq3Q: "Why does the app need my location?",
    faq3A: "Location is used to fetch local weather data, which helps calculate accurate solar efficiency estimates based on cloud cover, temperature, and sun position.",
    faq4Q: "How are cost savings calculated?",
    faq4A: "Savings are calculated by multiplying your estimated energy production (kWh) by the local electricity rate (₹8.50/kWh for Mumbai). This represents what you would have paid to the grid.",
  },
  hi: {
    appName: "सन पीक इनसाइट",
    heroSubtitle: "अपने सोलर पैनल के प्रदर्शन की रीयल-टाइम निगरानी करें। ऊर्जा उत्पादन, मौसम की स्थिति ट्रैक करें और अपनी सोलर दक्षता बढ़ाएं।",
    liveMonitoring: "लाइव मॉनिटरिंग सक्रिय",
    logout: "लॉगआउट",
    loading: "लोड हो रहा है...",
    systemCapacity: "सिस्टम क्षमता",
    estimatedPanels: "अनुमानित पैनल",
    panels: "पैनल",
    currentOutput: "वर्तमान आउटपुट",
    todaysProduction: "आज का उत्पादन",
    systemEfficiency: "सिस्टम दक्षता",
    monthlyTotal: "मासिक कुल",
    realTimePower: "रीयल-टाइम बिजली उत्पादन",
    accumulatedEnergy: "आज की संचित ऊर्जा",
    panelPerformance: "पैनल प्रदर्शन रेटिंग",
    totalEnergyMonth: "इस महीने की कुल ऊर्जा",
    weatherConditions: "मौसम की स्थिति",
    cloudCover: "बादल आवरण",
    windSpeed: "हवा की गति",
    solarEfficiency: "सोलर दक्षता",
    clearSky: "साफ आसमान",
    partlyCloudy: "आंशिक बादल",
    foggy: "कोहरा",
    rainy: "बारिश",
    snowy: "बर्फबारी",
    stormy: "तूफानी",
    locationRequired: "मौसम डेटा दिखाने के लिए स्थान अनुमति आवश्यक है",
    enableLocation: "स्थान सक्षम करें",
    costSavings: "लागत बचत कैलकुलेटर",
    basedOnRates: "मुंबई बिजली दरों पर आधारित",
    thisMonthSavings: "इस महीने की बचत",
    generated: "उत्पादित",
    dailyAverage: "दैनिक औसत",
    yearlyProjection: "वार्षिक अनुमान",
    howMuchSaving: "आप कितना बचा रहे हैं:",
    gridCost: "ग्रिड बिजली लागत",
    solarCost: "आपकी सोलर लागत",
    netSavings: "शुद्ध बचत",
    envImpact: "पर्यावरणीय प्रभाव",
    co2Offset: "आपने लगभग ऑफसेट किया",
    smartAlerts: "स्मार्ट अलर्ट",
    noAlerts: "इस समय कोई अलर्ट नहीं",
    generateAlerts: "अलर्ट जनरेट करें",
    refreshAlerts: "नवीनतम मौसम डेटा के साथ अलर्ट रिफ्रेश करें",
    production: "उत्पादन",
    weather: "मौसम",
    performance: "प्रदर्शन",
    maintenance: "रखरखाव",
    optimization: "अनुकूलन",
    panelOrientation: "पैनल अभिविन्यास",
    orientationDesc: "इष्टतम ऊर्जा उत्पादन के लिए अपने सोलर पैनलों की दिशा और कोण समायोजित करें",
    directionAzimuth: "दिशा (अज़ीमथ)",
    tiltAngle: "झुकाव कोण",
    fromHorizontal: "क्षैतिज से",
    optimalSettings: "मुंबई इष्टतम सेटिंग्स:",
    directionSouth: "दिशा: 180° (दक्षिण-मुखी)",
    tiltLatitude: "झुकाव: 19° (अक्षांश अनुसार)",
    efficiencyOptimal: "दक्षता: इन सेटिंग्स पर ~100%",
    solarPanel: "सोलर पैनल",
    directionIndicator: "दिशा संकेतक",
    energyProduction: "ऊर्जा उत्पादन",
    day: "दिन",
    week: "सप्ताह",
    month: "महीना",
    configureSystem: "अपना सोलर सिस्टम कॉन्फ़िगर करें",
    configureDesc: "सटीक उत्पादन अनुमान और बचत गणना प्राप्त करने के लिए अपने सोलर पैनल सिस्टम की क्षमता दर्ज करें।",
    systemCapacityKw: "सिस्टम क्षमता (kW)",
    systemTypeSmall: "छोटा",
    systemTypeMedium: "मध्यम",
    systemTypeLarge: "बड़ा",
    systemTypeCommercial: "व्यावसायिक",
    systemTypeIndustrial: "औद्योगिक",
    dailyProductionAvg: "दैनिक उत्पादन (औसत):",
    saveConfiguration: "कॉन्फ़िगरेशन सहेजें",
    saving: "सहेज रहा है...",
    typicalRange: "सामान्य आवासीय सिस्टम 3-10 kW तक होते हैं। व्यावसायिक सिस्टम 100 kW तक हो सकते हैं।",
    systemType: "सिस्टम प्रकार:",
    started: "शुरू:",
    optimal: "इष्टतम",
    good: "अच्छा",
    fair: "ठीक",
    poor: "खराब",
    navDashboard: "डैशबोर्ड",
    navReports: "रिपोर्ट",
    navConfigure: "कॉन्फ़िगर",
    navHelp: "सहायता",
    footerTagline: "स्मार्ट ऊर्जा निर्णयों के लिए पेशेवर सोलर मॉनिटरिंग। रीयल-टाइम इनसाइट के साथ ट्रैक करें, ऑप्टिमाइज़ करें और बचत करें।",
    quickLinks: "त्वरित लिंक",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",
    contactUs: "संपर्क करें",
    allRightsReserved: "सर्वाधिकार सुरक्षित।",
    environmentalImpact: "पर्यावरणीय प्रभाव",
    co2SavedMonth: "इस महीने CO₂ बचत",
    treesEquivalent: "पेड़ों के बराबर",
    coalAvoided: "कोयला बचाया",
    co2Saved: "CO₂ बचत",
    language: "भाषा",
    theme: "थीम",
    reportsSubtitle: "स्मार्ट अलर्ट, पर्यावरणीय प्रभाव और लागत बचत विश्लेषण देखें।",
    configureSubtitle: "अपना सोलर पैनल सिस्टम, ओरिएंटेशन और कॉन्फ़िगरेशन सेट करें।",
    userGuide: "उपयोगकर्ता गाइड",
    userGuideSubtitle: "अपने सोलर सिस्टम की निगरानी और अनुकूलन के लिए Sun Peek Insight का उपयोग करना सीखें।",
    helpDashboardTitle: "डैशबोर्ड",
    helpDashboardDesc: "डैशबोर्ड रीयल-टाइम ऊर्जा आंकड़े, प्रदर्शन चार्ट और मौसम डेटा दिखाता है।",
    helpReportsTitle: "रिपोर्ट",
    helpReportsDesc: "रिपोर्ट में स्मार्ट अलर्ट, पर्यावरणीय प्रभाव मेट्रिक्स और विस्तृत लागत बचत कैलकुलेटर शामिल हैं।",
    helpConfigureTitle: "कॉन्फ़िगर",
    helpConfigureDesc: "अपने सोलर सिस्टम की क्षमता, पैनल ओरिएंटेशन और 2D पैनल विज़ुअलाइज़ेशन कॉन्फ़िगर करें।",
    helpWeatherTitle: "मौसम डेटा",
    helpWeatherDesc: "मौसम डेटा आपके स्थान का उपयोग करके प्राप्त किया जाता है। यह तापमान, बादल आवरण और सोलर दक्षता दिखाता है।",
    helpAlertsTitle: "स्मार्ट अलर्ट",
    helpAlertsDesc: "स्मार्ट अलर्ट मौसम और सिस्टम प्रदर्शन के आधार पर दैनिक उत्पन्न होते हैं।",
    helpSavingsTitle: "लागत बचत",
    helpSavingsDesc: "लागत बचत कैलकुलेटर मुंबई बिजली दरों के आधार पर आपकी मासिक और वार्षिक बचत का अनुमान लगाता है।",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    faq1Q: "ऊर्जा उत्पादन अनुमान कितने सटीक हैं?",
    faq1A: "अनुमान आपकी सिस्टम क्षमता, पैनल ओरिएंटेशन और रीयल-टाइम मौसम डेटा पर आधारित हैं। वास्तविक उत्पादन 5-15% भिन्न हो सकता है।",
    faq2Q: "मैं अपना सोलर सिस्टम साइज़ कैसे बदलूं?",
    faq2A: "कॉन्फ़िगर टैब पर जाएं और सिस्टम क्षमता स्लाइडर का उपयोग करें।",
    faq3Q: "ऐप को मेरे स्थान की आवश्यकता क्यों है?",
    faq3A: "स्थान का उपयोग स्थानीय मौसम डेटा प्राप्त करने के लिए किया जाता है जो सटीक सोलर दक्षता अनुमान में मदद करता है।",
    faq4Q: "लागत बचत की गणना कैसे होती है?",
    faq4A: "बचत की गणना आपके अनुमानित ऊर्जा उत्पादन (kWh) को स्थानीय बिजली दर (₹8.50/kWh) से गुणा करके की जाती है।",
  },
  mr: {
    appName: "सन पीक इनसाइट",
    heroSubtitle: "तुमच्या सोलर पॅनेलच्या कामगिरीवर रिअल-टाइम लक्ष ठेवा. ऊर्जा उत्पादन, हवामान स्थिती ट्रॅक करा आणि तुमची सोलर कार्यक्षमता वाढवा.",
    liveMonitoring: "लाइव मॉनिटरिंग सक्रिय",
    logout: "लॉगआउट",
    loading: "लोड होत आहे...",
    systemCapacity: "सिस्टम क्षमता",
    estimatedPanels: "अंदाजित पॅनेल",
    panels: "पॅनेल",
    currentOutput: "सध्याचे आउटपुट",
    todaysProduction: "आजचे उत्पादन",
    systemEfficiency: "सिस्टम कार्यक्षमता",
    monthlyTotal: "मासिक एकूण",
    realTimePower: "रिअल-टाइम वीज उत्पादन",
    accumulatedEnergy: "आजची एकूण ऊर्जा",
    panelPerformance: "पॅनेल कामगिरी रेटिंग",
    totalEnergyMonth: "या महिन्याची एकूण ऊर्जा",
    weatherConditions: "हवामान स्थिती",
    cloudCover: "ढगांचे आवरण",
    windSpeed: "वाऱ्याचा वेग",
    solarEfficiency: "सोलर कार्यक्षमता",
    clearSky: "स्वच्छ आकाश",
    partlyCloudy: "अंशतः ढगाळ",
    foggy: "धुके",
    rainy: "पाऊस",
    snowy: "बर्फवृष्टी",
    stormy: "वादळी",
    locationRequired: "हवामान डेटा दाखवण्यासाठी स्थान परवानगी आवश्यक आहे",
    enableLocation: "स्थान सक्षम करा",
    costSavings: "खर्च बचत कॅल्क्युलेटर",
    basedOnRates: "मुंबई वीज दरांवर आधारित",
    thisMonthSavings: "या महिन्याची बचत",
    generated: "उत्पादित",
    dailyAverage: "दैनंदिन सरासरी",
    yearlyProjection: "वार्षिक अंदाज",
    howMuchSaving: "तुम्ही किती बचत करत आहात:",
    gridCost: "ग्रिड वीज खर्च",
    solarCost: "तुमचा सोलर खर्च",
    netSavings: "निव्वळ बचत",
    envImpact: "पर्यावरणीय प्रभाव",
    co2Offset: "तुम्ही अंदाजे ऑफसेट केले",
    smartAlerts: "स्मार्ट अलर्ट",
    noAlerts: "सध्या कोणतेही अलर्ट नाहीत",
    generateAlerts: "अलर्ट तयार करा",
    refreshAlerts: "नवीनतम हवामान डेटासह अलर्ट रिफ्रेश करा",
    production: "उत्पादन",
    weather: "हवामान",
    performance: "कामगिरी",
    maintenance: "देखभाल",
    optimization: "ऑप्टिमायझेशन",
    panelOrientation: "पॅनेल अभिमुखता",
    orientationDesc: "इष्टतम ऊर्जा उत्पादनासाठी तुमच्या सोलर पॅनेलची दिशा आणि कोन समायोजित करा",
    directionAzimuth: "दिशा (अझिमथ)",
    tiltAngle: "झुकाव कोन",
    fromHorizontal: "क्षैतिज पासून",
    optimalSettings: "मुंबई इष्टतम सेटिंग्ज:",
    directionSouth: "दिशा: 180° (दक्षिणमुखी)",
    tiltLatitude: "झुकाव: 19° (अक्षांशानुसार)",
    efficiencyOptimal: "कार्यक्षमता: या सेटिंग्जवर ~100%",
    solarPanel: "सोलर पॅनेल",
    directionIndicator: "दिशा निर्देशक",
    energyProduction: "ऊर्जा उत्पादन",
    day: "दिवस",
    week: "आठवडा",
    month: "महिना",
    configureSystem: "तुमची सोलर सिस्टम कॉन्फिगर करा",
    configureDesc: "अचूक उत्पादन अंदाज आणि बचत गणना मिळवण्यासाठी तुमच्या सोलर पॅनेल सिस्टमची क्षमता प्रविष्ट करा.",
    systemCapacityKw: "सिस्टम क्षमता (kW)",
    systemTypeSmall: "लहान",
    systemTypeMedium: "मध्यम",
    systemTypeLarge: "मोठे",
    systemTypeCommercial: "व्यावसायिक",
    systemTypeIndustrial: "औद्योगिक",
    dailyProductionAvg: "दैनंदिन उत्पादन (सरासरी):",
    saveConfiguration: "कॉन्फिगरेशन सेव्ह करा",
    saving: "सेव्ह होत आहे...",
    typicalRange: "सामान्य निवासी सिस्टम 3-10 kW असतात. व्यावसायिक सिस्टम 100 kW पर्यंत असू शकतात.",
    systemType: "सिस्टम प्रकार:",
    started: "सुरुवात:",
    optimal: "इष्टतम",
    good: "चांगले",
    fair: "ठीक",
    poor: "खराब",
    navDashboard: "डॅशबोर्ड",
    navReports: "अहवाल",
    navConfigure: "कॉन्फिगर",
    navHelp: "मदत",
    footerTagline: "स्मार्ट ऊर्जा निर्णयांसाठी व्यावसायिक सोलर मॉनिटरिंग. रिअल-टाइम इनसाइट्ससह ट्रॅक करा, ऑप्टिमाइझ करा आणि बचत करा.",
    quickLinks: "द्रुत लिंक्स",
    privacyPolicy: "गोपनीयता धोरण",
    termsOfService: "सेवा अटी",
    contactUs: "संपर्क करा",
    allRightsReserved: "सर्व हक्क राखीव.",
    environmentalImpact: "पर्यावरणीय प्रभाव",
    co2SavedMonth: "या महिन्यात CO₂ बचत",
    treesEquivalent: "झाडांच्या बरोबरीचे",
    coalAvoided: "कोळसा टाळला",
    co2Saved: "CO₂ बचत",
    language: "भाषा",
    theme: "थीम",
    reportsSubtitle: "स्मार्ट अलर्ट, पर्यावरणीय प्रभाव आणि खर्च बचत विश्लेषण पहा.",
    configureSubtitle: "तुमची सोलर पॅनेल सिस्टम, अभिमुखता आणि कॉन्फिगरेशन सेट करा.",
    userGuide: "वापरकर्ता मार्गदर्शिका",
    userGuideSubtitle: "तुमच्या सोलर सिस्टमचे निरीक्षण आणि ऑप्टिमायझेशन करण्यासाठी Sun Peek Insight कसे वापरावे ते शिका.",
    helpDashboardTitle: "डॅशबोर्ड",
    helpDashboardDesc: "डॅशबोर्ड रिअल-टाइम ऊर्जा आकडेवारी, कामगिरी चार्ट आणि हवामान डेटा दाखवतो.",
    helpReportsTitle: "अहवाल",
    helpReportsDesc: "अहवालांमध्ये स्मार्ट अलर्ट, पर्यावरणीय प्रभाव मेट्रिक्स आणि तपशीलवार खर्च बचत कॅल्क्युलेटर समाविष्ट आहे.",
    helpConfigureTitle: "कॉन्फिगर",
    helpConfigureDesc: "तुमच्या सोलर सिस्टमची क्षमता, पॅनेल अभिमुखता आणि 2D पॅनेल व्हिज्युअलायझेशन कॉन्फिगर करा.",
    helpWeatherTitle: "हवामान डेटा",
    helpWeatherDesc: "हवामान डेटा तुमच्या स्थानाचा वापर करून मिळवला जातो. तापमान, ढगांचे आवरण आणि सोलर कार्यक्षमता दाखवतो.",
    helpAlertsTitle: "स्मार्ट अलर्ट",
    helpAlertsDesc: "स्मार्ट अलर्ट हवामान आणि सिस्टम कामगिरीच्या आधारे दररोज तयार केले जातात.",
    helpSavingsTitle: "खर्च बचत",
    helpSavingsDesc: "खर्च बचत कॅल्क्युलेटर मुंबई वीज दरांवर आधारित तुमच्या मासिक आणि वार्षिक बचतीचा अंदाज लावतो.",
    faqTitle: "वारंवार विचारले जाणारे प्रश्न",
    faq1Q: "ऊर्जा उत्पादन अंदाज किती अचूक आहेत?",
    faq1A: "अंदाज तुमच्या सिस्टम क्षमता, पॅनेल अभिमुखता आणि रिअल-टाइम हवामान डेटावर आधारित आहेत. प्रत्यक्ष उत्पादन 5-15% भिन्न असू शकते.",
    faq2Q: "मी माझा सोलर सिस्टम साइज कसा बदलू?",
    faq2A: "कॉन्फिगर टॅबवर जा आणि सिस्टम क्षमता स्लायडर वापरा.",
    faq3Q: "ॲपला माझ्या स्थानाची गरज का आहे?",
    faq3A: "स्थानाचा वापर स्थानिक हवामान डेटा मिळवण्यासाठी केला जातो जो अचूक सोलर कार्यक्षमता अंदाजात मदत करतो.",
    faq4Q: "खर्च बचतीची गणना कशी होते?",
    faq4A: "बचतीची गणना तुमच्या अंदाजित ऊर्जा उत्पादन (kWh) ला स्थानिक वीज दर (₹8.50/kWh) ने गुणाकार करून केली जाते.",
  },
};

export const languageLabels: Record<Language, string> = {
  en: "English",
  hi: "हिंदी",
  mr: "मराठी",
};
