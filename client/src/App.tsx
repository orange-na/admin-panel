import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const currentUser = true;

  const IsLogin = ({ children }) => {
    if (!currentUser) return <Navigate to="/login" />;
    return children;
  };

  const Layout = () => {
    return (
      <div>
        <Outlet />
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
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
