'use client'

import { getPostById } from "@/apiCalls/getPostById";
import { getTeacherByPersonId } from "@/apiCalls/getTeacherByPersonId";
import { LoadingText } from "@/components/PostsList/PostsList";
import { useFormik } from "formik";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
import styled from "styled-components";

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

interface Post {
    post_title: string;
    post_text: string;
    teacher_name: string;
    subject_name: string;
    post_date: string;
  }

  const subjectMap: { [key: string]: string } = {
    '1': 'Português',
    '2': 'Matemática',
    '3': 'Ciências',
    '4': 'História',
    '5': 'Geografia',
    '6': 'Inglês',
    '7': 'Física',
    '8': 'Química',
    '9': 'Tecnologia',
  };

const EditPage: React.FC = () => {
    const [teacherId, setTeacherId] = useState('');
    const { id } = useParams(); 
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>
{
        const fetchTeacherId = async()=>{
            setLoading(true);
            try{
                const id = await getTeacherByPersonId();
                setTeacherId(id);
            }catch(err){
                console.log("Erro ao buscar Id do professor", err)
            }
            finally{
                setLoading(false);
            }
        };
        

        const fetchPost = async () => {
            setLoading(true);
             try{
                const postData = await getPostById(id as string)
                setPost(postData);
            }catch (err) {
            console.log("Erro ao buscar post", err)
            }
            finally{
                setLoading(false);
            }
    }
    fetchTeacherId();
    fetchPost();
},[id])

const formik = useFormik({
    initialValues: {
        id_teacher: '',
        id_subject:  '',
        post_text:  '',
        post_title:  '',
    },
    enableReinitialize: true,
    onSubmit: async (values) =>{
        try{
            //SIM, EXISTEM CHAMADAS DA API FORA DA PASTA APICALLS, MAS ISSO É PREGUIÇA DO PROGRAMADOR =D
           const response = await fetch(`https://school-bqfd.onrender.com/teacher/post/${id}`,{
                method: 'PUT',
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
                throw new Error('Erro ao atualizar post')
            }

            alert('Post atualizado com sucesso')

        }catch(err){
            console.log(err)}
    }
});


useEffect(()=>{
    if(post){
        const subjectId = Object.keys(subjectMap).find((key) => subjectMap[key] === post.subject_name);
        formik.setValues({
            id_teacher: teacherId,
            id_subject: subjectId || '',
            post_text: post.post_text,
            post_title: post.post_title,
        })
    }
},[post, teacherId])
if (loading || !post) {
    return (
        <>
        <LoadingText>Loading</LoadingText>
        <PacmanLoader color="#235789" size={50}/>
        </>
    )
}
    
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
            <Title>EDITAR POST</Title>
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
            <SubmitButton type="submit">ATUALIZAR POST</SubmitButton>
            </ButtonsContainer>
        </Form>
    </FormContainer>
    
    
    
    </>)
}
    export default EditPage;