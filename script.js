
function createCanvas(canvasSize = 16) {
    const canvasContainer = document.getElementById('canvas-container');
    const canvasElement = document.getElementById('canvas');
    const canvasElementNew = document.createElement('div')
    canvasElementNew.setAttribute('id', 'canvas');
    const fragment = document.createDocumentFragment();



    for (let i = 0; i < canvasSize; i++) {
        const canvasRow = document.createElement('div')
        canvasRow.classList.add('row')

        for (let j = 0; j < canvasSize; j++) {
            const canvasPixel = document.createElement('div')
            canvasRow.appendChild(canvasPixel)
        }
        canvasElementNew.appendChild(canvasRow);
    }
    fragment.appendChild(canvasElementNew);
    canvasContainer.replaceChild(fragment, canvasElement)
}

function updateLabel(canvasSize = 16) {
    const canvasSizeLabel = document.getElementById('canvas-size-input-label')
    canvasSizeLabel.textContent = `Canvas Size: ${canvasSize}x${canvasSize} `
}

const canvasSizeInput = document.getElementById('canvas-size-input')
canvasSizeInput.addEventListener('mouseup', (event) => createCanvas(event.target.value));
canvasSizeInput.addEventListener('input', (event) => updateLabel(event.target.value));

createCanvas()