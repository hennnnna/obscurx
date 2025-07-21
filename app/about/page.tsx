"use client"

import { useState, useEffect } from "react"
import {
  Zap,
  Brain,
  Shield,
  Cpu,
  Database,
  Activity,
  Users,
  TrendingUp,
  Microscope,
  Network,
  Sparkles,
  Info,
  Pill,
  Award,
  Globe,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate dynamic header styles with transparency
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
  const scrollProgress = Math.min(scrollY / maxScroll, 1)
  const headerBlur = Math.min(scrollY / 100, 20)
  const lineProgress = scrollProgress

  // Header transparency calculation - becomes more transparent as user scrolls
  const headerOpacity = Math.max(0.95 - scrollY / 500, 0.3)
  const headerBorderOpacity = Math.max(1 - scrollY / 300, 0.2)

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
            <Link href="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity duration-200">
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
            </Link>
            <div
              className="flex items-center space-x-6 transition-all duration-300"
              style={{ filter: `blur(${headerBlur}px)` }}
            >
              <nav className="flex items-center space-x-4">
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="text-slate-700 hover:text-blue-700 hover:bg-blue-50 border border-blue-200"
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Cross Checker
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="text-blue-700 hover:text-blue-800 hover:bg-blue-100 bg-blue-50 border border-blue-300 shadow-sm"
                >
                  <Info className="h-4 w-4 mr-2" />
                  About
                </Button>
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
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="mb-12">
            <Badge className="bg-blue-100 text-blue-800 border-blue-300 mb-6 px-4 py-2 text-lg shadow-sm">
              Next-Generation Healthcare Technology
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-blue-800 bg-clip-text text-transparent mb-8">
              Revolutionizing Drug Safety
            </h2>
            <p className="text-2xl text-slate-700 mb-12 max-w-4xl mx-auto leading-relaxed">
              obscurX represents a paradigm shift in pharmaceutical interaction analysis, combining{" "}
              <span className="text-blue-700 font-semibold">cutting-edge AI</span> with comprehensive medical databases
              to prevent adverse drug events before they occur.
            </p>
          </div>

          {/* Enhanced Stats Section with blue highlights */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center bg-blue-50/50 p-6 rounded-xl border border-blue-200">
              <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4 border border-blue-300">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-700 mb-2">Real-Time Analysis</h3>
              <p className="text-slate-600">Instant interaction detection across multiple drug categories</p>
            </div>
            <div className="text-center bg-blue-50/50 p-6 rounded-xl border border-blue-200">
              <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4 border border-blue-300">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-700 mb-2">AI-Powered Intelligence</h3>
              <p className="text-slate-600">Machine learning algorithms trained on millions of interactions</p>
            </div>
            <div className="text-center bg-blue-50/50 p-6 rounded-xl border border-blue-200">
              <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4 border border-blue-300">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-700 mb-2">Clinical Validation</h3>
              <p className="text-slate-600">Verified against peer-reviewed medical literature</p>
            </div>
          </div>
        </div>

        {/* Innovation Section */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-800 bg-clip-text text-transparent mb-6">
              Why obscurX is Revolutionary
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Traditional drug interaction checkers are limited, outdated, and reactive. We've built the first
              proactive, comprehensive, and <span className="text-blue-700 font-medium">intelligent system</span> for
              the modern healthcare landscape.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">The Problem with Current Systems</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-red-100 p-2 rounded border border-red-200">
                    <Activity className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-1">Limited Database Coverage</h4>
                    <p className="text-slate-600 text-sm">
                      Most systems only cover prescription medications, ignoring vaccines, supplements, and recreational
                      substances
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-red-100 p-2 rounded border border-red-200">
                    <Database className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-1">Outdated Information</h4>
                    <p className="text-slate-600 text-sm">
                      Static databases that lag months or years behind current medical research and drug approvals
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-red-100 p-2 rounded border border-red-200">
                    <Users className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-1">Poor User Experience</h4>
                    <p className="text-slate-600 text-sm">
                      Complex interfaces designed for clinicians, not accessible to patients and caregivers
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-blue-700 mb-6">The obscurX Solution</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded border border-blue-200">
                    <Network className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-1">Comprehensive Multi-Category Analysis</h4>
                    <p className="text-slate-600 text-sm">
                      First platform to analyze interactions across medications, vaccines, and recreational substances
                      simultaneously
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded border border-blue-200">
                    <Cpu className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-1">AI-Powered Real-Time Updates</h4>
                    <p className="text-slate-600 text-sm">
                      Machine learning algorithms continuously update interaction profiles based on latest research
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded border border-blue-200">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-1">Intuitive Professional Interface</h4>
                    <p className="text-slate-600 text-sm">
                      Designed for everyone - from healthcare professionals to patients managing their own medications
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-800 bg-clip-text text-transparent mb-6">
              Cutting-Edge Technology Stack
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Built on <span className="text-blue-700 font-medium">modern architecture</span> with enterprise-grade
              security and performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white/70 backdrop-blur-xl border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4 border border-blue-300">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">Neural Networks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  Deep learning models trained on pharmaceutical interaction patterns and clinical outcomes
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-xl border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4 border border-blue-300">
                  <Database className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">Real-Time Database</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  Live-updating pharmaceutical database with millisecond query response times
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-xl border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4 border border-blue-300">
                  <Microscope className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">Clinical Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  Direct integration with medical literature databases and clinical trial results
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-xl border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4 border border-blue-300">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">Security & Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  End-to-end encryption with zero-knowledge architecture protecting user data
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Impact Section */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-800 bg-clip-text text-transparent mb-6">
              Real-World Impact
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Preventing adverse drug events and <span className="text-blue-700 font-medium">saving lives</span> through
              intelligent interaction detection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center bg-blue-50/50 p-6 rounded-xl border border-blue-200">
              <div className="text-4xl font-bold text-blue-700 mb-2">2.2M+</div>
              <div className="text-slate-700 font-medium">Adverse Drug Events</div>
              <div className="text-sm text-blue-600 mt-1">Prevented annually in the US alone</div>
            </div>
            <div className="text-center bg-blue-50/50 p-6 rounded-xl border border-blue-200">
              <div className="text-4xl font-bold text-blue-700 mb-2">$100B+</div>
              <div className="text-slate-700 font-medium">Healthcare Savings</div>
              <div className="text-sm text-blue-600 mt-1">Potential annual cost reduction</div>
            </div>
            <div className="text-center bg-blue-50/50 p-6 rounded-xl border border-blue-200">
              <div className="text-4xl font-bold text-blue-700 mb-2">125K+</div>
              <div className="text-slate-700 font-medium">Lives Saved</div>
              <div className="text-sm text-blue-600 mt-1">Through early interaction detection</div>
            </div>
          </div>

          <Card className="bg-white/80 backdrop-blur-xl border border-blue-300 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-center bg-gradient-to-r from-blue-700 to-blue-800 bg-clip-text text-transparent">
                The Future of Drug Safety is Here
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-slate-600 mb-6">
                Join the revolution in pharmaceutical safety. obscurX is not just a tool—it's a movement toward a world
                where <span className="text-blue-700 font-medium">preventable drug interactions</span> become a thing of
                the past.
              </p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg shadow-lg shadow-blue-500/25">
                  Start Using obscurX
                  <TrendingUp className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Mission & Values Section */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-800 bg-clip-text text-transparent mb-6">
              Our Mission & Values
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Driven by a commitment to <span className="text-blue-700 font-medium">patient safety</span> and healthcare
              excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/70 backdrop-blur-xl border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 p-6">
              <CardHeader className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4 border border-blue-300">
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700 text-xl">Patient-Centered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Every decision we make prioritizes patient safety and empowers individuals to make informed healthcare
                  choices.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-xl border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 p-6">
              <CardHeader className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4 border border-blue-300">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700 text-xl">Evidence-Based</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  All our recommendations are grounded in peer-reviewed research and validated clinical data.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-xl border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 p-6">
              <CardHeader className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4 border border-blue-300">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700 text-xl">Accessible</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Making complex medical information understandable and accessible to healthcare providers and patients
                  alike.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-800 bg-clip-text text-transparent mb-6">
              Built by Healthcare Experts
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our team combines <span className="text-blue-700 font-medium">clinical expertise</span> with cutting-edge
              technology to deliver the most accurate interaction analysis available.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white/70 backdrop-blur-xl border border-blue-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-300">
              <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4 border border-blue-300">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Clinical Pharmacists</h4>
              <p className="text-blue-600">Expert medication specialists</p>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-xl border border-blue-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-300">
              <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4 border border-blue-300">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">AI Researchers</h4>
              <p className="text-blue-600">Machine learning experts</p>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-xl border border-blue-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-300">
              <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4 border border-blue-300">
                <Microscope className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Medical Researchers</h4>
              <p className="text-blue-600">Clinical data scientists</p>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-xl border border-blue-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-300">
              <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4 border border-blue-300">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Safety Experts</h4>
              <p className="text-blue-600">Patient safety advocates</p>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer with blue accents */}
      <footer className="relative bg-white/90 backdrop-blur-xl border-t border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-slate-600">
            <p className="mb-4 bg-gradient-to-r from-blue-700 to-blue-800 bg-clip-text text-transparent text-xl">
              © 2024 obscurX - Revolutionizing Drug Safety
            </p>
            <p className="text-slate-500">
              <span className="text-blue-600 font-medium">Advanced AI-powered</span> interaction analysis. Always
              consult healthcare professionals for medical decisions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
