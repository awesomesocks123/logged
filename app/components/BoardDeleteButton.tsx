'use client'

import { useRouter } from "next/navigation"
import { deleteBoard } from "../actions/boardActions"

export default function BoardDeleteButton({boardId}: {boardId:string}) {
    const router = useRouter()
    async function handleDeleteBoard() {
        
        
        await deleteBoard(boardId) 

        router.push('/')
    }

    return (
        <div>
        <button
        className="bg-red-400 text-gray-900 py-2 px-4 rounded-md hover:bg-red-300" 
        onClick={() => handleDeleteBoard()}>
            Delete Board
        </button>
        </div>
    )
}