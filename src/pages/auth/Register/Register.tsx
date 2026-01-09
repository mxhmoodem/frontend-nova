import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock, Building } from 'lucide-react';
import { CornerPattern } from '../../../components/layout';

export default function Register() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 relative font-sans">
      <CornerPattern />

      <Link
        to="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>

      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-xl shadow-lg p-8 md:p-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-white border border-border rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <span className="text-3xl font-bold text-primary">N</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Request Access
            </h1>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Fill in your details to get started
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Jane Smith"
                  className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-transparent rounded-lg text-sm focus:bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                Work Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-transparent rounded-lg text-sm focus:bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                Company
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Company name"
                  className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-transparent rounded-lg text-sm focus:bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-transparent rounded-lg text-sm focus:bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold text-sm text-center shadow-md transition-all"
            >
              Request Access
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary hover:text-primary/80 font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
