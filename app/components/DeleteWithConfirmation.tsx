'use client'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type Props = {
    onDelete: () => void;
}



export default function DeleteWithConfirmation({onDelete}: Props) {
    const [wantDelete, setWantDelete] = useState(false) 

    if (wantDelete) {
        return (
        <div className="flex gap-2">
            <button 
                className="btn"
                onClick={() => setWantDelete(false)}>
                    Cancel Delete
            </button>
            <button
                className="btn"
                onClick={() => {}}>
                Delete
            </button>
        </div>
        )
    }
    return(
        <button
            onClick={() => setWantDelete(true)}
            className="bg-red-500 p-2 rounded-md items-center justify-center flex gap-2 text-white hover:text-gray-700 w-full transition-colors duration-200">
            <FontAwesomeIcon icon={faTrash}/>
            Delete Column
            
        </button>
       
    )
}