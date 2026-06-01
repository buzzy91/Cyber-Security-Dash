import React, { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Database, TrendingUp, TrendingDown, BarChart2, Activity, Lock, Instagram } from "lucide-react";
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
        <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
        <span className="text-foreground font-mono font-bold">{payload[0]?.value}%</span>
        <span className="text-muted-foreground">visibility</span>
      </div>
      {payload[0]?.payload?.events !== undefined && (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block" />
          <span className="text-foreground font-mono font-bold">{payload[0].payload.events}</span>
          <span className="text-muted-foreground">events</span>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [storageModalOpen, setStorageModalOpen] = useState(false);
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

      {/* QUICK MENU — first section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: 79, color: "text-purple-500", count: "948",  label: "Calls",    route: "/calls"    },
          { value: 82, color: "text-cyan-500",   count: "12.3k",label: "Messages", route: "/chats"    },
          { value: 38, color: "text-green-500",  count: "188",  label: "Location", route: "/activity" },
          { value: 60, color: "text-pink-500",   count: "1.2k", label: "Firewall", route: "/activity" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.route)}
            className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-all hover:-translate-y-1 duration-300 cursor-pointer active:scale-95 group"
          >
            <CircularProgress value={item.value} colorClass={item.color} size={56} strokeWidth={4} />
            <div className="text-center">
              <p className="text-lg font-bold">{item.count}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors">{item.label}</p>
            </div>
          </button>
        ))}
      </div>

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
            <p className="font-sans text-sm">📱 iPhone</p>
          </div>
          <div className="bg-secondary/40 rounded-xl p-3 border border-border/50 col-span-2">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Target Mobile</p>
            <p className="font-mono text-sm">+61 407 493 614</p>
          </div>
          <div className="bg-secondary/40 rounded-xl p-3 border border-border/50">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Location</p>
            <p className="font-sans text-sm">Australia</p>
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

      {/* PHONE ACTIVITIES */}
      <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-5 relative overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Phone Activities</h2>
          <span className="bg-primary/20 text-primary text-[10px] px-2 py-1 rounded font-bold uppercase tracking-widest border border-primary/30">6 Tracked</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: 79, color: "text-purple-500", count: "948",  label: "Calls",    route: "/calls"    },
            { value: 82, color: "text-cyan-500",   count: "12.3k",label: "Messages", route: "/chats"    },
            { value: 38, color: "text-green-500",  count: "188",  label: "Location", route: "/activity" },
            { value: 45, color: "text-yellow-500", count: "2.2k", label: "Keylogs",  route: "/activity" },
            { value: 70, color: "text-red-400",    count: "348",  label: "Emails",   route: "/activity" },
            { value: 60, color: "text-pink-500",   count: "1.2k", label: "Firewall", route: "/activity" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.route)}
              className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-primary/10 transition-all active:scale-95 group cursor-pointer"
            >
              <CircularProgress value={item.value} colorClass={item.color} size={48} strokeWidth={3} />
              <p className="text-sm font-bold">{item.count}</p>
              <p className="text-[9px] text-muted-foreground uppercase tracking-widest text-center group-hover:text-primary transition-colors">{item.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* INSTAGRAM SPY CARD */}
      <motion.div
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate("/instagram")}
        className="rounded-2xl p-5 relative overflow-hidden cursor-pointer border border-transparent"
        style={{ background: "linear-gradient(135deg, rgba(240,148,51,0.12) 0%, rgba(220,39,67,0.12) 50%, rgba(188,24,136,0.12) 100%)", borderColor: "rgba(220,39,67,0.25)" }}
      >
        {/* Animated gradient shimmer */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, rgba(240,148,51,0.08) 0%, rgba(220,39,67,0.08) 50%, rgba(188,24,136,0.08) 100%)" }} />
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, #f09433, #dc2743, #bc1888)" }} />

        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl" style={{ background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" }}>
              <Instagram className="w-7 h-7 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-card flex items-center justify-center border border-border/50">
              <Lock className="w-2.5 h-2.5 text-muted-foreground" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="font-bold text-base tracking-wide">Instagram Spy</h3>
              <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border" style={{ background: "rgba(220,39,67,0.15)", color: "#dc2743", borderColor: "rgba(220,39,67,0.3)" }}>Premium</span>
            </div>
            <p className="text-xs text-muted-foreground leading-snug">Full account access — posts, DMs, stories &amp; live activity</p>
            <div className="flex items-center gap-2 mt-2">
              <Lock className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">One-time verification: $300</span>
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all" style={{ background: "linear-gradient(135deg, #dc2743, #bc1888)" }}>
              Access
            </div>
          </div>
        </div>
      </motion.div>

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
                      ? "bg-primary text-white shadow-[0_0_8px_rgba(139,92,246,0.6)]"
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
            { label: "Peak", val: `${peak}%`, color: "text-purple-400" },
            { label: "Avg", val: `${avg}%`, color: "text-cyan-400" },
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
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(139,92,246,0.3)", strokeWidth: 1, strokeDasharray: "4 2" }} />
                  <ReferenceLine y={avg} stroke="rgba(139,92,246,0.3)" strokeDasharray="4 2" />
                  <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} fill="url(#visGrad)" dot={{ fill: "#8b5cf6", r: 3, strokeWidth: 0 }} activeDot={{ r: 5, fill: "#8b5cf6", stroke: "rgba(139,92,246,0.4)", strokeWidth: 3 }} />
                </AreaChart>
              ) : (
                <BarChart data={visData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(139,92,246,0.08)" }} />
                  <ReferenceLine y={avg} stroke="rgba(139,92,246,0.3)" strokeDasharray="4 2" />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={18} opacity={0.85} />
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
