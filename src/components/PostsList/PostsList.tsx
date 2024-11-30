import React, { useEffect, useState } from 'react';
import { getAllPosts, Posts } from '@/apiCalls/getPosts';
import styled from 'styled-components';
import Link from 'next/link';
import { formatDate } from '@/stringTreatment/dateFormat';
import { PacmanLoader } from 'react-spinners';
import { searchPostsByKeyWord } from '@/apiCalls/searchPostsByKeyWord';
import { TbMoodEmptyFilled } from "react-icons/tb";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { deletePost } from '@/apiCalls/deletePost';

const PostListContainer = styled.ul`
  max-height: 80vh;  
  overflow-y: auto; 
  padding: 0;
  list-style: none;
  width: 100%;
`;

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 20px;
    background-color: #235789;
    color: #fff;
    margin-bottom: 20px;
    border: 5px solid #4ca2f3;
    border-radius: 10px;
    min-width: 100%;

    
    &:hover {
        border: 5px solid #235789;
        cursor: pointer;
        transition: 0.7s ease;
    }`;

const PostDetails = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;`;

const PostTitle = styled.h1`
    font-size: 25px;
    font-weight: bold;
    `;
    
export const LoadingText = styled.h1`
    font-size: 25px;
    font-weight: bold;
    color: #235789;
    align-self: center;`;

const GeneralContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;`;

const EditDeleteContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `;

const Linking = styled(Link)`
width: 80%;`


const EditIcon = styled(MdModeEdit)`
    color: #235789;
    margin-bottom: 15px;
    cursor: pointer;

    &:hover{
        color: #1a4567;
    }
    `;

const DeleteIcon = styled(MdDelete)`
    color: #a50505;
    cursor: pointer;
    
    &:hover{
        color: #7a0404;
        }`;

interface PostListProps {
    keyWord: string;
}

const PostsList: React.FC<PostListProps> = ({ keyWord }) => {
    const [posts, setPosts] = useState<Posts[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editVisible, setEditVisible] = useState<boolean>(false);



    useEffect(() => {
        if(localStorage.getItem('isTeacher') === 'true'){
            setEditVisible(true)
        }},[])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);

                const postsData = keyWord
                ? await searchPostsByKeyWord(keyWord)
                : await getAllPosts();
                setPosts(postsData);
            } catch (err) {
                setError('Failed to load posts' + err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [keyWord]);

    const handleDelete = async(id:number) => {
        if(confirm('Confirma a exclusão do post?')){
            try{
                const response = await deletePost(id)
                console.log("Delete response", response)
                setPosts((prevPosts) => prevPosts.filter((post) => post.id_post !== id));
            }catch(err){
                console.log(err)
                setError('Erro ao excluir post')
        }
    }
};

    if (loading) return (<>
    <LoadingText>Loading posts...</LoadingText>
    <PacmanLoader color={'#235789'} loading={loading} size={50} />
    </>
    );
    if (error) return <p>{error}</p>;

    if(posts.length === 0) return (<>
    <TbMoodEmptyFilled size={50} color={'#235789'} />
    <LoadingText>No posts found</LoadingText>
    </>)

    return (
        <PostListContainer>
            {posts.map((post) => (
                <li key={post.id_post}>
                    <GeneralContainer>
                    <Linking href={`/posts/${post.id_post}`} passHref>
                        <PostContainer>
                            <PostTitle>{post.post_title}</PostTitle>
                            <PostDetails>
                                <p>Publicado por: {post.teacher_name}</p>
                                <p>Matéria: {post.subject_name}</p>
                                <p>Publicado em: {formatDate(post.post_date)}</p>
                            </PostDetails>
                        </PostContainer>
                    </Linking>
                        <EditDeleteContainer>
                        {editVisible && (<Link href={`/edit/${post.id_post}`} passHref>
                          <EditIcon size={28} 
                          //Configurar para ir a pag de edição -> onClick={}
                          />
                        </Link>
                        )}
                        {editVisible && 
                        <DeleteIcon size={28} onClick={() => handleDelete(post.id_post)}/>
                        //Configurar para aparecer um modal de confirmação de exclusão -> onClick={}
                        }
                        

                        </EditDeleteContainer>
                    </GeneralContainer>
                </li>
            ))}
        </PostListContainer>
    );
};

export default PostsList;
