import { Article, ArticleProps } from "../Article";

interface ArticleListProps {
  articles: ArticleProps[] | []
}

export function ArticleList({ articles }: ArticleListProps) {
  console.log("Articles in Article List", articles)
  if (articles.length < 1) {
    return <div>No articles yet!</div>
  }
  return (
    <div>
      {articles.map(article => (
        <Article key={new Date().getTime()} title={article.title} content={article.content} />
      ))}
    </div>

  )

}