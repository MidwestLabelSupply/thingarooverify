import { Modal } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import "./App.css";
import Loader from "./components/Modals/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductPageContainer from "./containers/ProductPage/ProductPageContainer";
import NotFoundContainer from "./containers/NotFound/NotFoundContainer";
import BoxLoader from "./components/Modals/BoxLoader";
import "./quill.snow.css";

export const GlobalDataContext = createContext();
function App() {
  const [clientModal, setClientModal] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = window.location.pathname.split("/")?.[2];
    if (token) localStorage.setItem("customer_token", token);
    setLoading(false);
  }, []);

  return (
    <div className="App">
      <GlobalDataContext.Provider
        value={{
          setClientModal,
        }}
      >
        {!loading && (
          <Router>
            <Switch>
              <Route path="/not-found" component={NotFoundContainer} />
              <Route
                path={["/", "/:companyName"]}
                component={ProductPageContainer}
              />
              <Redirect to="/not-found" />
            </Switch>
          </Router>
        )}
      </GlobalDataContext.Provider>
      <Modal
        open={clientModal !== ""}
        // onClose={() => {

        // }}
        aria-labelledby="clientModal"
        aria-describedby="clientModal-description"
      >
        {clientModal === "loader" ? <Loader /> : <BoxLoader />}
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default App;
