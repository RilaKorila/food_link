import { useState } from "react"
import BottomNavigation from "@/components/BottomNavigation"
import dynamic from "next/dynamic"
import FoodBankFilterButton from "@/components/FoodBankFilterButton"

const FoodBankMap = dynamic(() => import('@/components/FoodBankMap'), { ssr: false })


export default function NearbyFoodBanks() {
  const [selectedFilters, setSelectedFilters] = useState({
    distance: true, // 5km以内はデフォルトON
    child: true, // 子ども支援
    medical: false, // 医療支援
    senior: false,
    disaster: false,
  })
  // 仮の位置データ（緯度経度）
  const markers = [
    { id: 1, name: "新宿フードバンク", lat: 35.708, lng: 139.710, tags: ["子ども支援", "高齢者支援"] },
    { id: 2, name: "渋谷こども食堂", lat: 35.660, lng: 139.699 , tags: ["子ども支援", "教育支援"] },
    { id: 3, name: "池袋フードサポート", lat: 35.730, lng: 139.717, tags: ["子ども支援", "高齢者支援"] },
  ]

  // 絞り込み条件 トグル処理
  const toggleFilter = (filterKey) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }))
  }

  // 絞り込み条件 全解除処理
  const clearFilters = () => {
    setSelectedFilters({
      distance: false,
      child: false,
      medical: false,
      senior: false,
      disaster: false,
    })
  }

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-y-auto">

        {/* 絞り込み条件 */}
        <div className="sticky top-0 z-40 bg-white shadow-md px-4 py-3 w-full">
          <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">絞り込み条件</span>
              <button className="text-orange-500 text-sm" onClick={clearFilters}>クリア</button>
          </div>

          <div className="flex overflow-x-auto space-x-2">
              <FoodBankFilterButton selectedFilters={selectedFilters} toggleFilter={toggleFilter} filterKey="distance" filterName="5km以内" />
              <FoodBankFilterButton selectedFilters={selectedFilters} toggleFilter={toggleFilter} filterKey="child" filterName="子ども支援" />
              <FoodBankFilterButton selectedFilters={selectedFilters} toggleFilter={toggleFilter} filterKey="medical" filterName="医療支援" />
              <FoodBankFilterButton selectedFilters={selectedFilters} toggleFilter={toggleFilter} filterKey="senior" filterName="高齢者支援" />
              <FoodBankFilterButton selectedFilters={selectedFilters} toggleFilter={toggleFilter} filterKey="disaster" filterName="災害支援" />
          </div>
        </div>

        {/* 地図エリア */}
        <div className="top-20 h-[calc(100vh-160px)]">
          <FoodBankMap markers={markers}/>
        </div>
      </main>

      <BottomNavigation activeTab="map" />
    </div>
  )
}
