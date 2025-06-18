import { createClient } from '@supabase/supabase-js'
import { toDonationPostResponses } from '@/model/donationPostResponse'

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

/**
 * 寄付投稿を全て取得する
 * @returns {Promise<Object>} 寄付投稿データ
 */
export async function fetchDonationPost() {
    const { data, error } = await supabase
        .from('donation')
        .select(`
            id,
            member_id,
            content,
            recipient_id,
            is_public,
            created_at,
            updated_at,
            member_profile:member_id (nickname)
        `)
        .eq('is_public', true) // 公開されている投稿のみ取得

    if (error) throw error


    // TODO ダミーデータを削除する
    const samplePost = [{
        id: 1,
        member_id: 'sample_user',
        content: 'そうめんがお家にたくさん余っていたので、今日は買い物のついでに、フードバンク目黒に寄付してきました！',
        recipient_id: 1,
        is_public: true,
        created_at: "2025-05-24T00:00:00Z",
        updated_at: "2025-05-24T00:00:00Z",
        member_profile: { nickname: 'りん' }
    },
    {
        id: 2,
        member_id: 'sample_user2',
        content: 'イベントの懇親会用に用意したお菓子がたくさん余ってしまったので、寄付します！このお菓子好きなので、おいしいと思ってくれるといいな',
        recipient_id: 1,
        is_public: true,
        created_at: "2025-06-10T00:00:00Z",
        updated_at: "2025-05-10T00:00:00Z",
        member_profile: { nickname: 'もも' }
    }]

    // samplePostとdataをマージして返す
    const posts = [...data, ...samplePost]

    // member_profileがネストされて返るので、nicknameを展開して渡す
    return toDonationPostResponses(
      posts.map(row => ({
        ...row,
        nickname: row.member_profile?.nickname || '',
      }))
    )
}
