// import { useSelector } from "react-redux";
import "./App.css";
import "./Styles/index.css";
import OverviewFlow from "./component/ReactFlow/OverviewFlow.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { FlowProvider } from "./contextAPI/index.js";
import Dashboard from "./component/Dashboard/Dashboard.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  // const data = useSelector((state) => {
  //   return state;
  // });
  return (
    <div className="App">
      <FlowProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<OverviewFlow />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
        {/* <OverviewFlow /> */}
      </FlowProvider>
    </div>
  );
}

export default App;
