import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import Header from "@/components/Header"
import BottomNavigation from "@/components/BottomNavigation"

export default function FoodBankFinderPage() {
  const [activeTab, setActiveTab] = useState("home")
  const [location, setLocation] = useState("東京都新宿区")
  const [donationTarget, setDonationTarget] = useState("災害支援")
  const [photo, setPhoto] = useState(null)
  const [detectedFoods, setDetectedFoodItems] = useState([])
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const router = useRouter()
  const [isPhotoTaken, setIsPhotoTaken] = useState(false)


  const donationTargets = ["災害支援", "子ども支援", "医療支援", "教育支援", "高齢者支援"]

  useEffect(() => {
    if (videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
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
        setIsPhotoTaken(true) // 撮影完了フラグを立てる
  
        // カメラ停止処理
        const stream = videoRef.current.srcObject
        if (stream) {
          stream.getTracks().forEach((track) => track.stop())
        }
  
        // 保存や食材認識処理（任意）
        sessionStorage.setItem("capturedPhoto", imageData)
        const detected = await detectFoodsFromPhoto(imageData)
        setDetectedFoodItems(detected)
        sessionStorage.setItem("detectedFoods", JSON.stringify(detected))
      }
    }
  }

  const detectFoodsFromPhoto = async (photo) => {
    const response = await fetch("/api/detectFoods", {
      method: "POST",
      body: JSON.stringify({ image: photo }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    // const data = await response.json()

    // TODO: 実際のAPIデータを返す
    return ["ツナ缶", "そうめん", "パスタ"] // 仮データ
  }

  const handleSearchDonation = async () => {
    if (!photo) {
      alert("写真を撮影してください")
      return
    }

    const [prefecture, city] = location.split(/県|都|府|道/).filter(Boolean)

    const response = await fetch("/api/recommendFoodBanks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prefecture: prefecture,
        city,
        donationTarget,
      }),
    })
    const foodBanks = await response.json()

    sessionStorage.setItem("recommendedFoodBanks", JSON.stringify(foodBanks))

    router.push("/matchFoodBank")
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />

      {/* メイン領域 (スクロール可能) */}
      <main className="flex-1 overflow-y-auto px-4 py-6 bg-white space-y-6">
        <h1 className="text-2xl font-bold">寄付する</h1>

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
            {!isPhotoTaken ? (
              <>
                <div className="flex flex-col items-center space-y-4">
                  <video ref={videoRef} width={300} height={225} className="border rounded" />
                  <canvas ref={canvasRef} width={300} height={225} className="hidden" />

                  <button
                    onClick={capturePhoto}
                    className="px-4 py-2 bg-orange-500 text-white rounded shadow"
                  >
                    写真を撮る
                  </button>
                </div>
              </>
            ) : (
                <div>
                  <h2 className="text-lg font-semibold mt-6">📸 撮影された写真:</h2>
                  <img src={photo} alt="captured" className="mt-2 border rounded" />
    
                  <h2 className="text-lg font-semibold mt-6">📦 画像に写っている食材</h2>
                  {detectedFoods.map((food, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <span className="text-lg font-semibold">{food}</span>
                    </div>
                  ))}
    
                  <button
                   onClick={handleSearchDonation}
                   className="mt-4 px-4 py-2 bg-orange-500 text-white rounded shadow"
                  >
                    寄付先を探す
                  </button>
                </div>
            )}
          </div>
        </div>
      </main>

      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
