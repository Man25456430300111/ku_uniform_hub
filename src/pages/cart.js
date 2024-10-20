import React, { useState } from 'react';

const Cart = () => {
  const [showModal, setShowModal] = useState(false); // สถานะเปิด/ปิดป๊อปอัพแก้ไขที่อยู่
  const [showPaymentModal, setShowPaymentModal] = useState(false); // สถานะเปิด/ปิดป๊อปอัพการชำระเงิน
  const [quantity1, setQuantity1] = useState(1); // จำนวนสินค้าชิ้นแรก
  const [quantity2, setQuantity2] = useState(2); // จำนวนสินค้าชิ้นที่สอง

  const handleIncrement1 = () => setQuantity1(quantity1 + 1);
  const handleDecrement1 = () => setQuantity1(quantity1 > 1 ? quantity1 - 1 : 1);

  const handleIncrement2 = () => setQuantity2(quantity2 + 1);
  const handleDecrement2 = () => setQuantity2(quantity2 > 1 ? quantity2 - 1 : 1);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-gradient-to-r from-green-400 to-green-600 p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2">
          <button className="text-white text-xl font-bold">
            <i className="fas fa-arrow-left"></i>
          </button>
          <span className="text-white text-xl font-bold">KU Uniform Hub</span>
        </div>
      </div>

      <div className="container mx-auto py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4">ตะกร้า</h2>

          <div className="bg-gray-200 p-4 rounded-lg mb-6">
            <p className="font-medium text-gray-800">
              นายสมใจ สมจิตร เบอร์โทรศัพท์ 066-666-6666 66/666 หมู่ 6 ตำบล 6 อำเภอ 6 จังหวัด 66666
            </p>
            <button
              onClick={() => setShowModal(true)} // แสดงป๊อปอัพแก้ไขที่อยู่
              className="bg-green-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-green-600">
              แก้ไข
            </button>
          </div>

          {/* ป๊อปอัพแก้ไขที่อยู่ */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-yellow-200 p-8 rounded-lg shadow-lg max-w-3xl w-full grid grid-cols-1 lg:grid-cols-1 gap-8">
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-2xl font-bold mb-4 md:self-start md:ml-[117px]">ช่องทางการติดต่อ</h2>
                  <input className="w-2/3 p-3 mb-4 rounded-lg bg-white" placeholder="ชื่อ นามสกุล" />
                  <input className="w-2/3 p-3 mb-4 rounded-lg bg-white" placeholder="หมายเลขโทรศัพท์" />
                  <h2 className="text-2xl font-bold mb-4 md:self-start md:ml-[117px]">ที่อยู่</h2>
                  <input className="w-2/3 p-3 mb-4 rounded-lg bg-white" placeholder="จังหวัด,เขต/อำเภอ,แถว/ตำบล,รหัสไปรษณีย์" />
                  <input className="w-2/3 p-3 mb-4 rounded-lg bg-white" placeholder="บ้านเลขที่,ซอย,หมู่บ้าน,แถว/ตำบล" />
                  <button
                    onClick={() => setShowModal(false)} // ปิดป๊อปอัพเมื่อกดปุ่ม "ยืนยัน"
                    className="bg-green-500 text-white w-2/3 p-3 rounded-lg hover:bg-green-600">
                    ยืนยัน
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* รายการสินค้า */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img className="w-20 h-20 rounded-lg" src="https://via.placeholder.com/150" alt="Product 1" />
              <div className="flex-1">
                <h3 className="font-bold text-lg">เสื้อโปโล เกษตรศาสตร์ | The One Concept ชุดนักศึกษาพรีเมี่ยม</h3>
                <p className="text-gray-700">สี: ขาว | ขนาด: M</p>
                <p className="text-gray-700">THB 390.00</p>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={handleDecrement1}>-</button>
                <input type="text" value={quantity1} readOnly className="text-center w-8" />
                <button onClick={handleIncrement1}>+</button>
              </div>
              <p className="font-bold">ยอดรวม: THB {390 * quantity1}.00</p>
            </div>

            <div className="flex items-center space-x-4">
              <img className="w-20 h-20 rounded-lg" src="https://via.placeholder.com/150" alt="Product 2" />
              <div className="flex-1">
                <h3 className="font-bold text-lg">เสื้อแขนยาว | The One Concept ชุดนักศึกษาพรีเมี่ยม</h3>
                <p className="text-gray-700">สี: ขาว | ขนาด: L</p>
                <p className="text-gray-700">THB 490.00</p>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={handleDecrement2}>-</button>
                <input type="text" value={quantity2} readOnly className="text-center w-8" />
                <button onClick={handleIncrement2}>+</button>
              </div>
              <p className="font-bold">ยอดรวม: THB {490 * quantity2}.00</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4">สรุปคำสั่งซื้อ</h2>
          <p className="text-gray-700">จำนวนรายการ: 3 รายการ</p>
          <p className="text-gray-700">รวมมูลค่าสินค้า: THB {390 * quantity1 + 490 * quantity2}.00</p>
          <p className="text-gray-700">ค่าจัดส่ง: THB 40.00</p>
          <p className="font-bold text-xl mt-4">ราคาทั้งหมด: THB {390 * quantity1 + 490 * quantity2 + 40}.00</p>

          <div className="mt-6 flex items-center space-x-2">
          </div>

          <div className="mt-6 space-y-4">
            <button
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              onClick={() => setShowPaymentModal(true)} // แสดงป๊อปอัพการชำระเงิน
            >
              ชำระเงิน
            </button>
          </div>
        </div>
      </div>

      {/* ป๊อปอัพการชำระเงิน */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
            <h2 className="text-xl font-semibold text-gray-900">Payment</h2>
            <form className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Full name</label>
                  <input type="text" className="block w-full p-2 border rounded" placeholder="ชื่อบนบัตร" />
                </div>
                <div>
                  <label>Card number</label>
                  <input type="text" className="block w-full p-2 border rounded" placeholder="xxxx-xxxx-xxxx-xxxx" />
                </div>
                <div>
                  <label>Card expiration</label>
                  <input type="text" className="block w-full p-2 border rounded" placeholder="MM/YY" />
                </div>
                <div>
                  <label>CVV</label>
                  <input type="text" className="block w-full p-2 border rounded" placeholder="xxx" />
                </div>
              </div>
              <button type="submit" className="w-full  bg-green-500  text-white p-2 mt-4 rounded">ยืนยันชำระเงิน</button>
            </form>
            <button
              className="absolute top-4 right-4 text-gray-600"
              onClick={() => setShowPaymentModal(false)} // ปิดป๊อปอัพชำระเงิน
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;




