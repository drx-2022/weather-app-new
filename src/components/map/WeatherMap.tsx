import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

interface WeatherMapProps {
  onLocationSelect: (lat: number, lon: number) => void;
  apiKey: string;
  onSaveLocation?: (location: SavedLocation) => void;
  savedLocations?: SavedLocation[];
  date?: number; // Unix timestamp for historical/forecast data
}

interface MapControlsProps {
  onLayerChange: (layer: string) => void;
  activeLayer: WeatherLayer;
}

interface SavedLocation {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

interface CustomMarkerOptions extends L.MarkerOptions {
  saved?: boolean;
}

const WEATHER_LAYERS = {
  TA2: {
    name: 'Temperature (2m)',
    opacity: 0.3,
    fillBound: true,
    palette: '-65:821692;-55:821692;-45:821692;-40:821692;-30:8257DB;-20:208CEC;-10:20C4E8;0:23DDDD;10:C2FF28;20:FFF028;25:FFC228;30:FC8014',
    units: '°C',
  },
  TD2: {
    name: 'Dew Point',
    opacity: 0.3,
    fillBound: true,
    palette: '-65:821692;-55:821692;-45:821692;-40:821692;-30:8257DB;-20:208CEC;-10:20C4E8;0:23DDDD;10:C2FF28;20:FFF028;25:FFC228;30:FC8014',
    units: '°C',
  },
  PAC0: {
    name: 'Convective Precipitation',
    opacity: 0.8,
    fillBound: false,
    palette: '1:ACAAF7;10:8D8AF3;20:706EC2;40:5658FF;100:5B5DB1;200:3E3F85',
    units: 'mm',
  },
  PR0: {
    name: 'Precipitation Intensity',
    opacity: 0.8,
    fillBound: false,
    palette: '0.000005:FEF9CA;0.000009:B9F7A8;0.000014:93F57D;0.000023:78F554;0.000046:50B033;0.000092:387F22;0.000231:204E11;0.000463:F2A33A;0.000694:E96F2D;0.000926:EB4726;0.001388:B02318;0.002315:971D13;0.023150:090A08',
    units: 'mm/s',
  },
  PA0: {
    name: 'Accumulated Precipitation',
    opacity: 0.6,
    fillBound: false,
    palette: '0:00000000;0.1:C8969600;0.2:9696AA00;0.5:7878BE19;1:6E6ECD33;10:5050E1B2;140:1414FFE5',
    units: 'mm',
  },
  PAR0: {
    name: 'Accumulated Rain',
    opacity: 0.6,
    fillBound: false,
    palette: '0:E1C86400;0.1:C8963200;0.2:9696AA00;0.5:7878BE00;1:6E6ECD4C;10:5050E1B2;140:1414FFE5',
    units: 'mm',
  },
  PAS0: {
    name: 'Accumulated Snow',
    opacity: 0.7,
    fillBound: false,
    palette: '0:00000000;5:00D8FFFF;10:00B6FFFF;25.076:9549FF',
    units: 'mm',
  },
  SD0: {
    name: 'Snow Depth',
    opacity: 0.8,
    fillBound: false,
    palette: '0.05:EDEDED;0.1:D9F0F4;0.2:A5E5EF;0.3:7DDEED;0.4:35D2EA;0.5:00CCE8;0.6:706DCE;0.7:514FCC;0.8:3333CC;0.9:1818CC;1.2:C454B7;1.5:C12CB0;1.8:BF00A8;2.5:85408C;3.0:7F2389;4.0:790087;15:E80068',
    units: 'm',
  },
  WS10: {
    name: 'Wind Speed (10m)',
    opacity: 0.6,
    fillBound: false,
    palette: '1:FFFFFF00;5:EECECC66;15:B364BCB3;25:3F213BCC;50:744CACE6;100:4600AFFF;200:0D1126FF',
    units: 'm/s',
  },
  WND: {
    name: 'Wind Speed & Direction',
    opacity: 0.6,
    fillBound: false,
    useNorm: false,
    arrowStep: 32,
    palette: '1:FFFFFF00;5:EECECC66;15:B364BCB3;25:3F213BCC;50:744CACE6;100:4600AFFF;200:0D1126FF',
    units: 'm/s',
  },
  APM: {
    name: 'Pressure',
    opacity: 0.4,
    fillBound: true,
    palette: '94000:0073FF;96000:00AAFF;98000:4BD0D6;100000:8DE7C7;101000:B0F720;102000:F0B800;104000:FB5515;106000:F3363B;108000:C60000',
    units: 'hPa',
  },
  TS0: {
    name: 'Soil Temperature (0-10cm)',
    opacity: 0.8,
    fillBound: true,
    palette: '203.15:491763;228.15:4E1378;235.15:514F9B;239.15:446DA9;243.15:5C85B7;247.15:739FC5;251.15:88A7C9;255.15:6CBCD4;259.15:87CADC;263.15:A7D8E5;267.15:A7D5AD;271.15:D2E9C8;275.15:FEFEBB;279.15:F5CEBB;283.15:F2B68A;287.15:EE934F;291.15:EB702D;295.15:E8706E;303.15:CC2C44;313.15:CC0000;323.15:990000',
    units: 'K',
  },
  TS10: {
    name: 'Soil Temperature (>10cm)',
    opacity: 0.8,
    fillBound: false,
    palette: '203.15:491763;228.15:4E1378;235.15:514F9B;239.15:446DA9;243.15:5C85B7;247.15:739FC5;251.15:88A7C9;255.15:6CBCD4;259.15:87CADC;263.15:A7D8E5;267.15:A7D5AD;271.15:D2E9C8;275.15:FEFEBB;279.15:F5CEBB;283.15:F2B68A;287.15:EE934F;291.15:EB702D;295.15:E8706E;303.15:CC2C44;313.15:CC0000;323.15:990000',
    units: 'K',
  },
  HRD0: {
    name: 'Relative Humidity',
    opacity: 0.8,
    fillBound: true,
    palette: '0:db1200;20:965700;40:ede100;60:8bd600;80:00a808;100:000099;100.1:000099',
    units: '%',
  },
  CL: {
    name: 'Cloudiness',
    opacity: 0.5,
    fillBound: false,
    palette: '0:FFFFFF00;10:FDFDFF19;20:FCFBFF26;30:FAFAFF33;40:F9F8FF4C;50:F7F7FF66;60:F6F5FF8C;70:F4F4FFBF;80:E9E9DFCC;90:DEDEDED8;100:D2D2D2FF;200:D2D2D2FF',
    units: '%',
  },
} as const;

type WeatherLayer = keyof typeof WEATHER_LAYERS;

function MapControls({ onLayerChange, activeLayer }: MapControlsProps) {
  return (
    <div 
      className="absolute top-2 right-2 z-[1000] bg-white rounded-lg shadow-lg p-2 map-control"
      onClick={(e) => e.stopPropagation()}
    >
      <select
        value={activeLayer}
        onChange={(e) => onLayerChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {Object.entries(WEATHER_LAYERS).map(([value, { name }]) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

function Legend({ layer }: { layer: WeatherLayer }) {
  const layerConfig = WEATHER_LAYERS[layer];
  const legendItems = layerConfig.palette.split(';').map(item => {
    const [value, color] = item.split(':');
    return { value: parseFloat(value), color: `#${color}` };
  }).sort((a, b) => a.value - b.value);

  return (
    <div 
      className="absolute bottom-2 right-2 z-[1000] bg-white rounded-lg shadow-lg p-2 map-control"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="text-sm font-medium mb-1">{layerConfig.name} Legend</div>
      <div className="space-y-1">
        {legendItems.map((item, index, array) => {
          let label = '';
          if (index === 0) {
            label = `< ${array[1]?.value} ${layerConfig.units}`;
          } else if (index === array.length - 1) {
            label = `> ${item.value} ${layerConfig.units}`;
          } else {
            label = `${array[index - 1]?.value}-${item.value} ${layerConfig.units}`;
          }
          
          return (
            <div key={item.value} className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CurrentLocationButton({ onLocationSelect }: { onLocationSelect: (lat: number, lon: number) => void }) {
  const map = useMap();
  const [loading, setLoading] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 13);
        onLocationSelect(latitude, longitude);
        setLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setLoading(false);
      }
    );
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="absolute bottom-2 left-2 z-[1000] px-3 py-2 bg-white rounded-lg shadow-lg text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 map-control"
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      ) : (
        '📍 Current Location'
      )}
    </button>
  );
}

function LocationPicker({
  onLocationSelect,
  savedLocations = [],
}: {
  onLocationSelect: (lat: number, lon: number) => void;
  savedLocations?: SavedLocation[];
}) {
  const map = useMapEvents({
    click(e) {
      // Check if the click target is a control element
      const target = e.originalEvent.target as HTMLElement;
      if (
        target.closest('.leaflet-control') || // Don't trigger for map controls
        target.closest('button') ||           // Don't trigger for buttons
        target.closest('select') ||           // Don't trigger for select elements
        target.closest('.map-control')        // Don't trigger for our custom controls
      ) {
        return;
      }

      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
      
      // Clear existing click markers
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker && !(layer.options as CustomMarkerOptions).saved) {
          map.removeLayer(layer);
        }
      });
      
      // Add new marker
      L.marker([lat, lng]).addTo(map);
    },
  });

  // Add saved location markers
  useEffect(() => {
    // Clear existing saved location markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker && (layer.options as CustomMarkerOptions).saved) {
        map.removeLayer(layer);
      }
    });

    // Add saved location markers
    savedLocations.forEach((location) => {
      const marker = L.marker([location.lat, location.lon], {
        title: location.name,
        saved: true,
      } as CustomMarkerOptions).addTo(map);
      
      marker.bindPopup(location.name);
    });
  }, [savedLocations, map]);

  return null;
}

export function WeatherMap({
  onLocationSelect,
  apiKey,
  onSaveLocation,
  savedLocations = [],
  date,
}: WeatherMapProps) {
  const [activeLayer, setActiveLayer] = useState<WeatherLayer>('TA2');
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lon: number; name?: string } | null>(null);
  const [locationName, setLocationName] = useState('');

  const handleLocationClick = (lat: number, lon: number) => {
    setSelectedLocation({ lat, lon });
    onLocationSelect(lat, lon);
  };

  // Reset location name when selected location changes
  useEffect(() => {
    if (selectedLocation?.name) {
      setLocationName(selectedLocation.name);
    } else {
      setLocationName('');
    }
  }, [selectedLocation]);

  return (
    <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={4}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        {/* Base map layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Weather layer */}
        <TileLayer
          url={`https://maps.openweathermap.org/maps/2.0/weather/${activeLayer}/{z}/{x}/{y}?appid=${apiKey}${
            date ? `&date=${date}` : ''
          }${
            activeLayer === 'WND'
              ? `&use_norm=${WEATHER_LAYERS[activeLayer].useNorm}&arrow_step=${WEATHER_LAYERS[activeLayer].arrowStep}`
              : ''
          }&fill_bound=${WEATHER_LAYERS[activeLayer].fillBound}&opacity=${WEATHER_LAYERS[activeLayer].opacity}&palette=${WEATHER_LAYERS[activeLayer].palette}`}
        />

        <LocationPicker
          onLocationSelect={handleLocationClick}
          savedLocations={savedLocations}
        />
        <MapControls
          activeLayer={activeLayer}
          onLayerChange={(layer) => setActiveLayer(layer as WeatherLayer)}
        />
        <Legend layer={activeLayer} />
        <CurrentLocationButton onLocationSelect={handleLocationClick} />
      </MapContainer>

      {/* Save Location Dialog - Positioned absolutely over the map */}
      {selectedLocation && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedLocation(null);
              setLocationName('');
            }
          }}
        >
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-medium mb-4">Save Location</h3>
            <input
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="Enter location name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedLocation(null);
                  setLocationName('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (onSaveLocation && locationName) {
                    onSaveLocation({
                      id: `${selectedLocation.lat}-${selectedLocation.lon}`,
                      name: locationName,
                      lat: selectedLocation.lat,
                      lon: selectedLocation.lon,
                    });
                  }
                  setSelectedLocation(null);
                  setLocationName('');
                }}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                disabled={!locationName.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 