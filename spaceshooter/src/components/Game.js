import React, { useRef, useEffect } from 'react';
import { createNoise2D } from 'simplex-noise';

function Game() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        
        const tileSize = 1;

        const noise2D = createNoise2D(() => Math.random());
        const noiseScale = .001;

        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = canvas.width;
        offscreenCanvas.height = canvas.height * 30;
        const offscreenCtx = offscreenCanvas.getContext('2d');

        let scrollPosition = offscreenCanvas.height;



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

        const imageDataUrl = offscreenCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageDataUrl;
        link.download = 'terrain.png';
        link.textContent = 'Download terrain image';
        document.body.appendChild(link);


        var imgWidth = offscreenCanvas.width;
        var imgHeight = offscreenCanvas.height;
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;

        var x = 0;
        var y = canvasHeight - imgHeight;

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = 'blue';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(offscreenCanvas, 0, imgHeight - scrollPosition*2);
            console.log(`imageHeight : ${imgHeight} and scrollPosition ${scrollPosition}`)

            scrollPosition -= .5; // Modify this value to control the scrolling speed
            requestAnimationFrame(draw);
        }

        requestAnimationFrame(draw);
    }, []);

    return (
        <canvas ref={canvasRef} width={800} height={600} />
    );
}

export default Game;
