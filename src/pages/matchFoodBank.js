import { useEffect, useState } from "react"
import Header from "@/components/Header"
import BottomNavigation from "@/components/BottomNavigation"
import { useRouter } from "next/navigation"

export default function MatchFoodBank() {
    const router = useRouter()
  const [detectedFoods, setDetectedFoods] = useState([])
  const [foodBanks, setFoodBanks] = useState([])
  const [editingIndex, setEditingIndex] = useState(null)
  const [editWeight, setEditWeight] = useState("")

  useEffect(() => {
    const detectedFoods = sessionStorage.getItem("detectedFoods") 
    const recommendedFoodBanks = sessionStorage.getItem("recommendedFoodBanks")

    if (detectedFoods) setDetectedFoods(JSON.parse(detectedFoods))
    if (recommendedFoodBanks) setFoodBanks(JSON.parse(recommendedFoodBanks))
  }, [])

  const handleEdit = (index, food) => {
    setEditingIndex(index)
    setEditWeight(food.weight || "")
  }

  const handleSave = (index) => {
    const newFoods = [...detectedFoods]
    newFoods[index] = {
      ...newFoods[index],
      weight: editWeight
    }
    setDetectedFoods(newFoods)
    sessionStorage.setItem("detectedFoods", JSON.stringify(newFoods))
    setEditingIndex(null)
  }

  const handleCancel = () => {
    setEditingIndex(null)
    setEditWeight("")
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <main className="flex-1 overflow-y-auto px-4 py-6 bg-white space-y-6">
        <h1 className="text-2xl font-bold">マッチング結果</h1>
        <p className="text-gray-600">あなたの寄付に最適なフードバンク</p>

        <div className="border border-orange-400 rounded p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-orange-500">認識結果</span>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {detectedFoods.map((food, index) => (
              <li key={index} className="flex items-center justify-between">
                <div>
                  {typeof food === 'object' ? food.name : food}
                </div>
                {editingIndex === index ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editWeight}
                      onChange={(e) => setEditWeight(e.target.value)}
                      className="w-20 px-2 py-1 border rounded"
                      placeholder="数量"
                    />
                    <button
                      onClick={() => handleSave(index)}
                      className="px-2 py-1 bg-green-500 text-white rounded text-sm"
                    >
                      保存
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-2 py-1 bg-gray-500 text-white rounded text-sm"
                    >
                      キャンセル
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {food.weight ? `${food.weight}` : "数量未設定"}
                    </span>
                    <button
                      onClick={() => handleEdit(index, food)}
                      className="px-2 py-1 bg-orange-500 text-white rounded text-sm"
                    >
                      編集
                    </button>
                  </div>
                )}
              </li>
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
                  onClick={() => {
                    console.log("Selected food bank:", foodBank)
                    sessionStorage.setItem("selectedFoodBank", JSON.stringify(foodBank));
                    router.push("/description");
                  }}
                >
                寄付方法を確認
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
