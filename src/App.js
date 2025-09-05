import AppRoutes from "./core/AppRoutes"
import {BrowserRouter} from "react-router-dom"
import './App.css';

function App() {
    return (
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    )
}

export default App;
