import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, ShieldAlert, Loader2, Mic, Coins } from "lucide-react";
import CreditCoinShop from "@/components/CreditCoinShop";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const calls = [
  { id: 1,  name: "Craig",      phone: "+1 (509) 295-3400", duration: "4m 23s",  time: "Jun 3, 2025 · 9:41 AM",      type: "outgoing" },
  { id: 2,  name: "Ashley",     phone: "+1 (541) 874-3920", duration: "Missed",  time: "Jun 3, 2025 · 8:15 AM",      type: "missed"   },
  { id: 3,  name: "Justin",     phone: "+1 (919) 920-4726", duration: "7m 10s",  time: "Jun 7, 2025 · 7:02 AM",      type: "incoming" },
  { id: 4,  name: "Matt",       phone: "+1 (605) 971-6932", duration: "2m 48s",  time: "Jun 11, 2025 · 11:54 PM",    type: "outgoing" },
  { id: 5,  name: "Sophia",     phone: "+1 (971) 482-3715", duration: "Missed",  time: "Jun 14, 2025 · 9:30 PM",     type: "missed"   },
  { id: 6,  name: "John Smith", phone: "+1 (757) 280-3698", duration: "18m 34s", time: "Jun 18, 2025 · 6:15 PM",     type: "incoming" },
  { id: 7,  name: "Craig",      phone: "+1 (509) 295-3400", duration: "Missed",  time: "Jun 22, 2025 · 4:00 PM",     type: "missed"   },
  { id: 8,  name: "Brittany",   phone: "+1 (503) 329-1074", duration: "6m 05s",  time: "Jun 27, 2025 · 1:22 PM",     type: "incoming" },
  { id: 9,  name: "Justin",     phone: "+1 (919) 920-4726", duration: "Missed",  time: "Jul 2, 2025 · 10:45 AM",     type: "missed"   },
  { id: 10, name: "Matt",       phone: "+1 (605) 971-6932", duration: "33m 19s", time: "Jul 8, 2025 · 8:00 AM",      type: "outgoing" },
  { id: 11, name: "John Smith", phone: "+1 (757) 280-3698", duration: "7m 52s",  time: "Jul 13, 2025 · 11:30 PM",    type: "incoming" },
  { id: 12, name: "Mia",        phone: "+1 (541) 604-8273", duration: "Missed",  time: "Jul 17, 2025 · 9:14 PM",     type: "missed"   },
  { id: 13, name: "Craig",      phone: "+1 (509) 295-3400", duration: "21m 44s", time: "Jul 21, 2025 · 4:00 PM",     type: "outgoing" },
  { id: 14, name: "Justin",     phone: "+1 (919) 920-4726", duration: "3m 30s",  time: "Jul 26, 2025 · 2:20 PM",     type: "incoming" },
  { id: 15, name: "Ashley",     phone: "+1 (541) 874-3920", duration: "Missed",  time: "Aug 1, 2025 · 11:05 AM",     type: "missed"   },
  { id: 16, name: "Matt",       phone: "+1 (605) 971-6932", duration: "9m 58s",  time: "Aug 5, 2025 · 9:44 AM",      type: "outgoing" },
  { id: 17, name: "John Smith", phone: "+1 (757) 280-3698", duration: "Missed",  time: "Aug 10, 2025 · 8:30 PM",     type: "missed"   },
  { id: 18, name: "Craig",      phone: "+1 (509) 295-3400", duration: "14m 11s", time: "Aug 15, 2025 · 6:15 PM",     type: "incoming" },
  { id: 19, name: "Sophia",     phone: "+1 (971) 482-3715", duration: "5m 03s",  time: "Aug 20, 2025 · 3:00 PM",     type: "outgoing" },
  { id: 20, name: "Justin",     phone: "+1 (919) 920-4726", duration: "Missed",  time: "Aug 25, 2025 · 10:00 AM",    type: "missed"   },
  { id: 21, name: "Brittany",   phone: "+1 (503) 329-1074", duration: "11m 22s", time: "Aug 29, 2025 · 7:45 PM",     type: "incoming" },
  { id: 22, name: "Matt",       phone: "+1 (605) 971-6932", duration: "Missed",  time: "Sep 3, 2025 · 2:10 PM",      type: "missed"   },
  { id: 23, name: "Ashley",     phone: "+1 (541) 874-3920", duration: "8m 37s",  time: "Sep 7, 2025 · 10:30 AM",     type: "outgoing" },
  { id: 24, name: "Craig",      phone: "+1 (509) 295-3400", duration: "Missed",  time: "Sep 11, 2025 · 5:55 PM",     type: "missed"   },
  { id: 25, name: "John Smith", phone: "+1 (757) 280-3698", duration: "26m 08s", time: "Sep 16, 2025 · 9:00 AM",     type: "incoming" },
  { id: 26, name: "Sophia",     phone: "+1 (971) 482-3715", duration: "Missed",  time: "Sep 20, 2025 · 4:30 PM",     type: "missed"   },
  { id: 27, name: "Justin",     phone: "+1 (919) 920-4726", duration: "15m 44s", time: "Sep 25, 2025 · 1:15 PM",     type: "outgoing" },
  { id: 28, name: "Mia",        phone: "+1 (541) 604-8273", duration: "3m 19s",  time: "Sep 28, 2025 · 8:20 AM",     type: "incoming" },
];

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold animate-pulse">Fetching call records...</p>
    </div>
  );
}

export default function Calls() {
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [filter, setFilter] = useState<"all" | "incoming" | "outgoing" | "missed">("all");
  const [recordingOpen, setRecordingOpen] = useState(false);
  const [recordingLoading, setRecordingLoading] = useState(false);
  const [recordingReady, setRecordingReady] = useState(false);

  function openRecording() {
    setRecordingOpen(true);
    setRecordingLoading(true);
    setRecordingReady(false);
    setTimeout(() => {
      setRecordingLoading(false);
      setRecordingReady(true);
    }, 3000);
  }

  const [coinShopOpen, setCoinShopOpen] = useState(false);

  function closeRecording() {
    setRecordingOpen(false);
    setRecordingLoading(false);
    setRecordingReady(false);
  }

  const getCallIcon = (type: string) => {
    switch(type) {
      case 'incoming': return <PhoneIncoming className="w-4 h-4 text-green-500" />;
      case 'outgoing': return <PhoneOutgoing className="w-4 h-4 text-blue-400" />;
      case 'missed':   return <PhoneMissed className="w-4 h-4 text-destructive" />;
      default:         return <Phone className="w-4 h-4 text-primary" />;
    }
  };

  const getCallStyle = (type: string) => {
    switch(type) {
      case 'incoming': return "bg-green-500/10 border-green-500/20";
      case 'outgoing': return "bg-blue-400/10 border-blue-400/20";
      case 'missed':   return "bg-destructive/10 border-destructive/20";
      default:         return "bg-primary/10 border-primary/20";
    }
  };

  const filtered = filter === "all" ? calls : calls.filter(c => c.type === filter);

  const counts = {
    incoming: calls.filter(c => c.type === "incoming").length,
    outgoing: calls.filter(c => c.type === "outgoing").length,
    missed:   calls.filter(c => c.type === "missed").length,
  };

  return (
    <div className="p-4 md:p-6 pb-24 space-y-6">
      {/* Sync banner */}
      <div className="flex items-center gap-3 px-4 py-3 bg-primary/5 border border-primary/20 rounded-xl">
        <Loader2 className="w-4 h-4 animate-spin text-primary shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">Syncing Call Records</p>
          <p className="text-[10px] text-muted-foreground">More call logs still being retrieved from device...</p>
        </div>
        <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden shrink-0">
          <div className="h-full bg-primary rounded-full w-4/5 animate-pulse" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">Calls</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Jun – Sep 2025</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors border border-transparent hover:border-primary/50">
          <Search className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-xl p-3 flex flex-col items-center justify-center">
          <p className="text-xl font-bold text-foreground">948</p>
          <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1 text-center">Total</p>
        </div>
        <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-xl p-3 flex flex-col items-center justify-center">
          <p className="text-xl font-bold text-foreground">62h</p>
          <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1 text-center">Duration</p>
        </div>
        <div className="bg-card/40 backdrop-blur-xl border border-destructive/30 rounded-xl p-3 flex flex-col items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.1)]">
          <p className="text-xl font-bold text-destructive">{counts.missed}</p>
          <p className="text-[9px] text-destructive uppercase tracking-widest mt-1 text-center">Missed</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5">
        {(["all", "incoming", "outgoing", "missed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-lg border transition-all ${
              filter === f
                ? f === "missed"   ? "bg-destructive/20 border-destructive/50 text-destructive"
                : f === "outgoing" ? "bg-blue-400/20 border-blue-400/50 text-blue-300"
                : f === "incoming" ? "bg-green-500/20 border-green-500/50 text-green-400"
                : "bg-primary/20 border-primary/50 text-primary"
                : "bg-secondary/40 border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((call, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            key={call.id}
            onClick={() => setSelectedCall(call)}
            className="bg-card/30 backdrop-blur-md border border-primary/10 hover:border-primary/40 rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all hover:bg-card/50"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${getCallStyle(call.type)}`}>
                {getCallIcon(call.type)}
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">{call.name}</h3>
                <p className="text-xs text-muted-foreground font-mono">{call.phone}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-medium ${call.type === 'missed' ? 'text-destructive' : 'text-foreground'}`}>
                {call.duration}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{call.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <LoadingSpinner />

      {/* Call Detail Dialog */}
      <Dialog open={!!selectedCall} onOpenChange={() => setSelectedCall(null)}>
        <DialogContent className="bg-card border-primary/30 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Call Record Details</DialogTitle>
            <DialogDescription>Intercepted transmission logs</DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="flex items-center justify-center p-6 bg-secondary/20 rounded-xl border border-primary/10 mb-4">
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-3 border-2 ${getCallStyle(selectedCall?.type)}`}>
                  {getCallIcon(selectedCall?.type)}
                </div>
                <h2 className="text-xl font-bold">{selectedCall?.name}</h2>
                <p className="text-lg font-mono text-primary mt-1">{selectedCall?.phone}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{selectedCall?.type} CALL · {selectedCall?.duration}</p>
                <p className="text-[10px] text-muted-foreground mt-1 font-mono">{selectedCall?.time}</p>
              </div>
            </div>

            {/* Call Recording row */}
            <button
              onClick={openRecording}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all group"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Mic className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold">Call Recording</p>
                <p className="text-[10px] text-muted-foreground">Tap to access intercepted audio</p>
              </div>
            </button>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
              <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>Contact identity is masked by carrier encryption. Run deep trace to decrypt caller ID.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 py-2.5 rounded-lg border border-destructive/50 text-destructive hover:bg-destructive/10 transition-colors active:scale-95 text-sm font-bold uppercase tracking-wider">
              Block
            </button>
            <button className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-[0_0_10px_rgba(204,0,255,0.3)] active:scale-95 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> Trace
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Call Recording Dialog */}
      <Dialog open={recordingOpen} onOpenChange={closeRecording}>
        <DialogContent className="bg-card border-primary/30 sm:max-w-sm text-center">
          <DialogHeader>
            <DialogTitle className="text-primary font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <Mic className="w-5 h-5" /> Call Recording
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="py-6 flex flex-col items-center gap-5">
            <AnimatePresence mode="wait">
              {recordingLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(204,0,255,0.2)]">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-sm font-bold text-primary">Retrieving Recording...</p>
                    <p className="text-[11px] text-muted-foreground">Accessing intercepted audio file</p>
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
              ) : recordingReady ? (
                <motion.div
                  key="locked"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                    <Coins className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="space-y-2 text-center">
                    <p className="text-base font-bold text-yellow-400">Credit Coin Required</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Access to the live{" "}
                      <span className="text-yellow-400 font-bold uppercase tracking-wide">Premium</span>{" "}
                      call recording feed requires a Credit Coin. Purchase coins to unlock this feature and listen to intercepted audio in real time.
                    </p>
                  </div>
                  <div className="w-full p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                    <p className="text-[10px] text-yellow-400 uppercase tracking-widest font-bold text-center">20 Credit Coins = 1 Call Recording</p>
                  </div>
                  <button
                    onClick={() => { closeRecording(); setCoinShopOpen(true); }}
                    className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest shadow-[0_0_12px_rgba(204,0,255,0.3)] hover:opacity-90 transition-opacity"
                  >
                    Get Credit Coins
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
      <CreditCoinShop open={coinShopOpen} onClose={() => setCoinShopOpen(false)} />
    </div>
  );
}
