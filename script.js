// script.js

// Load Face API models
async function loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights');
    await faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights');
    await faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights');
    await faceapi.nets.faceExpressionNet.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights');
    console.log("Models loaded");
}

// Start the camera and display it in the video element
async function startCamera() {
    const video = document.getElementById("video");
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        console.error("Camera access failed:", error);
    }
}

// Detect faces in the video feed
async function startFaceScan() {
    const video = document.getElementById("video");
    const output = document.getElementById("output");

    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

    if (detections.length > 0) {
        output.innerText = "Face detected!";
    } else {
        output.innerText = "No face detected!";
    }
}

// Load models and start the camera on page load
window.onload = async () => {
    await loadModels();
    startCamera();
};

