import { useState, useRef } from "react"
import { useRouter } from "next/router"
import { Camera } from "lucide-react"

const foodBankOptions = [
  "新宿フードバンク",
  "渋谷こども食堂",
  "目黒フードネット",
  // 必要に応じて追加
]

export default function CreateDonation() {
  const router = useRouter()
  const [selectedFoodBank, setSelectedFoodBank] = useState("")
  const [imgPreview, setImgPreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleSelectPhoto = () => {
    fileInputRef.current?.click()
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImgPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    if (!selectedFoodBank) {
      alert("寄付先を選択してください")
      return
    }

    sessionStorage.setItem("selectedFoodBank", selectedFoodBank)
    if (imgPreview) {
      sessionStorage.setItem("donationImage", imgPreview)
    }

    router.push("/SaveDonation")
  }

  return (
    <div className="min-h-screen bg-white p-4 space-y-6">
      <h1 className="text-lg font-bold text-gray-800">新しい寄付の作成</h1>

      {/* 寄付先選択 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          寄付先を選択
        </label>
        <select
          value={selectedFoodBank}
          onChange={(e) => setSelectedFoodBank(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">選択してください</option>
          {foodBankOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* 写真追加 */}
      <section>
        <h2 className="font-bold text-gray-800 mb-2">写真を追加</h2>
        <div
          className="border-2 border-dashed border-gray-300 rounded-xl h-52 flex flex-col items-center justify-center space-y-3 cursor-pointer"
          onClick={handleSelectPhoto}
        >
          {imgPreview ? (
            <img
              src={imgPreview}
              alt="preview"
              className="object-cover h-full w-full rounded-xl"
            />
          ) : (
            <>
              <Camera className="w-8 h-8 text-gray-400" />
              <p className="text-gray-500 text-sm">写真を撮影または選択</p>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm">
                写真を選択
              </button>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>
      </section>

      {/* 決定ボタン */}
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold text-sm hover:bg-orange-600"
      >
        決定
      </button>
    </div>
  )
}
