import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { seedDatabaseIfEmpty } from './db';
import { ConnectionBadge } from './components/ConnectionBadge';
import { MobileAccessModal } from './components/MobileAccessModal';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { EmergencyModePage } from './pages/EmergencyModePage';
import { ContactsPage } from './pages/ContactsPage';
import { EmergencyCardPage } from './pages/EmergencyCardPage';
import { SOSPage } from './pages/SOSPage';
import { MapPage } from './pages/MapPage';
import { ChecklistPage } from './pages/ChecklistPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { SettingsPage } from './pages/SettingsPage';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  Radio, 
  Phone, 
  FileText, 
  MapPin, 
  CheckSquare, 
  Lock, 
  Settings, 
  AlertOctagon,
  LogOut,
  Smartphone
} from 'lucide-react';
import { useBattery } from './hooks/useBattery';
import { useTriageStore } from './stores/triageStore';

const TriageManager: React.FC = () => {
  const battery = useBattery();
  const setAutoTriage = useTriageStore((state) => state.setAutoTriage);
  const isTriageActive = useTriageStore((state) => state.isSimulatedTriage || state.isAutoTriage);

  useEffect(() => {
    if (battery.supported && !battery.charging && battery.level < 0.15) {
      setAutoTriage(true);
    } else {
      setAutoTriage(false);
    }
  }, [battery.supported, battery.charging, battery.level, setAutoTriage]);

  useEffect(() => {
    if (isTriageActive) {
      document.documentElement.classList.add('triage-mode');
    } else {
      document.documentElement.classList.remove('triage-mode');
    }
  }, [isTriageActive]);

  return null;
};

const GlobalKeyboardListener: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        navigate('/emergency');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null;
};

const NavigationLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const isAuthPage = location.pathname === '/' || location.pathname === '/auth';
  const isEmergencyPage = location.pathname === '/emergency';

  if (isAuthPage || isEmergencyPage) {
    return <>{children}</>;
  }

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/sos', label: 'SOS Center', icon: Radio },
    { path: '/contacts', label: 'Contacts', icon: Phone },
    { path: '/card', label: 'Medical Card', icon: FileText },
    { path: '/map', label: 'Offline Map', icon: MapPin },
    { path: '/checklist', label: 'Checklist', icon: CheckSquare },
    { path: '/documents', label: 'Vault Docs', icon: Lock },
    { path: '/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      {/* Desktop Tactical Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-zinc-800/80 bg-zinc-900/90 p-4 justify-between shrink-0">
        <div className="space-y-4 overflow-y-auto pr-1">
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="p-2 rounded-xl bg-red-600 text-white shadow-lg shadow-red-950/60">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-mono font-black text-xl tracking-tight text-white leading-none uppercase">
                BLACKOUT
              </h1>
              <span className="text-[10px] font-mono tracking-widest text-red-400 font-bold">
                EMERGENCY KIT
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const IconComp = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-red-500/10 text-red-400 border border-red-500/30 shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-red-400' : 'text-zinc-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* MOBILE ACCESS BUTTON DIRECTLY BELOW SETTINGS */}
          <div className="pt-2">
            <button
              onClick={() => setIsMobileModalOpen(true)}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-mono text-xs font-bold text-emerald-400 hover:bg-emerald-500/10 border border-emerald-500/20 transition-all shadow-sm"
            >
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>Mobile Access</span>
            </button>
          </div>
        </div>

        {/* Tactical Emergency Shortcut Button & Lock Vault */}
        <div className="space-y-2 pt-3 border-t border-zinc-800/80">
          <Link
            to="/emergency"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-red-950/50"
          >
            <AlertOctagon className="w-4 h-4 animate-pulse" />
            <span>EMERGENCY MODE</span>
          </Link>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-2 bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 font-mono text-xs rounded-xl border border-zinc-800 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-zinc-500" />
            <span>LOCK VAULT</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Responsive Header */}
        <header className="h-16 border-b border-zinc-800/80 bg-zinc-900/60 px-4 md:px-6 flex items-center justify-between shrink-0 backdrop-blur-md">
          <div className="flex items-center gap-3 lg:hidden">
            <div className="p-1.5 rounded-lg bg-red-600 text-white">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className="font-mono font-black text-lg text-white uppercase tracking-tight">BLACKOUT</span>
          </div>

          <div className="hidden lg:block text-xs font-mono text-zinc-400">
            AUTONOMOUS LOCAL REPOSITORY &bull; NO CLOUD DEPENDENCY
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileModalOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1.5"
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">Mobile Access</span>
            </button>
            <ConnectionBadge />
            <Link
              to="/emergency"
              className="lg:hidden p-2 bg-red-600 text-white rounded-xl flex items-center justify-center"
              title="Emergency Mode"
            >
              <AlertOctagon className="w-5 h-5 animate-pulse" />
            </Link>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <nav className="lg:hidden border-t border-zinc-800 bg-zinc-900/90 backdrop-blur-md px-2 py-2 flex items-center justify-around shrink-0">
          {navLinks.slice(0, 5).map((link) => {
            const IconComp = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-mono ${
                  isActive ? 'text-red-400 font-bold' : 'text-zinc-400'
                }`}
              >
                <IconComp className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Access Modal Component */}
      <MobileAccessModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  useEffect(() => {
    seedDatabaseIfEmpty();
  }, []);

  return (
    <BrowserRouter>
      <TriageManager />
      <GlobalKeyboardListener />
      <NavigationLayout>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/emergency" element={<EmergencyModePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/card" element={<EmergencyCardPage />} />
          <Route path="/sos" element={<SOSPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/checklist" element={<ChecklistPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </NavigationLayout>
    </BrowserRouter>
  );
};

export default App;
