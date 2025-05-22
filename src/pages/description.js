import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Info, Package  } from "lucide-react";
import Link from "next/link"

export default function DonationInfo() {

  const [foodBank, setFoodBank] = useState(null);
  const router = useRouter();

  useEffect(() => {
    console.log("useEffect");
    const selectedFoodBank = sessionStorage.getItem("selectedFoodBank");
    if (selectedFoodBank) {
      setFoodBank(JSON.parse(selectedFoodBank));
      console.log(JSON.parse(selectedFoodBank));
    } else {
      router.push("/"); // データがなければトップへ
    }
  }, []);

  const cautionList = foodBank?.cautionList || [
    "賞味期限が近い食品は受け付けていません。",
    "開封済みの食品は受け付けていません。",
  ]
  const necessaryFoodList = foodBank?.necessaryFoodList || []

  const donationMethods = [
    { icon: "map-pin", type: "直接持ち込み", note: "フードバンクの指定場所にお持ちください。", detail: "新宿区西新宿1-1-1 新宿フードバンクビル 1F" },
    { icon: "truck", type: "集荷依頼", note: "ボランティアスタッフがご自宅まで集荷に伺います。", detail: "集荷可能日: 毎週土日 13:00〜18:00" }
  ];

  if (!foodBank) {
    return <div className="p-4 text-gray-600">読み込み中...</div>;
  }
  return ( 
    <div className="flex flex-col h-screen"> 
    <Header />

    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <ArrowLeft className="text-orange-500" onClick={() => router.back()} />
        <h1 className="text-lg font-bold text-gray-800">寄付情報</h1>
      </div>

      {/* Food bank name */}
      <div className="flex items-center space-x-3">
        <div className="bg-yellow-100 p-2 rounded-xl">
          <Package className="text-orange-600 w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">{foodBank.name}</h2>
      </div>

      {/* 寄付方法 */}
      <h3 className="text-md font-bold text-gray-800 mt-4 mb-0">寄付方法</h3>
      <p className="text-xs font-bold text-gray-400 mb-4">※ 生成AIの情報であるため、間違いを含む可能性があります。詳細はページ下部から公式ページを確認ください。</p>
      <div className="border border-gray-200 text-sm text-gray-750 rounded-xl p-4 space-y-3">
        <p>{foodBank.donationMethod}</p>
      </div>

        
       {/* 必要な食品 */}
       {necessaryFoodList.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-md font-bold text-gray-800">特に必要としている食品</h3>
            <div className="flex flex-wrap gap-2">
              {necessaryFoodList.map((label) => (
                <span
                  key={label}
                  className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {label}
              </span>
              ))}
            </div>
          </div>
       )}

      {/* 注意事項 */}
      <div className="bg-gray-200 rounded-xl p-4 shadow space-y-3">
        <div className="flex items-center space-x-2">
          <Info className="text-gray-800" />
          <h4 className="font-bold text-gray-800">寄付の注意事項</h4>
        </div>
        <ul className="text-sm text-gray-750 list-disc pl-5 space-y-1">
          {cautionList.map((caution, index) => (
            <li key={index}>{caution}</li>
          ))}
        </ul>
      </div>

      {/* ボタン */}
      <div className="space-y-3">
        <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600">
          <Link className="flex items-center justify-center gap-2" href={foodBank.url || "https://foodbanking.or.jp/"} target="_blank">
            <span>フードバンクの詳細</span>
          </Link>
        </button>
        <button className="w-full border-2 border-orange-500 text-orange-500 font-bold py-3 rounded-xl hover:bg-orange-50">
          寄付を記録する
        </button>
      </div>
      </div>

      <BottomNavigation activeTab="camera" />
    </div>

  );
}
