import { useState } from "react"
import BottomNavigation from "@/components/BottomNavigation"
import { ArrowLeft, Crosshair, ZoomIn, ZoomOut, CookingPot, ArrowUpDown } from "lucide-react"
import FoodBankFilterButton from "@/components/FoodBankFilterButton"
function sortFoodBanksByDistance(foodBanks, order) {
  // descが指定されたときは、distanceが大きい順
  if (order === "desc") {
    return foodBanks.sort((a, b) => b.distance - a.distance)
  }
  else {
    // descが指定されたときは、distanceが小さい順
    return foodBanks.sort((a, b) => a.distance - b.distance)
  }
}

export default function NearbyFoodBanks() {
  const [foodBankListOrder, setFoodBankListorder] = useState("desc")
  const [selectedFilters, setSelectedFilters] = useState({
    distance: true, // 5km以内はデフォルトON
    child: true, // 子ども支援
    medical: false, // 医療支援
    senior: false,
    disaster: false,
  });
  // 仮の位置データ（緯度経度）
  const markers = [
    { id: 1, name: "新宿フードバンク", lat: 35.708, lng: 139.710 },
    { id: 2, name: "渋谷こども食堂", lat: 35.660, lng: 139.699 },
    { id: 3, name: "池袋フードサポート", lat: 35.730, lng: 139.717 },
  ]

  const foodBanks = [
    {
      name: "新宿フードバンク",
      address: "東京都新宿区高田馬場4-5-6",
      distance: 1.2,
      tags: ["子ども支援", "高齢者支援"],
    },
    {
      name: "渋谷こども食堂",
      address: "東京都渋谷区神南1-2-3",
      distance: 2.8,
      tags: ["子ども支援", "教育支援"],
    },
    {
      name: "渋谷こども食堂",
      address: "東京都渋谷区神南1-2-3",
      distance: 2.8,
      tags: ["子ども支援", "教育支援"],
    },
  ]
  const sortedFoodBanks = sortFoodBanksByDistance(foodBanks, foodBankListOrder)

  // 絞り込み条件 トグル処理
  const toggleFilter = (filterKey) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  };

  // 絞り込み条件 全解除処理
  const clearFilters = () => {
    setSelectedFilters({
      distance: false,
      child: false,
      medical: false,
      senior: false,
      disaster: false,
    });
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="flex items-center px-4 py-3 bg-white shadow">
        <button className="mr-3" onClick={() => window.history.back()}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg bg-orange">近くのフードバンク</h1>
      </div>

      {/* 絞り込み条件 */}
      <div className="bg-white px-4 py-3 shadow">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">絞り込み条件</span>
          <button className="text-orange-500 text-sm" onClick={clearFilters}>クリア</button>
        </div>

        <div className="flex flex-wrap gap-2">
          <FoodBankFilterButton
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
            filterKey="distance"
            filterName="5km以内"
          />
          <FoodBankFilterButton
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
            filterKey="child"
            filterName="子ども支援"
          />
          <FoodBankFilterButton
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
            filterKey="medical"
            filterName="医療支援"
          />
          <FoodBankFilterButton
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
            filterKey="senior"
            filterName="高齢者支援"
          />
          <FoodBankFilterButton
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
            filterKey="disaster"
            filterName="災害支援"
          />
        </div>
      </div>

      {/* 地図エリア */}
      <div className="flex-1 bg-gray-200 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          {/* 背景を仮にグレーで埋めておく（ここに地図APIを入れていく） */}
          <div className="absolute inset-0 bg-gray-100" />

          {/* ピンをプロット */}
          {markers.map(marker => (
            <div
              key={marker.id}
              className="absolute"
              style={{
                top: `${50 + (marker.lat - 35.7) * 800}px`,
                left: `${50 + (marker.lng - 139.7) * 800}px`,
              }}
            >
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow text-white">
                <CookingPot size={18} />
              </div>
            </div>
          ))}

          {/* 現在地（仮の中心） */}
          <div className="absolute top-[10%] left-[50%] -translate-x-1/2 -translate-y-1/2">
            <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-white" />
          </div>

          {/* 地図コントロール */}
          <div className="absolute right-4 top-5 space-y-2">
            <button className="bg-white rounded-full p-2 shadow">
              <Crosshair size={20} className="text-orange-500" />
            </button>
            <button className="bg-white rounded-full p-2 shadow">
              <ZoomIn size={20} />
            </button>
            <button className="bg-white rounded-full p-2 shadow">
              <ZoomOut size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* 検索結果リスト */}
      <div className="bg-white rounded-t-3xl p-4 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">検索結果 ({foodBanks.length}件)</span>
          < button className="flex items-center space-x-2" onClick={() => setFoodBankListorder(foodBankListOrder === "desc" ? "asc" : "desc")}>
            <span className="text-sm text-gray-500">距離順</span>
            <ArrowUpDown size={20} className="text-gray-500 cursor-pointer" />
          </ button>
        </div>

        {/* 各フードバンク項目 */}
        <div className="h-[150px] overflow-y-auto">
          {sortedFoodBanks.map((item, idx) => (
            <div key={idx} className="p-3 border rounded-lg mb-3 shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold">{item.name}</span>
                <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-1 rounded-full">{item.distance}km</span>
              </div>
              <div className="text-sm text-gray-500 mb-1">{item.address}</div>
              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag, i) => (
                  <span key={i} className="bg-orange-50 text-orange-600 text-xs font-semibold px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation activeTab="map" />
    </div>
  )
}
