/**
 * Foodbankマーカーのモデル
 * @typedef {Object} FoodbankMarker
 * @property {number} id
 * @property {string} name
 * @property {number} lat
 * @property {number} lng
 * @property {string} url
 * @property {string[]} [targets]
 */

/**
 * DBから受け取ったfoodbankデータをFoodbankMarkerモデル配列に変換
 * @param {Array} dbData
 * @returns {FoodbankMarker[]}
 */
export function toFoodbankMarkers(dbData) {
  return (dbData || []).flatMap(fb => {
    const addresses = Array.isArray(fb.address) ? fb.address : [fb.address]
    return addresses.filter(Boolean).map(address => ({
      id: fb.id,
      name: fb.name,
      pos: {
        latitude: address?.latitude,
        longitude: address?.longitude,
      },
      url: fb.website ? fb.website.url : '',
      targets: (fb.targets || []).map(t => t.category?.name).filter(Boolean)
    }))
  }).filter(m => m.pos.latitude && m.pos.longitude)
}
