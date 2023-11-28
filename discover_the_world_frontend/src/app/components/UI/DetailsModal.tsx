import React from "react";

import classes from "./DetailsModal.module.css";

const DetailsModal: React.FC<{countryName: string, onClose: () => void, seeCountryMap: string}> = ({countryName, onClose, seeCountryMap}) => {
    function openLink(linkAddress: string): void {
        window.open(linkAddress, '_blank');
    }
    
    return (
        <div className={classes["container"]}>
            <div className={classes["details"]}>
                <h3>{countryName}</h3>
            </div>
            <div className={classes["actions"]}>
                <button onClick={onClose}>Close</button>
                <button onClick={() => openLink(seeCountryMap)}>See map</button>
            </div>
        </div>
    );
}

export default DetailsModal;