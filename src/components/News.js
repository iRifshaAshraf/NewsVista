import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component'


export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 6,
        category: 'general',
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        };
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsVista`;
    }
    async updateNews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=76e1db33b6a045858d2f1ad493c0792e&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles, 
            totalResults: parsedData.totalResults,
            loading: false
        });
    }

    async componentDidMount(){
        this.updateNews();       
    }
    fetchMoreData = async () => {
        this.setState({page: this.state.page + 1});
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=76e1db33b6a045858d2f1ad493c0792e&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        });
    }

    handlePrevClick = async ()=>{
        this.setState({
            page: this.state.page - 1            
        });
        this.updateNews();        
    }

    handleNextClick = async ()=>{
        this.setState({
            page: this.state.page + 1            
        });
        this.updateNews();
    }

    render() {
        return (
            <div>
                <div className="container my-5">
                    <h1 className="text-center">NewsVista - Top Headings from {this.capitalizeFirstLetter(this.props.category)}</h1>
                    {this.state.loading && <Spinner/>}   
                    <InfiniteScroll
                        dataLength = {this.state.articles.length}
                        next = {this.fetchMoreData}
                        hasMore = {this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner/>}
                    >
                        <div className="container">
                            <div className="row my-5">
                                {this.state.articles.map((element) => {                        
                                    return <div className="col-md-4" key={element.url}>
                                            <NewsItem source={element.source.name} 
                                            title={element.title?element.title:""} 
                                            description={element.description?element.description:""} 
                                            imageUrl={element.urlToImage} 
                                            newsUrl={element.url} 
                                            author={element.author} 
                                            date={element.publishedAt}/>
                                    </div>                        
                                })}
                            </div>  
                        </div>
                        
                    </InfiniteScroll>               
                </div>
                {/* <div className="container d-flex justify-content-between my-5">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
                </div> */}
            </div>
        );
    }
}

export default News;
