import { useCallback, useMemo } from "react";
import { GoogleMap, MarkerClusterer, MarkerF } from "@react-google-maps/api";
import HouseMapIcon from "../../assets/img/HomeMapIcon.png";

type MapOptions = google.maps.MapOptions;
type LatLngLiteral = google.maps.LatLngLiteral;

const WorkersMap = ({
  addresses,
  selectOfferer,
  currentLocation,
  mapRef,
  bounds,
  setBounds,
}: {
  addresses: any;
  selectOfferer: any;
  currentLocation: LatLngLiteral;
  mapRef: any;
  bounds: any;
  setBounds: any;
}): JSX.Element => {
  const onLoad = useCallback((map: any) => {
    mapRef.current = map;
    setBounds(new window.google.maps.LatLngBounds());
  }, []);

  const options = useMemo<MapOptions>(
    () => ({
      mapId: "ad6644a2d5ec6ecb",
      disableDefaultUI: true,
      clickableIcons: false,
      draggable: true,
      minZoom: 5,
      maxZoom: 15,
    }),
    [],
  );

  return (
    <GoogleMap
      zoom={13}
      center={currentLocation}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      onLoad={onLoad}
      options={options}
      onZoomChanged={() => {
        if (mapRef.current !== null) {
          console.log(
            "[DEBUG] [GMAPS] BOUNDS :: ZOOM_CHANGED :: ",
            mapRef.current.getBounds(),
          );
          setBounds(mapRef.current.getBounds());
        }
      }}
      onDragEnd={() => {
        if (mapRef.current !== null) {
          console.log(
            "[DEBUG] [GMAPS] BOUNDS :: DRAG_END :: ",
            mapRef.current.getBounds(),
          );
          setBounds(mapRef.current.getBounds());
        }
      }}
    >
      <MarkerF
        position={currentLocation}
        icon={{
          url: HouseMapIcon,
          scaledSize: new window.google.maps.Size(30, 30),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(15, 15),
        }}
      />
      <MarkerClusterer>
        {(cluster) =>
          addresses.map((item: any) => (
            <MarkerF
              key={item.address.id}
              onClick={() => selectOfferer(item.offerer)}
              position={{
                lat: parseFloat(item.address.latitude),
                lng: parseFloat(item.address.longitude),
              }}
              clusterer={cluster}
            />
          ))
        }
      </MarkerClusterer>
    </GoogleMap>
  );
};

export default WorkersMap;
