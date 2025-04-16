'use client'

import { useParams, useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import { BoardContext, BoardContextProps } from "../BoardContext"
import { useStorage } from "@/app/liveblocks.config"
import { shallow } from "@liveblocks/client"



export default function CardModal ()  {
    const router = useRouter()
    const params = useParams()
    const {openCard, setOpenCard} = useContext<BoardContextProps>(BoardContext)
    
    useEffect(() => {
     if ( params.cardId && setOpenCard) {
        setOpenCard(params.cardId.toString())
     }
    },[params])


    const card = useStorage(root =>{ 
        return root.cards.find(c => c.id === params.cardId)
    },shallow)


    function handleBackdropClick(): void {
        router.back() 
    }

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={handleBackdropClick}
        > 
            <div 
                className="bg-white p-4 mt-8 max-w-xs mx-auto rounded-md flex items-center justify-center"
                onClick={ev => ev.stopPropagation()}
            >
               {card?.name}
            </div>
        </div>
    )
}