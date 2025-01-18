import React, { useState, useEffect } from "react";
import logo from "../images/logo.svg";

function SplashMessage() {
  return (
    <div>
      <div style={{position: 'absolute', top:'50%', left:'50%', transform:'translate(-36%, -50%)'}}>
        <img src={logo} className="img-fluid" alt="logo" />
      </div>
      <div style={{position: 'absolute', top:'80%', left:'50%', transform:'translate(-50%, -50%)'}}>
        <p><b>Made by Echipa Echipelor</b></p>
      </div>
    </div>
  );
}

const SplashScreen = (WrappedComponent) => {
  return function Splash() {
    const [isLoaded, setIsLoaded] = useState(false);
      
    useEffect(() => {
      setTimeout(() => {
        setIsLoaded(true);
      }, 3000);
    }, []);

    if (!isLoaded) return <SplashMessage />;
            
    return <WrappedComponent />;
  };
};

export default SplashScreen;
