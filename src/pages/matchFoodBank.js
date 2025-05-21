import { useEffect, useState } from "react"
import Header from "@/components/Header"
import BottomNavigation from "@/components/BottomNavigation"
import Link from "next/link"

export default function MatchFoodBank() {
  const [detectedFoods, setDetectedFoods] = useState([])
  const [foodBanks, setFoodBanks] = useState([])

  useEffect(() => {
    const detectedFoods = sessionStorage.getItem("detectedFoods") 
    const recommendedFoodBanks = sessionStorage.getItem("recommendedFoodBanks")

    if (detectedFoods) setDetectedFoods(JSON.parse(detectedFoods))
    if (recommendedFoodBanks) setFoodBanks(JSON.parse(recommendedFoodBanks))
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <main className="flex-1 overflow-y-auto px-4 py-6 bg-white space-y-6">
        <h1 className="text-2xl font-bold">マッチング結果</h1>
        <p className="text-gray-600">あなたの寄付に最適なフードバンク</p>

        <div className="border border-orange-400 rounded p-4">
          <div className="flex items-center mb-2">
            <span className="font-semibold text-orange-500">認識結果</span>
          </div>
          <ul className="list-disc list-inside text-gray-700">
            {detectedFoods.map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">📦 おすすめの寄付先</h2>

          {foodBanks.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              寄付先が見つかりません。
            </div>
          ) : (
            foodBanks.map((foodBank, index) => (
              <div key={index} className="border rounded p-4 mb-4 space-y-2 shadow-sm">
                {index === 0 && (
                  <span className="inline-block text-xs text-white bg-orange-500 rounded-full px-2 py-1">
                    最適
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <div>
                    <p className="font-semibold">{foodBank.name}</p>
                    <p className="text-sm text-gray-500">
                      {foodBank.pref} {foodBank.city}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">必要としている食品:</p>
                  <p className="text-sm text-gray-800">{foodBank.target || "お米、缶詰、乾麺"}</p>
                </div>
                <button
                  className={`w-full py-2 rounded font-semibold ${
                    index === 0 ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Link className="flex items-center justify-center gap-2" href={foodBank.url} target="_blank">
                    <span>フードバンクの詳細</span>
                  </Link>
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      <BottomNavigation activeTab="map" />
    </div>
  )
}
