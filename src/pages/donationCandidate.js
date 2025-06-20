import { Package } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/router"

const dummyDonations = [
  {
    id: 1,
    date: "2025年6月10日",
    items: ["オートミール"],
    foodbank: { name: "NPO法人フードバンク新宿", address: "東京都新宿区" },
    image: "/meal_photo.png", // 実際はURLを指定
  },
]

export default function ReportDonationList() {
  const router = useRouter()

  const handleReport = (donationId) => {
    sessionStorage.setItem("selectedFoodBank", dummyDonations[donationId-1].foodbank.name)
    sessionStorage.setItem("detectedFoods", JSON.stringify(dummyDonations[donationId-1].items))
    router.push(`/SaveDonation`)
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <h1 className="text-lg font-bold text-gray-900 mb-4">寄付候補 一覧</h1>

      {dummyDonations.map((donation) => (
        <div
          key={donation.id}
          className="bg-white rounded-xl shadow-sm p-4 mb-6"
        >
          <div className="rounded-lg h-36 flex items-center justify-center mb-4">
            {/* 仮画像 */}
            <Image
              src={donation.image}
              alt="寄付食品の写真"
              width={100}
              height={200}
            />
          </div>

          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-500">撮影日: {donation.date}</p>
            <button
              onClick={() => handleReport(donation.id)}
              className="text-orange-600 bg-orange-100 text-sm px-3 py-1 rounded-full font-semibold"
            >
              この寄付を記録
            </button>
          </div>

          <div className="mb-2">
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {donation.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-3 flex items-center bg-orange-50 p-3 rounded-lg">
            <Package className="text-orange-600 w-5 h-5"/>
            <div className="ml-2 text-sm">
              <p className="font-bold">{donation.foodbank.name}</p>
              <p className="text-gray-600">{donation.foodbank.address}</p>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => router.push("/createDonation")}
        className="w-full mt-4 py-3 bg-orange-500 text-white rounded-xl font-semibold text-sm hover:bg-orange-600"
      >
        新しく寄付を作成する
      </button>
    </div>
  )
}
