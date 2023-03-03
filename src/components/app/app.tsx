import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FibonacciPage } from "../fibonacci-page/fibonacci-page";
import { ListPage } from "../list-page/list-page";
import { MainPage } from "../main-page/main-page";
import { QueuePage } from "../queue-page/queue-page";
import { StringComponent } from "../string/string";
import { SortingPage } from "../sorting-page/sorting-page";
import { StackPage } from "../stack-page/stack-page";

import "./app.css";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/recursion" element={<StringComponent />}></Route>
          <Route path="/fibonacci" element={<FibonacciPage />}></Route>
          <Route path="/sorting" element={<SortingPage />}></Route>
          <Route path="/stack" element={<StackPage />}></Route>
          <Route path="/queue" element={<QueuePage />}></Route>
          <Route path="/list" element={<ListPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
