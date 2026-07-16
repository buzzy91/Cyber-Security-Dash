import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, Bitcoin, Copy, Check, ArrowLeft, XCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const BTC_WALLET = "bc1qu2ewhas7d5va96ssqhut5778hfp9ud85jmn2nx";

type Step = "packages" | "unavailable" | "payment";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreditCoinShop({ open, onClose }: Props) {
  const [step, setStep] = useState<Step>("packages");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setStep("packages");
      setSelectedAmount(null);
      setCopied(false);
    }
  }, [open]);

  function selectPackage(amount: number) {
    if (amount === 1000) {
      setStep("unavailable");
    } else {
      setSelectedAmount(amount);
      setStep("payment");
    }
  }

  function copyWallet() {
    navigator.clipboard.writeText(BTC_WALLET).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-primary/30 sm:max-w-sm text-center">
        <DialogHeader>
          <DialogTitle className="text-primary font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <Coins className="w-5 h-5" />
            {step === "packages" && "Get Credit Coins"}
            {step === "unavailable" && "Package Unavailable"}
            {step === "payment" && "Pay with Bitcoin"}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="py-4 flex flex-col items-center gap-4">
          <AnimatePresence mode="wait">

            {/* ── PACKAGES ── */}
            {step === "packages" && (
              <motion.div
                key="packages"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full flex flex-col gap-3"
              >
                <p className="text-xs text-muted-foreground">Select a Credit Coin package to unlock <span className="text-yellow-400 font-bold">Premium</span> surveillance features.</p>

                {/* $1000 — unavailable */}
                <button
                  onClick={() => selectPackage(1000)}
                  className="w-full p-4 rounded-xl border border-muted/30 bg-muted/10 flex items-center justify-between group hover:border-muted/50 transition-all opacity-60"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted/20 border border-muted/30 flex items-center justify-center">
                      <Coins className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-muted-foreground">1,000 Coins</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Starter</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-muted-foreground">$1,000</p>
                  </div>
                </button>

                {/* $2000 */}
                <button
                  onClick={() => selectPackage(2000)}
                  className="w-full p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5 flex items-center justify-between hover:border-yellow-500/60 hover:bg-yellow-500/10 transition-all active:scale-98"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
                      <Coins className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-yellow-400">2,000 Coins</p>
                      <p className="text-[10px] text-yellow-500/70 uppercase tracking-widest">Premium</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-yellow-400">$2,000</p>
                  </div>
                </button>

                {/* $3000 — best value */}
                <button
                  onClick={() => selectPackage(3000)}
                  className="w-full p-4 rounded-xl border border-primary/40 bg-primary/5 flex items-center justify-between hover:border-primary/70 hover:bg-primary/10 transition-all active:scale-98 relative overflow-hidden"
                >
                  <div className="absolute top-1.5 right-2 bg-primary/20 text-primary text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full border border-primary/30">Best Value</div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <Coins className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-primary">3,000 Coins</p>
                      <p className="text-[10px] text-primary/60 uppercase tracking-widest">Elite</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-primary">$3,000</p>
                  </div>
                </button>
              </motion.div>
            )}

            {/* ── UNAVAILABLE ── */}
            {step === "unavailable" && (
              <motion.div
                key="unavailable"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-destructive" />
                </div>
                <div className="space-y-2 text-center">
                  <p className="text-base font-bold text-destructive">Not Available</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The <span className="text-foreground font-bold">$1,000 Starter</span> package is not available for <span className="text-yellow-400 font-bold uppercase tracking-wide">Premium</span> accounts. Please select the <span className="text-yellow-400 font-bold">$2,000</span> or <span className="text-primary font-bold">$3,000</span> package to continue.
                  </p>
                </div>
                <button
                  onClick={() => setStep("packages")}
                  className="flex items-center gap-2 text-xs text-primary font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Packages
                </button>
              </motion.div>
            )}

            {/* ── PAYMENT ── */}
            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full flex flex-col gap-4"
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shadow-[0_0_16px_rgba(249,115,22,0.2)]">
                    <Bitcoin className="w-6 h-6 text-orange-400" />
                  </div>
                </div>

                <div className="w-full p-3 rounded-xl bg-secondary/40 border border-primary/20 space-y-1 text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Amount Due</p>
                  <p className="text-2xl font-bold text-foreground">${selectedAmount?.toLocaleString()}</p>
                  <p className="text-[10px] text-primary uppercase tracking-widest font-bold">{selectedAmount === 2000 ? "2,000" : "3,000"} Credit Coins</p>
                </div>

                <div className="w-full space-y-1.5">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest text-left">BTC Wallet Address</p>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/40 border border-orange-500/20">
                    <p className="text-[11px] font-mono text-orange-400 flex-1 break-all text-left leading-relaxed">{BTC_WALLET}</p>
                    <button
                      onClick={copyWallet}
                      className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center hover:bg-orange-500/20 transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-orange-400" />}
                    </button>
                  </div>
                  {copied && <p className="text-[10px] text-green-400 font-bold text-center">Wallet address copied!</p>}
                </div>

                <p className="text-[10px] text-muted-foreground leading-relaxed text-center">
                  Send exactly <span className="text-orange-400 font-bold">${selectedAmount?.toLocaleString()}</span> worth of BTC to the address above. Your Credit Coins will be credited within <span className="text-foreground font-bold">24 hours</span> of payment confirmation.
                </p>

                <button
                  onClick={() => setStep("packages")}
                  className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-bold uppercase tracking-widest hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
