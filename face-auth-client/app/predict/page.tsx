"use client"

import { useEffect, useRef } from "react";

export default function VideoCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // カメラ映像を取得
    async function setupCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }

    setupCamera();

    // フレーム解析の定期実行
    const interval = setInterval(() => {
        console.log('test');
    }, 1000);

    // ページが閉じられたらタイマーを止める
    return () => clearInterval(interval);

  }, []);

  // フレームの差分を取得
  function getFrameDiff(currentFrameData: Uint8ClampedArray, prevFrameData: Uint8ClampedArray) {
    let diff = 0;
    for (let i = 0; i < currentFrameData.length; i += 4) {
      const rDiff = Math.abs(currentFrameData[i] - prevFrameData[i]);
      const gDiff = Math.abs(currentFrameData[i + 1] - prevFrameData[i + 1]);
      const bDiff = Math.abs(currentFrameData[i + 2] - prevFrameData[i + 2]);
      if (rDiff + gDiff + bDiff > 50) {
        diff++;
      }
    }
    return diff;
  }

  // フレームの取得
  function captureFrame() : Uint8ClampedArray | null {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const currentFrameData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height).data;
        return currentFrameData
      }
    }
    return null
  }

  return (
    <div className="flex flex-col items-center">
      <video ref={videoRef} autoPlay playsInline className="w-full h-full border rounded-md shadow-md" />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
