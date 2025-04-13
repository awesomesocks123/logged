'use server';

import Board from "@/app/components/Board";
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
    const emailsWhoHaveAccess = [];
    const userAccess = boardInfo.usersAccesses?.[userEmail]
    const hasAccess = userAccess && [...userAccess].includes('room:write'); 
    if (!hasAccess) {
        return (
            <div>Access denied</div>
        )
    }
    return(

        <div>
        
            <Board name={boardInfo.metadata.boardName}id={boardId}/> 
        </div>
    )

}