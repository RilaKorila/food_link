import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import Header from "@/components/Header"
import BottomNavigation from "@/components/BottomNavigation"

export default function FoodBankFinderPage() {
  const [activeTab, setActiveTab] = useState("home");
  const [photo, setPhoto] = useState(null);
  const [detectedFoods, setDetectedFoodItems] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const router = useRouter();

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

        // 保存と同時に食材検出＆反映
        sessionStorage.setItem("capturedPhoto", imageData)
        //const detected = detectFoodsFromPhoto(imageData)
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
    // const data = await response.json();

    // TODO: 実際のAPIデータを返す
    return ["ツナ缶", "そうめん", "パスタ"]; // 仮データ
  };

  const handleSearchDonation = async () => {
    if (!photo) {
      alert("画像がまだありません");
      return;
    }

    const response = await fetch("/api/recommendFoodBanks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prefecture: "埼玉県",
        city: "所沢市",
        donationTarget: "子ども食堂",
      }),
    });
    const foodBanks = await response.json();

    sessionStorage.setItem("recommendedFoodBanks", JSON.stringify(foodBanks));

    router.push("/matchFoodBank");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />

      {/* メイン領域 (スクロール可能) */}
      <main className="flex-1 overflow-y-auto px-4 py-6 bg-white">
        <h2 className="text-lg font-semibold">📷 カメラで写真を撮る</h2>

        <div className="space-y-4">
          <video ref={videoRef} width={300} height={225} className="border rounded" />
          <canvas ref={canvasRef} width={300} height={225} style={{ display: "none" }} />
          <button
           onClick={capturePhoto}
           className="px-4 py-2 bg-blue-500 text-white rounded shadow"
          >
            写真を撮る
          </button>

          {photo && (
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
               className="mt-4 px-4 py-2 bg-green-500 text-white rounded shadow"
              >
                寄付先を探す
              </button>
            </div>
          )}
         
        </div>
      </main>

      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
