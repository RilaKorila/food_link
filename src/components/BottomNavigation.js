"use client"

import { Home, Camera, MapPin } from "lucide-react"

export default function BottomNavigation({ activeTab, setActiveTab }) {

  const iconSize = 24 // 画像サイズ

  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex items-center justify-center w-12 h-12 rounded-full ${
            activeTab === "home" ? "text-black" : "text-gray-400"
          }`}
        >
          <Home size={iconSize} />
        </button>

        <button
          onClick={() => setActiveTab("camera")}
          className="w-14 h-14 rounded-full bg-orange-400 flex items-center justify-center -mt-6 shadow-lg"
        >
          <Camera size={iconSize} className="text-white" />
        </button>

        <button
          onClick={() => setActiveTab("map")}
          className={`flex items-center justify-center w-12 h-12 rounded-full ${
            activeTab === "map" ? "text-black" : "text-gray-400"
          }`}
        >
          <MapPin size={iconSize} />
        </button>
      </div>
    </footer>
  )
}
