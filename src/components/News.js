import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import _ from 'lodash';
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar'

export class News extends Component {

    capitalizeString = (string) => {
        return _.capitalize(string)
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            category: 'general'
        }
        document.title = `${this.capitalizeString(this.props.category)} - NewsNow`;
    }

    async updaterNews(pageNum) {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true, progress: 20 })
        let data = await fetch(url);
        this.setState({ progress: 50 })
        let parsedData = await data.json();
        this.setState({ progress: 75 })
        this.setState({
            articles: parsedData.articles,
            loading: false,
            progress: 100
        });
    }


    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=3a86299fa24042ea9839610331b90fa0&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data = await fetch(url);
        // let parsedData = await data.json();

        // this.setState({
        //     articles : parsedData.articles,
        //     totalResults : parsedData.totalResults,
        //     loading:false
        // });
        this.updaterNews(this.props.page)
    }

    handleNextClick = async () => {

        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            this.setState({ page: this.state.page + 1 })
            this.updaterNews(this.props.page)
        }
    }

    handlePrevClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=3a86299fa24042ea9839610331b90fa0&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({
        //     page : this.state.page - 1,
        //     articles : parsedData.articles,
        //     loading: false
        // });
        this.setState({ page: this.state.page - 1 })
        this.updaterNews(this.props.page)
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            loading: false,
            totalResults: parsedData.totalResults
        });
    }

    render() {
        return (
            <>

                {/* <div className='container m-4'> */}
                <h1 className='text-center'>News - Top {this.capitalizeString(this.props.category)} HeadLines</h1>
                {/* {this.state.loading && <Spinner />}  */}
                <div className='container'>
                    <LoadingBar
                        color='#f11946'
                        progress={this.state.progress}
                        // onLoaderFinished={() => setProgress(0)}
                    />
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner />}
                    >
                        <div className='row my-4'>
                            {
                                this.state.articles.map((element) => {
                                    return <div className='col-md-4' key={element.url}>
                                        <NewsItem title={!element.title ? "" : element.title} desc={!element.description ? "" : element.description} imageUrl={!element.urlToImage ? "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg" : element.urlToImage} author={element.author} date={element.publishedAt} newsUrl={element.url} source={element.source.id} />
                                    </div>
                                })
                            }
                        </div>
                    </InfiniteScroll>
                </div>
                {/* <div className='container d-flex justify-content-between m-4'>
                        <button type="button" disabled={this.state.page <= 1} onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
                        <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick} className="btn btn-dark">&rarr; Next</button>
                    </div> */}
                {/* </div> */}

            </>
        )
    }
}

export default News
