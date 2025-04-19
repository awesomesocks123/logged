
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRoom } from '../liveblocks.config';
import {Doc} from 'yjs'
import { LiveblocksProvider } from '@liveblocks/react';

export default function CardDescription() {
    const {cardId} = useParams();
    const room = useRoom()
    const [doc, setDoc] = useState(null);
    const [provider, setProvider] = useState(null);
    




    return (
        <div>
            Text
        </div>
    )
}