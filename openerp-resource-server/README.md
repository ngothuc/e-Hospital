# Openerp Resource Server

## Tổng quan

Openerp Resource Server là một ứng dụng Spring Boot cung cấp một máy chủ tài nguyên với các cấu hình bảo mật, bao gồm xác thực JWT và cài đặt CORS.

## Yêu cầu

- Java 17 hoặc cao hơn
- Maven 3.6.0 hoặc cao hơn
- Một cơ sở dữ liệu (ví dụ: MySQL, PostgreSQL)

## Bắt đầu

## Cấu trúc dự án
- src/main/java/openerp/openerpresourceserver - Thư mục chứa mã nguồn chính của ứng dụng
- config/security - Cấu hình bảo mật bao gồm CORS và JWT
- controller - Các REST controller
- entity - Các thực thể JPA
- repo - Các repository JPA
- service - Lớp dịch vụ

## Các endpoint
Endpoint cho Product:
- GET /product - Lấy tất cả sản phẩm
- GET /product/{id} - Lấy sản phẩm theo ID
- POST /product - Tạo sản phẩm mới
- DELETE /product/{id} - Xóa sản phẩm theo ID
