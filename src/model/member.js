/**
 * 会員モデル
 * @typedef {Object} Member
 * @property {string} id - ユーザーID
 * @property {string} name - 表示名
 * @property {string} icon - アイコン画像URLや絵文字
 */

/**
 * SupabaseのuserテーブルのレコードをMemberモデルに変換
 * @param {Object} row
 * @returns {Member}
 */
export function toMember(row) {
  return {
    id: row.id,
    name: row.nickname,
//    icon: row.member_icon?.image || '',
  }
}
