import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Signup from "./pages/signup";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

function App() {
  const currentUser = true;

  const IsLogin = ({ children }) => {
    if (!currentUser) return <Navigate to="/login" />;
    return children;
  };

  const Layout = () => {
    return (
      <div>
        <Header />
        <div className="flex">
          <SideBar />
          <Outlet />
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <IsLogin>
          <Layout />
        </IsLogin>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/account",
          element: <Account />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
