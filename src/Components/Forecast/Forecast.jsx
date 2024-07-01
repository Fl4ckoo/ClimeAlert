import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import useWeekdays from '../../Assets/Utils/useWeekdays.jsx'; 
import "./Forecast.css";
import { CityContext } from '../../Assets/Utils/CityContext.jsx';
import { useLocation } from 'react-router-dom';



const Forecast = () => {
    const location = useLocation();
    const { forecast } = location.state || {};
    const weekdays = useWeekdays(forecast?.length || 0);
    const { city } = useContext(CityContext);
    
    
    
    
    if (!Array.isArray(forecast) || !forecast.length) return null; 

    
    
    
    return (
        <div className="forecast-info">
            <h3>7-Day Forecast in {city}</h3>
            <div className="forecast-grid">
                {forecast.map((day, index) => (
                    <motion.div
                        key={index}
                        className="forecast-card"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                        <p><strong>{weekdays[index]}</strong></p>
                        <p className="temp-p">{day.temp} °C</p>
                        <p>Humidity: {day.humidity} %</p>
                        <p>Pressure: {day.pressure} hPa</p>
                        <p>Description: {day.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;
