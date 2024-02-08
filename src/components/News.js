import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component'


const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async() => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews(); 
        //eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
        setPage(page+1);        
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults)
    }

    return (
        <div>
            <div className="container my-5">
                <h1 className="text-center" style={{marginTop: "110px"}}>NewsVista - Top Headings from {capitalizeFirstLetter(props.category)}</h1>
                {loading && <Spinner/>}   
                <InfiniteScroll
                    dataLength = {articles.length}
                    next = {fetchMoreData}
                    hasMore = {articles.length !== totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                        <div className="row my-5">
                            {articles.map((element) => {                        
                                return <div className="col-md-4" key={element.url}>
                                        <NewsItem title={element.title?element.title:""} 
                                            description={element.description?element.description:""} 
                                            imageUrl={element.urlToImage} 
                                            newsUrl={element.url} 
                                            author={element.author} 
                                            date={element.publishedAt}
                                            source={element.source.name}
                                        />
                                </div>                        
                            })}
                        </div>  
                    </div>
                    
                </InfiniteScroll>               
            </div>
        </div>
    );

}

News.defaultProps = {
    country: 'us',
    pageSize: 6,
    category: 'general',
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News;
