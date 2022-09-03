import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";

document.body.style = "background: rgb(224, 246, 255)";


function App() {

   //   1.Estados
  
   const [wheather, setWheather] = useState({});

   const [isCentigrade, setIsCentigrade] = useState(true);
 
  //   2.useEffect

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(success);

    function success(pos) {
       const crd = pos.coords;

          console.log('Your current position is:');
          console.log(`Latitude : ${crd.latitude}`);
          console.log(`Longitude: ${crd.longitude}`);
          console.log(`More or less ${crd.accuracy} meters.`);
         
         axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=291af6f9830b4f32e6d1cf6eb5765577`)
        .then((res) => {
            
             setWheather(res.data);            

        });
      }
  }, []);

// Funtion  changeTemperature

  const changeTemperature = () => {
    setIsCentigrade(!isCentigrade);  
  };


  console.log(wheather); 

  return (
  
    <div className="App">  
        <div className="card">  
             
          <div className="row">
            
           <div>
               <ul className="text-center"> 
                 <li>             
                    <h2 className="text-center">Wheather App</h2> 
                  </li>
                  <li>             
                    <p className="text-center"> <b>{wheather.name},{wheather.sys?.country} </b> </p>
                  </li>
                  <li className="temperature" >             
                    <p><b>
                      {isCentigrade ? parseInt(wheather.main?.temp - 273.15) : parseInt((wheather.main?.temp - 273.15) * 1.8 + 32)}
                      {isCentigrade ? "°C" : "°F"}
                     </b></p>
                  </li>
                  <li>             
                    <img className="icon"
                      src= {`http://openweathermap.org/img/wn/${wheather.weather?.[0].icon}@4x.png`}  
                      alt=""
                    /> 
                  </li>
                    <li>
                      <b>"{wheather.weather?.[0].description}" </b>
                    </li>
                    <li>
                        <b> Wind Speed : </b>
                        {wheather.wind?.speed} m/s
                    </li>
                    <li>
                        <b> Clouds: </b>
                        {wheather.clouds?.all}%
                    </li>
                    <li>
                        <b>Pressure: </b>
                        {wheather.main?.pressure} hPa
                    </li>
             </ul>         
          </div>
        </div>       
                
         <div className="text-center">
              <button className="change-temp" onClick={changeTemperature}>Change °F/°C</button>       
         </div>
    </div>
    </div>
    
  );
  
}

export default App;
