import { useEffect, useState } from "react"
import Header from "@/components/Header"
import BottomNavigation from "@/components/BottomNavigation"
import { useRouter } from "next/navigation"
import { Pencil, Trash2 } from "lucide-react"

export default function MatchFoodBank() {
    const router = useRouter()
  const [detectedFoods, setDetectedFoods] = useState([])
  const [foodBanks, setFoodBanks] = useState([])
  const [editingIndex, setEditingIndex] = useState(null)
  const [editName, setEditName] = useState("")

  useEffect(() => {
    const detectedFoods = sessionStorage.getItem("detectedFoods") 
    const recommendedFoodBanks = sessionStorage.getItem("recommendedFoodBanks")

    if (detectedFoods) {
      // 食品名のみを保持するように変換
      const foods = JSON.parse(detectedFoods).map(food => 
        typeof food === 'object' ? food.name : food
      )
      setDetectedFoods(foods)
    }
    if (recommendedFoodBanks) setFoodBanks(JSON.parse(recommendedFoodBanks))
  }, [])

  const handleEdit = (index, food) => {
    setEditingIndex(index)
    setEditName(food)
  }

  const handleSave = (index) => {
    const newFoods = [...detectedFoods]
    newFoods[index] = editName
    setDetectedFoods(newFoods)
    sessionStorage.setItem("detectedFoods", JSON.stringify(newFoods))
    setEditingIndex(null)
  }

  const handleCancel = () => {
    setEditingIndex(null)
    setEditName("")
  }
  const handleDelete = (index) => {
    const newFoods = detectedFoods.filter((_, i) => i !== index)
    setDetectedFoods(newFoods)
    sessionStorage.setItem("detectedFoods", JSON.stringify(newFoods))
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
          <ul className="list-disc list-inside text-gray-700 space-y-4">
            {detectedFoods.map((food, index) => (
              <li key={index} className="flex flex-col gap-2">
                {editingIndex === index ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 px-2 py-1 border rounded"
                      placeholder="食品名"
                    />
                    <button
                      onClick={() => handleSave(index)}
                      className="px-2 py-1 bg-orange-500 text-white rounded text-sm"
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
                  <div className="flex items-center justify-between">
                    <div className="font-medium">
                      {food}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(index, food)}
                        className="p-1.5 bg-white text-orange-500 rounded text-sm hover:bg-orange-500 hover:text-white transition-colors"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="p-1.5 bg-white text-red-500 rounded text-sm hover:bg-red-600 hover:text-white transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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
