import { createRoot } from 'react-dom/client';
import React from 'react';

const root = createRoot(document.getElementById('app') as HTMLDivElement)
root.render(<h1>Hello World</h1>)