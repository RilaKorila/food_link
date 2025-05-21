import { useRouter } from 'next/router'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/component'
import { Eye } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  async function logIn() {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.error(error)
    } else {
      router.push('/')
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-6 space-y-6">
        {/* アイコンとタイトル */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="text-orange-500 text-2xl font-bold">🍙</span>
          </div>
          <h1 className="text-xl font-bold">FoodLink</h1>
          <p className="text-sm text-gray-500">アカウントにログイン</p>
        </div>

        {/* フォーム */}
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-gray-700 block mb-1">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full px-4 py-2 border rounded-lg text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-semibold text-gray-700 block mb-1">
              パスワード
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Eye className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* オプション・リンク */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span>ログイン状態を保持</span>
            </label>
            <a href="#" className="text-orange-500 font-semibold">
              パスワードを忘れた
            </a>
          </div>

          {/* ログインボタン */}
          <button
            type="button"
            onClick={logIn}
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-bold shadow"
          >
            ログイン
          </button>

          {/* 新規登録 */}
          <p className="text-center text-sm text-gray-600 mt-4">
            アカウントをお持ちでない方は{' '}
            <button type="button" onClick={() => router.push("/signup")} className="text-orange-500 font-bold">
              新規登録
            </button>
          </p>
        </form>
      </div>
    </main>
  )
}
