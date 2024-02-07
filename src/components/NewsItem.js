import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
        <div>
            
            <div className="card mb-4" style={{width: "20rem"}}>
                <img src={!imageUrl?"https://www.sprc.org.pk/wp-content/uploads/2020/12/revised-news-4-image-e.jpg":imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read More...</a>
                </div>
            </div>
        </div>
    )
  }
}

export default NewsItem
