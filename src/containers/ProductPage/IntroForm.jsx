import { useContext, useState } from "react";
import { GlobalDataContext } from "../../App";
import { ordersApiCaller } from "../../utils/network-request/orders-api-call";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Button, Checkbox, TextField } from "@mui/material";

export default function IntroForm() {
  const { setClientModal } = useContext(GlobalDataContext);

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [opted, setOpted] = useState(false);

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const [validEmail, setValidEmail] = useState(false);

  const changeEmail = (val) => {
    setValidEmail(validateEmail(val));
    setEmail(val);
  };

  const history = useHistory();

  const addOrderDetail = async () => {
    const reqBody = {
      firstName,
      lastName,
      email,
      opted,
    };

    setClientModal("loader");

    const { response, error, unauthorized } =
      await ordersApiCaller.addOrderDetail({ reqBody });

    setClientModal("");

    if (unauthorized) history.push("/not-found");
    else if (error) {
      toast.error(response.msg || JSON.stringify(response));
    } else {
      toast.success("You have been successfully registered!");
      setTimeout(() => window.location.reload(), 5000);
    }
  };

  return (
    <div
      style={{
        maxWidth: 340,
        width: "100%",
        margin: "20px auto 80px",
        boxShadow: "0 10px 6px -6px #777",
        padding: "35px 25px 20px",
        backgroundColor: "white",
        borderRadius: 10,
      }}
      className=""
    >
      <div
        style={{
          background: "#0e91a0",
          height: 54,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
          fontSize: 22,
          color: "white",
          fontWeight: 500,
          borderRadius: 4,
        }}
      >
        <AppRegistrationIcon /> REGISTER
      </div>
      <div>
        <div style={{ marginBottom: 10 }}>
          <TextField
            id="first-input"
            error={!firstName}
            value={firstName}
            sx={{ width: "100%" }}
            onChange={(e) => setFirstname(e.target.value)}
            label="First Name*"
            variant="standard"
            helperText={!firstName ? "First Name is Mandatory." : ""}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <TextField
            id="last-input"
            value={lastName}
            sx={{ width: "100%" }}
            onChange={(e) => setLastname(e.target.value)}
            label="Last Name(optional)"
            variant="standard"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <TextField
            id="email-input"
            error={!validEmail}
            value={email}
            sx={{ width: "100%" }}
            onChange={(e) => changeEmail(e.target.value)}
            label="Email ID(optional)"
            variant="standard"
            helperText={validEmail ? "" : "Please enter a valid email id."}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 16,
            marginLeft: -10,
          }}
        >
          <Checkbox
            checked={opted}
            onChange={() => setOpted(!opted)}
            inputProps={{ "aria-label": "controlled" }}
            style={{ margin: "2px 0 0 0", color: "#0E91A0" }}
          />

          <div style={{ fontWeight: 500, color: "#495662" }}>
            Opt for further communication
          </div>
        </div>

        <div>
          <Button
            onClick={addOrderDetail}
            style={{
              color: "white",
              fontWeight: 700,
              background: "#0e91a0",
              padding: "8px 20px",
              width: "100%",
            }}
            disabled={!firstName}
          >
            REGISTER
          </Button>
        </div>
      </div>
    </div>
  );
}
