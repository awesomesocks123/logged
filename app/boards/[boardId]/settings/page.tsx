'use server'

import { liveblocksClient } from "@/app/lib/liveblocksClient";

type PageProps = {
    params: {
        boardId: string; 
    }
}
export default async function BoardSettings({params}:PageProps) {
    const {boardId} = params;
    const boardInfo = await liveblocksClient.getRoom(boardId);
    const emailsWithAccess = [];
    

    return (
        <div>
            <h1 className="text-2xl">Access: to board {boardInfo.metadata.boardName}</h1>
            {Object.keys(boardInfo.usersAccesses).map(email => (
                <div>
                    {email}
                </div>
            ))}
            <form>
                
            </form>
        </div>
    )
}