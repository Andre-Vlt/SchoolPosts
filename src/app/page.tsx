'use client'
import Header from "@/components/Header/Header";
import Main from "@/components/Main/Main";
import PostsList from "@/components/PostsList/PostsList";
import SideMenu from "@/components/SideMenu/SideMenu";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  `;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 88vh;
  margin: 0;
  padding: 0;`;

const SideMenuContainer = styled.div`
  width: 300px;
  height: 88vh; 
  margin: 0;
  padding: 0; 
`;

export default function Home() {
  const router = useRouter();
  useEffect(() => 
  { 
    //Verificar se o usuário está logado:
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }
  }
, [])

  return (
    <>
    <Header />
    <Container>
      <SideMenuContainer>
        <SideMenu />
      </SideMenuContainer>
      <MainContainer>
        <Main><PostsList /></Main>
      </MainContainer>
    </Container>
    </>
 );
}
