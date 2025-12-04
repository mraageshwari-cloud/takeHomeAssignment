import React from 'react';


const Header = ({ handleLogout }) => {
  

  return (
    <header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '10px', 
      borderBottom: '1px solid #ccc' 
    }}>
      {/* Left side - empty div to help center the title */}
      <div style={{ flex: 1 }}></div>
    
      {/* Centered title */}
      <div style={{ flex: 1, textAlign: 'center' }}>
        <p 
          className="title" 
          style={{ 
           
            fontSize: '40px', 
            margin: 0 
          }}
        >
          Take Home Assignment
        </p>
      </div>
    
      {/* Right side - navigation */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      
    
        <button 
          onClick={handleLogout} 
          style={{ 
            marginLeft: '20px', 
            background: 'none', 
            border: 'none', 
            color: 'red', 
            cursor: 'pointer' 
          }}
        >
          LogOut
        </button>
      </div>
    </header>
    
  );
};

export default Header;
