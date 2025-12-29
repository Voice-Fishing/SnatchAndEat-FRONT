'use client';

import { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import Header from "@/components/common/Header";
import SearchBar from "@/components/search/searchbar";

declare global {
    interface Window {
        kakao: any;
    }
}

export default function Search() {
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const mapRef = useRef<any>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                () => {
                    setUserLocation({ lat: 36.2683, lng: 127.6358 });
                }
            );
        }
    }, []);

    useEffect(() => {
        if (!userLocation) return;

        const KAKAO_APP_KEY = "ab10b55e22c4a11f942000379e0d8c2c";

        const initMap = () => {
            const container = document.getElementById("search-map");
            if (!container) return;

            const options = {
                center: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
                level: 10,
            };

            const map = new window.kakao.maps.Map(container, options);


            map.setMapTypeId(window.kakao.maps.MapTypeId.HYBRID);

            mapRef.current = map;
        };

        if (window.kakao && window.kakao.maps) {
            window.kakao.maps.load(() => initMap());
        } else {
            const script = document.createElement("script");
            script.id = "kakao-map-script";
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;
            script.async = true;
            script.onload = () => window.kakao.maps.load(() => initMap());
            document.head.appendChild(script);
        }
    }, [userLocation]);

    return (
        <SearchWrapper>
            <Header />

            <MapSection>
                <MapContainer id="search-map" />
            </MapSection>

            <SearchBarSection>
                <SearchBar />
            </SearchBarSection>
        </SearchWrapper>
    );
}


const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #000; 
`;

const MapSection = styled.div`
  flex: 1;
  position: relative; 
  width: 100%;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const SearchBarSection = styled.div`
  z-index: 100;
  position: fixed;
  top: 100px;
  left: 63%;
`;