'use client'

import Link from "next/link";
import { useParams } from "next/navigation";

export default function Card({id,name}: {id:string, name: string} ) {
    const params = useParams() 
    return(
        <Link 
            href={`/boards/${params.boardId}/cards/${id}`} 
            className='border block bg-white my-2 rounded-md p-4'>
            <span>{name}</span>
        </Link>  
    )
}