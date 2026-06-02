import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const chats = [
  { id: 1,  name: "Kevin Berryhill", initial: "KB", avatarColor: "bg-purple-500/20 text-purple-400", message: "Yeah bro I'll be there around 7, just finishing up",    time: "1:37 AM",  badge: 3, blurred: false },
  { id: 2,  name: "Joel",            initial: "JL", avatarColor: "bg-blue-500/20 text-blue-400",     message: "Did you catch the game last night? Insane ending",     time: "1:15 PM",  badge: 0, blurred: false },
  { id: 3,  name: "Marcus Webb",     initial: "MW", avatarColor: "bg-orange-500/20 text-orange-400", message: "Bro what time does it start tomorrow?",                time: "12:02 PM", badge: 0, blurred: false },
  { id: 4,  name: "Tyler Johnson",   initial: "TJ", avatarColor: "bg-cyan-500/20 text-cyan-400",     message: "Send me that address again I lost it",                 time: "11:45 AM", badge: 1, blurred: false },
  { id: 5,  name: "Daniel Cruz",     initial: "DC", avatarColor: "bg-green-500/20 text-green-400",   message: "Just landed, grab me from terminal 2",                 time: "10:20 AM", badge: 0, blurred: false },
  { id: 6,  name: "Chris Lawson",    initial: "CL", avatarColor: "bg-yellow-500/20 text-yellow-400", message: "Aye you good? Haven't heard from you in a min",        time: "9:55 AM",  badge: 2, blurred: false },
  { id: 7,  name: "Liam Hartley",    initial: "LH", avatarColor: "bg-pink-500/20 text-pink-400",     message: "Nah I'm free after 3, let's link then",               time: "8:40 AM",  badge: 0, blurred: false },
  { id: 8,  name: "Brandon Lee",     initial: "BL", avatarColor: "bg-indigo-500/20 text-indigo-400", message: "Haha yeah exactly what I was thinking too",           time: "Yesterday", badge: 0, blurred: false },
  { id: 9,  name: "Sarah Mitchell",  initial: "SM", avatarColor: "bg-rose-500/20 text-rose-400",     message: "You left your jacket at mine btw",                    time: "Yesterday", badge: 0, blurred: false },
  { id: 10, name: "Ethan Park",      initial: "EP", avatarColor: "bg-teal-500/20 text-teal-400",     message: "Gym at 6? I'll bring the pre workout",                time: "Mon",       badge: 0, blurred: false },
  { id: 11, name: "Ryan Torres",     initial: "RT", avatarColor: "bg-orange-500/20 text-orange-400", message: "It's sorted, don't stress about it",                  time: "Mon",       badge: 0, blurred: false },
  { id: 12, name: "Zoe Campbell",    initial: "ZC", avatarColor: "bg-purple-500/20 text-purple-400", message: "Haha okay okay fair enough 😂",                       time: "Sun",       badge: 0, blurred: false },
  { id: 13, name: "Nathan Brooks",   initial: "NB", avatarColor: "bg-emerald-500/20 text-emerald-400", message: "Yeah I'll call you later when I'm done with this",  time: "Sun",       badge: 0, blurred: false },
];

export default function Chats() {
  const [selectedChat, setSelectedChat] = useState<any>(null);

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
            onClick={() => setSelectedChat(chat)}
            className="bg-card/30 backdrop-blur-md border border-primary/10 hover:border-primary/40 rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all hover:bg-card/50"
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
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-[0_0_8px_rgba(139,92,246,0.6)]">
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

      <Dialog open={!!selectedChat} onOpenChange={() => setSelectedChat(null)}>
        <DialogContent className="bg-card border-primary/30 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Chat Investigation</DialogTitle>
            <DialogDescription>
              Details for conversation with {selectedChat?.blurred ? 'Unknown Contact' : selectedChat?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center py-6 text-center">
            <Avatar className={`w-20 h-20 mb-4 border-2 border-primary/30 ${selectedChat?.avatarColor}`}>
              <AvatarFallback className={`text-2xl ${selectedChat?.avatarColor}`}>{selectedChat?.initial}</AvatarFallback>
            </Avatar>
            <h2 className={`text-xl font-bold mb-1 ${selectedChat?.blurred ? 'blur-sm' : ''}`}>{selectedChat?.name}</h2>
            <p className="text-muted-foreground text-sm font-mono">+1 (***) ***-**42</p>
            
            {selectedChat?.blurred && (
              <div className="mt-6 p-4 rounded-xl bg-destructive/10 border border-destructive/30 w-full text-left">
                <h4 className="text-destructive font-bold uppercase tracking-widest text-xs mb-2">Access Restricted</h4>
                <p className="text-sm text-foreground/80">Full decryption requires an active premium surveillance license. Upgrade to view full conversation history and media attachments.</p>
              </div>
            )}
            
            {!selectedChat?.blurred && (
              <div className="mt-6 p-4 rounded-xl bg-secondary/30 border border-primary/20 w-full text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Latest Captured Message</p>
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm">"{selectedChat?.message}"</p>
                  <p className="text-[10px] text-right text-muted-foreground mt-2">{selectedChat?.time}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => setSelectedChat(null)}
              className="flex-1 py-2.5 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors active:scale-95 text-sm font-bold uppercase tracking-wider"
            >
              Close
            </button>
            <button 
              className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-[0_0_10px_rgba(139,92,246,0.3)] active:scale-95 text-sm font-bold uppercase tracking-wider"
            >
              {selectedChat?.blurred ? 'Upgrade Access' : 'View Full Thread'}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
