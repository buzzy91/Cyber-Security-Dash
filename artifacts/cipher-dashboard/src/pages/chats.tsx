import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, ArrowLeft, Send, Trash2, EyeOff, ChevronRight, Archive, Lock, MessageCircle, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const recoveredMessages = [
  {
    id: 1,
    name: "Matt",
    number: "+1 (719) 331-7572",
    initial: "M",
    avatarColor: "bg-red-500/20 text-red-400",
    recoveredAt: "Apr 12, 2025",
    preview: "Don't say anything to anyone about last night ok? Get rid of this",
    messages: [
      { from: "them" as const, text: "Hey you still up?",                                              time: "Apr 12 · 1:48 AM" },
      { from: "me"   as const, text: "Yeah what's up",                                                time: "Apr 12 · 1:52 AM" },
      { from: "them" as const, text: "Can I come over? She thinks I'm at Dave's",                     time: "Apr 12 · 1:54 AM" },
      { from: "me"   as const, text: "Are you serious rn 😭",                                         time: "Apr 12 · 1:55 AM" },
      { from: "them" as const, text: "Just for a little. She won't know",                             time: "Apr 12 · 1:56 AM" },
      { from: "me"   as const, text: "Fine but be quiet when you come in",                            time: "Apr 12 · 2:01 AM" },
      { from: "them" as const, text: "Omw 🏃",                                                        time: "Apr 12 · 2:05 AM" },
      { from: "me"   as const, text: "Side door is open",                                             time: "Apr 12 · 2:07 AM" },
      { from: "them" as const, text: "Ok I'm outside",                                               time: "Apr 12 · 2:18 AM" },
      { from: "them" as const, text: "Don't say anything to anyone about last night ok? Get rid of this", time: "Apr 12 · 2:31 AM" },
    ],
  },
  {
    id: 2,
    name: "Ashley",
    number: "+1 (805) 342-3694",
    initial: "A",
    avatarColor: "bg-orange-500/20 text-orange-400",
    recoveredAt: "May 3, 2025",
    preview: "I already cleared everything on my end. You should too",
    messages: [
      { from: "them" as const, text: "Did you tell him anything?",                                    time: "May 3 · 10:40 AM" },
      { from: "me"   as const, text: "No of course not",                                             time: "May 3 · 10:42 AM" },
      { from: "them" as const, text: "Good. Keep it that way",                                       time: "May 3 · 10:43 AM" },
      { from: "me"   as const, text: "He keeps asking where I was Saturday",                         time: "May 3 · 10:50 AM" },
      { from: "them" as const, text: "Just say you were with me at the mall",                        time: "May 3 · 10:51 AM" },
      { from: "me"   as const, text: "Ok I'll say that",                                             time: "May 3 · 10:55 AM" },
      { from: "them" as const, text: "Also don't mention the brunch. He doesn't know about it",      time: "May 3 · 10:59 AM" },
      { from: "me"   as const, text: "Obviously lol I'm not dumb",                                   time: "May 3 · 11:01 AM" },
      { from: "them" as const, text: "I already cleared everything on my end. You should too",       time: "May 3 · 11:03 AM" },
    ],
  },
  {
    id: 3,
    name: "Craig",
    number: "+1 (602) 837-8658",
    initial: "C",
    avatarColor: "bg-yellow-500/20 text-yellow-400",
    recoveredAt: "Jun 18, 2025",
    preview: "Wipe this whole convo when you're done reading",
    messages: [
      { from: "them" as const, text: "Yo she went through my phone last night",                      time: "Jun 18 · 8:10 PM" },
      { from: "me"   as const, text: "WHAT. Did she see anything",                                   time: "Jun 18 · 8:15 PM" },
      { from: "them" as const, text: "I don't think so I cleared everything",                        time: "Jun 18 · 8:17 PM" },
      { from: "me"   as const, text: "Good. Don't text me from this number anymore",                 time: "Jun 18 · 8:22 PM" },
      { from: "them" as const, text: "Yeah I'll get a second one",                                   time: "Jun 18 · 8:25 PM" },
      { from: "me"   as const, text: "Do that. Use Signal or something",                             time: "Jun 18 · 8:28 PM" },
      { from: "them" as const, text: "Smart",                                                        time: "Jun 18 · 8:30 PM" },
      { from: "me"   as const, text: "And stop being sloppy",                                        time: "Jun 18 · 8:33 PM" },
      { from: "them" as const, text: "Wipe this whole convo when you're done reading",               time: "Jun 18 · 8:37 PM" },
    ],
  },
  {
    id: 4,
    name: "+1 (332) 465-2650",
    number: "+1 (332) 465-2650",
    initial: "?",
    avatarColor: "bg-purple-500/20 text-purple-400",
    recoveredAt: "Jul 29, 2025",
    preview: "Meet at the same spot. Don't bring your phone next time",
    messages: [
      { from: "them" as const, text: "You free later?",                                              time: "Jul 29 · 2:45 PM" },
      { from: "me"   as const, text: "Maybe. Depends on time",                                       time: "Jul 29 · 2:50 PM" },
      { from: "them" as const, text: "Same place as before. 4pm",                                    time: "Jul 29 · 2:52 PM" },
      { from: "me"   as const, text: "How long you need",                                            time: "Jul 29 · 2:55 PM" },
      { from: "them" as const, text: "Hour tops I promise",                                          time: "Jul 29 · 2:57 PM" },
      { from: "me"   as const, text: "Fine. I'll be there",                                          time: "Jul 29 · 3:00 PM" },
      { from: "them" as const, text: "Park around the back",                                         time: "Jul 29 · 3:04 PM" },
      { from: "me"   as const, text: "Ok",                                                           time: "Jul 29 · 3:05 PM" },
      { from: "them" as const, text: "Meet at the same spot. Don't bring your phone next time",      time: "Jul 29 · 3:21 PM" },
    ],
  },
  {
    id: 5,
    name: "+1 (602) 538-2812",
    number: "+1 (602) 538-2812",
    initial: "?",
    avatarColor: "bg-cyan-500/20 text-cyan-400",
    recoveredAt: "Aug 14, 2025",
    preview: "If anyone asks we never spoke. You know how this goes",
    messages: [
      { from: "them" as const, text: "Did you handle it?",                                           time: "Aug 14 · 9:05 AM" },
      { from: "me"   as const, text: "Yeah it's handled",                                            time: "Aug 14 · 9:20 AM" },
      { from: "them" as const, text: "Good. Don't mention the amount to anyone",                     time: "Aug 14 · 9:22 AM" },
      { from: "me"   as const, text: "Obviously. I'm not new to this",                               time: "Aug 14 · 9:30 AM" },
      { from: "them" as const, text: "I'll send the rest once it clears",                            time: "Aug 14 · 9:45 AM" },
      { from: "me"   as const, text: "Fine but make it quick",                                       time: "Aug 14 · 9:50 AM" },
      { from: "them" as const, text: "Should be clear by Thursday",                                  time: "Aug 14 · 9:52 AM" },
      { from: "me"   as const, text: "Ok. And use the other account next time",                      time: "Aug 14 · 9:58 AM" },
      { from: "them" as const, text: "If anyone asks we never spoke. You know how this goes",        time: "Aug 14 · 10:02 AM" },
    ],
  },
  {
    id: 6,
    name: "+1 (321) 505-9005",
    number: "+1 (321) 505-9005",
    initial: "?",
    avatarColor: "bg-rose-500/20 text-rose-400",
    recoveredAt: "Aug 30, 2025",
    preview: "Clear everything. I'm not playing around",
    messages: [
      { from: "them" as const, text: "Hey new number. It's me",                                     time: "Aug 30 · 6:30 PM" },
      { from: "me"   as const, text: "Oh ok got it. What happened to the other one",                 time: "Aug 30 · 6:35 PM" },
      { from: "them" as const, text: "Had to ditch it. Don't ask",                                  time: "Aug 30 · 6:36 PM" },
      { from: "me"   as const, text: "Got it. Saved",                                               time: "Aug 30 · 6:38 PM" },
      { from: "them" as const, text: "Don't save it. Just remember it",                             time: "Aug 30 · 6:39 PM" },
      { from: "me"   as const, text: "Fine fine",                                                   time: "Aug 30 · 6:40 PM" },
      { from: "them" as const, text: "Are we still good for Friday",                                time: "Aug 30 · 6:45 PM" },
      { from: "me"   as const, text: "Yeah but be smart about it this time",                        time: "Aug 30 · 6:50 PM" },
      { from: "them" as const, text: "Clear everything. I'm not playing around",                    time: "Aug 30 · 7:04 PM" },
    ],
  },
  {
    id: 7,
    name: "D",
    number: "Unknown",
    initial: "D",
    avatarColor: "bg-emerald-500/20 text-emerald-400",
    recoveredAt: "Sep 9, 2025",
    preview: "This stays between us. You know what happens if it doesn't",
    messages: [
      { from: "them" as const, text: "You talk to her yet?",                                         time: "Sep 9 · 11:15 AM" },
      { from: "me"   as const, text: "No not yet",                                                   time: "Sep 9 · 11:20 AM" },
      { from: "them" as const, text: "You need to. She's getting suspicious",                        time: "Sep 9 · 11:22 AM" },
      { from: "me"   as const, text: "I'll handle it",                                               time: "Sep 9 · 11:30 AM" },
      { from: "them" as const, text: "Handle it today not tomorrow",                                 time: "Sep 9 · 11:32 AM" },
      { from: "me"   as const, text: "Relax I said I got it",                                        time: "Sep 9 · 11:40 AM" },
      { from: "them" as const, text: "I just need to know we're on the same page",                   time: "Sep 9 · 11:45 AM" },
      { from: "me"   as const, text: "We are. Stop worrying",                                        time: "Sep 9 · 11:47 AM" },
      { from: "them" as const, text: "This stays between us. You know what happens if it doesn't",   time: "Sep 9 · 11:52 AM" },
    ],
  },
  {
    id: 8,
    name: "Ricky",
    number: "Unknown",
    initial: "R",
    avatarColor: "bg-indigo-500/20 text-indigo-400",
    recoveredAt: "Sep 22, 2025",
    preview: "Nobody can know about the money. Not even her",
    messages: [
      { from: "me"   as const, text: "Did it go through?",                                           time: "Sep 22 · 3:00 PM" },
      { from: "them" as const, text: "Not yet. By end of day",                                       time: "Sep 22 · 3:15 PM" },
      { from: "me"   as const, text: "It needs to clear before tomorrow",                            time: "Sep 22 · 3:18 PM" },
      { from: "them" as const, text: "It will. Calm down",                                           time: "Sep 22 · 3:20 PM" },
      { from: "me"   as const, text: "Don't tell me to calm down. You said yesterday",               time: "Sep 22 · 3:22 PM" },
      { from: "them" as const, text: "It got held up. One more day",                                 time: "Sep 22 · 3:25 PM" },
      { from: "me"   as const, text: "Fine but this is the last time",                               time: "Sep 22 · 3:30 PM" },
      { from: "them" as const, text: "Yeah yeah I hear you",                                         time: "Sep 22 · 3:32 PM" },
      { from: "them" as const, text: "Nobody can know about the money. Not even her",                time: "Sep 22 · 3:35 PM" },
    ],
  },
];

const threads: Record<string, { from: "me" | "them"; text: string; time: string }[]> = {
  Matt: [
    { from: "them", text: "You disappeared again…",                                                                                              time: "Apr 14 · 9:02 PM"  },
    { from: "them", text: "I know you're probably busy, but every time it happens I can't help thinking something went wrong. I kept checking my phone all evening hoping your name would pop up.", time: "Apr 14 · 9:03 PM" },
    { from: "me",   text: "I'm sorry. I really am.",                                                                                             time: "Apr 14 · 9:18 PM"  },
    { from: "me",   text: "He got home much earlier than usual and wanted us to have dinner together. Then we watched a movie, and every time my phone lit up I felt like he was looking at it.", time: "Apr 14 · 9:19 PM" },
    { from: "me",   text: "I couldn't risk opening our chat.",                                                                                   time: "Apr 14 · 9:20 PM"  },
    { from: "them", text: "I figured it was something like that. I wasn't angry. Just… worried.",                                                time: "Apr 14 · 9:22 PM"  },
    { from: "them", text: "Sometimes I forget that your life doesn't pause just because I miss you.",                                            time: "Apr 14 · 9:22 PM"  },
    { from: "me",   text: "That's the hardest part.",                                                                                            time: "Apr 14 · 9:25 PM"  },
    { from: "me",   text: "When I'm with you—even if it's just through messages—it feels like I can breathe. Then I go back to reality and I'm reminded that none of this is simple.", time: "Apr 14 · 9:26 PM" },
    { from: "me",   text: "Sometimes I wish I had met you years ago. Before all of this. Before I made promises I wasn't emotionally ready to keep.", time: "Apr 14 · 9:27 PM" },
    { from: "them", text: "I've thought about that too. I keep replaying different versions of life in my head. One where we met first. One where neither of us had so much to lose.", time: "Apr 14 · 9:30 PM" },
    { from: "them", text: "But wishing doesn't change anything.",                                                                                time: "Apr 14 · 9:31 PM"  },
    { from: "me",   text: "No… it doesn't.",                                                                                                     time: "Apr 14 · 9:33 PM"  },
    { from: "me",   text: "And honestly that's what hurts the most. Because no matter how much I care about you, every morning I wake up and have to pretend none of this exists.", time: "Apr 14 · 9:34 PM" },
    { from: "me",   text: "I have to smile. Have conversations. Live like everything is normal. It's exhausting.",                               time: "Apr 14 · 9:35 PM"  },
    { from: "them", text: "You don't have to pretend with me.",                                                                                  time: "Apr 14 · 9:37 PM"  },
    { from: "them", text: "You can tell me when you're scared. When you're confused. When you hate this situation. You don't always have to be strong.", time: "Apr 14 · 9:38 PM" },
    { from: "me",   text: "I'm scared all the time.",                                                                                            time: "Apr 14 · 9:41 PM"  },
    { from: "me",   text: "Scared someone will notice I've changed. Scared I'll accidentally leave my phone unlocked. Scared you'll get tired of waiting.", time: "Apr 14 · 9:42 PM" },
    { from: "me",   text: "Scared one day you'll realize I'm asking you to love someone who can never fully belong to you.",                     time: "Apr 14 · 9:43 PM"  },
    { from: "them", text: "Do you really think that's how I see you?",                                                                          time: "Apr 14 · 9:45 PM"  },
    { from: "me",   text: "Sometimes… I know it's unfair. You've never made me feel guilty. If anything, you've been more patient than I deserve.", time: "Apr 14 · 9:48 PM" },
    { from: "them", text: "I'm patient because I care about you.",                                                                               time: "Apr 14 · 9:50 PM"  },
    { from: "them", text: "But I'd be lying if I said this doesn't hurt. There are moments I want to call you without thinking. Take you out somewhere public. Celebrate your birthday properly. Be there when you've had a bad day.", time: "Apr 14 · 9:51 PM" },
    { from: "them", text: "Then reality reminds me that I can't. I'm the person who has to wait until it's \"safe\" to hear from you.",          time: "Apr 14 · 9:52 PM"  },
    { from: "me",   text: "Reading that breaks my heart…",                                                                                       time: "Apr 14 · 9:55 PM"  },
    { from: "me",   text: "Because you're right. You've accepted a relationship where everything has to happen in secret. You never asked for that.", time: "Apr 14 · 9:56 PM" },
    { from: "them", text: "I didn't. But I chose to stay. There's a difference.",                                                                time: "Apr 14 · 9:58 PM"  },
    { from: "me",   text: "Why? Seriously… why haven't you walked away? Most people would've.",                                                  time: "Apr 14 · 10:01 PM" },
    { from: "them", text: "Because every time I tell myself I'm done… I remember our conversations. The way you laugh. The way you understand me without me explaining everything.", time: "Apr 14 · 10:04 PM" },
    { from: "them", text: "You became important to me before I realized how complicated this was.",                                               time: "Apr 14 · 10:05 PM" },
    { from: "me",   text: "You're making this harder… 😭",                                                                                       time: "Apr 14 · 10:07 PM" },
    { from: "them", text: "I'm just telling the truth.",                                                                                         time: "Apr 14 · 10:08 PM" },
    { from: "me",   text: "Can I tell you something?",                                                                                           time: "Apr 14 · 10:10 PM" },
    { from: "them", text: "Always.",                                                                                                             time: "Apr 14 · 10:10 PM" },
    { from: "me",   text: "Sometimes I feel incredibly selfish. I care about you deeply, but I also know I'm asking you to settle for stolen conversations, cancelled plans, and \"I'll text you later.\"", time: "Apr 14 · 10:12 PM" },
    { from: "me",   text: "That's not fair. You deserve someone who can hold your hand in public without looking over her shoulder. Someone who doesn't have to delete messages before going to sleep.", time: "Apr 14 · 10:13 PM" },
    { from: "them", text: "Maybe. But you deserve to be honest with yourself too.",                                                              time: "Apr 14 · 10:15 PM" },
    { from: "them", text: "If you're unhappy, that's something only you can figure out. I don't want to become the reason you make a decision you'll regret.", time: "Apr 14 · 10:16 PM" },
    { from: "me",   text: "That's one of the reasons I trust you. You've never pressured me. Not once. You never asked me to leave. You never gave me an ultimatum. You just… listened.", time: "Apr 14 · 10:19 PM" },
    { from: "them", text: "Because your life isn't a decision I get to make. Only you can decide what you want your future to look like.",        time: "Apr 14 · 10:21 PM" },
    { from: "me",   text: "I wish life was as simple as movies make it seem. People think love answers every question. It doesn't. Sometimes it creates even more.", time: "Apr 14 · 10:24 PM" },
    { from: "them", text: "That's probably the truest thing you've ever said.",                                                                  time: "Apr 14 · 10:25 PM" },
    { from: "me",   text: "Promise me something.",                                                                                               time: "Apr 14 · 10:27 PM" },
    { from: "them", text: "What is it?",                                                                                                         time: "Apr 14 · 10:27 PM" },
    { from: "me",   text: "If this situation ever starts changing who you are… if it starts making you bitter or unhappy… please tell me. Don't stay because you feel responsible for me.", time: "Apr 14 · 10:29 PM" },
    { from: "them", text: "I promise. But you promise me something too.",                                                                        time: "Apr 14 · 10:30 PM" },
    { from: "me",   text: "Okay.",                                                                                                               time: "Apr 14 · 10:30 PM" },
    { from: "them", text: "Whatever happens… don't lose yourself trying to keep everyone else happy. You matter too.",                           time: "Apr 14 · 10:31 PM" },
    { from: "me",   text: "…",                                                                                                                   time: "Apr 14 · 10:33 PM" },
    { from: "me",   text: "Thank you. I don't hear that enough.",                                                                                time: "Apr 14 · 10:33 PM" },
    { from: "them", text: "Get some sleep. Tomorrow is another long day.",                                                                       time: "Apr 14 · 10:35 PM" },
    { from: "me",   text: "I'll try. Goodnight… and thank you for being patient with me, even when I don't make it easy. ❤️",                   time: "Apr 14 · 10:36 PM" },
  ],
  Craig: [
    { from: "them", text: "You ignored my message for almost 5 hours 😒",                                             time: "May 2 · 8:14 AM"  },
    { from: "me",   text: "Excuse me?? 😭 I was at work. Unlike some people, I actually have responsibilities.",       time: "May 2 · 8:16 AM"  },
    { from: "them", text: "Wow… Starting with violence already. Good morning to you too 😂",                          time: "May 2 · 8:17 AM"  },
    { from: "me",   text: "Good morning 😂 How's your day been?",                                                     time: "May 2 · 8:18 AM"  },
    { from: "them", text: "Honestly? Busy. One meeting after another. By lunchtime I was already mentally checked out.", time: "May 2 · 8:20 AM" },
    { from: "me",   text: "Same. I spent almost 30 minutes trying to explain something that could've been understood in 5 😭 I swear people don't listen anymore.", time: "May 2 · 8:22 AM" },
    { from: "them", text: "😂😂 That's literally adult life. Repeating yourself until everyone finally gets it.",       time: "May 2 · 8:23 AM"  },
    { from: "me",   text: "Exactly. Then everyone acts like it was their idea.",                                       time: "May 2 · 8:24 AM"  },
    { from: "them", text: "You sound traumatized.",                                                                    time: "May 2 · 8:25 AM"  },
    { from: "me",   text: "I am 😭 Anyway… did you finally fix your sleep schedule?",                                 time: "May 2 · 8:26 AM"  },
    { from: "them", text: "… Next question.",                                                                          time: "May 2 · 8:27 AM"  },
    { from: "me",   text: "I knew it 😂 What time did you sleep?",                                                    time: "May 2 · 8:27 AM"  },
    { from: "them", text: "Around 3:30.",                                                                              time: "May 2 · 8:28 AM"  },
    { from: "me",   text: "You're actually impossible. Didn't you tell me last week you wanted to start sleeping before midnight?", time: "May 2 · 8:29 AM" },
    { from: "them", text: "That version of me had dreams. Current me has deadlines.",                                  time: "May 2 · 8:30 AM"  },
    { from: "me",   text: "😭😭 Fair enough.",                                                                          time: "May 2 · 8:31 AM"  },
    { from: "them", text: "What about you? Still waking up at 6 for no reason?",                                      time: "May 2 · 8:32 AM"  },
    { from: "me",   text: "My body doesn't even give me a choice anymore. Even on weekends.",                          time: "May 2 · 8:33 AM"  },
    { from: "them", text: "That's a superpower. If I don't set three alarms, I might accidentally wake up next Tuesday.", time: "May 2 · 8:34 AM" },
    { from: "me",   text: "😂😂😂 You're so dramatic.",                                                                 time: "May 2 · 8:35 AM"  },
    { from: "them", text: "You know what's been on my mind lately?",                                                   time: "May 2 · 9:10 AM"  },
    { from: "me",   text: "Hmm?",                                                                                      time: "May 2 · 9:11 AM"  },
    { from: "them", text: "Life moves so fast. Feels like yesterday we were complaining about school… Now everyone's talking about careers, marriage, investments and buying houses.", time: "May 2 · 9:12 AM" },
    { from: "me",   text: "I think about that all the time. Sometimes I still feel 19 in my head. Then I remember I'm expected to know what I'm doing with my life 😭", time: "May 2 · 9:14 AM" },
    { from: "them", text: "Exactly. Nobody prepares you for that transition. You just wake up one day and realize you're the adult now.",         time: "May 2 · 9:15 AM"  },
    { from: "me",   text: "And somehow we're supposed to have everything figured out. Career. Money. Relationships. Mental health. Family. It's a lot.", time: "May 2 · 9:17 AM" },
    { from: "them", text: "Way too much. I think everyone is just pretending they're confident.",                      time: "May 2 · 9:18 AM"  },
    { from: "me",   text: "100%. The people who look like they have it all together are probably confused too. They're just better at hiding it.", time: "May 2 · 9:19 AM" },
    { from: "them", text: "Speaking of relationships… you still talking to that guy? 👀",                              time: "May 2 · 9:21 AM"  },
    { from: "me",   text: "😂😂 We're… talking. Nothing serious.",                                                      time: "May 2 · 9:22 AM"  },
    { from: "them", text: "That doesn't sound convincing.",                                                            time: "May 2 · 9:23 AM"  },
    { from: "me",   text: "Because I'm not convinced 😭 He's nice. But I'm still trying to figure out if we're actually compatible or if we're just enjoying the attention.", time: "May 2 · 9:25 AM" },
    { from: "them", text: "That's actually smart. Most people rush into things because they're lonely.",                time: "May 2 · 9:26 AM"  },
    { from: "me",   text: "Exactly. I'd rather be single than force something that's not right.",                      time: "May 2 · 9:27 AM"  },
    { from: "them", text: "Proud of you. Growth.",                                                                     time: "May 2 · 9:28 AM"  },
    { from: "me",   text: "Look at you being supportive 😂 Who are you and what have you done with my annoying friend?", time: "May 2 · 9:29 AM" },
    { from: "them", text: "He's on vacation. He'll be back tomorrow.",                                                 time: "May 2 · 9:30 AM"  },
    { from: "me",   text: "😭😭 I knew it wouldn't last.",                                                              time: "May 2 · 9:31 AM"  },
    { from: "them", text: "By the way… thanks for always checking in on me. Even when I disappear for a few days.",    time: "May 2 · 10:45 AM" },
    { from: "me",   text: "Of course. Friends do that. Besides… you have a bad habit of going quiet when you're stressed.", time: "May 2 · 10:47 AM" },
    { from: "them", text: "You noticed?",                                                                              time: "May 2 · 10:48 AM" },
    { from: "me",   text: "I've known you long enough. When you stop sending random memes, something's wrong.",         time: "May 2 · 10:49 AM" },
    { from: "them", text: "😂😂 That's actually true.",                                                                 time: "May 2 · 10:50 AM" },
    { from: "me",   text: "Just remember… you don't always have to deal with everything alone. Even if I can't fix it… I can listen.", time: "May 2 · 10:51 AM" },
    { from: "them", text: "I appreciate that. Seriously.",                                                             time: "May 2 · 10:52 AM" },
    { from: "me",   text: "Now enough with the emotional stuff. Did you ever return the hoodie you borrowed from your cousin? 😂", time: "May 2 · 10:53 AM" },
    { from: "them", text: "… Let's change the topic.",                                                                 time: "May 2 · 10:54 AM" },
    { from: "me",   text: "😭😭😭 I knew you still had it. You're a thief.",                                             time: "May 2 · 10:54 AM" },
    { from: "them", text: "I prefer the term \"long-term borrower.\"",                                                 time: "May 2 · 10:55 AM" },
    { from: "me",   text: "Goodnight, criminal 😂🌙",                                                                   time: "May 2 · 11:58 PM" },
    { from: "them", text: "Goodnight 😂🤝",                                                                             time: "May 2 · 11:59 PM" },
  ],
  Ashley: [
    { from: "them", text: "You up? 👀",                                                                         time: "May 28 · 11:02 PM" },
    { from: "me",   text: "Yeah 😭 What's good?",                                                               time: "May 28 · 11:04 PM" },
    { from: "them", text: "Lemme ask you something…",                                                           time: "May 28 · 11:05 PM" },
    { from: "me",   text: "Here we go 💀",                                                                       time: "May 28 · 11:05 PM" },
    { from: "them", text: "What's one secret you've never told anyone?",                                        time: "May 28 · 11:06 PM" },
    { from: "me",   text: "Bro?? 😭😭",                                                                          time: "May 28 · 11:06 PM" },
    { from: "them", text: "Don't dodge the question 😂",                                                        time: "May 28 · 11:07 PM" },
    { from: "me",   text: "Hmm… I still think about someone I told everyone I was over.",                       time: "May 28 · 11:09 PM" },
    { from: "them", text: "Damn…",                                                                              time: "May 28 · 11:10 PM" },
    { from: "me",   text: "Your turn.",                                                                          time: "May 28 · 11:10 PM" },
    { from: "them", text: "I act like everything's fine but I'm stressed almost every day.",                    time: "May 28 · 11:11 PM" },
    { from: "me",   text: "I kinda knew that tbh.",                                                             time: "May 28 · 11:12 PM" },
    { from: "them", text: "Wait… how?",                                                                         time: "May 28 · 11:12 PM" },
    { from: "me",   text: "Whenever you're overwhelmed you start making jokes 😭",                              time: "May 28 · 11:13 PM" },
    { from: "them", text: "That's actually scary 💀",                                                           time: "May 28 · 11:13 PM" },
    { from: "me",   text: "😂😂",                                                                                time: "May 28 · 11:14 PM" },
    { from: "them", text: "So what happened with that person?",                                                 time: "May 28 · 11:15 PM" },
    { from: "me",   text: "Nothing crazy. No cheating. No huge fight. We just met at the wrong time.",          time: "May 28 · 11:17 PM" },
    { from: "them", text: "Sometimes timing ruins something that could've been perfect.",                       time: "May 28 · 11:18 PM" },
    { from: "me",   text: "Exactly.",                                                                            time: "May 28 · 11:18 PM" },
    { from: "them", text: "You talking to anyone now?",                                                         time: "May 28 · 11:19 PM" },
    { from: "me",   text: "Yeah…",                                                                              time: "May 28 · 11:19 PM" },
    { from: "them", text: "Anddd? 👀",                                                                          time: "May 28 · 11:20 PM" },
    { from: "me",   text: "I can't tell if I actually like them… or if I just like the attention 😭",           time: "May 28 · 11:21 PM" },
    { from: "them", text: "That's probably the most honest thing you've said all year 😂",                      time: "May 28 · 11:22 PM" },
    { from: "me",   text: "Don't judge me 😭",                                                                  time: "May 28 · 11:22 PM" },
    { from: "them", text: "Never 😂",                                                                           time: "May 28 · 11:23 PM" },
    { from: "me",   text: "What about you?",                                                                    time: "May 28 · 11:23 PM" },
    { from: "them", text: "I stopped chasing people. If they wanna stay, they'll stay.",                        time: "May 28 · 11:24 PM" },
    { from: "me",   text: "Has it brought you peace?",                                                          time: "May 28 · 11:25 PM" },
    { from: "them", text: "Some days peace. Some days loneliness.",                                             time: "May 28 · 11:25 PM" },
    { from: "me",   text: "Felt that.",                                                                          time: "May 28 · 11:26 PM" },
    { from: "them", text: "You ever feel like everyone else has life figured out except us?",                   time: "May 28 · 11:27 PM" },
    { from: "me",   text: "Every single day. Social media doesn't help either 😭",                              time: "May 28 · 11:27 PM" },
    { from: "them", text: "Fr. People posting vacations… I'm celebrating that all my bills are paid 😂",        time: "May 28 · 11:28 PM" },
    { from: "me",   text: "Adulting is actually a scam 😭",                                                     time: "May 28 · 11:29 PM" },
    { from: "them", text: "Biggest scam ever.",                                                                  time: "May 28 · 11:29 PM" },
    { from: "me",   text: "😂😂😂",                                                                               time: "May 28 · 11:30 PM" },
    { from: "them", text: "Promise me something though.",                                                       time: "May 28 · 11:31 PM" },
    { from: "me",   text: "Hmm?",                                                                               time: "May 28 · 11:31 PM" },
    { from: "them", text: "If life ever gets too heavy… don't disappear.",                                      time: "May 28 · 11:32 PM" },
    { from: "me",   text: "I won't.",                                                                            time: "May 28 · 11:32 PM" },
    { from: "them", text: "Just text me. Even if it's just \"I'm not okay.\"",                                  time: "May 28 · 11:33 PM" },
    { from: "me",   text: "Deal ❤️",                                                                             time: "May 28 · 11:33 PM" },
    { from: "them", text: "And if you're the one disappearing?",                                                time: "May 28 · 11:34 PM" },
    { from: "me",   text: "Then?",                                                                               time: "May 28 · 11:34 PM" },
    { from: "them", text: "I'm pulling up.",                                                                     time: "May 28 · 11:35 PM" },
    { from: "me",   text: "To check on me?",                                                                    time: "May 28 · 11:35 PM" },
    { from: "them", text: "…With food. Then I'll check on you 😂",                                              time: "May 28 · 11:36 PM" },
    { from: "me",   text: "You're actually useless 😭",                                                         time: "May 28 · 11:36 PM" },
    { from: "them", text: "But I'm your useless friend 🤝😂",                                                   time: "May 28 · 11:37 PM" },
    { from: "me",   text: "Yeah… Life's a little easier knowing you're around ❤️",                              time: "May 28 · 11:38 PM" },
  ],
  Justin: [
    { from: "me",   text: "Yo what's going on tonight",                         time: "Jun 15 · 12:30 PM" },
    { from: "them", text: "Not sure yet probably staying in",                   time: "Jun 15 · 12:45 PM" },
    { from: "me",   text: "Ah ok",                                              time: "Jun 15 · 12:50 PM" },
    { from: "them", text: "Broooo",                                             time: "Jun 15 · 1:30 PM"  },
    { from: "me",   text: "What lol",                                           time: "Jun 15 · 1:45 PM"  },
    { from: "them", text: "Did you see that comeback in the 4th quarter?",      time: "Jun 15 · 1:50 PM"  },
    { from: "me",   text: "BRO YES I was going crazy",                          time: "Jun 15 · 1:52 PM"  },
    { from: "them", text: "That last shot was insane",                          time: "Jun 15 · 1:54 PM"  },
    { from: "me",   text: "I literally jumped off my couch 😂",                 time: "Jun 15 · 1:56 PM"  },
    { from: "them", text: "Same lmao my neighbors probably heard me",           time: "Jun 15 · 1:58 PM"  },
    { from: "me",   text: "Worth it though fr",                                 time: "Jun 15 · 2:00 PM"  },
    { from: "them", text: "Yo did you see the game last night btw?",            time: "Jun 15 · 2:05 PM"  },
    { from: "me",   text: "Missed the first half but caught the rest",          time: "Jun 15 · 2:10 PM"  },
    { from: "them", text: "You missed the wild first half what",                time: "Jun 15 · 2:11 PM"  },
    { from: "me",   text: "Was at dinner. Fill me in!",                         time: "Jun 15 · 2:12 PM"  },
    { from: "them", text: "Ok so basically they were down by 20...",            time: "Jun 15 · 2:15 PM"  },
    { from: "me",   text: "TWENTY?? And they still came back??",                time: "Jun 15 · 2:16 PM"  },
    { from: "them", text: "That's what I'm saying bro it was historic",         time: "Jun 15 · 2:17 PM"  },
  ],
  "John Smith": [
    { from: "them", text: "Hey can you talk?",                                  time: "Jul 7 · 1:00 PM"  },
    { from: "me",   text: "Kinda busy right now",                               time: "Jul 7 · 1:20 PM"  },
    { from: "them", text: "Ok no worries",                                      time: "Jul 7 · 1:22 PM"  },
    { from: "me",   text: "What did you need?",                                 time: "Jul 7 · 2:00 PM"  },
    { from: "them", text: "Just wanted to catch up",                            time: "Jul 7 · 2:30 PM"  },
    { from: "me",   text: "Been a minute! How's everything going",              time: "Jul 7 · 2:45 PM"  },
    { from: "them", text: "Good actually. Moved to a new place",                time: "Jul 7 · 2:50 PM"  },
    { from: "me",   text: "No way! Where?",                                     time: "Jul 7 · 2:52 PM"  },
    { from: "them", text: "Closer to downtown. It's nice",                      time: "Jul 7 · 2:55 PM"  },
    { from: "me",   text: "Love that for you! We should hang soon",             time: "Jul 7 · 3:00 PM"  },
    { from: "them", text: "For sure. Can you call me when you're done?",        time: "Jul 7 · 3:10 PM"  },
    { from: "me",   text: "Sure give me like 30 mins",                          time: "Jul 7 · 3:20 PM"  },
    { from: "me",   text: "Ok sounds good",                                     time: "Jul 7 · 3:22 PM"  },
    { from: "them", text: "I'll call you later when I'm done with this meeting", time: "Jul 7 · 3:45 PM" },
    { from: "me",   text: "No rush 👍",                                         time: "Jul 7 · 3:47 PM"  },
    { from: "them", text: "Just finished! Calling now",                         time: "Jul 7 · 5:10 PM"  },
  ],
  Sophia: [
    { from: "me",   text: "Did you see the thing I tagged you in?",             time: "Jul 22 · 11:00 AM" },
    { from: "them", text: "Not yet let me check",                               time: "Jul 22 · 11:10 AM" },
    { from: "me",   text: "Lol it's so funny",                                  time: "Jul 22 · 11:15 AM" },
    { from: "them", text: "LMAOO okay yeah that's hilarious",                   time: "Jul 22 · 11:30 AM" },
    { from: "me",   text: "Right?? 😂",                                         time: "Jul 22 · 11:32 AM" },
    { from: "them", text: "The way I screamed 😭",                              time: "Jul 22 · 11:35 AM" },
    { from: "me",   text: "Same I was dying at work",                           time: "Jul 22 · 11:38 AM" },
    { from: "them", text: "Omg you watched it at work??",                       time: "Jul 22 · 11:40 AM" },
    { from: "me",   text: "Had my screen tilted lmao",                          time: "Jul 22 · 11:41 AM" },
    { from: "them", text: "You're so bad 😂",                                   time: "Jul 22 · 11:42 AM" },
    { from: "them", text: "Did you see that video I sent btw?",                 time: "Jul 22 · 12:30 PM" },
    { from: "me",   text: "Yes omg 😂😂",                                        time: "Jul 22 · 12:40 PM" },
    { from: "them", text: "I knew you'd love it lol",                           time: "Jul 22 · 12:50 PM" },
    { from: "me",   text: "Send me more like that 💀",                          time: "Jul 22 · 12:52 PM" },
    { from: "them", text: "I have a whole folder saved just for you",           time: "Jul 22 · 12:54 PM" },
    { from: "me",   text: "You're my favorite person I swear 😂",              time: "Jul 22 · 12:56 PM" },
    { from: "them", text: "Haha yeah that was so funny 😂",                     time: "Jul 22 · 12:58 PM" },
  ],
  Ryan: [
    { from: "them", text: "Hey what time are you off today?",                   time: "Aug 5 · 1:00 PM"  },
    { from: "me",   text: "Around 5 why",                                       time: "Aug 5 · 1:15 PM"  },
    { from: "them", text: "Wanna grab drinks after?",                           time: "Aug 5 · 1:17 PM"  },
    { from: "me",   text: "Who's coming?",                                      time: "Aug 5 · 1:20 PM"  },
    { from: "them", text: "Just us tbh",                                        time: "Aug 5 · 1:21 PM"  },
    { from: "me",   text: "Lol ok sure",                                        time: "Aug 5 · 1:25 PM"  },
    { from: "them", text: "The rooftop bar on Elm?",                            time: "Aug 5 · 1:27 PM"  },
    { from: "me",   text: "Perfect. See you at 5:30",                          time: "Aug 5 · 1:29 PM"  },
    { from: "them", text: "I'm already here lol. No rush",                      time: "Aug 5 · 5:28 PM"  },
    { from: "me",   text: "Omw! 5 mins",                                        time: "Aug 5 · 5:32 PM"  },
    { from: "them", text: "Ordered you a drink already",                        time: "Aug 5 · 5:33 PM"  },
    { from: "me",   text: "You didn't have to 😊",                              time: "Aug 5 · 5:34 PM"  },
    { from: "them", text: "You deserve it",                                     time: "Aug 5 · 5:35 PM"  },
    { from: "me",   text: "Tonight was really fun btw",                         time: "Aug 5 · 10:45 PM" },
    { from: "them", text: "We should do it again Friday?",                      time: "Aug 5 · 10:50 PM" },
    { from: "me",   text: "I'm down 👍",                                         time: "Aug 5 · 10:52 PM" },
    { from: "them", text: "Set. Can't wait",                                    time: "Aug 5 · 10:54 PM" },
  ],
  Tyler: [
    { from: "me",   text: "Did you end up going out last night?",               time: "Aug 19 · 10:05 AM" },
    { from: "them", text: "Nah stayed in. You?",                                time: "Aug 19 · 10:20 AM" },
    { from: "me",   text: "Same honestly just watched stuff",                   time: "Aug 19 · 10:25 AM" },
    { from: "them", text: "Boring summer lmao",                                 time: "Aug 19 · 10:30 AM" },
    { from: "me",   text: "Right? We need to do something",                     time: "Aug 19 · 10:35 AM" },
    { from: "them", text: "There's that festival this weekend",                 time: "Aug 19 · 10:38 AM" },
    { from: "me",   text: "Ooh what one?",                                      time: "Aug 19 · 10:40 AM" },
    { from: "them", text: "That outdoor music thing at the park",               time: "Aug 19 · 10:42 AM" },
    { from: "me",   text: "Yes!! Let's go. Who else?",                          time: "Aug 19 · 10:44 AM" },
    { from: "them", text: "Maybe just us? More fun that way tbh",               time: "Aug 19 · 10:46 AM" },
    { from: "me",   text: "Haha ok fine 😄",                                    time: "Aug 19 · 10:48 AM" },
    { from: "them", text: "I'll get the tickets now before they sell out",      time: "Aug 19 · 10:50 AM" },
    { from: "me",   text: "I'll send you my half",                              time: "Aug 19 · 10:52 AM" },
    { from: "them", text: "Don't worry about it",                               time: "Aug 19 · 10:54 AM" },
    { from: "me",   text: "You sure?? 😮",                                      time: "Aug 19 · 10:55 AM" },
    { from: "them", text: "Yeah it's cool. You can get next time",              time: "Aug 19 · 10:57 AM" },
    { from: "me",   text: "Deal! This is going to be so fun 🎶",               time: "Aug 19 · 10:59 AM" },
  ],
  Jake: [
    { from: "them", text: "Hey you free this week at all?",                     time: "Sep 3 · 9:00 AM"  },
    { from: "me",   text: "Wednesday maybe why?",                               time: "Sep 3 · 9:10 AM"  },
    { from: "them", text: "Wanna check out that new place that opened",         time: "Sep 3 · 9:12 AM"  },
    { from: "me",   text: "The one on 4th Ave?",                                time: "Sep 3 · 9:15 AM"  },
    { from: "them", text: "Yeah exactly. Heard it's really good",               time: "Sep 3 · 9:17 AM"  },
    { from: "me",   text: "I'm in. 7pm?",                                       time: "Sep 3 · 9:20 AM"  },
    { from: "them", text: "Works for me",                                       time: "Sep 3 · 9:22 AM"  },
    { from: "me",   text: "Cool. Should I make a reservation?",                 time: "Sep 3 · 9:25 AM"  },
    { from: "them", text: "Yeah probably good idea it's been busy",             time: "Sep 3 · 9:27 AM"  },
    { from: "me",   text: "Done. Table for 2 at 7",                             time: "Sep 3 · 9:35 AM"  },
    { from: "them", text: "Perfect. Thanks for handling that 😊",               time: "Sep 3 · 9:37 AM"  },
    { from: "me",   text: "Of course. See you Wednesday!",                      time: "Sep 3 · 9:40 AM"  },
    { from: "them", text: "Can't wait 😏",                                      time: "Sep 3 · 9:42 AM"  },
    { from: "me",   text: "Omg tonight was amazing btw",                        time: "Sep 3 · 10:15 PM" },
    { from: "them", text: "Right?? We need to do that more often",              time: "Sep 3 · 10:20 PM" },
    { from: "me",   text: "Agreed 💯",                                          time: "Sep 3 · 10:22 PM" },
  ],
  "+1 (332) 465-2650": [
    { from: "them", text: "Hey it's me",                                         time: "Sep 11 · 6:00 PM" },
    { from: "me",   text: "Oh hey. What's up",                                   time: "Sep 11 · 6:05 PM" },
    { from: "them", text: "You got a minute?",                                   time: "Sep 11 · 6:07 PM" },
    { from: "me",   text: "Yeah go ahead",                                       time: "Sep 11 · 6:08 PM" },
    { from: "them", text: "Need a favor. Nothing crazy",                         time: "Sep 11 · 6:10 PM" },
    { from: "me",   text: "What kind of favor",                                  time: "Sep 11 · 6:12 PM" },
    { from: "them", text: "Just need you to cover for me Saturday",              time: "Sep 11 · 6:13 PM" },
    { from: "me",   text: "Cover how",                                           time: "Sep 11 · 6:15 PM" },
    { from: "them", text: "If anyone asks you were with me all afternoon",       time: "Sep 11 · 6:16 PM" },
    { from: "me",   text: "...ok fine",                                          time: "Sep 11 · 6:20 PM" },
    { from: "them", text: "Thanks. I owe you",                                   time: "Sep 11 · 6:21 PM" },
    { from: "me",   text: "You better",                                          time: "Sep 11 · 6:22 PM" },
  ],
  "+1 (321) 505-9005": [
    { from: "them", text: "New phone. Same person",                              time: "Sep 25 · 3:30 PM" },
    { from: "me",   text: "Figured. What happened",                              time: "Sep 25 · 3:35 PM" },
    { from: "them", text: "Long story. Don't worry about it",                    time: "Sep 25 · 3:37 PM" },
    { from: "me",   text: "You always say that 🙄",                              time: "Sep 25 · 3:40 PM" },
    { from: "them", text: "And I'm always fine so stop worrying lol",            time: "Sep 25 · 3:42 PM" },
    { from: "me",   text: "Fair enough. You good though seriously?",             time: "Sep 25 · 3:44 PM" },
    { from: "them", text: "Yeah I'm good. Just needed a clean start",            time: "Sep 25 · 3:46 PM" },
    { from: "me",   text: "Ok. Saved the new number",                            time: "Sep 25 · 3:48 PM" },
    { from: "them", text: "Good. We still on for next week?",                    time: "Sep 25 · 3:50 PM" },
    { from: "me",   text: "Yeah of course",                                      time: "Sep 25 · 3:52 PM" },
    { from: "them", text: "Cool. Keep this one between us",                      time: "Sep 25 · 3:55 PM" },
    { from: "me",   text: "Obviously 👀",                                        time: "Sep 25 · 3:57 PM" },
  ],
};

const chats = [
  { id: 1,  name: "Matt",              initial: "M",  avatarColor: "bg-blue-500/20 text-blue-400",     message: "Dixie, I can't stop thinking about you... last night meant everything 💕", time: "Apr 15"  , badge: 3 },
  { id: 2,  name: "Craig",             initial: "C",  avatarColor: "bg-purple-500/20 text-purple-400", message: "You free tonight? Wanna grab some food",                                 time: "May 2"   , badge: 1 },
  { id: 3,  name: "Ashley",            initial: "A",  avatarColor: "bg-rose-500/20 text-rose-400",     message: "Already on my calendar 😊",                                             time: "May 28"  , badge: 0 },
  { id: 4,  name: "Justin",            initial: "J",  avatarColor: "bg-cyan-500/20 text-cyan-400",     message: "That's what I'm saying bro it was historic",                            time: "Jun 15"  , badge: 0 },
  { id: 5,  name: "John Smith",        initial: "JS", avatarColor: "bg-green-500/20 text-green-400",   message: "Just finished! Calling now",                                            time: "Jul 7"   , badge: 0 },
  { id: 6,  name: "Sophia",            initial: "S",  avatarColor: "bg-pink-500/20 text-pink-400",     message: "Haha yeah that was so funny 😂",                                        time: "Jul 22"  , badge: 0 },
  { id: 7,  name: "Ryan",              initial: "R",  avatarColor: "bg-amber-500/20 text-amber-400",   message: "Set. Can't wait",                                                       time: "Aug 5"   , badge: 2 },
  { id: 8,  name: "Tyler",             initial: "T",  avatarColor: "bg-violet-500/20 text-violet-400", message: "This is going to be so fun 🎶",                                          time: "Aug 19"  , badge: 0 },
  { id: 9,  name: "Jake",              initial: "JK", avatarColor: "bg-teal-500/20 text-teal-400",     message: "We need to do that more often",                                         time: "Sep 3"   , badge: 1 },
  { id: 10, name: "+1 (332) 465-2650", initial: "?",  avatarColor: "bg-orange-500/20 text-orange-400", message: "You better",                                                            time: "Sep 11"  , badge: 0 },
  { id: 11, name: "+1 (321) 505-9005", initial: "?",  avatarColor: "bg-indigo-500/20 text-indigo-400", message: "Obviously 👀",                                                          time: "Sep 25"  , badge: 0 },
];

type View = "list" | "recovered-folder" | "recovered-thread" | "chat-thread";

function RecoveredThread({ item, onBack }: { item: typeof recoveredMessages[0]; onBack: () => void }) {
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
          <Archive className="w-2.5 h-2.5 text-red-400" />
          <span className="text-[9px] text-red-400 font-bold uppercase tracking-widest">Recovered</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mx-4 mt-3 mb-1 px-3 py-2 bg-red-500/5 border border-red-500/15 rounded-lg">
        <Archive className="w-3 h-3 text-red-400 shrink-0" />
        <p className="text-[10px] text-red-400/80">Recovered from cache · {item.recoveredAt}</p>
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
          <input className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Recovered thread — read only" readOnly />
          <Send className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </motion.div>
  );
}

function RecoveredFolder({ onBack, onOpen }: { onBack: () => void; onOpen: (item: typeof recoveredMessages[0]) => void }) {
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
          <p className="text-[9px] text-red-400/70 uppercase tracking-widest font-bold">Apr – Sep 2025</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[9px] text-red-400 font-bold uppercase tracking-widest">{recoveredMessages.length} found</span>
        </div>
      </div>

      <div className="p-4 space-y-3 pb-24">
        <div className="flex items-center gap-2 px-3 py-2 bg-red-500/5 border border-red-500/15 rounded-lg mb-1">
          <Loader2 className="w-3 h-3 animate-spin text-red-400 shrink-0" />
          <p className="text-[10px] text-red-400/80">Scanning device storage for removed conversations...</p>
        </div>

        {recoveredMessages.map((item, i) => (
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
                <span className="text-[9px] text-red-400/60 whitespace-nowrap ml-2 font-mono shrink-0">{item.recoveredAt}</span>
              </div>
              {item.name !== item.number && item.number !== "Unknown" && (
                <p className="text-[10px] text-muted-foreground font-mono mb-0.5">{item.number}</p>
              )}
              <p className="text-xs text-muted-foreground truncate italic">"{item.preview}"</p>
            </div>
            <ChevronRight className="w-4 h-4 text-red-400/40 shrink-0" />
          </motion.button>
        ))}

        {/* Loading spinner at bottom */}
        <div className="flex flex-col items-center gap-2 py-5">
          <Loader2 className="w-5 h-5 animate-spin text-red-400/50" />
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Scanning for more...</p>
        </div>
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
        <div className="min-w-0">
          <p className="font-bold text-sm truncate">{chat.name}</p>
          {chat.name.startsWith("+1") && <p className="text-[9px] text-muted-foreground font-mono">{chat.name}</p>}
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
          <Loader2 className="w-2.5 h-2.5 animate-spin text-primary" />
          <span className="text-[9px] text-primary font-bold uppercase tracking-widest">Intercepting</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mx-4 mt-3 mb-1 px-3 py-2 bg-primary/5 border border-primary/15 rounded-lg">
        <Loader2 className="w-3 h-3 animate-spin text-primary shrink-0" />
        <p className="text-[10px] text-muted-foreground">Retrieving messages from device sync...</p>
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
  const [openRecovered, setOpenRecovered] = useState<typeof recoveredMessages[0] | null>(null);
  const [showLimitedPreview, setShowLimitedPreview] = useState(false);

  return (
    <div className="pb-24">
      <AnimatePresence mode="wait">
        {view === "recovered-thread" && openRecovered ? (
          <RecoveredThread
            key="recovered-thread"
            item={openRecovered}
            onBack={() => { setView("recovered-folder"); setOpenRecovered(null); }}
          />
        ) : view === "recovered-folder" ? (
          <RecoveredFolder
            key="recovered-folder"
            onBack={() => setView("list")}
            onOpen={(item) => { setOpenRecovered(item); setView("recovered-thread"); }}
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
              onClick={() => setShowLimitedPreview(true)}
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
                  transition={{ delay: i * 0.04 }}
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
      {/* Limited Preview Modal */}
      <AnimatePresence>
        {showLimitedPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 16 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="bg-[#1a1a1f] border border-primary/20 rounded-2xl p-6 w-full max-w-sm shadow-[0_0_40px_rgba(0,0,0,0.6)] space-y-5 relative"
            >
              {/* Close X */}
              <button
                onClick={() => setShowLimitedPreview(false)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-secondary/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Limited Preview</h3>
              </div>

              {/* Body */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                To access more deleted messages, contact support for more inquiries.
              </p>

              {/* Buttons */}
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={() => { setShowLimitedPreview(false); setView("recovered-folder"); }}
                  className="w-full py-3 rounded-2xl bg-green-500/10 border border-green-500/40 text-green-400 font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-500/20 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contact Support
                </button>
                <button
                  onClick={() => { setShowLimitedPreview(false); setView("recovered-folder"); }}
                  className="w-full py-3 rounded-2xl bg-secondary/50 border border-white/5 text-foreground font-bold text-sm hover:bg-secondary/80 transition-colors"
                >
                  Not now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
