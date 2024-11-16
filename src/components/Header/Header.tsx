'use client'
import Image from "next/image";
import styled from "styled-components";
import Logo from "../../app/public/images/Logo.png";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";


const Container = styled.div`
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 90px;
    border-bottom: 1px solid #000;`;

const Title = styled.h1`
    color: #000;
    font-size: 24px;`;

const ContainerUser = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;`;

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
        <FaUserCircle size = {50} color="#ff613f"/>
        {username && <h2>{username}</h2>} 
        </ContainerUser>
        </Container>
    );
};

export default Header;