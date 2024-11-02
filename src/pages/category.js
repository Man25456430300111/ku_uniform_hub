import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import imageku from './images/image_ku.png'; // นำเข้ารูปภาพจากโฟลเดอร์ images
import basket from './images/basket.png'; // นำเข้ารูปภาพจากโฟลเดอร์ images
import search from './images/search.png';
import axios from 'axios';

const Category = () => {
  const navigate = useNavigate(); // Create a navigate function

  const [cata, setCata] = useState([])
  const getCategory = async () => {
    const category = await axios.get('http://localhost:4000/api/category')
    setCata(category.data.cata)
  }
  getCategory()

  const handleLogout = () => {
    // Perform any logout logic here, such as clearing tokens or user data
    // After that, navigate to the Sign-in page
    navigate('/'); // Redirect to the sign-in page (adjust the path if needed)
  };

  const goToCart = () => {
    navigate('/cart'); // Navigate to the cart page
  };

  const goToHome = () => {
    navigate('/home'); // Navigate to the home page
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
        <div className="flex items-center justify-start p-4 w-full">
          <div className="flex justify-start">
            <img src={imageku} alt="KU Logo" className="w-[200px] h-[100px]" />
          </div>

          {/* Clickable basket image */}
          <img
            src={basket}
            alt="Cart Icon"
            onClick={goToCart} // Navigate to cart on click
            style={{
              position: 'absolute',
              bottom: '660px',
              left: '1350px',
              width: '43px',
              height: '38px',
              objectFit: 'contain',
              cursor: 'pointer' // Make it look clickable
            }}
          />

          {/* Clickable search image */}
          <img
            src={search}
            alt="Search Icon"
            onClick={goToHome} // Navigate to home on click
            style={{
              position: 'absolute',
              bottom: '660px',
              left: '1280px',
              width: '43px',
              height: '38px',
              objectFit: 'contain',
              cursor: 'pointer' // Make it look clickable
            }}
          />

          {/* ปุ่ม Back และ Next */}
          <div className="flex space-x-4">
            <a href="#"
              className="inline-flex items-center px-2 py-1.5 rounded-md text-white "
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span className="font-bold text-lg"></span>
            </a>
            <a href="#"
              className="inline-flex items-center px-3 py-1.5 rounded-md text-white"
            >
              <span className="font-bold text-lg"></span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* ปุ่ม Logout */}
          <a href="#logout"
            onClick={handleLogout} // Call handleLogout on click
            className="absolute top-18 right-8 inline-flex items-center px-4 py-2  text-white rounded-md hover:bg-red-600"
          >
            <span className="font-bold text-lg">Logout</span>
          </a>

        </div>
      </div>
      {cata && cata.map((data) => {
        console.log(data);
        console.log(data.name);
        return (
          <div>
            <img src={data.img} alt={data.name} />
            <h1>{data.name}</h1>
            <h2>THB {data.price}</h2>
          </div>
        )
      })}
    </div>
  );
};

export default Category;