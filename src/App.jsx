import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Users from "./pages/Users";
import Posts from "./pages/Posts";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id/posts" element={<Posts />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
