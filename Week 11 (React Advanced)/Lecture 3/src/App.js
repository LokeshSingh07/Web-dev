import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import { Routes, Route, useLocation, useSearchParams } from "react-router-dom";
import BlogPage from "./pages/BlogPage";
import TagPage from "./pages/TagPage";
import CategoryPage from "./pages/CategoryPage";
import Home from "./pages/Home";






export default function App() {
  const { fetchBlogPosts } = useContext(AppContext);

  const [searchparams, setSearchParams] = useSearchParams();
  const location = useLocation();


  useEffect(() => {
    const page = searchparams.get("page") ?? 1;

    if(location.pathname.includes("tags")){
      const tag = location.pathname.split("/").at(-1).replace("-"," ");
      fetchBlogPosts(Number(page), tag);
    }
    else if(location.pathname.includes("categories")){
      const category = location.pathname.split("/").at(-1).replace("-", " ");
      fetchBlogPosts(Number(page), null, category);
    }
    else{
      fetchBlogPosts(Number(page));
    }
  },[location.pathname, location.search]);



  return (
    <div>
      
    

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/blog/:blogId" element={<BlogPage/>} />
        <Route path="/tags/:tag" element={<TagPage/>} />
        <Route path="/categories/:category" element={<CategoryPage/>} />
      </Routes>


    </div>


  );
}
