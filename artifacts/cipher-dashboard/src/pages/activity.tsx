import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Activity, AlertTriangle, Info, Zap, Smartphone, Globe, Phone, Youtube, AppWindow, Camera, MapPin, MessageSquare, Wifi, Battery, Mic, Lock, Eye, Download, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const activities = [
  { id: 1, priority: "high", time: "2 mins ago", title: "Late night messages sent", desc: "Messenger activity: Multiple outgoing messages sent between 11 PM – 2 AM. 47 messages exchanged with 3 contacts.", icon: <Zap className="w-4 h-4 text-red-400" />, app: "Messenger", interactions: 47, color: "text-destructive", dot: "bg-destructive", details: { duration: "3h 22m", dataSize: "12.4 KB", ipAddress: "192.168.1.104", location: "Sydney, NSW" } },
  { id: 2, priority: "high", time: "9 mins ago", title: "Unknown contact saved", desc: "New contact saved with no name label — only a phone number stored. Flagged as suspicious due to no linked profile.", icon: <Smartphone className="w-4 h-4 text-red-400" />, app: "Contacts", interactions: 3, color: "text-destructive", dot: "bg-destructive", details: { duration: "< 1m", dataSize: "0.2 KB", ipAddress: "—", location: "Sydney, NSW" } },
  { id: 3, priority: "high", time: "22 mins ago", title: "Private browsing session detected", desc: "Incognito session opened on Chrome — browsing history hidden. 15 URL requests captured via network interception.", icon: <Globe className="w-4 h-4 text-red-400" />, app: "Chrome", interactions: 15, color: "text-destructive", dot: "bg-destructive", details: { duration: "44m", dataSize: "8.1 MB", ipAddress: "10.0.0.23", location: "Sydney, NSW" } },
  { id: 4, priority: "high", time: "38 mins ago", title: "Microphone access triggered", desc: "App accessed device microphone outside of call session. Recording lasted 4m 12s — audio captured and encrypted.", icon: <Mic className="w-4 h-4 text-red-400" />, app: "Unknown App", interactions: 1, color: "text-destructive", dot: "bg-destructive", details: { duration: "4m 12s", dataSize: "3.8 MB", ipAddress: "—", location: "Unknown" } },
  { id: 5, priority: "high", time: "1 hr ago", title: "Screenshot captured", desc: "Device screenshot taken during a WhatsApp conversation. Image saved to hidden album not visible in standard gallery.", icon: <Camera className="w-4 h-4 text-red-400" />, app: "WhatsApp", interactions: 2, color: "text-destructive", dot: "bg-destructive", details: { duration: "< 1m", dataSize: "1.2 MB", ipAddress: "—", location: "Melbourne, VIC" } },
  { id: 6, priority: "medium", time: "2 hrs ago", title: "Location accessed in background", desc: "GPS coordinates accessed while app was in background state. Location pinged 8 times over 20 minutes.", icon: <MapPin className="w-4 h-4 text-red-400" />, app: "Maps / System", interactions: 8, color: "text-yellow-500", dot: "bg-yellow-500", details: { duration: "20m", dataSize: "0.4 KB", ipAddress: "—", location: "Melbourne, VIC" } },
  { id: 7, priority: "medium", time: "3 hrs ago", title: "WhatsApp call detected", desc: "Outgoing WhatsApp call lasting 18 minutes to an unknown number. Audio quality metadata logged.", icon: <Phone className="w-4 h-4 text-red-400" />, app: "WhatsApp", interactions: 1, color: "text-yellow-500", dot: "bg-yellow-500", details: { duration: "18m 4s", dataSize: "21.6 MB", ipAddress: "31.13.82.1", location: "Sydney, NSW" } },
  { id: 8, priority: "medium", time: "3 hrs ago", title: "Large file download detected", desc: "File of 248 MB downloaded via WiFi. File type: .zip archive. Source: unverified third-party domain.", icon: <Download className="w-4 h-4 text-red-400" />, app: "Safari", interactions: 1, color: "text-yellow-500", dot: "bg-yellow-500", details: { duration: "2m 11s", dataSize: "248 MB", ipAddress: "185.220.101.8", location: "Unknown" } },
  { id: 9, priority: "medium", time: "4 hrs ago", title: "Contacts exported", desc: "Full device contacts list accessed and exported via third-party app. 312 contacts read in single session.", icon: <Eye className="w-4 h-4 text-red-400" />, app: "Data Broker App", interactions: 312, color: "text-yellow-500", dot: "bg-yellow-500", details: { duration: "8s", dataSize: "74 KB", ipAddress: "104.21.77.4", location: "Sydney, NSW" } },
  { id: 10, priority: "low", time: "4 hrs ago", title: "YouTube activity logged", desc: "Extended YouTube session — 2.5 hours of video playback on a single device. 4 videos watched.", icon: <Youtube className="w-4 h-4 text-red-400" />, app: "YouTube", interactions: 8, color: "text-green-500", dot: "bg-green-500", details: { duration: "2h 31m", dataSize: "1.2 GB", ipAddress: "142.250.185.100", location: "Sydney, NSW" } },
  { id: 11, priority: "low", time: "5 hrs ago", title: "App installation logged", desc: "New application installed — VPN client added to device. App requests: network, location, and contacts.", icon: <AppWindow className="w-4 h-4 text-red-400" />, app: "App Store", interactions: 1, color: "text-green-500", dot: "bg-green-500", details: { duration: "1m 44s", dataSize: "62 MB", ipAddress: "17.253.144.10", location: "Sydney, NSW" } },
  { id: 12, priority: "low", time: "6 hrs ago", title: "WiFi network switched", desc: "Device connected to an unknown public WiFi network. No VPN active during session. 22 minutes exposure.", icon: <Wifi className="w-4 h-4 text-red-400" />, app: "System", interactions: 1, color: "text-green-500", dot: "bg-green-500", details: { duration: "22m", dataSize: "—", ipAddress: "192.168.0.1", location: "Sydney, NSW" } },
  { id: 13, priority: "low", time: "7 hrs ago", title: "Battery optimization disabled", desc: "User manually disabled battery saver for a background app — extends monitoring capability.", icon: <Battery className="w-4 h-4 text-red-400" />, app: "System Settings", interactions: 1, color: "text-green-500", dot: "bg-green-500", details: { duration: "< 1m", dataSize: "—", ipAddress: "—", location: "—" } },
  { id: 14, priority: "low", time: "8 hrs ago", title: "Passcode changed", desc: "Device passcode was updated. New biometric enrollment detected — fingerprint re-registered.", icon: <Lock className="w-4 h-4 text-red-400" />, app: "Settings", interactions: 2, color: "text-green-500", dot: "bg-green-500", details: { duration: "< 1m", dataSize: "—", ipAddress: "—", location: "Sydney, NSW" } },
];

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold animate-pulse">Syncing activity feed...</p>
    </div>
  );
}

export default function ActivityIntelligence() {
  const { toast } = useToast();
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");

  const handleAnalyze = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Analysis Complete",
      description: "No additional anomalies detected in this trace.",
      duration: 3000,
      className: "bg-card border-primary/50 text-foreground",
    });
  };

  const filtered = filter === "all" ? activities : activities.filter(a => a.priority === filter);

  const counts = {
    high: activities.filter(a => a.priority === "high").length,
    medium: activities.filter(a => a.priority === "medium").length,
    low: activities.filter(a => a.priority === "low").length,
  };

  return (
    <div className="p-4 md:p-6 pb-24 space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">Activity Intelligence Feed</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Real-time activity insights</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors border border-transparent hover:border-primary/50">
            <Search className="w-5 h-5" />
          </button>
        </div>

        <div className="flex bg-card/40 backdrop-blur-xl border border-primary/20 rounded-xl p-3 divide-x divide-primary/10">
          <div className="flex-1 px-2 text-center">
            <p className="text-lg font-bold text-primary">124</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Sessions</p>
          </div>
          <div className="flex-1 px-2 text-center">
            <p className="text-lg font-bold text-primary">18</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Apps Monitored</p>
          </div>
          <div className="flex-1 px-2 text-center">
            <p className="text-lg font-bold text-primary">2.1k</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Interactions</p>
          </div>
          <div className="flex-1 px-2 text-center">
            <p className="text-lg font-bold text-destructive">{counts.high}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">High Risk</p>
          </div>
        </div>

        {/* Priority filter tabs */}
        <div className="flex gap-1.5 flex-wrap">
          {(["all", "high", "medium", "low"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all ${
                filter === f
                  ? f === "high" ? "bg-destructive/20 border-destructive/60 text-destructive"
                    : f === "medium" ? "bg-yellow-500/20 border-yellow-500/60 text-yellow-400"
                    : f === "low" ? "bg-green-500/20 border-green-500/60 text-green-400"
                    : "bg-primary/20 border-primary/60 text-primary"
                  : "bg-secondary/40 border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? `All (${activities.length})` : f === "high" ? `High (${counts.high})` : f === "medium" ? `Med (${counts.medium})` : `Low (${counts.low})`}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((item, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={item.id}
            className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 hover:border-primary/50 transition-colors hover:shadow-[0_0_15px_rgba(255,0,0,0.15)] group relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${item.dot} shadow-[0_0_5px_currentColor] animate-pulse`} />
                <span className={`text-[10px] uppercase font-bold tracking-widest ${item.color}`}>{item.priority} PRIORITY</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono">{item.time}</span>
            </div>
            
            <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.desc}</p>

            {/* Detail pills */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-secondary/50 text-[9px] font-mono text-muted-foreground px-2 py-0.5 rounded-md flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" /> {item.details.duration}
              </span>
              {item.details.dataSize !== "—" && (
                <span className="bg-secondary/50 text-[9px] font-mono text-muted-foreground px-2 py-0.5 rounded-md">
                  {item.details.dataSize}
                </span>
              )}
              {item.details.location !== "—" && (
                <span className="bg-secondary/50 text-[9px] font-mono text-muted-foreground px-2 py-0.5 rounded-md flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" /> {item.details.location}
                </span>
              )}
              {item.details.ipAddress !== "—" && (
                <span className="bg-secondary/50 text-[9px] font-mono text-primary/60 px-2 py-0.5 rounded-md">
                  {item.details.ipAddress}
                </span>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium bg-secondary/50 px-2.5 py-1 rounded-md">
                {item.icon}
                <span>{item.app}</span>
                <span className="opacity-50">•</span>
                <span>{item.interactions} interactions</span>
              </div>
            </div>

            {item.priority === "high" && (
              <div className="mt-4 flex gap-3 pt-4 border-t border-primary/10">
                <button 
                  onClick={() => setSelectedActivity(item)}
                  className="flex-1 py-2 rounded-lg border border-primary/30 text-primary text-sm font-bold uppercase tracking-wider hover:bg-primary/10 transition-colors active:scale-95"
                >
                  Inspect
                </button>
                <button 
                  onClick={handleAnalyze}
                  className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-[0_0_10px_rgba(255,0,0,0.3)] active:scale-95"
                >
                  Analyze
                </button>
              </div>
            )}
            {item.priority !== "high" && (
              <div className="mt-4 pt-4 border-t border-primary/10">
                <button 
                  onClick={() => setSelectedActivity(item)}
                  className="w-full py-2 rounded-lg border border-border/50 text-muted-foreground text-sm font-bold uppercase tracking-wider hover:bg-secondary transition-colors active:scale-95"
                >
                  View Details
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <LoadingSpinner />

      <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
        <DialogContent className="bg-card border-primary/30 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${selectedActivity?.dot}`} />
              {selectedActivity?.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Captured at {selectedActivity?.time}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-3 rounded-lg bg-secondary/30 border border-primary/10">
              <p className="text-sm font-medium">{selectedActivity?.desc}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-secondary/20 rounded-lg">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Application</p>
                <p className="font-medium text-sm flex items-center gap-2">{selectedActivity?.icon} {selectedActivity?.app}</p>
              </div>
              <div className="p-3 bg-secondary/20 rounded-lg">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Interactions</p>
                <p className="font-medium text-sm">{selectedActivity?.interactions} total</p>
              </div>
              <div className="p-3 bg-secondary/20 rounded-lg">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Duration</p>
                <p className="font-mono text-sm">{selectedActivity?.details?.duration}</p>
              </div>
              <div className="p-3 bg-secondary/20 rounded-lg">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Data Size</p>
                <p className="font-mono text-sm">{selectedActivity?.details?.dataSize}</p>
              </div>
              <div className="p-3 bg-secondary/20 rounded-lg">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">IP Address</p>
                <p className="font-mono text-xs text-primary/70">{selectedActivity?.details?.ipAddress}</p>
              </div>
              <div className="p-3 bg-secondary/20 rounded-lg">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Location</p>
                <p className="font-mono text-xs">{selectedActivity?.details?.location}</p>
              </div>
              <div className="p-3 bg-secondary/20 rounded-lg col-span-2">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Trace ID</p>
                <p className="font-mono text-xs text-primary/70">TRC-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setSelectedActivity(null)}
              className="flex-1 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors active:scale-95 text-sm font-bold uppercase tracking-wider"
            >
              Close
            </button>
            <button 
              onClick={(e) => { setSelectedActivity(null); handleAnalyze(e); }}
              className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-[0_0_10px_rgba(255,0,0,0.3)] active:scale-95 text-sm font-bold uppercase tracking-wider"
            >
              Run Full Scan
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
