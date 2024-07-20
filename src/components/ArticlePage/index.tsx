import { useContext } from "react";
import { ArticlesContext } from "../../Contexts/ArticlesContext";
import { Navigate, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { Button } from "../ui/button";

export function ArticlePage() {
  // console.log(cover)
  const { state } = useContext(ArticlesContext);
  const { id } = useParams();
  const article = state.articles.find(a => a.id === id);
  if (!article) return <Navigate to="/" />
  return (
    <article id={article.id} className="flex flex-col w-1/2 items-start px-8 py-4 mx-auto my-4 rounded-sm bg-slate-300" >
      {/* <div className="flex justify-around  w-full">
        <h1 className="text-2xl font-bold">{article.title}</h1>
        <Button variant="destructive" onClick={() => deleteArticle(article)} >
          <Trash />
        </Button>
      </div> */}

      <div className="grid grid-cols-2 gap-5">
        <img src={article.cover} alt={"Cover of the article " + article.title} className="mb-4" />
        <div>
          <Markdown className='prose prose-h1:text-xl' >{article.content}</Markdown>
          <Button variant={"outline"} className="mt-4" >Read more</Button>
        </div>
      </div>
    </article>
  )
}