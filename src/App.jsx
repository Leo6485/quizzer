import AppRoutes from "./core/AppRoutes"
import {BrowserRouter} from "react-router-dom"
import './App.css';

function App() {
    return (
      <div className="root">
        <BrowserRouter>
          <AppRoutes/>
        </BrowserRouter>
      </div>
    )
}

export default App;
