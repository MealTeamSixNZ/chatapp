import React from "react";
import { Button } from "@mui/material";


export default function UserButton(props:{username:string}) {
    return <Button variant="outlined">{props.username}</Button>
}