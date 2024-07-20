import { useContext } from "react";
import { ArticlesContext } from "../../Contexts/ArticlesContext";
import { Navigate, Outlet, useParams } from "react-router-dom";


export function ArticleLayout() {
  // console.log(cover)
  const { state } = useContext(ArticlesContext);
  const { id } = useParams();
  const article = state.articles.find(a => a.id === id);
  if (!article) return <Navigate to="/" />
  return <Outlet context={article} />
}