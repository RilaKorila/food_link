import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export default function FoodBankMap({ markers }) {
  // クリックされたマーカーを保持
  const [activeMarker, setActiveMarker] = useState(null)

  const createCustomIcon = () =>
    new L.DivIcon({
      html: `<div style="
        background:#f97316;
        border-radius:50%;
        width:32px;height:32px;
        display:flex;align-items:center;justify-content:center;
        color:#fff;font-size:20px;font-weight:bold;
      ">
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-package' viewBox='0 0 24 24'>
          <path d='M16.5 9.4 7.55 4.24'/>
          <path d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z'/>
          <path d='M3.3 7L12 12.4l8.7-5.4'/>
          <path d='M12 22V12.4'/>
        </svg>
      </div>`,
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
                {/* <ul className="text-sm text-gray-600 leading-tight">
                  {m.tags.map((tag) => (
                    <li key={tag}>• {tag}</li>
                  ))}
                </ul> */}
              </div>
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  )
}
