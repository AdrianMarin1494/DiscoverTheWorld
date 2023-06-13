import CountriesData from "../components/CountriesData";
import NavBar from "../components/NavBar";

const CountriesPage = () => {
    return (
        <div>
            <NavBar />
            <h2>Discover the countries</h2>
            <br />
            <CountriesData />
        </div>
    );
};

export default CountriesPage;