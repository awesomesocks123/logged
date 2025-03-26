'use client'; 
import { useState } from "react";
import Column from "./Column";
import NewColumnForm from "./forms/NewColumnForm";

const defaultColumns = [
    {id: 'asdf', name: 'Todo', index:0},
    {id: 'asdf234', name: 'In Progress', index:1},
    {id: 'asdf23234', name: 'Done', index:2},
]
export type CardType = {
    name: string;
    id: string | number;
    index: number;
    columnId: string; 

}
const defaultCards = [
    {id: 'asdf', name:'task 1', index: 0, columnId: 'asdf'},
    {id: 'asdb', name:'task 5', index: 1, columnId: 'asdf'},
    {id: 'asdx', name:'task 2', index: 1, columnId: 'asdf234'},
    {id: 'asda', name:'task 3', index: 2, columnId: 'asdf23234'},
]

export default function Board() {
    const [cards, setCards] = useState(defaultCards); 
    const [columns, setColumns] = useState(defaultColumns); 
    return (
        <div className="flex gap-4">
            {columns.map(column => (
                <Column 
                key={column.id} 
                {... column} 
                setCards = {setCards}
                cards={
                    cards
                    .sort((a,b) => a.index - b.index )
                    .filter(c => c.columnId === column.id)
                }/> 
            ))}
            <NewColumnForm/>
        </div>
        
    )
}