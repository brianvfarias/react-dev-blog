import { ArticleProps } from "../Article";
import { AritcleDialog } from "../ArticleDialog";

interface NavbarProps {
  modifyArticles: (article: ArticleProps) => void
}

export function Navbar({ modifyArticles }: NavbarProps) {
  return (
    <nav>
      <AritcleDialog modifyArticles={modifyArticles} />
    </nav>
  )
}