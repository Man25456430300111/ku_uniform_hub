import React, { useState } from "react";
import imagekuu from './images/image_ku.png'; // นำเข้ารูปภาพจากโฟลเดอร์ images

const ProductPage = () => {
  const [size, setSize] = useState("S"); // ขนาดเริ่มต้น
  const [color, setColor] = useState("black"); // สีเริ่มต้น
  const [quantity, setQuantity] = useState(1); // จำนวนเริ่มต้น
  const [mainImage, setMainImage] = useState(
    "https://down-th.img.susercontent.com/file/th-11134207-7r98s-lov2ukpdqs8u59@resize_w450_nl.webp"
  ); // รูปหลักเริ่มต้น

  const handleSizeChange = (selectedSize) => {
    setSize(selectedSize); // เปลี่ยนขนาด
  };

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor); // เปลี่ยนสี
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value)); // ตรวจสอบให้จำนวนไม่น้อยกว่า 1
    setQuantity(value); // เปลี่ยนจำนวน
  };

  const handleAddToCart = () => {
    alert(`เพิ่มสินค้าลงในตะกร้าแล้ว! \nขนาด: ${size} \nสี: ${color} \nจำนวน: ${quantity}`); // ข้อความยืนยัน
  };

  const handleBuyNow = () => {
    alert(`สั่งซื้อสินค้าแล้ว! \nขนาด: ${size} \nสี: ${color} \nจำนวน: ${quantity}`); // ข้อความยืนยัน
  };

  const sizes = ["S", "M", "L", "XL"]; // ตัวเลือกขนาด
  const thumbnails = [
    "https://down-th.img.susercontent.com/file/th-11134207-7r98s-lov2ukpdqs8u59@resize_w450_nl.webp",
    "https://down-th.img.susercontent.com/file/th-11134207-7r98y-lov2ukpdicu6bd.webp",
    "https://down-th.img.susercontent.com/file/th-11134207-7r98u-lp2ckf0nucfd87.webp",
    "https://down-th.img.susercontent.com/file/th-11134207-7r98s-lp2ckf0mzfxl81.webp",
  ];

  // เพิ่ม URL ของโลโก้ KU
  const imageku = "https://upload.wikimedia.org/wikipedia/en/e/e5/Kasetsart_Uni_seal.png";

  return (
    <div style={{ fontFamily: "Montserrat, sans-serif" }}>
      <div className="bg-gray-100 min-h-screen">
        <div
          className="h-screen flex flex-col justify-center items-end text-center"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/control/564x/1d/a9/6e/1da96e4e4612e509637d17fd725c3416.jpg')",
            backgroundSize: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "120px",
          }}
        >
          <div className="flex items-center justify-start p-4 w-full ">
            <div className="flex justify-start">
              <img src={imagekuu} alt="KU Logo" className="w-[200px] h-[100px]" />
            </div>

            {/* ปุ่ม Back และ Next */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="inline-flex items-center px-2 py-1.5 rounded-md text-white hover:bg-indigo-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                <span className="font-bold text-lg"></span>
              </a>
              <a
                href="#"
                className="inline-flex items-center px-3 py-1.5 rounded-md text-white hover:bg-indigo-50"
              >
                <span className="font-bold text-lg"></span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Product Content */}
        <div className="p-5 max-w-4xl mx-auto">
          {/* Product Title */}
          <div className="text-left mb-5">
            <h2 className="text-xl font-semibold">
              [พรีออเดอร์] เสื้อโปโล เกษตรศาสตร์ | The One Concept ชุดนักศึกษา พรีเมียม
            </h2>
            <p className="text-lg font-semibold mt-2">THB 390.00</p>
          </div>

          <div className="flex">
            {/* Image Section */}
            <div className="flex-1">
              <img src={mainImage} alt="Product" className="w-full rounded-none" />
              <div className="flex justify-center mt-3 space-x-2">
                {thumbnails.map((thumbnail, index) => (
                  <img
                    key={index}
                    src={thumbnail}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-16 rounded-none cursor-pointer"
                    onMouseEnter={() => setMainImage(thumbnail)} // เปลี่ยนรูปหลักเมื่อชี้
                  />
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="flex-1 ml-5">
              {/* Color Selection */}
              <div className="mb-4">
                <label className="font-medium">สี (Color):</label>
                <div className="flex gap-2 mt-1">
                  <div
                    onClick={() => handleColorChange("black")}
                    className={`w-10 h-10 cursor-pointer border rounded-md flex items-center justify-center ${
                      color === "black" ? "border-green-500" : "border-gray-300"
                    }`}
                  >
                    <div className="w-full h-full bg-black rounded-md"></div>
                  </div>
                  <div
                    onClick={() => handleColorChange("white")}
                    className={`w-10 h-10 cursor-pointer border rounded-md flex items-center justify-center ${
                      color === "white" ? "border-green-500" : "border-gray-300"
                    }`}
                  >
                    <div className="w-full h-full bg-white rounded-md"></div>
                  </div>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-4">
                <label className="font-medium">ขนาด (Size):</label>
                <div className="flex gap-1 mt-1">
                  {sizes.map((availableSize) => (
                    <button
                      key={availableSize}
                      onClick={() => handleSizeChange(availableSize)}
                      className={`w-10 h-10 flex items-center justify-center border rounded-md font-medium ${
                        size === availableSize
                          ? "bg-green-500 text-white"
                          : "bg-white text-black border-gray-300"
                      } hover:bg-green-500 hover:text-white`}
                    >
                      {availableSize}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="mb-4">
                <label className="font-medium">จำนวน (Quantity):</label>
                <div className="flex items-center mt-1">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="p-2 border rounded-l-md bg-gray-200 hover:bg-gray-300"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    className="w-16 text-center border-t border-b mx-0"
                    style={{ appearance: "none", border: "none" }}
                  />
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="p-2 border rounded-r-md bg-gray-200 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart and Buy Now Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 p-3 text-sm font-medium text-white bg-blue-500 rounded-none hover:bg-blue-600"
                >
                  เพิ่มลงตะกร้า
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 p-3 text-sm font-medium text-white bg-green-500 rounded-none hover:bg-green-600"
                >
                  ซื้อสินค้า
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
