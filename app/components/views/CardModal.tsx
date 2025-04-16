'use client'

import { useParams, useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import { BoardContext, BoardContextProps } from "../BoardContext"
import { useStorage } from "@/app/liveblocks.config"
import { shallow } from "@liveblocks/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"



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
            className="bg-white p-4 mt-8 mx-auto rounded-md shadow-lg
            w-[calc(100vw-2rem)]
            max-w-sm"
            onClick={ev => ev.stopPropagation()}
          >
            {/* Top-right ellipsis button */}
            <div className="flex justify-end mb-2">
              <button className="text-gray-400 hover:text-gray-600">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            </div>
            
            {/* Centered content */}
            <div className="text-center">
              <h4>{card?.name}</h4>
            </div>
          </div>
        </div>
      )
}