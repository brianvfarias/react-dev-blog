import { Trash } from "lucide-react";
import { Button } from "../../components/ui/button";
import ReactMarkdown from 'react-markdown'
export interface ArticleProps {
  title: string,
  content: string,
  cover?: string
}

export function Article({ title, content }: ArticleProps) {
  return (
    <article>
      <h1>{title}</h1>
      <Button variant="destructive" >
        <Trash />
      </Button>

      <ReactMarkdown>{content}</ReactMarkdown>
      <Button variant={"outline"}>Read more</Button>
    </article>
  )
}