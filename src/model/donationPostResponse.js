/**
 * 寄付投稿モデル
 * @typedef {Object} DonationPostResponse
 * @property {number} id - 投稿ID
 * @property {Object} user - 投稿ユーザー
 * @property {string} user.id - ユーザーID
 * @property {string} user.icon - ユーザーアイコン
 * @property {string} user.nickname - ニックネーム
 * @property {string} content - 投稿内容
 * @property {string} recipient - 受け取り先
 * @property {string[]} images - 画像URL配列
 * @property {boolean} isPublic - 公開フラグ
 * @property {string} createdAt - 作成日時
 */

// TODO donationPostモデルと同じにする

/**
 * Supabaseのpostテーブルのレコードをアプリ用のDonationPostResponseオブジェクトに変換
 * @param {Object} row - Supabaseのpostレコード
 * @returns {DonationPostResponse} DonationPostResponseオブジェクト
 */
export function toDonationPostResponse(row) {

  return {
    id: row.id,
    user: {
      id: row.member_id || row.user_id || '',
      icon: '🍙',
      nickname: row.nickname || '',
    },
    content: row.content || '',
    recipient: row.recipient || 'フードバンク新宿',
    images: row.images || [],
    isPublic: row.is_public ?? true,
    createdAt: row.created_at
  }
}

/**
 * 複数レコードをDonationPostResponseオブジェクト配列に変換
 * @param {Array} rows
 * @returns {DonationPostResponse[]}
 */
export function toDonationPostResponses(rows) {
  return Array.isArray(rows) ? rows.map(toDonationPostResponse) : []
}
