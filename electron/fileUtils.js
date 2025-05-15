// fileUtils.js
const fs = require('fs');
const path = require('path');
const { app } = require('electron');
const { exec } = require('child_process');

async function executeFFmpegCommand(command) {
    try {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(new Error(stderr || error.message));
                } else {
                    resolve(stdout);
                }
            });
        });
    } catch (error) {
        throw error;
    }
}

async function copyFileToDownloads(sourcePath) {
    try {
        const frameNumber = 5;
        const outFileName = 'outputTest.png';
        const downloadsPath = app.getPath('downloads');
        const targetPath = path.join(downloadsPath, outFileName);
        await executeFFmpegCommand(`ffmpeg -i ${sourcePath} -vf "select=gte(n\\,${frameNumber}),tile=1x1" -frames:v 1 ${targetPath} -y`);
        return `Frame Extracted successfully. Path : ${targetPath}`;
    } catch (error) {
        throw new Error(`Failed to copy file: ${error.message}`);
    }
}

module.exports = { copyFileToDownloads };
