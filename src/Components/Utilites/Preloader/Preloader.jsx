import React from 'react'
import './Preloader.css'

function Preloader() {
  return (
    <>
      <div className="preloader-wrapper">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  )
}

export default Preloader
