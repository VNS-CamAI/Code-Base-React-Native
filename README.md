# package install

npm install
# ios
- Cách cài đặt: https://reactnative.dev/docs/environment-setup?platform=ios&os=macos
- Cài đặt Xcode có version ios từ 16.1 trở lên.
- Sau khi install xong các package:
  cd ./ios && pod install
# android
- Cách cài đặt: https://reactnative.dev/docs/environment-setup?platform=android&os=windows

# Chạy dự án
- npm start -> chọn môi trường chạy
- ios:
  npx react-native run-ios
- android:
  npm run android

# Cấu trúc thư mục
```sh
src                         # Chứa source code của ứng dụng
|
+-- assets                  # assets chứa tất cả các file tĩnh images, fonts, etc.
|
+-- components              # Các component sử dụng trên toàn bộ ứng dụng.
|
+-- config                  # Chưa các file config của dự án.
|
+-- navigation              # Cấu hình bottom bar.
|
+-- redux                   # Chứa tất cả các state của các component.
|     |
|     +-- actions           # Chứa các hành động của reducer.
|     |
|     +-- reducer           # Chứa các reducer của redux.
|     |
|     +-- store.js          # Hàm combie reducer.
|
+-- screen                  # Chứa các màn hình của ứng dụng. Mỗi màn hình được viết trong 1 folder (bao gồm tênmàn.js, styles.js...)
|
+-- services                # Chứa tất cả service của ứng dụng.
|       |
|       +-- api             # Chứa các hàm call api cảu ứng dụng.
|       |
|       +-- axiosClient.js  # Base config của axios.
|
+-- uitls                   # Chưá các hàm tiện ích (format,validate, convert, ...) của ứng dụng.
```
# Cách build file apk và ios
- ios: Sử dụng xcode để build vào link https://docs.google.com/document/d/1yNwXWvoIRpYFZxe76nGgkLa1x_G5qPNY/edit?usp=drive_web&ouid=111233866281969651248&rtpof=true để xem hướng dẫn
- android: Dùng lệnh  npx react-native build-android --mode=release
- Vào thư mục \android\app\build\outputs\apk\release để mở file apk app-release
