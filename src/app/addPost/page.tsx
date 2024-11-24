'use client'
import styled from "styled-components";
import { useFormik } from "formik";
import { getTeacherByPersonId } from "@/apiCalls/getTeacherByPersonId";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
import { LoadingText } from "@/components/PostsList/PostsList";


const Title = styled.h1`
    color: #fff;
    font-size: 40px;
    font-weight: bold;`;

const FormContainer = styled.div`
    display: flex;
    align-items: center;
    height: 70vh;
    justify-content: center;
    width: 100%;
    `;


const InputTitle = styled.input`
    border: 3px solid #000;
    width: 70%;
    border-radius: 30px;
    background-color: #235789;
    color: #fff;
    font-weight: bold;
    padding: 10px;
    box-sizing: border-box;
    `;
const InputContent = styled.textarea`
    border: 3px solid #000;
    width: 80%;
    height: 100px;
    border-radius: 30px;
    resize: none;
    background-color: transparent;
    padding: 10px;
    box-sizing: border-box;
    background-color: #235789;
    color: #fff;
    `;

const Label = styled.label`
    color: #fff;`;  

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;
    height: 100%;
    background-color: #235889a7;
    margin-top: 90px;
    border: 2px solid #235789;
    border-bottom-left-radius: 100px;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    `;
const ReturnLink = styled(Link)`
    border: none;
    width: 30%;
    margin-top: 5px;
    color: #fff;
    background-color: #f34c09;
    font-weight: bold;
    border-radius: 30px;
    text-align: center;
    
    &:hover {
        background-color: #f5b351;
        transition: 0.7s ease;
    }
    `;

const Select = styled.select`
    border: 3px solid #000;
    width: 70%;
    border-radius: 30px;
    background-color: #235789;
    padding: 5px;
    color: #fff;
    `;
 
const SubmitButton = styled.button`
    border: none;
    width: 30%;
    margin-top: 5px;
    color: #fff;
    background-color: #19a525;
    font-weight: bold;
    border-radius: 30px;
    
    &:hover {
        background-color: #77ff77;
        transition: 0.7s ease;
    }
    `;

const ButtonsContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
    `;

const AddPostPage= ()=> {
    const [teacherId, setTeacherId] = useState('');
    
    useEffect(()=>{
        const fetchTeacherId = async()=>{
            try{
                const id = await getTeacherByPersonId();
                setTeacherId(id);
            }catch(err){
                console.log("Erro ao buscar Id do professor", err)
            }
        };
        fetchTeacherId();
    },[])
    
    
    const subjects=[
        { id: '1', name: 'Português'},
        { id: '2', name: 'Matemática'},
        { id: '3', name: 'Ciências'},
        { id: '4', name: 'História'},
        { id: '5', name: 'Geografia'},
        { id: '6', name: 'Inglês'},
        { id: '7', name: 'Física'},
        { id: '8', name: 'Química'},
        { id: '9', name: 'Tecnologia'},
    ]


    const formik = useFormik({
        initialValues: {
            id_teacher: '',
            id_subject: '',
            post_text: '',
            post_title: '',
        },onSubmit: async (values) =>{
            try{
               const response = await fetch('https://school-bqfd.onrender.com/teacher/post',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_teacher: teacherId,
                        id_subject: values.id_subject,
                        post_text: values.post_text,
                        post_title: values.post_title,
                    }),
                })

                if(!response.ok){
                    throw new Error('Erro ao criar post')
                }

                alert('Post criado com sucesso')

            }catch(err){
                console.log(err)}
        }
    });

    if (teacherId === null){
        return (
            <>
            <LoadingText>Loading</LoadingText>
            <PacmanLoader color="#235789" size={50}/>
            </>
        )
    }

    
    return (<>
    <FormContainer>
        <Form onSubmit={formik.handleSubmit}>
            <Title>CRIAR NOVO POST</Title>
            <Label htmlFor="id_subject">ID da matéria</Label>
            <Select
                id="id_subject"
                name="id_subject"
                onChange={formik.handleChange}
                value={formik.values.id_subject}
            >
                <option value="">Selecione a matéria</option>
                {subjects.map((subject)=>(
                    <option key={subject.id} value={subject.id}>{subject.id} - {subject.name}
                    </option>
                ))}
            </Select>
            <Label htmlFor="post_title">Título do post</Label>
            <InputTitle
                id="post_title"
                name="post_title"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.post_title}
            />
            <Label htmlFor="post_text">Conteúdo do post</Label>
            <InputContent
                id="post_text"
                name="post_text"
                onChange={formik.handleChange}
                value={formik.values.post_text}
            />
            <ButtonsContainer>
            <ReturnLink href={"/"}>VOLTAR</ReturnLink>
            <SubmitButton type="submit">CRIAR POST</SubmitButton>
            </ButtonsContainer>
        </Form>
    </FormContainer>
    
    
    
    </>)
}

export default AddPostPage;