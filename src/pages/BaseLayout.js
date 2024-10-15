import React from 'react';

function BaseLayout({ children }) {
    return (
        <div
            style={{
                height: '100vh',
                backgroundImage: 'url(https://media.discordapp.net/attachments/1130936978519633940/1295741813239447625/image.png?ex=670fc119&is=670e6f99&hm=920187b7c9a3a082cc6f818d78d445caace451e37745bb183bd2ab8df6f54b16&=&format=webp&quality=lossless&width=1191&height=670)',
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