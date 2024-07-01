import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Weather from '../../src/Components/Weather/Weather.jsx';
import Forecast from '../../src/Components/Forecast/Forecast.jsx';
import PrivacyPolicy from '../../src/Components/PrivacyPolicy/PrivacyPolicy.jsx';
import ContactUs from "../../src/Components/ContactUs/ContactUs.jsx";
import TermsOfServices from "../../src/Components/TermsOfServices/TermsOfServices.jsx";
import Error from "../../src/Components/Error/Error.jsx";

const AppRoutes = () => {

    return (
    <Router>
        <Routes>
            <Route path="/" element={<Weather />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="terms-of-service" element={<TermsOfServices />} />
            <Route path="*" element={<Error />}/>
        </Routes>
    </Router>
);
};

export default AppRoutes;