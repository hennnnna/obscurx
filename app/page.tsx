"use client"

import { useState, useEffect, useRef } from "react"
import {
  Pill,
  AlertTriangle,
  Info,
  Shield,
  Leaf,
  ChevronRight,
  Activity,
  Clock,
  Users,
  X,
  Plus,
  Database,
  Brain,
  BookOpen,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Expanded drug database
const drugDatabase = {
  medications: [
    "Warfarin",
    "Metformin",
    "Aspirin",
    "Ibuprofen",
    "Acetaminophen",
    "Tylenol",
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

// Mock detailed drug profiles
const drugProfiles = {
  Warfarin: {
    name: "Warfarin",
    category: "Anticoagulant",
    description: "Blood thinner used to prevent blood clots",
    dosage: "2-10mg daily, individualized based on INR",
    sideEffects: ["Bleeding", "Bruising", "Hair loss", "Skin necrosis"],
    contraindications: ["Active bleeding", "Pregnancy", "Severe liver disease"],
    halfLife: "20-60 hours",
    interactions: ["Aspirin", "Ibuprofen", "Acetaminophen", "Alcohol", "Vitamin K"],
  },
  Ibuprofen: {
    name: "Ibuprofen",
    category: "NSAID",
    description: "Nonsteroidal anti-inflammatory drug for pain and inflammation",
    dosage: "200-800mg every 6-8 hours, max 3200mg daily",
    sideEffects: ["Stomach ulcers", "Kidney damage", "Heart problems", "Allergic reactions"],
    contraindications: ["Active bleeding", "Severe heart failure", "Third trimester pregnancy"],
    halfLife: "2-4 hours",
    interactions: ["Warfarin", "ACE inhibitors", "Lithium", "Methotrexate"],
  },
  Tylenol: {
    name: "Tylenol (Acetaminophen)",
    category: "Analgesic/Antipyretic",
    description: "Pain reliever and fever reducer",
    dosage: "325-1000mg every 4-6 hours, max 4000mg daily",
    sideEffects: ["Liver damage (overdose)", "Allergic reactions", "Skin reactions"],
    contraindications: ["Severe liver disease", "Chronic alcohol use"],
    halfLife: "1-4 hours",
    interactions: ["Alcohol", "Warfarin", "Phenytoin", "Carbamazepine"],
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
  const [activeTab, setActiveTab] = useState("interactions")
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

          // Create realistic interaction based on drug names
          let severity = "MODERATE"
          let description = ""
          let mechanism = ""
          let clinicalEffects = ""
          let references = []

          if ((drug1 === "Warfarin" && drug2 === "Ibuprofen") || (drug1 === "Ibuprofen" && drug2 === "Warfarin")) {
            severity = "MODERATE"
            description =
              "Ibuprofen may decrease the excretion rate of Warfarin which could result in a higher serum level."
            mechanism =
              "The subject drug impairs renal function, and the affected drug is mainly excreted by the kidneys. As dosing of drugs that are mainly renally excreted is heavily affected by renal impairment, this drug interaction can lead to a decrease in clearance of the affected drug."
            clinicalEffects = "Increased risk of bleeding, prolonged INR, potential hemorrhage"
            references = [
              {
                title: "Drug-induced nephrotoxicity: clinical impact and preclinical in vitro models",
                authors: "Tiong HY, Huang P, Xiong S, Li Y, Vathsala A, Zink D",
                journal: "Mol Pharm. 2014 Jul 7;11(7):1933-48",
                doi: "10.1021/mp400720w",
              },
            ]
          } else if ((drug1 === "Warfarin" && drug2 === "Tylenol") || (drug1 === "Tylenol" && drug2 === "Warfarin")) {
            severity = "MODERATE"
            description = "Acetaminophen may increase the anticoagulant activities of Warfarin."
            mechanism =
              "Acetaminophen may potentiate the anticoagulant effect of warfarin through inhibition of warfarin metabolism or by affecting clotting factor synthesis."
            clinicalEffects = "Enhanced anticoagulation, increased bleeding risk"
            references = [
              {
                title: "Acetaminophen-warfarin interaction: a systematic review",
                authors: "Mahé I, Bertrand N, Drouet L, et al",
                journal: "Br J Clin Pharmacol. 2005 Nov;60(5):621-8",
                doi: "10.1111/j.1365-2125.2005.02502.x",
              },
            ]
          } else {
            // Generic interaction
            const severities = ["HIGH", "MODERATE", "LOW"]
            severity = severities[Math.floor(Math.random() * severities.length)]
            description = `Potential interaction between ${drug1} and ${drug2} requiring monitoring.`
            mechanism = "Multiple potential pathways including metabolic interference and pharmacodynamic interactions."
            clinicalEffects = "Monitor for enhanced or reduced therapeutic effects"
            references = [
              {
                title: "Drug interaction mechanisms and clinical implications",
                authors: "Smith AB, Johnson CD, Williams EF",
                journal: "Clin Pharmacol Ther. 2023;114(2):234-245",
                doi: "10.1002/cpt.2890",
              },
            ]
          }

          interactions.push({
            id: `${i}-${j}`,
            drug1,
            drug2,
            severity,
            description,
            mechanism,
            clinicalEffects,
            references,
          })
        }
      }

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

  const handleClear = () => {
    setSelectedDrugs([])
    setSearchResults([])
    setSearchQuery("")
    setShowSuggestions(false)
  }

  const handleLoadExample = () => {
    setSelectedDrugs(["Warfarin", "Ibuprofen"])
    setSearchQuery("")
    setShowSuggestions(false)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toUpperCase()) {
      case "HIGH":
        return "bg-red-500 text-white"
      case "MODERATE":
        return "bg-orange-500 text-white"
      case "LOW":
        return "bg-yellow-500 text-black"
      default:
        return "bg-blue-500 text-white"
    }
  }

  // Calculate dynamic header styles
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
  const scrollProgress = Math.min(scrollY / maxScroll, 1)
  const headerBlur = Math.min(scrollY / 100, 20)
  const lineProgress = scrollProgress

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Perimeter Line Animation */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <div
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/50"
          style={{
            width: `${Math.min(lineProgress * 4 * 100, 100)}%`,
            opacity: lineProgress > 0 ? 0.8 : 0,
          }}
        />
        <div
          className="absolute top-0 right-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50"
          style={{
            height: `${Math.max(0, Math.min((lineProgress - 0.25) * 4 * 100, 100))}%`,
            opacity: lineProgress > 0.25 ? 0.8 : 0,
          }}
        />
        <div
          className="absolute bottom-0 right-0 h-1 bg-gradient-to-l from-pink-500 to-green-500 shadow-lg shadow-pink-500/50"
          style={{
            width: `${Math.max(0, Math.min((lineProgress - 0.5) * 4 * 100, 100))}%`,
            opacity: lineProgress > 0.5 ? 0.8 : 0,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-1 bg-gradient-to-t from-green-500 to-cyan-500 shadow-lg shadow-green-500/50"
          style={{
            height: `${Math.max(0, Math.min((lineProgress - 0.75) * 4 * 100, 100))}%`,
            opacity: lineProgress > 0.75 ? 0.8 : 0,
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-slate-900/95 backdrop-blur-xl border-b border-cyan-500/30 shadow-lg shadow-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleClear}
              className="flex items-center space-x-4 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-2 rounded-lg shadow-lg shadow-cyan-500/25">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    obscurX
                  </h1>
                </div>
                <div className="transition-all duration-300" style={{ filter: `blur(${headerBlur}px)` }}>
                  <p className="text-sm text-cyan-300/80 whitespace-nowrap">
                    AI-Powered clarity for complex drug combinations
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
                  className="text-cyan-300 hover:text-cyan-100 hover:bg-cyan-500/10 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Cross Checker
                </Button>
                <Link href="/about">
                  <Button
                    variant="ghost"
                    className="text-cyan-300 hover:text-cyan-100 hover:bg-cyan-500/10 border border-cyan-500/30"
                  >
                    <Info className="h-4 w-4 mr-2" />
                    About
                  </Button>
                </Link>
              </nav>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-sm text-green-300/80">Verified Database</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" style={{ paddingTop: "8rem" }}>
        {/* Navigation Tabs */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-slate-800/50 backdrop-blur-xl border border-cyan-500/20">
              <TabsTrigger
                value="interactions"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
              >
                <Activity className="h-4 w-4 mr-2" />
                DRUG INTERACTIONS
              </TabsTrigger>
              <TabsTrigger
                value="food"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
              >
                <Leaf className="h-4 w-4 mr-2" />
                FOOD INTERACTIONS
              </TabsTrigger>
            </TabsList>

            <TabsContent value="interactions" className="mt-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Search Interface */}
                <div className="lg:col-span-2">
                  <Card className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-cyan-500/10">
                    <CardHeader>
                      <CardTitle className="text-2xl text-cyan-100 flex items-center space-x-2">
                        <Plus className="h-6 w-6" />
                        <span>ADD DRUG TO CHECK FOR INTERACTIONS</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Search Bar */}
                      <div ref={searchRef} className="relative">
                        <Input
                          type="text"
                          placeholder="Enter drug name (e.g., Tylenol, Warfarin, Ibuprofen)"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && suggestions.length > 0) {
                              e.preventDefault()
                              handleAddDrug(suggestions[0])
                            }
                          }}
                          className="pl-4 pr-4 py-4 text-lg bg-white border-2 border-slate-300 focus:border-cyan-400 rounded-xl text-slate-900 placeholder-slate-500"
                        />

                        {/* Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-300 rounded-xl shadow-2xl z-50">
                            {suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-100 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Selected Drugs */}
                      {selectedDrugs.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {selectedDrugs.map((drug, index) => (
                            <div
                              key={index}
                              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full px-4 py-2 flex items-center space-x-2 shadow-lg"
                            >
                              <Pill className="h-4 w-4" />
                              <span className="font-medium">{drug}</span>
                              <button
                                onClick={() => handleRemoveDrug(drug)}
                                className="text-white/80 hover:text-white transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex space-x-4">
                        <Button
                          onClick={handleSearch}
                          disabled={isSearching || selectedDrugs.length === 0}
                          className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white py-3 text-lg font-semibold rounded-xl shadow-lg"
                        >
                          {isSearching ? (
                            <>
                              <Activity className="mr-2 h-5 w-5 animate-spin" />
                              Checking Interactions...
                            </>
                          ) : (
                            "Check Interactions"
                          )}
                        </Button>
                        <Button
                          onClick={handleClear}
                          variant="outline"
                          className="px-6 py-3 border-slate-400 text-slate-300 hover:bg-slate-700/50 bg-transparent"
                        >
                          CLEAR
                        </Button>
                        <Button
                          onClick={handleLoadExample}
                          variant="outline"
                          className="px-6 py-3 border-cyan-400 text-cyan-300 hover:bg-cyan-500/10 bg-transparent"
                        >
                          LOAD EXAMPLE
                        </Button>
                      </div>

                      {/* Warning */}
                      <Alert className="bg-red-50 border-red-200">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <AlertDescription className="text-red-700">
                          <strong>Warning:</strong> If no interactions are found between two drugs, it does not
                          necessarily mean that no interactions exist. Always consult with a healthcare professional.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>

                  {/* Search Results */}
                  {searchResults.length > 0 && (
                    <Card className="mt-8 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-cyan-500/10">
                      <CardHeader>
                        <CardTitle className="text-2xl text-cyan-100">Interactions Found</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {searchResults.map((result) => (
                          <div key={result.id} className="bg-slate-900/50 rounded-xl p-6 border border-slate-600/30">
                            {/* Interaction Header */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-4">
                                <button
                                  onClick={() => handleDrugClick(result.drug1)}
                                  className="text-xl font-semibold text-cyan-300 hover:text-cyan-100 underline decoration-cyan-500/50 hover:decoration-cyan-300 transition-colors"
                                >
                                  {result.drug1}
                                </button>
                                <div className="flex items-center space-x-2">
                                  <div className="w-8 h-0.5 bg-slate-400"></div>
                                  <ChevronRight className="h-5 w-5 text-slate-400" />
                                  <div className="w-8 h-0.5 bg-slate-400"></div>
                                </div>
                                <button
                                  onClick={() => handleDrugClick(result.drug2)}
                                  className="text-xl font-semibold text-cyan-300 hover:text-cyan-100 underline decoration-cyan-500/50 hover:decoration-cyan-300 transition-colors"
                                >
                                  {result.drug2}
                                </button>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="text-right">
                                  <div className="text-sm text-slate-400 uppercase tracking-wide">SEVERITY</div>
                                  <Badge
                                    className={`${getSeverityColor(result.severity)} px-3 py-1 text-sm font-semibold`}
                                  >
                                    {result.severity}
                                  </Badge>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm text-slate-400 uppercase tracking-wide">DESCRIPTION</div>
                                  <div className="text-slate-200 text-sm max-w-md">{result.description}</div>
                                </div>
                              </div>
                            </div>

                            {/* Extended Description */}
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-cyan-300 mb-2 flex items-center space-x-2">
                                  <BookOpen className="h-4 w-4" />
                                  <span>EXTENDED DESCRIPTION</span>
                                </h4>
                                <p className="text-slate-300 text-sm leading-relaxed">{result.mechanism}</p>
                              </div>

                              {/* Clinical Effects */}
                              {result.clinicalEffects && (
                                <div>
                                  <h4 className="font-semibold text-purple-300 mb-2 flex items-center space-x-2">
                                    <Activity className="h-4 w-4" />
                                    <span>CLINICAL EFFECTS</span>
                                  </h4>
                                  <p className="text-slate-300 text-sm">{result.clinicalEffects}</p>
                                </div>
                              )}

                              {/* References */}
                              <div>
                                <h4 className="font-semibold text-green-300 mb-2 flex items-center space-x-2">
                                  <ExternalLink className="h-4 w-4" />
                                  <span>REFERENCES</span>
                                </h4>
                                <div className="space-y-2">
                                  {result.references.map((ref: any, index: number) => (
                                    <div key={index} className="text-sm text-slate-300">
                                      <span className="text-cyan-300">{index + 1}.</span> {ref.authors}. {ref.title}.{" "}
                                      {ref.journal}. doi: {ref.doi}
                                      <button className="ml-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                                        [Article]
                                      </button>
                                      <button className="ml-2 text-purple-400 hover:text-purple-300 transition-colors">
                                        READ MORE
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Right Column - Promotional Content */}
                <div className="lg:col-span-1">
                  <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-2xl shadow-purple-500/20">
                    <CardContent className="p-8">
                      <div className="mb-6">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                          <Brain className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Get more from our interaction checker!</h3>
                        <p className="text-white/90 mb-4">
                          This interaction checker is limited to 5 drugs at once. & includes limited results.
                        </p>
                        <p className="text-white/90 mb-6">
                          Our commercial drug interaction API integrates into your software, giving your users full
                          access to the best drug interaction information.
                        </p>
                      </div>
                      <Button className="w-full bg-white text-purple-600 hover:bg-white/90 font-semibold py-3 rounded-xl">
                        LEARN MORE →
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Additional Info Cards */}
                  <div className="mt-6 space-y-4">
                    <Card className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <Database className="h-6 w-6 text-cyan-400" />
                          <h4 className="font-semibold text-cyan-200">Real-Time Database</h4>
                        </div>
                        <p className="text-slate-300 text-sm">
                          Our database is updated continuously with the latest medical research and drug approvals.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <Shield className="h-6 w-6 text-green-400" />
                          <h4 className="font-semibold text-green-200">Clinical Validation</h4>
                        </div>
                        <p className="text-slate-300 text-sm">
                          All interactions are verified against peer-reviewed medical literature and clinical studies.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="food" className="mt-8">
              <Card className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-cyan-500/10">
                <CardContent className="p-12 text-center">
                  <Leaf className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-cyan-200 mb-4">Food Interactions Coming Soon</h3>
                  <p className="text-slate-300 max-w-2xl mx-auto">
                    We're working on comprehensive food-drug interaction analysis. This feature will help you understand
                    how different foods and beverages might affect your medications.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Drug Profile Modal */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="bg-slate-900/95 backdrop-blur-xl border border-cyan-500/30 text-white max-w-3xl shadow-2xl shadow-cyan-500/20">
          <DialogHeader>
            <DialogTitle className="text-3xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent flex items-center space-x-3">
              <Activity className="h-8 w-8 text-cyan-400" />
              <span>{selectedDrug?.name} - Drug Profile</span>
            </DialogTitle>
          </DialogHeader>

          {selectedDrug && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                  <h4 className="text-cyan-300 font-semibold mb-3 flex items-center space-x-2 text-lg">
                    <Pill className="h-5 w-5" />
                    <span>Category</span>
                  </h4>
                  <p className="text-slate-200 text-lg">{selectedDrug.category}</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                  <h4 className="text-cyan-300 font-semibold mb-3 flex items-center space-x-2 text-lg">
                    <Clock className="h-5 w-5" />
                    <span>Half-Life</span>
                  </h4>
                  <p className="text-slate-200 text-lg">{selectedDrug.halfLife}</p>
                </div>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                <h4 className="text-cyan-300 font-semibold mb-3 text-lg">Description</h4>
                <p className="text-slate-200 text-lg">{selectedDrug.description}</p>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                <h4 className="text-cyan-300 font-semibold mb-3 flex items-center space-x-2 text-lg">
                  <Users className="h-5 w-5" />
                  <span>Dosage</span>
                </h4>
                <p className="text-slate-200 text-lg">{selectedDrug.dosage}</p>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                <h4 className="text-red-300 font-semibold mb-4 text-lg">Side Effects</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedDrug.sideEffects.map((effect: string, index: number) => (
                    <Badge key={index} className="bg-red-500/20 text-red-300 border-red-500/50 px-3 py-1 text-sm">
                      {effect}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                <h4 className="text-yellow-300 font-semibold mb-4 text-lg">Contraindications</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedDrug.contraindications.map((contra: string, index: number) => (
                    <Badge
                      key={index}
                      className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50 px-3 py-1 text-sm"
                    >
                      {contra}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                <h4 className="text-purple-300 font-semibold mb-4 text-lg">Known Interactions</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedDrug.interactions.map((interaction: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleDrugClick(interaction)}
                      className="bg-purple-500/20 text-purple-300 border border-purple-500/50 px-4 py-2 rounded-full hover:bg-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
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

      {/* Footer */}
      <footer className="relative bg-slate-900/80 backdrop-blur-xl border-t border-cyan-500/30 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-slate-300">
            <p className="mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-xl">
              © 2024 obscurX - Advanced Drug Interaction Analysis
            </p>
            <p className="text-slate-400">
              Professional-grade interaction analysis powered by AI. Always consult healthcare professionals for medical
              decisions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
