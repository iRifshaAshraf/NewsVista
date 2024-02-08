import './App.css';
import NavBar from './components/NavBar'
import News from './components/News'

import React, { Component } from 'react'
import {
  BrowserRouter,
  // BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export class App extends Component {
  pageSize = 6;
  render() {
    return (
      <div>
        <BrowserRouter>
        <NavBar/>
        <Routes>
        <Route path="/" element={<News pageSize={this.pageSize} key="general" country="us" category="general"/>}/>
          <Route exact path="/business" element={<News pageSize={this.pageSize} key="business" country="us" category="business"/>} />
          <Route exact path="/entertainment" element={<News pageSize={this.pageSize} key="entertainment" country="us" category="entertainment"/>} />
          <Route exact path="/general" element={<News pageSize={this.pageSize} key="general" country="us" category="general"/>} />
          <Route exact path="/health" element={<News pageSize={this.pageSize} key="health" country="us" category="health"/>} />
          <Route exact path="/science" element={<News pageSize={this.pageSize} key="science" country="us" category="science"/>} />
          <Route exact path="/sports" element={<News pageSize={this.pageSize} key="sports" country="us" category="sports"/>} />
          <Route exact path="/technology" element={<News pageSize={this.pageSize} key="technology" country="us" category="technology"/>} />          
        </Routes>
        {/* <Footer mode={mode}/> */}
      </BrowserRouter>
        
        
      </div>
    )
  }
}

export default App;

