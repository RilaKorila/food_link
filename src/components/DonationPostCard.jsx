import { Heart } from "lucide-react"

function formatRelativeTime(isoString) {
  const created = new Date(isoString)
  const now = new Date()

  // 負の差分（未来日付）は考慮せず、0 を返す
  const diffMs = Math.max(now.getTime() - created.getTime(), 0)
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  // 1) 24時間以内 → 時間単位
  if (diffHours < 24) {
    return `${diffHours}時間前`
  }

  // 2) 年が同じなら日付単位
  if (now.getFullYear() === created.getFullYear()) {
    return `${diffDays}日前`
  }

  // 3) 年が違う → 年単位
  const diffYears = now.getFullYear() - created.getFullYear()
  return `${diffYears}年前`
}

export default function DonationPostCard({ post }) {
    const postedAt = formatRelativeTime(post.createdAt)

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
      {/* 投稿ヘッダー */}
      <div className="flex items-start justify-between">
        <div className="flex space-x-3">
          <div className="bg-orange-100 text-orange-600 font-bold w-9 h-9 rounded-full flex items-center justify-center">
            {post.user.icon}
          </div>
          <div>
            <p className="font-bold text-sm">{post.user.name}</p>
            <p className="text-xs text-gray-500">{post.user.location} に寄付</p>
          </div>
        </div>
        <p className="text-xs text-gray-500">{postedAt}</p>
      </div>

      <p className="text-sm text-gray-800 whitespace-pre-wrap">{post.message}</p>

      {post.image && (
        <div className="rounded-xl overflow-hidden bg-gray-100">
          <img src={post.image} alt="donation" className="w-full object-cover" />
        </div>
      )}
      {!post.image && (
        <div className="rounded-xl h-40 bg-gray-100 flex items-center justify-center text-gray-400">
          <span className="text-sm">📷</span>
        </div>
      )}

      <div className="flex justify-between items-center text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1 text-orange-500">
            <Heart className="w-4 h-4" /> <span>{post.likes}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
