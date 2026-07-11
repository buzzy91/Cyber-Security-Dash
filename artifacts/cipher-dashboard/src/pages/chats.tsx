import React from "react";
import { motion } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const chats = [
  { id: 1, name: "Matt",       initial: "M",  avatarColor: "bg-blue-500/20 text-blue-400",     message: "Dixie, I can't stop thinking about you... last night meant everything 💕", time: "1:37 AM",  badge: 3 },
  { id: 2, name: "Craig",      initial: "C",  avatarColor: "bg-purple-500/20 text-purple-400", message: "You free tonight? Wanna grab some food",                                 time: "9:12 AM",  badge: 1 },
  { id: 3, name: "Ashley",     initial: "A",  avatarColor: "bg-rose-500/20 text-rose-400",     message: "Ok cool, see you then 👍",                                               time: "11:20 AM", badge: 0 },
  { id: 4, name: "Justin",     initial: "J",  avatarColor: "bg-cyan-500/20 text-cyan-400",     message: "Yo did you see the game last night?",                                    time: "2:05 PM",  badge: 0 },
  { id: 5, name: "John Smith", initial: "JS", avatarColor: "bg-green-500/20 text-green-400",   message: "I'll call you later when I'm done",                                      time: "Yesterday", badge: 0 },
  { id: 6, name: "Sophia",     initial: "S",  avatarColor: "bg-pink-500/20 text-pink-400",     message: "Haha yeah that was so funny 😂",                                         time: "Yesterday", badge: 0 },
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
                <h3 className="font-bold text-sm truncate">{chat.name}</h3>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">{chat.time}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{chat.message}</p>
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
