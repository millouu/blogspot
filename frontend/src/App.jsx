import { Routes, Route } from "react-router-dom";
import AllLayout from "./layouts/AllLayout";
import PostListPage from "./pages/PostsListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserContextProvider from "./context/UserContext";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import EditPostPage from "./pages/EditPostPage";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<AllLayout />}>
          <Route index element={<PostListPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />
          <Route path={"/create"} element={<CreatePostPage />} />
          <Route path={"/post/:id"} element={<PostPage />} />
          <Route path={"/editpost/:id"} element={<EditPostPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
