import React from "react";

interface ToolBarProps {
  onMarkClick: () => void;
  onEraseClick: () => void;
  onNoteClick: () => void;
}

const ToolBar: React.FC<ToolBarProps> = ({ onMarkClick, onEraseClick, onNoteClick }) => {
  return (
    <div className="flex space-x-4 mb-4">
      <button onClick={onMarkClick} className="px-4 py-2 bg-yellow-500 text-white rounded">
        Mark
      </button>
      <button onClick={onEraseClick} className="px-4 py-2 bg-red-500 text-white rounded">
        Erase
      </button>
      <button onClick={onNoteClick} className="px-4 py-2 bg-green-500 text-white rounded">
        Add Note
      </button>
    </div>
  );
};

export default ToolBar;
