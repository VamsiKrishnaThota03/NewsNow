import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

const API = 'https://newsapi.org/v2/top-headlines';

// NewsAPI appends " - Source" to titles; the source is shown separately.
const cleanTitle = (title = '', source = '') => (source && title.endsWith(` - ${source}`) ? title.slice(0, -(source.length + 3)) : title);

export class News extends Component {
  state = { articles: [], loading: true, page: 1, totalResults: 0, error: null };

  componentDidMount() {
    document.title = `${this.props.label} headlines · NewsNow`;
    this.loadPage(1);
  }

  buildUrl(page) {
    const params = new URLSearchParams({
      country: 'in',
      category: this.props.category,
      page: String(page),
      pageSize: String(this.props.pageSize),
      apiKey: this.props.apiKey || '',
    });
    return `${API}?${params}`;
  }

  async loadPage(page) {
    const { setProgress = () => {} } = this.props;
    if (!this.props.apiKey) {
      this.setState({ loading: false, error: 'No NewsAPI key configured. Add REACT_APP_API_KEY to a .env file and restart the dev server.' });
      return;
    }
    if (page === 1) setProgress(20);
    this.setState({ loading: true });
    try {
      const response = await fetch(this.buildUrl(page));
      if (page === 1) setProgress(60);
      const data = await response.json();
      if (data.status !== 'ok') throw new Error(data.message || 'NewsAPI returned an error.');
      // NewsAPI sometimes repeats articles across pages; keep each URL once.
      const seen = new Set(page === 1 ? [] : this.state.articles.map((a) => a.url));
      const fresh = (data.articles || []).filter((a) => a.url && !seen.has(a.url) && a.title !== '[Removed]');
      this.setState((prev) => ({
        articles: page === 1 ? fresh : prev.articles.concat(fresh),
        totalResults: data.totalResults || 0,
        page,
        loading: false,
        error: null,
        exhausted: page > 1 && fresh.length === 0,
      }));
    } catch (err) {
      this.setState({ loading: false, error: err.message || 'Could not load headlines.' });
    }
    if (page === 1) setProgress(100);
  }

  fetchMoreData = () => this.loadPage(this.state.page + 1);

  retry = () => this.loadPage(this.state.articles.length ? this.state.page + 1 : 1);

  renderSkeleton() {
    return (
      <div className="row g-4" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <div className="col-sm-6 col-lg-4" key={i}>
            <div className="card nn-card p-0">
              <div className="nn-skeleton" style={{ aspectRatio: '16 / 9', borderRadius: 0 }} />
              <div className="p-3">
                <div className="nn-skeleton mb-2" style={{ height: 14, width: '40%' }} />
                <div className="nn-skeleton mb-2" style={{ height: 18 }} />
                <div className="nn-skeleton" style={{ height: 18, width: '70%' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { articles, loading, error, totalResults, exhausted } = this.state;
    const hasMore = !error && !exhausted && articles.length < totalResults;

    return (
      <>
        <header className="d-flex flex-wrap align-items-end justify-content-between gap-2 mb-4">
          <div>
            <p className="text-danger fw-semibold text-uppercase small mb-1">India · {this.props.label}</p>
            <h1 className="nn-title mb-0">Top {this.props.label} Headlines</h1>
          </div>
          {totalResults > 0 && <span className="text-body-secondary small">{totalResults} stories</span>}
        </header>

        {loading && articles.length === 0 && (
          <>
            <span className="visually-hidden" role="status">Loading headlines…</span>
            {this.renderSkeleton()}
          </>
        )}

        {error && (
          <div className="nn-state text-center p-4 my-3" role="alert">
            <p className="fw-semibold mb-1">Couldn&apos;t load headlines</p>
            <p className="text-body-secondary mb-3">{error}</p>
            {this.props.apiKey && (
              <button type="button" className="btn btn-dark btn-sm" onClick={this.retry}>
                Try again
              </button>
            )}
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <div className="nn-state text-center p-5">
            <p className="fw-semibold mb-1">No headlines right now</p>
            <p className="text-body-secondary mb-0">Check back later or try another category.</p>
          </div>
        )}

        {articles.length > 0 && (
          <InfiniteScroll
            dataLength={articles.length}
            next={this.fetchMoreData}
            hasMore={hasMore}
            loader={<Spinner />}
            style={{ overflow: 'visible' }}
            endMessage={<p className="text-center text-body-secondary small py-4 mb-0">You&apos;re all caught up.</p>}
          >
            <div className="row g-4">
              {articles.map((element) => (
                <div className="col-sm-6 col-lg-4" key={element.url}>
                  <NewsItem
                    title={cleanTitle(element.title, element.source?.name)}
                    desc={element.description || ''}
                    imageUrl={element.urlToImage}
                    author={element.author}
                    date={element.publishedAt}
                    newsUrl={element.url}
                    source={element.source?.name}
                  />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </>
    );
  }
}

export default News;
