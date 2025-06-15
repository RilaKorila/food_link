import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Header from "@/components/Header"
import BottomNavigation from "@/components/BottomNavigation"
import { ArrowLeft, Camera, CheckCircle } from "lucide-react"

export default function SaveDonation() {
  const router = useRouter()

  /* -------------------------------------------------
   *  state
   * ------------------------------------------------- */
  const [foodBank, setFoodBank]       = useState(null)
  const [donatedFoods, setDonatedFoods] = useState([])
  const [user, setUser] = useState(null)
  const [imgFile, setImgFile]         = useState(null)
  const [imgPreview, setImgPreview]   = useState("")
  const [message, setMessage]         = useState("")
  const [isPublic, setIsPublic]       = useState(true)
  const [isSaved, setIsSaved]         = useState(false)
  const fileInputRef                  = useRef(null)

  const ICON_SIZE = 24

  /* -------------------------------------------------
   *  初期データ読み込み
   * ------------------------------------------------- */
  useEffect(() => {
    const fb  = sessionStorage.getItem("selectedFoodBank")
    const dfs = sessionStorage.getItem("detectedFoods")
    if (fb)  setFoodBank(JSON.parse(fb))
    if (dfs) setDonatedFoods(JSON.parse(dfs))

    // TODO 
    const donatedFoods = ["食品1", "食品2", "食品3"] // ダミーデータ
    setDonatedFoods(donatedFoods)

    // TODO 
    const loginedUser = {
        name: "おむすび",
    }
    setUser(loginedUser)
  }, [])

  /* -------------------------------------------------
   *  写真選択 or 撮影
   * ------------------------------------------------- */
  const handleSelectPhoto = () => fileInputRef.current?.click()

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImgFile(file)
    setImgPreview(URL.createObjectURL(file))
  }

  /* -------------------------------------------------
   *  寄付記録保存 & SNS 共有
   * ------------------------------------------------- */
  const handleSave = async () => {
    // TODO: API 呼び出しで寄付データを保存
    // 例）await saveDonation({ foodBank, donatedFoods, imgFile, message, isPublic })

    setIsSaved(true)
    setTimeout(() => router.push("/myProfile"), 1500)
  }

  const shareX = () => {
    const text = encodeURIComponent(
      `${foodBank?.name ?? ""} に食品を寄付しました！ #フードバンク #FoodLink \n${message}`
    )
    const url  = encodeURIComponent(window.location.origin) // プロダクション URL に合わせて
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank")
  }

  const shareFacebook = () => {
    const url  = encodeURIComponent(window.location.origin)
    const text = encodeURIComponent(
      `${foodBank?.name ?? ""} に食品を寄付しました！ ${message}`
    )
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
      "_blank"
    )
  }


  if (!user) {
    return <div className="p-4 text-gray-600">読み込み中...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <div className="flex items-center">
          <button onClick={() => router.back()}>
            <ArrowLeft className="text-orange-500" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">寄付を報告</h1>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">
            🍙
          </div>
          <div className="flex-1">
            <p className="font-bold">{ user.name }</p>
            {foodBank && (
              <p className="text-xs text-gray-500">{foodBank.name} に寄付</p>
            )}
          </div>
        </div>

        <section>
          <h2 className="font-bold text-gray-800 mb-2">写真を追加</h2>
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl h-52 flex flex-col items-center justify-center space-y-3"
            onClick={handleSelectPhoto}
          >
            {imgPreview ? (
              // プレビュー
              <img
                src={imgPreview}
                alt="preview"
                className="object-cover h-full w-full rounded-xl"
              />
            ) : (
              <>
                <Camera className="w-8 h-8 text-gray-400" />
                <p className="text-gray-500 text-sm">
                  写真を撮影または選択
                </p>
                <button
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm"
                >
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

        {/* 寄付内容 */}
        {donatedFoods.length > 1 && (
          <section>
            <h2 className="font-bold text-gray-800 mb-2">寄付内容</h2>
            <div className="bg-orange-50 rounded-xl p-4">
              <p className="font-bold text-orange-700 mb-2">寄付した食品</p>
              <ul className="space-y-1 text-sm">
                {donatedFoods.map((food, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{food}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* フードバンク情報 */}
        {foodBank && (
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              📦
            </div>
            <div className="flex-1 text-sm">
              <p className="font-bold">{foodBank.name}</p>
              <p className="text-gray-600">{foodBank.address}</p>
            </div>
          </div>
        )}

        {/* メッセージ */}
        <section>
          <h2 className="font-bold text-gray-800 mb-2">メッセージ（任意）</h2>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="今日は〜に食品を寄付しました..."
            className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
          ></textarea>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 mb-2">公開設定</h2>
          <div className="bg-white border border-gray-200 rounded-xl divide-y">
            <label className="flex items-center p-3 space-x-3 cursor-pointer">
              <input
                type="radio"
                name="privacy"
                checked={isPublic}
                onChange={() => setIsPublic(true)}
                className="form-radio text-orange-500"
              />
              <div>
                <p className="font-semibold">公開</p>
                <p className="text-xs text-gray-500">
                  すべてのユーザーが閲覧できます
                </p>
              </div>
            </label>
            <label className="flex items-center p-3 space-x-3 cursor-pointer">
              <input
                type="radio"
                name="privacy"
                checked={!isPublic}
                onChange={() => setIsPublic(false)}
                className="form-radio text-orange-500"
              />
              <div>
                <p className="font-semibold">非公開</p>
                <p className="text-xs text-gray-500">
                  自分のみ閲覧できます
                </p>
              </div>
            </label>
          </div>
        </section>

        {/* SNS 共有 */}
        <section>
          <h2 className="font-bold text-gray-800 mb-2">SNSでシェア</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={shareX}
              className="flex items-center justify-center space-x-2 bg-black text-white rounded-xl py-3"
            >
              <Image src="/x-logo.svg" alt="X-logo" width={ICON_SIZE} height={ICON_SIZE} />
            </button>
            <button
              onClick={shareFacebook}
              className="flex items-center justify-center space-x-2 bg-[#0866FF] text-white rounded-xl py-3"
            >
              <Image src="/facebook-logo.png" alt="Facebook-logo" width={ICON_SIZE} height={ICON_SIZE} />
            </button>
          </div>
        </section>

        <button
          className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 disabled:opacity-60"
          onClick={handleSave}
          disabled={isSaved}
        >
          {isSaved ? (
            <span className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" /> 記録しました！
            </span>
          ) : (
            "寄付を記録する"
          )}
        </button>
      </div>

      <BottomNavigation activeTab="save" />
    </div>
  )
}
