import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import ReactPlayer from "react-player";

import { useResultContext } from "../contexts/ResultContextProvider";
import Loading from "./Loading";

const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if(searchTerm) {
      getResults(`${location.pathname}?q=${searchTerm}&num=40`);
    }
  }, [searchTerm, location.pathname])

  if(isLoading) return <Loading/>
  console.log(location.pathname)
  
  if(results === null)
    return null
  
  switch (location.pathname) {
    case "/search":
      if ("organic" in (results))
        return (
          <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
            {results.organic.map(({link, title}, index) => (
                  <div key={index} className="md:w-1/5 w-full">
                    <a href={link} target="_blank" rel="noreferrer">
                      <p className="text-sm">
                        {link.length > 30 ? link.substring(0,30) : link}
                      </p>
                      <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                        {title}
                      </p>
                    </a>
                  </div>
            ))}
          </div>
        );
        break;
    case "/images":
      if ("images" in (results))
        return (
          <div className="flex flex-wrap justify-center items-center">
            {results.images?.map(({ link, imageUrl, title }, index) => (
              <a className="sm:p-3 p-5" href={link} key={index} target="_blank" rel="noreferrer">
                <img className="w-full h-32 max-w-32" src={imageUrl} alt={title} loading="lazy"/>
                <p className="w-36 break-words text-sm mt-2">
                  {title.length > 20 ? title.substring(0,20) + "..." : title}
                </p>
              </a>
            ))}
          </div>
        );
        break
    case "/news":
      if ("news" in (results))
        return (
          <div className="lg:ml-72 flex w-full max-w-[720px] flex-wrap gap-4 justify-center items-center sm:p-3 p-5">
            {results.news?.map(({ link, title, imageUrl }, index) => (
              <a className="w-full flex items-center gap-4 hover:underline" href={link} key={index} target="_blank" rel="noreferrer">
                <p className="w-full text-lg dark:text-blue-300 text-blue-700">
                  {title}
                </p>
                <img className="w-32" src={imageUrl} alt={title} loading="lazy"/>
              </a>
            ))}
          </div>
        );
        break
    case "/videos":
      if ("videos" in (results))
        return (
          <div className="lg:ml-72 flex w-full max-w-[720px] flex-wrap gap-4 justify-center items-center sm:p-3 p-5">
            {results.videos.map(({ link, title, snippet, date, source, channel, duration }, index) => (
              <a className="w-full flex flex-col items-start" href={link} key={index} target="_blank" rel="noreferrer">
                <p>
                  {source}
                </p>
                <p className="w-full text-lg dark:text-blue-300 text-blue-700">
                  {title}
                </p>
                <div className="flex w-full gap-4">
                  <div className="relative">
                    <ReactPlayer width="32px" height="100%" src={link}/>
                    <span className="absolute text-white left-2 bottom-2 ">{duration}</span>
                  </div>
                  <div className="w-full">
                    <p className="mb-4">{snippet}</p>
                    <p>{source}.{channel}.{date}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        );
        break;
    default:
      return (<div>'ERROR'</div>);
  } 
}

export default Results