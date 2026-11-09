import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import Navbar from './components/Navbar';
import News from './components/News';
import CATEGORIES from './categories';

export default class App extends Component {
  pageSize = 9;
  apiKey = process.env.REACT_APP_API_KEY;
  state = { progress: 0 };

  setProgress = (progress) => this.setState({ progress });

  render() {
    return (
      <Router>
        <LoadingBar color="#ef4444" height={3} progress={this.state.progress} onLoaderFinished={() => this.setProgress(0)} />
        <Navbar />
        <main className="container py-4">
          <Routes>
            {CATEGORIES.map((c) => (
              <Route
                key={c.key}
                path={c.path}
                element={<News key={c.key} apiKey={this.apiKey} pageSize={this.pageSize} category={c.key} label={c.label} setProgress={this.setProgress} />}
              />
            ))}
            {/* Old link kept working */}
            <Route path="/sport" element={<Navigate to="/sports" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="nn-footer py-4">
          <div className="container small text-body-secondary d-flex flex-wrap justify-content-between gap-2">
            <span>NewsNow · top headlines from India</span>
            <span>
              Powered by <a href="https://newsapi.org" target="_blank" rel="noreferrer">NewsAPI.org</a>
            </span>
          </div>
        </footer>
      </Router>
    );
  }
}
