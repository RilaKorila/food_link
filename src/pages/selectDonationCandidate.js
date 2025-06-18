import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { createClient } from '@/utils/supabase/server-props'
import Header from "@/components/Header"
import BottomNavigation from "@/components/BottomNavigation"

export default function SaveDonation({ user }) {
  const router = useRouter()

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

        <button onClick={() => router.push("/donationCandidate")}
        className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold text-sm hover:bg-orange-600"
        >
            寄付候補から選択する
        </button>

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
