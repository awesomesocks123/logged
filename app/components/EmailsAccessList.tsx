'use client'

import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { updateBoard } from "../actions/boardActions"
import { useRouter } from "next/navigation"
import { RoomAccesses } from "@liveblocks/node"

export default function EmailsAccessList({boardId, usersAccesses}: {boardId: string, usersAccesses:RoomAccesses}) {
    const router = useRouter()
    async function handleDelete(emailToDelete: string) {
        const newUsersAccesses = {...usersAccesses}
        delete newUsersAccesses[emailToDelete] 

        fetch('/api/boards'), {
            method: 'PUT',
            body: JSON.stringify({
                id: boardId,
                update: {usersAccesses: newUsersAccesses}

            }),
            headers: {'Content-Type' :'application/json'},
        }
    }


    return (
        <div className="max-w-xs">
            {Object.keys(usersAccesses).map (email => (
                <div 
                key={email} className="flex gap-2 my-4 items-center max-w-xs justify-between border-gray-300 border rounded-lg pl-4">
                {email}
                <button 
                className="btn p-1"
                onClick={() => handleDelete(email)}
                >
                    <FontAwesomeIcon icon={faTrash}/> 
                </button>
            </div>
            ))}
        </div>
    )
}