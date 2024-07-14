import { useState } from "react";
import { ArticleProps } from "./componets/Article"
// import { ArticleList } from "./componets/ArticleList/ArticleList";
import { Navbar } from "./componets/Navbar"
import { ArticleList } from "./componets/ArticleList/ArticleList";


function App() {
  const [articles, setArticles] = useState<ArticleProps[]>([]);

  function addArticles(newArticle: ArticleProps) {
    setArticles(articles => {
      if (articles.length > 0) {
        return [...articles, newArticle]
      }
      return [newArticle]
    })
  }

  return (
    <>
      <Navbar modifyArticles={addArticles} />
      <ArticleList articles={articles} />
    </>
  )
}

export default App
