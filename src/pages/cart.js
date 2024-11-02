
// import React, { useState, useEffect } from 'react';
// import imageku from './images/image_ku.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { getAuth, signOut } from 'firebase/auth';
// import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [items, setItems] = useState([
//     { id: 1, name: "เสื้อโปโล เกษตรศาสตร์ | The One Concept ชุดนักศึกษาพรีเมี่ยม", price: 390, quantity: 1 },
//     { id: 2, name: "เสื้อแขนยาว | The One Concept ชุดนักศึกษาพรีเมี่ยม", price: 490, quantity: 2 }
//   ]);

//   const [address, setAddress] = useState({
//     fullName: "",
//     phone: "",
//     addressDetail: "",
//   });
//   const [editAddress, setEditAddress] = useState(address);

//   const navigate = useNavigate();
//   const auth = getAuth();
//   const db = getFirestore();

//   useEffect(() => {
//     const fetchAddress = async () => {
//       const user = auth.currentUser;
//       if (user) {
//         const docRef = doc(db, "users", user.uid);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists() && docSnap.data().address) {
//           setAddress(docSnap.data().address);
//           setEditAddress(docSnap.data().address);
//         }
//       }
//     };
//     fetchAddress();
//   }, [auth.currentUser]);

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         navigate('/');
//       })
//       .catch((error) => {
//         console.error('Error signing out:', error);
//       });
//   };

//   const handleIncrement = (id) => {
//     setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
//   };

//   const handleDecrement = (id) => {
//     setItems(items.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
//   };

//   const handleRemove = (id) => {
//     setItems(items.filter(item => item.id !== id));
//   };

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setEditAddress(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSaveAddress = async () => {
//     const user = auth.currentUser;
//     if (user) {
//       const docRef = doc(db, "users", user.uid);
//       try {
//         await setDoc(docRef, { address: editAddress }, { merge: true });
//         setAddress(editAddress);
//         setShowModal(false);
//       } catch (error) {
//         console.error("Error saving address: ", error);
//       }
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="h-screen flex flex-col justify-center items-end text-center"
//         style={{
//           backgroundImage: "url('https://i.pinimg.com/control/564x/1d/a9/6e/1da96e4e4612e509637d17fd725c3416.jpg')",
//           backgroundSize: "100%",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           height: "120px"
//         }}
//       >
//         <div className="flex items-center justify-start p-4 w-full ">
//           <div className="flex justify-start">
//             <img src={imageku} alt="KU Logo" className="w-[200px] h-[100px]" />
//           </div>
          
//           <div className="flex space-x-4">
//             <a onClick={(e) => e.preventDefault()} 
//               className="inline-flex items-center px-2 py-1.5 rounded-md text-white hover:bg-indigo-50"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
//               </svg>
//               <span className="font-bold text-lg"></span>
//             </a>
//             <a onClick={(e) => e.preventDefault()} 
//               className="inline-flex items-center px-3 py-1.5 rounded-md text-white hover:bg-indigo-50"
//             >
//               <span className="font-bold text-lg"></span>
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </a>
//           </div>
          
//           <a href="#logout"
//             onClick={handleLogout}
//             className="absolute top-18 right-8 inline-flex items-center px-4 py-2 text-white rounded-md hover:bg-red-600"
//           >
//             <span className="font-bold text-lg">Logout</span>
//           </a>
//         </div>
//       </div>

//       <div className="container mx-auto py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-md">
//           <h2 className="text-2xl font-bold mb-4">ตะกร้า</h2>

//           <div className="bg-gray-200 p-4 rounded-lg mb-6">
//             <p className="font-medium text-gray-800">
//               {address.fullName ? `${address.fullName} เบอร ${address.phone} ${address.addressDetail}` : "ยังไม่มีข้อมูลที่อยู่"}
//             </p>
//             <button
//               onClick={() => setShowModal(true)}
//               className="bg-green-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-green-600"
//             >
//               {address.fullName ? "แก้ไข" : "เพิ่มที่อยู่"}
//             </button>
//           </div>

//           {showModal && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//               <div className="bg-yellow-200 p-8 rounded-lg shadow-lg max-w-3xl w-full grid grid-cols-1 gap-8">
//                 <div className="flex flex-col items-center justify-center">
//                   <h2 className="text-2xl font-bold mb-4 md:self-start md:ml-[117px]">ช่องทางการติดต่อ</h2>
//                   <input 
//                     className="w-2/3 p-3 mb-4 rounded-lg bg-white" 
//                     name="fullName" 
//                     value={editAddress.fullName} 
//                     onChange={handleAddressChange}
//                     placeholder="ชื่อ นามสกุล" 
//                   />
//                   <input 
//                     className="w-2/3 p-3 mb-4 rounded-lg bg-white" 
//                     name="phone" 
//                     value={editAddress.phone} 
//                     onChange={handleAddressChange}
//                     placeholder="หมายเลขโทรศัพท์" 
//                   />
//                   <h2 className="text-2xl font-bold mb-4 md:self-start md:ml-[117px]">ที่อยู่</h2>
//                   <input 
//                     className="w-2/3 p-3 mb-4 rounded-lg bg-white" 
//                     name="addressDetail" 
//                     value={editAddress.addressDetail} 
//                     onChange={handleAddressChange}
//                     placeholder="ที่อยู่"
//                   />
//                   <button
//                     onClick={handleSaveAddress}
//                     className="bg-green-500 text-white w-2/3 p-3 rounded-lg hover:bg-green-600"
//                   >
//                     ยืนยัน
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="space-y-4">
//             {items.map(item => (
//               <div key={item.id} className="flex items-center space-x-4">
//                 <img className="w-20 h-20 rounded-lg" src="https://via.placeholder.com/150" alt={item.name} />
//                 <div className="flex-1">
//                   <h3 className="font-bold text-lg">{item.name}</h3>
//                   <p className="text-gray-700">THB {item.price}.00</p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button onClick={() => handleDecrement(item.id)}>-</button>
//                   <input type="text" value={item.quantity} readOnly className="text-center w-8" />
//                   <button onClick={() => handleIncrement(item.id)}>+</button>
//                 </div>
//                 <p className="font-bold">ยอดรวม: THB {item.price * item.quantity}.00</p>
//                 <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-700">
//                   <FontAwesomeIcon icon={faTrash} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded-lg p-6 shadow-md">
//           <h2 className="text-2xl font-bold mb-4">สรุปคำสั่งซื้อ</h2>
//           <p className="text-gray-700">จำนวนรายการ: {items.reduce((sum, item) => sum + item.quantity, 0)} รายการ</p>
//           <p className="text-gray-700">รวมมูลค่าสินค้า: THB {items.reduce((sum, item) => sum + item.price * item.quantity, 0)}.00</p>
//           <p className="text-gray-700">ค่าจัดส่ง: THB 40.00</p>
//           <p className="font-bold text-xl mt-4">ราคาทั้งหมด: THB {items.reduce((sum, item) => sum + item.price * item.quantity, 0) + 40}.00</p>

//           <div className="mt-6 space-y-4">
//             <button
//               className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
//               onClick={() => setShowPaymentModal(true)}
//             >
//               ชำระเงิน
//             </button>
//           </div>
//         </div>
//       </div>

//       {showPaymentModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
//             <h2 className="text-xl font-semibold text-gray-900">Payment</h2>
//             <form className="mt-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label>Full name</label>
//                   <input type="text" className="block w-full p-2 border rounded" placeholder="ชื่อบนบัตร" />
//                 </div>
//                 <div>
//                   <label>Card number</label>
//                   <input type="text" className="block w-full p-2 border rounded" placeholder="xxxx-xxxx-xxxx-xxxx" />
//                 </div>
//                 <div>
//                   <label>Card expiration</label>
//                   <input type="text" className="block w-full p-2 border rounded" placeholder="MM/YY" />
//                 </div>
//                 <div>
//                   <label>CVV</label>
//                   <input type="text" className="block w-full p-2 border rounded" placeholder="xxx" />
//                 </div>
//               </div>
//               <button type="submit" className="w-full bg-green-500 text-white p-2 mt-4 rounded">
//                 ยืนยันชำระเงิน
//               </button>
//             </form>
//             <button
//               className="absolute top-4 right-4 text-gray-600"
//               onClick={() => setShowPaymentModal(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;


// import React, { useState, useEffect } from 'react';
// import imageku from './images/image_ku.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { getAuth, signOut } from 'firebase/auth';
// import { getFirestore, doc, getDoc, setDoc, deleteDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [items, setItems] = useState([]);
//   const [address, setAddress] = useState({
//     fullName: "",
//     phone: "",
//     addressDetail: "",
//   });
//   const [editAddress, setEditAddress] = useState(address);

//   const navigate = useNavigate();
//   const auth = getAuth();
//   const db = getFirestore();

//   // ดึงข้อมูลสินค้าใน cart จาก Firestore
//   useEffect(() => {
//     const fetchCartItems = async () => {
//       const user = auth.currentUser;
//       if (user) {
//         const cartRef = collection(db, "users", user.uid, "cart");
//         const cartSnapshot = await getDocs(cartRef);
//         const cartItems = cartSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setItems(cartItems);
//       }
//     };

//     fetchCartItems();
//   }, [auth.currentUser]);

//   // ดึงข้อมูลที่อยู่ผู้ใช้จาก Firestore
//   useEffect(() => {
//     const fetchAddress = async () => {
//       const user = auth.currentUser;
//       if (user) {
//         const docRef = doc(db, "users", user.uid);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists() && docSnap.data().address) {
//           setAddress(docSnap.data().address);
//           setEditAddress(docSnap.data().address);
//         }
//       }
//     };
//     fetchAddress();
//   }, [auth.currentUser]);

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         navigate('/');
//       })
//       .catch((error) => {
//         console.error('Error signing out:', error);
//       });
//   };

//   // เพิ่มจำนวนสินค้าใน cart
//   const handleIncrement = async (id) => {
//     const user = auth.currentUser;
//     if (user) {
//       const itemRef = doc(db, "users", user.uid, "cart", id);
//       await updateDoc(itemRef, {
//         quantity: getFirestore.FieldValue.increment(1)
//       });
//       setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
//     }
//   };

//   // ลดจำนวนสินค้าใน cart
//   const handleDecrement = async (id) => {
//     const user = auth.currentUser;
//     if (user) {
//       const itemRef = doc(db, "users", user.uid, "cart", id);
//       const item = items.find(item => item.id === id);
//       if (item.quantity > 1) {
//         await updateDoc(itemRef, {
//           quantity: getFirestore.FieldValue.increment(-1)
//         });
//         setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
//       }
//     }
//   };

//   // ลบสินค้าออกจาก cart
//   const handleRemove = async (id) => {
//     const user = auth.currentUser;
//     if (user) {
//       const itemRef = doc(db, "users", user.uid, "cart", id);
//       await deleteDoc(itemRef);
//       setItems(items.filter(item => item.id !== id));
//     }
//   };

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setEditAddress(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSaveAddress = async () => {
//     const user = auth.currentUser;
//     if (user) {
//       const docRef = doc(db, "users", user.uid);
//       try {
//         await setDoc(docRef, { address: editAddress }, { merge: true });
//         setAddress(editAddress);
//         setShowModal(false);
//       } catch (error) {
//         console.error("Error saving address: ", error);
//       }
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="h-screen flex flex-col justify-center items-end text-center"
//         style={{
//           backgroundImage: "url('https://i.pinimg.com/control/564x/1d/a9/6e/1da96e4e4612e509637d17fd725c3416.jpg')",
//           backgroundSize: "100%",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           height: "120px"
//         }}
//       >
//         <div className="flex items-center justify-start p-4 w-full ">
//           <div className="flex justify-start">
//             <img src={imageku} alt="KU Logo" className="w-[200px] h-[100px]" />
//           </div>
//           <div className="flex space-x-4">
//             <a onClick={(e) => e.preventDefault()} 
//               className="inline-flex items-center px-2 py-1.5 rounded-md text-white hover:bg-indigo-50"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
//               </svg>
//               <span className="font-bold text-lg"></span>
//             </a>
//             <a onClick={(e) => e.preventDefault()} 
//               className="inline-flex items-center px-3 py-1.5 rounded-md text-white hover:bg-indigo-50"
//             >
//               <span className="font-bold text-lg"></span>
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </a>
//           </div>
//           <a href="#logout"
//             onClick={handleLogout}
//             className="absolute top-18 right-8 inline-flex items-center px-4 py-2 text-white rounded-md hover:bg-red-600"
//           >
//             <span className="font-bold text-lg">Logout</span>
//           </a>
//         </div>
//       </div>

//       <div className="container mx-auto py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-md">
//           <h2 className="text-2xl font-bold mb-4">ตะกร้า</h2>

//           <div className="bg-gray-200 p-4 rounded-lg mb-6">
//             <p className="font-medium text-gray-800">
//               {address.fullName ? `${address.fullName} เบอร ${address.phone} ${address.addressDetail}` : "ยังไม่มีข้อมูลที่อยู่"}
//             </p>
//             <button
//               onClick={() => setShowModal(true)}
//               className="bg-green-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-green-600"
//             >
//               {address.fullName ? "แก้ไข" : "เพิ่มที่อยู่"}
//             </button>
//           </div>

//           {showModal && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//               <div className="bg-yellow-200 p-8 rounded-lg shadow-lg max-w-3xl w-full grid grid-cols-1 gap-8">
//                 <div className="flex flex-col items-center justify-center">
//                   <h2 className="text-2xl font-bold mb-4 md:self-start md:ml-[117px]">ช่องทางการติดต่อ</h2>
//                   <input 
//                     className="w-2/3 p-3 mb-4 rounded-lg bg-white" 
//                     name="fullName" 
//                     value={editAddress.fullName} 
//                     onChange={handleAddressChange}
//                     placeholder="ชื่อ นามสกุล" 
//                   />
//                   <input 
//                     className="w-2/3 p-3 mb-4 rounded-lg bg-white" 
//                     name="phone" 
//                     value={editAddress.phone} 
//                     onChange={handleAddressChange}
//                     placeholder="หมายเลขโทรศัพท์" 
//                   />
//                   <h2 className="text-2xl font-bold mb-4 md:self-start md:ml-[117px]">ที่อยู่</h2>
//                   <input 
//                     className="w-2/3 p-3 mb-4 rounded-lg bg-white" 
//                     name="addressDetail" 
//                     value={editAddress.addressDetail} 
//                     onChange={handleAddressChange}
//                     placeholder="ที่อยู่"
//                   />
//                   <button
//                     onClick={handleSaveAddress}
//                     className="bg-green-500 text-white w-2/3 p-3 rounded-lg hover:bg-green-600"
//                   >
//                     ยืนยัน
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="space-y-4">
//             {items.map(item => (
//               <div key={item.id} className="flex items-center space-x-4">
//                 <img className="w-20 h-20 rounded-lg" src={item.img || "https://via.placeholder.com/150"} alt={item.name} />
//                 <div className="flex-1">
//                   <h3 className="font-bold text-lg">{item.name}</h3>
//                   <p className="text-gray-700">THB {item.price}.00</p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button onClick={() => handleDecrement(item.id)}>-</button>
//                   <input type="text" value={item.quantity} readOnly className="text-center w-8" />
//                   <button onClick={() => handleIncrement(item.id)}>+</button>
//                 </div>
//                 <p className="font-bold">ยอดรวม: THB {item.price * item.quantity}.00</p>
//                 <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-700">
//                   <FontAwesomeIcon icon={faTrash} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded-lg p-6 shadow-md">
//           <h2 className="text-2xl font-bold mb-4">สรุปคำสั่งซื้อ</h2>
//           <p className="text-gray-700">จำนวนรายการ: {items.reduce((sum, item) => sum + item.quantity, 0)} รายการ</p>
//           <p className="text-gray-700">รวมมูลค่าสินค้า: THB {items.reduce((sum, item) => sum + item.price * item.quantity, 0)}.00</p>
//           <p className="text-gray-700">ค่าจัดส่ง: THB 40.00</p>
//           <p className="font-bold text-xl mt-4">ราคาทั้งหมด: THB {items.reduce((sum, item) => sum + item.price * item.quantity, 0) + 40}.00</p>

//           <div className="mt-6 space-y-4">
//             <button
//               className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
//               onClick={() => setShowPaymentModal(true)}
//             >
//               ชำระเงิน
//             </button>
//           </div>
//         </div>
//       </div>

//       {showPaymentModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
//             <h2 className="text-xl font-semibold text-gray-900">Payment</h2>
//             <form className="mt-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label>Full name</label>
//                   <input type="text" className="block w-full p-2 border rounded" placeholder="ชื่อบนบัตร" />
//                 </div>
//                 <div>
//                   <label>Card number</label>
//                   <input type="text" className="block w-full p-2 border rounded" placeholder="xxxx-xxxx-xxxx-xxxx" />
//                 </div>
//                 <div>
//                   <label>Card expiration</label>
//                   <input type="text" className="block w-full p-2 border rounded" placeholder="MM/YY" />
//                 </div>
//                 <div>
//                   <label>CVV</label>
//                   <input type="text" className="block w-full p-2 border rounded" placeholder="xxx" />
//                 </div>
//               </div>
//               <button type="submit" className="w-full bg-green-500 text-white p-2 mt-4 rounded">
//                 ยืนยันชำระเงิน
//               </button>
//             </form>
//             <button
//               className="absolute top-4 right-4 text-gray-600"
//               onClick={() => setShowPaymentModal(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;




import React, { useState, useEffect } from 'react';
import imageku from './images/image_ku.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, deleteDoc, collection, getDocs, updateDoc, increment } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [items, setItems] = useState([]);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressDetail: "",
  });
  const [editAddress, setEditAddress] = useState(address);

  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  // ดึงข้อมูลสินค้าใน cart จาก Firestore
  useEffect(() => {
    const fetchCartItems = async () => {
      const user = auth.currentUser;
      if (user) {
        const cartRef = collection(db, "users", user.uid, "cart");
        const cartSnapshot = await getDocs(cartRef);
        const cartItems = cartSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setItems(cartItems);
      }
    };

    fetchCartItems();
  }, [auth.currentUser]);

  // ดึงข้อมูลที่อยู่ผู้ใช้จาก Firestore
  useEffect(() => {
    const fetchAddress = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().address) {
          setAddress(docSnap.data().address);
          setEditAddress(docSnap.data().address);
        }
      }
    };
    fetchAddress();
  }, [auth.currentUser]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  // เพิ่มจำนวนสินค้าใน cart
  const handleIncrement = async (id) => {
    const user = auth.currentUser;
    if (user) {
      const itemRef = doc(db, "users", user.uid, "cart", id);
      await updateDoc(itemRef, {
        quantity: increment(1)
      });
      setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    }
  };

  // ลดจำนวนสินค้าใน cart
  const handleDecrement = async (id) => {
    const user = auth.currentUser;
    if (user) {
      const itemRef = doc(db, "users", user.uid, "cart", id);
      const item = items.find(item => item.id === id);
      if (item.quantity > 1) {
        await updateDoc(itemRef, {
          quantity: increment(-1)
        });
        setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
      }
    }
  };

  // ลบสินค้าออกจาก cart
  const handleRemove = async (id) => {
    const user = auth.currentUser;
    if (user) {
      const itemRef = doc(db, "users", user.uid, "cart", id);
      await deleteDoc(itemRef);
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setEditAddress(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSaveAddress = async () => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "users", user.uid);
      try {
        await setDoc(docRef, { address: editAddress }, { merge: true });
        setAddress(editAddress);
        setShowModal(false);
      } catch (error) {
        console.error("Error saving address: ", error);
      }
    }
  };
  

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="h-screen flex flex-col justify-center items-end text-center"
        style={{
          backgroundImage: "url('https://i.pinimg.com/control/564x/1d/a9/6e/1da96e4e4612e509637d17fd725c3416.jpg')",
          backgroundSize: "100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "120px"
        }}
      >
        <div className="flex items-center justify-start p-4 w-full ">
          <div className="flex justify-start">
            <img src={imageku} alt="KU Logo" className="w-[200px] h-[100px]" 
             onClick={() => navigate('/category')}
             />
          </div>
          <a href="#logout"
            onClick={handleLogout}
            className="absolute top-18 right-8 inline-flex items-center px-4 py-2 text-white rounded-md hover:bg-red-600"
          >
            <span className="font-bold text-lg">Logout</span>
          </a>
        </div>
      </div>

      <div className="container mx-auto py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4">ตะกร้า</h2>

          <div className="bg-gray-200 p-4 rounded-lg mb-6">
            <p className="font-medium text-gray-800">
              {address.fullName ? `${address.fullName} เบอร์ ${address.phone} ${address.addressDetail}` : "ยังไม่มีข้อมูลที่อยู่"}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-green-600"
            >
              {address.fullName ? "แก้ไข" : "เพิ่มที่อยู่"}
            </button>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-yellow-200 p-8 rounded-lg shadow-lg max-w-3xl w-full grid grid-cols-1 gap-8">
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-2xl font-bold mb-4 md:self-start md:ml-[117px]">ช่องทางการติดต่อ</h2>
                  <input 
                    className="w-2/3 p-3 mb-4 rounded-lg bg-white" 
                    name="fullName" 
                    value={editAddress.fullName} 
                    onChange={handleAddressChange}
                    placeholder="ชื่อ นามสกุล" 
                  />
                  <input 
                    className="w-2/3 p-3 mb-4 rounded-lg bg-white" 
                    name="phone" 
                    value={editAddress.phone} 
                    onChange={handleAddressChange}
                    placeholder="หมายเลขโทรศัพท์" 
                  />
                  <h2 className="text-2xl font-bold mb-4 md:self-start md:ml-[117px]">ที่อยู่</h2>
                  <input 
                    className="w-2/3 p-3 mb-4 rounded-lg bg-white" 
                    name="addressDetail" 
                    value={editAddress.addressDetail} 
                    onChange={handleAddressChange}
                    placeholder="ที่อยู่"
                  />
                  <button
                    onClick={handleSaveAddress}
                    className="bg-green-500 text-white w-2/3 p-3 rounded-lg hover:bg-green-600"
                  >
                    ยืนยัน
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex items-center space-x-4">
                <img className="w-20 h-20 rounded-lg" src={item.img || "https://via.placeholder.com/150"} alt={item.name} />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-700">THB {item.price}.00</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleDecrement(item.id)}>-</button>
                  <input type="text" value={item.quantity} readOnly className="text-center w-8" />
                  <button onClick={() => handleIncrement(item.id)}>+</button>
                </div>
                <p className="font-bold">ยอดรวม: THB {item.price * item.quantity}.00</p>
                <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-700">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4">สรุปคำสั่งซื้อ</h2>
          <p className="text-gray-700">จำนวนรายการ: {items.reduce((sum, item) => sum + item.quantity, 0)} รายการ</p>
          <p className="text-gray-700">รวมมูลค่าสินค้า: THB {items.reduce((sum, item) => sum + item.price * item.quantity, 0)}.00</p>
          <p className="text-gray-700">ค่าจัดส่ง: THB 40.00</p>
          <p className="font-bold text-xl mt-4">ราคาทั้งหมด: THB {items.reduce((sum, item) => sum + item.price * item.quantity, 0) + 40}.00</p>

          <div className="mt-6 space-y-4">
            <button
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              onClick={() => setShowPaymentModal(true)}
            >
              ชำระเงิน
            </button>
          </div>
        </div>
      </div>

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
              <button type="submit" className="w-full bg-green-500 text-white p-2 mt-4 rounded">
                ยืนยันชำระเงิน
              </button>
            </form>
            <button
              className="absolute top-4 right-4 text-gray-600"
              onClick={() => setShowPaymentModal(false)}
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
