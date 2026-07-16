import React, { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import NotFound from "@/pages/not-found";
import { Menu, Bell, Phone, MessageSquare, Video, Image as ImageIcon, Settings, X, Zap, LayoutDashboard, Coins, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import CreditCoinShop from "@/components/CreditCoinShop";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import logoImg from "@assets/WhatsApp_Image_2026-07-02_at_9.38.54_AM_1783011372119.jpeg";

import Dashboard from "@/pages/dashboard";
import ActivityIntelligence from "@/pages/activity";
import Chats from "@/pages/chats";
import Calls from "@/pages/calls";
import Videos from "@/pages/videos";
import Photos from "@/pages/photos";
import SettingsPage from "@/pages/settings";
import InstagramSpy from "@/pages/instagram";
import TinderPage from "@/pages/tinder";

const queryClient = new QueryClient();

// PIN Screen Component
function PinScreen({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const correctPin = "558295";

  useEffect(() => {
    if (pin.length === 6) {
      if (pin === correctPin) {
        onUnlock();
      } else {
        setError(true);
        setTimeout(() => {
          setPin("");
          setError(false);
        }, 800);
      }
    }
  }, [pin, onUnlock]);

  const handleInput = (val: string) => {
    if (pin.length < 6) setPin(prev => prev + val);
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background p-4 font-sans text-foreground">
      <motion.div
        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm backdrop-blur-xl bg-card/40 border border-primary/30 rounded-2xl p-8 shadow-2xl shadow-primary/20 flex flex-col items-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

        <div className="w-28 h-28 rounded-2xl overflow-hidden mb-6 shadow-[0_0_30px_rgba(204,0,255,0.7)] border-2 border-primary/50">
          <img src={logoImg} alt="Cipher Tech" className="w-full h-full object-cover" />
        </div>

        <h1 className="text-2xl font-bold tracking-widest text-center mb-2">CIPHER TECH</h1>
        <p className="text-muted-foreground text-sm mb-8 text-center uppercase tracking-wider">Let's Get You In</p>

        <div className="flex gap-2 mb-8">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-10 h-14 rounded-lg flex items-center justify-center text-2xl font-mono border-2 transition-all duration-300 ${pin.length === i ? 'border-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]' : pin.length > i ? 'border-primary/50 text-foreground' : 'border-muted text-transparent'}`}
            >
              {pin[i] ? "•" : ""}
            </div>
          ))}
        </div>

        {error && <p className="text-destructive font-bold mb-4 uppercase tracking-widest text-sm animate-pulse">Access Denied</p>}

        <div className="grid grid-cols-3 gap-4 w-full max-w-[280px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              data-testid={`pin-btn-${num}`}
              onClick={() => handleInput(num.toString())}
              className="h-14 rounded-xl bg-secondary/50 hover:bg-primary/20 hover:border-primary/50 border border-transparent transition-all text-xl active:scale-95"
            >
              {num}
            </button>
          ))}
          <div />
          <button
            data-testid="pin-btn-0"
            onClick={() => handleInput("0")}
            className="h-14 rounded-xl bg-secondary/50 hover:bg-primary/20 hover:border-primary/50 border border-transparent transition-all text-xl active:scale-95"
          >
            0
          </button>
          <button
            data-testid="pin-btn-backspace"
            onClick={handleBackspace}
            className="h-14 rounded-xl bg-secondary/50 hover:bg-destructive/20 hover:border-destructive/50 border border-transparent transition-all flex items-center justify-center active:scale-95 text-muted-foreground hover:text-destructive"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function Sidebar({ isOpen, onClose, location }: { isOpen: boolean, onClose: () => void, location: string }) {
  const navItems = [
    { href: "/", label: "Dashboard Overview", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/activity", label: "Activity Intelligence", icon: <Zap className="w-5 h-5" /> },
    { href: "/chats", label: "Chats", icon: <MessageSquare className="w-5 h-5" /> },
    { href: "/calls", label: "Calls", icon: <Phone className="w-5 h-5" /> },
    { href: "/videos", label: "Videos", icon: <Video className="w-5 h-5" /> },
    { href: "/photos", label: "Photo Library", icon: <ImageIcon className="w-5 h-5" /> },
    { href: "/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 left-0 bottom-0 w-72 bg-card/95 backdrop-blur-xl border-r border-primary/20 z-50 flex flex-col md:translate-x-0 md:relative shadow-[0_0_30px_rgba(204,0,255,0.15)]"
      >
        <div className="p-5 flex items-center gap-3 border-b border-primary/10">
          <div className="w-11 h-11 rounded-xl overflow-hidden shadow-[0_0_14px_rgba(204,0,255,0.6)] border border-primary/40 flex-shrink-0">
            <img src={logoImg} alt="Cipher Tech" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-wider text-foreground leading-tight">CIPHER TECH</h2>
            <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Cyber Intelligence</p>
          </div>
          <button onClick={onClose} className="ml-auto text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={onClose}>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${isActive ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(139,92,246,0.4)]' : 'text-muted-foreground hover:bg-primary/10 hover:text-foreground'}`}>
                  {item.icon}
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-primary/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
            <Avatar className="w-10 h-10 border border-primary/30">
              <AvatarFallback className="bg-primary/20 text-primary">D</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="text-xs font-medium truncate text-foreground">dixieives@gmail.com</p>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)] animate-pulse" />
                <span className="text-[10px] text-green-500 uppercase tracking-wider font-bold">Active Now</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function TopHeader({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="h-16 border-b border-primary/20 bg-card/50 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button onClick={onOpenSidebar} data-testid="button-open-sidebar" className="p-2 -ml-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div className="w-9 h-9 rounded-xl overflow-hidden shadow-[0_0_12px_rgba(204,0,255,0.6)] border border-primary/40 flex-shrink-0">
          <img src={logoImg} alt="Cipher Tech" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors hover:shadow-[0_0_10px_rgba(139,92,246,0.3)] relative"
          >
            <Bell className="w-5 h-5" />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
          </button>
          
          <AnimatePresence>
            {notificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-12 w-80 bg-card border border-primary/30 rounded-xl shadow-2xl overflow-hidden z-50"
              >
                <div className="p-3 border-b border-primary/10 flex items-center justify-between bg-secondary/30">
                  <h3 className="font-bold text-sm">Notifications</h3>
                  <span className="text-[10px] bg-destructive/20 text-destructive px-2 py-0.5 rounded uppercase font-bold">2 New</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="p-3 border-b border-primary/5 hover:bg-primary/5 cursor-pointer transition-colors relative">
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
                    <p className="text-sm font-medium text-foreground">Welcome back!</p>
                    <p className="text-xs text-muted-foreground mt-1">System initialized and ready.</p>
                    <p className="text-[10px] text-muted-foreground mt-2">Just now</p>
                  </div>
                  <div className="p-3 border-b border-primary/5 hover:bg-primary/5 cursor-pointer transition-colors relative">
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-destructive" />
                    <p className="text-sm font-medium text-destructive">New activity detected</p>
                    <p className="text-xs text-muted-foreground mt-1">3 new calls and 7 messages captured from target device.</p>
                    <p className="text-[10px] text-muted-foreground mt-2">2 mins ago</p>
                  </div>
                  <div className="p-3 hover:bg-primary/5 cursor-pointer transition-colors">
                    <p className="text-sm font-medium text-foreground">Sync complete</p>
                    <p className="text-xs text-muted-foreground mt-1">Background synchronization finished successfully.</p>
                    <p className="text-[10px] text-muted-foreground mt-2">15 mins ago</p>
                  </div>
                </div>
                <div className="p-2 text-center border-t border-primary/10 bg-secondary/30">
                  <button className="text-xs text-primary font-bold uppercase tracking-wider hover:text-primary/80 transition-colors">Mark all read</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="block"
          >
            <Avatar className="w-8 h-8 border border-primary/30 cursor-pointer hover:shadow-[0_0_10px_rgba(204,0,255,0.5)] transition-all">
              <AvatarFallback className="bg-primary/20 text-primary text-xs">D</AvatarFallback>
            </Avatar>
          </button>
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-10 w-64 bg-card border border-primary/30 rounded-xl shadow-2xl overflow-hidden z-50"
              >
                <div className="p-4 border-b border-primary/10 bg-secondary/30 flex items-center gap-3">
                  <Avatar className="w-10 h-10 border border-primary/40 bg-primary/10">
                    <AvatarFallback className="text-primary font-bold text-sm">D</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">dixieives@gmail.com</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.8)] animate-pulse" />
                      <span className="text-[10px] text-green-500 uppercase tracking-wider font-bold">Active</span>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-lg transition-colors uppercase tracking-widest font-bold">
                    Profile
                  </button>
                  <button className="w-full text-left px-3 py-2 text-xs text-destructive hover:bg-destructive/10 rounded-lg transition-colors uppercase tracking-widest font-bold">
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="fixed inset-0 bg-background text-foreground font-sans selection:bg-primary/30 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(204, 0, 255, 0.18) 0%, rgba(0, 204, 255, 0.06) 50%, transparent 70%)' }} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} location={location} />

      {/* Main content — always sits behind/beside the fixed sidebar */}
      <div className="flex flex-col" style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}>
        <TopHeader onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <AnimatePresence mode="wait">
            <Switch location={location} key={location}>
              <Route path="/" component={Dashboard} />
              <Route path="/activity" component={ActivityIntelligence} />
              <Route path="/chats" component={Chats} />
              <Route path="/calls" component={Calls} />
              <Route path="/videos" component={Videos} />
              <Route path="/photos" component={Photos} />
              <Route path="/instagram" component={InstagramSpy} />
              <Route path="/tinder" component={TinderPage} />
              <Route path="/settings" component={SettingsPage} />
              <Route component={NotFound} />
            </Switch>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [showCoinAlert, setShowCoinAlert] = useState(false);
  const [coinShopOpen, setCoinShopOpen] = useState(false);

  function handleUnlock() {
    setUnlocked(true);
    setShowCoinAlert(true);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AnimatePresence mode="wait">
            {!unlocked ? (
              <motion.div key="pin" exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.5 }}>
                <PinScreen onUnlock={handleUnlock} />
              </motion.div>
            ) : (
              <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <MainLayout />
              </motion.div>
            )}
          </AnimatePresence>
        </WouterRouter>
        <Toaster />

        {/* Post-PIN credit coin alert */}
        <Dialog open={showCoinAlert} onOpenChange={setShowCoinAlert}>
          <DialogContent className="bg-card border-yellow-500/30 sm:max-w-sm text-center">
            <DialogHeader>
              <DialogTitle className="text-yellow-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" /> Dashboard Alert
              </DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <div className="py-4 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                <Coins className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="space-y-2 text-center">
                <p className="text-base font-bold text-yellow-400">Dashboard Due for Credit Coins</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your <span className="text-yellow-400 font-bold uppercase tracking-wide">Premium</span> surveillance dashboard requires Credit Coins to access locked features. Top up now to unlock full monitoring capabilities.
                </p>
              </div>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => { setShowCoinAlert(false); setCoinShopOpen(true); }}
                  className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest shadow-[0_0_12px_rgba(204,0,255,0.3)] hover:opacity-90 transition-opacity"
                >
                  Top Up Now
                </button>
                <button
                  onClick={() => setShowCoinAlert(false)}
                  className="flex-1 py-2 rounded-lg bg-secondary text-muted-foreground text-xs font-bold uppercase tracking-widest hover:text-foreground transition-colors"
                >
                  Later
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <CreditCoinShop open={coinShopOpen} onClose={() => setCoinShopOpen(false)} />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
