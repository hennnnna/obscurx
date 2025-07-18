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

  // Calculate dynamic header styles based on page height
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
  const scrollProgress = Math.min(scrollY / maxScroll, 1)
  const headerBlur = Math.min(scrollY / 100, 20)
  const lineProgress = scrollProgress // Use full scroll progress for complete loop

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Perimeter Line Animation - Complete Loop */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {/* Top line */}
        <div
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/50"
          style={{
            width: `${Math.min(lineProgress * 4 * 100, 100)}%`,
            opacity: lineProgress > 0 ? 0.8 : 0,
          }}
        />
        {/* Right line */}
        <div
          className="absolute top-0 right-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50"
          style={{
            height: `${Math.max(0, Math.min((lineProgress - 0.25) * 4 * 100, 100))}%`,
            opacity: lineProgress > 0.25 ? 0.8 : 0,
          }}
        />
        {/* Bottom line */}
        <div
          className="absolute bottom-0 right-0 h-1 bg-gradient-to-l from-pink-500 to-green-500 shadow-lg shadow-pink-500/50"
          style={{
            width: `${Math.max(0, Math.min((lineProgress - 0.5) * 4 * 100, 100))}%`,
            opacity: lineProgress > 0.5 ? 0.8 : 0,
          }}
        />
        {/* Left line */}
        <div
          className="absolute bottom-0 left-0 w-1 bg-gradient-to-t from-green-500 to-cyan-500 shadow-lg shadow-green-500/50"
          style={{
            height: `${Math.max(0, Math.min((lineProgress - 0.75) * 4 * 100, 100))}%`,
            opacity: lineProgress > 0.75 ? 0.8 : 0,
          }}
        />
      </div>

      {/* Dynamic Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: `rgba(15, 23, 42, 0.95)`,
          backdropFilter: `blur(20px)`,
          borderBottom: `1px solid rgba(34, 211, 238, ${Math.max(0.3 - scrollY / 1000, 0.1)})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity duration-200">
              {/* Logo - always visible */}
              <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-2 rounded-lg shadow-lg shadow-cyan-500/25">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    obscurX
                  </h1>
                </div>
                {/* Subtitle that blurs with scroll */}
                <div className="transition-all duration-300" style={{ filter: `blur(${headerBlur}px)` }}>
                  <p className="text-sm text-cyan-300/80 whitespace-nowrap">
                    AI-Powered clarity for complex drug combinations
                  </p>
                </div>
              </div>
            </Link>
            <nav
              className="flex items-center space-x-4 transition-all duration-300"
              style={{ filter: `blur(${headerBlur}px)` }}
            >
              <Link href="/">
                <Button
                  variant="ghost"
                  className="text-cyan-300 hover:text-cyan-100 hover:bg-cyan-500/10 border border-cyan-500/30"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Cross Checker
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="text-cyan-300 hover:text-cyan-100 hover:bg-cyan-500/10 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30"
              >
                <Info className="h-4 w-4 mr-2" />
                About
              </Button>
            </nav>
          </div>
        </div>

        {/* Animated outline line */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, 
              transparent ${lineProgress * 25}%, 
              rgba(34, 211, 238, 0.6) ${lineProgress * 25 + 1}%, 
              rgba(34, 211, 238, 0.6) ${lineProgress * 25 + 2}%, 
              transparent ${lineProgress * 25 + 3}%)`,
            height: "2px",
            top: "auto",
            bottom: 0,
          }}
        />
      </header>

      {/* Main Content */}
      <main className="relative pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="mb-8">
            <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-cyan-500/30 mb-4">
              Next-Generation Healthcare Technology
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-6">
              Revolutionizing Drug Safety
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              obscurX represents a paradigm shift in pharmaceutical interaction analysis, combining cutting-edge AI with
              comprehensive medical databases to prevent adverse drug events before they occur.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 rounded-full w-fit mx-auto mb-4 border border-cyan-500/30">
                <Zap className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-cyan-200 mb-2">Real-Time Analysis</h3>
              <p className="text-slate-400">Instant interaction detection across multiple drug categories</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-full w-fit mx-auto mb-4 border border-purple-500/30">
                <Brain className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-purple-200 mb-2">AI-Powered Intelligence</h3>
              <p className="text-slate-400">Machine learning algorithms trained on millions of interactions</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 p-4 rounded-full w-fit mx-auto mb-4 border border-green-500/30">
                <Shield className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-green-200 mb-2">Clinical Validation</h3>
              <p className="text-slate-400">Verified against peer-reviewed medical literature</p>
            </div>
          </div>
        </section>

        {/* Innovation Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Why obscurX is Revolutionary
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Traditional drug interaction checkers are limited, outdated, and reactive. We've built the first
              proactive, comprehensive, and intelligent system for the modern healthcare landscape.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-cyan-200 mb-6">The Problem with Current Systems</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-red-500/20 p-2 rounded border border-red-500/30">
                    <Activity className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-300 mb-1">Limited Database Coverage</h4>
                    <p className="text-slate-400 text-sm">
                      Most systems only cover prescription medications, ignoring vaccines, supplements, and recreational
                      substances
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-red-500/20 p-2 rounded border border-red-500/30">
                    <Database className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-300 mb-1">Outdated Information</h4>
                    <p className="text-slate-400 text-sm">
                      Static databases that lag months or years behind current medical research and drug approvals
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-red-500/20 p-2 rounded border border-red-500/30">
                    <Users className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-300 mb-1">Poor User Experience</h4>
                    <p className="text-slate-400 text-sm">
                      Complex interfaces designed for clinicians, not accessible to patients and caregivers
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-green-200 mb-6">The obscurX Solution</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500/20 p-2 rounded border border-green-500/30">
                    <Network className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-300 mb-1">Comprehensive Multi-Category Analysis</h4>
                    <p className="text-slate-400 text-sm">
                      First platform to analyze interactions across medications, vaccines, and recreational substances
                      simultaneously
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500/20 p-2 rounded border border-green-500/30">
                    <Cpu className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-300 mb-1">AI-Powered Real-Time Updates</h4>
                    <p className="text-slate-400 text-sm">
                      Machine learning algorithms continuously update interaction profiles based on latest research
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500/20 p-2 rounded border border-green-500/30">
                    <Sparkles className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-300 mb-1">Intuitive Futuristic Interface</h4>
                    <p className="text-slate-400 text-sm">
                      Designed for everyone - from healthcare professionals to patients managing their own medications
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Cutting-Edge Technology Stack
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Built on modern architecture with enterprise-grade security and performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-3 rounded-full w-fit mx-auto mb-4 border border-cyan-500/30">
                  <Brain className="h-6 w-6 text-cyan-400" />
                </div>
                <CardTitle className="text-cyan-100">Neural Networks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm">
                  Deep learning models trained on pharmaceutical interaction patterns and clinical outcomes
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3 rounded-full w-fit mx-auto mb-4 border border-purple-500/30">
                  <Database className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-purple-100">Real-Time Database</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm">
                  Live-updating pharmaceutical database with millisecond query response times
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 hover:border-green-500/30 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 p-3 rounded-full w-fit mx-auto mb-4 border border-green-500/30">
                  <Microscope className="h-6 w-6 text-green-400" />
                </div>
                <CardTitle className="text-green-100">Clinical Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm">
                  Direct integration with medical literature databases and clinical trial results
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 hover:border-yellow-500/30 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-3 rounded-full w-fit mx-auto mb-4 border border-yellow-500/30">
                  <Shield className="h-6 w-6 text-yellow-400" />
                </div>
                <CardTitle className="text-yellow-100">Security & Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm">
                  End-to-end encryption with zero-knowledge architecture protecting user data
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Impact Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent mb-6">
              Real-World Impact
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Preventing adverse drug events and saving lives through intelligent interaction detection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">2.2M+</div>
              <div className="text-slate-300">Adverse Drug Events</div>
              <div className="text-sm text-slate-400 mt-1">Prevented annually in the US alone</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">$100B+</div>
              <div className="text-slate-300">Healthcare Savings</div>
              <div className="text-sm text-slate-400 mt-1">Potential annual cost reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">125K+</div>
              <div className="text-slate-300">Lives Saved</div>
              <div className="text-sm text-slate-400 mt-1">Through early interaction detection</div>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
            <CardHeader>
              <CardTitle className="text-2xl text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                The Future of Drug Safety is Here
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-slate-300 mb-6">
                Join the revolution in pharmaceutical safety. obscurX is not just a tool—it's a movement toward a world
                where preventable drug interactions become a thing of the past.
              </p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-8 py-3 text-lg shadow-lg shadow-cyan-500/25">
                  Start Using obscurX
                  <TrendingUp className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative bg-slate-900/80 backdrop-blur-xl border-t border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-300">
            <p className="mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              © 2024 obscurX - Revolutionizing Drug Safety
            </p>
            <p className="text-sm text-slate-400">
              Advanced AI-powered interaction analysis. Always consult healthcare professionals for medical decisions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
