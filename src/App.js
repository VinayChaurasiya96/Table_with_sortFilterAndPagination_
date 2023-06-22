
import "./App.css";
import Posts from "./components/Posts";
import Post from "./components/Post";
import NotFound from "./components/NotFound";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App container">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Posts />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
