import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Instagram, Image as ImageIcon, Heart, MessageCircle, ShieldAlert, X, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const fakeGrid = [
  { id: 1, likes: "1.2k", flagged: true  },
  { id: 2, likes: "847",  flagged: true  },
  { id: 3, likes: "3.4k", flagged: false },
  { id: 4, likes: "291",  flagged: true  },
  { id: 5, likes: "612",  flagged: false },
  { id: 6, likes: "2.1k", flagged: true  },
  { id: 7, likes: "488",  flagged: false },
  { id: 8, likes: "921",  flagged: true  },
  { id: 9, likes: "144",  flagged: false },
  { id: 10, likes: "1.8k", flagged: true  },
  { id: 11, likes: "763",  flagged: false },
  { id: 12, likes: "330",  flagged: false },
];

export default function InstagramSpy() {
  const [unlockOpen, setUnlockOpen] = useState(false);
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"price" | "code" | "processing">("price");

  const handleVerify = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("code");
    }, 1500);
  };

  const handleClose = () => {
    setUnlockOpen(false);
    setTimeout(() => {
      setStep("price");
      setCode("");
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 md:p-6 pb-24 space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" }}>
              <Instagram className="w-3.5 h-3.5 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-wide">Instagram Spy</h1>
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Target social media surveillance</p>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-destructive/10 border border-destructive/20">
          <Lock className="w-3 h-3 text-destructive" />
          <span className="text-[10px] text-destructive uppercase tracking-widest font-bold">Locked</span>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Posts",     val: "━━━",  color: "text-muted-foreground" },
          { label: "Followers", val: "━━━━━", color: "text-muted-foreground" },
          { label: "Following", val: "━━━",  color: "text-muted-foreground" },
        ].map((s) => (
          <div key={s.label} className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-xl p-3 flex flex-col items-center justify-center">
            <p className={`text-lg font-bold blur-sm select-none ${s.color}`}>{s.val}</p>
            <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1 text-center">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Profile card — blurred */}
      <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(240,148,51,0.06) 0%, rgba(188,24,136,0.06) 100%)" }} />

        <div className="flex items-center gap-4 mb-5">
          {/* Avatar — locked */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-secondary/80 flex items-center justify-center border-2 border-primary/20 overflow-hidden">
              <div className="absolute inset-0 bg-background/40 backdrop-blur-md" />
              <Lock className="w-6 h-6 text-muted-foreground relative z-10" />
            </div>
            {/* Instagram gradient ring */}
            <div className="absolute -inset-1 rounded-full -z-10 opacity-60" style={{ background: "linear-gradient(135deg, #f09433, #dc2743, #bc1888)" }} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-bold text-lg blur-sm select-none">███████████</p>
            <p className="text-sm text-muted-foreground blur-sm select-none mt-0.5">@████████</p>
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2 blur-sm select-none">
              Bio content intercepted — upgrade to read full profile biography and linked accounts.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 py-2 bg-secondary/40 rounded-xl text-center text-xs text-muted-foreground border border-border/50">
            <span className="font-bold blur-sm select-none">██ mutual</span>
          </div>
          <div className="flex-1 py-2 bg-secondary/40 rounded-xl text-center text-xs text-muted-foreground border border-border/50 blur-sm select-none">
            Contact Info
          </div>
        </div>
      </div>

      {/* LOCKED banner */}
      <div
        className="bg-card/40 backdrop-blur-xl border-2 rounded-2xl p-5 relative overflow-hidden cursor-pointer group transition-all hover:shadow-lg active:scale-[0.99]"
        style={{ borderColor: "rgba(240,148,51,0.4)" }}
        onClick={() => setUnlockOpen(true)}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(135deg, rgba(240,148,51,0.06) 0%, rgba(188,24,136,0.06) 100%)" }} />
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" }}>
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm uppercase tracking-widest">One-Time Verification Required</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Full account access locked</p>
          </div>
        </div>

        <div className="bg-secondary/40 rounded-xl p-3 border border-border/50 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Verification Code</span>
            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded" style={{ background: "rgba(240,148,51,0.15)", color: "#f09433" }}>One-Time</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-foreground">$300</span>
            <span className="text-sm text-muted-foreground mb-1">USD</span>
          </div>
          <ul className="text-xs text-muted-foreground mt-2 space-y-0.5">
            <li>• Full profile access (posts, stories, DMs)</li>
            <li>• Live follower & following list</li>
            <li>• Message history & media vault</li>
            <li>• Real-time activity monitoring</li>
          </ul>
        </div>

        <button
          className="w-full py-3 rounded-xl font-bold uppercase tracking-widest text-sm text-white transition-all active:scale-95 shadow-lg"
          style={{ background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" }}
        >
          Get Verification Code — $300
        </button>
      </div>

      {/* Blurred photo grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <ImageIcon className="w-4 h-4" /> Captured Posts
          </h2>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">12 / 847 visible</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {fakeGrid.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="aspect-square rounded-xl bg-secondary/60 border border-primary/10 relative overflow-hidden group cursor-pointer"
              onClick={() => setUnlockOpen(true)}
            >
              {/* Fake blurred background */}
              <div className="absolute inset-0" style={{ background: `hsl(${(item.id * 47) % 360}, 30%, 15%)` }} />
              <div className="absolute inset-0 backdrop-blur-sm bg-background/40" />

              {/* Lock overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 z-10">
                <Lock className="w-4 h-4 text-muted-foreground/60" />
              </div>

              {/* Flagged badge */}
              {item.flagged && (
                <div className="absolute top-1 left-1 z-20">
                  <span className="text-[7px] font-bold uppercase tracking-widest px-1 py-0.5 rounded" style={{ background: "rgba(220,39,67,0.8)", color: "white" }}>★</span>
                </div>
              )}

              {/* Hover reveal */}
              <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-background/50 backdrop-blur-xs">
                <div className="flex items-center gap-1 text-[9px] text-foreground/80">
                  <Heart className="w-3 h-3" />
                  <span className="blur-sm select-none">{item.likes}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More posts blurred row teaser */}
        <div className="mt-1.5 rounded-xl border border-dashed border-primary/20 p-4 flex items-center justify-center gap-2 text-muted-foreground cursor-pointer hover:bg-primary/5 transition-colors" onClick={() => setUnlockOpen(true)}>
          <Lock className="w-4 h-4" />
          <span className="text-xs uppercase tracking-widest font-bold">835 more posts locked — unlock for $300</span>
        </div>
      </div>

      {/* Unlock modal */}
      <Dialog open={unlockOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-card border-primary/30 sm:max-w-sm overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #f09433, #dc2743, #bc1888)" }} />

          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #f09433, #bc1888)" }}>
                <Instagram className="w-4 h-4 text-white" />
              </div>
              Instagram Account Access
            </DialogTitle>
            <DialogDescription>
              One-time verification code required to unlock full profile
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {step === "price" && (
              <motion.div key="price" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="py-4 space-y-4">
                  <div className="bg-secondary/30 rounded-xl p-4 border border-border/50">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-muted-foreground uppercase tracking-widest">Order Summary</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Instagram Spy — Full Access</span>
                      <span className="font-mono font-bold">$300.00</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground text-xs">
                      <span>One-time verification code</span>
                      <span>Included</span>
                    </div>
                    <div className="border-t border-border/50 mt-3 pt-3 flex justify-between items-center font-bold">
                      <span>Total</span>
                      <span className="text-lg">$300.00 USD</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Full DMs, posts, stories, and media vault access</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Live follower, following, and account metadata</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Real-time activity stream and location check-ins</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep("code")}
                    className="w-full py-3 rounded-xl font-bold uppercase tracking-widest text-sm text-white transition-all active:scale-95 shadow-lg"
                    style={{ background: "linear-gradient(135deg, #f09433 0%, #dc2743 50%, #bc1888 100%)" }}
                  >
                    Proceed — Pay $300
                  </button>
                  <button onClick={handleClose} className="w-full py-2 text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            {step === "code" && (
              <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="py-4 space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs">
                    <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p>Enter the one-time verification code sent to your registered payment method to unlock this account.</p>
                  </div>

                  <div>
                    <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-2 block">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 8))}
                      placeholder="Enter 8-digit code"
                      className="w-full bg-secondary/50 border border-primary/30 rounded-xl px-4 py-3 text-center font-mono text-lg tracking-[0.3em] placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(139,92,246,0.2)] transition-all"
                      autoFocus
                    />
                    <p className="text-[10px] text-muted-foreground mt-2 text-center">
                      Complete payment to receive your verification code
                    </p>
                  </div>

                  <button
                    onClick={handleVerify}
                    disabled={code.length < 6}
                    className="w-full py-3 rounded-xl font-bold uppercase tracking-widest text-sm text-white transition-all active:scale-95 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #f09433 0%, #dc2743 50%, #bc1888 100%)" }}
                  >
                    Verify &amp; Unlock
                  </button>
                  <button onClick={handleClose} className="w-full py-2 text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            {step === "processing" && (
              <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="py-10 flex flex-col items-center gap-4">
                  <div className="relative w-14 h-14">
                    <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                    <div className="absolute inset-0 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-widest animate-pulse">Verifying code...</p>
                  <p className="text-xs text-muted-foreground text-center">Connecting to Instagram surveillance layer</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
