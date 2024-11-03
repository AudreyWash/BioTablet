// Load models function
async function loadModels() {
    const MODEL_URL = './models'; // Path to your models directory
    try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        console.log('Models loaded successfully');
    } catch (error) {
        console.error('Error loading models:', error);
    }
}

// Start face scan function
async function startFaceScan() {
    const video = document.getElementById('video');

    // Set up the camera feed
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        video.srcObject = stream;
    } catch (error) {
        console.error('Error accessing camera:', error);
    }

    // Detect faces from video feed and add overlay
    video.addEventListener('play', async () => {
        const canvas = faceapi.createCanvasFromMedia(video);
        document.body.append(canvas);

        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions();

            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);

            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        }, 100);
    });
}

// Initialize the app and load models
window.onload = async () => {
    await loadModels();
    document.getElementById('startButton').addEventListener('click', startFaceScan);
};




