'use client';

import { useStorage } from "../liveblocks.config";
import Column from "./Column";
import NewColumnForm from "./forms/NewColumnForm";

export default function Columns() {
    const columns = useStorage(root => root.columns);
    if (!columns) {
        return; 
    }
    return (
        <div className="flex gap-4">
        {columns?.length > 0 && columns.map(column => (
            <Column 
            key={column.id} 
            {... column} 
            setCards = {() => {}}
            cards={[]}/> 
        ))}
        <NewColumnForm/>
    </div>
    )
}