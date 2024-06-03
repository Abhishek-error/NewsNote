import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import propTypes from 'prop-types'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState([])

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const fetchMoreData = async () => {
    setPage(prevPage => prevPage + 1)
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=cf5022c9f3394adf9bdeccdaadbcf95a&page=${page + 1}&pageSize=${props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(prevArticles => prevArticles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  }

  const updateNews = async () => {
    props.setProgress(10);
    setLoading(true)
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=cf5022c9f3394adf9bdeccdaadbcf95a&page=${page}&pageSize=${props.pageSize}`;
      props.setProgress(30);
      let data = await fetch(url);
      props.setProgress(50);
      let parsedData = await data.json();
      props.setProgress(80);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults)
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    updateNews();

    document.title = `${capitalizeFirstLetter(props.category)} - NewsSpot`;
    // Reset page number when category or country changes
    setPage(1);
  }, [props.category, props.country, props.pageSize]); // Ensure that dependencies are fixed

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
                    description={element.description ? element.description.slice(0, 60) : ""}
                    title={element.title ? element.title.slice(0, 35) : ""}
                    newsUrl={element.url}
                    source={element.source.name}
                    date={element.publishedAt}
                    author={element.author}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general'
}

News.propTypes = {
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string,
  setProgress: propTypes.func.isRequired
}

export default News
