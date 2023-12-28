import { Outlet } from "react-router-dom";
import Header from "../components/Header";
const AllLayout = () => {
  return (
    <main className='p-3 my-0 mx-auto' style={{ maxWidth: "800px" }}>
          <Header />
          <Outlet />
    </main>
  );
};

export default AllLayout;
