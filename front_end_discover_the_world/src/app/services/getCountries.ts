export const getCountries = async () => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Failed to fetch the countries data");
    }
};