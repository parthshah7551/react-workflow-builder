// import { useSelector } from "react-redux";
import "./App.css";
import "./Styles/index.css";
import OverviewFlow from "./component/ReactFlow/OverviewFlow.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { FlowProvider } from "./contextAPI/index.js";

function App() {
  // const data = useSelector((state) => {
  //   return state;
  // });
  return (
    <div className="App">
      <FlowProvider>
        <OverviewFlow />
      </FlowProvider>
    </div>
  );
}

export default App;
