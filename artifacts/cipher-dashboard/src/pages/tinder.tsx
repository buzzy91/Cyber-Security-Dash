import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Heart, X, Star, MessageCircle, Bell } from "lucide-react";

const notifications = [
  { id: 1, name: "Joshua",      action: "liked your profile",  time: "Just now",   emoji: "🔥", new: true  },
  { id: 2, name: "Ashley_K",    action: "super liked you",     time: "2m ago",     emoji: "⭐", new: true  },
  { id: 3, name: "Brittany",    action: "liked your profile",  time: "14m ago",    emoji: "💕", new: true  },
  { id: 4, name: "Mia_23",      action: "sent you a message",  time: "1h ago",     emoji: "💬", new: false },
  { id: 5, name: "Sophia",      action: "liked your profile",  time: "3h ago",     emoji: "😍", new: false },
  { id: 6, name: "CraigM",      action: "liked your profile",  time: "5h ago",     emoji: "💕", new: false },
  { id: 7, name: "Natalie_R",   action: "super liked you",     time: "Yesterday",  emoji: "⭐", new: false },
];

const matches = [
  { id: 1, name: "Joshua",    age: 31, initial: "J", color: "from-pink-500 to-rose-600",   lastMsg: "You looked amazing 😍"  },
  { id: 2, name: "Ashley",    age: 25, initial: "A", color: "from-purple-500 to-pink-500",  lastMsg: "Are you free tonight?" },
  { id: 3, name: "Mia",       age: 23, initial: "M", color: "from-cyan-500 to-blue-500",    lastMsg: "I loved your photos 🔥" },
  { id: 4, name: "Brittany",  age: 27, initial: "B", color: "from-orange-400 to-rose-500",  lastMsg: "New Match!"            },
  { id: 5, name: "Sophia",    age: 24, initial: "S", color: "from-emerald-400 to-cyan-500", lastMsg: "New Match!"            },
];

export default function TinderPage() {
  const [activeTab, setActiveTab] = useState<"activity" | "matches">("activity");
  const [dismissed, setDismissed] = useState<number[]>([]);

  const visibleNotifs = notifications.filter(n => !dismissed.includes(n.id));

  return (
    <div className="p-4 md:p-6 pb-24 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#fd297b,#ff5864,#ff6f91)" }}>
          <Flame className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-wide">Tinder</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">Dating activity intercepted</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Live</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card/40 backdrop-blur-xl border border-rose-500/20 rounded-xl p-3 flex flex-col items-center justify-center">
          <p className="text-xl font-bold text-rose-400">47</p>
          <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1 text-center">Total Likes</p>
        </div>
        <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-xl p-3 flex flex-col items-center justify-center">
          <p className="text-xl font-bold text-pink-400">5</p>
          <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1 text-center">Matches</p>
        </div>
        <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-xl p-3 flex flex-col items-center justify-center">
          <p className="text-xl font-bold text-primary">3</p>
          <p className="text-[9px] text-primary uppercase tracking-widest mt-1 text-center">New Today</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-secondary/50 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("activity")}
          className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-1.5 ${activeTab === "activity" ? "bg-rose-500 text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Bell className="w-3.5 h-3.5" /> Activity
        </button>
        <button
          onClick={() => setActiveTab("matches")}
          className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-1.5 ${activeTab === "matches" ? "bg-rose-500 text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Heart className="w-3.5 h-3.5" /> Matches
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "activity" ? (
          <motion.div key="activity" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{visibleNotifs.filter(n => n.new).length} new notifications</p>
            </div>

            {visibleNotifs.map((notif, i) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${notif.new ? "bg-rose-500/10 border-rose-500/30" : "bg-card/30 border-primary/10"}`}
              >
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold shrink-0 text-sm`} style={{ background: "linear-gradient(135deg,#fd297b,#ff6f91)" }}>
                  {notif.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground">
                    <span className="text-rose-400">{notif.name}</span> {notif.action}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono">{notif.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{notif.emoji}</span>
                  {notif.new && <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.8)]" />}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div key="matches" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-2">{matches.length} mutual matches</p>
            {matches.map((match, i) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card/30 backdrop-blur-md border border-primary/10 hover:border-rose-500/30 rounded-xl p-3 flex items-center gap-3 transition-all cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${match.color} flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-md`}>
                  {match.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm">{match.name}</h3>
                    <span className="text-[10px] text-muted-foreground">{match.age}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{match.lastMsg}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform fill-rose-400" />
                  <MessageCircle className="w-4 h-4 text-muted-foreground group-hover:text-rose-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
