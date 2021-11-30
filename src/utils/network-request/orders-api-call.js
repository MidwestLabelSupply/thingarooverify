import { baseUrl } from "../constants/EnvUrl";
import { apiCaller } from "./api-call";

function getHeader() {
  return {
    Authorization: `Bearer ${localStorage.getItem("customer_token")}`,
  };
}

export const ordersApiCaller = {
  getOrder: async function () {
    const url = "/order/customer";

    const { response, error, status } = await apiCaller.get({
      url: process.env.NODE_ENV !== "production" ? url : baseUrl + url,
      headers: getHeader(),
    });

    if (status === 401) {
      return {
        unauthorized: true,
      };
    }

    return {
      response,
      error,
      unauthorized: false,
    };
  },
  getOrderDetail: async function () {
    const url = "/order-detail/customer";

    const { response, error, status } = await apiCaller.get({
      url: process.env.NODE_ENV !== "production" ? url : baseUrl + url,
      headers: getHeader(),
    });

    if (status === 401) {
      return {
        unauthorized: true,
      };
    }

    return {
      response,
      error,
      unauthorized: false,
    };
  },
  addOrderDetail: async function ({ reqBody }) {
    const url = "/order-detail/add";

    const { response, error, status } = await apiCaller.post({
      url: process.env.NODE_ENV !== "production" ? url : baseUrl + url,
      reqBody,
      headers: getHeader(),
    });

    if (status === 401) {
      return {
        unauthorized: true,
      };
    }

    return {
      response,
      error,
      unauthorized: false,
    };
  },
};
