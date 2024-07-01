import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';
import { motion } from 'framer-motion';
import weatherDescriptions from "../../Assets/Data/weatherDescription.json";
import InfoModal from '../../Modals/InfoModal/InfoModal.jsx';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Assets/CSS/Toaststyles.css';
import { useNavigate } from 'react-router-dom';
import { CityContext } from '../../Assets/Utils/CityContext.jsx';

function Weather() {
    
    const { city, setCity } = useContext(CityContext);
    const [weather, setWeather] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState(null);
    const [showMoreInfoButton, setShowMoreInfoButton] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];
        setHistory(savedHistory);
    }, []);

    const apiKey = '6a907db5704dae783d2ef11d471a4dc0';
    const weatherBaseUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const forecastBaseUrl = 'http://api.openweathermap.org/data/2.5/forecast';

    const handleMoreInfo = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const schema = yup.object().shape({
        city: yup.string().required('City name is required').matches(/^[a-zA-Z\s]+$/, 'Invalid city name'),
    });

    const validateCity = async () => {
        try {
            await schema.validate({ city }, { abortEarly: false });
            setError('');
            return true;
        } catch (validationErrors) {
            const errors = validationErrors.inner.map(err => err.message);
            toast.error(errors.join(', '), {
                position: 'top-right',
                autoClose: 5000,
                className: 'custom-toast',
                bodyClassName: 'custom-toast-body',
                iconClassName: 'custom-toast-icon',
            });
            return false;
        }
    };

    const getWeather = async (e) => {
        e.preventDefault();

        if (!city.trim()) {
            toast.error('Please enter a city.', {
                position: 'top-right',
                autoClose: 5000,
                className: 'custom-toast',
                bodyClassName: 'custom-toast-body',
                iconClassName: 'custom-toast-icon',
            });
            return;
        }

        const isValid = await validateCity();
        if (!isValid) {
            return;
        }

        setError(null);
        try {
            const weatherResponse = await axios.get(`${weatherBaseUrl}?q=${city}&appid=${apiKey}&units=metric`);
            console.log('Weather Data:', weatherResponse.data);
            setShowMoreInfoButton(true);
            setWeather(weatherResponse.data);

            let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
            if (!history.includes(city)) {
                history.push(city);
                localStorage.setItem('weatherHistory', JSON.stringify(history));
                setHistory(history); // Update state
            }

            const forecastResponse = await axios.get(`${forecastBaseUrl}?q=${city}&appid=${apiKey}&units=metric`);
            console.log('Forecast Data:', forecastResponse.data.list);
            const dailyForecast = aggregateDailyForecast(forecastResponse.data.list);
            setForecast(dailyForecast);
        } catch (error) {
            console.error('Error fetching the weather data', error);
            toast.error('Error fetching the weather data.', {
                position: 'top-right',
                autoClose: 5000,
                className: 'custom-toast',
                bodyClassName: 'custom-toast-body',
                iconClassName: 'custom-toast-icon',
            });
        }
    };

    const aggregateDailyForecast = (list) => {
        const days = {};
        list.forEach((item) => {
            const date = new Date(item.dt_txt).getDate();
            if (!days[date]) {
                days[date] = {
                    temp: 0,
                    humidity: 0,
                    pressure: 0,
                    description: '',
                    count: 0,
                };
            }
            days[date].temp += item.main.temp;
            days[date].humidity += item.main.humidity;
            days[date].pressure += item.main.pressure;
            days[date].description = item.weather[0].description;
            days[date].count += 1;
        });

        const result = Object.values(days).map((day) => ({
            temp: (day.temp / day.count).toFixed(1),
            humidity: (day.humidity / day.count).toFixed(1),
            pressure: (day.pressure / day.count).toFixed(1),
            description: day.description,
        }));
        return result;
    };

    const navigate = useNavigate(); // Use useNavigate hook


    const handleViewForecast = () => {
        navigate('/forecast', { state: { forecast } });
    };

    const handleCityClick = (city) => {
        setCity(city);
        setIsInputFocused(false);
    };

    return (
        <div className="weather-content">
            <ToastContainer 
             style={{ fontSize: "14px", zIndex: "1000" }}
            />
            <form onSubmit={getWeather} className="form-content">
            <div className="input-container">
                    <input 
                        type="text" 
                        value={city} 
                        onChange={(e) => setCity(e.target.value)} 
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setTimeout(() => setIsInputFocused(false), 100)}
                        placeholder="Enter the city..." 
                    />
                    {isInputFocused && history.length > 0 && (
                        <ul className="history-dropdown">
                            {history.map((city, index) => (
                                <li 
                                    key={index} 
                                    onClick={() => handleCityClick(city)}
                                >
                                    {city}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                
                <button type="submit">Get Weather</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {weather && (
                <div className="weather-info">
                    <motion.div
                        className="weather-info-card"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <h2> Weather in {weather.name}</h2>
                        <p className="temp-p">{weather.main.temp} °C</p>
                        <p>Humidity: {weather.main.humidity} %</p>
                        <p>Pressure: {weather.main.pressure} hPa</p>
                        <p>Description: {weather.weather[0].description}</p>
                    </motion.div>
                </div>
            )}
            {showMoreInfoButton && (
                <motion.div
                    className="button-container"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <button onClick={handleMoreInfo}>Show more info</button>
                    {weather && (
                        <InfoModal
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            description={weatherDescriptions[weather.weather[0].description] || 'Weather description is not available.'}
                        />
                    )}
                    <button onClick={handleViewForecast}>View Forecast</button> 
                </motion.div>
            )}
        </div>
    );
};

export default Weather;