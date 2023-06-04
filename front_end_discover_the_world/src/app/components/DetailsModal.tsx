"use client";

const DetailsModal = (props) => {

    return (
        <div style={{
            "width": "40vw", 
            "height": "20vh", 
            "position": "fixed",
            "zIndex": "100px", 
            "backgroundColor": "grey"
        }}>
            <h3>Country: {props.countryName}</h3>
            <h3>The Capital is {props.capitalName}</h3>
            <h3>It is located on {props.regionName}</h3>
            <p>Borders: {props.borders}</p>
            <p>Languages: {props.languages}</p>
            <button onClick={props.onClose}>Close</button>
        </div>
    );
};

export default DetailsModal;