import BottomNavigation from "@/components/BottomNavigation"
import { ArrowLeft, MapPin, Heart, Plus, Crosshair, ZoomIn, ZoomOut, CookingPot, ArrowUpDown } from "lucide-react"

export default function NearbyFoodBanks() {
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
      distance: "1.2km",
      tags: ["子ども支援", "高齢者支援"],
    },
    {
      name: "渋谷こども食堂",
      address: "東京都渋谷区神南1-2-3",
      distance: "2.8km",
      tags: ["子ども支援", "教育支援"],
    },
    {
      name: "渋谷こども食堂",
      address: "東京都渋谷区神南1-2-3",
      distance: "2.8km",
      tags: ["子ども支援", "教育支援"],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="flex items-center px-4 py-3 bg-white shadow">
        <button className="mr-3" onClick={() => window.history.back()}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg">近くのフードバンク</h1>
      </div>

      {/* 絞り込み条件 */}
      <div className="bg-white px-4 py-3 shadow">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">絞り込み条件</span>
          <button className="text-orange-500 text-sm">クリア</button>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-sm">
            <MapPin size={16} className="mr-1" /> 5km以内
          </div>
          <div className="flex items-center bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-sm">
            <Heart size={16} className="mr-1" /> 子ども支援
          </div>
          <div className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm">医療支援</div>
          <div className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm">高齢者支援</div>
          <div className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm">災害支援</div>
          <div className="flex items-center bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm">
            その他 <Plus size={16} className="ml-1" />
          </div>
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
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">距離順</span>
            <ArrowUpDown size={20} className="text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* 各フードバンク項目 */}
        <div className="h-[150px] overflow-y-auto">
          {foodBanks.map((item, idx) => (
            <div key={idx} className="p-3 border rounded-lg mb-3 shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold">{item.name}</span>
                <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-1 rounded-full">{item.distance}</span>
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

      <BottomNavigation activeTab="nearby" />
    </div>
  )
}
