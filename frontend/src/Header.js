import React from 'react';

export default function Header({children}){
    return(
        <header>
            <h1>{children}</h1>
        </header>
    );
}

// export default Header; //colocado apenas de exemplo, a exportação ja foi feita acima