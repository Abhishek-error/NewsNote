import React, { useState, useEffect, useCallback } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const fetchMoreData = async () => {
    const newPage = page + 1;
    setPage(newPage);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${newPage}&pageSize=${props.pageSize}`;

    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles((prevArticles) => prevArticles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  };

  const updateNews = useCallback(async () => {
    props.setProgress(10);
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=1&pageSize=${props.pageSize}`;
    props.setProgress(30);
    try {
      let data = await fetch(url);
      props.setProgress(50);
      let parsedData = await data.json();
      props.setProgress(80);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
      setPage(1); // Reset page to 1
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
      props.setProgress(100);
    }
  }, [props]);

  useEffect(() => {
    updateNews();
    document.title = `${capitalizeFirstLetter(props.category)} - NewsSpot`;
  }, [props.category, props.country, props.pageSize, updateNews]);

  return (
    <>
      <h2 style={{ textAlign: 'center' }} className="my-4">{capitalizeFirstLetter(props.category)} All Headlines</h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container" style={{ marginTop: '3.5rem' }}>
          <div className="row" style={{ marginTop: '3.5rem' }}>
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    imgUrl={element.urlToImage}
                    discription={element.description ? element.description.slice(0, 60) : ""}
                    title={element.title ? element.title.slice(0, 35) : ""}
                    newsUrl={element.url}
                    source={element.source.name}
                    date={element.publishedAt}
                    author={element.author}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

export default News;
