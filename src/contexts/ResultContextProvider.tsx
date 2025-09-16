import React, { createContext, useContext, useState } from "react";
import { searchResults, imageResults, newResults, videoResults } from "../mockApiResults"

type ResultContextProviderProps = {
    children: React.ReactNode
}

type SearchResult = {
  searchParameters: Record<string, any>,
  organic: Array<{
    title: string,
    link: string,
    snippet: string,
    position: number,
    sitelinks?: Array<{ title: string, link: string }>,
    date?: string
  }>;
};

type ImageResults = {
  searchParameters: Record<string, any>,
  images: Array<{
    title: string,
    source: string,
    link: string,
    imageUrl: string,
    thumbnail: string
  }>;
};

type NewResults = {
  searchParameters: Record<string, any>,
  news: Array<{
    title: string,
    link: string,
    snippet: string,
    date: string,
    source: string,
    imageUrl: string
  }>
}

type VideoResults = {
  searchParameters: Record<string, any>,
  videos: Array<{
    title: string,
    link: string,
    imageUrl: string,
    videoUrl: string,
    snippet: string,
    source: string,
    date: string,
    position: number,
    duration: string,
    channel: string
  }>
};

type ApiResults = SearchResult | ImageResults | NewResults | VideoResults;

type ResultContextType = {
  results: ApiResults | null,
  isLoading: boolean,
  searchTerm: string,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
  getResults: (type: string) => Promise<void>
};

const ResultContext = createContext<ResultContextType | undefined>(undefined)
const baseUrl = "https://google-search-master-mega.p.rapidapi.com";

export const ResultContextProvider: React.FC<ResultContextProviderProps> = ({ children }) => {
    const [results, setResults] = useState<ApiResults | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("Jesus");

    const getResults = async (type: string) => {
        setIsLoading(true);

        // const response = await fetch(`${baseUrl}${type}`, {
        //     method: "GET",
        //     headers: {
        //         'x-rapidapi-key': process.env.REACT_APP_API_KEY,
		    //         'x-rapidapi-host': 'google-search74.p.rapidapi.com'
        //     }
        // })
        
        //const data = await response.json();
        const data = videoResults;
        console.log("DATA", data);

        setResults(data);
        setIsLoading(false);
    }

    return (
        <ResultContext.Provider value = {{getResults, results, searchTerm, setSearchTerm, isLoading}}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => {
  const context = useContext(ResultContext);
  if (!context) {
    throw new Error("useResultContext must be used within a ResultContextProvider");
  }
  return context;
};