'use server'

import BoardDeleteButton from "@/app/components/BoardDeleteButton";
import EmailsAccessList from "@/app/components/EmailsAccessList";
import NewBoardAccess from "@/app/components/forms/NewBoardAccessForm";
import { liveblocksClient } from "@/app/lib/liveblocksClient";
import { getUserEmail } from "@/app/lib/userClient";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type PageProps = {
    params: {
        boardId: string; 
    }
}
export default async function BoardSettings({params}:PageProps) {
    const {boardId} = params;
    const boardInfo = await liveblocksClient.getRoom(boardId);
    const userEmail = await getUserEmail()
    if (!boardInfo.usersAccesses[userEmail]) {
        return 'Access Denied'

    }
    return (
        <div>
            <div className="flex justify-between">
            <Link 
            className="inline-flex gap-1 items-center btn mb-4" 
            href={`/boards/${boardId}`}>
                <FontAwesomeIcon icon={faArrowLeft} />
                Go back to board
            </Link>
            <BoardDeleteButton boardId={boardId}/> 
            </div>
            <h1 className="text-2xl">Access: to board {boardInfo.metadata.boardName}</h1>
            <div className="mb-8">
                <EmailsAccessList boardId={boardId} usersAccesses={boardInfo.usersAccesses}/>
            </div>
            <NewBoardAccess boardId={boardId}/>
        </div>
    )
}