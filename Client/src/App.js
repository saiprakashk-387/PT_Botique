import React, { useState, useEffect } from "react";
import Loader from "./Components/Loader/Loader";
import MainRoute from "./Components/Routes/MainRoute";

function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000); ///5 seconds//
  }, []);
  return (
    <div className="App">
       {loading ? (
        <Loader/>
      ) : (
      <MainRoute />
      )}
    </div>
  );
}

export default App;
