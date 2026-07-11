import React from "react";
import { motion } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const chats = [
  { id: 1,  name: "Matt",            initial: "M",  avatarColor: "bg-blue-500/20 text-blue-400",     message: "Miss you already 😘 last night was everything...",              time: "1:37 AM",  badge: 3, blurred: false },
  { id: 2,  name: "Craig",           initial: "C",  avatarColor: "bg-purple-500/20 text-purple-400", message: "Don't tell anyone about us okay? 🥺 I keep thinking about you", time: "1:15 PM",  badge: 2, blurred: false },
  { id: 3,  name: "Jane Aubrey",     initial: "JA", avatarColor: "bg-rose-500/20 text-rose-400",     message: "Can we meet tonight? Same place as before 💋",                 time: "12:02 PM", badge: 0, blurred: true  },
  { id: 4,  name: "Natalia",         initial: "N",  avatarColor: "bg-cyan-500/20 text-cyan-400",     message: "Hey you... are you free this weekend? 😏",                     time: "11:45 AM", badge: 1, blurred: true  },
  { id: 5,  name: "Iris",            initial: "I",  avatarColor: "bg-orange-500/20 text-orange-400", message: "I told you I'm not like the others 🖤",                        time: "10:20 AM", badge: 0, blurred: true  },
  { id: 6,  name: "Emma Rhodes",     initial: "ER", avatarColor: "bg-emerald-500/20 text-emerald-400",message: "You never replied last night, everything ok? 💭",              time: "9:55 AM",  badge: 0, blurred: true  },
  { id: 7,  name: "Kevin Berryhill", initial: "KB", avatarColor: "bg-blue-500/20 text-blue-400",     message: "Yo what time are we meeting up?",                              time: "8:40 AM",  badge: 0, blurred: true  },
  { id: 8,  name: "Mia Torres",      initial: "MT", avatarColor: "bg-indigo-500/20 text-indigo-400", message: "You're so different and I like it 🖤",                         time: "Yesterday", badge: 0, blurred: true  },
  { id: 9,  name: "Sarah Collins",   initial: "SC", avatarColor: "bg-yellow-500/20 text-yellow-400", message: "Stop leaving me on read when you know I'm thinking of you",   time: "Yesterday", badge: 0, blurred: true  },
  { id: 10, name: "Marcus Webb",     initial: "MW", avatarColor: "bg-teal-500/20 text-teal-400",     message: "Bro call me back when you get a chance",                       time: "Mon",       badge: 0, blurred: true  },
  { id: 11, name: "Tyler Johnson",   initial: "TJ", avatarColor: "bg-green-500/20 text-green-400",   message: "Still on for Sunday right?",                                   time: "Mon",       badge: 0, blurred: true  },
  { id: 12, name: "Zoe Campbell",    initial: "ZC", avatarColor: "bg-pink-500/20 text-pink-400",     message: "You looked so good yesterday btw 👀",                         time: "Sun",       badge: 0, blurred: true  },
  { id: 13, name: "Daniel Cruz",     initial: "DC", avatarColor: "bg-orange-500/20 text-orange-400", message: "Let's link up this week",                                      time: "Sun",       badge: 0, blurred: true  },
];

export default function Chats() {

  return (
    <div className="p-4 md:p-6 pb-24 space-y-6">
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
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            key={chat.id}
            className="bg-card/30 backdrop-blur-md border border-primary/10 rounded-xl p-3 flex items-center gap-3"
          >
            <Avatar className={`w-12 h-12 border border-primary/20 ${chat.avatarColor}`}>
              <AvatarFallback className={chat.avatarColor}>{chat.initial}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className={`font-bold text-sm truncate ${chat.blurred ? 'blur-sm select-none' : ''}`}>
                  {chat.name}
                </h3>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">
                  {chat.time}
                </span>
              </div>
              <p className={`text-xs text-muted-foreground truncate ${chat.blurred ? 'blur-sm select-none' : ''}`}>
                {chat.message}
              </p>
            </div>

            {chat.badge > 0 && (
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-[0_0_8px_rgba(204,0,255,0.6)]">
                {chat.badge}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="py-6 flex items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin text-primary" />
        <span className="text-xs uppercase tracking-widest font-bold">Loading more messages...</span>
      </div>

    </div>
  );
}
