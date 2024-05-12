const fs = require('fs');
const {contextBridge} = require('electron')

function writeExample(val) {
    fs.writeFile('db/example.txt', val, (err) => {
    if (err) {
        console.error('Error writing to file:', err);
        return;
    }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }

    contextBridge.exposeInMainWorld("fs", {writeExample : writeExample})
 
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })