import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Users from "./pages/Users";
import Posts from "./pages/Posts";
import Albums from "./pages/Albums";
import PostDetail from "./pages/PostDetail";
import Photos from "./pages/PostDetail";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id/posts" element={<Posts />} />
            <Route path="/users/:id/albums" element={<Albums />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/albums/:id/photos" element={<Photos />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
