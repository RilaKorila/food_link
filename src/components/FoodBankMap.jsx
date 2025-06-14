import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export default function FoodBankMap({ markers }) {
  // クリックされたマーカーを保持
  const [activeMarker, setActiveMarker] = useState(null)

  // カスタムアイコン（お好みで）
  const createCustomIcon = () =>
    new L.DivIcon({
      html: `<div style="
        background:#f97316;
        border-radius:50%;
        width:32px;height:32px;
        display:flex;align-items:center;justify-content:center;
        color:#fff;font-size:16px;font-weight:bold;
      ">🍲</div>`,
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 32], // 先端が座標に合うよう調整
    })

  return (
    <MapContainer
      center={[35.68, 139.76]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {markers.map((m) => (
        <Marker
          key={m.id}
          position={[m.lat, m.lng]}
          icon={createCustomIcon()}

          // クリック時に state に保持
          eventHandlers={{
            click: () => setActiveMarker(m),
          }}
        >
          {/* クリックされたマーカーだけ Popup を表示 */}
          {activeMarker?.id === m.id && (
            <Popup
              position={[m.lat, m.lng]}
              onClose={() => setActiveMarker(null)}
              closeButton={false}
            >
              <div className="space-y-1">
                <h3 className="font-semibold text-base">{m.name}</h3>
                <ul className="text-sm text-gray-600 leading-tight">
                  {m.tags.map((tag) => (
                    <li key={tag}>• {tag}</li>
                  ))}
                </ul>
              </div>
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  )
}
