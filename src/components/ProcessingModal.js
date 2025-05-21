import { CheckCircle, Circle } from 'lucide-react'

export default function ProcessingModal({ visible = false, progress = 0 }) {
    if (!visible) return null
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 w-[300px] space-y-4 text-center">
          <div className="flex justify-center">
            <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-xl">❤️</span>
            </div>
          </div>
          <h2 className="text-lg font-bold">寄付を処理しています</h2>
          <p className="text-sm text-gray-500">マッチングするフードバンクを検索中...</p>
  
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-2 bg-orange-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-500 flex justify-between">
            <span className="text-orange-500 font-semibold">{progress}%</span>
            <span>ステップ {progress < 100 ? '1/2' : '2/2'}</span>
          </div>
  
          <div className="space-y-2 text-left text-sm mt-2">
            <div className="flex items-center space-x-2">
              {progress >= 50 ? (
                <CheckCircle size={16} className="text-orange-500" />
              ) : (
                <Circle size={16} className="text-gray-400" />
              )}
              <span>食品情報の分析</span>
            </div>
            <div className="flex items-center space-x-2">
              {progress === 100 ? (
                <CheckCircle size={16} className="text-orange-500" />
              ) : (
                <Circle size={16} className="text-gray-400" />
              )}
              <span className={progress === 100 ? 'font-semibold' : ''}>
                最適なフードバンクを検索中
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  