import { Routes, Route } from "react-router-dom";
import Front from "./pages/Front";
import Back from "./pages/Back";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Front/> } />
        <Route path="/back" element={ <Back/> } />
      </Routes>
    </div>
  );
}

export default App;
