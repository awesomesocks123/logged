'use client'; 
import { useState } from "react";
import Column from "./Columns";
import NewColumnForm from "./forms/NewColumnForm";

const defaultColumns = [
    {id: 'asdf', name: 'Todo', index:0},
    {id: 'asdf234', name: 'In Progress', index:1},
    {id: 'asdf23234', name: 'Done', index:2},
]
export type CardType = {
    name: string,
    id: string | number,
    order: number;

}
const defaultCards = [
    {id: 'asdf', name:'task 1', order: 0, columnId: 'asdf'},
    {id: 'asdf', name:'task 5', order: 0, columnId: 'asdf'},
    {id: 'asdx', name:'task 2', order: 1, columnId: 'asdf234'},
    {id: 'asda', name:'task 3', order: 2, columnId: 'asdf23234'},
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
                cards={cards.filter(c => c.columnId === column.id)}/> 
            ))}
            <NewColumnForm/>
        </div>
        
    )
}