import React from 'react';

function BaseLayout({ children }) {
    return (
        <div
            style={{
                height: '100vh',
                backgroundImage: 'url(https://i.pinimg.com/control/564x/1d/a9/6e/1da96e4e4612e509637d17fd725c3416.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            {children}
        </div>
    );
}

export default BaseLayout;