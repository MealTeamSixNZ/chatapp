import React from "react";
import Stack from '@mui/material/Stack';
import UserButton from "./UserButton";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";

export default function UserDirectory() {
    return (
        <Stack spacing={2}>
            <Typography variant="h5" align="center">ChatsApp</Typography>
            <UserButton username="Admin" />
            <UserButton username="Jesse" />
            <UserButton username="Kirtus" />
            <Button variant="text" color="error">Peace Out</Button>
        </Stack>
    )
}