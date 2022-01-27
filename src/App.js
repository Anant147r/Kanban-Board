import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Body from "./Components/Body/body";
import { Provider } from "react-redux";
import store from "./Redux/store";
import "./App.css";
function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <Body />
        </Provider>
      </DndProvider>
    </div>
  );
}

export default App;
