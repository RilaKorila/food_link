import { useEffect, useState } from "react"
import Header from "@/components/Header"

export default function MatchFoodBank() {
  const [imageSrc, setImageSrc] = useState(null)

  useEffect(() => {
    const savedPhoto = sessionStorage.getItem("capturedPhoto")
    if (savedPhoto) {
      setImageSrc(savedPhoto)
    }
  }, [])

  return (
    <div className="min-h-screen p-6 bg-white">
      <Header />
      <h1 className="text-xl font-bold mb-4">📦 寄付先候補を探す</h1>

      {imageSrc && (
        <div className="mb-6">
          <p className="mb-2">📸 撮影された画像:</p>
          <img src={imageSrc} alt="captured" className="border rounded" />
        </div>
      )}
    </div>
  )
}
