import { useReducer } from "react";
import { ArticleProps } from "./components/Article"
// import { ArticleList } from "./componets/ArticleList/ArticleList";
import { Navbar } from "./components/Navbar"
import { ArticleList } from "./components/ArticleList";
import { ArticlesContext } from "./Contexts/ArticlesContext";

interface ArticleReducerActions {
  type: string,
  payload: ArticleProps
}

interface ReducerState {
  articles: ArticleProps[]
}


function articlesReducer(state: ReducerState, action: ArticleReducerActions): ReducerState {
  const { articles } = state;
  switch (action.type) {
    case 'ADD_ARTICLE': {
      // const newArticles = ;
      return { ...state, articles: [...articles, action!.payload] }
      break;
    }
    case 'DELETE_ARTICLE': {
      const newArticles = articles.filter(article => article.id !== action.payload.id)
      return { ...state, articles: newArticles }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}



function App() {
  const [state, dispatch] = useReducer(articlesReducer, { articles: [] })
  // const [articles, setArticles] = useState<ArticleProps[]>([]);

  function addArticle(newArticle: ArticleProps) {
    dispatch({ type: 'ADD_ARTICLE', payload: newArticle })
  }

  function deleteArticle(article: ArticleProps) {
    dispatch({ type: 'DELETE_ARTICLE', payload: article })
  }

  return (
    <>
      <ArticlesContext.Provider value={{ addArticle, deleteArticle }}>
        <Navbar />
        <ArticleList articles={state.articles} />
      </ArticlesContext.Provider>
    </>
  )
}

export default App
