
# 🚚 DeliveryApp

**DeliveryApp** là ứng dụng di động hỗ trợ quản lý đơn hàng và giao hàng, được xây dựng bằng **React Native** và **TypeScript**. Ứng dụng hướng đến việc đơn giản hóa quy trình giao hàng cho shipper và kho hàng, đồng thời cung cấp giao diện người dùng thân thiện và hiệu suất cao.

## 📽️ Video Demo

![DeliveryApp Demo](./assets/deliveryapp_demo.gif)

## 🔧 Tính năng chính

- Quản lý đơn hàng: tạo, cập nhật và theo dõi trạng thái đơn hàng.
- Theo dõi vị trí: sử dụng GPS để xác định vị trí của shipper.
- Thống kê và báo cáo: hiển thị dữ liệu và báo cáo cho người dùng.
- Giao diện người dùng: xây dựng từ thiết kế Figma, tập trung vào trải nghiệm người dùng.

## 🛠️ Công nghệ sử dụng

- **Frontend**: React Native,
- **Backend**: Node.js, Firebase
- **Quản lý trạng thái**: Redux
- **Realtime**: Socket.io
- **Cơ sở dữ liệu**: MongoDB
- **Công cụ hỗ trợ**: Git, Trello, Postman

## 📦 Cài đặt và chạy ứng dụng

### Yêu cầu

- Node.js >= 14.x
- npm hoặc yarn
- Expo CLI (nếu sử dụng Expo)

### Cài đặt

```bash
git clone https://github.com/tdat3023/DeliveryApp.git
cd DeliveryApp
npm install
```

### Chạy ứng dụng

```bash
npm start
```

Sau đó, sử dụng Expo Go trên thiết bị di động hoặc trình giả lập để chạy ứng dụng.

## 📁 Cấu trúc thư mục

```
DeliveryApp/
├── assets/             # Tài nguyên như hình ảnh, biểu tượng, video demo
├── firebase/           # Cấu hình Firebase
├── src/                # Mã nguồn chính
│   ├── components/     # Các thành phần giao diện tái sử dụng
│   ├── screens/        # Các màn hình chính của ứng dụng
│   ├── services/       # Dịch vụ như API, Firebase
│   └── utils/          # Các tiện ích và hàm hỗ trợ
├── App.js              # Điểm vào chính của ứng dụng
├── package.json        # Thông tin và phụ thuộc của dự án
└── README.md           # Tài liệu hướng dẫn
```

## 📈 Lộ trình phát triển

- [x] Xây dựng giao diện người dùng từ thiết kế Figma
- [x] Tích hợp Firebase cho xác thực và cơ sở dữ liệu
- [x] Triển khai chức năng theo dõi vị trí và xác thực sinh trắc học
- [ ] Tối ưu hóa hiệu suất và trải nghiệm người dùng
- [ ] Viết tài liệu hướng dẫn chi tiết hơn




