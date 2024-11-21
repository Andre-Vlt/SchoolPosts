'use client'
import Header from "@/components/Header/Header";
import SideMenu from "@/components/SideMenu/SideMenu";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
    <SideMenu />
    <div>Aqui vão os posts</div>
    </Container>
    </>
 );
}
