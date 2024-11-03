// Load models function
async function loadModels() {
    const MODEL_URL = './models'; // Path to your models directory
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL + '/tinyFaceDetectorModel');
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL + '/faceLandmark68Model');
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL + '/faceRecognitionModel');
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL + '/faceExpressionModel');
    console.log('Models loaded');
}

// Start face scan function
async function startFaceScan() {
    // Access the video element
    const video = document.getElementById('video');
    
    // Set up the camera feed
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => {
            console.error("Error accessing camera: ", err);
        });

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
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        }, 100);
    });
}

// Initialize the app and load models
window.onload = async () => {
    await loadModels(); // Wait for models to load
    document.getElementById('startButton').addEventListener('click', startFaceScan);
};
// Load models function
async function loadModels() {
    const MODEL_URL = './models'; // Path to your models directory
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL + '/tinyFaceDetectorModel');
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL + '/faceLandmark68Model');
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL + '/faceRecognitionModel');
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL + '/faceExpressionModel');
    console.log('Models loaded');
}

// Start face scan function
async function startFaceScan() {
    // Access the video element
    const video = document.getElementById('video');
    
    // Set up the camera feed
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => {
            console.error("Error accessing camera: ", err);
        });

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
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        }, 100);
    });
}

// Initialize the app and load models
window.onload = async () => {
    await loadModels(); // Wait for models to load
    document.getElementById('startButton').addEventListener('click', startFaceScan);
};



