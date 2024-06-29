import React from "react";
import UserDirectory from "./UserDirectory";
import MessagePanel from "./MessagePanel";
import { Stack } from "@mui/material";

export default function ChatsApp() {
  return (
    <Stack direction="row" spacing={2}>
      <UserDirectory />
      <MessagePanel />
    </Stack>
  );
}
