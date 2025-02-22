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
  const predictRequestRef = useRef<((groupId: string, image: File) => Promise<Response>) | null>(null)
  const prevFrameDataRef = useRef<Uint8ClampedArray | null>(null);
  const [predictedLabel, setPredictedLabel] = useState<string>("認識中");

  useEffect(() => {

    // 予測リクエストの設定
    async function setupPredictRequest() {
        try {
            const request = await usePredictRequest();
            predictRequestRef.current = request
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
        if (!videoRef.current || !canvasRef.current) return;
        const currentBlobData = await captureBlob(videoRef.current, canvasRef.current);
        if (!currentBlobData) return
        const currentFrameData = await blobToFrame(currentBlobData);
        if (!currentFrameData) return;
        if (!predictRequestRef.current) return;
        // 前のフレームがある場合
        if (prevFrameDataRef.current) {
            const diff = getFrameDiff(currentFrameData, prevFrameDataRef.current);
            // 動きを検知した場合
            if (diff > 13000) {
                const image = blobToImage(currentBlobData)
                sendImage(image)
                .then(label => {setPredictedLabel(label)})
            }
        // 前のフレームがない場合
        } else {
          const image = blobToImage(currentBlobData)
              sendImage(image)
              .then(label => {setPredictedLabel(label)})
        }
        prevFrameDataRef.current = currentFrameData
    }

    function blobToImage(blob : Blob) : File {
      return new File([blob], "frame.jpg", { type: "image/jpeg" })
    }

    function blobToFrame(blob : Blob) : Promise<Uint8ClampedArray> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);
          resolve(new Uint8ClampedArray(uint8Array))
        }
        reader.onerror = () => {
          reject(reader.error)
        }
        reader.readAsArrayBuffer(blob)
      })
    }

    async function sendImage(image: File) {
      if (!predictRequestRef.current) return
      // 予測
      try {
        const res = await predictRequestRef.current(groupID, image);
        if (res.ok) {
            const data = await res.json();
            return data.label
        }
      } catch (error) {
          showModal("エラーが発生しました", "error", 4000);
      }
      return "認識中"
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
  function captureBlob(video: HTMLVideoElement, canvas: HTMLCanvasElement): Promise<Blob | null> {
    return new Promise((resolve) => {
      if (!video || !canvas) {
        return null;
      }

      const context = canvas.getContext("2d");
      if (!context) {
        return null;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          resolve(null);
        }
      }, "image/jpeg");
    });
  }

  return (
    <div className="flex flex-col items-center">
      <video ref={videoRef} autoPlay playsInline className="w-full h-full border rounded-md shadow-md" />
      <canvas ref={canvasRef} className="hidden" />
      <div className="fixed bottom-[50px] w-full h-12 flex justify-center z-[1002]">
        <div className="flex items-center justify-center w-[300px] h-12 bg-foreground p-4 rounded-[20px] shadow-md border border-line text-text font-bold">
          {predictedLabel}
        </div>
      </div>
      <Modal />
    </div>
  );
}
