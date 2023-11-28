import React from "react";

import classes from "./DetailsModal.module.css";

const DetailsModal: React.FC<{countryName: string}> = ({countryName}) => {
    return (
        <div className={classes["container"]}>
            <div className={classes["details"]}>
                <h3>{countryName}</h3>
            </div>
            <div className={classes["actions"]}>
                <button>Close</button>
            </div>
        </div>
    );
}

export default DetailsModal;