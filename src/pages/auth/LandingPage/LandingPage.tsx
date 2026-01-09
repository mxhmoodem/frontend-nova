import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Database,
  MessageSquare,
  PieChart,
  Check,
  Sparkles,
} from 'lucide-react';
import { CornerPattern } from '../../../components/layout';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-x-hidden">
      <CornerPattern />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] pointer-events-none z-0" />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-xl tracking-tight text-foreground">
            <div className="w-10 h-10 bg-white border border-border rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-primary font-bold text-lg">N</span>
            </div>
            Noval IQ
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a
              href="#capabilities"
              className="hover:text-primary transition-colors"
            >
              Capabilities
            </a>
            <a href="#about" className="hover:text-primary transition-colors">
              About
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-bold text-primary">
              <Sparkles className="w-3 h-3" />
              AI-Powered Market Intelligence
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Turn fragmented payment data into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-600">
                strategic advantage
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Centralise regulatory updates, scheme rules, and market trends.
              Use our GenAI assistant to instantly extract insights for product,
              risk, and strategy decisions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="h-12 px-8 flex items-center justify-center gap-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-all shadow-lg"
              >
                Request Access <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="h-12 px-8 flex items-center justify-center gap-2 border border-border bg-card text-foreground rounded-lg font-medium hover:bg-secondary transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="py-24 bg-secondary/30 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              A unified operating system for payments
            </h2>
            <p className="text-muted-foreground text-lg">
              Stop searching through spreadsheets and PDFs. We bring it all
              together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Centralise Data</h3>
              <p className="text-muted-foreground">
                Ingest regulatory docs, scheme rules, and emails into a secure
                vector database.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-500" /> Scheme Updates
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-500" /> Competitor Reports
                </li>
              </ul>
            </div>

            <div className="group p-8 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Ask Questions</h3>
              <p className="text-muted-foreground">
                Chat with your data. Get instant, cited answers based on your
                documents.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" /> Natural Language
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" /> Citations
                </li>
              </ul>
            </div>

            <div className="group p-8 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <PieChart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Generate Insights</h3>
              <p className="text-muted-foreground">
                Turn raw data into executive-ready reports in seconds.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Dashboards
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Gap Analysis
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Noval IQ. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
