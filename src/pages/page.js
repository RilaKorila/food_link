import { useState } from "react"
import Header from "@/components/Header"
import BottomNavigation from "@/components/BottomNavigation"

export default function Page() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="relative min-h-screen flex flex-col bg-white pb-20">
      <Header />

      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="p-4 bg-gray-100 rounded">
            Box {i + 1}
          </div>
        ))}
      </main>

      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
