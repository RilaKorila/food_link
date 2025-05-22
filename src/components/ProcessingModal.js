import { CheckCircle, Circle } from 'lucide-react'

export default function ProcessingModal({
    visible,
    progress,
    errorAtDetection,
    onRetry
  }) {

    return visible ? (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 w-[320px] space-y-4 text-center">
          <div className="flex justify-center">
            <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-xl">❤️</span>
            </div>
          </div>
          <h2 className="text-lg font-bold">おすすめの寄付先を探しています</h2>
          <p className="text-sm text-gray-500">マッチングするフードバンクを検索中...</p>
  
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-2 bg-orange-500 rounded-full transition-[width] ease-in-out duration-700"
              style={{ width: `${progress}%` }}
            />
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
                最適なフードバンクを検索
              </span>
            </div>
          </div>
  
          {/* エラーメッセージと再試行 */}
          {progress === 50 && errorAtDetection && (
            <div className="mt-4">
              <p className="text-red-500 text-sm font-semibold mb-2">
                食品を認識できませんでした
              </p>
              <button
                onClick={onRetry}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm"
              >
                もう一度撮影する
              </button>
            </div>
          )}
        </div>
      </div>) 
        : null
  }
  