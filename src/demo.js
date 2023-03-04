import React from 'react';
import DemoComponent from "./DemoComponent";
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(React.createElement(DemoComponent));
