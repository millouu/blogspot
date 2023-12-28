import { Routes, Route } from "react-router-dom";
import AllLayout from "./layouts/AllLayout";
import BlogPage from "./pages/BlogPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path='/' element={<AllLayout />}>
        <Route index element={<BlogPage/>} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
