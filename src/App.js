import './App.css';
import NavBar from './components/NavBar'
import News from './components/News'
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/Footer'

import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const pageSize = 6;
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0)

    return (
      <div>
        <BrowserRouter>
        <NavBar/>
        <LoadingBar height={5} color='#f11946' progress={progress} />
        
        <Routes basename='/NewsVista'>
          <Route index element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="general" country="us" category="general" />} />
          <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="general" country="us" category="general"/>}/>
          <Route exact path="/business" element={<News  apiKey={apiKey}setProgress={setProgress} pageSize={pageSize} key="business" country="us" category="business"/>} />
          <Route exact path="/entertainment" element={<News  apiKey={apiKey}setProgress={setProgress} pageSize={pageSize} key="entertainment" country="us" category="entertainment"/>} />
          <Route exact path="/general" element={<News  apiKey={apiKey}setProgress={setProgress} pageSize={pageSize} key="general" country="us" category="general"/>} />
          <Route exact path="/health" element={<News  apiKey={apiKey}setProgress={setProgress} pageSize={pageSize} key="health" country="us" category="health"/>} />
          <Route exact path="/science" element={<News  apiKey={apiKey}setProgress={setProgress} pageSize={pageSize} key="science" country="us" category="science"/>} />
          <Route exact path="/sports" element={<News  apiKey={apiKey}setProgress={setProgress} pageSize={pageSize} key="sports" country="us" category="sports"/>} />
          <Route exact path="/technology" element={<News  apiKey={apiKey}setProgress={setProgress} pageSize={pageSize} key="technology" country="us" category="technology"/>} />          
        </Routes>

        <Footer className="footer navbar-fixed-bottom"/>
      </BrowserRouter>
        
        
      </div>
    )

}

export default App;

