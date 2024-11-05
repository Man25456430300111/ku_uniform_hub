import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import BaseLayout from './BaseLayout';
import imageku from './images/image_ku.png';
import axios from 'axios';
import { auth } from '../firebase'; // นำเข้า Firebase
import { signInWithEmailAndPassword } from 'firebase/auth'; // นำเข้าเมธอดสำหรับการล็อกอิน
import { sendPasswordResetEmail } from 'firebase/auth'; // Ensure to import this

function SignIn() {
  //------------------sign in----------------------
  const [usernamesignin, setUsernamesignin] = useState(''); // เก็บอีเมลผู้ใช้
  const [passwordsignin, setPasswordsignin] = useState(''); // เก็บรหัสผ่านผู้ใช้
  const [showPasswordsignin, setShowPasswordsignin] = useState(false); // สำหรับการแสดงหรือซ่อนรหัสผ่าน
  const navigate = useNavigate(); // ใช้เพื่อเปลี่ยนหน้า

  const callSignin = async () => {
    // ตรวจสอบว่าได้กรอกข้อมูลทั้งหมดหรือไม่
    if (!usernamesignin || !passwordsignin) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out all the fields!',
      });
      return;
    }

    try {
      // ล็อกอินด้วย Firebase Authentication
      await signInWithEmailAndPassword(auth, usernamesignin, passwordsignin);
      // const userCredential = await signInWithEmailAndPassword(auth, usernamesignin, passwordsignin);
      // const user = userCredential.user;

      // // รับ JWT Token จาก Firebase
      // const idToken = await user.getIdToken();

      // // ส่ง JWT Token ไปยัง Backend เพื่อยืนยันตัวตน
      // const res = await axios.post("http://localhost:3001/api/login", { 
      //   idToken: idToken, // ส่ง JWT Token ไปที่ Backend
      // });

      // จัดการข้อมูลเมื่อเข้าสู่ระบบสำเร็จ
      Swal.fire({
        title: 'Signed in successfully!',
        icon: 'success',
        confirmButtonText: 'OK', // กำหนดปุ่ม OK
      }).then((result) => {
        if (result.isConfirmed) {
          // นำทางไปที่ User.js
          navigate('/category'); // เปลี่ยนเส้นทางไปหน้าถัดไป
        }
      });

    } catch (e) {
      // แสดงข้อผิดพลาดใน Console เพื่อช่วยวิเคราะห์ปัญหา
      console.log('Error:', e);

      if (e.response) {
        // ตรวจสอบสถานะและแสดงข้อความที่เหมาะสม
        switch (e.response.status) {
          case 403:
          case 400:
            console.log(e.response.data); // ดู JSON ที่ส่งกลับจากเซิร์ฟเวอร์
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: e.response.data.message || 'Error occurred.',
            });
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'An unexpected error occurred. Please try again later.',
            });
        }
      } else {
        // กรณีไม่มีการตอบสนองจากเซิร์ฟเวอร์
        Swal.fire({
          icon: 'error',
          title: 'Invalid Email or Password',
          text: 'The email or password you entered is incorrect. Please try again.',
        });
      }
    }
  };

  const handleInputChange = (e) => setUsernamesignin(e.target.value); // สำหรับ email
  const handleInputChange2 = (e) => setPasswordsignin(e.target.value); // สำหรับ password

  const handleSignUpClick = () => navigate('/signup'); // ไปหน้า Sign Up
  

  const handleForgotPasswordClick = () => {
    Swal.fire({
      title: 'Forgot Password',
      input: 'email',
      inputLabel: 'Enter your email address',
      inputPlaceholder: 'Enter your email',
      showCancelButton: true,
      confirmButtonText: 'Reset Password',
    }).then((result) => {
      if (result.isConfirmed) {
        const email = result.value;
        if (email) {
          sendPasswordResetEmail(auth, email)
            .then(() => {
              Swal.fire('Success!', 'Password reset email sent successfully!', 'success');
            })
            .catch((error) => {
              Swal.fire('Error!', error.message, 'error');
            });
        }
      }
    });
  };
  

  return (
    <BaseLayout>
      <div style={{ transform: 'scale(0.8)', transformOrigin: 'center' }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 1)', // กรอบโปร่งแสงสำหรับเนื้อหาฟอร์ม
          padding: '35px',
          borderRadius: '20px',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          margin: 0,
        }}>
          <img
            src={imageku}
            alt="KU Logo"
            style={{
              position: 'absolute', // จัดให้ภาพอยู่ในตำแหน่งที่แน่นอน
              bottom: '360px',
              left: '780px',
              width: '366px',
              height: '172px',
            }}
          />


          <h1 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 900,
            fontSize: '28px',
            marginTop: '0px',
            color: '#292724',
          }}>
            Sign In
          </h1>

          <h2 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: '17px',
            marginRight: '90%',
          }}>
            Email:
          </h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={usernamesignin}
            onChange={handleInputChange}
            style={{
              padding: '14px',
              width: '450px',
              fontSize: '17px',
              borderRadius: '12px',
              fontFamily: 'Montserrat, sans-serif',
              backgroundColor: '#F4EEAD',
              border: 'none',
              outline: 'none',
            }}
          />

          <h2 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: '17px',
            marginRight: '90%',
            marginTop: '20px',
          }}>
            Password:
          </h2>
          <div style={{ position: 'relative', width: '450px' }}>
            <input
              type={showPasswordsignin ? 'text' : 'password'} // เปลี่ยนเป็น type password ตามสถานะ
              placeholder="Enter your password"
              value={passwordsignin}
              onChange={handleInputChange2}
              style={{
                padding: '14px',
                width: '100%',
                fontSize: '17px',
                borderRadius: '12px',
                fontFamily: 'Montserrat, sans-serif',
                backgroundColor: '#F4EEAD',
                border: 'none',
                outline: 'none',
              }}
            />
            <button
              onClick={() => setShowPasswordsignin(!showPasswordsignin)} // เปลี่ยนสถานะเมื่อคลิก
              style={{
                position: 'absolute',
                right: '0px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: '#F4EEAD',
                border: 'none',
                color: '#b8811d',
                cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '15px',
                width: '50px',
                height: '40px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {showPasswordsignin ? 'Hide' : 'Show'}
            </button>
          </div>

          <div style={{ marginTop: '15px', cursor: 'pointer', color: '#a3181a' }} onClick={handleForgotPasswordClick}>
            Forgot Password?
          </div>


          <div style={{ marginTop: '35px' }}>
            <button
              onClick={callSignin} // แก้ให้ปุ่มเรียกฟังก์ชัน callSignin โดยตรง
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 900,
                padding: '10px 20px',
                fontSize: '20px',
                borderRadius: '12px',
                width: '350px',
                background: '#E8B774',
                color: '#292724',
                marginTop: '-30px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                height: '50px',
                border: 'none',
                outline: 'none',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Sign In
            </button>
          </div>
        </div>

        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 1)',
          padding: '35px',
          borderRadius: '20px',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          marginTop: '50px',
          width: '480px',
          height: '25px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '17px', marginRight: '10px', color: '#a3181a' }}>
              new to Ku Uniform Hub?
            </h3>
            <h3
              style={{ cursor: 'pointer', fontWeight: 'bold', color: '#292724' }}
              onClick={handleSignUpClick} // เมื่อคลิกจะเปลี่ยนไปหน้า Sign Up
            >
              Create an account
            </h3>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default SignIn;
