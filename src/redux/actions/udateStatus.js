export const updateStatus = (status) => async (dispatch) => {
  try {
    await console.log("Đang xử lý");
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
    await console.log("Cập nhật thành công");
  } catch (error) {}
};
