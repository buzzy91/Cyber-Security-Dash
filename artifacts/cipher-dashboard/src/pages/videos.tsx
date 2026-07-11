import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Play, AlertTriangle, Loader2 } from "lucide-react";

const videos = [
  { id: 1,  date: "Dec 4",  title: "Captured Video — Dec 4",  desc: "WhatsApp video captured from device",           time: "Dec 4, 11:42 PM",  ref: "#1847", flagged: true,  size: "48.2 MB",  duration: "01:24" },
  { id: 2,  date: "Dec 4",  title: "Captured Video — Dec 4",  desc: "System camera recording intercepted",           time: "Dec 4, 9:18 PM",   ref: "#1848", flagged: true,  size: "112.6 MB", duration: "03:51" },
  { id: 3,  date: "Dec 3",  title: "Captured Video — Dec 3",  desc: "Messenger video clip detected",                 time: "Dec 3, 11:05 PM",  ref: "#1849", flagged: true,  size: "22.4 MB",  duration: "00:44" },
  { id: 4,  date: "Dec 3",  title: "Captured Video — Dec 3",  desc: "Snapchat video captured via screen intercept",  time: "Dec 3, 8:14 PM",   ref: "#1850", flagged: true,  size: "8.8 MB",   duration: "00:18" },
  { id: 5,  date: "Dec 2",  title: "Captured Video — Dec 2",  desc: "Instagram DM video received and logged",        time: "Dec 2, 7:30 PM",   ref: "#1851", flagged: true,  size: "31.0 MB",  duration: "01:02" },
  { id: 6,  date: "Dec 2",  title: "Captured Video — Dec 2",  desc: "TikTok video saved to device gallery",          time: "Dec 2, 5:55 PM",   ref: "#1852", flagged: false, size: "19.3 MB",  duration: "00:31" },
  { id: 7,  date: "Dec 1",  title: "Captured Video — Dec 1",  desc: "Gallery sync video file intercepted",           time: "Dec 1, 2:30 PM",   ref: "#1853", flagged: false, size: "74.1 MB",  duration: "02:28" },
  { id: 8,  date: "Dec 1",  title: "Captured Video — Dec 1",  desc: "YouTube download captured in background",       time: "Dec 1, 1:10 PM",   ref: "#1854", flagged: false, size: "245.0 MB", duration: "08:15" },
  { id: 9,  date: "Nov 30", title: "Captured Video — Nov 30", desc: "WhatsApp status video extracted",               time: "Nov 30, 10:00 PM", ref: "#1855", flagged: true,  size: "5.6 MB",   duration: "00:14" },
  { id: 10, date: "Nov 30", title: "Captured Video — Nov 30", desc: "Screen recording session intercepted",          time: "Nov 30, 8:45 PM",  ref: "#1856", flagged: true,  size: "88.3 MB",  duration: "02:57" },
  { id: 11, date: "Nov 29", title: "Captured Video — Nov 29", desc: "Camera roll video synced during backup",        time: "Nov 29, 6:20 PM",  ref: "#1857", flagged: false, size: "55.7 MB",  duration: "01:52" },
  { id: 12, date: "Nov 29", title: "Captured Video — Nov 29", desc: "Telegram video message intercepted",            time: "Nov 29, 4:00 PM",  ref: "#1858", flagged: true,  size: "14.9 MB",  duration: "00:29" },
  { id: 13, date: "Nov 28", title: "Captured Video — Nov 28", desc: "FaceTime session recording captured",           time: "Nov 28, 3:15 PM",  ref: "#1859", flagged: true,  size: "130.2 MB", duration: "04:21" },
  { id: 14, date: "Nov 28", title: "Captured Video — Nov 28", desc: "Safari browser video autoplayed and logged",    time: "Nov 28, 1:00 PM",  ref: "#1860", flagged: false, size: "9.1 MB",   duration: "00:19" },
  { id: 15, date: "Nov 27", title: "Captured Video — Nov 27", desc: "App-recorded clip saved to hidden directory",   time: "Nov 27, 11:50 AM", ref: "#1861", flagged: true,  size: "40.4 MB",  duration: "01:21" },
];

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold animate-pulse">Decrypting video files...</p>
    </div>
  );
}

export default function Videos() {
  const [filter, setFilter] = useState("all");

  const filteredVideos = filter === "flagged" ? videos.filter(v => v.flagged) : videos;

  return (
    <div className="p-4 md:p-6 pb-24 space-y-6">
      {/* Sync banner */}
      <div className="flex items-center gap-3 px-4 py-3 bg-primary/5 border border-primary/20 rounded-xl">
        <Loader2 className="w-4 h-4 animate-spin text-primary shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">Syncing Videos</p>
          <p className="text-[10px] text-muted-foreground">More video files are still being decrypted from the device...</p>
        </div>
        <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden shrink-0">
          <div className="h-full bg-primary rounded-full w-1/2 animate-pulse" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">Videos</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Captured video activity</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors border border-transparent hover:border-primary/50">
          <Search className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-xl p-3 flex flex-col items-center justify-center">
          <p className="text-xl font-bold text-foreground">847</p>
          <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1 text-center">Total Videos</p>
        </div>
        <div className="bg-card/40 backdrop-blur-xl border border-destructive/30 rounded-xl p-3 flex flex-col items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.1)]">
          <p className="text-xl font-bold text-destructive">312</p>
          <p className="text-[9px] text-destructive uppercase tracking-widest mt-1 text-center">Flagged</p>
        </div>
        <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-xl p-3 flex flex-col items-center justify-center">
          <p className="text-xl font-bold text-primary">5.6 <span className="text-sm">GB</span></p>
          <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1 text-center">Total Size</p>
        </div>
      </div>

      <div className="flex bg-secondary/50 p-1 rounded-lg">
        <button
          onClick={() => setFilter("all")}
          className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${filter === "all" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
        >
          All Videos ({videos.length})
        </button>
        <button
          onClick={() => setFilter("flagged")}
          className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${filter === "flagged" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
        >
          Flagged Only ({videos.filter(v => v.flagged).length})
        </button>
      </div>

      <div className="space-y-4">
        {filter === "all" && (
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-widest">Flagged Captures</h2>
          </div>
        )}

        <div className="space-y-3">
          {filteredVideos.map((video, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={video.id}
              className="bg-card/30 backdrop-blur-md border border-primary/10 rounded-xl overflow-hidden transition-all group flex"
            >
              <div className="relative h-auto w-28 bg-secondary/80 flex-shrink-0 flex items-center justify-center border-r border-primary/10">
                <Play className="w-7 h-7 text-primary/50" />
                {video.flagged && (
                  <div className="absolute top-1.5 left-1.5">
                    <span className="bg-destructive text-destructive-foreground text-[7px] font-bold uppercase tracking-widest px-1 py-0.5 rounded">Flag</span>
                  </div>
                )}
                <div className="absolute bottom-1.5 left-1.5">
                  <span className="bg-background/80 text-[8px] font-mono text-foreground/70 px-1 py-0.5 rounded">{video.duration}</span>
                </div>
              </div>

              <div className="p-3 flex-1 flex flex-col justify-center min-w-0">
                <h3 className="font-bold text-sm mb-1 truncate">{video.title}</h3>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{video.desc}</p>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                  <span>{video.time}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground/60">{video.size}</span>
                    <span className="text-primary/70">{video.ref}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <LoadingSpinner />
    </div>
  );
}
