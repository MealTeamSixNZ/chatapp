import { createRoot } from 'react-dom/client';
import React, { StrictMode } from 'react';
import ChatsApp from './ChatsApp';

const root = createRoot(document.getElementById('app') as HTMLDivElement)
root.render(<StrictMode><ChatsApp /></StrictMode>)