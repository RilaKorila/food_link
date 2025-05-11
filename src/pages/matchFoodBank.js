import { useEffect, useState } from "react"
import Header from "@/components/Header"
import BottomNavigation from "@/components/BottomNavigation"

export default function MatchFoodBank() {
  const [imageSrc, setImageSrc] = useState(null)
  const [foods, setFoods] = useState([])
  const [foodBanks, setFoodBanks] = useState([])

  useEffect(() => {
    const savedPhoto = sessionStorage.getItem("capturedPhoto")
    const detectedFoods = sessionStorage.getItem("detectedFoods")
    const recommendedFoodBanks = sessionStorage.getItem("recommendedFoodBanks")

    if (savedPhoto) setImageSrc(savedPhoto)
    if (detectedFoods) setFoods(JSON.parse(detectedFoods))
    if (recommendedFoodBanks) setFoodBanks(JSON.parse(recommendedFoodBanks))
  }, [])

  return (
    <div className="flex flex-col h-screen">
        <Header />

        {/* メイン領域 (スクロール可能) */}
        <main className="flex-1 overflow-y-auto px-4 py-6 bg-white">
            <h1 className="text-xl font-bold mb-4">📦 寄付先候補を探す</h1>

            {imageSrc && (
            <div className="mb-6">
                <p className="mb-2">📸 撮影された画像:</p>
                <img src={imageSrc} alt="captured" className="border rounded" />
            </div>
            )}

            {foods.length > 0 ? (
            <div className="mb-6">
                <p className="text-lg font-semibold mb-2">📦 画像にうつっている食材:</p>
                {foods.map((food, index) => (
                <div key={index} className="flex items-center mb-2">
                    <span className="text-lg font-semibold">{food}</span>
                </div>
                ))}
            </div>
            ) : (
            <p className="text-lg font-semibold mb-6">食材が検出されませんでした。</p>
            )}

            {foodBanks.length > 0 ? (
            <div>
                <h2 className="text-lg font-semibold mb-2">📦 おすすめの寄付先:</h2>
                {foodBanks.map((foodBank, index) => (
                <div key={index} className="flex flex-col mb-2">
                    <span className="text-lg font-semibold">{foodBank.name}</span>
                    <span className="text-sm text-gray-500">
                    {foodBank.pref} {foodBank.city}
                    </span>
                    <a
                    href={foodBank.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                    >
                    詳細を見る
                    </a>
                </div>
                ))}
            </div>
            ) : (
            <p className="text-lg font-semibold">条件を満たすフードバンクはありませんでした。条件を変えてみてください🍙</p>
            )}
        </main>

        <BottomNavigation activeTab="map" setActiveTab={() => {}} />
    </div>
  )
}
