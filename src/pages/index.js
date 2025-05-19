import { useState } from "react"
import { Camera, MapPin, RotateCcw } from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home")
  
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      {/* Quick Actions */}
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-white space-y-6">

        <div className="text-center">
          <h2 className="font-semibold text-gray-700 mb-2">クイックアクション</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-orange-50 p-4 rounded-xl flex flex-col items-center text-center">
              <Camera className="text-orange-500 mb-2" />
              <span className="text-sm font-semibold">食品を撮影して寄付</span>
            </div>

            <div className="bg-orange-50 p-4 rounded-xl flex flex-col items-center text-center">
              <RotateCcw className="text-orange-500 mb-2" />
              <span className="text-sm font-semibold">寄付履歴</span>
            </div>
          </div>
        </div>



        {/* User Stats */}
        <div className="rounded-xl p-4 shadow text-center">
          <h2 className="font-semibold text-gray-700 mb-4">これまでのあなたの貢献</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-orange-500 text-xl font-bold">12</p>
              <p className="text-sm text-gray-500">寄付回数</p>
            </div>
            <div>
              <p className="text-orange-500 text-xl font-bold">35kg</p>
              <p className="text-sm text-gray-500">フードロス<br/>削減量</p>
            </div>
            <div>
              <p className="text-orange-500 text-xl font-bold">18</p>
              <p className="text-sm text-gray-500">支援団体数</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation activeTab={activeTab} />
    </div>
  );
} 
