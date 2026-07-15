import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, ArrowLeft, Send, Trash2, EyeOff, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const deletedMessages = [
  {
    id: 1,
    name: "Matt",
    number: "+1 (719) 331-7572",
    initial: "M",
    avatarColor: "bg-red-500/20 text-red-400",
    deletedAt: "Today 2:14 AM",
    preview: "Don't say anything to anyone about last night ok? Delete this after",
    messages: [
      { from: "them" as const, text: "Hey you still up?",                                           time: "1:48 AM" },
      { from: "me"   as const, text: "Yeah what's up",                                             time: "1:52 AM" },
      { from: "them" as const, text: "Can I come over? She thinks I'm at Dave's",                  time: "1:54 AM" },
      { from: "me"   as const, text: "Are you serious rn 😭",                                      time: "1:55 AM" },
      { from: "them" as const, text: "Just for a little. She won't know",                          time: "1:56 AM" },
      { from: "me"   as const, text: "Fine but be quiet when you come in",                         time: "2:01 AM" },
      { from: "them" as const, text: "Omw. Don't say anything to anyone about last night ok? Delete this after", time: "2:14 AM" },
    ],
  },
  {
    id: 2,
    name: "Ashley",
    number: "+1 (805) 342-3694",
    initial: "A",
    avatarColor: "bg-orange-500/20 text-orange-400",
    deletedAt: "Today 11:03 AM",
    preview: "I already deleted everything on my end. You should too",
    messages: [
      { from: "them" as const, text: "Did you tell him anything?",                                  time: "10:40 AM" },
      { from: "me"   as const, text: "No of course not",                                            time: "10:42 AM" },
      { from: "them" as const, text: "Good. Keep it that way",                                      time: "10:43 AM" },
      { from: "me"   as const, text: "He keeps asking where I was Saturday",                        time: "10:50 AM" },
      { from: "them" as const, text: "Just say you were with me at the mall",                       time: "10:51 AM" },
      { from: "me"   as const, text: "Ok I'll say that",                                            time: "10:55 AM" },
      { from: "them" as const, text: "I already deleted everything on my end. You should too",      time: "11:03 AM" },
    ],
  },
  {
    id: 3,
    name: "Craig",
    number: "+1 (602) 837-8658",
    initial: "C",
    avatarColor: "bg-yellow-500/20 text-yellow-400",
    deletedAt: "Yesterday 8:37 PM",
    preview: "Seriously delete this convo when you're done reading",
    messages: [
      { from: "them" as const, text: "Yo she went through my phone",                               time: "8:10 PM" },
      { from: "me"   as const, text: "WHAT. Did she see anything",                                  time: "8:15 PM" },
      { from: "them" as const, text: "I don't think so I cleared everything",                       time: "8:17 PM" },
      { from: "me"   as const, text: "Good. Don't text me from this number anymore",                time: "8:22 PM" },
      { from: "them" as const, text: "I'll get a new number just in case",                          time: "8:28 PM" },
      { from: "me"   as const, text: "Yeah do that",                                                time: "8:30 PM" },
      { from: "them" as const, text: "Seriously delete this convo when you're done reading",        time: "8:37 PM" },
    ],
  },
  {
    id: 4,
    name: "+1 (332) 465-2650",
    number: "+1 (332) 465-2650",
    initial: "?",
    avatarColor: "bg-purple-500/20 text-purple-400",
    deletedAt: "Yesterday 3:21 PM",
    preview: "Meet me at the same spot. Don't bring your phone",
    messages: [
      { from: "them" as const, text: "You free later?",                                             time: "2:45 PM" },
      { from: "me"   as const, text: "Maybe. Depends",                                              time: "2:50 PM" },
      { from: "them" as const, text: "Same place as before. 4pm",                                   time: "2:52 PM" },
      { from: "me"   as const, text: "How long",                                                    time: "2:55 PM" },
      { from: "them" as const, text: "Hour tops",                                                   time: "2:57 PM" },
      { from: "me"   as const, text: "Ok fine",                                                     time: "3:00 PM" },
      { from: "them" as const, text: "Meet me at the same spot. Don't bring your phone",            time: "3:21 PM" },
    ],
  },
  {
    id: 5,
    name: "+1 (602) 538-2812",
    number: "+1 (602) 538-2812",
    initial: "?",
    avatarColor: "bg-cyan-500/20 text-cyan-400",
    deletedAt: "2 days ago",
    preview: "If anyone asks we never spoke. You know the deal",
    messages: [
      { from: "them" as const, text: "Did you handle it?",                                          time: "9:05 AM" },
      { from: "me"   as const, text: "Yeah it's done",                                              time: "9:20 AM" },
      { from: "them" as const, text: "Good. Don't mention the amount to anyone",                    time: "9:22 AM" },
      { from: "me"   as const, text: "Obviously I'm not stupid",                                    time: "9:30 AM" },
      { from: "them" as const, text: "I'll send the rest when it clears",                           time: "9:45 AM" },
      { from: "me"   as const, text: "Fine just make it quick",                                     time: "9:50 AM" },
      { from: "them" as const, text: "If anyone asks we never spoke. You know the deal",            time: "10:02 AM" },
    ],
  },
  {
    id: 6,
    name: "+1 (321) 505-9005",
    number: "+1 (321) 505-9005",
    initial: "?",
    avatarColor: "bg-rose-500/20 text-rose-400",
    deletedAt: "3 days ago",
    preview: "Delete everything rn. I'm not playing. Do it now",
    messages: [
      { from: "them" as const, text: "Hey it's me new number",                                     time: "6:30 PM" },
      { from: "me"   as const, text: "Oh ok got it",                                               time: "6:35 PM" },
      { from: "them" as const, text: "Don't save it",                                              time: "6:36 PM" },
      { from: "me"   as const, text: "I won't",                                                    time: "6:40 PM" },
      { from: "them" as const, text: "Are we still good for Friday",                               time: "6:45 PM" },
      { from: "me"   as const, text: "Yeah but be careful this time",                              time: "6:50 PM" },
      { from: "them" as const, text: "Delete everything rn. I'm not playing. Do it now",           time: "7:04 PM" },
    ],
  },
];

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

type View = "list" | "deleted-folder" | "deleted-thread" | "chat-thread";

function DeletedThread({ item, onBack }: { item: typeof deletedMessages[0]; onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} className="flex flex-col">
      <div className="flex items-center gap-3 p-4 border-b border-red-500/20 bg-card/40 backdrop-blur-md sticky top-0 z-10">
        <button onClick={onBack} className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <Avatar className={`w-9 h-9 border border-red-500/20 ${item.avatarColor}`}>
          <AvatarFallback className={item.avatarColor}>{item.initial}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="font-bold text-sm truncate">{item.name}</p>
          {item.name !== item.number && <p className="text-[9px] text-muted-foreground font-mono">{item.number}</p>}
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 shrink-0">
          <Trash2 className="w-2.5 h-2.5 text-red-400" />
          <span className="text-[9px] text-red-400 font-bold uppercase tracking-widest">Recovered</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mx-4 mt-3 mb-1 px-3 py-2 bg-red-500/5 border border-red-500/15 rounded-lg">
        <Trash2 className="w-3 h-3 text-red-400 shrink-0" />
        <p className="text-[10px] text-red-400">Messages deleted by user · Recovered {item.deletedAt}</p>
      </div>

      <div className="p-4 space-y-3 pb-28">
        {item.messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${msg.from === "me" ? "bg-red-500/70 text-white rounded-br-sm" : "bg-card/60 border border-red-500/20 text-foreground rounded-bl-sm"}`}>
              <p>{msg.text}</p>
              <p className={`text-[9px] mt-1 ${msg.from === "me" ? "text-white/60 text-right" : "text-muted-foreground"}`}>{msg.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 border-t border-red-500/10 bg-card/40 backdrop-blur-md fixed bottom-0 left-0 right-0">
        <div className="flex gap-2 items-center bg-secondary/50 rounded-xl px-4 py-2 border border-red-500/10">
          <input className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Recovered deleted thread — read only" readOnly />
          <Send className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </motion.div>
  );
}

function DeletedFolder({ onBack, onOpen }: { onBack: () => void; onOpen: (item: typeof deletedMessages[0]) => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} className="flex flex-col">
      <div className="flex items-center gap-3 p-4 border-b border-red-500/20 bg-card/40 backdrop-blur-md sticky top-0 z-10">
        <button onClick={onBack} className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="w-9 h-9 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
          <Trash2 className="w-4 h-4 text-red-400" />
        </div>
        <div>
          <p className="font-bold text-sm">Deleted Messages</p>
          <p className="text-[9px] text-red-400 uppercase tracking-widest font-bold">Recovered from device cache</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[9px] text-red-400 font-bold uppercase tracking-widest">{deletedMessages.length} found</span>
        </div>
      </div>

      <div className="p-4 space-y-3 pb-24">
        <div className="flex items-center gap-2 px-3 py-2 bg-red-500/5 border border-red-500/15 rounded-lg mb-2">
          <Loader2 className="w-3 h-3 animate-spin text-red-400 shrink-0" />
          <p className="text-[10px] text-red-400/80">Scanning device storage for deleted conversations...</p>
        </div>

        {deletedMessages.map((item, i) => (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            key={item.id}
            onClick={() => onOpen(item)}
            className="w-full bg-red-500/5 backdrop-blur-md border border-red-500/15 hover:border-red-500/40 rounded-xl p-3 flex items-center gap-3 transition-all text-left cursor-pointer hover:bg-red-500/10"
          >
            <Avatar className={`w-11 h-11 border border-red-500/20 ${item.avatarColor} shrink-0`}>
              <AvatarFallback className={item.avatarColor}>{item.initial}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="font-bold text-sm truncate">{item.name}</h3>
                <span className="text-[9px] text-red-400/70 whitespace-nowrap ml-2 font-mono shrink-0">{item.deletedAt}</span>
              </div>
              {item.name !== item.number && (
                <p className="text-[10px] text-muted-foreground font-mono mb-0.5">{item.number}</p>
              )}
              <p className="text-xs text-muted-foreground truncate italic">"{item.preview}"</p>
            </div>
            <ChevronRight className="w-4 h-4 text-red-400/50 shrink-0" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function ChatThread({ chat, onBack }: { chat: typeof chats[0]; onBack: () => void }) {
  const messages = threads[chat.name] || [];
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} className="flex flex-col">
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

      <div className="flex items-center gap-2 mx-4 mt-3 mb-1 px-3 py-2 bg-primary/5 border border-primary/15 rounded-lg">
        <Loader2 className="w-3 h-3 animate-spin text-primary shrink-0" />
        <p className="text-[10px] text-muted-foreground">Retrieving earlier messages from device sync...</p>
      </div>

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
  const [view, setView] = useState<View>("list");
  const [openChat, setOpenChat] = useState<typeof chats[0] | null>(null);
  const [openDeleted, setOpenDeleted] = useState<typeof deletedMessages[0] | null>(null);

  return (
    <div className="pb-24">
      <AnimatePresence mode="wait">
        {view === "deleted-thread" && openDeleted ? (
          <DeletedThread
            key="deleted-thread"
            item={openDeleted}
            onBack={() => { setView("deleted-folder"); setOpenDeleted(null); }}
          />
        ) : view === "deleted-folder" ? (
          <DeletedFolder
            key="deleted-folder"
            onBack={() => setView("list")}
            onOpen={(item) => { setOpenDeleted(item); setView("deleted-thread"); }}
          />
        ) : view === "chat-thread" && openChat ? (
          <ChatThread
            key="chat-thread"
            chat={openChat}
            onBack={() => { setView("list"); setOpenChat(null); }}
          />
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

            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <EyeOff className="w-5 h-5 text-primary" />
                  <h1 className="text-2xl font-bold tracking-wide">Hidden Chats</h1>
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Message activity</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors border border-transparent hover:border-primary/50">
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* ── DELETED MESSAGES FOLDER ── */}
            <motion.button
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView("deleted-folder")}
              className="w-full bg-card/30 backdrop-blur-md border border-red-500/30 hover:border-red-500/60 rounded-xl p-4 flex items-center gap-4 transition-all text-left cursor-pointer hover:bg-red-500/5 group"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0 group-hover:bg-red-500/30 transition-colors">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-base">Deleted Messages</p>
                <p className="text-xs text-muted-foreground">Recovered from device cache</p>
              </div>
              <ChevronRight className="w-5 h-5 text-red-400/60 shrink-0 group-hover:text-red-400 transition-colors" />
            </motion.button>

            {/* ── HIDDEN CHATS LIST ── */}
            <div className="space-y-3">
              {chats.map((chat, i) => (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={chat.id}
                  onClick={() => { setOpenChat(chat); setView("chat-thread"); }}
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
