import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import Header from "@/components/Header"
import BottomNavigation from "@/components/BottomNavigation"

export default function Page() {
  const [activeTab, setActiveTab] = useState("home")
  const [photo, setPhoto] = useState(null)
  const [foodsInPhoto, setFoodsInPhoto] = useState([])
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const router = useRouter()

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

  const takePhoto = async () => {
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
        setFoodsInPhoto(detected)
        sessionStorage.setItem("detectedFoods", JSON.stringify(detected))
      }
    }
  }

  const detectFoodsFromPhoto = async (photo) => {
    // TODO: 実際の画像解析ロジックをここに実装
    const response = await fetch("/api/detectFoods", {
      method: "POST",
      body: JSON.stringify({ image: photo }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    return data.foods
    // 仮データ
    return ["ツナ缶", "そうめん", "パスタ"]
  }

  const getRecommendedFoodBanks = () => {
    // TODO: 実際のAPI呼び出しに置き換え

    return [
      {
        name: "フードバンクネット西埼玉",
        pref: "埼玉県",
        city: "所沢市",
        target: "団体・個人の生活困窮者",
        url: "https://fbnws.org/",
      },
    ]
  }

  const searchDonation = () => {
    if (!photo) {
      alert("画像がまだありません")
      return
    }

    const recommendedFoodBanks = getRecommendedFoodBanks()
    sessionStorage.setItem("recommendedFoodBanks", JSON.stringify(recommendedFoodBanks))

    router.push("/matchFoodBank")
  }

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
            onClick={takePhoto}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow"
          >
            写真を撮る
          </button>

          {photo && (
            <div>
              <h2 className="text-lg font-semibold mt-6">📸 撮影された写真:</h2>
              <img src={photo} alt="captured" className="mt-2 border rounded" />

              <h2 className="text-lg font-semibold mt-6">📦 画像にうつっている食材</h2>
              {foodsInPhoto.map((food, index) => (
                <div key={index} className="flex items-center mb-2">
                  <span className="text-lg font-semibold">{food}</span>
                </div>
              ))}

              <button
                onClick={searchDonation}
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
