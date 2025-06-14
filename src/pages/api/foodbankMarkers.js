import { fetchFoodbankMarkers } from '@/repository/foodbank'

export default async function handler(req, res) {
  try {
    const foodbankMarkers = await fetchFoodbankMarkers()
    res.status(200).json({ foodbankMarkers })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
