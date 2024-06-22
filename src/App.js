import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React, { Component } from 'react'

export default class App extends Component {
  pageSize =7;
  progress=0;
  apiKey = process.env.REACT_APP_API_KEY;
  render() {
    return (
      <>
        <Router>
        <Navbar />
        <Routes>
        {/* console.log({this.apiKey}) */}
          <Route exact path="/business" element={<News key='business' apikey={this.apiKey} pageSize={this.pageSize} category="business" progress={this.progress} />} />
          <Route exact path="/entertainment" element={<News key='entertainment' apikey={this.apiKey} pageSize={this.pageSize} category="entertainment" progress={this.progress} />} />
          <Route exact path="/" element={<News key='general' apikey={this.apiKey} pageSize={this.pageSize} category="general" progress={this.progress} />} />
          <Route exact path="/health" element={<News key='health' apikey={this.apiKey} pageSize={this.pageSize} category="health" progress={this.progress} />} />
          <Route exact path="/science" element={<News key='science' apikey={this.apiKey} pageSize={this.pageSize} category="science" />} progress={this.progress} />
          <Route exact path="/sport" element={<News key='sport' apikey={this.apiKey} pageSize={this.pageSize} category="sport" progress={this.progress} />} />
          <Route exact path="/technology" element={<News key='technology' apikey={this.apiKey} pageSize={this.pageSize} category="technology" progress={this.progress} />} />
        </Routes>
      </Router>
      </>
    )
  }
}
