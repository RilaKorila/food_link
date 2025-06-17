import { fetchMemberProfile } from '@/repository/member'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  const { user_id } = req.query
  if (!user_id) {
    res.status(400).json({ error: 'user_id is required' })
    return
  }
  try {
    const profile = await fetchMemberProfile(user_id)
    res.status(200).json({ profile })
  } catch (error) {
    console.error('Error fetching member profile:', error)
    res.status(500).json({ error: error.message })
  }
}
