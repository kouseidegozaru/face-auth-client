"use client"

import { useEffect, useRef, useState, use } from "react";
import { usePredictRequest } from "@/app/_requests/recongnizer";
import { SessionError, CsrfTokenError } from "@/app/_requests/modules";
import { useMessageModal } from "@/app/_components/MessageModal";

export default function VideoCapture({ params }: { params: Promise<{ groupID: string }> }) {
  const { groupID } = use(params)
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { showModal, Modal } = useMessageModal();
  const [predictRequest, setPredictRequest] = useState<((groupId: string, image: File) => Promise<Response>) | null>(null);
  const [prevFrameData, setPrevFrameData] = useState<Uint8ClampedArray | null>(null);

  useEffect(() => {

    // 予測リクエストの設定
    async function setupPredictRequest() {
        try {
            const request = await usePredictRequest();
            setPredictRequest(() => request);
        } catch (error) {
            if (error instanceof SessionError) {
                showModal("ログインしてください", "error", 4000);
            } else if (error instanceof CsrfTokenError) {
                showModal("エラーが発生しました", "error", 4000);
            } else {
                showModal("エラーが発生しました", "error", 4000);
            }
        }
    }

    setupPredictRequest();

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
        detectMotionAndSend();
    }, 1000);

    // ページが閉じられたらタイマーを止める
    return () => clearInterval(interval);

  }, []);

    // 動きを検知して送信
    async function detectMotionAndSend() {
        const currentFrameData = captureFrame();
        if (!currentFrameData) return;
        if (prevFrameData && predictRequest) {
            const diff = getFrameDiff(currentFrameData, prevFrameData);
            // 動きを検知した場合
            if (diff > 1000) {
                // 予測
                try {
                    const res = await predictRequest(groupID, new File([currentFrameData], "frame.jpg", { type: "image/jpeg" }));
                    if (res.ok) {
                        
                    }
                } catch (error) {
                    showModal("エラーが発生しました", "error", 4000);
                }
            }
        }
        setPrevFrameData(currentFrameData);
    }

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
      <Modal />
    </div>
  );
}
