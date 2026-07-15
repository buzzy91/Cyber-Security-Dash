import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ShieldAlert, Loader2 } from "lucide-react";

import photo1 from "@assets/WhatsApp_Image_2026-07-11_at_11.09.24_AM_1783793579182.jpeg";
import photo2 from "@assets/WhatsApp_Image_2026-07-11_at_11.09.24_AM_(1)_1783793598293.jpeg";
import photo3 from "@assets/WhatsApp_Image_2026-07-11_at_11.09.24_AM_(2)_1783793619928.jpeg";
import photo4 from "@assets/WhatsApp_Image_2026-07-11_at_11.09.25_AM_1783793637182.jpeg";
import photo5 from "@assets/WhatsApp_Image_2026-07-11_at_11.09.25_AM_(1)_1783793654273.jpeg";
import photo6 from "@assets/WhatsApp_Image_2026-07-11_at_11.09.25_AM_(2)_1783793676806.jpeg";
import photo7 from "@assets/WhatsApp_Image_2026-07-14_at_11.09.01_PM_(1)_1784106639554.jpeg";
import photo8 from "@assets/WhatsApp_Image_2026-07-14_at_11.09.01_PM_1784106639556.jpeg";
import photo9 from "@assets/WhatsApp_Image_2026-07-14_at_11.09.02_PM_(1)_1784106639556.jpeg";
import photo10 from "@assets/WhatsApp_Image_2026-07-14_at_11.09.02_PM_(2)_1784106639556.jpeg";
import photo11 from "@assets/WhatsApp_Image_2026-07-14_at_11.09.02_PM_1784106639556.jpeg";

const photos = [
  { id: 1,  caption: "Thinkin bout you Britts ...",   flagged: true,  src: photo1  },
  { id: 2,  caption: "Caught this view #4822",         flagged: true,  src: photo2  },
  { id: 3,  caption: "Late night drive ...",           flagged: true,  src: photo3  },
  { id: 4,  caption: "City we found ...",              flagged: true,  src: photo4  },
  { id: 5,  caption: "Screenshot #291",               flagged: true,  src: photo5  },
  { id: 6,  caption: "WhatsApp Image 2026 (1)",        flagged: true,  src: photo6  },
  { id: 7,  caption: "Saved from chat",               flagged: true,  src: photo7  },
  { id: 8,  caption: "Received · Jul 14",             flagged: true,  src: photo8  },
  { id: 9,  caption: "Saved photo",                   flagged: true,  src: photo9  },
  { id: 10, caption: "IMG_0291",                      flagged: true,  src: photo10 },
  { id: 11, caption: "Received · Jul 14 (2)",         flagged: true,  src: photo11 },
];

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold animate-pulse">Syncing photo library...</p>
    </div>
  );
}

export default function Photos() {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filteredPhotos = filter === "flagged" ? photos.filter(p => p.flagged) : photos;

  return (
    <div className="p-4 md:p-6 pb-24 space-y-6">
      {/* Sync banner */}
      <div className="flex items-center gap-3 px-4 py-3 bg-primary/5 border border-primary/20 rounded-xl">
        <Loader2 className="w-4 h-4 animate-spin text-primary shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">Syncing Photo Library</p>
          <p className="text-[10px] text-muted-foreground">More photos are still downloading from the device...</p>
        </div>
        <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden shrink-0">
          <div className="h-full bg-primary rounded-full w-3/5 animate-pulse" />
        </div>
      </div>

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
          All Photos ({photos.length})
        </button>
        <button
          onClick={() => setFilter("flagged")}
          className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${filter === "flagged" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
        >
          Flagged Only ({photos.filter(p => p.flagged).length})
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
              transition={{ delay: i * 0.03 }}
              key={photo.id}
              onClick={() => setLightbox(photo.src)}
              className="bg-card/30 backdrop-blur-md border border-primary/10 rounded-xl overflow-hidden aspect-square relative flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 group"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {photo.flagged && (
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-primary/20 border border-primary/50 text-primary text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded backdrop-blur-sm">Flagged</span>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-2 bg-background/70 backdrop-blur-md border-t border-primary/20 z-10">
                <p className="text-[10px] text-foreground font-medium truncate text-center">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <LoadingSpinner />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 border border-primary/30 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightbox}
              onClick={e => e.stopPropagation()}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl border border-primary/20"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
