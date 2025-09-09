import { Routes, Route } from "react-router-dom"
import Base from "../features/layout/Base"

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Base/>}/>
        </Routes>
    )
}

export default AppRoutes