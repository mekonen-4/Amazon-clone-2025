import React from 'react';
import {BounceLoader} from 'react-spinners' 
const Loading = () => {
    return (
      <div
      
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
       minHeight: "50vh",
       width: '100%'
        }}
      >
        {" "}
        <BounceLoader color="#faaf00" size={80} />
      </div>
    );
}

export default Loading;
