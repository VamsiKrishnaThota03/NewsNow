import React, { Component } from 'react';

const FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180"><rect width="320" height="180" fill="#e5e7eb"/><text x="160" y="98" font-family="sans-serif" font-size="20" font-weight="700" fill="#9ca3af" text-anchor="middle">NewsNow</text></svg>'
  );

const timeAgo = (date) => {
  const diff = (Date.now() - new Date(date).getTime()) / 1000;
  if (Number.isNaN(diff)) return '';
  if (diff < 3600) return `${Math.max(1, Math.round(diff / 60))} min ago`;
  if (diff < 86400) return `${Math.round(diff / 3600)} h ago`;
  return new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
};

export class NewsItem extends Component {
  render() {
    const { title, desc, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <article className="card nn-card">
        <img
          src={imageUrl || FALLBACK}
          className="nn-card-img"
          alt=""
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = FALLBACK;
          }}
        />
        <div className="card-body d-flex flex-column">
          {source && <span className="badge rounded-pill nn-source align-self-start mb-2">{source}</span>}
          <h2 className="card-title h6 fw-bold">{title}</h2>
          {desc && <p className="card-text small">{desc}</p>}
          <div className="mt-auto pt-2 small text-body-secondary d-flex justify-content-between gap-2">
            <span className="text-truncate">{author || 'Unknown author'}</span>
            <time dateTime={date} className="text-nowrap">{timeAgo(date)}</time>
          </div>
          <a href={newsUrl} rel="noreferrer" target="_blank" className="stretched-link">
            <span className="visually-hidden">Read “{title}” (opens in a new tab)</span>
          </a>
        </div>
      </article>
    );
  }
}

export default NewsItem;
