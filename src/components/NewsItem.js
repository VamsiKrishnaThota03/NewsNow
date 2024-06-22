import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, desc, imageUrl, newsUrl, author, date, source } = this.props
        return (
            <>
                <div className="card" style={{ width: "18rem" ,margin: "3rem" }}>
                    {source && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {source}
                        <span className="visually-hidden">unread messages</span>
                    </span>}
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title.slice(0, 18)}...</h5>
                        <p className="card-text">{desc.slice(0, 50)}....</p>
                        <div className="card-footer text-body-secondary">Published by {!author ? "unknown" : author} on {new Date(date).toGMTString()}</div>
                        <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-primary">Read More</a>
                    </div>
                </div>
            </>
        )
    }
}

export default NewsItem
