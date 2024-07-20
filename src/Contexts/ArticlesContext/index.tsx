import { createContext } from "react";
import { ArticleProps } from "../../components/Article";
import { ReducerState } from "../../components/ArticlesContextProvider";

interface ArticleContextType {
  addArticle: (article: ArticleProps) => void
  deleteArticle: (article: ArticleProps) => void
  state: ReducerState
}

export const ArticlesContext = createContext<ArticleContextType>({} as ArticleContextType);