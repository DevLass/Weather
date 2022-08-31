// Essential
import React, { useState } from "react";

//Styles
import "./App.css";

//Components

export default (props) => {

    // document.addEventListener("keyup", function(e){
    //     let i = 0;
    //     while(i == 0){
    //         if(e.key === "Enter"){
    //             const btn = document.querySelector("button")
    //             btn.click();
    //             i++;
    //         }
    //     }
    // })

    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const handleChange = (e) => {
        setCity(e.target.value)
    }

    const handleSearch = () =>{
        fetch(`http://api.weatherapi.com/v1/current.json?key=416f5a5e17624ad1af9223227221708&q=${city}&lang=en`)
        .then((response) => {
            if(response.status == 200){
                return response.json();
            }
        })
        .then((data) => {
            console.log(data)
            setWeather(data)
        });
    }

    return (
        <>

            <main className="px-4 py-5 my-5 text-center">
                <div className="col-lg-6 mx-auto">
                    <h1 className="display-5 fw-bold">Check your city's weather forecast now!</h1>
                    <p className="lead mb-4">
                        Enter the name of your city and click search
                    </p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <div className="col-md-6">
                            <input type="text" className="form-control" value={city} onChange={handleChange} placeholder="Valid City Name" autoFocus/>
                        </div>
                    <button className="btn btn-outline-dark px-4" onClick={handleSearch}>Search</button>
                    </div>
                    {   
                        weather ? (
                        <div className="mt-4">
                            <h4 className="fw-bold">Today is {weather.current.condition.text}</h4>
                            <p className="lead mb-4">
                            Temperature of {weather.current.temp_c}°C or {weather.current.temp_f}°F <br />
                            Winds of {weather.current.gust_mph}Mph or {weather.current.gust_kph}Kpm <br />
                            Precipitation of {weather.current.precip_mm}mm <br />
                            Humidity of {weather.current.humidity}% <br />
                            <img src={weather.current.condition.icon} alt="" />
                            </p>
                            
                        </div>
                         ) : null
                        
                    }
                </div>
            </main>

      
        </>
    );
};
