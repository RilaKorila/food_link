"use client"

import { Home, Camera, MapPin } from "lucide-react"

export default function BottomNavigation({ activeTab, setActiveTab }) {

  const iconSize = 24 // 画像サイズ

  return (


    <footer className="myfooter w-full z-10 bg-white shadow-md">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => setActiveTab("home")}
          className={`rounded-full ${
            activeTab === "home" ? "text-black" : "text-gray-400"
          }`}
        >
          <Home size={iconSize} />
        </button>

        <button
          onClick={() => setActiveTab("camera")}
          className="rounded-full"
        >
          <Camera size={iconSize}/>
        </button>

        <button
          onClick={() => setActiveTab("map")}
          className={`rounded-full ${
            activeTab === "map" ? "bg-black text-white" : "bg-gray-200 text-black"
          }`}
        >
          <MapPin size={iconSize} />
        </button>
      </div>
    </footer>
  )
}
