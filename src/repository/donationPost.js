import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * 寄付投稿をDBに保存する
 * @param {Object} donationPost - 投稿データ
 * @param {string} donationPost.memberId
 * @param {string} donationPost.content
 * @param {string} donationPost.recipient
 * @param {boolean} donationPost.is_public
 * @returns {Promise<Object>} 登録結果
 */
export async function saveDonationPost({ memberId, content, recipient, isPublic: isPublic }) {
    if (!memberId) throw new Error('User ID is required')

    const recipiendId = 1 // TODO フードバンクIDを固定値
    const { data, error } = await supabase
        .from('donation')
        .insert([
        {
            // idは自動生成されるため、指定しない,
            member_id: memberId,
            content: content,
            recipient_id: recipiendId,
            is_public: isPublic,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        },
        ])

    if (error) throw error
    return data
}
