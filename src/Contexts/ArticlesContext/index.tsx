import { createContext } from "react";
import { ArticleCreation } from "../../components/Article";

interface ArticleContextType {
  addArticle: (article: ArticleCreation) => void
  deleteArticle: (id: string) => void
}

export const ArticlesContext = createContext<ArticleContextType | null>(null);