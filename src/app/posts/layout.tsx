'use client'
import styled from "styled-components";
import Header from "@/components/Header/Header";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 20px;
`;


const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => {
    return(
        <LayoutContainer>
            <Header />
            <MainContent>{children}</MainContent>
        </LayoutContainer>
    )
}

export default Layout;