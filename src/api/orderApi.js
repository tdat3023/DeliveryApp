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
}

const orderApi = new OrderApi();
export default orderApi;
