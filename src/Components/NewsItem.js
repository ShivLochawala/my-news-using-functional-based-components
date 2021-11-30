import React from 'react'

export default function NewsItem(props) {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className="my-3">
            <div className="card">
                <img src={imageUrl} className="card-img-top" height="250" alt={title} />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {author == null ? 'Unknown' : author} on {new Date(date).toGMTString()}</small></p>
                    <div className="d-flex justify-content-between">
                        <div>
                            <span className="badge rounded-pill bg-secondary">{source}</span>
                        </div>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>

                    </div>
                </div>
            </div>
        </div>
    )
}