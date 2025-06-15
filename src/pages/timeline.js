import { useState } from "react"
import Header from "@/components/Header"
import BottomNavigation from "@/components/BottomNavigation"
import DonationPostCard from "@/components/DonationPostCard"

export default function TimelinePage() {
  const [tab, setTab] = useState("all")

  const dummyPosts = [
    {
      id: 1,
      user: { name: "田中 花子", icon: "田", location: "新宿フードバンク" },
      message:
        "今日は家にあった余った食材を新宿フードバンクに寄付してきました！少しでも地域の方々の役に立てて嬉しいです🍚✨",
      donatedFoods: ["お米", "缶詰（さば）", "インスタント麺"],
      image: null, // or image URL
      likes: 24,
      createdAt: "2025-06-01T12:00:00Z",
    },
    {
      id: 2,
      user: { name: "佐藤 太郎", icon: "佐", location: "渋谷フードバンク" },
      message:
        "カップ麺を寄付しました",
      donatedFoods: ["カップ麺"],
      image: "https://example.com/image.jpg",
      likes: 15,
      createdAt: "2025-05-02T14:30:00Z",
    },
    ,
    {
      id: 3,
      user: { name: "佐藤 太郎", icon: "佐", location: "渋谷フードバンク" },
      message:
        "カップ麺を寄付しました",
      donatedFoods: ["カップ麺"],
      image: "https://example.com/image.jpg",
      likes: 15,
      createdAt: "2023-05-02T14:30:00Z",
    }
  ]

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex flex-col overflow-y-auto bg-gray-50">
        <div className="sticky top-0 z-30 bg-gray-50 pb-2 px-4">
          <h1 className="text-xl font-bold pt-4">みんなの寄付</h1>
          <div className="flex space-x-6 text-sm font-semibold border-b">
            {['すべて', '近くの寄付'].map((label, idx) => {
              const value = ['all', 'nearby'][idx]
              return (
                <button
                  key={label}
                  onClick={() => setTab(value)}
                  className={`pb-2 ${
                    tab === value ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
        <div className="flex-1 px-4 py-6 space-y-6">
          {dummyPosts.map((post) => (
            <DonationPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <BottomNavigation activeTab="timeline" />
    </div>
  )
}
