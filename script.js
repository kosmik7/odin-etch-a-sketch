
function createCanvas() {
    const canvasElement = document.getElementById('canvas');
    const canvasSize = 16
    const fragment = document.createDocumentFragment();

    for (let i = 0; i <= canvasSize; i++) {
        const canvasRow = document.createElement('div')
        canvasRow.classList.add('row')

        for (let j = 0; j <= canvasSize; j++) {
            const canvasPixel = document.createElement('div')
            canvasRow.appendChild(canvasPixel)
        }
        fragment.appendChild(canvasRow);
    }
    canvasElement.appendChild(fragment)
}

createCanvas()