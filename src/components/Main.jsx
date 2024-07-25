import React from "react";

const Main = ({ children }) => {
    return (
    <main id="main" role="main" className="fillHeight">
        {children}
    </main>
    );
};

export default Main;