// import React, { useRef, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import imageku from './images/image_ku.png';
// import basket from './images/basket.png';
// import search from './images/search.png';
// import axios from 'axios';
// import { auth } from '../firebase'; // นำเข้า auth จากไฟล์ firebase
// import Swal from 'sweetalert2'; // นำเข้า SweetAlert2 สำหรับการแจ้งเตือน

// const Category = () => {
//   const navigate = useNavigate();
//   const [cata, setCata] = useState([]);

//   useEffect(() => {
//     const getCategory = async () => {
//       try {
//         const category = await axios.get('http://localhost:4000/api/category');
//         setCata(category.data.cata);
//       } catch (error) {
//         console.error('Error fetching category data:', error);
//       }
//     };
  
//     getCategory(); // เรียกใช้ฟังก์ชัน async ภายใน useEffect
//   }, []);

//   const handleLogout = () => {
//     navigate('/');
//   };

//   const goToCart = () => {
//     navigate('/cart');
//   };

//   const goToHome = () => {
//     navigate('/home');
//   };

//   const handleAddToCart = async (product) => {
//     if (!auth.currentUser) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Please log in',
//         text: 'You need to log in to add items to your cart.',
//       });
//       return;
//     }
  
//     const userId = auth.currentUser.uid;
//     try {
//       // เปลี่ยน endpoint เป็น /api/category และใช้ axios.post
//       await axios.post('http://localhost:4000/api/category', {
//         userId: userId,
//         productName: product.name
//       });
//       Swal.fire({
//         icon: 'success',
//         title: 'Added to Cart',
//         text: `${product.name} has been added to your cart!`,
//       });
//     } catch (error) {
//       console.error('Error adding product to cart:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'There was an error adding the product to your cart.',
//       });
//     }
//   };
  
  
  

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div
//         className="h-screen flex flex-col justify-center items-end text-center"
//         style={{
//           backgroundImage:
//             "url('https://i.pinimg.com/control/564x/1d/a9/6e/1da96e4e4612e509637d17fd725c3416.jpg')",
//           backgroundSize: '100%',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//           height: '120px',
//         }}
//       >
//         <div className="flex items-center justify-start p-4 w-full">
//           <div className="flex justify-start">
//             <img src={imageku} alt="KU Logo" className="w-[200px] h-[100px]" />
//           </div>

//           <img
//             src={basket}
//             alt="Cart Icon"
//             onClick={goToCart}
//             style={{
//               position: 'absolute',
//               bottom: '660px',
//               left: '1340px',
//               width: '43px',
//               height: '38px',
//               objectFit: 'contain',
//               cursor: 'pointer',
//             }}
//           />

//           <img
//             src={search}
//             alt="Search Icon"
//             onClick={goToHome}
//             style={{
//               position: 'absolute',
//               bottom: '660px',
//               left: '1280px',
//               width: '43px',
//               height: '38px',
//               objectFit: 'contain',
//               cursor: 'pointer',
//             }}
//           />

//           <div className="flex space-x-4">
//             <a
//               href="#"
//               className="inline-flex items-center px-2 py-1.5 rounded-md text-white "
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 className="h-8 w-8"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M7 16l-4-4m0 0l4-4m-4 4h18"
//                 />
//               </svg>
//               <span className="font-bold text-lg"></span>
//             </a>
//             <a
//               href="#"
//               className="inline-flex items-center px-3 py-1.5 rounded-md text-white"
//             >
//               <span className="font-bold text-lg"></span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 className="h-8 w-8"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M17 8l4 4m0 0l-4 4m4-4H3"
//                 />
//               </svg>
//             </a>
//           </div>

//           <a
//             href="#logout"
//             onClick={handleLogout}
//             className="absolute top-18 right-8 inline-flex items-center px-4 py-2 text-white rounded-md hover:bg-red-600"
//           >
//             <span className="font-bold text-lg">Logout</span>
//           </a>
//         </div>
//       </div>

//       <div className="grid grid-cols-3 gap-4 p-4">
//         {cata.map((product) => (
//           <div
//             key={product.name}
//             className="bg-white p-4 rounded-md shadow-md flex flex-col"
//           >
//             <img
//               src={product.img}
//               alt={product.name}
//               className="object-cover h-40 w-full rounded-md mb-4"
//             />
//             <h2 className="text-lg font-bold">{product.name}</h2>
//             <p className="text-gray-700">Price: {product.price} baht</p>
//             <button
//               onClick={() => handleAddToCart(product)}
//               className="mt-auto bg-green-500 text-white py-2 rounded-md hover:bg-yellow-600"
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Category;




import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imageku from './images/image_ku.png';
import basket from './images/basket.png';
import search from './images/search.png';
import axios from 'axios';
import { auth } from '../firebase'; // นำเข้า auth จากไฟล์ firebase
import Swal from 'sweetalert2'; // นำเข้า SweetAlert2 สำหรับการแจ้งเตือน

const Category = () => {
  const navigate = useNavigate();
  const [cata, setCata] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const category = await axios.get('http://localhost:4000/api/category');
        setCata(category.data.cata);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };
  
    getCategory(); // เรียกใช้ฟังก์ชัน async ภายใน useEffect
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const goToHome = () => {
    navigate('/home');
  };

  const handleAddToCart = async (product) => {
    if (!auth.currentUser) {
      Swal.fire({
        icon: 'warning',
        title: 'Please log in',
        text: 'You need to log in to add items to your cart.',
      });
      return;
    }
  
    const userId = auth.currentUser.uid;
    try {
      // เปลี่ยน endpoint เป็น /api/category และใช้ axios.post
      await axios.post('http://localhost:4000/api/category', {
        userId: userId,
        productName: product.name
      });
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: `${product.name} has been added to your cart!`,
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error adding the product to your cart.',
      });
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <div
        className="h-screen flex flex-col justify-center items-end text-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/control/564x/1d/a9/6e/1da96e4e4612e509637d17fd725c3416.jpg')",
          backgroundSize: '100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '120px',
        }}
      >
        <div className="flex items-center justify-between p-4 w-full">
          <div className="flex justify-start">
            <img
              src={imageku}
              alt="KU Logo"
              className="w-[200px] h-[100px] cursor-pointer"
              onClick={() => navigate('/category')}
            />
          </div>
          
          {/* ไอคอนตะกร้าสินค้า */}
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 cursor-pointer text-white m-32"
              onClick={goToCart}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </div>

          <a
            href="#logout"
            onClick={handleLogout}
            className="absolute top-18 right-8 inline-flex items-center px-4 py-2 text-white rounded-md hover:bg-red-600"
          >
            <span className="font-bold text-lg">Logout</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-4">
        {cata.map((product) => (
          <div
            key={product.name}
            className="bg-white p-4 rounded-md shadow-md flex flex-col"
          >
            <img
              src={product.img}
              alt={product.name}
              className="object-cover h-40 w-full rounded-md mb-4"
            />
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-700">Price: {product.price} baht</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-auto bg-green-500 text-white py-2 rounded-md hover:bg-yellow-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
