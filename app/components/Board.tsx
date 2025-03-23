import NewColumnForm from "./forms/NewColumnForm";

const columns = [
    {id: 'asdf', name: 'Todo', index:0},
    {id: 'asdf234', name: 'In Progess', index:1},
    {id: 'asdf23234', name: 'Done', index:2},
]

export default function Board() {
    return (
        <div className="flex gap-4">
            {columns.map(column => (
                <div className="w-36 bg-white shadow-md rounded-md p-2">
                    {column.name}
                </div>
            ))}
            <NewColumnForm/>
        </div>
        
    )
}