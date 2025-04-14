import { ReactSortable } from "react-sortablejs";
import NewCardForm from "./forms/NewCardForm";
import { Card, useMutation, useStorage } from "../liveblocks.config";
import { shallow } from "@liveblocks/client";
import { FormEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faClose, faEllipsis, faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons';


type ColumnProps = {
    id: string;
    name: string;
}

export default function Column({id, name}: ColumnProps) {

    {/* Rename Columns */}
    const [renameMode, setRenameMode] = useState(false) ;
    async function handleColumnNameSubmit(ev: FormEvent) {
        ev.preventDefault
        const input = (ev.target as HTMLFormElement).querySelector('input')
        if (input) {
            const newName = input.value;
            updateColumn(id,newName)
            input.value = ''
            setRenameMode(false)
            
        }
    }

    {/* Update Columns */}
    const updateColumn = useMutation(({storage},id,newName) => {
        const columns = storage.get('columns')
        columns.find(c => c.toObject().id === id)?.set('name', newName) 
        
    },[])

    {/* Delete Columns */}
    const deleteColumn = useMutation(({storage},id) => {

        const columns = storage.get('columns')
        const columnIndex = columns.findIndex(c => c.toObject().id === id) 
        columns.delete(columnIndex)

    },[])


    const columnCards = useStorage<Card[]>(root => {
        return root.cards
        .filter(card =>card.columnId === id)
        .map(c=> ({...c}))
        .sort((a,b) => a.index - b.index);
    },shallow)

    const updateCard = useMutation(({storage}, index, updateData)=> {
        const card = storage.get('cards').get(index);
        if (card) {
            for(let key in updateData) {
                card?.set(key as keyof Card, updateData[key]);
            }
        }

    },[])

    const setTasksOrderForColumn = useMutation(({storage}, sortedCards:Card[], newColumnId)=>{
        const idsOfSortedCards = sortedCards.map((c: Card) => c.id.toString());
        const allCards:Card[] = [...storage.get('cards').map(c => c.toObject())] 
        idsOfSortedCards.forEach((sortedCardId,colIndex) => {
            const cardStorageIndex = allCards.findIndex(c => c.id.toString() === sortedCardId) 
            updateCard(cardStorageIndex, {
                columnId: newColumnId,
                index: colIndex, 
            })
        })


    },[])

    return (
        <div className="w-48 bg-white shadow-md rounded-md p-2">
            <div>
                {!renameMode && (
                    <div className="flex justify-between">
                        <h3>{name}</h3>
                        <button onClick={() => setRenameMode(true)} className="text-gray-400 hover:text-gray-700 pr-2 transition-colors duration-200">
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    </div>
                )}
                {renameMode && (
                    <div className="mb-8">
                        Edit name: 
                    <form onSubmit={handleColumnNameSubmit} className="mb-2">
                        <input type="text" 
                        defaultValue={name}/> 
                        <button className='btn mt-2 w-full' type="submit">Save</button>
                        
                    </form>
                    
                    <button onClick={() => deleteColumn(id) }className="bg-red-500 p-2 rounded-md items-center justify-center flex gap-2 text-white hover:text-gray-700 w-full transition-colors duration-200">
                        <FontAwesomeIcon icon={faTrash}/>
                        Delete Column
                    </button>
                    <button 
                    className="mt-4 w-full flex justify-center items-center gap-2 uppercase text-sm font-bold text-gray-400 hover:text-gray-700 border border-transparent hover:border-gray-700 rounded px-4 py-2 transition-colors duration-200" 
                    onClick={() => setRenameMode(false)}>
                        <FontAwesomeIcon icon={faCancel}/> 
                        cancel edit
                    </button>
                    </div>
                )}


            </div>
            {!renameMode && columnCards && (
                <>
                <ReactSortable
                list={columnCards} 
                setList={items => setTasksOrderForColumn(items,id)}
                group="cards"
                className="min-h-12"
                ghostClass="opacity-40">
                {columnCards.map(card=> (
                    
                    <div key={card.id} className='border bg-white my-2 rounded-md p-4'>
                            <span>{card.name}</span>
                    </div>  
                ))}
                </ReactSortable>            
                </>
            ) }
            {!renameMode && (
                <NewCardForm columnId="columnId"/> 
            )}
            
        </div>
        
    )
}