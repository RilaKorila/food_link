"use client"

import { useRouter } from "next/navigation"
import { Home, Camera, MapPin } from "lucide-react"

export default function BottomNavigation({ activeTab }) {
  const router = useRouter()
  const iconSize = 24 // 画像サイズ

  const navigateTo = (path) => {
    router.push(path)
  }

  const getButtonClass = (tab) => {
    const isActive = activeTab === tab
    return `flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-200 ${
      isActive ? "bg-orange-400 text-black" : "bg-transparent text-gray-400"
    }`
  }

  const getCameraButtonClass = () => {
    const isActive = activeTab === "camera"
    return `w-14 h-14 rounded-full flex items-center justify-center -mt-6 shadow-lg transition-colors duration-200 ${
      isActive ? "bg-orange-400 text-black" : "bg-gray-200 text-gray-400"
    }`
  }

  return (
    <footer className="w-full h-16 bg-white shadow-md">
      <div className="flex justify-around items-center h-16">
      <button
          onClick={() => navigateTo("/")}
          className={getButtonClass("home")}
        >
          <Home size={iconSize} />
        </button>

        <button
          onClick={() => navigateTo("/page")}
          className={getCameraButtonClass()}
        >
          <Camera size={iconSize} className="text-white" />
        </button>

        <button
          className={getButtonClass("map")}
        >
          <MapPin size={iconSize} />
        </button>
      </div>
    </footer>
  )
}
