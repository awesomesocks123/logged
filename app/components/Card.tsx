'use client'

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Card({id,name}: {id:string, name: string} ) {
    const params = useParams() 

    useEffect(()=> {
        if (params.cardId) {
            
        }
    }, [params.cardId])

    return(
        <Link 
            href={`/boards/${params.boardId}/cards/${id}`} 
            className='border block bg-white my-2 rounded-md p-4'>
            <span>{name}</span>
        </Link>  
    )
}