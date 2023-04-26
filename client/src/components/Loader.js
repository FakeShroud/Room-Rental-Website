import { useState, CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";

function Loader() {
  let [loading, setLoading] = useState(true);


  return (
    <div style={{marginTop:'150px'}}>
    <div className="sweet-loading d-flex flex-column align-items-center justify-content-center">
      <HashLoader
        color='#000'
        loading={loading}
        cssOverride=''
        size={80}
        
      />
    </div>
    </div>
  );
}

export default Loader;
