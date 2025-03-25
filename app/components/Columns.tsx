import {CardType} from "@/components/Board"; 
import { ReactSortable } from "react-sortablejs";

type ColumnProps = {
    name: string;
    cards: CardType[];
    setCards: (cards: CardType[]) => void;  
}

export default function Column({id, name,cards, setCards}: ColumnProps) {
    function setCardsForColumns(cards:CardType[],columnId:string){
        console.log({cards, columnId})
    }
    return (
        <div className="w-48 bg-white shadow-md rounded-md p-2">
            <h3>{name}</h3>
            <ReactSortable 
            list={cards} 
            setList={cards => setCardsForColumns(cards,id)}
            group="cards">
            {cards.map(card=> (
                <div className='border my-2 rounded-md p-4'>
                    <span>{card.name}</span>
                </div>
            ))}
            </ReactSortable>
        </div>
        
    )
}