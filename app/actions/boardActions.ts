'use server'
import { Liveblocks, RoomData, RoomInfo } from "@liveblocks/node";
import uniqid from 'uniqid';
import { authOptions } from "../lib/authOption";
import { getServerSession } from "next-auth/next";

export async function createBoard(name:string) : Promise<boolean | RoomData> {
    const liveblocksClient = new Liveblocks({

        secret: process.env.LIVEBLOCKS_SECRET_KEY || '',
      });
      const session = await getServerSession(authOptions)
      const email = session?.user?.email || '';
      if (email) {
        const roomId = uniqid.time(); 
        return await liveblocksClient.createRoom(roomId, {
        defaultAccesses: [], 
        usersAccesses: {
            [email]: ['room:write'],

            },
            metadata: {
                boardName: name,
            }
        }); 
    }
    return false;
}