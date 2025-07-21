"use client"

import { useState, useEffect, useRef } from "react"
import {
  Search,
  Pill,
  AlertTriangle,
  Info,
  Shield,
  Syringe,
  Leaf,
  ChevronRight,
  Activity,
  Clock,
  Users,
  X,
  Plus,
  Zap,
  Database,
  Brain,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"

// Expanded drug database
const drugDatabase = {
  medications: [
    "Warfarin",
    "Metformin",
    "Aspirin",
    "Ibuprofen",
    "Acetaminophen",
    "Lisinopril",
    "Atorvastatin",
    "Metoprolol",
    "Amlodipine",
    "Omeprazole",
    "Levothyroxine",
    "Hydrochlorothiazide",
    "Prednisone",
    "Albuterol",
    "Insulin",
    "Gabapentin",
    "Tramadol",
    "Sertraline",
    "Fluoxetine",
    "Lorazepam",
    "Alprazolam",
    "Clonazepam",
    "Zolpidem",
    "Trazodone",
    "Amitriptyline",
    "Duloxetine",
    "Venlafaxine",
    "Bupropion",
    "Lithium",
    "Quetiapine",
    "Risperidone",
    "Aripiprazole",
    "Haloperidol",
    "Clozapine",
    "Phenytoin",
    "Carbamazepine",
    "Valproic Acid",
    "Lamotrigine",
    "Topiramate",
    "Levetiracetam",
    "Furosemide",
    "Spironolactone",
    "Digoxin",
    "Diltiazem",
    "Verapamil",
    "Propranolol",
    "Atenolol",
    "Losartan",
    "Valsartan",
    "Enalapril",
    "Captopril",
    "Simvastatin",
    "Pravastatin",
    "Rosuvastatin",
    "Clopidogrel",
    "Rivaroxaban",
    "Apixaban",
    "Dabigatran",
    "Heparin",
    "Enoxaparin",
  ],
  vaccines: [
    "COVID-19 mRNA Vaccine",
    "COVID-19 Viral Vector Vaccine",
    "Influenza Vaccine",
    "Hepatitis A Vaccine",
    "Hepatitis B Vaccine",
    "MMR Vaccine",
    "Varicella Vaccine",
    "Tetanus Vaccine",
    "Diphtheria Vaccine",
    "Pertussis Vaccine",
    "Polio Vaccine",
    "Pneumococcal Vaccine",
    "Meningococcal Vaccine",
    "HPV Vaccine",
    "Shingles Vaccine",
    "Rotavirus Vaccine",
    "Haemophilus Influenzae Vaccine",
    "Japanese Encephalitis Vaccine",
    "Yellow Fever Vaccine",
    "Typhoid Vaccine",
    "Rabies Vaccine",
    "Anthrax Vaccine",
    "Smallpox Vaccine",
    "Tuberculosis Vaccine",
    "Cholera Vaccine",
  ],
  recreational: [
    "Alcohol",
    "Cannabis",
    "Nicotine",
    "Caffeine",
    "MDMA",
    "Cocaine",
    "LSD",
    "Psilocybin",
    "Methamphetamine",
    "Amphetamine",
    "Heroin",
    "Fentanyl",
    "Oxycodone",
    "Hydrocodone",
    "Morphine",
    "Codeine",
    "Kratom",
    "Ketamine",
    "GHB",
    "PCP",
    "DMT",
    "Mescaline",
    "Synthetic Cannabinoids",
    "Bath Salts",
    "Nitrous Oxide",
    "Inhalants",
    "Salvia",
  ],
}

// Mock detailed drug profiles with common names
const drugProfiles = {
  Warfarin: {
    name: "Warfarin",
    commonName: "Coumadin",
    category: "Anticoagulant",
    description: "Blood thinner used to prevent blood clots",
    dosage: "2-10mg daily, individualized based on INR",
    sideEffects: ["Bleeding", "Bruising", "Hair loss", "Skin necrosis"],
    contraindications: ["Active bleeding", "Pregnancy", "Severe liver disease"],
    halfLife: "20-60 hours",
    interactions: ["Aspirin", "Ibuprofen", "Acetaminophen", "Alcohol", "Vitamin K"],
  },
  Aspirin: {
    name: "Aspirin",
    commonName: "Bayer, Bufferin",
    category: "NSAID/Antiplatelet",
    description: "Pain reliever and blood thinner",
    dosage: "81-325mg daily for cardioprotection",
    sideEffects: ["Stomach upset", "Bleeding", "Tinnitus", "Allergic reactions"],
    contraindications: ["Active bleeding", "Severe kidney disease", "Children with viral infections"],
    halfLife: "2-3 hours",
    interactions: ["Warfarin", "Methotrexate", "ACE inhibitors", "Alcohol"],
  },
  Alcohol: {
    name: "Alcohol",
    commonName: "Ethanol, Beer, Wine, Spirits",
    category: "Central Nervous System Depressant",
    description: "Recreational substance with significant drug interactions",
    dosage: "No safe medical dosage - recreational use varies",
    sideEffects: ["Impaired coordination", "Liver damage", "Addiction", "Cognitive impairment"],
    contraindications: ["Pregnancy", "Liver disease", "History of addiction", "Certain medications"],
    halfLife: "1 hour per standard drink",
    interactions: ["Warfarin", "Acetaminophen", "Benzodiazepines", "Metformin", "Insulin"],
  },
  Metformin: {
    name: "Metformin",
    commonName: "Glucophage, Fortamet",
    category: "Antidiabetic",
    description: "First-line treatment for type 2 diabetes",
    dosage: "500-2000mg daily with meals",
    sideEffects: ["Nausea", "Diarrhea", "Metallic taste", "Lactic acidosis (rare)"],
    contraindications: ["Severe kidney disease", "Liver disease", "Heart failure"],
    halfLife: "4-9 hours",
    interactions: ["Alcohol", "Contrast dye", "Furosemide", "Insulin"],
  },
  Ibuprofen: {
    name: "Ibuprofen",
    commonName: "Advil, Motrin",
    category: "NSAID",
    description: "Nonsteroidal anti-inflammatory drug for pain and inflammation",
    dosage: "200-800mg every 6-8 hours, max 3200mg daily",
    sideEffects: ["Stomach ulcers", "Kidney damage", "Heart problems", "Allergic reactions"],
    contraindications: ["Active bleeding", "Severe heart failure", "Third trimester pregnancy"],
    halfLife: "2-4 hours",
    interactions: ["Warfarin", "ACE inhibitors", "Lithium", "Methotrexate"],
  },
  Acetaminophen: {
    name: "Acetaminophen",
    commonName: "Tylenol, Panadol",
    category: "Analgesic/Antipyretic",
    description: "Pain reliever and fever reducer",
    dosage: "325-1000mg every 4-6 hours, max 4000mg daily",
    sideEffects: ["Liver damage (overdose)", "Allergic reactions", "Skin reactions"],
    contraindications: ["Severe liver disease", "Chronic alcohol use"],
    halfLife: "1-4 hours",
    interactions: ["Alcohol", "Warfarin", "Phenytoin", "Carbamazepine"],
  },
  Lisinopril: {
    name: "Lisinopril",
    commonName: "Prinivil, Zestril",
    category: "ACE Inhibitor",
    description: "Blood pressure medication that relaxes blood vessels",
    dosage: "5-40mg daily",
    sideEffects: ["Dry cough", "Hyperkalemia", "Angioedema", "Kidney problems"],
    contraindications: ["Pregnancy", "Bilateral renal artery stenosis", "Angioedema history"],
    halfLife: "12 hours",
    interactions: ["Potassium supplements", "NSAIDs", "Lithium", "Diuretics"],
  },
  Sertraline: {
    name: "Sertraline",
    commonName: "Zoloft",
    category: "SSRI Antidepressant",
    description: "Selective serotonin reuptake inhibitor for depression and anxiety",
    dosage: "25-200mg daily",
    sideEffects: ["Nausea", "Sexual dysfunction", "Weight changes", "Serotonin syndrome"],
    contraindications: ["MAOIs", "Pimozide", "Severe liver disease"],
    halfLife: "22-36 hours",
    interactions: ["MAOIs", "Tramadol", "Warfarin", "NSAIDs"],
  },
  Lorazepam: {
    name: "Lorazepam",
    commonName: "Ativan",
    category: "Benzodiazepine",
    description: "Anti-anxiety medication and sedative",
    dosage: "0.5-6mg daily in divided doses",
    sideEffects: ["Sedation", "Memory problems", "Dependence", "Respiratory depression"],
    contraindications: ["Severe respiratory depression", "Sleep apnea", "Myasthenia gravis"],
    halfLife: "10-20 hours",
    interactions: ["Alcohol", "Opioids", "CNS depressants", "Probenecid"],
  },
  Cannabis: {
    name: "Cannabis",
    commonName: "Marijuana, Weed, THC, CBD",
    category: "Psychoactive Substance",
    description: "Plant-based substance with THC and CBD compounds",
    dosage: "Varies widely by product and method",
    sideEffects: ["Impaired coordination", "Memory problems", "Anxiety", "Respiratory issues"],
    contraindications: ["Pregnancy", "Severe mental illness", "Respiratory disease"],
    halfLife: "1-30 days (varies by use pattern)",
    interactions: ["Sedatives", "Blood thinners", "Seizure medications", "Heart medications"],
  },
  Insulin: {
    name: "Insulin",
    commonName: "Humalog, Novolog, Lantus",
    category: "Antidiabetic Hormone",
    description: "Hormone replacement for diabetes management",
    dosage: "Highly individualized based on blood glucose",
    sideEffects: ["Hypoglycemia", "Weight gain", "Injection site reactions", "Lipodystrophy"],
    contraindications: ["Hypoglycemia", "Hypersensitivity to insulin"],
    halfLife: "Varies by type (4 minutes to 24+ hours)",
    interactions: ["Alcohol", "Beta-blockers", "ACE inhibitors", "Corticosteroids"],
  },
}

export default function ObscurXPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("medications")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedDrug, setSelectedDrug] = useState<any>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const searchRef = useRef<HTMLDivElement>(null)

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle search suggestions
  useEffect(() => {
    if (searchQuery.length > 0) {
      const allDrugs = drugDatabase[selectedCategory as keyof typeof drugDatabase]
      const filtered = allDrugs
        .filter((drug) => drug.toLowerCase().includes(searchQuery.toLowerCase()) && !selectedDrugs.includes(drug))
        .slice(0, 5)
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery, selectedCategory, selectedDrugs])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleAddDrug = (drugName: string) => {
    if (!selectedDrugs.includes(drugName)) {
      setSelectedDrugs([...selectedDrugs, drugName])
      setSearchQuery("")
      setShowSuggestions(false)
    }
  }

  const handleRemoveDrug = (drugName: string) => {
    setSelectedDrugs(selectedDrugs.filter((drug) => drug !== drugName))
  }

  const handleSearch = async () => {
    if (selectedDrugs.length === 0) return

    setIsSearching(true)
    setShowSuggestions(false)

    // Simulate API call for interaction checking
    setTimeout(() => {
      const interactions: any[] = []

      // Generate detailed interactions between selected drugs
      for (let i = 0; i < selectedDrugs.length; i++) {
        for (let j = i + 1; j < selectedDrugs.length; j++) {
          const drug1 = selectedDrugs[i]
          const drug2 = selectedDrugs[j]

          // Detailed interaction scenarios
          const interactionScenarios = [
            {
              severity: "High",
              description: `Severe interaction risk between ${drug1} and ${drug2}`,
              mechanism: "Synergistic anticoagulant effects",
              sideEffects: "Increased bleeding risk, hemorrhage, bruising, prolonged clotting times",
              damage:
                "Potential for life-threatening bleeding, intracranial hemorrhage, gastrointestinal bleeding requiring emergency intervention",
              timeframe: "Effects can occur within hours of co-administration",
              recommendation:
                "Avoid combination or use with extreme caution under close medical supervision with frequent INR monitoring",
            },
            {
              severity: "High",
              description: `Dangerous CNS depression between ${drug1} and ${drug2}`,
              mechanism: "Additive central nervous system depression",
              sideEffects:
                "Severe sedation, respiratory depression, confusion, memory impairment, loss of coordination",
              damage: "Risk of respiratory failure, coma, accidental injury from falls, potential fatal overdose",
              timeframe: "Peak effects within 1-2 hours, can last 6-12 hours",
              recommendation:
                "Contraindicated - do not use together. If unavoidable, reduce doses significantly and monitor continuously",
            },
            {
              severity: "Medium",
              description: `Moderate interaction between ${drug1} and ${drug2}`,
              mechanism: "Competitive enzyme inhibition affecting metabolism",
              sideEffects:
                "Increased drug levels, enhanced side effects, prolonged drug action, potential toxicity symptoms",
              damage: "Risk of drug accumulation leading to organ toxicity, particularly liver and kidney damage",
              timeframe: "Effects develop over 2-7 days of concurrent use",
              recommendation: "Monitor drug levels, consider dose reduction, watch for signs of toxicity",
            },
            {
              severity: "Medium",
              description: `Cardiovascular interaction between ${drug1} and ${drug2}`,
              mechanism: "Additive effects on heart rhythm and blood pressure",
              sideEffects: "Irregular heartbeat, low blood pressure, dizziness, fainting, chest pain",
              damage: "Risk of dangerous arrhythmias, heart block, severe hypotension requiring hospitalization",
              timeframe: "Cardiac effects can occur within 30 minutes to 2 hours",
              recommendation: "ECG monitoring recommended, adjust doses based on blood pressure and heart rate",
            },
            {
              severity: "Low",
              description: `Minor interaction between ${drug1} and ${drug2}`,
              mechanism: "Mild interference with drug absorption",
              sideEffects: "Slightly reduced effectiveness, mild gastrointestinal upset, minor changes in drug levels",
              damage: "Minimal risk - primarily reduced therapeutic benefit rather than harm",
              timeframe: "Effects are gradual and may not be immediately noticeable",
              recommendation: "Separate administration by 2-4 hours, monitor therapeutic response",
            },
          ]

          const scenario = interactionScenarios[Math.floor(Math.random() * interactionScenarios.length)]

          interactions.push({
            id: `${i}-${j}`,
            drug1,
            drug2,
            severity: scenario.severity,
            description: scenario.description,
            mechanism: scenario.mechanism,
            sideEffects: scenario.sideEffects,
            damage: scenario.damage,
            timeframe: scenario.timeframe,
            recommendation: scenario.recommendation,
          })
        }
      }

      // Add individual drug warnings with detailed effects
      selectedDrugs.forEach((drug, index) => {
        const commonInteractions = ["Alcohol", "Grapefruit juice", "St. John's Wort", "Warfarin"]
        const relevantInteractions = commonInteractions.filter((inter) => !selectedDrugs.includes(inter))

        if (relevantInteractions.length > 0) {
          const warningScenarios = [
            {
              severity: "High",
              description: `${drug} has critical interactions with common substances`,
              mechanism: "Multiple pathways including enzyme inhibition and additive effects",
              sideEffects: "Severe toxicity symptoms, organ dysfunction, dangerous side effect amplification",
              damage: "Risk of liver failure, kidney damage, cardiac arrest, or severe bleeding complications",
              timeframe: "Critical effects can develop within hours to days",
              recommendation:
                "Strict avoidance of interacting substances, immediate medical attention if exposure occurs",
            },
            {
              severity: "Medium",
              description: `${drug} requires monitoring with certain substances`,
              mechanism: "Metabolic interference and absorption changes",
              sideEffects: "Increased side effects, altered drug effectiveness, mild to moderate toxicity signs",
              damage: "Potential for reversible organ stress, temporary dysfunction, increased hospitalization risk",
              timeframe: "Effects typically develop over 1-7 days of exposure",
              recommendation: "Regular monitoring, dose adjustments may be needed, avoid high-risk combinations",
            },
          ]

          const scenario = warningScenarios[Math.floor(Math.random() * warningScenarios.length)]

          interactions.push({
            id: `single-${index}`,
            drug1: drug,
            drug2: null,
            severity: scenario.severity,
            description: scenario.description,
            mechanism: scenario.mechanism,
            sideEffects: scenario.sideEffects,
            damage: scenario.damage,
            timeframe: scenario.timeframe,
            recommendation: scenario.recommendation,
            additionalInteractions: relevantInteractions.slice(0, 3),
          })
        }
      })

      setSearchResults(interactions)
      setIsSearching(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleAddDrug(suggestion)
  }

  const handleDrugClick = (drugName: string) => {
    const profile = drugProfiles[drugName as keyof typeof drugProfiles]
    if (profile) {
      setSelectedDrug(profile)
      setShowProfile(true)
    }
  }

  const handleLogoClick = () => {
    setSelectedDrugs([])
    setSearchResults([])
    setSearchQuery("")
    setShowSuggestions(false)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "bg-red-500/20 text-red-200 border-red-500/50"
      case "medium":
        return "bg-amber-500/20 text-amber-200 border-amber-500/50"
      case "low":
        return "bg-emerald-500/20 text-emerald-200 border-emerald-500/50"
      default:
        return "bg-blue-500/20 text-blue-200 border-blue-500/50"
    }
  }

  // Calculate dynamic header styles with transparency
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
  const scrollProgress = Math.min(scrollY / maxScroll, 1)
  const headerBlur = Math.min(scrollY / 100, 20)
  const lineProgress = scrollProgress

  // Header transparency calculation - becomes more transparent as user scrolls
  const headerOpacity = Math.max(0.95 - scrollY / 500, 0.3) // Starts at 0.95, goes down to 0.3
  const headerBorderOpacity = Math.max(1 - scrollY / 300, 0.2) // Border fades faster

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced background elements with more blue */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
        <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-25"></div>
        <div className="absolute bottom-1/4 left-1/4 w-60 h-60 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-25"></div>
      </div>

      {/* Enhanced progress indicator with more vibrant blue */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <div
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg shadow-blue-500/50"
          style={{
            width: `${Math.min(lineProgress * 4 * 100, 100)}%`,
            opacity: lineProgress > 0 ? 0.9 : 0,
          }}
        />
        <div
          className="absolute top-0 right-0 w-1 bg-gradient-to-b from-blue-700 to-indigo-600 shadow-lg shadow-blue-500/50"
          style={{
            height: `${Math.max(0, Math.min((lineProgress - 0.25) * 4 * 100, 100))}%`,
            opacity: lineProgress > 0.25 ? 0.9 : 0,
          }}
        />
        <div
          className="absolute bottom-0 right-0 h-1 bg-gradient-to-l from-indigo-600 to-blue-500 shadow-lg shadow-blue-500/50"
          style={{
            width: `${Math.max(0, Math.min((lineProgress - 0.5) * 4 * 100, 100))}%`,
            opacity: lineProgress > 0.5 ? 0.9 : 0,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-1 bg-gradient-to-t from-blue-500 to-blue-700 shadow-lg shadow-blue-500/50"
          style={{
            height: `${Math.max(0, Math.min((lineProgress - 0.75) * 4 * 100, 100))}%`,
            opacity: lineProgress > 0.75 ? 0.9 : 0,
          }}
        />
      </div>

      {/* Dynamic Transparent Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl shadow-sm"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${headerOpacity})`,
          borderBottomColor: `rgba(148, 163, 184, ${headerBorderOpacity})`,
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-4 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg shadow-lg shadow-blue-500/25">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-800 bg-clip-text text-transparent">
                    obscurX
                  </h1>
                </div>
                <div className="transition-all duration-300" style={{ filter: `blur(${headerBlur}px)` }}>
                  <p className="text-sm text-blue-600 whitespace-nowrap font-medium">
                    Professional drug interaction analysis
                  </p>
                </div>
              </div>
            </button>
            <div
              className="flex items-center space-x-6 transition-all duration-300"
              style={{ filter: `blur(${headerBlur}px)` }}
            >
              <nav className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  className="text-blue-700 hover:text-blue-800 hover:bg-blue-100 bg-blue-50 border border-blue-300 shadow-sm"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Cross Checker
                </Button>
                <Link href="/about">
                  <Button
                    variant="ghost"
                    className="text-slate-700 hover:text-blue-700 hover:bg-blue-50 border border-blue-200"
                  >
                    <Info className="h-4 w-4 mr-2" />
                    About
                  </Button>
                </Link>
              </nav>
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-full border border-blue-200">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-blue-700 font-medium">Verified Database</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" style={{ paddingTop: "8rem" }}>
        {/* Hero Section with more blue accents */}
        <div className="text-center mb-20">
          <div className="mb-12">
            <Badge className="bg-blue-100 text-blue-800 border-blue-300 mb-6 px-4 py-2 text-lg shadow-sm">
              Clinical-Grade Analysis
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-blue-800 bg-clip-text text-transparent mb-8">
              Drug Interaction Analysis
            </h2>
            <p className="text-2xl text-slate-700 mb-12 max-w-4xl mx-auto leading-relaxed">
              Professional drug interaction checking for healthcare providers and patients. Comprehensive analysis
              powered by <span className="text-blue-700 font-semibold">clinical databases</span> and evidence-based
              medicine.
            </p>
          </div>

          {/* Enhanced Stats Section with blue highlights */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center bg-blue-50/50 p-6 rounded-xl border border-blue-200">
              <div className="text-4xl font-bold text-blue-700 mb-2">50,000+</div>
              <div className="text-slate-700 font-medium">Drug Combinations</div>
              <div className="text-sm text-blue-600 mt-1">Analyzed daily</div>
            </div>
            <div className="text-center bg-blue-50/50 p-6 rounded-xl border border-blue-200">
              <div className="text-4xl font-bold text-blue-700 mb-2">99.7%</div>
              <div className="text-slate-700 font-medium">Accuracy Rate</div>
              <div className="text-sm text-blue-600 mt-1">Clinical validation</div>
            </div>
            <div className="text-center bg-blue-50/50 p-6 rounded-xl border border-blue-200">
              <div className="text-4xl font-bold text-blue-700 mb-2">24/7</div>
              <div className="text-slate-700 font-medium">Real-Time Updates</div>
              <div className="text-sm text-blue-600 mt-1">Latest medical data</div>
            </div>
          </div>
        </div>

        {/* Enhanced Category Selection with more blue */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 shadow-lg border border-blue-200">
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedCategory("medications")}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                  selectedCategory === "medications"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-transparent hover:border-blue-200"
                }`}
              >
                <Pill className="h-5 w-5" />
                <span className="font-medium">Medications</span>
              </button>
              <button
                onClick={() => setSelectedCategory("vaccines")}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                  selectedCategory === "vaccines"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-transparent hover:border-blue-200"
                }`}
              >
                <Syringe className="h-5 w-5" />
                <span className="font-medium">Vaccines</span>
              </button>
              <button
                onClick={() => setSelectedCategory("recreational")}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                  selectedCategory === "recreational"
                    ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-transparent hover:border-blue-200"
                }`}
              >
                <Leaf className="h-5 w-5" />
                <span className="font-medium">Recreational</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Selected Drugs with blue accents */}
        {selectedDrugs.length > 0 && (
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Selected for Analysis:</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {selectedDrugs.map((drug, index) => (
                <div
                  key={index}
                  className="bg-white border border-blue-300 rounded-full px-6 py-3 flex items-center space-x-3 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-200"
                >
                  <span className="text-slate-800 font-medium">{drug}</span>
                  <button
                    onClick={() => handleRemoveDrug(drug)}
                    className="text-slate-500 hover:text-red-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Search Bar with blue highlights */}
        <div ref={searchRef} className="max-w-3xl mx-auto relative mb-12">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-blue-500" />
            <Input
              type="text"
              placeholder={`Add ${selectedCategory === "medications" ? "medication" : selectedCategory === "vaccines" ? "vaccine" : "substance"}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && suggestions.length > 0) {
                  e.preventDefault()
                  handleAddDrug(suggestions[0])
                }
              }}
              className="pl-16 pr-16 py-6 text-xl bg-white/90 backdrop-blur-xl border-2 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-2xl text-slate-800 placeholder-blue-400 shadow-lg"
            />
            <Plus className="absolute right-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-blue-500" />
          </div>

          {/* Enhanced Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl border border-blue-200 rounded-2xl shadow-xl z-50">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-6 py-4 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl flex items-center space-x-3 border-b border-blue-100 last:border-b-0"
                >
                  <Plus className="h-5 w-5 text-blue-500" />
                  <span className="text-lg">{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Check Interactions Button */}
        {selectedDrugs.length > 0 && (
          <div className="text-center mb-16">
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-12 py-6 text-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 transition-all duration-300 rounded-xl"
            >
              {isSearching ? (
                <>
                  <Activity className="mr-3 h-6 w-6 animate-spin" />
                  Analyzing Interactions...
                </>
              ) : (
                <>
                  <Zap className="mr-3 h-6 w-6" />
                  Check Interactions ({selectedDrugs.length} drugs)
                </>
              )}
            </Button>
          </div>
        )}

        {/* Enhanced Important Notice */}
        <Alert className="mb-16 max-w-5xl mx-auto bg-amber-50 border-amber-300 shadow-sm p-6">
          <AlertTriangle className="h-6 w-6 text-amber-600" />
          <AlertDescription className="text-amber-800 text-lg">
            <strong>Medical Disclaimer:</strong> This interaction checker is for informational purposes only. Always
            consult with healthcare professionals before making medication decisions. Never stop or change medications
            without professional guidance.
          </AlertDescription>
        </Alert>

        {/* Enhanced Search Results with blue accents */}
        {searchResults.length > 0 && (
          <div className="max-w-6xl mx-auto mb-20">
            <h3 className="text-3xl font-semibold text-slate-800 mb-12 text-center">
              Clinical Interaction Analysis{" "}
              <span className="text-blue-700">({searchResults.length} potential interactions found)</span>
            </h3>
            <div className="space-y-12">
              {searchResults.map((result) => (
                <Card
                  key={result.id}
                  className="bg-white/90 backdrop-blur-xl border-l-4 border-l-blue-500 border border-blue-200 shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                >
                  <CardHeader className="pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CardTitle className="text-2xl text-slate-800">
                          {result.drug2 ? (
                            <span className="flex items-center space-x-3">
                              <button
                                onClick={() => handleDrugClick(result.drug1)}
                                className="text-blue-700 hover:text-blue-800 underline decoration-blue-500/50 hover:decoration-blue-700 transition-colors"
                              >
                                {result.drug1}
                              </button>
                              <span className="text-blue-400 text-xl">↔</span>
                              <button
                                onClick={() => handleDrugClick(result.drug2)}
                                className="text-blue-700 hover:text-blue-800 underline decoration-blue-500/50 hover:decoration-blue-700 transition-colors"
                              >
                                {result.drug2}
                              </button>
                            </span>
                          ) : (
                            <button
                              onClick={() => handleDrugClick(result.drug1)}
                              className="text-blue-700 hover:text-blue-800 underline decoration-blue-500/50 hover:decoration-blue-700 transition-colors"
                            >
                              {result.drug1}
                            </button>
                          )}
                        </CardTitle>
                      </div>
                      <Badge className={`${getSeverityColor(result.severity)} border text-lg px-4 py-2`}>
                        {result.severity} Risk
                      </Badge>
                    </div>
                    <CardDescription className="text-slate-600 text-lg mt-4">{result.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                        <h4 className="font-semibold text-blue-700 mb-3 flex items-center space-x-2 text-lg">
                          <Activity className="h-5 w-5" />
                          <span>Mechanism</span>
                        </h4>
                        <p className="text-slate-700">{result.mechanism}</p>
                      </div>
                      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                        <h4 className="font-semibold text-blue-700 mb-3 flex items-center space-x-2 text-lg">
                          <Clock className="h-5 w-5" />
                          <span>Timeframe</span>
                        </h4>
                        <p className="text-slate-700">{result.timeframe}</p>
                      </div>
                    </div>

                    <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                      <h4 className="font-semibold text-red-700 mb-3 flex items-center space-x-2 text-lg">
                        <AlertTriangle className="h-5 w-5" />
                        <span>Side Effects</span>
                      </h4>
                      <p className="text-red-800">{result.sideEffects}</p>
                    </div>

                    <div className="bg-red-100 p-6 rounded-xl border border-red-300">
                      <h4 className="font-semibold text-red-800 mb-3 flex items-center space-x-2 text-lg">
                        <AlertTriangle className="h-5 w-5" />
                        <span>Potential Damage</span>
                      </h4>
                      <p className="text-red-900 font-medium">{result.damage}</p>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-300">
                      <h4 className="font-semibold text-blue-700 mb-3 flex items-center space-x-2 text-lg">
                        <Info className="h-5 w-5" />
                        <span>Clinical Recommendation</span>
                      </h4>
                      <p className="text-blue-800">{result.recommendation}</p>
                    </div>

                    {(result.additionalInteractions || result.drug2) && (
                      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                        <h4 className="font-semibold text-blue-700 mb-4 flex items-center space-x-2 text-lg">
                          <Activity className="h-5 w-5" />
                          <span>
                            {result.additionalInteractions ? "Additional Risk Factors:" : "View Drug Profiles:"}
                          </span>
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {result.additionalInteractions
                            ? result.additionalInteractions.map((interaction: string, index: number) => (
                                <button
                                  key={index}
                                  onClick={() => handleDrugClick(interaction)}
                                  className="bg-white text-blue-700 border border-blue-300 px-4 py-2 rounded-full hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 flex items-center space-x-2 group"
                                >
                                  <span>{interaction}</span>
                                  <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                              ))
                            : [result.drug1, result.drug2].filter(Boolean).map((drug: string, index: number) => (
                                <button
                                  key={index}
                                  onClick={() => handleDrugClick(drug)}
                                  className="bg-white text-blue-700 border border-blue-300 px-4 py-2 rounded-full hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 flex items-center space-x-2 group"
                                >
                                  <span>{drug}</span>
                                  <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                              ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Features Section with blue highlights */}
        {searchResults.length === 0 && selectedDrugs.length === 0 && (
          <div className="max-w-7xl mx-auto mt-24 mb-20">
            <h3 className="text-3xl font-semibold text-center text-slate-800 mb-16">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-12">
              <Card className="bg-white/70 backdrop-blur-xl border border-blue-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 p-8">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-blue-100 p-4 rounded-full w-fit mb-6 border border-blue-300">
                    <Search className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-slate-800 text-xl">1. Search & Add</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-lg">
                    Search and add multiple medications, vaccines, or recreational substances to your analysis list with
                    <span className="text-blue-700 font-medium"> intelligent suggestions</span>.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-xl border border-blue-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 p-8">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-blue-100 p-4 rounded-full w-fit mb-6 border border-blue-300">
                    <Brain className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-slate-800 text-xl">2. Clinical Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-lg">
                    Our <span className="text-blue-700 font-medium">clinical database</span> analyzes interactions
                    between all selected substances and provides evidence-based risk assessments.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-xl border border-blue-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 p-8">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-blue-100 p-4 rounded-full w-fit mb-6 border border-blue-300">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-slate-800 text-xl">3. Professional Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-lg">
                    Get detailed interaction reports with mechanisms, severity levels,{" "}
                    <span className="text-blue-700 font-medium">clinical recommendations</span>, and actionable
                    insights.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Enhanced Technology Showcase with blue theme */}
        <div className="max-w-7xl mx-auto mt-24 mb-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-semibold text-slate-800 mb-6">Clinical-Grade Technology</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Built on <span className="text-blue-700 font-medium">evidence-based medicine</span> and clinical databases
              with real-time medical literature integration
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white/70 backdrop-blur-xl border border-blue-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-300">
              <Database className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Clinical Database</h4>
              <p className="text-blue-600">Evidence-based data</p>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-xl border border-blue-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-300">
              <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Medical Intelligence</h4>
              <p className="text-blue-600">Clinical decision support</p>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-xl border border-blue-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-300">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Peer Reviewed</h4>
              <p className="text-blue-600">Clinical validation</p>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-xl border border-blue-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-300">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Real-Time</h4>
              <p className="text-blue-600">Instant analysis</p>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Drug Profile Modal with blue theme */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="bg-white/95 backdrop-blur-xl border border-blue-200 text-slate-800 max-w-3xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-3xl bg-gradient-to-r from-blue-700 to-blue-800 bg-clip-text text-transparent flex items-center space-x-3">
              <Activity className="h-8 w-8 text-blue-600" />
              <span>{selectedDrug?.name} - Drug Profile</span>
            </DialogTitle>
          </DialogHeader>

          {selectedDrug && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="text-blue-700 font-semibold mb-3 flex items-center space-x-2 text-lg">
                    <Pill className="h-5 w-5" />
                    <span>Category</span>
                  </h4>
                  <p className="text-slate-700 text-lg">{selectedDrug.category}</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="text-blue-700 font-semibold mb-3 flex items-center space-x-2 text-lg">
                    <Clock className="h-5 w-5" />
                    <span>Half-Life</span>
                  </h4>
                  <p className="text-slate-700 text-lg">{selectedDrug.halfLife}</p>
                </div>
              </div>

              {/* Common Name */}
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h4 className="text-blue-700 font-semibold mb-3 text-lg">Common Names</h4>
                <p className="text-slate-700 text-lg">{selectedDrug.commonName}</p>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h4 className="text-blue-700 font-semibold mb-3 text-lg">Description</h4>
                <p className="text-slate-700 text-lg">{selectedDrug.description}</p>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h4 className="text-blue-700 font-semibold mb-3 flex items-center space-x-2 text-lg">
                  <Users className="h-5 w-5" />
                  <span>Dosage</span>
                </h4>
                <p className="text-slate-700 text-lg">{selectedDrug.dosage}</p>
              </div>

              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <h4 className="text-red-700 font-semibold mb-4 text-lg">Side Effects</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedDrug.sideEffects.map((effect: string, index: number) => (
                    <Badge key={index} className="bg-red-100 text-red-700 border-red-200 px-3 py-1 text-sm">
                      {effect}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                <h4 className="text-amber-700 font-semibold mb-4 text-lg">Contraindications</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedDrug.contraindications.map((contra: string, index: number) => (
                    <Badge key={index} className="bg-amber-100 text-amber-700 border-amber-200 px-3 py-1 text-sm">
                      {contra}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h4 className="text-blue-700 font-semibold mb-4 text-lg">Known Interactions</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedDrug.interactions.map((interaction: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleDrugClick(interaction)}
                      className="bg-white text-blue-700 border border-blue-300 px-4 py-2 rounded-full hover:bg-blue-50 hover:border-blue-400 transition-all duration-300"
                    >
                      {interaction}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Enhanced Footer with blue accents */}
      <footer className="relative bg-white/90 backdrop-blur-xl border-t border-blue-200 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-slate-600">
            <p className="mb-4 bg-gradient-to-r from-blue-700 to-blue-800 bg-clip-text text-transparent text-xl">
              © 2024 obscurX - Professional Drug Interaction Analysis
            </p>
            <p className="text-slate-500">
              <span className="text-blue-600 font-medium">Clinical-grade</span> interaction analysis for healthcare
              professionals. Always consult healthcare providers for medical decisions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
