'use client'
import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 100%;
`;
interface MainProps {
    children: React.ReactNode;
}


const Main:React.FC<MainProps> = ({ children })=> {
    return (
        <MainContainer>
            {children}	
        </MainContainer>
    )
}

export default Main;