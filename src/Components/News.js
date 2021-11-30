import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const updateNews = async (pageNo) => {
        props.setProgress(20);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${pageNo}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(50);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    }
    useEffect(() => {
        document.title = `${props.category.replace(/\b\w/g, function(l){ return l.toUpperCase() })} | myNews`
        updateNews(1);
        // eslint-disable-next-line
    }, []);

    const fetchMoreData = async () => {
        console.log(page);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page + 1}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    };

    return (
        <>
            <h1 className="text-center text-capitalize my-5 mx-5 mt-5 mb-5">myNews - Top {props.category} Headlines</h1>
            {loading && <Loader />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Loader />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element, index) => {
                            return <div className="col-md-4" key={index}>
                                <NewsItem title={element.title === null ? '' : element.title.slice(0, 45)} description={element.description === null ? '' : element.description.slice(0, 88)} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="d-flex justify-content-between">
                    <button disabled={page<=1} className="btn btn-sm btn-primary" onClick={handlePrevClick} >&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize) } className="btn btn-sm btn-primary" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}
        </>
    )
}
News.defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'technology'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
