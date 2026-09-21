import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, Mail, Calendar, Activity, 
  Users, ShieldAlert, AlertOctagon, FileWarning, FileText, Home,
  FileSearch, Scan, ChevronDown
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { VpnAccessDialog } from "@/components/VpnAccessDialog";

export default function TargetProfile() {
  const [relativesOpen, setRelativesOpen] = useState(false);
  const [vpnAccessOpen, setVpnAccessOpen] = useState(false);

  const relatives = ["Adele Rhodes", "Jeff Rhodes", "Jerry Rhodes", "Lois Cole", "Amie Rhodes"];

  const reportEntries = [
    {
      title: "Relatives",
      icon: <Users className="w-5 h-5" />
    },
    {
      title: "Arrest & Criminal Records",
      icon: <ShieldAlert className="w-5 h-5" />
    },
    {
      title: "Registered Sex Offender Check",
      icon: <AlertOctagon className="w-5 h-5" />
    },
    {
      title: "Warrants & Police Records",
      icon: <FileWarning className="w-5 h-5" />
    },
    {
      title: "Marriage & Divorce Records",
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: "Eviction & Foreclosures",
      icon: <Home className="w-5 h-5" />
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 md:p-6 pb-24 space-y-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-wide">Target Profile</h1>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-destructive/10 border border-destructive/20">
              <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
              <span className="text-[10px] text-destructive uppercase tracking-widest font-bold">Active Monitor</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Identity and background overview</p>
        </div>
      </div>

      {/* Target Info */}
      <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-6 relative overflow-hidden group">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
          <div className="relative shrink-0">
            <Avatar className="w-24 h-24 border-2 border-primary/40 bg-primary/10 shadow-[0_0_20px_rgba(255,0,0,0.2)]">
              <AvatarFallback className="text-primary font-bold text-3xl tracking-widest">JR</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1 border border-primary/30 shadow-lg">
              <div className="bg-green-500/20 text-green-500 rounded-full p-1.5">
                <Scan className="w-4 h-4" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 w-full">
            <div className="space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                <User className="w-3 h-3 text-primary" /> Target Name
              </p>
              <p className="font-bold text-xl text-foreground">Jeffrey Rhodes</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-primary" /> Email Address
              </p>
              <p className="font-mono text-sm text-foreground pt-0.5">diamanjr@yahoo.com</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-primary" /> Age
              </p>
              <p className="font-mono text-sm text-foreground pt-0.5">71</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-primary" /> Born
              </p>
              <p className="font-mono text-sm text-foreground pt-0.5">October 1954</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-6 pb-2">
        <FileSearch className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold tracking-wide uppercase">Full Background Report</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent ml-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportEntries.map((entry, idx) => (
          <ReportCard
            key={entry.title}
            {...entry}
            expanded={entry.title === "Relatives" && relativesOpen}
            onClick={() => {
              if (entry.title === "Relatives") {
                setRelativesOpen((open) => !open);
              } else {
                setVpnAccessOpen(true);
              }
            }}
          >
            {entry.title === "Relatives" && relativesOpen && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4 mt-4 border-t border-primary/10">
                {relatives.map((relative) => (
                  <div
                    key={relative}
                    className="rounded-lg border border-primary/10 bg-secondary/25 px-3 py-2.5 text-sm font-medium"
                  >
                    {relative}
                  </div>
                ))}
              </div>
            )}
          </ReportCard>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setVpnAccessOpen(true)}
        className="w-full rounded-2xl border border-primary/30 bg-card/40 p-5 flex items-center justify-between gap-4 text-left hover:border-primary/60 hover:bg-primary/5 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <FileSearch className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold tracking-wide">View Full Background Report</h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">VPN access required</p>
          </div>
        </div>
      </button>

      <VpnAccessDialog open={vpnAccessOpen} onOpenChange={setVpnAccessOpen} />

    </motion.div>
  );
}

function ReportCard({
  title,
  icon,
  expanded,
  onClick,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  expanded: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}) {
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="bg-card/30 backdrop-blur-xl border border-primary/10 hover:border-primary/40 transition-all duration-300 rounded-2xl p-5 group"
    >
      <button type="button" onClick={onClick} className="w-full flex items-center justify-between gap-4 text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary/50 border border-primary/20 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/5 transition-colors">
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide">{title}</h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Background report category</p>
          </div>
        </div>
        <div className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-primary/20 bg-primary/10 text-primary">
          {title === "Relatives" ? (
            <span className="flex items-center gap-1.5">
              {expanded ? "Hide" : "View"}
              <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </span>
          ) : (
            "View"
          )}
        </div>
      </button>
      {children}
    </motion.div>
  );
}
