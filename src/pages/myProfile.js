import { createClient } from '@/utils/supabase/server-props'
import { LogOut, Pencil, User, Lock, Languages } from 'lucide-react'
import { useRouter } from 'next/router'

export default function AccountSettings({ profile }) {
  const router = useRouter()

  const handleLogout = async () => {
    const res = await fetch('/api/logout', { method: 'POST' })
    if (res.ok) {
      router.push('/login')
    }
  }

  if (!profile) {
    return <div className="p-4">プロフィール情報が取得できませんでした。</div>
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <div className="flex items-center space-x-3">
        <div className="bg-orange-300 w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg">
          {'🍙'}
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold">{profile.full_name || '未設定'}</h2>
          <p className="text-sm text-gray-500">{profile.email}</p>
        </div>
        <button className="text-orange-500">
          <Pencil size={18} />
        </button>
      </div>

      {/* アカウント設定 */}
      <div className="bg-white rounded-xl shadow-sm divide-y">
        <Item icon={<User size={18} />} label="個人情報" />
        <Item icon={<Lock size={18} />} label="パスワード変更" />
      </div>

      {/* 言語設定 */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="flex items-center justify-between p-4 text-sm text-gray-700">
          <div className="flex items-center space-x-2">
            <Languages size={18} />
            <span>言語</span>
          </div>
          <span className="text-gray-500">日本語</span>
        </div>
      </div>

      {/* ログアウト */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center text-orange-600 font-bold border border-orange-500 bg-orange-50 py-2 rounded-xl"
      >
        <LogOut size={18} className="mr-2" /> ログアウト
      </button>

      <div className="text-center text-red-500 text-sm mt-2">
        アカウントを削除
      </div>
    </div>
  )
}

function Item({ icon, label }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
      <div className="flex items-center space-x-2 text-sm text-gray-700">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-gray-400">{'>'}</span>
    </div>
  )
}


export async function getServerSideProps(context) {
    const supabase = createClient(context)
  
    const {
      data: { user },
    } = await supabase.auth.getUser()
  
    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
  
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single()
  
    return {
      props: {
        profile: {
          ...profile,
          email: user.email,
        },
      },
    }
  }
