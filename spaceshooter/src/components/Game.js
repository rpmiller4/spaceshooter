import React, { useRef, useEffect } from 'react';

import buildCanvas from './terrainGenerator';
function Game() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const offscreenCanvas = buildCanvas(800,600)

        let scrollPosition = offscreenCanvas.height;

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
