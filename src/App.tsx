import { useEffect, useReducer } from "react";
import { ArticleProps } from "./components/Article"
// import { ArticleList } from "./componets/ArticleList/ArticleList";
import { Navbar } from "./components/Navbar"
import { ArticleList } from "./components/ArticleList";
import { ArticlesContext } from "./Contexts/ArticlesContext";

interface ArticleReducerActions {
  type: string,
  payload: ArticleProps | ArticleProps[]
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
      const newArticles = articles.filter(article => article.id !== action.payload!.id)
      return { ...state, articles: newArticles }
    }
    case 'LOAD_ARTICLES': {

      return { ...state, articles: action.payload };
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



function App() {
  const [state, dispatch] = useReducer(articlesReducer, { articles: [] })
  useEffect(() => {
    (async function fetchArticles() {
      const response = await fetch('http://localhost:8888/articles')
        .then(res => res.json())
        .then(data => data);
      console.log('response', response);
      dispatch({ type: 'LOAD_ARTICLES', payload: response })
    })();
  }, [])

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
