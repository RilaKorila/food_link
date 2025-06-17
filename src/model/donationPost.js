/**
 * 寄付投稿モデル
 * @typedef {Object} DonationPost
 * @property {number} id - 投稿ID
 * @property {Member} memberId - 会員ID
 * @property {string} content - 投稿内容
 * @property {string} recipient - 受け取り先
 * @property {string[]} images - 画像URL配列
 * @property {boolean} isPublic - 公開フラグ
 * @property {string} createdAt - 作成日時
 */

class DonationPost {
  constructor(id, memberId, content, recipient, images, isPublic) {
    this.id = id;
    this.memberId = memberId;
    this.content = content || '';
    this.recipient = recipient;
    this.images = images || [];
    this.isPublic = isPublic;
    this.createdAt = new Date().toISOString();
  }
}

/**
 * Supabaseのpostテーブルのレコードをアプリ用のDonationPostオブジェクトに変換
 * @param {Object} row - Supabaseのpostレコード
 * @returns {DonationPost} DonationPostオブジェクト
 */
export function toDonationPost(row) {
  return {
    id: row.id,
    memberId: row.member_id,
    content: row.content || '',
    recipient: "", // TODO 受け取り先も含める
    images: [], // TODO 画像も含める
    createdAt: row.created_at
  }
}

/**
 * 複数レコードをDonationPostオブジェクト配列に変換
 * @param {Array} rows
 * @returns {DonationPost[]}
 */
export function toDonationPosts(rows) {
  return Array.isArray(rows) ? rows.map(toDonationPost) : []
}
