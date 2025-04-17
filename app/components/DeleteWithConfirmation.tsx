'use client'
import { faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type Props = {
    onDelete: () => void;
}



export default function DeleteWithConfirmation({onDelete}: Props) {
    const [wantDelete, setWantDelete] = useState(false) 

    if (wantDelete) {
        return (
            <div>
                <h4 className='mb-2 text-center'>Are you sure? </h4>
                 <div className="grid grid-cols-2 gap-2">
            <div className="">
            <button 
                className="bg-gray-300 p-2 rounded-md items-center justify-center flex gap-2 text-gray-600 hover:text-gray-100 w-full transition-colors duration-200"
                onClick={() => setWantDelete(false)}>
                    <FontAwesomeIcon className="" icon={faArrowLeft}/>
                    No, cancel
            </button>
            </div>
            
            <button
                className="bg-red-500 p-2 rounded-md items-center justify-center flex gap-2 text-white hover:text-gray-700 w-full transition-colors duration-200"
                onClick={onDelete}>
                <FontAwesomeIcon icon={faTrash}/>
                Yes, delete!
            </button>
        </div>
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