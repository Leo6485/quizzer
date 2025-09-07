import { Routes, Route } from "react-router-dom"
import Quiz from "../features/layout/Quiz"

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Quiz/>}/>
        </Routes>
    )
}

export default AppRoutes