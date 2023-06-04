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
            <h3>{props.countryName}</h3>
            <button onClick={props.onClose}>Close</button>
        </div>
    );
};

export default DetailsModal;