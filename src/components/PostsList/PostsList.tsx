import React, { useEffect, useState } from 'react';
import { getAllPosts, Posts } from '@/apiCalls/getPosts';
import styled from 'styled-components';
import Link from 'next/link';
import { formatDate } from '@/stringTreatment/dateFormat';
import { PacmanLoader } from 'react-spinners';


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
    width: 80%;
    
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

const PostsList: React.FC = () => {
    const [posts, setPosts] = useState<Posts[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const postsData = await getAllPosts();
                setPosts(postsData);
            } catch (err) {
                setError('Failed to load posts' + err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return (<>
    <LoadingText>Loading posts...</LoadingText>
    <PacmanLoader color={'#235789'} loading={loading} size={50} />
    </>
    );
    if (error) return <p>{error}</p>;

    return (
        <PostListContainer>
            {posts.map((post) => (
                <li key={post.id_post}>
                    <Link href={`/posts/${post.id_post}`} passHref>
                        <PostContainer>
                            <PostTitle>{post.post_title}</PostTitle>
                            <PostDetails>
                                <p>Publicado por: {post.teacher_name}</p>
                                <p>Matéria: {post.subject_name}</p>
                                <p>Publicado em: {formatDate(post.post_date)}</p>
                            </PostDetails>
                        </PostContainer>
                    </Link>
                </li>
            ))}
        </PostListContainer>
    );
};

export default PostsList;
