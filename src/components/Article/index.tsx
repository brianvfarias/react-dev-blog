import { Trash } from "lucide-react";
import { Button } from "../ui/button";
// import Markdown from 'react-markdown'
import { useContext } from "react";
import { ArticlesContext } from "../../Contexts/ArticlesContext";
import Markdown from "react-markdown";
export interface ArticleProps {
  id: string,
  title: string,
  content: string,
  cover?: string
}

export function Article({ id, title, content, cover }: ArticleProps) {
  // console.log('cover', cover)
  const articlesContext = useContext(ArticlesContext);
  return (
    <article id={id} className="flex flex-col w-1/2 items-start px-8 py-4 mx-auto my-4 rounded-sm bg-slate-300" >
      <div className="flex justify-around  w-full">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button variant="destructive" onClick={() => articlesContext!.deleteArticle({ id, title, content })} >
          <Trash />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <img src={cover} alt={"Cover of the article " + title} className="mb-4" />
        <div>
          <Markdown className='prose prose-h1:text-xl' >{content}</Markdown>
          <Button variant={"outline"} className="mt-4" >Read more</Button>
        </div>
      </div>
    </article>
  )
}