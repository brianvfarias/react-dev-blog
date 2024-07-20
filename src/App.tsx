// import { ArticleList } from "./componets/ArticleList/ArticleList";

import { Navigate, Route, Routes } from "react-router-dom";
import { ArticlesContextProvider } from "./components/ArticlesContextProvider";
import { ArticleForm } from "./components/ArticleForm";
// import { Article } from "./components/Article";
import { ArticleList } from "./components/ArticleList";
import { useContext } from "react";
import { ArticlesContext } from "./Contexts/ArticlesContext";
import { ArticlePage } from "./components/ArticlePage";
import { ArticleLayout } from "./components/ArticleLayout";

function App() {
  const { state } = useContext(ArticlesContext)

  return (
    <>
      <ArticlesContextProvider>
        <Routes>
          <Route path="/" element={<ArticleList articles={state?.articles ?? []} />} />
          <Route path="/new" element={<ArticleForm />} />
          <Route path="/:id" element={<ArticleLayout />}>
            <Route index path="/:id/show" element={<ArticlePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ArticlesContextProvider >

    </>
  )
}

export default App
