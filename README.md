

## Môi trường cài đặt

- Node JS version: 18.17.1
- Next JS: 13.4

## Môi trường chạy

- .env (Thêm các env dựa theo file .env.example)


## Các bước chạy project trên local

- Bước 1: cp .env.example .env.local
- Bước 2: npm install
- Bước 3: npm run dev

## Các bước deploy lên testing/production

- Bước 1: `npm install` - cài đặt thư viện
- Bước 2: `npm run build` - build project
- Bước 3: `npm run start` - run project

## Router

- Mỗi khi thêm router mới cần thêm vào list public/private router tại [option](./src/configs/Auth/constants/index.ts)

## Config dark mode

### Thêm và sử dụng mã màu mới

- Thêm mới các mã màu trong file [themeColor](./src/configs/theme/themeColor.ts) tương ứng với 2 bảng màu LIGHT và DARK

  Lưu ý:

  1. key của các mã màu cần giống nhau ở cả 2 bảng màu
  2. key cần thỏa mãn [format](./src/configs/theme/themeConfig.ts): (Prefix)-(tone) | Prefix

VD:

```ts
export const LIGHT: IColor = {
  // ...
  background: '#fff',
  primary: '#000',
};

export const DARK: IColor = {
  // ...
  background: '#000',
  primary: '#fff',
};
```

- Sử dụng trong component với class của tailwind tương ứng
  Format class tailwind: namespace + th + key

VD:

```js
<span className="bg-th-background text-th-primary">ABC</span>
```

### Khi dark mode cần 1 mã màu custom

- Chúng ta có thể ghi đè giá trị của màu hiện tại khi chuyển sang dark mode như sau:
  dark:(tên class của mã màu tương ứng)

VD:

```js
// text-th-primary sẽ được áp dụng cho light mode và text-th-grey-100 sẽ được áp dụng cho dark mode
<span className="bg-th-background text-th-primary dark:text-th-grey-100">ABC</span>
```

Đọc thêm: [dark-mode-nextjs](https://git.ghtk.vn/quannt86/dark-mode-nextjs)
