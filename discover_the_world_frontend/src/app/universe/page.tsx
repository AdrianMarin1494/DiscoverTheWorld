"use client";

import React, { useState, useEffect } from "react";

interface PhotosInterface {
    copyright: string,
    date: string,
    explanation: string,
    media_type: string,
    service_version: string,
    title: string,
    url: string,
}

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month =  (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    
    const formatDate = `${year}-${month}-${day}`;
    return formatDate;
}

function subtractDaysFromDate(dateString: string, days: number) {
    const inputDate = new Date(dateString);
    inputDate.setDate(inputDate.getDate() - days);

    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

const Universe: React.FC = () => {
    const [photos, setPhotos] = useState<PhotosInterface[]>([{
        copyright: "",
        date: "",
        explanation: "",
        media_type: "",
        service_version: "",
        title: "",
        url: "",
    }]);

    const [startDate, setStartDate] = useState<string>(subtractDaysFromDate(getCurrentDate(), 4));
    const [endDate, setEndDate] = useState<string>(getCurrentDate());
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function getData(starting: string, ending: string) {
        setIsLoading(true);
        try {
            const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=RjoPcnI4Nad2ovYEQ7nr9O4kmf48EgDulMJLfVRJ&start_date=${starting}&end_date=${ending}`);
            const data = await res.json();
            console.log(data);
            setPhotos(data);
        } catch(err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getData(startDate, endDate);
    }, [])

    function handleNext() {
        let newStartDate: string = subtractDaysFromDate(startDate, 5);
        let newEndDate: string = subtractDaysFromDate(endDate, 5);
        getData(newStartDate, newEndDate);
        setStartDate(newStartDate);
        setEndDate(newEndDate);
    }
    
    return (
        <div>
            <h3>Astronomy</h3>
            {isLoading ? 
                <div>
                    <h3>Loading...</h3>
                </div>
                : 
                <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                    {photos.map((photo) => {
                        console.log(photo);
                        return (
                            <div>
                                <h3>{photo.title}</h3>
                                <h4>By: {photo.copyright}</h4>
                                <h5><i>{photo.date}</i></h5>
                                <img src={photo.url} style={{width: "60vw", height: "60vh"}}/>
                                <p style={{width: "60vw"}}>{photo.explanation}</p>
                            </div>
                        )
                    }
                    )}
                </div>
            }
            <button onClick={handleNext} style={{width: "4vw", height: "4vh"}}>Next</button>
        </div>
    );
};

export default Universe;