import { createBrowserRouter, RouterProvider } from "react-router";
import ROUTES from "./routes";
import LiveChat from "./components/LiveChat";
const router = createBrowserRouter(ROUTES);


function App() {

  return (
<>
 <RouterProvider router={router} />
 <LiveChat />
</>
  )
}

export default App
