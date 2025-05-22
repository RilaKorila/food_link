import BottomNavigation from "@/components/BottomNavigation"
import Header from "@/components/Header"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Info, Package, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function DonationInfo() {

  const [foodBank, setFoodBank] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const selectedFoodBank = sessionStorage.getItem("selectedFoodBank")
    if (selectedFoodBank) {
      setFoodBank(JSON.parse(selectedFoodBank))
    } else {
      router.push("/")
    }
  }, [])

  if (!foodBank) {
    return <div className="p-4 text-gray-600">読み込み中...</div>
  }

  const cautionList = foodBank?.cautionList || [
    "未開封で賞味期限が1ヶ月以上あるものをお願いします",
    "生鮮食品・アルコール類は対象外",
    "食品は清潔な状態でお持ちください",
  ]

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* 戻る */}
        <div className="flex items-center space-x-2">
          <ArrowLeft className="text-orange-500" onClick={() => router.back()} />
          <h1 className="text-lg font-bold text-gray-800">寄付情報</h1>
        </div>

        {/* フードバンク名 */}
        <div className="flex items-center space-x-3">
          <div className="bg-yellow-100 p-2 rounded-xl">
            <Package className="text-orange-600 w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">{foodBank.name}</h2>
        </div>

        {/* 寄付方法 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center space-x-2 mb-0">
            <h4 className="font-bold text-gray-800">寄付方法</h4>
          </div>
          <p className="text-[10px] text-gray-400">
            ※ 生成AIの情報であるため、間違いを含む可能性があります。
            詳細は公式ページをご確認ください。
          </p>
          <p className="text-sm text-gray-700">{foodBank.donationMethod}</p>
          <Link
            href={foodBank.url || "https://foodbanking.or.jp/"}
            target="_blank"
            className="inline-flex items-center justify-center gap-2 bg-orange-50 text-orange-700 font-semibold text-sm py-2 px-4 rounded-lg w-fit"
          >
            <ExternalLink className="w-4 h-4" />
            公式ページ
          </Link>
        </div>

        {/* 注意事項 */}
        <div className="bg-gray-100 rounded-xl p-4 space-y-3">
          <div className="flex items-center space-x-2">
            <Info className="text-gray-800" />
            <h4 className="font-bold text-gray-800">寄付の注意事項</h4>
          </div>
          <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
            {cautionList.map((caution, index) => (
              <li key={index}>{caution}</li>
            ))}
          </ul>
        </div>

        {/* 記録ボタン */}
        <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600"
        onClick={() => {router.push("/")}}>
          寄付を記録する
        </button>
      </div>

      <BottomNavigation activeTab="camera" />
    </div>
  )
}
