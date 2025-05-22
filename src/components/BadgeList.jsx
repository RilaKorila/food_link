import Badge from "./Badge";

const badgeData = [
  { title: "初めての支援", description: "初めての寄付", unlocked: true },
  { title: "学び支援者", description: "学生支援3回達成", unlocked: true },
  { title: "医療支援者", description: "医療支援3回達成", unlocked: true },
  { title: "継続支援者", description: "3ヶ月連続寄付", unlocked: false },
  { title: "地域の守護者", description: "同じ地域に5回寄付", unlocked: false },
  { title: "食の救世主", description: "50kg以上の食品寄付", unlocked: false },
];

export default function BadgeList() {
  return (
    <div className="mt-6 rounded-xl p-4 shadow text-center bg-white">
      <h2 className="font-semibold text-gray-700 mb-4">獲得バッジ</h2>
      <div className="grid grid-cols-3 gap-4">
        {badgeData.map((badge, i) => (
          <Badge key={i} {...badge} />
        ))}
      </div>
    </div>
  );
}
