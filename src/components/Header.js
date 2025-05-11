"use client"

import { Menu } from "lucide-react"
import Image from "next/image"

export default function Header() {
return (
    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
        <Menu size={24} className="text-[#24262b]" />
        <h1 className="text-xl font-medium">Food Link</h1>
        <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
                src="/placeholder.svg?height=32&width=32"
                alt="Profile"
                width={32}
                height={32}
                className="object-cover"
            />
        </div>
    </div>
)
}
