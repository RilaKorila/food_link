import { Lock, Leaf, GraduationCap, Stethoscope, HelpingHand, ShieldCheck, Utensils } from "lucide-react";

const ICONS = {
  "学び支援者": <GraduationCap className="text-green-600 w-6 h-6" />,
  "医療支援者": <Stethoscope className="text-red-500 w-6 h-6" />,
  "初めての支援": <HelpingHand className="text-yellow-500 w-6 h-6" />,
  "地域の守護者": <ShieldCheck className="text-blue-500 w-6 h-6" />,
  "食の救世主": <Utensils className="text-orange-500 w-6 h-6" />,
  "環境の守護者": <Leaf className="text-green-500 w-6 h-6" />,
  "locked": <Lock className="text-gray-400 w-6 h-6" />,
};

export default function Badge({ title, description, unlocked }) {
  const icon = ICONS[unlocked ? title : "locked"];

  return (
    <div className={`flex flex-col items-center text-center p-3 rounded-xl ${unlocked ? "bg-white shadow" : "bg-gray-100"}`}>
      {icon}
      <p className="text-[10px] font-medium mt-2">{title}</p>
      <p className="text-[6px] text-gray-400">{description}</p>
    </div>
  );
}
