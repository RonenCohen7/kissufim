import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

import { CssBaseline, ThemeProvider } from "@mui/material";
import "./i18n/i18n";
import { theme } from "./theme/theme";






createRoot(document.getElementById('root')!).render(


    
    <StrictMode>

        <ThemeProvider theme={theme}>

            <CssBaseline>

                <BrowserRouter>
                    <App />
                </BrowserRouter>

            </CssBaseline>

        </ThemeProvider>


    </StrictMode>,
)
