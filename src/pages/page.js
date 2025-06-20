"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import Header from "@/components/Header"
import BottomNavigation from "@/components/BottomNavigation"
import ProcessingModal from '@/components/ProcessingModal';

export default function FoodBankFinderPage() {
  const [location, setLocation] = useState("東京都新宿区")
  const [donationTarget, setDonationTarget] = useState("子ども支援")
  const [photo, setPhoto] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0); // 進捗表示 0 → 50 → 100
  const [errorAtDetection, setErrorAtDetection] = useState(false)


  const donationTargets = ["子ども支援", "災害支援", "医療支援", "教育支援", "高齢者支援"]

  useEffect(() => {
    if (videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ 
          video: { facingMode: "environment" } 
        })
        .then((stream) => {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        })
        .catch((err) => {
          console.error("カメラにアクセスできません:", err)
        })
    }
  }, [])

  const capturePhoto = async () => {
    if (canvasRef.current && videoRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, 300, 225)
        const imageData = canvasRef.current.toDataURL("image/png")
        setPhoto(imageData)

        // カメラ停止処理
        const stream = videoRef.current.srcObject
        if (stream) {
          stream.getTracks().forEach((track) => track.stop())
        }
  
        const detectedItems = await detectFoodsFromPhoto(imageData)
        const detectedFoods = detectedItems?.foods || []
        setErrorAtDetection(detectedFoods.length === 0) // エラー発生フラグ
  
        sessionStorage.setItem("detectedFoods", JSON.stringify(detectedFoods))
        return detectedFoods
      }
    }
  }

  const detectFoodsFromPhoto = async (photo) => {
    try {
      const response = await fetch("/api/detectFoods", {
        method: "POST",
        body: JSON.stringify({ image: photo }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`APIリクエストに失敗しました: ${errorData.error || response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('食材認識エラー:', error);
      // エラーメッセージをユーザーに表示
      alert('食材の認識に失敗しました。もう一度お試しください。');
      return []; // エラー時は空配列を返す
    }
  }

  const handleDonationProcess = async () => {
    setIsProcessing(true)
    setProgress(0)

    console.log("写真撮影開始")
  
    // 撮影＆画像解析
    const detectedFoods = await capturePhoto()
    // 進捗を50%に
    setProgress(50)

    // もし食材が検出できなかった場合、エラー文言を表示して処理を終了
    if (detectedFoods.length === 0) {
      setErrorAtDetection(true)
      return
    }

    // レコメンド取得
    await searchDonation(detectedFoods)
    // 進捗を100% 
    setProgress(100)
  
    setTimeout(() => {
      setIsProcessing(false) // ダイアログ閉じる
    }, 500)

    return router.push("/matchFoodBank")
  }

  const searchDonation = async (detectedFoods) => {
    const [prefecture, city] = location.split(/県|都|府|道/).filter(Boolean)

    const response = await fetch("/api/recommendFoodBanks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prefecture: prefecture,
        city: city,
        donationTarget: donationTarget,
        detectedFoods: detectedFoods
      }),
    })
    const foodBanks = await response.json()

    sessionStorage.setItem("recommendedFoodBanks", JSON.stringify(foodBanks))

    router.push("/matchFoodBank")
  }

  const handleOnRetry = () => {
    setIsProcessing(false)
    return router.reload()
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />

      {/* メイン領域 (スクロール可能) */}
      <main className="flex-1 overflow-y-auto px-4 py-6 bg-white space-y-6">
        <div>
          <h2 className="font-semibold mb-2">現在地</h2>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <h2 className="font-semibold mb-2">寄付先</h2>
          <div className="flex flex-wrap gap-2">
            {donationTargets.map((target) => (
              <button
                key={target}
                onClick={() => setDonationTarget(target)}
                className={`px-3 py-1 rounded-full border ${
                  donationTarget === target ? "bg-orange-500 text-white" : "text-gray-600 bg-gray-100"
                }`}
              >
                {target}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="w-full flex justify-center mt-4">
            <div className="flex flex-col items-center space-y-4">
            {!photo ? (
              <video
                ref={videoRef}
                width={300}
                height={225}
                className="rounded border"
                playsInline
                autoPlay
                muted
              />
            ) : (
              <img
                src={photo}
                alt="撮影された画像"
                width={300}
                height={225}
                className="rounded border"
              />
            )}

            <canvas ref={canvasRef} width={300} height={225} className="hidden" />

              <button
                onClick={handleDonationProcess}
                className="px-4 py-2 bg-orange-500 text-white rounded shadow"
              >
                写真を撮って寄付先を探す
              </button>
            </div>
          </div>
        </div>
        <ProcessingModal visible={isProcessing} progress={progress} errorAtDetection={errorAtDetection}
        onRetry={handleOnRetry}/>
      </main>

      <BottomNavigation activeTab={"camera"} />
    </div>
  )
}
