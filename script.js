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
        switch (true) {
            case canvasSettings.colorMode:
                event.target.style.backgroundColor = canvasSettings.color;
                break;
            case canvasSettings.rainbowMode:
                const randomHue = Math.floor(Math.random() * 360);
                event.target.style.backgroundColor = `hsl(${randomHue} 80% 60%)`;
                break;
            case canvasSettings.eraserMode:
                event.target.style.backgroundColor = `white`;
                break;
        }
    }
}

function getSettings() {
    const settingsContainer = document.getElementById('settings')
    const colorModeInput = document.getElementById('color-mode-input')
    const canvasSizeInput = document.getElementById('canvas-size-input')
    canvasSizeInput.addEventListener('input', (event) => {
        updateLabel(event.target.value);
    })

    settingsContainer.addEventListener('change', (event) => {
        switch (event.target.id) {
            case 'canvas-size-input':
                createCanvas(event.target.value);
                break;
            case 'color-input':
                canvasSettings.color = event.target.value
                colorModeInput.checked = true
                canvasSettings.colorMode = true
                canvasSettings.rainbowMode = false
                canvasSettings.eraserMode = false
                break;
            case 'color-mode-input':
                canvasSettings.colorMode = event.target.checked
                canvasSettings.eraserMode = false
                canvasSettings.rainbowMode = false
                break;
            case 'rainbow-mode-input':
                canvasSettings.rainbowMode = event.target.checked
                canvasSettings.eraserMode = false
                canvasSettings.colorMode = false
                break;
            case 'eraser-mode-input':
                canvasSettings.eraserMode = event.target.checked
                canvasSettings.rainbowMode = false
                canvasSettings.colorMode = false
                break;
            default:
        }
    });
}

let isMouseDown = false
let canvasSettings = {
    canvasSize: 16,
    color: '#000000',
    colorMode: true,
    rainbowMode: false,
    eraserMode: false,
}
const canvasContainer = document.getElementById('canvas-container');

getSettings()
createCanvas()
trackMouse()