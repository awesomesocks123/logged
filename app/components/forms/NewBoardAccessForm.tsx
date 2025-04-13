'use client';

import { addEmailToBoard } from "@/app/actions/boardActions";
import { useRouter } from "next/navigation";

export default function NewBoardAccess({boardId}: {boardId: string}) {
    const router = useRouter()
    async function addEmail(formData: FormData) {
        
        const email = formData.get('email')?.toString() || '';
        await addEmailToBoard(boardId,email);
        router.refresh()

    }
    return (
        <form action={addEmail} className="max-w-xs">
            <h2 className="text-lg mb-2">Add email</h2>
            <input type="text" placeholder="John@example.com" name="email"/>
            <button type="submit" className="w-full mt-2">Save</button>
        </form>
    ) 
}