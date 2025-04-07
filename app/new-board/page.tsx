'use client'
import { redirect } from "next/navigation";
import { createBoard } from "../actions/boardActions";

export default function NewBoardPage() {
    async function handleNewBoardSubmit(formData:FormData) {
        const boardName = formData.get('name')?.toString() || '';
        const boardInfo = await createBoard(boardName);
        const {id} = await createBoard(boardName)
        redirect(`/boards/${id}`);



    }
    return(
        <form action={handleNewBoardSubmit} className="max-w-xs block">
            <h1 className="text-2xl mb-4">Create new board</h1>
            <input type ="text" name="name" className="border rounded-md" placeholder="board name"/>   
            <button type="submit" className="mt-2 w-full">Create board</button>
        </form>
    )
}