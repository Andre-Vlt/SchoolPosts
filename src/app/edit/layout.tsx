'use client'
import styled from "styled-components";
import Header from "@/components/Header/Header";
import Bg from "../public/images/AddPostBg.png"

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main<{bg :string}>`
  flex-grow: 1;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
`;


const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => {
    return(
        <LayoutContainer>
            <Header />
            <MainContent bg={Bg.src}>{children}</MainContent>
        </LayoutContainer>
    )
}

export default Layout;