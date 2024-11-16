import { BrowserRouter } from "react-router-dom";

import { Main } from "./components";

const App = () => {
  return (
    <BrowserRouter>
        <div className="bg-gray">
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
