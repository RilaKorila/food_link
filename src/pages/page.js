import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import Header from "@/components/Header"
import BottomNavigation from "@/components/BottomNavigation"

export default function Page() {
  const [activeTab, setActiveTab] = useState("home")
  const [photo, setPhoto] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        })
        .catch((err) => {
          console.error("カメラにアクセスできません:", err)
        })
    }
  }, [])

  const takePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, 300, 225)
        const imageData = canvasRef.current.toDataURL("image/png")
        setPhoto(imageData)
      }
    }
  }

  const searchDonation = () => {
    if (!photo) {
      alert("画像がまだありません")
      return
    }
  
    // 画像をURLエンコードしてsessionStorageに保存
    sessionStorage.setItem("capturedPhoto", photo)

    // ページ遷移
    router.push("/matchFoodBank")
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-white pb-20">
      <Header />

      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <h2 className="text-lg font-semibold">📷 カメラで写真を撮る</h2>

        <div className="space-y-4">
          <video ref={videoRef} width={300} height={225} className="border rounded" />
          <canvas ref={canvasRef} width={300} height={225} style={{ display: "none" }} />
          <button
            onClick={takePhoto}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow"
          >
            写真を撮る
          </button>

          {photo && (
            <div>
              <p className="mt-4">📸 撮影された写真:</p>
              <img src={photo} alt="captured" className="mt-2 border rounded" />

              <button
                onClick={searchDonation}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded shadow"
              >
                寄付先を探す
              </button>
            </div>
          )}
         
        </div>
      </main>

      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
