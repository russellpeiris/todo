import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ConfigProvider, theme } from "antd";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        components: {
          Typography: {
            fontFamily: "Lexend, sans-serif",
          },
          Button: {
            colorPrimary: "#00b96b",
            algorithm: true,
          },
          FloatButton: {
            colorPrimary: "#00b96b",
            algorithm: true,
          },
          Tabs: {
            colorPrimary: "#00b96b",
            algorithm: true,
          },
          Modal: {
            colorPrimary: "#00b96b",
            algorithm: true,
          },
          Select: {
            colorPrimary: "#00b96b",
            algorithm: true,
          },
          Input: {
            colorPrimary: "#00b96b",
            algorithm: true,
          },
          Form: {
            colorPrimary: "#00b96b",
            algorithm: true,
          },
          Upload: {
            colorPrimary: "#00b96b",
            algorithm: true,
          },
          Menu: {
            colorPrimary: "#00b96b",
            algorithm: true,
          },
        },
      }}
    >
    <App />
    </ConfigProvider>
  </StrictMode>,
)
