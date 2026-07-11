import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, ArrowLeft, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const threads: Record<string, { from: "me" | "them"; text: string; time: string }[]> = {
  Matt: [
    { from: "them", text: "Good morning 😊 thinking about you",                                      time: "7:14 AM"  },
    { from: "me",   text: "Morning! Same honestly 🥰",                                               time: "7:22 AM"  },
    { from: "them", text: "What are you up to today?",                                               time: "7:24 AM"  },
    { from: "me",   text: "Nothing much, might go to the gym later",                                 time: "7:31 AM"  },
    { from: "them", text: "Can I join? 😏",                                                          time: "7:33 AM"  },
    { from: "me",   text: "lol maybe 😂",                                                            time: "7:40 AM"  },
    { from: "them", text: "Ok real talk though... last night was amazing",                           time: "11:05 AM" },
    { from: "me",   text: "It really was 🙈",                                                        time: "11:10 AM" },
    { from: "them", text: "I keep replaying it in my head",                                          time: "11:12 AM" },
    { from: "me",   text: "Stop 😭 you're going to make me smile again",                             time: "11:15 AM" },
    { from: "them", text: "That's the whole point ❤️",                                               time: "11:16 AM" },
    { from: "me",   text: "Haha okay okay... when can I see you again?",                             time: "12:48 AM" },
    { from: "them", text: "Hey... are you awake? 🌙",                                                time: "12:50 AM" },
    { from: "me",   text: "Yeah, can't sleep lol",                                                   time: "12:51 AM" },
    { from: "them", text: "Me neither. Keep thinking about you 😔",                                  time: "12:53 AM" },
    { from: "me",   text: "Same honestly... tonight was so good",                                    time: "12:55 AM" },
    { from: "them", text: "You have no idea how much you mean to me",                                time: "12:57 AM" },
    { from: "me",   text: "❤️ stop you're making me blush",                                          time: "1:02 AM"  },
    { from: "them", text: "Dixie, I can't stop thinking about you... last night meant everything 💕", time: "1:37 AM"  },
  ],
  Craig: [
    { from: "me",   text: "Hey, did you get my call earlier?",             time: "7:40 AM"  },
    { from: "them", text: "Yeah sorry I was in the shower",                time: "7:55 AM"  },
    { from: "me",   text: "No worries lol",                                time: "7:57 AM"  },
    { from: "them", text: "What's up?",                                    time: "8:01 AM"  },
    { from: "me",   text: "Nothing just checking in",                      time: "8:10 AM"  },
    { from: "them", text: "Hey what's up",                                 time: "8:50 AM"  },
    { from: "me",   text: "Not much, just got up",                         time: "9:02 AM"  },
    { from: "them", text: "You eat yet?",                                  time: "9:04 AM"  },
    { from: "me",   text: "Nah not yet",                                   time: "9:06 AM"  },
    { from: "them", text: "You free tonight? Wanna grab some food",        time: "9:12 AM"  },
  ],
  Ashley: [
    { from: "them", text: "Hey! Are we still on for today?",               time: "9:15 AM"  },
    { from: "me",   text: "Yeah for sure, what time?",                     time: "9:30 AM"  },
    { from: "them", text: "I was thinking maybe afternoon?",               time: "9:45 AM"  },
    { from: "me",   text: "Hey, what time works for you?",                 time: "10:40 AM" },
    { from: "them", text: "Maybe around 6?",                               time: "10:55 AM" },
    { from: "me",   text: "Works for me",                                  time: "11:10 AM" },
    { from: "them", text: "Cool! See you then",                            time: "11:15 AM" },
    { from: "me",   text: "👍 don't be late lol",                           time: "11:18 AM" },
    { from: "them", text: "Ok cool, see you then 👍",                       time: "11:20 AM" },
  ],
  Justin: [
    { from: "me",   text: "Yo what's going on tonight",                    time: "12:30 PM" },
    { from: "them", text: "Not sure yet probably staying in",              time: "12:45 PM" },
    { from: "me",   text: "Ah ok",                                         time: "12:50 PM" },
    { from: "them", text: "Broooo",                                        time: "1:30 PM"  },
    { from: "me",   text: "What lol",                                      time: "1:45 PM"  },
    { from: "them", text: "Did you see that comeback in the 4th quarter?", time: "1:50 PM"  },
    { from: "me",   text: "BRO YES I was going crazy",                     time: "1:52 PM"  },
    { from: "them", text: "Yo did you see the game last night?",           time: "2:05 PM"  },
  ],
  "John Smith": [
    { from: "them", text: "Hey can you talk?",                             time: "1:00 PM"  },
    { from: "me",   text: "Kinda busy right now",                          time: "1:20 PM"  },
    { from: "them", text: "Ok no worries",                                 time: "1:22 PM"  },
    { from: "me",   text: "What did you need?",                            time: "2:00 PM"  },
    { from: "them", text: "Just wanted to catch up",                       time: "2:30 PM"  },
    { from: "me",   text: "Can you call me when you're done?",             time: "3:10 PM"  },
    { from: "them", text: "Sure give me like 30 mins",                     time: "3:20 PM"  },
    { from: "me",   text: "Ok sounds good",                                time: "3:22 PM"  },
    { from: "them", text: "I'll call you later when I'm done",             time: "3:45 PM"  },
  ],
  Sophia: [
    { from: "me",   text: "Did you see the thing I tagged you in?",        time: "11:00 AM" },
    { from: "them", text: "Not yet let me check",                          time: "11:10 AM" },
    { from: "me",   text: "Lol it's so funny",                             time: "11:15 AM" },
    { from: "them", text: "LMAOO okay yeah that's hilarious",              time: "11:30 AM" },
    { from: "me",   text: "Right?? 😂",                                    time: "11:32 AM" },
    { from: "them", text: "Did you see that video I sent?",                time: "12:30 PM" },
    { from: "me",   text: "Yes omg 😂😂",                                   time: "12:40 PM" },
    { from: "them", text: "I knew you'd love it lol",                      time: "12:50 PM" },
    { from: "me",   text: "Send me more like that 💀",                      time: "12:52 PM" },
    { from: "them", text: "Haha yeah that was so funny 😂",                time: "12:55 PM" },
  ],
};

const chats = [
  { id: 1, name: "Matt",       initial: "M",  avatarColor: "bg-blue-500/20 text-blue-400",     message: "Dixie, I can't stop thinking about you... last night meant everything 💕", time: "1:37 AM",   badge: 3 },
  { id: 2, name: "Craig",      initial: "C",  avatarColor: "bg-purple-500/20 text-purple-400", message: "You free tonight? Wanna grab some food",                                 time: "9:12 AM",   badge: 1 },
  { id: 3, name: "Ashley",     initial: "A",  avatarColor: "bg-rose-500/20 text-rose-400",     message: "Ok cool, see you then 👍",                                               time: "11:20 AM",  badge: 0 },
  { id: 4, name: "Justin",     initial: "J",  avatarColor: "bg-cyan-500/20 text-cyan-400",     message: "Yo did you see the game last night?",                                    time: "2:05 PM",   badge: 0 },
  { id: 5, name: "John Smith", initial: "JS", avatarColor: "bg-green-500/20 text-green-400",   message: "I'll call you later when I'm done",                                      time: "Yesterday", badge: 0 },
  { id: 6, name: "Sophia",     initial: "S",  avatarColor: "bg-pink-500/20 text-pink-400",     message: "Haha yeah that was so funny 😂",                                         time: "Yesterday", badge: 0 },
];

function ChatThread({ chat, onBack }: { chat: typeof chats[0]; onBack: () => void }) {
  const messages = threads[chat.name] || [];
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} className="flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-primary/10 bg-card/40 backdrop-blur-md sticky top-0 z-10">
        <button onClick={onBack} className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <Avatar className={`w-9 h-9 border border-primary/20 ${chat.avatarColor}`}>
          <AvatarFallback className={chat.avatarColor}>{chat.initial}</AvatarFallback>
        </Avatar>
        <p className="font-bold text-sm">{chat.name}</p>
        <div className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
          <Loader2 className="w-2.5 h-2.5 animate-spin text-primary" />
          <span className="text-[9px] text-primary font-bold uppercase tracking-widest">Intercepting</span>
        </div>
      </div>

      {/* Sync banner inside thread */}
      <div className="flex items-center gap-2 mx-4 mt-3 mb-1 px-3 py-2 bg-primary/5 border border-primary/15 rounded-lg">
        <Loader2 className="w-3 h-3 animate-spin text-primary shrink-0" />
        <p className="text-[10px] text-muted-foreground">Retrieving earlier messages from device sync...</p>
      </div>

      {/* Messages */}
      <div className="p-4 space-y-3 pb-28">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
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

                  {chat.badge > 0 && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-[0_0_8px_rgba(204,0,255,0.6)] shrink-0">
                      {chat.badge}
                    </div>
                  )}
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
