'use client';

import { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import SearchBar from "@/components/search/searchbar";
import SearchResult, { SearchResultItemType } from "@/components/search/searchresult";
import SearchDescriptionModal from "@/components/modal/searchdescriptionmodal";
import { useSearchStore } from "@/store/useSearchStroe";
import axios from "axios";


declare global {
    interface Window {
        kakao: any;
    }
}

export default function Search() {
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const mapRef = useRef<any>(null);
    const markersRef = useRef<any[]>([]);

    const [isopen, setisopen] = useState(false);
    const [data, setdata] = useState<SearchResultItemType[]>([]);
    const [selectedShop, setSelectedShop] = useState<SearchResultItemType | null>(null);

    const { searchKeyword } = useSearchStore();

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


    useEffect(() => {
        if (!mapRef.current || !window.kakao) return;

        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        if (data.length === 0) return;

        const bounds = new window.kakao.maps.LatLngBounds();


        data.forEach((item, index) => {
            const position = new window.kakao.maps.LatLng(item.latitude, item.longitude);

            const content = `
                <div style="
                    width: 24px; 
                    height: 24px; 
                    border-radius: 50%; 
                    background-color: #0080FF; 
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                    color: white; 
                    font-size: 12px; 
                    font-weight: 700;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                ">
                    ${String.fromCharCode(65 + index)}
                </div>
            `;

            const customOverlay = new window.kakao.maps.CustomOverlay({
                position: position,
                content: content,
                yAnchor: 1
            });

            customOverlay.setMap(mapRef.current);
            markersRef.current.push(customOverlay);
            bounds.extend(position);
        });


        if (data.length > 0) {
            mapRef.current.setBounds(bounds);
        }

    }, [data]);

    const searchHandle = async () => {
        if (!searchKeyword) {
            alert("검색어는 빈칸이어선 안돼요!");
            return;
        }

        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}restaurant/search`,
                {
                    params: { keyword: searchKeyword },
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
                    }
                }
            );

            const searchData = response.data;
            setdata(searchData);
            console.log(searchData);
            setisopen(true);



        } catch (error) {
            console.error("검색 중 오류 발생:", error);
            alert("검색 결과를 가져오는 중 문제가 발생했습니다.");
        }
    };


    return (
        <SearchWrapper>
            <MapSection>
                <MapContainer id="search-map" />
            </MapSection>

            <SearchBarSection>
                <SearchBar isopen={isopen} setisopen={searchHandle} />
                {isopen && <SearchResult
                    data={data}
                    setisopen={setisopen}
                    isopen={isopen}
                    setData={setdata}
                    onItemClick={(item) => setSelectedShop(item)}
                />}
            </SearchBarSection>

            {selectedShop && (
                <SearchDescriptionModal
                    shop={selectedShop}
                    onClose={() => setSelectedShop(null)}
                />
            )}
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