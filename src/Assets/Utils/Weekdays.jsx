export const getWeekday = (index) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const day = (today.getDay() + index) % 7;
    return daysOfWeek[day];
};