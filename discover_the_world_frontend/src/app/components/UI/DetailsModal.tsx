import React from "react";

const DetailsModal: React.FC<{countryName: string}> = ({countryName}) => {
    return (
        <div style={{width: '150px', height: '150px', backgroundColor: 'blue'}}>
            <h3>{countryName}</h3>
        </div>
    );
}

export default DetailsModal;