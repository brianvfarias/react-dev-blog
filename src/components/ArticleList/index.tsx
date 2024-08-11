import { Article, ArticleProps } from "../Article";

interface ArticleListProps {
  articles: ArticleProps[] | []
}


export function ArticleList({ articles }: ArticleListProps) {
  console.log("Articles in Article List", articles)
  if (!articles) {
    return <div>No articles yet!</div>
  }
  return (
    <div>
      {articles.map(article => (
        <Article key={article.id} id={article.id} content={article.content} title={article.title} cover={article.cover} />
      ))}
    </div>

  )

}