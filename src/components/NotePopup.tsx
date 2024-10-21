"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface NotePopupProps {
  onSave: (note: string) => void;
  onClose: () => void;
}

const NotePopup: React.FC<NotePopupProps> = ({ onSave, onClose }) => {
  const [note, setNote] = useState("");

  const handleSave = useCallback(() => {
    onSave(note);
    setNote("");
    onClose();
  }, [note, onSave, onClose]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
        </DialogHeader>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter your note here..."
          className="min-h-[100px]"
        />
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NotePopup;
