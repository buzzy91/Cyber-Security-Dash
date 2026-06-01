import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Play, Lock, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const videos = [
  { id: 1, date: "Apr 9", title: "Captured Video — Apr 9", desc: "WhatsApp video captured from device", time: "Apr 9, 6:11 PM", ref: "#1847", flagged: true },
  { id: 2, date: "Apr 9", title: "Captured Video — Apr 9", desc: "System camera recording intercepted", time: "Apr 9, 4:22 PM", ref: "#1848", flagged: true },
  { id: 3, date: "Apr 8", title: "Captured Video — Apr 8", desc: "Messenger video clip detected", time: "Apr 8, 11:05 PM", ref: "#1849", flagged: true },
  { id: 4, date: "Apr 8", title: "Captured Video — Apr 8", desc: "Snapchat video captured", time: "Apr 8, 8:14 PM", ref: "#1850", flagged: false },
  { id: 5, date: "Apr 7", title: "Captured Video — Apr 7", desc: "Gallery sync video file", time: "Apr 7, 2:30 PM", ref: "#1851", flagged: false },
];

export default function Videos() {
  const [filter, setFilter] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const filteredVideos = filter === "flagged" ? videos.filter(v => v.flagged) : videos;

  return (
    <div className="p-4 md:p-6 pb-24 space-y-6">
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
          All Videos
        </button>
        <button 
          onClick={() => setFilter("flagged")}
          className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${filter === "flagged" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
        >
          Flagged Only
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
              transition={{ delay: i * 0.1 }}
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="bg-card/30 backdrop-blur-md border border-primary/10 hover:border-primary/40 rounded-xl overflow-hidden cursor-pointer transition-all group flex flex-col sm:flex-row"
            >
              <div className="relative h-32 sm:h-auto sm:w-32 bg-secondary/80 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-primary/10 group-hover:bg-primary/10 transition-colors">
                <Play className="w-8 h-8 text-primary/50 group-hover:text-primary transition-colors" />
                <div className="absolute top-2 right-2 sm:bottom-2 sm:top-auto">
                  <div className="w-6 h-6 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center border border-primary/30">
                    <Lock className="w-3 h-3 text-muted-foreground" />
                  </div>
                </div>
                {video.flagged && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-destructive text-destructive-foreground text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded">Flagged</span>
                  </div>
                )}
              </div>
              
              <div className="p-3 flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-sm mb-1">{video.title}</h3>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{video.desc}</p>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                  <span>{video.time}</span>
                  <span className="text-primary/70">{video.ref}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="bg-card border-primary/30 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" /> Access Restricted
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center border-2 border-primary/20 mb-4">
              <Play className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-bold text-lg mb-2">Encrypted Media</h3>
            <p className="text-sm text-muted-foreground px-4 mb-6">
              Video playback is restricted. This capture requires an upgraded license for decryption and streaming capabilities.
            </p>
            
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 w-full">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-muted-foreground uppercase tracking-widest">File Size</span>
                <span className="font-mono text-sm">~45.2 MB</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Format</span>
                <span className="font-mono text-sm">MP4 (Encrypted)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Duration</span>
                <span className="font-mono text-sm">01:24</span>
              </div>
            </div>
          </div>
          
          <button 
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(139,92,246,0.3)] active:scale-95"
          >
            Upgrade License
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
