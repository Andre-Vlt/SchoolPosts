'use client'
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import Books from "../../app/public/images/Books.png";
import Image from "next/image";
import Link from "next/link";

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;`;

const ButtonText = styled.h1`
    color: #fff;
    margin-right: 8px;
    
    @media (max-width: 320px) {
    font-size: 12px; 
    }

    @media (min-width: 321px) and (max-width: 480px){
        font-size: 15px;
    }

    `;

const SideMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ff4537;
    height: 88vh;
    width: 100%;
    border-right: 1px solid #000;`;
    

const Input = styled.input`
    margin-top: 10px;
    width: 80%;
    height: 40px;
    padding: 10px;
    border-radius: 5px;
    border: solid 1px #000;
    
    @media (max-width: 320px) {
        height: 30px;
        width: 93%;
    }

    @media (min-width: 321px) and (max-width: 480px){
        height: 35px;
        width: 93%;
    }

    @media (min-width: 481px) and (max-width: 768px){
        height: 40px;
        width: 93%;
    }

    @media (min-width: 769px) and (max-width: 1024px){
        height: 45px;
        width: 93%;
    }

    `;

const Button = styled.button`
    margin-top: 10px;
    width: 80%;
    height: 40px;
    background-color: #235789;
    border-radius: 5px;
    &:hover{
        background-color: #1a4567;
        }
    
    @media (max-width: 320px) {
        height: 55px;
        width: 92%;
    }

    @media (min-width: 321px) and (max-width: 480px){
        height: 50px;
        width: 92%;
    }

    @media (min-width: 481px) and (max-width: 768px){
        height: 45px;
        width: 92%;
    }

    @media (min-width: 769px) and (max-width: 1024px){
        height: 40px;
        width: 92%;
    }

    @media (min-width: 1025px) and (max-width: 1280px){
        height: 40px;
        width: 80%;
    }

        `;

const Text = styled.h2`
    margin-top: 10px;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    
    @media (max-width: 320px) {
    font-size: 12px; 
    align-self: center;
    margin-left: 10px;
    }

    @media (min-width: 321px) and (max-width: 480px){
        font-size: 16px;
        align-self: center;
        margin-left: 10px;
    }

    @media (min-width: 481px) and (max-width: 768px){
        font-size: 20px;
        align-self: center;
        margin-left: 28px;
    }

    @media (min-width: 769px) and (max-width: 1024px){
        font-size: 22px;
        align-self: center;
    }
    `;

const BookImage = styled(Image)`
    margin-top: 150px;
    width: 180px;
    @media (max-width: 320px) {
    width: 100px;

    }
    `;

//FIM DAS ESTILIZAÇÕES


const SideMenu: React.FC<{onSearch: (keyword: string) => void}> = ({onSearch})=>{
    const [buttonVisible, setButtonVisible] = useState(false);
    const [keyword, setKeyword] = useState('');

    const handleSearch = () =>{
        onSearch(keyword);
    }
    

    useEffect(() => {
        if(localStorage.getItem('isTeacher') === 'true'){
            setButtonVisible(true)
        }},[])

    return(
        <SideMenuContainer>
            <Text>Digite o trecho desejado</Text>
            <Input
            type = "text"
            value = {keyword}
            onChange={(e) => setKeyword(e.target.value)}>
            </Input>
            <Button onClick={handleSearch}>
                <ButtonContainer>
                    <ButtonText>
                        Buscar post
                    </ButtonText>
                    <FaSearch color="#fff"/>
                </ButtonContainer>    
            </Button>
            {buttonVisible && 
            <Button>
                <Link href="/addPost">
                <ButtonContainer>
                    <ButtonText>
                        Adicionar Post
                    </ButtonText>
                    <IoIosAdd size={25} color="#fff"/>
                </ButtonContainer>
            </Link>
            </Button>
            }
            <BookImage src={Books} alt="Books" 
            // width={200} height={200}
            />
        </SideMenuContainer>
    )
}

export default SideMenu;