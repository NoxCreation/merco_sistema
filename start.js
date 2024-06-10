const { app, BrowserWindow } = require('electron')
const path = require('path');
const next = require(path.join(__dirname, 'node_modules', 'next'));
const express = require('express');

// Configura Next.js
const dev = false; // Inicia Next.js en producción
const appPath = path.join(__dirname);
const nextApp = next({ dev, dir: appPath });
const handle = nextApp.getRequestHandler();

function createWindow () {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    }
  })
  // Maximiza la ventana para que ocupe toda la pantalla
  win.maximize();
  // Oculta la barra de menús
  win.setMenuBarVisibility(false);

  win.loadURL('http://127.0.0.1:3000/')
}

nextApp.prepare().then(() => {
  // Configura Express
  const server = express();
  server.all('*', (req, res) => handle(req, res));

  // Inicia el servidor
  server.listen(3000, () => {
    // Abre Electron cuando el servidor esté listo
    console.log("Runing")
    app.whenReady().then(createWindow)
  });
});
