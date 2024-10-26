import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import imageku from './images/image_ku.png';
import { auth, db } from '../firebase'; // นำเข้า Firestore และ Firebase Auth
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // นำเข้า Firestore functions

function SignUp() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [usernamesignup, setUsernamesignup] = useState('');
    const [passwordsignup, setPasswordsignup] = useState('');
    const [passwordsignup2, setPasswordsignup2] = useState('');
    const [showPasswordsignup, setShowPasswordsignup] = useState(false);

    const navigate = useNavigate();
    const handleSignInClick = () => navigate('/');

    const handleFirstnameChange = (e) => setFirstname(e.target.value);
    const handleLastnameChange = (e) => setLastname(e.target.value);
    const handleInputChangesignup = (e) => setUsernamesignup(e.target.value);
    const handleInputChangesignup2 = (e) => setPasswordsignup(e.target.value);
    const handleInputconfirmpass = (e) => setPasswordsignup2(e.target.value);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSignUp = async () => {
        if (!usernamesignup || !passwordsignup || !passwordsignup2 || !firstname || !lastname) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'กรุณากรอกข้อมูลให้ครบทุกช่อง!',
            });
            return;
        }

        if (!validateEmail(usernamesignup)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'รูปแบบอีเมลไม่ถูกต้อง!',
            });
            return;
        }

        if (passwordsignup !== passwordsignup2) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'รหัสผ่านไม่ตรงกัน!',
            });
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, usernamesignup, passwordsignup);
            const user = userCredential.user;

            // บันทึกข้อมูลผู้ใช้ลงใน Firestore
            await setDoc(doc(db, 'users', user.uid), {
                firstname: firstname,
                lastname: lastname,
                email: usernamesignup,
                createdAt: new Date(),
            });

            Swal.fire({
                title: 'สมัครสมาชิกสำเร็จ!',
                icon: 'success',
            });

            navigate('/');

        } catch (error) {
            console.error('Error during signup:', error);
            Swal.fire({
                icon: 'error',
                title: 'สมัครสมาชิกไม่สำเร็จ',
                text: error.message,
            });
        }
    };

    return (
        <BaseLayout>
            <div style={{
                transform: 'scale(0.8)',
                transformOrigin: 'center'
            }}>
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    padding: '35px',
                    borderRadius: '20px',
                    boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
                    position: 'relative',
                    margin: 0,
                }}>
                    <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '28px', marginTop: '0px', color: '#292724' }}>Sign Up</h1>

                    <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '17px', marginRight: '85%' }}>Firstname:</h2>
                    <input
                        type="text"
                        placeholder="Enter your firstname"
                        value={firstname}
                        onChange={handleFirstnameChange}
                        style={{
                            padding: '14px',
                            width: '450px',
                            fontSize: '17px',
                            borderRadius: '12px',
                            fontFamily: 'Montserrat, sans-serif',
                            backgroundColor: '#F4EEAD',
                            border: 'none',
                            outline: 'none'
                        }}
                    />

                    <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '17px', marginRight: '85%', marginTop: '20px' }}>Lastname:</h2>
                    <input
                        type="text"
                        placeholder="Enter your lastname"
                        value={lastname}
                        onChange={handleLastnameChange}
                        style={{
                            padding: '14px',
                            width: '450px',
                            fontSize: '17px',
                            borderRadius: '12px',
                            fontFamily: 'Montserrat, sans-serif',
                            backgroundColor: '#F4EEAD',
                            border: 'none',
                            outline: 'none'
                        }}
                    />

                    <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '17px', marginRight: '90%' }}>Email:</h2>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={usernamesignup}
                        onChange={handleInputChangesignup}
                        style={{
                            padding: '14px',
                            width: '450px',
                            fontSize: '17px',
                            borderRadius: '12px',
                            fontFamily: 'Montserrat, sans-serif',
                            backgroundColor: '#F4EEAD',
                            border: 'none',
                            outline: 'none'
                        }}
                    />

                    <img src={imageku} 
                        alt="KU Logo" 
                        style={{
                            position: 'absolute',
                            bottom:'500px',
                            left: '780px',
                            width: '366px', 
                            height: '172px',
                            }}
                    />

                    <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '17px', marginRight: '90%', marginTop: '20px' }}>Password:</h2>
                    <div style={{ position: 'relative', width: '450px' }}>
                        <input
                            type={showPasswordsignup ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={passwordsignup}
                            onChange={handleInputChangesignup2}
                            style={{
                                padding: '14px',
                                width: '100%',
                                fontSize: '17px',
                                borderRadius: '12px',
                                fontFamily: 'Montserrat, sans-serif',
                                backgroundColor: '#F4EEAD',
                                border: 'none',
                                outline: 'none'
                            }}
                        />

                        <button
                            onClick={() => setShowPasswordsignup(!showPasswordsignup)}
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
                                justifyContent: 'center'
                            }}
                        >
                            {showPasswordsignup ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '17px', marginRight: '65%', marginTop: '20px' }}>Confirm Password:</h2>
                    <div style={{ position: 'relative', width: '450px' }}>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={passwordsignup2}
                            onChange={handleInputconfirmpass}
                            style={{
                                padding: '14px',
                                width: '450px',
                                fontSize: '17px',
                                borderRadius: '12px',
                                fontFamily: 'Montserrat, sans-serif',
                                backgroundColor: '#F4EEAD',
                                border: 'none',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ marginTop: '35px' }}>
                        <button
                            onClick={handleSignUp}
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
                                outline: 'none'
                            }}
                            onMouseOver={e => {
                                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            Sign Up
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
                    textAlign: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '17px', marginRight: '10px', color: '#a3181a' }}>
                            Already had an account?
                        </h3>
                        <h3
                            style={{ cursor: 'pointer', fontWeight: 'bold', color: '#292724' }}
                            onClick={handleSignInClick}
                        >
                            Sign in
                        </h3>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

export default SignUp;




