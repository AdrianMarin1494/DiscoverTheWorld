"use client";

import React, {useState} from "react";

import CountriesTable from "../CountriesTable";
import DetailsModal from "../UI/DetailsModal";

const MainPage = () => {
    const [isShowingModal, setIsShowingModal] = useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = useState<string>("");

    function handleSelectedRow(countryName: string) {
        console.log("in main page: ", countryName);
        setSelectedCountry(countryName);
        setIsShowingModal(true);
    }

    return (
        <div>
            <h3>Main Page</h3>
            <CountriesTable onSelectedRow={handleSelectedRow}/>
            {isShowingModal && <DetailsModal countryName={selectedCountry}/>}
        </div>
    );
};

export default MainPage;