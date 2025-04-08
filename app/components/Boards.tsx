'use server'
import Link from 'next/link';
import { liveblocksClient } from '../lib/liveblocksClient';
import { getUserEmail } from '../lib/userClient';


export default async function Boards() {
    const email = await getUserEmail()
    const {data:rooms} = await liveblocksClient.getRooms({userId:email})
return (
    <div className='my-4 grid md:grid-cols-4 gap-2'>
        {rooms?.length > 0 && rooms.map(room=> (
            <Link
            className="bg-gray-300 p-4 rounded-md block" 
            href={`/boards/${room.id}`}
            key={room.id} >
                {room.metadata.boardName} 
            </Link>
        ))}
    </div>
) 
}