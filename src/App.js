import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import OverviewFlow from "./component/OverviewFlow";
import { counterReducer } from "./redux/reducer";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    console.log("state: ", state);
    return state;
  });
  console.log("data: ", data);
  return (
    <div className="App">
      <button
        onClick={() => {
          dispatch(counterReducer(data.counterValue));
        }}
      >
        Click here
      </button>
      <OverviewFlow />
    </div>
  );
}

export default App;
