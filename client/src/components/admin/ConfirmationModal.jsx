import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete", isDestructive = false }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-6 flex flex-col items-center text-center gap-4">
                            <div className={`p-4 rounded-full ${isDestructive ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                                <AlertTriangle size={32} />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">{title}</h3>
                                <p className="text-muted-foreground">{message}</p>
                            </div>

                            <div className="flex gap-3 w-full mt-4">
                                <button
                                    onClick={onClose}
                                    className="flex-1 px-4 py-2 hover:bg-muted rounded-xl transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                    className={`flex-1 px-4 py-2 rounded-xl text-white font-medium shadow-lg transition-all ${isDestructive
                                            ? 'bg-destructive hover:bg-destructive/90 shadow-destructive/25'
                                            : 'bg-primary hover:bg-primary/90 shadow-primary/25'
                                        }`}
                                >
                                    {confirmText}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmationModal;
