import { createClient, LiveList, LiveObject } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
  throttle:100,
});
export type Column = {
  name: string;
  id: string;
  index: number;

}
export type Card = {
  name: string;
  id: string;
  index: number;
  columnId: string;
}
type Presence = {};
type Storage = {
  columns: LiveList<LiveObject<Column>>;
  cards: LiveList<LiveObject<Card>>;

};
type UserMeta = {};
type RoomEvent = {};
type ThreadMetadata = {};

export const {
  RoomProvider,
  useMyPresence,
  useStorage,
  useMutation,
  useRoom,


  // Other hooks
  // ...
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(
  client
);