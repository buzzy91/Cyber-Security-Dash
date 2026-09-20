import { ShieldAlert } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function VpnAccessDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-primary/30 sm:max-w-md text-center">
        <DialogHeader>
          <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(255,0,0,0.2)]">
            <ShieldAlert className="w-7 h-7 text-primary" />
          </div>
          <DialogTitle className="text-primary font-bold uppercase tracking-widest text-center">
            VPN Access Required
          </DialogTitle>
          <DialogDescription className="text-center text-sm leading-relaxed pt-2">
            This section is protected and requires VPN access. A VPN activation fee of $150 is required for this demo environment.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-3">
          <button
            onClick={() => onOpenChange(false)}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold uppercase tracking-widest shadow-[0_0_14px_rgba(255,0,0,0.3)] hover:bg-primary/90 transition-colors"
          >
            Continue
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}