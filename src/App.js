import React from "react";
import Body from "./Components/Body/body";
import { Provider } from "react-redux";
import store from "./Redux/store";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Body />
      </Provider>
    </div>
  );
}

export default App;
