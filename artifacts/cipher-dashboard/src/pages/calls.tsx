import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, ShieldAlert } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const calls = [
  { id: 1, name: "Kevin Berryhill", phone: "+1 (817) 353-8219", duration: "4m 23s", time: "Today", type: "outgoing", blurred: false },
  { id: 2, name: "Joel", phone: "+1 (210) 771-8727", duration: "12m 01s", time: "Today", type: "incoming", blurred: false },
  { id: 3, name: "Unknown", phone: "Unknown", duration: "Missed", time: "Today", type: "missed", blurred: true },
  { id: 4, name: "Unknown", phone: "Unknown", duration: "2m 48s", time: "Yesterday", type: "incoming", blurred: true },
  { id: 5, name: "Unknown", phone: "Unknown", duration: "18m 34s", time: "Today", type: "outgoing", blurred: true },
  { id: 6, name: "Unknown", phone: "Unknown", duration: "6m 10s", time: "Today", type: "incoming", blurred: true },
  { id: 7, name: "Unknown", phone: "Unknown", duration: "Missed", time: "Yesterday", type: "missed", blurred: true },
];

export default function Calls() {
  const [selectedCall, setSelectedCall] = useState<any>(null);

  const getCallIcon = (type: string) => {
    switch(type) {
      case 'incoming': return <PhoneIncoming className="w-4 h-4 text-green-500" />;
      case 'outgoing': return <PhoneOutgoing className="w-4 h-4 text-green-500" />;
      case 'missed': return <PhoneMissed className="w-4 h-4 text-destructive" />;
      default: return <Phone className="w-4 h-4 text-primary" />;
    }
  };

  const getCallStyle = (type: string) => {
    switch(type) {
      case 'incoming': return "bg-green-500/10 border-green-500/20";
      case 'outgoing': return "bg-green-500/10 border-green-500/20";
      case 'missed': return "bg-destructive/10 border-destructive/20";
      default: return "bg-primary/10 border-primary/20";
    }
  };

  return (
    <div className="p-4 md:p-6 pb-24 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">Calls</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Recent call activity</p>
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
          <p className="text-xl font-bold text-destructive">23</p>
          <p className="text-[9px] text-destructive uppercase tracking-widest mt-1 text-center">Missed</p>
        </div>
      </div>

      <div className="space-y-3">
        {calls.map((call, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={call.id}
            onClick={() => setSelectedCall(call)}
            className="bg-card/30 backdrop-blur-md border border-primary/10 hover:border-primary/40 rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all hover:bg-card/50"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${getCallStyle(call.type)}`}>
                {getCallIcon(call.type)}
              </div>
              <div>
                <h3 className={`font-bold text-sm ${call.blurred ? 'blur-sm select-none' : ''}`}>
                  {call.name}
                </h3>
                <p className={`text-xs text-muted-foreground font-mono ${call.blurred ? 'blur-sm select-none' : ''}`}>
                  {call.phone}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className={`text-sm font-medium ${call.type === 'missed' ? 'text-destructive' : 'text-foreground'}`}>
                {call.duration}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                {call.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedCall} onOpenChange={() => setSelectedCall(null)}>
        <DialogContent className="bg-card border-primary/30 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Call Record Details</DialogTitle>
            <DialogDescription>
              Intercepted transmission logs
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-center p-6 bg-secondary/20 rounded-xl border border-primary/10 mb-4">
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-3 border-2 ${getCallStyle(selectedCall?.type)}`}>
                  {getCallIcon(selectedCall?.type)}
                </div>
                <h2 className={`text-xl font-bold ${selectedCall?.blurred ? 'blur-sm' : ''}`}>{selectedCall?.name}</h2>
                <p className="text-lg font-mono text-primary mt-1">{selectedCall?.blurred ? '+31 6 12345678' : selectedCall?.phone}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{selectedCall?.type} CALL • {selectedCall?.duration}</p>
              </div>
            </div>
            
            {selectedCall?.blurred && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>Contact identity is masked by carrier. Run deep trace analysis to decrypt caller ID information.</p>
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            <button 
              className="flex-1 py-2.5 rounded-lg border border-destructive/50 text-destructive hover:bg-destructive/10 transition-colors active:scale-95 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              Block
            </button>
            <button 
              className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-[0_0_10px_rgba(139,92,246,0.3)] active:scale-95 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" /> Trace
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
