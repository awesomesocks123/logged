'use server';

import Board from "@/app/components/Board";
import ProgressGrid from "@/app/components/ProgressGrid";
import { liveblocksClient } from "@/app/lib/liveblocksClient";
import { getUserEmail } from "@/app/lib/userClient";

type PageProps = {
    params: {
        boardId: string
    }
}

export default async function BoardPage(props: PageProps) {
    const boardId = props.params.boardId;
    const userEmail = await getUserEmail();
    const boardInfo = await liveblocksClient.getRoom(boardId)
    const userAccess = boardInfo.usersAccesses?.[userEmail]
    const hasAccess = userAccess && [...userAccess].includes('room:write'); 
    if (!hasAccess) {
        return (
            <div>Access denied</div>
        )
    }
    return(

        <div>
            <ProgressGrid />
            <div className="p-2">
            <Board name={boardInfo.metadata.boardName.toString()}id={boardId}/> 
            </div>
           
        </div>
    )

}