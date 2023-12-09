"use client";

import React, {useState} from "react";
import Link from "next/link";

import CountriesTable from "../components/CountriesTable";
import DetailsModal from "../components/UI/DetailsModal";

import classes from "./MainPage.module.css";

const Countries = () => {
    const [isShowingModal, setIsShowingModal] = useState<boolean>(false);
    const [selectedCountryName, setSelectedCountryName] = useState<string>("");
    const [selectedCountryMap, setSelectedCountryMap] = useState<string>("");
    const [selectedStreetMap, setSelectedStreetMap] = useState<string>("");
    const [selectedUnMember, setSelectedUnMember] = useState<string>("");
    const [selectedArea, setSelectedArea] = useState<string>("");

    function handleSelectedRow(countryName: string, countryMap: string, streetMap: string, unMember: string, area: string) {
        setSelectedCountryName(countryName);
        setSelectedCountryMap(countryMap);
        setSelectedStreetMap(streetMap);
        setSelectedUnMember(unMember);
        setSelectedArea(area);
        setIsShowingModal(true);
    }

    function handleClose() {
        setIsShowingModal(false);
    }

    return (
        <div className={classes["main-page"]}>
            <h3 className={classes["title"]}>Discover the Countries</h3>
            <Link href="/">
                <span>Home</span>
            </Link>
            <CountriesTable onSelectedRow={handleSelectedRow}/>
            {isShowingModal && <DetailsModal 
                countryName={selectedCountryName} 
                onClose={handleClose} 
                seeCountryMap={selectedCountryMap}
                seeStreetMap={selectedStreetMap}
                countryUnMember={selectedUnMember}
                countryArea={selectedArea}
            />}
        </div>
    );
};

export default Countries;