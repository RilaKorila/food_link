import { ExternalLink } from "lucide-react";

export default function FoodBankMapPopup({ marker }) {
  return (
    <div className="space-y-2 max-w-xs">
      {/* タイトル */}
      <h3 className="font-semibold text-base text-gray-900">
        {marker.name}
      </h3>

      <hr className="border-gray-200" />

      {/* 公式サイトリンク */}
      {marker.url && (
        <p className="text-sm">
          <a
            href={marker.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-orange-500 hover:underline"
          >
            <span>公式サイト</span>
            <ExternalLink size={16} />
          </a>
        </p>
      )}

      {/* 対象カテゴリ（タグ） */}
      {marker.targets && marker.targets.length > 0 && (
        <div className="flex flex-wrap gap-1 text-xs text-gray-700">
          {marker.targets.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
