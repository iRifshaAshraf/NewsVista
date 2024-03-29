import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        };
    }

    async componentDidMount(){
        console.log("cdm");
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=76e1db33b6a045858d2f1ad493c0792e&page=1&pagesize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles, 
            totalResults: parsedData.totalResults,
            loading: false
        })
        
    }

    handlePrevClick = async ()=>{
        console.log("Previous");
        let url =  `https://newsapi.org/v2/top-headlines?country=us&apiKey=76e1db33b6a045858d2f1ad493c0792e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }

    handleNextClick = async ()=>{
        console.log("Next");
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url =  `https://newsapi.org/v2/top-headlines?country=us&apiKey=76e1db33b6a045858d2f1ad493c0792e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }

        // else{
            
        // }

    }

    render() {
        return (
            <div>
                <div className="container my-5">
                    <h1 className="text-center">NewsVista - Top Headings</h1> 
                    {/* <Spinner/>   */}
                    {this.state.loading && <Spinner/>}                 
                    <div className="row my-5">
                        {!this.state.loading && this.state.articles.map((element) => {                        
                            return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title?element.title:""} 
                                    description={element.description?element.description:""} 
                                    imageUrl={element.urlToImage} newsUrl={element.url} />
                            </div>                        
                        })}
                    </div>                    
                </div>
                <div className="container d-flex justify-content-between my-5">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
                </div>
            </div>
        );
    }
}

export default News;
