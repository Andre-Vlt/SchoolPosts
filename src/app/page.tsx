'use client'
import Header from "@/components/Header/Header";
import Main from "@/components/Main/Main";
import PostsList from "@/components/PostsList/PostsList";
import SideMenu from "@/components/SideMenu/SideMenu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

  const [keyword, setKeyword] = useState<string>('');
  const router = useRouter();
  useEffect(() => 
  { 
    //Verificar se o usuário está logado:
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }
    
    const handleBeforeUnload = () => {
      localStorage.clear();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }
, [])



  return (
    <>
    <Header />
    <Container>
      <SideMenuContainer>
        <SideMenu onSearch={(newKeyword) => setKeyword(newKeyword)} />
      </SideMenuContainer>
      <MainContainer>
        <Main>
          <PostsList keyWord={keyword} />
        </Main>
      </MainContainer>
    </Container>
    </>
 );
}
