import {CardType} from "@/components/Board"; 
import { SetStateAction } from "react";
import { ReactSortable } from "react-sortablejs";

type ColumnProps = {
    id: string;
    name: string;
    cards: CardType[];
    setCards: SetStateAction<any>;
}

export default function Column({id, name,cards, setCards}: ColumnProps) {
    function setCardsForColumns(sortedCards: CardType[], newColumnId:string){
        //console.log({cards, newColumnId})



        // changing columns
        setCards((prevCards:CardType[]) => {
            const newCards = [... prevCards];
            sortedCards.forEach((sortedCard:CardType, newIndex:number) => {
                const foundCard = newCards.find(newCard => newCard.id === sortedCard.id)
                if (foundCard) {
                    foundCard.index = newIndex; 
                    foundCard.columnId = newColumnId; 
                }

            })
            return newCards;
        })
    }
    return (
        <div className="w-48 bg-white shadow-md rounded-md p-2">
            <h3>{name}</h3>
            <ReactSortable 
            list={cards} 
            setList={items => setCardsForColumns(items,id)}
            group="cards"
            className="min-h-12"
            ghostClass="opacity-40">
            {cards.map(card=> (
                <div key={card.id} className='border bg-white my-2 rounded-md p-4'>
                    <span>{card.name}</span>
                </div>
            ))}
            </ReactSortable>
        </div>
        
    )
}