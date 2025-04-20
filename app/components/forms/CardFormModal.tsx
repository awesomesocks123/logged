'use client'
import { faCalendar, faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type CardFormModalProps = {
  onClose: () => void;
  onSubmit: (cardName: string, description: string) => void;
  dueDate: string;
  onDueDateChange: (date: string) => void;
};

export default function CardFormModal({ 
  onClose, 
  onSubmit,
  dueDate,
  onDueDateChange
}: CardFormModalProps) {
  const [description, setDescription] = useState('');
  
  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const input = (ev.target as HTMLFormElement).querySelector('input[name="cardName"]');
    if (input?.value) {
      onSubmit(input.value, description);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-start justify-center pt-16">
      <div className="bg-white p-4 rounded-md shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              name="cardName"
              placeholder="Task name"
              className="w-full p-2 border rounded"
              autoFocus
              required
            />
          </div>
          <div className="flex items-center gap-2">
             <label className="font-medium">Due Date:</label>
                <input
                type="date"
                value={dueDate}
                onChange={(e) => onDueDateChange(e.target.value)}
                className="border rounded p-1 text-sm"
                />
            </div>
          
          <div className="flex items-start gap-2">
            <FontAwesomeIcon icon={faAlignLeft} className="text-gray-400 mt-2" />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description..."
              className="w-full p-2 border rounded min-h-[80px] text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}