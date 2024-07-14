import { createContext } from "react";
import { ArticleProps } from "../../components/Article";

interface ArticleContextType {
  addArticle: (article: ArticleProps) => void
  deleteArticle: (article: ArticleProps) => void
}

export const ArticlesContext = createContext<ArticleContextType | null>(null);