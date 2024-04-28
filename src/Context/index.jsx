import { useContext, createContext, useState, useEffect } from "react";
const StateContext = createContext();
export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState('Lucknow');
    const [thisLocation, setLocation] = useState('');

    const fetchWeather = async () => {
        const apiKey = 'D5LNA925K4Z9Y6SL98LQQQHNA';
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setLocation(data.address);
            setValues(data.days);
            setWeather(data.days[0]);
        } catch (error) {
            console.error('Fetching weather data', error);
            alert("This place do'nt exits");
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [place]);

    useEffect(() => {
    }, [values]);

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
        }}>
            {children}
        </StateContext.Provider>
    );
};


export const useStateContext = () => useContext(StateContext);


