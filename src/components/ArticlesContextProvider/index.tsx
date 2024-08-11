import { ReactElement, useEffect, useReducer } from "react";
import { ArticleProps } from "../Article";
import { ArticlesContext } from "../../Contexts/ArticlesContext";



interface ArticleReducerActions {
  type: string,
  payload?: ArticleProps
}

export interface ReducerState {
  articles: ArticleProps[]
}


async function articlesReducer(state: ReducerState, action: ArticleReducerActions): ReducerState {
  const { articles } = state;
  switch (action.type) {
    case 'ADD_ARTICLE': {
      // const newArticles = ;
      localStorage.setItem('articles', JSON.stringify([...articles, action!.payload]))
      return { ...state, articles: [...articles, action!.payload] }
      break;
    }
    case 'DELETE_ARTICLE': {
      const newArticles = articles.filter(article => article.id !== action?.payload.id)
      return { ...state, articles: newArticles };
      break;
    }
    case 'LOAD_ARTICLES': {
      const localArticles = await fetchArticles();
      console.log("fetch", localArticles)
      return { ...localArticles };
      break;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}


// # Centering divs in HTML/CSS

// There are many ways of centering a div in CSS and, this is part of the reason why it can be so challenging at times.

// Following there are some options available for doing it

// # Margin Auto

// If your issue is trying to center a div horizontally, an easy way of doing so is using the following code:

// ```css
// div {
//    margin: 0 auto; 
// }
// ```

// # Grid

// Grid layout has also an amazing shorthand allowing any HTML developer (contains irony) to center a div:

// ```css
// div {
//   display: grid;
//   place-items: center;
// }
// ```

interface ArticlesContextProviderProps {
  children: ReactElement
}


async function fetchArticles() {
  const response = await fetch('http://localhost:8888/articles')
    .then(res => res.json())
    .then(data => data);
  console.log(response);
  return { articles: [...response] }
}



export function ArticlesContextProvider({ children }: ArticlesContextProviderProps) {
  const [state, dispatch] = useReducer(articlesReducer, { articles: [] })
  useEffect(() => {
    loadArticles();
  }, [])

  function loadArticles() {
    dispatch({ type: 'LOAD_ARTICLES' })
  }

  function addArticle(newArticle: ArticleProps) {
    dispatch({ type: 'ADD_ARTICLE', payload: newArticle })
  }

  function deleteArticle(article: ArticleProps) {
    dispatch({ type: 'DELETE_ARTICLE', payload: article })
  }

  return (
    <>
      <ArticlesContext.Provider value={{ loadArticles, addArticle, deleteArticle, state }}>
        {children}
      </ArticlesContext.Provider>
    </>
  )
}

