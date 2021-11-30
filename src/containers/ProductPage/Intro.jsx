import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import CheckIcon from "@mui/icons-material/Check";
import IntroForm from "./IntroForm";

export default function Intro({ order, orderDetail }) {
  const [run, setRun] = useState(true);

  useEffect(() => {
    setTimeout(() => setRun(false), 15000);
  }, []);

  return order?.limitedEdition ? (
    <div>
      <div className="my-confetti">
        {run && <Confetti numberOfPieces={100} />}
        <div
          style={{
            backgroundColor: "#0e91a0",
            width: 125,
            height: 125,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <CheckIcon sx={{ color: "white", fontSize: 80 }} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              margin: "24px auto",
              fontSize: 24,
              fontWeight: 800,
              color: "#0e91a0",
            }}
          >
            Congratulations!
          </div>
          <div style={{ color: "rgb(38, 53, 69)" }}>
            You have{" "}
            <strong>
              {" "}
              {order?.companyName || ""} "{order?.productName || ""}"{" "}
            </strong>
            number <strong>{orderDetail?.unit || ""}</strong> of{" "}
            <strong>{order?.quantity || ""}.</strong>
          </div>
        </div>
      </div>

      {orderDetail?.customer?.firstName ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 80,
          }}
        >
          <div style={{ color: "#0e91a0", fontSize: 18, fontWeight: 600 }}>
            This page has already been registered to{" "}
            {orderDetail.customer?.firstName}
            {orderDetail.customer?.lastName
              ? " " + orderDetail.customer?.lastName + "."
              : "."}
          </div>
        </div>
      ) : (
        <IntroForm />
      )}
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      {/* <div
          style={{
            color: "#0e91a0",
            fontWeight: 700,
            fontSize: 30,
          }}
        >
          {order?.companyName + " - " + order?.productName}
        </div> */}
    </div>
  );
}
