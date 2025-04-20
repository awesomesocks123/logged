'use client'
import { useParams } from 'next/navigation';
import { useMutation, useStorage } from '../liveblocks.config';
import { shallow } from '@liveblocks/client';
import { useEffect, useState } from 'react';

export default function CardDescription() {
  const { cardId } = useParams();
  const card = useStorage(root => root.cards.find(c => c.id === cardId), shallow);
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const updateCard = useMutation(({ storage }, updateData) => {
    const cards = storage.get('cards');
    const index = cards.findIndex(c => c.toObject().id === cardId);
    if (index !== -1) {
      const card = cards.get(index);
      for (const key in updateData) {
        card?.set(key as keyof typeof card, updateData[key]);
      }
    }
  }, [cardId]);

  // Initialize state when card loads
  useEffect(() => {
    if (card) {
      setDescription(card.description || '');
      setDueDate(card.dueDate || '');
    }
  }, [card]);

  if (!card) {
    return <div className="text-gray-500">Loading card...</div>;
  }

  return (
    <div className="space-y-3">
      {/* Due Date Picker */}
      <div className="flex items-center gap-2">
        <label className="font-medium">Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => {
            const newDate = e.target.value;
            setDueDate(newDate);
            updateCard({ dueDate: newDate });
          }}
          className="border rounded p-1 text-sm"
        />
      </div>

      {/* Description Editor */}
      <div>
        <label className="font-medium block mb-1">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => updateCard({ description })}
          placeholder="Add a description..."
          className="w-full p-2 border rounded min-h-[100px] text-sm"
        />
      </div>
    </div>
  );
}