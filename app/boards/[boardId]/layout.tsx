'use client'
import { BoardContextProvider } from "@/app/components/BoardContext";
import { RoomProvider } from "@/app/liveblocks.config";
import { LiveList } from "@liveblocks/client";
import { useParams } from "next/navigation";
import React from "react";

type PageProps = {
    children: React.ReactNode;
    modal: React.ReactNode;
}



export default function BoardLayout({children, modal} : PageProps) {
    const params = useParams();
    if (!params?.boardId) {
        return <div>Loading board...</div>; 
        } 
    return (
        
        <BoardContextProvider>
    
                <RoomProvider 
                id={params.boardId?.toString()} 
                initialPresence={{}}
                initialStorage={{
                    columns: new LiveList([]),
                    cards: new LiveList([]),
                }}>
                
                    {children}
                    {modal} 

            </RoomProvider>
        </BoardContextProvider>
    )
}