'use client'
import { faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

type Props = {
   onDelete: () => void;
   onVisibilityChange?: (isVisible: boolean) => void;
}



export default function DeleteWithConfirmation({onDelete, onVisibilityChange}: Props) {
    const [wantDelete, setWantDelete] = useState(false) 
    useEffect(() => {
        if (onVisibilityChange) {
            onVisibilityChange(wantDelete);
        }
    }, [wantDelete]);

    if (wantDelete) {
        return (
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h4 className="text-center font-medium text-gray-800 mb-4">Confirm deletion</h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                  onClick={() => setWantDelete(false)}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <span>Cancel</span>
                </button>
                <button
                  className="flex items-center justify-center gap-2 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  onClick={onDelete}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  <span>Delete</span>
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
            Delete Card
            
        </button>
       
    )
}