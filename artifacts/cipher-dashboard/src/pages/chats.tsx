import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, ArrowLeft, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const sparkData = {
  Matt:       [2,5,3,8,6,12,9],
  Craig:      [1,3,2,4,3,5,4],
  Ashley:     [0,1,2,1,3,2,2],
  Justin:     [3,2,4,3,2,1,3],
  "John Smith":[1,1,2,1,1,2,1],
  Sophia:     [0,1,0,2,1,1,2],
};

function Spark({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const w = 40, h = 18;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - (v / max) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const threads: Record<string, { from: "me" | "them"; text: string; time: string }[]> = {
  Matt: [
    { from: "them", text: "Hey... are you awake? 🌙",                                    time: "12:48 AM" },
    { from: "me",   text: "Yeah, can't sleep lol",                                       time: "12:50 AM" },
    { from: "them", text: "Me neither. Keep thinking about you 😔",                       time: "12:51 AM" },
    { from: "me",   text: "Same honestly... tonight was so good",                         time: "12:53 AM" },
    { from: "them", text: "You have no idea how much you mean to me",                    time: "12:55 AM" },
    { from: "me",   text: "❤️ stop you're making me blush",                               time: "12:57 AM" },
    { from: "them", text: "Dixie, I can't stop thinking about you... last night meant everything 💕", time: "1:37 AM" },
  ],
  Craig: [
    { from: "them", text: "Hey what's up",                                               time: "8:50 AM" },
    { from: "me",   text: "Not much, just got up",                                       time: "9:02 AM" },
    { from: "them", text: "You free tonight? Wanna grab some food",                      time: "9:12 AM" },
  ],
  Ashley: [
    { from: "me",   text: "Hey, what time works for you?",                               time: "10:40 AM" },
    { from: "them", text: "Maybe around 6?",                                             time: "10:55 AM" },
    { from: "me",   text: "Works for me",                                                time: "11:10 AM" },
    { from: "them", text: "Ok cool, see you then 👍",                                     time: "11:20 AM" },
  ],
  Justin: [
    { from: "them", text: "Broooo",                                                      time: "1:30 PM" },
    { from: "me",   text: "What lol",                                                    time: "1:45 PM" },
    { from: "them", text: "Yo did you see the game last night?",                         time: "2:05 PM" },
  ],
  "John Smith": [
    { from: "me",   text: "Can you call me when you're done?",                           time: "3:10 PM" },
    { from: "them", text: "I'll call you later when I'm done",                           time: "3:45 PM" },
  ],
  Sophia: [
    { from: "them", text: "Did you see that video I sent?",                              time: "12:30 PM" },
    { from: "me",   text: "Yes omg 😂😂",                                                 time: "12:40 PM" },
    { from: "them", text: "Haha yeah that was so funny 😂",                              time: "12:55 PM" },
  ],
};

const chats = [
  { id: 1, name: "Matt",       initial: "M",  avatarColor: "bg-blue-500/20 text-blue-400",     sparkColor: "#60a5fa", message: "Dixie, I can't stop thinking about you... last night meant everything 💕", time: "1:37 AM",   badge: 3 },
  { id: 2, name: "Craig",      initial: "C",  avatarColor: "bg-purple-500/20 text-purple-400", sparkColor: "#a78bfa", message: "You free tonight? Wanna grab some food",                                 time: "9:12 AM",   badge: 1 },
  { id: 3, name: "Ashley",     initial: "A",  avatarColor: "bg-rose-500/20 text-rose-400",     sparkColor: "#fb7185", message: "Ok cool, see you then 👍",                                               time: "11:20 AM",  badge: 0 },
  { id: 4, name: "Justin",     initial: "J",  avatarColor: "bg-cyan-500/20 text-cyan-400",     sparkColor: "#22d3ee", message: "Yo did you see the game last night?",                                    time: "2:05 PM",   badge: 0 },
  { id: 5, name: "John Smith", initial: "JS", avatarColor: "bg-green-500/20 text-green-400",   sparkColor: "#4ade80", message: "I'll call you later when I'm done",                                      time: "Yesterday", badge: 0 },
  { id: 6, name: "Sophia",     initial: "S",  avatarColor: "bg-pink-500/20 text-pink-400",     sparkColor: "#f472b6", message: "Haha yeah that was so funny 😂",                                         time: "Yesterday", badge: 0 },
];

function ChatThread({ chat, onBack }: { chat: typeof chats[0]; onBack: () => void }) {
  const messages = threads[chat.name] || [];
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      className="flex flex-col h-full"
    >
      <div className="flex items-center gap-3 p-4 border-b border-primary/10 bg-card/40 backdrop-blur-md sticky top-0 z-10">
        <button onClick={onBack} className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <Avatar className={`w-9 h-9 border border-primary/20 ${chat.avatarColor}`}>
          <AvatarFallback className={chat.avatarColor}>{chat.initial}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold text-sm">{chat.name}</p>
          <p className="text-[10px] text-green-400 uppercase tracking-widest font-bold">Online</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
          <Loader2 className="w-2.5 h-2.5 animate-spin text-primary" />
          <span className="text-[9px] text-primary font-bold uppercase tracking-widest">Intercepting</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-20">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${msg.from === "me" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card/60 border border-primary/10 text-foreground rounded-bl-sm"}`}>
              <p>{msg.text}</p>
              <p className={`text-[9px] mt-1 ${msg.from === "me" ? "text-primary-foreground/60 text-right" : "text-muted-foreground"}`}>{msg.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 border-t border-primary/10 bg-card/40 backdrop-blur-md fixed bottom-0 left-0 right-0">
        <div className="flex gap-2 items-center bg-secondary/50 rounded-xl px-4 py-2 border border-primary/10">
          <input className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Intercepted thread — read only" readOnly />
          <Send className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Chats() {
  const [openChat, setOpenChat] = useState<typeof chats[0] | null>(null);

  return (
    <div className="pb-24">
      <AnimatePresence mode="wait">
        {openChat ? (
          <ChatThread key="thread" chat={openChat} onBack={() => setOpenChat(null)} />
        ) : (
          <motion.div key="list" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-4 md:p-6 space-y-5">
            {/* Sync banner */}
            <div className="flex items-center gap-3 px-4 py-3 bg-primary/5 border border-primary/20 rounded-xl">
              <Loader2 className="w-4 h-4 animate-spin text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-primary uppercase tracking-widest">Syncing Messages</p>
                <p className="text-[10px] text-muted-foreground">Additional conversations still downloading from device...</p>
              </div>
              <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden shrink-0">
                <div className="h-full bg-primary rounded-full w-2/3 animate-pulse" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-wide">Recent Chats</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Message activity</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors border border-transparent hover:border-primary/50">
                <Search className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {chats.map((chat, i) => (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={chat.id}
                  onClick={() => setOpenChat(chat)}
                  className="w-full bg-card/30 backdrop-blur-md border border-primary/10 hover:border-primary/30 rounded-xl p-3 flex items-center gap-3 transition-all text-left cursor-pointer hover:bg-primary/5"
                >
                  <Avatar className={`w-12 h-12 border border-primary/20 ${chat.avatarColor} shrink-0`}>
                    <AvatarFallback className={chat.avatarColor}>{chat.initial}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-sm truncate">{chat.name}</h3>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">{chat.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{chat.message}</p>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <Spark data={sparkData[chat.name as keyof typeof sparkData] || [1,1,1,1,1,1,1]} color={chat.sparkColor} />
                    {chat.badge > 0 && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-[0_0_8px_rgba(204,0,255,0.6)]">
                        {chat.badge}
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="py-4 flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-xs uppercase tracking-widest font-bold">Loading more messages...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
