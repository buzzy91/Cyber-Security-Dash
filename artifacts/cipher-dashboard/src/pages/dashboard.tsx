import React, { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Database, TrendingUp, TrendingDown, BarChart2, Activity, Camera, Loader2, MapPin, Keyboard, Mail, Shield, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  AreaChart, Area, BarChart, Bar,
  ResponsiveContainer, XAxis, YAxis, Tooltip,
  CartesianGrid, ReferenceLine
} from "recharts";

// Circular Progress component
export const CircularProgress = ({ value, colorClass, size = 64, strokeWidth = 6 }: { value: number, colorClass: string, size?: number, strokeWidth?: number }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="text-muted/30"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <motion.circle
          className={colorClass}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
        {value}%
      </div>
    </div>
  );
};

const VISIBILITY_DATASETS: Record<string, { date: string; value: number; events: number }[]> = {
  "7D": [
    { date: "Mon", value: 8, events: 42 },
    { date: "Tue", value: 14, events: 78 },
    { date: "Wed", value: 11, events: 61 },
    { date: "Thu", value: 19, events: 104 },
    { date: "Fri", value: 15, events: 83 },
    { date: "Sat", value: 7, events: 38 },
    { date: "Sun", value: 10, events: 55 },
  ],
  "1M": [
    { date: "Nov 9", value: 20, events: 110 },
    { date: "Nov 14", value: 45, events: 248 },
    { date: "Nov 19", value: 30, events: 165 },
    { date: "Nov 24", value: 65, events: 357 },
    { date: "Nov 29", value: 50, events: 275 },
    { date: "Dec 4", value: 85, events: 467 },
  ],
  "3M": [
    { date: "Sep", value: 12, events: 66 },
    { date: "Oct 1", value: 28, events: 154 },
    { date: "Oct 15", value: 41, events: 225 },
    { date: "Nov 1", value: 35, events: 192 },
    { date: "Nov 15", value: 60, events: 330 },
    { date: "Dec 1", value: 78, events: 429 },
    { date: "Dec 4", value: 85, events: 467 },
  ],
  "6M": [
    { date: "Jul", value: 5, events: 27 },
    { date: "Aug", value: 18, events: 99 },
    { date: "Sep", value: 12, events: 66 },
    { date: "Oct", value: 38, events: 209 },
    { date: "Nov", value: 55, events: 302 },
    { date: "Dec", value: 85, events: 467 },
  ],
};

const RANGES = ["7D", "1M", "3M", "6M"] as const;
type Range = typeof RANGES[number];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card/95 backdrop-blur-xl border border-primary/40 rounded-xl px-4 py-3 shadow-xl shadow-primary/20 text-xs">
      <p className="text-muted-foreground uppercase tracking-widest mb-2 font-bold">{label}</p>
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
        <span className="text-foreground font-mono font-bold">{payload[0]?.value}%</span>
        <span className="text-muted-foreground">visibility</span>
      </div>
      {payload[0]?.payload?.events !== undefined && (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white inline-block" />
          <span className="text-foreground font-mono font-bold">{payload[0].payload.events}</span>
          <span className="text-muted-foreground">events</span>
        </div>
      )}
    </div>
  );
}

function AccessReady({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.2)]">
        <CheckCircle2 className="w-8 h-8 text-green-400" />
      </div>
      <div className="space-y-2 text-center">
        <p className="text-base font-bold text-green-400">Access Ready</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest shadow-[0_0_12px_rgba(255,0,0,0.3)] hover:opacity-90 transition-opacity"
      >
        Continue
      </button>
    </motion.div>
  );
}

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [socialDialog, setSocialDialog] = useState<{ label: string; bg: string; icon: React.ReactNode } | null>(null);
  const [spycamOpen, setSpycamOpen] = useState(false);
  const [spycamLoading, setSpycamLoading] = useState(false);
  const [spycamReady, setSpycamReady] = useState(false);

  function openSpycam() {
    setSpycamOpen(true);
    setSpycamLoading(true);
    setSpycamReady(false);
    setTimeout(() => {
      setSpycamLoading(false);
      setSpycamReady(true);
    }, 3000);
  }

  function closeSpycam() {
    setSpycamOpen(false);
    setSpycamLoading(false);
    setSpycamReady(false);
  }

  const [locationOpen, setLocationOpen] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationReady, setLocationReady] = useState(false);

  function openLocation() {
    setLocationOpen(true);
    setLocationLoading(true);
    setLocationReady(false);
    setTimeout(() => {
      setLocationLoading(false);
      setLocationReady(true);
    }, 3000);
  }

  function closeLocation() {
    setLocationOpen(false);
    setLocationLoading(false);
    setLocationReady(false);
  }

  const [keylogsOpen, setKeylogsOpen] = useState(false);
  const [keylogsLoading, setKeylogsLoading] = useState(false);
  const [keylogsReady, setKeylogsReady] = useState(false);

  function openKeylogs() {
    setKeylogsOpen(true);
    setKeylogsLoading(true);
    setKeylogsReady(false);
    setTimeout(() => { setKeylogsLoading(false); setKeylogsReady(true); }, 3000);
  }
  function closeKeylogs() { setKeylogsOpen(false); setKeylogsLoading(false); setKeylogsReady(false); }

  const [emailsOpen, setEmailsOpen] = useState(false);
  const [emailsLoading, setEmailsLoading] = useState(false);
  const [emailsReady, setEmailsReady] = useState(false);

  function openEmails() {
    setEmailsOpen(true);
    setEmailsLoading(true);
    setEmailsReady(false);
    setTimeout(() => { setEmailsLoading(false); setEmailsReady(true); }, 3000);
  }
  function closeEmails() { setEmailsOpen(false); setEmailsLoading(false); setEmailsReady(false); }

  const [firewallOpen, setFirewallOpen] = useState(false);
  const [firewallLoading, setFirewallLoading] = useState(false);
  const [firewallReady, setFirewallReady] = useState(false);

  function openFirewall() {
    setFirewallOpen(true);
    setFirewallLoading(true);
    setFirewallReady(false);
    setTimeout(() => { setFirewallLoading(false); setFirewallReady(true); }, 3000);
  }
  function closeFirewall() { setFirewallOpen(false); setFirewallLoading(false); setFirewallReady(false); }

  const [visRange, setVisRange] = useState<Range>("1M");
  const [chartType, setChartType] = useState<"area" | "bar">("area");

  const visData = VISIBILITY_DATASETS[visRange];
  const peak = useMemo(() => Math.max(...visData.map(d => d.value)), [visData]);
  const avg = useMemo(() => Math.round(visData.reduce((s, d) => s + d.value, 0) / visData.length), [visData]);
  const totalEvents = useMemo(() => visData.reduce((s, d) => s + d.events, 0), [visData]);
  const latest = visData[visData.length - 1].value;
  const prev = visData[visData.length - 2].value;
  const trend = latest - prev;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 md:p-6 pb-24 space-y-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-wide">Dashboard Overview</h1>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-green-500 uppercase tracking-widest font-bold">Live</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground font-mono">Last Updated: Just Now</p>
        </div>

      </div>

      {/* QUICK MENU — first section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: 79, color: "text-red-500", count: "948",  label: "Calls",    route: "/calls"  },
          { value: 82, color: "text-white",   count: "12.3k",label: "Messages", route: "/chats"  },
          { value: 38, color: "text-green-500",  count: "188",  label: "Location", route: null, onClick: openLocation },
          { value: 60, color: "text-red-500",   count: "1.2k", label: "Firewall", route: null, onClick: undefined   },
        ].map((item) => (
          item.route ? (
            <button
              key={item.label}
              onClick={() => navigate(item.route!)}
              className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-all hover:-translate-y-1 duration-300 cursor-pointer active:scale-95 group"
            >
              <CircularProgress value={item.value} colorClass={item.color} size={56} strokeWidth={4} />
              <div className="text-center">
                <p className="text-lg font-bold">{item.count}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors">{item.label}</p>
              </div>
            </button>
          ) : item.onClick ? (
            <button
              key={item.label}
              onClick={item.onClick}
              className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-all hover:-translate-y-1 duration-300 cursor-pointer active:scale-95 group"
            >
              <CircularProgress value={item.value} colorClass={item.color} size={56} strokeWidth={4} />
              <div className="text-center">
                <p className="text-lg font-bold">{item.count}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors">{item.label}</p>
              </div>
            </button>
          ) : (
            <div
              key={item.label}
              className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 flex flex-col items-center justify-center gap-3"
            >
              <CircularProgress value={item.value} colorClass={item.color} size={56} strokeWidth={4} />
              <div className="text-center">
                <p className="text-lg font-bold">{item.count}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.label}</p>
              </div>
            </div>
          )
        ))}
      </div>

      {/* SPYCAM card */}
      <motion.div
        whileTap={{ scale: 0.97 }}
        onClick={openSpycam}
        className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-5 hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Camera className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">SpyCam</h2>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[9px] text-primary font-bold uppercase tracking-widest">Live Feed</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mb-3">Access real-time camera intercept from target device</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full w-3/4 animate-pulse" />
          </div>
          <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Tap to Access</span>
        </div>
      </motion.div>

      {/* SpyCam Dialog */}
      <Dialog open={spycamOpen} onOpenChange={closeSpycam}>
        <DialogContent className="bg-card border-primary/30 sm:max-w-sm text-center">
          <DialogHeader>
            <DialogTitle className="text-primary font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <Camera className="w-5 h-5" /> SpyCam Access
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="py-6 flex flex-col items-center gap-5">
            <AnimatePresence mode="wait">
              {spycamLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(255,0,0,0.2)]">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-sm font-bold text-primary">Establishing Connection...</p>
                    <p className="text-[11px] text-muted-foreground">Locating device camera feed</p>
                  </div>
                  <div className="w-48 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "linear" }}
                    />
                  </div>
                </motion.div>
              ) : spycamReady ? (
                <AccessReady
                  key="ready"
                  message="The live SpyCam connection is established and ready."
                  onClose={closeSpycam}
                />
              ) : null}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>

      {/* Location Dialog */}
      <Dialog open={locationOpen} onOpenChange={closeLocation}>
        <DialogContent className="bg-card border-primary/30 sm:max-w-sm text-center">
          <DialogHeader>
            <DialogTitle className="text-primary font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" /> Location Access
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="py-6 flex flex-col items-center gap-5">
            <AnimatePresence mode="wait">
              {locationLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(255,0,0,0.2)]">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-sm font-bold text-primary">Establishing Connection...</p>
                    <p className="text-[11px] text-muted-foreground">Locating device GPS feed</p>
                  </div>
                  <div className="w-48 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "linear" }}
                    />
                  </div>
                </motion.div>
              ) : locationReady ? (
                <AccessReady
                  key="ready"
                  message="The real-time location connection is established and ready."
                  onClose={closeLocation}
                />
              ) : null}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>

      {/* Keylogs Dialog */}
      <Dialog open={keylogsOpen} onOpenChange={closeKeylogs}>
        <DialogContent className="bg-card border-primary/30 sm:max-w-sm text-center">
          <DialogHeader>
            <DialogTitle className="text-primary font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <Keyboard className="w-5 h-5" /> Keylogger Access
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="py-6 flex flex-col items-center gap-5">
            <AnimatePresence mode="wait">
              {keylogsLoading ? (
                <motion.div key="loading" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(255,0,0,0.2)]">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-sm font-bold text-primary">Establishing Connection...</p>
                    <p className="text-[11px] text-muted-foreground">Intercepting keystrokes feed</p>
                  </div>
                  <div className="w-48 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <motion.div className="h-full bg-primary rounded-full" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 3, ease: "linear" }} />
                  </div>
                </motion.div>
              ) : keylogsReady ? (
                <AccessReady
                  key="ready"
                  message="The live keylogger connection is established and ready."
                  onClose={closeKeylogs}
                />
              ) : null}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>

      {/* Emails Dialog */}
      <Dialog open={emailsOpen} onOpenChange={closeEmails}>
        <DialogContent className="bg-card border-primary/30 sm:max-w-sm text-center">
          <DialogHeader>
            <DialogTitle className="text-primary font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" /> Email Intercept
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="py-6 flex flex-col items-center gap-5">
            <AnimatePresence mode="wait">
              {emailsLoading ? (
                <motion.div key="loading" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(255,0,0,0.2)]">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-sm font-bold text-primary">Establishing Connection...</p>
                    <p className="text-[11px] text-muted-foreground">Tapping into email stream</p>
                  </div>
                  <div className="w-48 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <motion.div className="h-full bg-primary rounded-full" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 3, ease: "linear" }} />
                  </div>
                </motion.div>
              ) : emailsReady ? (
                <AccessReady
                  key="ready"
                  message="The email intercept connection is established and ready."
                  onClose={closeEmails}
                />
              ) : null}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>

      {/* Firewall Dialog */}
      <Dialog open={firewallOpen} onOpenChange={closeFirewall}>
        <DialogContent className="bg-card border-primary/30 sm:max-w-sm text-center">
          <DialogHeader>
            <DialogTitle className="text-primary font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <Shield className="w-5 h-5" /> Firewall Monitor
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="py-6 flex flex-col items-center gap-5">
            <AnimatePresence mode="wait">
              {firewallLoading ? (
                <motion.div key="loading" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(255,0,0,0.2)]">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-sm font-bold text-primary">Establishing Connection...</p>
                    <p className="text-[11px] text-muted-foreground">Probing network firewall</p>
                  </div>
                  <div className="w-48 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <motion.div className="h-full bg-primary rounded-full" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 3, ease: "linear" }} />
                  </div>
                </motion.div>
              ) : firewallReady ? (
                <AccessReady
                  key="ready"
                  message="The firewall monitoring connection is established and ready."
                  onClose={closeFirewall}
                />
              ) : null}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>

      {/* TARGET DEVICE */}
      <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <span className="bg-green-500/10 text-green-500 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-widest border border-green-500/20">Active</span>
        </div>
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Target Device</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-secondary/40 rounded-xl p-3 border border-border/50">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Target ID</p>
            <p className="font-mono text-sm">#99457</p>
          </div>
          <div className="bg-secondary/40 rounded-xl p-3 border border-border/50">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Model</p>
            <p className="font-sans text-sm">......</p>
          </div>
          <div className="bg-secondary/40 rounded-xl p-3 border border-border/50 col-span-2">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Target Mobile</p>
            <p className="font-mono text-sm">+1 (323) 740-6754</p>
          </div>
          <div className="bg-secondary/40 rounded-xl p-3 border border-border/50">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Location</p>
            <p className="font-sans text-sm">USA</p>
          </div>
          <div className="bg-secondary/40 rounded-xl p-3 border border-border/50">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">ICCID</p>
            <p className="font-mono text-sm">890114...481</p>
          </div>
          <div className="bg-secondary/40 rounded-xl p-3 border border-border/50">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Network</p>
            <p className="font-sans text-sm text-green-400">Connected</p>
          </div>
          <div className="bg-secondary/40 rounded-xl p-3 border border-border/50">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Last Synced</p>
            <p className="font-sans text-sm">Just now</p>
          </div>
        </div>
      </div>

      {/* SOCIAL MEDIA */}
      {socialDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={() => setSocialDialog(null)}>
          <div className="bg-card border border-primary/30 rounded-2xl p-6 w-80 shadow-2xl shadow-primary/20" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: socialDialog.bg }}>
                <span className="text-white">{socialDialog.icon}</span>
              </div>
              <div>
                <p className="font-bold text-sm">{socialDialog.label}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">2FA Required</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">This account has two-factor authentication enabled. Enter the 6-digit code sent to the registered device to proceed.</p>
            <div className="flex gap-2 mb-4">
              {[0,1,2,3,4,5].map(i => (
                <div key={i} className="flex-1 h-10 rounded-lg border border-primary/30 bg-secondary/40 flex items-center justify-center text-muted-foreground text-xs font-mono">—</div>
              ))}
            </div>
            <button className="w-full py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">Verify Access</button>
            <button className="w-full mt-2 py-2 rounded-xl text-muted-foreground text-sm hover:text-foreground transition-colors" onClick={() => setSocialDialog(null)}>Cancel</button>
          </div>
        </div>
      )}
      <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-5 relative overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Social Media</h2>
          <span className="bg-primary/20 text-primary text-[10px] px-2 py-1 rounded font-bold uppercase tracking-widest border border-primary/30">4 Linked</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            {
              label: "Tinder", count: "47", color: "#fd297b", bg: "linear-gradient(135deg,#fd297b,#ff5864)",
              navigate: "/tinder",
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path d="M8.5 2.5C8.5 2.5 9 6 7 9c-2 3-4 3.5-4 6.5C3 19.09 7.58 22 12 22s9-2.91 9-6.5c0-3-2-3.5-4-6.5-2-3-1.5-6.5-1.5-6.5S14 5 13 7.5C11.83 5.64 11.5 3 8.5 2.5z"/>
                </svg>
              ),
            },
            {
              label: "WhatsApp", count: "847", color: "#25d366", bg: "#25d366",
              dialog: true,
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              ),
            },
            {
              label: "Facebook", count: "482", color: "#1877f2", bg: "#1877f2",
              dialog: true,
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              ),
            },
            {
              label: "Snapchat", count: "214", color: "#fffc00", bg: "#f7b731",
              dialog: true,
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path d="M12.166.006c.088 0 .176 0 .263.003 1.386.028 5.157.396 6.868 4.274.58 1.305.44 3.063.33 4.42l-.014.178c-.005.054-.006.107-.006.156.13-.027.286-.073.49-.147.222-.08.455-.12.692-.12.43 0 .855.117 1.11.299.418.294.626.676.573 1.073-.08.605-.733.99-1.252 1.133-.086.023-.175.046-.264.068-.384.099-.78.2-1.076.47-.165.151-.241.311-.23.475.012.165.107.257.135.282 1.32 1.184 1.94 2.596 1.94 4.315 0 1.005-.19 1.973-.565 2.876-.358.87-.873 1.66-1.53 2.344-.88.912-1.967 1.63-3.232 2.13-1.324.521-2.845.784-4.52.784h-.12c-1.671 0-3.19-.263-4.514-.784-1.265-.5-2.352-1.218-3.232-2.13-.657-.684-1.172-1.474-1.53-2.344-.375-.903-.565-1.871-.565-2.876 0-1.719.62-3.131 1.94-4.315.028-.025.123-.117.135-.282.011-.164-.065-.324-.23-.475-.296-.27-.692-.371-1.076-.47-.09-.022-.178-.045-.264-.068-.519-.143-1.172-.528-1.252-1.133-.053-.397.155-.779.573-1.073.255-.182.68-.299 1.11-.299.237 0 .47.04.692.12.204.074.36.12.49.147 0-.049-.001-.102-.006-.156l-.014-.178c-.11-1.357-.25-3.115.33-4.42C6.68.398 10.452.034 11.836.006c.11-.003.22-.004.33-.004z"/>
                </svg>
              ),
            },
          ].map((item) => {
            const size = 56;
            const strokeWidth = 3;
            const radius = (size - strokeWidth) / 2;
            const circumference = radius * 2 * Math.PI;
            const offset = circumference - 0.78 * circumference;
            return (
              <button
                key={item.label}
                onClick={() => {
                  if (item.navigate) { navigate(item.navigate); }
                  else if (item.dialog) { setSocialDialog({ label: item.label, bg: item.bg, icon: item.icon }); }
                }}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-primary/5 transition-colors cursor-pointer w-full"
              >
                <div className="relative" style={{ width: size, height: size }}>
                  <svg className="transform -rotate-90 w-full h-full" viewBox={`0 0 ${size} ${size}`}>
                    <circle className="text-muted/30" strokeWidth={strokeWidth} stroke="currentColor" fill="transparent" r={radius} cx={size / 2} cy={size / 2} />
                    <circle strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke={item.color} fill="transparent" r={radius} cx={size / 2} cy={size / 2} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: item.bg }}>
                      {item.icon}
                    </div>
                  </div>
                </div>
                <p className="text-sm font-bold">{item.count}</p>
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest text-center">{item.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* PHONE ACTIVITIES */}
      <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-5 relative overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Phone Activities</h2>
          <span className="bg-primary/20 text-primary text-[10px] px-2 py-1 rounded font-bold uppercase tracking-widest border border-primary/30">6 Tracked</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: 79, color: "text-red-500", count: "948",  label: "Calls",    onClick: () => navigate("/calls") },
            { value: 82, color: "text-white",   count: "12.3k",label: "Messages", onClick: () => navigate("/chats") },
            { value: 38, color: "text-green-500",  count: "188",  label: "Location", onClick: openLocation  },
            { value: 45, color: "text-yellow-500", count: "2.2k", label: "Keylogs",  onClick: openKeylogs  },
            { value: 70, color: "text-red-400",    count: "348",  label: "Emails",   onClick: openEmails   },
            { value: 60, color: "text-red-500",   count: "1.2k", label: "Firewall", onClick: openFirewall },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-primary/5 active:scale-95 transition-all cursor-pointer group"
            >
              <CircularProgress value={item.value} colorClass={item.color} size={48} strokeWidth={3} />
              <p className="text-sm font-bold">{item.count}</p>
              <p className="text-[9px] text-muted-foreground uppercase tracking-widest text-center group-hover:text-primary transition-colors">{item.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* VISIBILITY — interactive */}
      <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-5 relative overflow-hidden">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4 gap-2 flex-wrap">
          <div>
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
              <Activity className="w-4 h-4" /> Visibility
            </h2>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-3xl font-bold">{latest}%</span>
              <span className={`text-sm font-medium mb-1 flex items-center gap-0.5 ${trend >= 0 ? "text-green-500" : "text-red-400"}`}>
                {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {trend >= 0 ? "+" : ""}{trend}% vs prev
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-end gap-2">
            {/* Time range tabs */}
            <div className="flex gap-1 bg-secondary/40 rounded-lg p-1">
              {RANGES.map((r) => (
                <button
                  key={r}
                  onClick={() => setVisRange(r)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all ${
                    visRange === r
                      ? "bg-primary text-white shadow-[0_0_8px_rgba(255,0,0,0.6)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            {/* Chart type toggle */}
            <div className="flex gap-1 bg-secondary/40 rounded-lg p-1">
              <button
                onClick={() => setChartType("area")}
                className={`p-1.5 rounded-md transition-all ${chartType === "area" ? "bg-primary/30 text-primary" : "text-muted-foreground hover:text-foreground"}`}
                title="Area chart"
              >
                <Activity className="w-3 h-3" />
              </button>
              <button
                onClick={() => setChartType("bar")}
                className={`p-1.5 rounded-md transition-all ${chartType === "bar" ? "bg-primary/30 text-primary" : "text-muted-foreground hover:text-foreground"}`}
                title="Bar chart"
              >
                <BarChart2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Peak", val: `${peak}%`, color: "text-red-400" },
            { label: "Avg", val: `${avg}%`, color: "text-white/80" },
            { label: "Events", val: totalEvents.toLocaleString(), color: "text-green-400" },
          ].map((s) => (
            <div key={s.label} className="bg-secondary/30 rounded-xl p-2.5 text-center border border-border/30">
              <p className={`text-base font-bold ${s.color}`}>{s.val}</p>
              <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <AnimatePresence mode="wait">
          <motion.div
            key={visRange + chartType}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="h-44 w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "area" ? (
                <AreaChart data={visData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                  <defs>
                    <linearGradient id="visGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff0000" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#ff0000" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,0,0,0.3)", strokeWidth: 1, strokeDasharray: "4 2" }} />
                  <ReferenceLine y={avg} stroke="rgba(255,0,0,0.3)" strokeDasharray="4 2" />
                  <Area type="monotone" dataKey="value" stroke="#ff0000" strokeWidth={2} fill="url(#visGrad)" dot={{ fill: "#ff0000", r: 3, strokeWidth: 0 }} activeDot={{ r: 5, fill: "#ff0000", stroke: "rgba(255,0,0,0.4)", strokeWidth: 3 }} />
                </AreaChart>
              ) : (
                <BarChart data={visData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,0,0,0.08)" }} />
                  <ReferenceLine y={avg} stroke="rgba(255,0,0,0.3)" strokeDasharray="4 2" />
                  <Bar dataKey="value" fill="#ff0000" radius={[4, 4, 0, 0]} barSize={18} opacity={0.85} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>

        <p className="text-[9px] text-muted-foreground text-right mt-2 uppercase tracking-widest">
          Dashed line = {avg}% avg
        </p>
      </div>

      <div 
        className="bg-card/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-5 relative overflow-hidden"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-green-500" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-green-500">File Storage</h2>
          </div>
          <span className="text-lg font-bold text-green-500">10%</span>
        </div>
        
        <p className="text-sm mb-3 font-medium">500 GB used of 5 TB</p>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-green-500 rounded-full w-[10%]" />
        </div>
      </div>

    </motion.div>
  );
}
