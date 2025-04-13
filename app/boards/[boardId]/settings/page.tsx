'use server'

import NewBoardAccess from "@/app/components/forms/NewBoardAccessForm";
import { liveblocksClient } from "@/app/lib/liveblocksClient";

type PageProps = {
    params: {
        boardId: string; 
    }
}
export default async function BoardSettings({params}:PageProps) {
    const {boardId} = params;
    const boardInfo = await liveblocksClient.getRoom(boardId);
    

    return (
        <div>
            <h1 className="text-2xl">Access: to board {boardInfo.metadata.boardName}</h1>
            <div className="mb-8">
            {Object.keys(boardInfo.usersAccesses).map(email => (
                <div key={email}>
                    {email}
                </div>
            ))}
            </div>
            <NewBoardAccess boardId={boardId}/>
        </div>
    )
}