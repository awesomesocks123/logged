'use client'
import { Card, useMutation } from "@/app/liveblocks.config";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LiveObject } from "@liveblocks/client";
import { useState } from "react";
import uniqid from 'uniqid';
import CardFormModal from "./CardFormModal";

export default function NewCardForm({ columnId }: { columnId: string }) {
    const [createCard, setCreateCard] = useState(false);
    const [dueDate, setDueDate] = useState('');

    const addCard = useMutation(({ storage }, cardName: string, description: string) => {
        return storage.get('cards').push(new LiveObject<Card>({
            name: cardName,
            id: uniqid.time(),
            columnId: columnId,
            index: 9999,
            createdAt: new Date().toISOString(),
            dueDate: dueDate || undefined,
            description: description || undefined,
        }));
    }, [columnId, dueDate]);

    function handleNewCardFormSubmit(cardName: string, description: string) {
        addCard(cardName, description);
        setDueDate('');
        setCreateCard(false);
    }

    if (createCard) {
        return (
            <CardFormModal 
                onClose={() => setCreateCard(false)}
                onSubmit={handleNewCardFormSubmit}
                dueDate={dueDate}
                onDueDateChange={setDueDate}
            />
        );
    }

    return (
        <button
            onClick={() => setCreateCard(true)}
            className="flex items-center gap-2 w-full p-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
        >   
            <FontAwesomeIcon icon={faPlus} size='lg'/>
            <span>Add a task</span>
        </button>
    );
}