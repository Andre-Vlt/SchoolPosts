'use client'
import { useFormik } from "formik";
import { useState } from "react";
import styled from "styled-components";
import { useRouter } from 'next/navigation';
import Books from "../../app/public/images/Books.png";
import Image from "next/image";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to left, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* border: 1px solid #000; */
    padding: 20px;
    border-radius: 50px;
    height: 80%;
    width: 30%;
    background-color: #FE6F5E;`;

const Title = styled.h1`
    color: #fff;
    font-size: 24px;
    font-family: 'Orbitron', sans-serif;`;

const Labels = styled.label`
    color: #fff;
    font-size: 24px;
    font-family: 'Orbitron', sans-serif;
    align-self: center;`;

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;`;

const Input = styled.input`
    margin: 10px 0;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #000;
    background-color: #eea264a4;
    color: #fff;`;

const Button = styled.button`
    margin: 10px 0;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #000;
    background-color: #767fa7;
    cursor: pointer;
    width: 100%;

    &:hover {
        background-color: #596181;
    }`;

const BookImage = styled(Image)`
    align-self: center;
    margin-bottom: 60px;`;

const ErrorMessage = styled.p`
color: #ee0101;
padding: 20px;
border-radius: 5px;
`;


const Login = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) => {
            try{
                //fazer requisição
                const response = 
                await fetch('https://school-bqfd.onrender.com/adm/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: values.username,
                        password: values.password,
                    }),
                })

                if (!response.ok) {
                    throw new Error('Usuário ou senha inválidos')
                }

                const data = await response.json();
                console.log('Login realizado', data)
                localStorage.setItem('isLoggedIn', 'true')
                localStorage.setItem('userId', data.id_user)
                localStorage.setItem('username', data.username)

                //Segunda ideia: fazer o fetch na tela inicial, e se professor existir, deixar um botão 'add' para ele criar o post. Se o professor não existir, deixar o botão invisível.

                
                router.push('/')
            }catch(error){
                if (error instanceof Error){
                    setErrorMessage(error.message)
                }else
                {
                    setErrorMessage('Erro desconhecido')
                }
        }}})

    return (
        <Container>
            <Title>Posts Escolares!</Title>
            <FormContainer>
                <BookImage src = {Books} alt = "Books" width = {200} height = {0} />
                    <form onSubmit={formik.handleSubmit}>
                        <FieldContainer>
                            <Labels htmlFor="username">Usuário</Labels>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                            />
                        </FieldContainer>

                        <FieldContainer>
                            <Labels htmlFor="password">Senha</Labels>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                        </FieldContainer>

                        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                        
                        <Button type="submit">Entrar</Button>
                    </form>
            </FormContainer>
        </Container>
    )
}

export default Login;