import { useState, useEffect } from "react"
import Header from "@/components/Header"
import BottomNavigation from "@/components/BottomNavigation"
import DonationPostCard from "@/components/DonationPostCard"
import { fetchDonationPost } from "@/repository/donationPost"

export default function TimelinePage() {
  const [tab, setTab] = useState("all")
  const [donationPosts, setdonationPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDonationPost()
      .then(setdonationPosts)
      .catch((e) => console.log(e.message)) // TODO エラーハンドリングを改善する
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-4">読み込み中...</div>

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex flex-col overflow-y-auto bg-gray-50">
        <div className="sticky top-0 z-30 bg-gray-50 pb-2 px-4">
          <h1 className="text-xl font-bold pt-4 pb-2">みんなの寄付</h1>
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
          {donationPosts.map((post) => (
            <DonationPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <BottomNavigation activeTab="timeline" />
    </div>
  )
}
