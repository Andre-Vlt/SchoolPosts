'use client'
import Image from "next/image";
import styled from "styled-components";
import Logo from "../../app/public/images/Logo.png";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";


const Container = styled.div`
    background: rgb(235,120,44);
    background: linear-gradient(346deg, rgba(235,120,44,1) 20%, rgba(228,134,79,1) 45%, rgba(255,226,120,1) 79%);
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 12vh;
    border-bottom: 1px solid #000;`;

const Title = styled.h1`
    color: #565756;
    font-size: 24px;`;

const ContainerUser = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;`;

const Name = styled.h2`
    color: #fff;
    font-weight: bold;
    margin-left: 10px;
    `;

const Header = () => {
    const [username, setUsername] = useState<string>('')

    useEffect(()=>{
        const username = localStorage.getItem('username')
        if(username){
            setUsername(username)
        }
    },[])

    return (
        <Container>
        <Title>Bem vindo(a)</Title>
        <Image src = {Logo} alt = "Logo" width = {550} height = {0} />
        <ContainerUser>
        <FaUserCircle size = {50} color="#e2e0de"/>
        {username && <Name>{username}</Name>} 
        </ContainerUser>
        </Container>
    );
};

export default Header;