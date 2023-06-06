"use client";

const DetailsModal = (props) => {

    return (
        <div style={{
            "width": "50vw", 
            "height": "30vh", 
            "position": "fixed",
            "marginLeft": "-10%",
            "zIndex": "100px", 
            "backgroundColor": "grey"
        }}>
            <h3>{props.countryName} {props.flag}</h3>
            <p>The Capital is {props.capitalName}</p>
            <p>It is located on {props.regionName} Continent</p>
            <p>Borders: {props.borders}</p>
            <p>Languages spoken: {props.languages}</p>
            <a href={props.map} target="_blank">Click to see the map</a>
            <br />
            <button onClick={props.onClose}>Close</button>
        </div>
    );
};

export default DetailsModal;