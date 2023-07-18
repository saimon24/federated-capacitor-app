import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import About from "about/About";
import List from "list/List";

import "./index.scss";

const App = () => {
  const listRef = useRef(null);

  useEffect(() => {
    List(listRef.current);
  }, []);

  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl p-4">
      <div className="text-white bg-green-500 p-4 mb-4">My Host App</div>
      <About />
      <div ref={listRef} />
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
