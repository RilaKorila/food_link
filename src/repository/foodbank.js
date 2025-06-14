import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * フードバンクのマーカー情報を取得
 * @returns {Promise<Array<{id:number, name:string, lat:number, lng:number}>>}
 */
export async function fetchFoodbankMarkers() {
  // foodbank, foodbank_addressをJOINして取得
  const { data, error } = await supabase
    .from('foodbank')
    .select(`id, name, address:foodbank_address(latitude, longitude)`)

  if (error) throw error
  return (data || []).flatMap(fb => {
    if (Array.isArray(fb.address)) {
      return fb.address.map(address => ({
        id: fb.id,
        name: fb.name,
        lat: address?.latitude,
        lng: address?.longitude,
      }))
    }
  }).filter(m => m.lat && m.lng)
}
