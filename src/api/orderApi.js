import axiosClient from "./axiosClient";
class OrderApi {
  login(phoneNumber, password) {
    let url = `shipper/login`;
    return axiosClient.post(url, { phoneNumber, password });
  }
  getOrder(storage, status) {
    let url = `order/getListOrderByStorage/${storage}?status=${status}`;
    return axiosClient.get(url);
  }
  getOrderOfShipper(id) {
    let url = `holeOrder/getHeldOrdersByShipperId/${id}`;
    return axiosClient.get(url);
  }
  updateStatus(id, status) {
    let url = `order/idChange/${id}`;
    return axiosClient.patch(url, { status });
  }
  addHeldOrder(shipperId, orderId) {
    let url = `holeOrder/addHeldOrder/${shipperId}`;
    return axiosClient.post(url, { orderId });
  }
  updateAll(shipperId, status) {
    let url = `holeOrder/updateAll`;
    return axiosClient.patch(url, { shipperId, status });
  }

  getOneById(id) {
    let url = `order/id/${id}`;
    return axiosClient.get(url, { id });
  }

  getHistoryOrderByShipperId(shipperId) {
    let url = `historyOrder/getHistoryOrderByShipperId/${shipperId}`;
    return axiosClient.get(url, { shipperId });
  }

  addHistoryOrder(shipperId, orderId) {
    let url = `historyOrder/addToHistoryOrder/${shipperId}`;
    return axiosClient.post(url, { orderId });
  }

  removeFromHeldOrder(shipperId, orderId) {
    let url = `holeOrder/removeHeldOrder/${shipperId}/${orderId}`;
    return axiosClient.delete(url);
  }

  getSalarry(shipperId, month) {
    let url = `historyOrder/getSallary/${shipperId}?month=${month}`;
    return axiosClient.get(url);
  }
}

const orderApi = new OrderApi();
export default orderApi;
