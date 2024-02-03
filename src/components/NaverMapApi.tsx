import React, { useContext, useEffect, useState } from 'react';
import { Container, NaverMap, Marker, useNavermaps } from 'react-naver-maps';
import '../styles/NaverMap.css';

interface coordinatesProps {
    latitude: number;
    longitude: number;
}
interface MapProps {
    mapAddress: string;
}

const NaverMapApi = ({ mapAddress }: MapProps) => {
    useEffect(() => {
        handdleAddressChange();
    }, [mapAddress]);

    const navermaps = useNavermaps();
    const [coordinates, setCoordinates] = useState({
        latitude: 0,
        longitude: 0,
    });

    // 주소를 x,y좌표로 변경하기
    const handdleAddressChange = async () => {
        const geocoder = navermaps.Service.geocode(
            {
                query: mapAddress,
            },
            function (status, response) {
                if (status !== navermaps.Service.Status.OK) {
                    console.log('Geocoding error');
                }

                const result = response.v2.addresses;

                const newCoordinates: coordinatesProps = {
                    latitude: parseFloat(result[0].y),
                    longitude: parseFloat(result[0].x),
                };
                setCoordinates(newCoordinates);
            }
        );
    };

    const naverMapOptions = {
        key: `${coordinates.latitude}-${coordinates.longitude}`,
        defaultCenter: new navermaps.LatLng(
            coordinates.latitude,
            coordinates.longitude
        ),
        defaultZoom: 19,
        zoomControl: false,
    };

    const markerOptions = {
        position: new navermaps.LatLng(
            coordinates.latitude,
            coordinates.longitude
        ),
    };

    return (
        <Container>
            <div className='NaverMap'>
                <NaverMap {...naverMapOptions}>
                    <Marker {...markerOptions} />
                </NaverMap>
            </div>
        </Container>
    );
};
export default NaverMapApi;
