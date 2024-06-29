import React from "react";
import { IconButton, Paper } from "@mui/material";
import { TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export default function MessagePanel() {
    return (
        <Paper>
            <TextField id="outlined-basic" label="Enter Message..." variant="outlined" />
            <IconButton><SendIcon /></IconButton>
        </Paper>
    )
}