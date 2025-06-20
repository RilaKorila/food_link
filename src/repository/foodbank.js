import { createClient } from '@/utils/supabase/static-props'
import { toFoodbankMarkers } from '@/model/foodbank'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * フードバンクのマーカー情報を取得
 * @returns {Promise<Array<{id:number, name:string, pos:{latitude:number,longitude:number}, url:string, targets:string[]}>>}
 */
export async function fetchFoodbankMarkers() {
  const { data, error } = await supabase
    .from('foodbank')
    .select(`
      id,
      name,
      address:foodbank_address(latitude, longitude),
      website:foodbank_website(url),
      targets:foodbank_target(foodbamk_target_category_id, category:foodbank_target_category(name))
    `)
  if (error) throw error
  return toFoodbankMarkers(data)
}
