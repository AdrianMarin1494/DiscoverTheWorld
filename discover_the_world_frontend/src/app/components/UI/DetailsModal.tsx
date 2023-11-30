import React from "react";

import classes from "./DetailsModal.module.css";

interface DetailsModalInterface {
    countryName: string, 
    onClose: () => void, 
    seeCountryMap: string, 
    seeStreetMap: string,
    countryUnMember: string
    countryArea: string
}

const DetailsModal: React.FC<DetailsModalInterface> = ({countryName, onClose, seeCountryMap,  seeStreetMap, countryUnMember, countryArea}) => {
    function openLink(linkAddress: string): void {
        window.open(linkAddress, '_blank');
    }
    
    return (
        <div className={classes["container"]}>
            <div className={classes["title"]}>
                <h3>{countryName}</h3>
            </div>
            <div className={classes["details"]}>
                <p>UN Member: {{countryUnMember} ? "Yes" : "No"}</p>
                <p>{countryArea}</p>
            </div>
            <div className={classes["actions"]}>
                <button onClick={onClose}>Close</button>
                <button onClick={() => openLink(seeCountryMap)}>GoogleMaps</button>
                <button onClick={() => openLink(seeStreetMap)}>OpenStreetMap</button>
            </div>
        </div>
    );
}

export default DetailsModal;