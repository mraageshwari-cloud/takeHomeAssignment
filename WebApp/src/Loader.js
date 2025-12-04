import React from 'react'

const Loader = () => {
    const loader = "./Loader.png"
  return (
    <div className="loader-container">
      <div className="loader-logo">
        {/* Replace the img src with your custom logo */}
        {/* <img src={loader} alt="Logo" /> */}
      </div>
      <div className="loader-spinner"></div>
    </div>
  )
}
export default Loader;