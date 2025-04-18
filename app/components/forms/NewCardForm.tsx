'use client'
import { Card, useMutation } from "@/app/liveblocks.config";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LiveObject } from "@liveblocks/client";
import { FormEvent, useState } from "react";
import uniqid from 'uniqid';

export default function NewCardForm({columnId}: {columnId: string}) {

    const [createCard, setCreateCard] = useState(false)

    const addCard = useMutation (({storage}, cardName) => {
        return storage.get('cards').push(new LiveObject<Card>({
            name: cardName,
            id: uniqid.time(),
            columnId: columnId,
            index: 9999,

        }))
        
    },[columnId])
    function handleNewCardFormSubmit(ev: FormEvent) {
        ev.preventDefault();
        const input = (ev.target as HTMLFormElement).querySelector('input');
        if (input) {
            const cardName = input?.value;
            addCard(cardName)
            input.value = '';
            setCreateCard(false) 
        }
    }

    if (createCard) {
        return ( 
            <form 
                onSubmit={handleNewCardFormSubmit}
                className="p-2">
                <input
                    type="text"
                    placeholder="Card name"
                    className="w-full p-2 border rounded mb-2"
                    autoFocus
                />
                <div className="grid grid-cols-2 gap-1">
                    <button
                        type="button"
                        onClick={() => setCreateCard(false)}
                        className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-200"
                    >
                        Add
                    </button>

                </div>

            </form>
            
        )
    }



    return (
        <button
            onClick={() => setCreateCard(true)}
            className="flex items-center gap-2 w-full p-2 bg-gray-300 text-gray-6 hover:bg-gray-600 hover:text-gray-200 rounded transition-colors duration-200"
        >   
            <FontAwesomeIcon icon={faPlus} size='lg'/>
            <span> Add a card</span>
        </button>
        
    )
}
