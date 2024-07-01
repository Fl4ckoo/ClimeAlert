import './App.css';
import React from 'react';
import {motion} from 'framer-motion';
import AppRoutes from  "../src/Routes/Routes.jsx";
import Footer from "../src/Components/Footer/Footer.jsx";




function App() {
  

    return (
        <div className="App">
            <header className="app-header">
                
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <a href="/">ClimeAlert</a>
                </motion.h1>
                
            </header>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="content"
            >
                <AppRoutes />
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                <Footer />
            </motion.div>
        </div>
    );
}

export default App;
