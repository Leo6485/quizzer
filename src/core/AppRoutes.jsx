import { Routes, Route } from "react-router-dom"
import Quiz from "../features/quiz/Quiz"

function AppRoutes() {
    return (
        <Routes>
            <Route path="/quiz" element={<Quiz/>}/>
            <Route path="/home" element={<div></div>}/>
        </Routes>
    )
}

export default AppRoutes