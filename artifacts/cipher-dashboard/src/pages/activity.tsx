import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Activity, AlertTriangle, Info, Zap, Smartphone, Globe, Phone, Youtube, AppWindow } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const activities = [
  { id: 1, priority: "high", time: "2 mins ago", title: "Late night messages sent", desc: "Messenger activity: Multiple outgoing messages sent between 11 PM – 2 AM", icon: <Zap className="w-4 h-4 text-purple-400" />, app: "Messenger", interactions: 47, color: "text-destructive", dot: "bg-destructive" },
  { id: 2, priority: "high", time: "9 mins ago", title: "Unknown contact saved", desc: "New contact saved with no name label — only a phone number stored", icon: <Smartphone className="w-4 h-4 text-purple-400" />, app: "Contacts", interactions: 3, color: "text-destructive", dot: "bg-destructive" },
  { id: 3, priority: "high", time: "22 mins ago", title: "Private browsing session detected", desc: "Incognito session opened on Chrome — browsing history hidden", icon: <Globe className="w-4 h-4 text-purple-400" />, app: "Chrome", interactions: 15, color: "text-destructive", dot: "bg-destructive" },
  { id: 4, priority: "medium", time: "3 hrs ago", title: "WhatsApp call detected", desc: "Outgoing WhatsApp call lasting 18 minutes to an unknown number", icon: <Phone className="w-4 h-4 text-purple-400" />, app: "WhatsApp", interactions: 1, color: "text-yellow-500", dot: "bg-yellow-500" },
  { id: 5, priority: "low", time: "2 hrs ago", title: "YouTube activity logged", desc: "Extended YouTube session — 2.5 hours of video playback", icon: <Youtube className="w-4 h-4 text-purple-400" />, app: "YouTube", interactions: 8, color: "text-green-500", dot: "bg-green-500" },
  { id: 6, priority: "low", time: "4 hrs ago", title: "App installation logged", desc: "New application installed — VPN client added to device", icon: <AppWindow className="w-4 h-4 text-purple-400" />, app: "App Store", interactions: 1, color: "text-green-500", dot: "bg-green-500" },
];

export default function ActivityIntelligence() {
  const { toast } = useToast();
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  const handleAnalyze = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Analysis Complete",
      description: "No additional anomalies detected in this trace.",
      duration: 3000,
      className: "bg-card border-primary/50 text-foreground",
    });
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
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Total Interactions</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((item, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={item.id}
            className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 hover:border-primary/50 transition-colors hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] group relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${item.dot} shadow-[0_0_5px_currentColor] animate-pulse`} />
                <span className={`text-[10px] uppercase font-bold tracking-widest ${item.color}`}>{item.priority} PRIORITY</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono">{item.time}</span>
            </div>
            
            <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.desc}</p>
            
            <div className="flex items-center justify-between mt-4">
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
                  className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-[0_0_10px_rgba(139,92,246,0.3)] active:scale-95"
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
              className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-[0_0_10px_rgba(139,92,246,0.3)] active:scale-95 text-sm font-bold uppercase tracking-wider"
            >
              Run Full Scan
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
