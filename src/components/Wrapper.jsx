import React from 'react'
import './wrapper.css'
const Wrapper = (props) => {
  return (
    <>
     <div class="fixed-top">
        <div class="content">
           <h1>EMI CALCULATOR</h1>
        </div>
    </div>
    <div className="rest-body">
        {props.children}
    </div>
    </>
  )
}

export default Wrapper