import { createClient } from '@supabase/supabase-js'
import { toMember } from '@/model/member'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * auth.userテーブルのuuidを紐付けて、auth.display_nameとpublicテーブルのmember_iconのimageを取得
 * @param {string} userId - auth.userテーブルのuuid
 * @returns {Promise<Member>} Memberモデル
 */
export async function fetchMemberProfile(userId) {
  const { data, error } = await supabase
    .from('member_profile')
    .select(`
      id,
      nickname
    `)
    .eq('id', userId)
    .single()
  if (error) throw error

  console.log("data: ", data)
  return toMember(data)
}
