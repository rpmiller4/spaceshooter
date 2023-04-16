import { createNoise2D } from 'simplex-noise';

const buildCanvas = (width, height) => {
    // Create a new canvas element
    const tileSize = 4;

    const noise2D = createNoise2D(() => Math.random());
    const noiseScale = .001;

    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = width;
    offscreenCanvas.height = height * 30;
    const offscreenCtx = offscreenCanvas.getContext('2d');

    //let scrollPosition = offscreenCanvas.height;



    function lerpColor(a, b, t) {
        return {
            r: a.r + (b.r - a.r) * t,
            g: a.g + (b.g - a.g) * t,
            b: a.b + (b.b - a.b) * t,
        };
    }

    function colorToString(color) {
        return `rgb(${color.r}, ${color.g}, ${color.b})`;
    }

    function drawTerrain(context) {
        for (let x = 0; x < context.canvas.width + tileSize; x += tileSize) {
            for (let y = 0; y < context.canvas.height + tileSize; y += tileSize) {
                const noiseValue = noise2D(
                    x * noiseScale,
                    y * noiseScale
                );


                if (noiseValue > 0.005) {
                    const bluish = { r: 0, g: 128, b: 255 };
                    const verybluish = { r: 0, g: 255, b: 200 };

                    const color = lerpColor(bluish, verybluish, (noiseValue - 0.3) / 0.7);
                    context.fillStyle = colorToString(color);
                    context.fillRect(x, y, tileSize, tileSize);
                }
                if (noiseValue > 0.1) {
                    const yellowish = { r: 200, g: 128, b: 0 };
                    const limeish = { r: 200, g: 255, b: 0 };

                    const color = lerpColor(yellowish, limeish, (noiseValue - 0.3) / 0.7);
                    context.fillStyle = colorToString(color);
                    context.fillRect(x, y, tileSize, tileSize);
                }
                if (noiseValue > 0.2) {
                    const green = { r: 0, g: 128, b: 0 };
                    const lime = { r: 0, g: 255, b: 0 };

                    const color = lerpColor(green, lime, (noiseValue - 0.3) / 0.7);
                    context.fillStyle = colorToString(color);
                    context.fillRect(x, y, tileSize, tileSize);
                }



            }
        }
    }



    offscreenCtx.fillStyle = 'blue';
    offscreenCtx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
    drawTerrain(offscreenCtx);


    return (offscreenCanvas)
}

export default buildCanvas;