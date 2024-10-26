function createCanvas(canvasSize = canvasSettings.canvasSize) {
    const canvasElement = document.getElementById('canvas');
    const canvasElementNew = document.createElement('div')
    canvasElementNew.setAttribute('id', 'canvas');
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < canvasSize; i++) {
        const canvasRow = document.createElement('div')
        canvasRow.classList.add('row')

        for (let j = 0; j < canvasSize; j++) {
            const canvasPixel = document.createElement('div')
            canvasPixel.classList.add('pixel')
            canvasRow.appendChild(canvasPixel)
        }
        canvasElementNew.appendChild(canvasRow);
    }
    fragment.appendChild(canvasElementNew);
    canvasContainer.replaceChild(fragment, canvasElement)
}

function updateLabel(canvasSize = canvasSettings.canvasSize) {
    const canvasSizeLabel = document.getElementById('canvas-size-input-label')
    canvasSizeLabel.textContent = `Canvas Size: ${canvasSize}x${canvasSize} `
}

function trackMouse() {
    canvasContainer.addEventListener("mousedown", (event) => {
        event.preventDefault(); // prevents weird behavior when dragging mouse
        isMouseDown = true;
        drawPixel(event);
    });
    canvasContainer.addEventListener("mouseover", drawPixel);
    document.addEventListener("mouseup", () => {
        isMouseDown = false
        canvasContainer.removeEventListener("mousemove", drawPixel);
    });
}

function drawPixel(event) {
    if (event.target.classList.contains('pixel') && isMouseDown) {
        switch (canvasSettings.mode) {
            case 'color':
                event.target.style.backgroundColor = canvasSettings.color;
                event.target.style.opacity = 1;
                break;
            case 'rainbow':
                const randomHue = Math.floor(Math.random() * 360);
                event.target.style.backgroundColor = `hsla(${randomHue}, 80%, 60%, 1)`;
                event.target.style.opacity = 1;
                break;
            case 'shading':
                applyShading(event)
                break;
            case 'eraser':
                event.target.style.backgroundColor = `white`;
                event.target.style.opacity = 1;
                break;
        }
    }
}

function applyShading(event) {
    if (!event.target.style.backgroundColor) {
        event.target.style.backgroundColor = `black`;
        event.target.style.opacity = 0;
    }
    if (Number(event.target.style.opacity) < 1) {
        event.target.style.opacity = Number(event.target.style.opacity) + 0.1;
    }
}

function getSettings() {
    const settingsContainer = document.getElementById('settings')
    const colorModeInput = document.getElementById('color-mode-input')
    const canvasSizeInput = document.getElementById('canvas-size-input')
    const colorInput = document.getElementById('color-input')
    const clearCanvasButton = document.getElementById('clear-button')

    canvasSizeInput.addEventListener('input', (event) => updateLabel(event.target.value))
    clearCanvasButton.addEventListener('click', () => createCanvas(canvasSizeInput.value))
    colorInput.addEventListener('input', (event) => {
        //use 'input' instead of 'change' to prevent first pixel of wrong color
        canvasSettings.mode = 'color'
        canvasSettings.color = event.target.value
        colorModeInput.checked = true
    })

    settingsContainer.addEventListener('change', (event) => {
        switch (event.target.id) {
            case 'canvas-size-input':
                createCanvas(event.target.value);
                break;
            case 'color-mode-input':
                canvasSettings.mode = 'color'
                break;
            case 'rainbow-mode-input':
                canvasSettings.mode = 'rainbow'
                break;
            case 'shading-mode-input':
                canvasSettings.mode = 'shading'
                break;
            case 'eraser-mode-input':
                canvasSettings.mode = 'eraser'
                break;
            default:
        }
    });
}

const canvasContainer = document.getElementById('canvas-container');
let isMouseDown = false
let canvasSettings = {
    canvasSize: 32,
    color: 'black',
    mode: 'color',
}

getSettings()
createCanvas()
trackMouse()