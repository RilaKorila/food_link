import { useRouter } from 'next/router'
import { useState } from 'react'
import { Eye } from 'lucide-react'
import { createClient } from '@/utils/supabase/component'

export default function SignUpPage() {
  const router = useRouter()
  const supabase = createClient()

  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSignUp() {
    setErrorMessage('') // まずエラーメッセージをリセット

    if (password !== passwordConfirm) {
      alert("パスワードが一致しません")
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname: nickname,
        },
      },
    })

    if (error) {
      console.error(error)
      setErrorMessage(error.message)
    } else {
      router.push('/')
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-6 space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center space-x-3">
          <div className="bg-yellow-100 rounded-full w-10 h-10 flex items-center justify-center">
            <span className="text-orange-500 text-lg font-bold">←</span>
          </div>
          <h1 className="text-xl font-bold">新規アカウント登録</h1>
        </div>

        {/* 名前 */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">ニックネーム</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="おにぎり"
              className="w-full px-4 py-2 border rounded-lg text-sm"
            />
          </div>
        </div>

        {/* メール */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">メールアドレス</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="onigiri@email.com"
            className="w-full px-4 py-2 border rounded-lg text-sm"
          />
        </div>

        {/* パスワード */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">パスワード</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-sm pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Eye className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* パスワード（確認） */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            パスワード（確認）
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-sm pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Eye className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* エラーメッセージ */}
        {errorMessage && (
            <div className="text-red-600 text-sm font-medium text-center">
                {errorMessage}
            </div>
        )}

        {/* ボタン */}
        <button
          type="button"
          onClick={handleSignUp}
          className="w-full bg-orange-500 text-white py-2 rounded-lg font-bold shadow"
        >
          アカウント作成
        </button>

        {/* ログインリンク */}
        <p className="text-center text-sm text-gray-600">
          すでにアカウントをお持ちの方は{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-orange-500 font-bold"
          >
            ログイン
          </button>
        </p>
      </div>
    </main>
  )
}
