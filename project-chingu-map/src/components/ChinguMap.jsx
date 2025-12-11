import React, { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { User, Code, Rocket, Target, Calendar } from "lucide-react";

const RecenterMap = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (data.length > 0) {
      try {
        const bounds = L.latLngBounds(data.map((d) => d.coordinates));
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 4 });
      } catch (e) {
        console.warn("Could not fit bounds", e);
      }
    } else {
      map.setView([20, 0], 2);
    }
  }, [data, map]);

  return null;
};

function getFlagEmoji(countryCode) {
  if (!countryCode) return "🏳️";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const CountryMarker = React.memo(({ group }) => {
  const count = group.members.length;

  const icon = useMemo(() => {
    return L.divIcon({
      className: "custom-marker",
      html: `
        <div class="relative flex items-center justify-center w-10 h-10 group cursor-pointer transition-transform hover:scale-110">
          <div class="absolute inset-0 bg-brand-dark rounded-full shadow-xl border-2 border-white"></div>
          <span class="relative text-white font-bold text-sm z-10">${count}</span>
          ${
            count > 5
              ? '<div class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-green rounded-full border-2 border-white z-20"></div>'
              : ""
          }
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -24],
    });
  }, [count]);

  return (
    <Marker position={group.coordinates} icon={icon}>
      <Popup className="custom-popup" closeButton={false} minWidth={300}>
        <div className="flex flex-col w-full font-sans">
          <div className="bg-brand-dark text-white p-4 sticky top-0 z-10 rounded-t-xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-xl flex items-center gap-3">
                  <span
                    className="text-3xl shadow-sm"
                    role="img"
                    aria-label={`Flag of ${group.countryName}`}
                  >
                    {getFlagEmoji(group.countryCode)}
                  </span>
                  <span className="leading-tight">{group.countryName}</span>
                </h3>
                <p className="text-xs text-brand-green mt-1 font-bold tracking-wider uppercase ml-1">
                  {count} {count === 1 ? "Member" : "Members"} Found
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-y-auto max-h-[300px] p-2 custom-scrollbar">
            {group.members.map((member, idx) => (
              <div
                key={idx}
                className="p-3 mb-2 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-purple/30 transition-all group/card"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap gap-2 mb-1">
                    {member["Voyage Role"] && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold bg-brand-dark/5 text-brand-dark uppercase tracking-wider">
                        <Rocket size={12} className="text-brand-purple" />
                        {member["Voyage Role"]}
                      </span>
                    )}
                    {member["Role Type"] && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 uppercase tracking-wider border border-blue-100">
                        <Code size={12} />
                        {member["Role Type"]}
                      </span>
                    )}
                  </div>

                  <div className="flex items-start gap-2 text-gray-700 text-xs leading-relaxed bg-gray-50 p-2 rounded-lg">
                    <Target size={14} className="mt-0.5 text-brand-orange " />
                    <span className="font-medium">
                      {member.Goal || "No goal specified"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 mt-1 border-t border-gray-50 text-[10px] text-gray-400 font-medium">
                    <div className="flex items-center gap-1.5">
                      <User size={12} />
                      <span className="capitalize">
                        {member.Gender?.toLowerCase() || "Unspecified"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {new Date(member.Timestamp).toLocaleDateString(
                        undefined,
                        { month: "short", year: "numeric" }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Popup>
    </Marker>
  );
});

const ChinguMap = ({ data }) => {
  const southWest = L.latLng(-90, -180);
  const northEast = L.latLng(90, 180);
  const bounds = L.latLngBounds(southWest, northEast);

  return (
    <div className="w-full h-[600px] lg:h-[calc(100vh-140px)] rounded-3xl overflow-hidden border-2 border-brand-dark shadow-retro relative z-0 bg-gray-100">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
        preferCanvas={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          noWrap={true}
        />

        <RecenterMap data={data} />

        {data.map((group) => (
          <CountryMarker key={group.countryCode} group={group} />
        ))}
      </MapContainer>
    </div>
  );
};

export default ChinguMap;
