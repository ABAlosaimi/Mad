import { useState } from 'react';
import Dashboard from './components/Dashboard';
import PropertyLookup from './components/PropertyLookup';
import Sidebar from './components/Sidebar';
import PropertyAddressCodes from './components/PropertyAddressCodes';
import WaterPage from './components/WaterPage';
import ElectricityPage from './components/ElectricityPage';
import InternetPage from './components/InternetPage';
import PropertiesPage from './components/PropertiesPage';
import LookupCodePage from './components/LookupCodePage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import AgentChatbot from './components/AgentChatbot';
import { MessageCircle } from 'lucide-react';

type AppState = 'landing' | 'auth' | 'app' | 'lookup';
type View = 'dashboard' | 'water' | 'electricity' | 'internet' | 'property-address-codes' | 'lookup-code' | 'properties' | 'profile' | 'settings';
type AuthMode = 'login' | 'signup';

function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [authMode, setAuthMode] = useState<AuthMode>('signup');
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatInitialMessage, setChatInitialMessage] = useState<string | null>(null);

  if (appState === 'landing') {
    return (
      <LandingPage
        onLogin={() => {
          setAuthMode('login');
          setAppState('auth');
        }}
        onSignUp={() => {
          setAuthMode('signup');
          setAppState('auth');
        }}
        onLookupCode={() => {
          setAppState('lookup');
        }}
      />
    );
  }

  if (appState === 'lookup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-md border-b border-white/10 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <button onClick={() => setAppState('landing')} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1.5">
                    <img
                      src="/whatsapp_image_2025-12-10_at_23.10.44.jpeg"
                      alt="Mad Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-xl font-bold text-white">Mad</span>
                </button>
              </div>
              <div className="flex gap-4 items-center">
                <button onClick={() => setAppState('landing')} className="text-slate-300 hover:text-white transition">
                  Back to Home
                </button>
                <button onClick={() => {
                  setAuthMode('login');
                  setAppState('auth');
                }} className="text-slate-300 hover:text-white transition">
                  Login
                </button>
                <button onClick={() => {
                  setAuthMode('signup');
                  setAppState('auth');
                }} className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </nav>
        <div className="pt-16">
          <LookupCodePage />
        </div>
      </div>
    );
  }

  if (appState === 'auth') {
    return (
      <AuthPage
        onAuthSuccess={() => setAppState('app')}
        onBack={() => setAppState('landing')}
        initialMode={authMode}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      <Sidebar currentPage={currentView} onNavigate={(page) => setCurrentView(page as View)} />

      <main className="flex-1 ml-64">
        {currentView === 'dashboard' && <Dashboard onOpenChat={(message) => {
          setChatInitialMessage(message);
          setShowChatbot(true);
        }} />}
        {currentView === 'water' && <WaterPage onOpenChat={(message) => {
          setChatInitialMessage(message);
          setShowChatbot(true);
        }} />}
        {currentView === 'electricity' && <ElectricityPage />}
        {currentView === 'internet' && <InternetPage />}
        {currentView === 'property-address-codes' && <PropertyAddressCodes />}
        {currentView === 'lookup-code' && <LookupCodePage />}
        {currentView === 'properties' && <PropertiesPage />}
        {currentView === 'profile' && <ProfilePage />}
        {currentView === 'settings' && <SettingsPage />}
      </main>

      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all flex items-center justify-center hover:scale-110 z-40"
        title="Open AI Assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {showChatbot && (
        <AgentChatbot
          onClose={() => {
            setShowChatbot(false);
            setChatInitialMessage(null);
          }}
          initialMessage={chatInitialMessage}
        />
      )}
    </div>
  );
}

export default App;
