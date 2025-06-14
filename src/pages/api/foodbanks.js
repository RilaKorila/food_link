import { fetchFoodbankMarkers } from '@/repository/foodbank'

export default async function handler(req, res) {
  try {
    const markers = await fetchFoodbankMarkers()
    res.status(200).json({ markers })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
