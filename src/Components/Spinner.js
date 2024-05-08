import React, {  } from 'react'
import loading from './loading.gif'

const Spinner = () =>{

    return (
        <div id="spin" className="container">
      <div>
        <img src={loading} alt="" />
      </div>
      </div>
    )
  
}

export default Spinner
