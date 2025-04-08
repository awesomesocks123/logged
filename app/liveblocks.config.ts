import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
  throttle:100,
});

type Presence = {};
type Storage = {};
type UserMeta = {};
type RoomEvent = {};
type ThreadMetadata = {};

export const {
  RoomProvider,
  useMyPresence,

  // Other hooks
  // ...
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(
  client
);