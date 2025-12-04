import React, { useEffect } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import HolidayGrid from './VanityNumbers';
import Footer from './Footer';


const App = () => {
  

  

  useEffect(() => {
    
  }, []);

  return (
    <React.StrictMode>
      
        <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <div className="content" style={{ flex: '1', overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
            
                { <HolidayGrid />}
               
              
          </div>
          <Footer className="footer" />
        </div>
      
    </React.StrictMode>
  );
};

export default App;
