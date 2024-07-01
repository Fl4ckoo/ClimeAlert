import { useState, useEffect } from 'react';

const useWeekdays = (length) => {
    const [weekdays, setWeekdays] = useState([]);

    useEffect(() => {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const today = new Date().getDay();
        const weekDaysArray = [];

        for (let i = 0; i < length; i++) {
            weekDaysArray.push(days[(today + i) % 7]);
        }

        setWeekdays(weekDaysArray);
    }, [length]);

    return weekdays;
};

export default useWeekdays;