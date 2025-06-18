import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import useSWR from 'swr'
import { createClient } from '@/utils/supabase/server-props'
import Header from "@/components/Header"
import BottomNavigation from "@/components/BottomNavigation"
import { Camera, CheckCircle } from "lucide-react"
import { saveDonationPost } from '@/repository/donationPost'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function SaveDonation({ user }) {
  const router = useRouter()
  const { data, error } = useSWR(user.id ? `/api/member?user_id=${user.id}` : null, fetcher)


  /* -------------------------------------------------
   *  state
   * ------------------------------------------------- */
  const [foodBank, setFoodBank] = useState(null)
  const [donatedFoods, setDonatedFoods] = useState([])
  const [imgFile, setImgFile] = useState(null)
  const [imgPreview, setImgPreview] = useState("")
  const [message, setMessage]         = useState("")
  const [isPublic, setIsPublic]       = useState(true)
  const [isSaved, setIsSaved]         = useState(false)
  const fileInputRef                  = useRef(null)
  const [selectedFoodBank, setSelectedFoodBank] = useState("")

  const ICON_SIZE = 24

  /* -------------------------------------------------
   *  初期データ読み込み
   * ------------------------------------------------- */
  useEffect(() => {
    const detectedFoods = sessionStorage.getItem("detectedFoods")
    if (detectedFoods) {
      const foods = JSON.parse(detectedFoods)
      setDonatedFoods(Array.isArray(foods) ? foods : [])
    }

    setSelectedFoodBank(sessionStorage.getItem("selectedFoodBank"))

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
    if (!user) return;

    try {
      await saveDonationPost({
        memberId: user.id,
        content: message,
        recipient: selectedFoodBank,
        isPublic: isPublic,
      })
      setIsSaved(true)

      sessionStorage.setItem("donationSelectedFoodBank", selectedFoodBank)
      sessionStorage.setItem("donationMessage", message)

      setTimeout(() => {router.push("/doneDonation")}, 1500)
    } catch (e) {
      console.log('保存に失敗しました: ' + e.message)
    }
  }



  if (!user) {
    return <div className="p-4 text-gray-600">読み込み中...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <div className="flex items-center">
          <h1 className="text-lg font-bold text-gray-800">寄付をシェア</h1>
        </div>

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

        {/* メッセージ */}
        {selectedFoodBank && (
        <>
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
        </>
    )}
        </div>

      <BottomNavigation activeTab="save" />
    </div>
  )
}

export async function getServerSideProps(context) {
  const supabase = createClient(context)
  const { data, error } = await supabase.auth.getUser()

  if (error || !data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
        user: {
          id: data.user.id,
          email: data.user.email,
          nickname: data.user.user_metadata.first_name
      }
    },
  }
}
