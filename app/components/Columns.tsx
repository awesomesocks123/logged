'use client';

import { ReactSortable } from "react-sortablejs";
import { Column, useStorage } from "../liveblocks.config";
import NewColumnForm from "./forms/NewColumnForm";
import {default as Boardcolumn} from  "./Column";
import { LiveList, LiveObject, shallow } from "@liveblocks/client";
import { useMutation } from "@liveblocks/react";


export default function Columns() {
    const columns = useStorage(root => root.columns.map(c => ({...c})),shallow);

    const updateColumns = useMutation(({storage}, columns: LiveObject<Column>[]) => {
        storage.set('columns', new LiveList(columns));
    }, [])

    function setColumnsOrder(sortedColumns: Column[]) {
        const newColumns:LiveObject<Column>[] = [];
        sortedColumns.forEach((sortedColumns,newIndex) => {
            const newSortedColumn = {...sortedColumns}
            newSortedColumn.index = newIndex;
            newColumns.push(new LiveObject(newSortedColumn))

        })
        updateColumns(newColumns)

    }

    if (!columns) {
        return; 
    }

    return (
        <div className="flex gap-4">
            <ReactSortable 
            className="flex gap-4"
            list={columns} 
            setList={setColumnsOrder}
            ghostClass="opacity-40">
            {columns?.length > 0 && columns.map(column => (
                <Boardcolumn 
                key={column.id} 
                {... column}/> 
                // 3 : 10 : 12 
            ))}
        </ReactSortable>
            <div className="flex-shrink-0 w-[250px]">
                <NewColumnForm />
            </div>

    </div>
    )
}