import { useSelector } from "react-redux";
import "./App.css";
import "./Styles/index.css";
import OverviewFlow from "./component/ReactFlow/OverviewFlow.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function App() {
  const data = useSelector((state) => {
    console.log("state: ", state);
    return state;
  });
  console.log("data: ", data);
  return (
    <div className="App">
      <OverviewFlow />
    </div>
  );
}

export default App;
