import { ReactSortable } from "react-sortablejs";
import NewCardForm from "./forms/NewCardForm";
import { Card, useMutation, useStorage } from "../liveblocks.config";
import { shallow } from "@liveblocks/client";


type ColumnProps = {
    id: string;
    name: string;
}

export default function Column({id, name}: ColumnProps) {

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
            <h3>{name}</h3>
            {columnCards && (
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
            <NewCardForm columnId={id} />    
        </div>
        
    )
}