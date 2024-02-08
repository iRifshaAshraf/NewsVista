import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, date, author, source} = this.props;
    return (
        <div>
            
            <div className="card mb-4">
              <span className="badge text-bg-dark py-3" style={{borderRadius: "0", borderTopLeftRadius: "5px", borderTopRightRadius: "5px"}}>{source}</span>
              <img src={!imageUrl?"https://www.sprc.org.pk/wp-content/uploads/2020/12/revised-news-4-image-e.jpg":imageUrl} className="card-img-top"  style={{borderRadius: "0"}} alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="class-text"><small className="text-muted">Last updated {new Date(date).toLocaleDateString()} {new Date(date).toLocaleTimeString()}  mins ago <br/> By {!author?"Unknown": author}</small></p>
                <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Read More...</a>
              </div>
            </div>
        </div>
    )
  }
}

export default NewsItem
