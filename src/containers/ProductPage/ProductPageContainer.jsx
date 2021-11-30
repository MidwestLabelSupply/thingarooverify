import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalDataContext } from "../../App";
import { ordersApiCaller } from "../../utils/network-request/orders-api-call";
import Intro from "./Intro";

export default function ProductPageContainer() {
  const { setClientModal } = useContext(GlobalDataContext);
  const [order, setOrder] = useState({});
  const [orderDetail, setOrderDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    setClientModal("boxLoader");
    ordersApiCaller.getOrder().then(({ response, error, unauthorized }) => {
      if (unauthorized) {
        setClientModal("");
        history.push("/not-found");
      } else if (error) {
        setClientModal("");
        setLoading(false);
        toast.error(response.msg || JSON.stringify(response));
      } else {
        setOrder(response.order);
        history.replace("/" + encodeURIComponent(response.order.companyName));
        ordersApiCaller
          .getOrderDetail()
          .then(({ response, error, unauthorized }) => {
            setClientModal("");
            setLoading(false);
            if (unauthorized) history.push("/not-found");
            else if (error) {
              toast.error(response.msg || JSON.stringify(response));
            } else {
              setOrderDetail(response.orderDetail);
            }
          });
      }
    });
  }, []);

  return loading ? (
    <div></div>
  ) : (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <div style={{ width: "100%", padding: 10 }}>
        <div>
          <Intro order={order} orderDetail={orderDetail} />
        </div>

        <div
          style={{ padding: 0 }}
          className="ql-editor content"
          dangerouslySetInnerHTML={{
            __html:
              order?.content ||
              '<h1 style="color:red; text-align:center;">No Content Available to display!</h1>',
          }}
        ></div>
      </div>
    </div>
  );
}
