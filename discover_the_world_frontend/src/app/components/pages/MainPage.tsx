"use client";

import React, {useState} from "react";

import CountriesTable from "../CountriesTable";
import DetailsModal from "../UI/DetailsModal";

const MainPage = () => {
    const [isShowingModal, setIsShowingModal] = useState<boolean>(false);
    const [selectedCountryName, setSelectedCountryName] = useState<string>("");
    const [selectedCountryMap, setSelectedCountryMap] = useState<string>("");

    function handleSelectedRow(countryName: string, countryMap: string) {
        setSelectedCountryName(countryName);
        setSelectedCountryMap(countryMap);
        setIsShowingModal(true);
        console.log("in main page: ", countryMap)
    }

    function handleClose() {
        setIsShowingModal(false);
    }

    return (
        <div>
            <h3>Main Page</h3>
            <CountriesTable onSelectedRow={handleSelectedRow}/>
            {isShowingModal && <DetailsModal countryName={selectedCountryName} onClose={handleClose} seeCountryMap={selectedCountryMap}/>}
        </div>
    );
};

export default MainPage;