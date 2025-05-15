const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { copyFileToDownloads } = require('./fileUtils');

// Check if we're in development mode
const isDev = process.env.NODE_ENV === 'development';

// Keep a global reference of the window object
let mainWindow = null;

/**
 * Create the main application window
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load the app
  if (isDev) {
    // Wait for Vite dev server to start
    const loadURL = async () => {
      try {
        await mainWindow.loadURL('http://localhost:5173');
        // Open DevTools in development
        mainWindow.webContents.openDevTools();
      } catch (error) {
        console.error('Failed to load URL:', error);
        // Retry after 1 second
        setTimeout(loadURL, 1000);
      }
    };
    loadURL();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Handle window close
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Create window when Electron is ready
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Handle file copy operation
ipcMain.handle('copy-file', async (event, sourcePath) => {
  try {
    return await copyFileToDownloads(sourcePath);
  } catch (error) {
    throw new Error(`Failed to copy file: ${error.message}`);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  app.quit();
}); 