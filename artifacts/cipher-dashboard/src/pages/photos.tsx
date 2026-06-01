import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Image as ImageIcon, Lock, ShieldAlert } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const photos = [
  { id: 1, caption: "Thinkin bout you Britts ...", flagged: true },
  { id: 2, caption: "Caught this view #4822", flagged: true },
  { id: 3, caption: "Late night drive ...", flagged: true },
  { id: 4, caption: "City we found ...", flagged: true },
  { id: 5, caption: "Screenshot #291", flagged: false },
  { id: 6, caption: "IMG_8821.JPG", flagged: false },
  { id: 7, caption: "WhatsApp Image 2026", flagged: false },
  { id: 8, caption: "Downloads folder #11", flagged: false },
];

export default function Photos() {
  const [filter, setFilter] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

  const filteredPhotos = filter === "flagged" ? photos.filter(p => p.flagged) : photos;

  return (
    <div className="p-4 md:p-6 pb-24 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-wide">Photo Library</h1>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-sm bg-green-500/10 border border-green-500/20">
              <span className="text-[10px] text-green-500 uppercase tracking-widest font-bold">Synced</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">71 items captured today</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors border border-transparent hover:border-primary/50 shrink-0">
          <Search className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-xl p-3 flex flex-col items-center justify-center">
          <p className="text-xl font-bold text-foreground">6,541</p>
          <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1 text-center">Total Photos</p>
        </div>
        <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-xl p-3 flex flex-col items-center justify-center">
          <p className="text-xl font-bold text-primary">21</p>
          <p className="text-[9px] text-primary uppercase tracking-widest mt-1 text-center">Captured Today</p>
        </div>
        <div className="bg-card/40 backdrop-blur-xl border border-destructive/30 rounded-xl p-3 flex flex-col items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.1)]">
          <p className="text-xl font-bold text-destructive">71</p>
          <p className="text-[9px] text-destructive uppercase tracking-widest mt-1 text-center">Flagged</p>
        </div>
      </div>

      <div className="flex bg-secondary/50 p-1 rounded-lg">
        <button 
          onClick={() => setFilter("all")}
          className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${filter === "all" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
        >
          All Photos
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
            <ShieldAlert className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-widest">Flagged Photos</h2>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {filteredPhotos.map((photo, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="bg-card/30 backdrop-blur-md border border-primary/10 rounded-xl overflow-hidden cursor-pointer group aspect-square relative flex flex-col items-center justify-center"
            >
              {/* Fake blurred background pattern */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-background to-background" />
              
              <div className="relative z-10 w-12 h-12 rounded-full bg-background/50 backdrop-blur-md border border-destructive/50 flex items-center justify-center mb-3">
                <Lock className="w-5 h-5 text-destructive" />
              </div>
              
              {photo.flagged && (
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-primary/20 border border-primary/50 text-primary text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded">Flagged</span>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-background/80 backdrop-blur-md border-t border-primary/20 z-10">
                <p className="text-[10px] text-foreground font-medium truncate text-center">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="bg-card border-primary/30 sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center font-bold tracking-widest uppercase text-destructive flex items-center justify-center gap-2">
              <Lock className="w-5 h-5" /> Image Encrypted
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-2xl bg-secondary/50 flex items-center justify-center border-2 border-dashed border-muted-foreground/50 mb-4 relative overflow-hidden">
              <div className="absolute inset-0 backdrop-blur-xl bg-background/30" />
              <ImageIcon className="w-10 h-10 text-muted-foreground relative z-10" />
            </div>
            
            <p className="text-sm text-foreground mb-1 font-medium">{selectedPhoto?.caption}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mb-6">IMG_CAP_{Math.floor(Math.random() * 10000)}.JPG</p>
            
            <p className="text-sm text-muted-foreground px-2">
              High-resolution media files are stored securely on remote servers. Upgrade your license to bypass encryption and view captured images.
            </p>
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
