"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export default function News({ params }: any) {
  const [news, setNews] = useState<Article[]>();
  const [articleNum, setArticleNum] = useState<number>(3);

  useEffect(() => {
    fetch("https://saurav.tech/NewsAPI/top-headlines/category/business/us.json")
      .then((res) => res.json())
      .then((data) => setNews(data.articles))
      .catch((err) => console.error("Failed to fetch news:", err));
  }, []);
  // console.log(news);
  return (
    <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 flex flex-col">
      <h4 className="font-bold text-xl px-4">Whats happening</h4>
      <>
        {news?.slice(0, articleNum).map((article, index) => (
          <div key={index}>
            <a href={article.url} target="_blank">
              <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition-all duration-200">
                <div className="space-y-1">
                  <h6 className="text-sm font-bold">{article.title}</h6>
                  <p className="text-xs font-medium text-gray-500">
                    {article.source.name}
                  </p>
                </div>
                {article.urlToImage && (
                  <Image
                    className="rounded-full"
                    src={article.urlToImage}
                    alt={article.title}
                    width={70}
                    height={40}
                    // layout="responsive"
                  />
                )}
              </div>
            </a>
          </div>
        ))}
      </>
      <button
        onClick={() => setArticleNum(articleNum + 3)}
        className="   pb-2 text-blue-300 hover:text-blue-400"
      >
        {news ? "Load More" : "Loading"}
      </button>
    </div>
  );
}
