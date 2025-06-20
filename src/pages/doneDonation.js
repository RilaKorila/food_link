import { useRouter } from "next/router"
import Image from "next/image"
import { useEffect, useState } from "react"

const ICON_SIZE = 24

export default function DonationComplete() {
    const [selectedFoodBank, setSelectedFoodBank] = useState("")
    const [message, setMessage] = useState("")
    
    const router = useRouter()
    useEffect(() => {
        setSelectedFoodBank(sessionStorage.getItem("donationSelectedFoodBank"))
        setMessage(sessionStorage.getItem("donationMessage"))
    }, [])

    const shareX = () => {
        const text = encodeURIComponent(
        `${selectedFoodBank} に食品を寄付しました！ #フードバンク #FoodLink \n${message}`
        )
        const url  = encodeURIComponent(window.location.origin)
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank")
    }

    const shareFacebook = () => {
        const url  = encodeURIComponent(window.location.origin)
        const text = encodeURIComponent(
        `${selectedFoodBank} に食品を寄付しました！ ${message}`
        )
        window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
        "_blank"
        )
    }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">寄付が完了しました🎉</h1>
      <p className="text-gray-700 mb-8 text-center">
        寄付ありがとうございます📦<br />
        おいしいが必要な人に届きます
      </p>

      <h2 className="font-bold text-gray-800 mb-2">SNSでシェア</h2>

      <div className="flex space-x-4 mb-6">
        <button
            onClick={shareX}
            className="flex items-center justify-center space-x-2 bg-black text-white rounded-xl py-3 px-4 min-w-[120px] hover:bg-gray-800"
        >
            <Image
            src="/x-logo.svg"
            alt="X-logo"
            width={ICON_SIZE}
            height={ICON_SIZE}
            />
        </button>

        <button
            onClick={shareFacebook}
            className="flex items-center justify-center space-x-2 bg-[#0866FF] text-white rounded-xl py-3 px-4 min-w-[120px] hover:bg-[#0753cc]"
        >
            <Image
            src="/facebook-logo.png"
            alt="Facebook-logo"
            width={ICON_SIZE}
            height={ICON_SIZE}
            />
        </button>
        </div>


        <button
        className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 disabled:opacity-60"
        onClick={() => router.push("/timeline")}>
            タイムラインを見る
        </button>
    </div>
  )
}
