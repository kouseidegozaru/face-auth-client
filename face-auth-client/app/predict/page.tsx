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

  return (
    <div className="flex flex-col items-center">
      <video ref={videoRef} autoPlay playsInline className="w-full h-full border rounded-md shadow-md" />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
