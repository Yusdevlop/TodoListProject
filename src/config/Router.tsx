import { Routes ,Route} from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import TodoCreate from "../components/TodoCreate"
import SignupPage from "../pages/SignupPage"
function Router() {
  return (
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/TodoList" element={<TodoCreate />} />
        <Route path="/signup" element={<SignupPage />} />
    </Routes>
  )
}

export default Router
