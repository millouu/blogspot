import { Routes, Route } from "react-router-dom";
import AllLayout from "./layouts/AllLayout";
import BlogPage from "./pages/BlogPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserContextProvider from "./context/UserContext";

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<AllLayout />}>
        <Route index element={<BlogPage/>} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage />} />
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
