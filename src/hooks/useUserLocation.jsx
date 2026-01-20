import { useState, useEffect } from 'react';

export default function useUserLocation() {
    const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser');
            return;
        }

        const successHandler = (position) => {
            setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                accuracy: position.coords.accuracy,
                heading: position.coords.heading
            });
            setLocationError(null);
        };

        const errorHandler = (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    setLocationError('Location access denied');
                    break;
                case error.POSITION_UNAVAILABLE:
                    setLocationError('Location unavailable');
                    break;
                case error.TIMEOUT:
                    setLocationError('Location request timed out');
                    break;
                default:
                    setLocationError('An unknown error occurred');
            }
        };

        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 30000
        };

        navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);

        const watchId = navigator.geolocation.watchPosition(successHandler, errorHandler, options);

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return { userLocation, locationError };
}
