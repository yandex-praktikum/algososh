import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FibonacciPage } from "../fibonacci-page/fibonacci-page";
import { ListPage } from "../list-page/list-page";
import { MainPage } from "../main-page/main-page";
import { QueuePage } from "../queue-page/queue-page";
import { StringComponent } from "../string/string";
import { SortingPage } from "../sorting-page/sorting-page";
import { StackPage } from "../stack-page/stack-page";
import {rootPath, recursionPath, fibonacciPath, sortingPath, stackPath, queuePath, listPath} from '../../constants/roots'

import styles from "./app.module.css";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path={rootPath} element={<MainPage />}></Route>
          <Route path={recursionPath} element={<StringComponent />}></Route>
          <Route path={fibonacciPath} element={<FibonacciPage />}></Route>
          <Route path={sortingPath} element={<SortingPage />}></Route>
          <Route path={stackPath} element={<StackPage />}></Route>
          <Route path={queuePath} element={<QueuePage />}></Route>
          <Route path={listPath} element={<ListPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
