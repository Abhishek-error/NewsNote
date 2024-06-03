import React from 'react'

const NewsItem = (props)  => {

      let {imgUrl, discription, title, newsUrl, source, date, author} = props;

    return (
   <>
<div className="card ">
   
<span style={{fontSize: '1.1rem', zIndex: '1', textAlign: 'center', backgroundColor: 'white', color: 'black', border: '1px solid red'}} className="position-absolute top-0 translate-middle badge rounded-pill bg-light">
{source}

</span>

  <img src={!imgUrl?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-jK0yYvBkBclJgWEjPvpuGjLjLT8djAdKxQ&usqp=CAU":imgUrl} className="card-img-top" alt="NewsSpot"/>
  <div className="card-body">
  <h5 className="card-title">{title}...</h5>
    <p className="card-text">{discription}...</p>
    <p class="card-text"><small class="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>

    <a href={newsUrl} target='_blanked' id="read" className="btn btn-light btn-sm">READ MORE</a>
  </div>
</div>
   
   </>
    )
  
}

export default NewsItem
