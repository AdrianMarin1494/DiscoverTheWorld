"use client";

const DetailsModal = (props) => {

    return (
        <div style={{
            "width": "30vw", 
            "height": "20vh", 
            "position": "fixed",
            "marginLeft": "-10%",
            "zIndex": "100px", 
            "backgroundColor": "grey"
        }}>
            <h3>Country: {props.countryName} {props.flag}</h3>
            <h3>The Capital is {props.capitalName}</h3>
            <h3>It is located on {props.regionName}</h3>
            <p>Borders: {props.borders}</p>
            <p>Languages: {props.languages}</p>
            <a href={props.map} target="_blank">Click to see the map</a>
            <br />
            <button onClick={props.onClose}>Close</button>
        </div>
    );
};

export default DetailsModal;