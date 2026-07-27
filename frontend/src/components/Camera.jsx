import { useRef, useEffect } from "react";
import Webcam from "react-webcam";

export default function Camera({
  onReady,
  onCapture,
  capturing = false,
  face = null,
  name = "",
  confidence = "",
}) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (webcamRef.current && onReady) {
      onReady(webcamRef);
    }
  }, [onReady]);

  useEffect(() => {
    if (!capturing) return;

    const interval = setInterval(() => {
      if (!webcamRef.current) return;

      const image = webcamRef.current.getScreenshot();

      if (image && onCapture) {
        onCapture(image);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [capturing, onCapture]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const webcam = webcamRef.current;

    if (!canvas || !webcam) return;

    const video = webcam.video;

    if (!video) return;

    const ctx = canvas.getContext("2d");

    // Displayed size
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    canvas.width = displayWidth;
    canvas.height = displayHeight;

    ctx.clearRect(0, 0, displayWidth, displayHeight);

    if (!face) return;

    // Actual camera resolution
    const originalWidth = video.videoWidth;
    const originalHeight = video.videoHeight;

    if (!originalWidth || !originalHeight) return;

    const scaleX = displayWidth / originalWidth;
    const scaleY = displayHeight / originalHeight;

    const x = face.x * scaleX;
    const y = face.y * scaleY;
    const w = face.w * scaleX;
    const h = face.h * scaleY;

    // Because webcam is mirrored
    const drawX = displayWidth - x - w;

    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 3;

    ctx.strokeRect(drawX, y, w, h);

    // Label background
    ctx.fillStyle = "#16a34a";
    ctx.fillRect(drawX, Math.max(0, y - 45), 200, 40);

    // Name
    ctx.fillStyle = "white";
    ctx.font = "bold 16px Arial";
    ctx.fillText(name || "Detecting...", drawX + 8, Math.max(18, y - 22));

    // Confidence
    ctx.font = "13px Arial";
    if (confidence !== "") {
      ctx.fillText(
        `Confidence: ${confidence}%`,
        drawX + 8,
        Math.max(35, y - 6)
      );
    }
  }, [face, name, confidence]);

  return (
    <div className="relative rounded-xl overflow-hidden border-2 border-blue-500 shadow-lg">
      <Webcam
        ref={webcamRef}
        audio={false}
        mirrored={true}
        screenshotFormat="image/jpeg"
        screenshotQuality={1}
        className="w-full h-auto object-contain"
        videoConstraints={{
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}