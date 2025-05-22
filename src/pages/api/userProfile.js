import { createClient } from '@/utils/supabase/server-props'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('user_profile')
      .select('profile_img_url')
      .eq('id', user.id)
      .single()    

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({ profiles: data })
  } catch (e) {
    console.error('API error:', e)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
