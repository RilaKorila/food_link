"use client"

import { useRouter } from "next/navigation"
import { Home, Camera, MapPin, Save, HeartHandshake } from "lucide-react"

export default function BottomNavigation({ activeTab }) {
  const router = useRouter()
  const iconSize = 24 // 画像サイズ

  const navigateTo = (path) => {
    router.push(path)
  }

  const getButtonClass = (tab) => {
    if (tab === "camera") return "flex items-center justify-center w-14 h-14 rounded-full bg-orange-500 text-white shadow-lg border-1 border-white z-10";
    if (activeTab === tab && tab !== "camera") return "flex items-center justify-center w-12 h-12 rounded-full text-orange-500 bg-white";
    return "flex items-center justify-center w-12 h-12 rounded-full text-gray-400 bg-white";
  }

  return (
    <footer className="w-full h-20 bg-white shadow-md">
      <div className="flex justify-around items-center h-20">
        <button
          onClick={() => navigateTo("/")}
          className={getButtonClass("home")}
        >
          <Home size={iconSize} />
        </button>

        <button
          onClick={() => navigateTo("/nearbyFoodBank")}
          className={getButtonClass("map")}
        >
          <MapPin size={iconSize} />
        </button>

        <button
          onClick={() => navigateTo("/page")}
          className={getButtonClass("camera")}
          style={{ position: 'relative', top: '-6px' }}
        >
          <Camera size={iconSize} />
        </button>

        <button
          onClick={() => navigateTo("/selectDonationCandidate")}
          className={getButtonClass("save")}
        >
          <Save size={iconSize} />
        </button>

        <button
          onClick={() => navigateTo("/timeline")}
          className={getButtonClass("timeline")}
        >
          <HeartHandshake size={iconSize} />
        </button>
      </div>
    </footer>
  )
}
