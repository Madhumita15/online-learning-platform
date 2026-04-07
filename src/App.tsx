import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./routes/Routes";
import ReduxProvider from "./services/helper/provider/ReduxProvider";
import { Toaster } from "sonner";


function App() {
  return (
    <>
      <Toaster richColors position="top-right" closeButton />

      <ReduxProvider>
        <RouterProvider router={routes} />
      </ReduxProvider>
    </>
  );
}

export default App;
