import { Camera, MapPinned, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import BadgeList from "@/components/BadgeList";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      {/* Quick Actions */}
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-white space-y-6">

        <div className="text-center">
          <div className="grid grid-cols-3 gap-4">
            <button className="bg-orange-50 p-4 rounded-xl flex flex-col items-center text-center"
              onClick={() => router.push("/page")}>
              <Camera className="text-orange-500 mb-2" />
              <span className="text-sm font-semibold">撮影</span>
            </button>

            <button className="bg-orange-50 p-4 rounded-xl flex flex-col items-center text-center"
              onClick={() => router.push("/nearbyFoodBank")}>
              <MapPinned className="text-orange-500 mb-2" />
              <span className="text-sm font-semibold">近くの寄付</span>
            </button>

            <button className="bg-orange-50 p-4 rounded-xl flex flex-col items-center text-center">
              <RotateCcw className="text-orange-500 mb-2" />
              <span className="text-sm font-semibold">寄付履歴</span>
            </button>
          </div>
        </div>



        {/* User Stats */}
        <div className="rounded-xl p-4 shadow text-center">
          <h2 className="font-semibold text-gray-700 mb-4">これまでのあなたの貢献</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-orange-500 text-xl font-bold">12</p>
              <p className="text-sm text-gray-500">寄付回数</p>
            </div>
            <div>
              <p className="text-orange-500 text-xl font-bold">18</p>
              <p className="text-sm text-gray-500">支援団体数</p>
            </div>
          </div>
        </div>


        {/* 獲得バッジの表示 */}
        <BadgeList />

        {/* 次のチャレンジ */}
        <div className="mt-6 p-4 border rounded-xl bg-green-50 text-left">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-green-800">🌱 次のチャレンジ</span>
          </div>
          <p className="text-sm text-green-900 mb-2">環境の守護者：環境保護団体に3回寄付しよう</p>
          <div className="w-full bg-green-200 h-2 rounded-full">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: "33%" }}></div>
          </div>
          <p className="text-xs text-green-800 mt-1">1/3 達成</p>
        </div>
      </div>

      <BottomNavigation activeTab={"home"} />
    </div>
  );
} 
