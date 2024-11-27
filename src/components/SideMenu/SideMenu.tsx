'use client'
import { getTeacherById } from "@/apiCalls/getTeacherById";
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
    margin-right: 8px;`;

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
    border: solid 1px #000;`;

const Button = styled.button`
    margin-top: 10px;
    width: 60%;
    height: 40px;
    background-color: #235789;
    
    &:hover{
        background-color: #1a4567;
        }`;

const Text = styled.h2`
    margin-top: 10px;
    color: #fff;
    font-weight: bold;
    font-size: 20px;`;

const BookImage = styled(Image)`
    margin-top: 150px;`;

//FIM DAS ESTILIZAÇÕES


const SideMenu: React.FC<{onSearch: (keyword: string) => void}> = ({onSearch})=>{
    const [buttonVisible, setButtonVisible] = useState(false);
    const [keyword, setKeyword] = useState('');

    const handleSearch = () =>{
        onSearch(keyword);
    }
    
    useEffect(()=>{
        getTeacherById()
          .then((isTeacher) => {
            setButtonVisible(isTeacher);
          })
          .catch((error) => {
            console.error(error);
          })
    },[])
    
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
            <BookImage src={Books} alt="Books" width={200} height={200}/>
        </SideMenuContainer>
    )
}

export default SideMenu;