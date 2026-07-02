import React from "react";
import { Shield, Clock, Database, ChevronRight, Lock, KeyRound, Smartphone, AlertTriangle, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <div className="p-4 md:p-6 pb-24 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-wide">Settings</h1>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Account & configuration</p>
      </div>

      {/* Account Section */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold text-primary uppercase tracking-widest ml-1">Account</h2>
        
        <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-4">
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-primary/10">
            <Avatar className="w-12 h-12 border-2 border-primary/40 bg-primary/10">
              <AvatarFallback className="text-primary font-bold">BC</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-foreground">olegzaikov87@gmail.com</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs text-primary font-bold">Basic Plan</span>
                <span className="text-muted-foreground text-[10px]">•</span>
                <span className="text-xs text-green-500 uppercase tracking-widest font-bold">Active</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <button className="w-full flex items-center justify-between py-3 px-2 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-3">
                <KeyRound className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Change Password</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between py-3 px-2 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Two-Factor Authentication</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between py-3 px-2 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Connected Devices</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded font-bold">2</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Notifications Section */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold text-primary uppercase tracking-widest ml-1">Notifications</h2>
        
        <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-2">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/30 transition-colors">
            <div>
              <p className="text-sm font-medium">Activity Alerts</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Push notifications for all events</p>
            </div>
            <Switch defaultChecked className="data-[state=checked]:bg-primary" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/30 transition-colors">
            <div>
              <p className="text-sm font-medium text-destructive">High Priority Alerts</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">SMS for critical intercepts</p>
            </div>
            <Switch defaultChecked className="data-[state=checked]:bg-destructive" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/30 transition-colors">
            <div>
              <p className="text-sm font-medium">Weekly Reports</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Email summary of device activity</p>
            </div>
            <Switch className="data-[state=checked]:bg-primary" />
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold text-primary uppercase tracking-widest ml-1">Privacy & Security</h2>
        
        <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-2">
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors">
            <div className="flex items-start gap-3 text-left">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-medium block">End-to-End Encryption</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">All data encrypted in transit</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors">
            <div className="flex items-start gap-3 text-left">
              <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-medium block">Auto-Lock Timer</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Lock after 5 mins of inactivity</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors">
            <div className="flex items-start gap-3 text-left">
              <Database className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-medium block">Data Retention</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">90 days rolling window</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </section>

      {/* App Info */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold text-primary uppercase tracking-widest ml-1">System Information</h2>
        
        <div className="bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 font-mono text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Version</span>
            <span>3.2.1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Build</span>
            <span>20260408</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">License</span>
            <span className="text-primary font-bold">Commercial</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Server Status</span>
            <span className="text-green-500">Connected</span>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="space-y-3 pt-4 border-t border-border">
        <div className="bg-destructive/5 border border-destructive/30 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-destructive mb-3">
            <AlertTriangle className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-widest">Danger Zone</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Deleting your account will permanently erase all captured data, traces, and connected devices. This action cannot be undone.
          </p>
          <button className="w-full py-3 rounded-xl border border-destructive text-destructive font-bold uppercase tracking-widest text-sm hover:bg-destructive hover:text-destructive-foreground transition-colors active:scale-95 flex items-center justify-center gap-2">
            <Trash2 className="w-4 h-4" /> Delete Account & All Data
          </button>
        </div>
      </section>
    </div>
  );
}
