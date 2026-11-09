import React, { Component } from 'react';

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center py-4" role="status">
        <div className="spinner-border text-danger" aria-hidden="true"></div>
        <div className="small text-body-secondary mt-2">Loading more headlines…</div>
      </div>
    );
  }
}
