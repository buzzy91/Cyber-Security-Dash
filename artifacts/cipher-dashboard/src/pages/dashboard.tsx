import React, { useState } from "react";
import { motion } from "framer-motion";
import { Database, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

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

const visibilityData = [
  { date: 'Nov 9', value: 20 },
  { date: 'Nov 14', value: 45 },
  { date: 'Nov 19', value: 30 },
  { date: 'Nov 24', value: 65 },
  { date: 'Nov 29', value: 50 },
  { date: 'Dec 4', value: 85 },
];

export default function Dashboard() {
  const [storageModalOpen, setStorageModalOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 md:p-6 pb-24 space-y-6"
    >
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-colors hover:-translate-y-1 duration-300">
          <CircularProgress value={79} colorClass="text-purple-500" size={56} strokeWidth={4} />
          <div className="text-center">
            <p className="text-lg font-bold">948</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Calls</p>
          </div>
        </div>
        <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-colors hover:-translate-y-1 duration-300">
          <CircularProgress value={82} colorClass="text-cyan-500" size={56} strokeWidth={4} />
          <div className="text-center">
            <p className="text-lg font-bold">12.3k</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Messages</p>
          </div>
        </div>
        <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-colors hover:-translate-y-1 duration-300">
          <CircularProgress value={38} colorClass="text-green-500" size={56} strokeWidth={4} />
          <div className="text-center">
            <p className="text-lg font-bold">188</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Location</p>
          </div>
        </div>
        <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-colors hover:-translate-y-1 duration-300">
          <CircularProgress value={60} colorClass="text-pink-500" size={56} strokeWidth={4} />
          <div className="text-center">
            <p className="text-lg font-bold">1.2k</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Firewall</p>
          </div>
        </div>
      </div>
      
      {/* PHONE ACTIVITIES extra rows for 6 metrics? 
          Actually, the task says:
          QUICK MENU grid (2x2 cards) -> wait, there are two sections? 
          "QUICK MENU grid (2x2 cards)" and "PHONE ACTIVITIES section (3x2 grid, all 6 metrics)" 
          Let's just show 6 metrics in a 3x2 grid as PHONE ACTIVITIES.
      */}
      <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-5 relative overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Phone Activities</h2>
          <span className="bg-primary/20 text-primary text-[10px] px-2 py-1 rounded font-bold uppercase tracking-widest border border-primary/30">6 Tracked</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-2">
            <CircularProgress value={79} colorClass="text-purple-500" size={48} strokeWidth={3} />
            <p className="text-sm font-bold">948</p>
            <p className="text-[9px] text-muted-foreground uppercase tracking-widest text-center">Calls</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CircularProgress value={82} colorClass="text-cyan-500" size={48} strokeWidth={3} />
            <p className="text-sm font-bold">12.3k</p>
            <p className="text-[9px] text-muted-foreground uppercase tracking-widest text-center">Messages</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CircularProgress value={38} colorClass="text-green-500" size={48} strokeWidth={3} />
            <p className="text-sm font-bold">188</p>
            <p className="text-[9px] text-muted-foreground uppercase tracking-widest text-center">Location</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CircularProgress value={45} colorClass="text-yellow-500" size={48} strokeWidth={3} />
            <p className="text-sm font-bold">2.2k</p>
            <p className="text-[9px] text-muted-foreground uppercase tracking-widest text-center">Keylogs</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CircularProgress value={70} colorClass="text-red-400" size={48} strokeWidth={3} />
            <p className="text-sm font-bold">348</p>
            <p className="text-[9px] text-muted-foreground uppercase tracking-widest text-center">Emails</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CircularProgress value={60} colorClass="text-pink-500" size={48} strokeWidth={3} />
            <p className="text-sm font-bold">1.2k</p>
            <p className="text-[9px] text-muted-foreground uppercase tracking-widest text-center">Firewall</p>
          </div>
        </div>
      </div>

      <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <span className="bg-green-500/10 text-green-500 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-widest border border-green-500/20">Active</span>
        </div>
        
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Target Device</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-secondary/40 rounded-xl p-3 border border-border/50">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Target ID</p>
            <p className="font-mono text-sm">#99457</p>
          </div>
          <div className="bg-secondary/40 rounded-xl p-3 border border-border/50">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Model</p>
            <p className="font-sans text-sm">📱 iPhone 14 Pro</p>
          </div>
          <div className="bg-secondary/40 rounded-xl p-3 border border-border/50">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Target Mobile</p>
            <p className="font-mono text-sm">+61 407 493 614</p>
          </div>
          <div className="bg-secondary/40 rounded-xl p-3 border border-border/50">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Location</p>
            <p className="font-sans text-sm">Australia</p>
          </div>
          <div className="bg-secondary/40 rounded-xl p-3 border border-border/50 md:col-span-2">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">ICCID</p>
            <p className="font-mono text-sm">890114103279...481</p>
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
      
      <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-5 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> Visibility
            </h2>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-3xl font-bold">10.15%</span>
              <span className="text-sm font-medium text-green-500 mb-1">+2% Since Last Week</span>
            </div>
          </div>
        </div>
        
        <div className="h-40 w-full mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={visibilityData}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} dy={10} />
              <Tooltip 
                cursor={{ fill: "rgba(139,92,246,0.1)" }}
                contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "rgba(139,92,246,0.3)", borderRadius: "8px", color: "hsl(var(--foreground))" }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Bar dataKey="value" fill="#7f1d1d" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div 
        className="bg-card/40 backdrop-blur-xl border border-destructive/30 rounded-2xl p-5 hover:border-destructive/60 transition-colors cursor-pointer relative overflow-hidden group"
        onClick={() => setStorageModalOpen(true)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-destructive/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-destructive" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-destructive">File Storage</h2>
          </div>
          <span className="text-lg font-bold text-destructive">98%</span>
        </div>
        
        <p className="text-sm mb-3 font-medium">49 GB used of 50 GB</p>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mb-2">
          <div className="h-full bg-destructive rounded-full w-[98%]" />
        </div>
        <p className="text-[10px] text-destructive uppercase tracking-widest font-bold animate-pulse">Storage almost full - Action Required</p>
      </div>

      <Dialog open={storageModalOpen} onOpenChange={setStorageModalOpen}>
        <DialogContent className="bg-card border-destructive/30 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-destructive font-bold uppercase tracking-widest flex items-center gap-2">
              <Database className="w-5 h-5" /> Storage Limit Reached
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-6">
              Your current storage plan limits full synchronization. Upgrade to access enhanced storage features and continue capturing media files without interruption.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors relative overflow-hidden cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-primary">Plan A (Standard)</h3>
                  <span className="font-mono font-bold">$450/mo</span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 100 GB Encrypted Storage</li>
                  <li>• Standard sync priority</li>
                  <li>• 30-day retention</li>
                </ul>
                <button className="mt-4 w-full py-2 bg-primary/20 text-primary border border-primary/30 rounded-lg text-xs font-bold uppercase tracking-wider group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  Upgrade
                </button>
              </div>
              
              <div className="p-4 rounded-xl border-2 border-primary bg-primary/10 relative overflow-hidden cursor-pointer group">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-bl-lg">Recommended</div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-primary">Plan B (Premium)</h3>
                  <span className="font-mono font-bold">$650/mo</span>
                </div>
                <ul className="text-xs text-foreground/80 space-y-1">
                  <li>• 500 GB Encrypted Storage</li>
                  <li>• Real-time high-priority sync</li>
                  <li>• 90-day retention</li>
                  <li>• Direct media decryption</li>
                </ul>
                <button className="mt-4 w-full py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(139,92,246,0.3)] active:scale-95 transition-all">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
