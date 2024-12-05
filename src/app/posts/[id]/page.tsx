'use client'

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPostById } from '@/apiCalls/getPostById';
import styled from 'styled-components';
import Link from 'next/link';
import { PacmanLoader } from 'react-spinners';
import { formatDate } from '@/stringTreatment/dateFormat';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f7ae91;
  border-radius: 8px;
  width: 80%;
  margin: 0 auto;
`;

const PostTitle = styled.h1`
  font-size: 48px;
  color: #333;
`;

const PostContent = styled.p`
  font-size: 18px;
  color: #242222;
`;

const PostDetails = styled.div`
  margin-top: 20px;
  color: #777;
  font-size: 14px;
`;
const GeneralContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  justify-content: center;`;


const LoadingText = styled.h1`
    font-size: 25px;
    font-weight: bold;
    color: #235789;
    align-self: center;`;

 const ReturnLink = styled(Link)`
    color: #235789;
    font-size: 20px;
    font-weight: bold;
    border: 2px solid #235789;
    height: 50px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        background-color: #235789;
        color: #fff;
        transition: 0.7s ease;
    }`;

interface Post {
  post_title: string;
  post_text: string;
  teacher_name: string;
  subject_name: string;
  post_date: string;
}

const PostPage: React.FC = () => {
  const { id } = useParams(); 
  const [post, setPost] = useState<Post | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          setLoading(true);
          const postData = await getPostById(id as string); 
          setPost(postData);
        } catch (err) {
          setError('Failed to load the post: ' + err);
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [id]);

  if (loading) return (<>
    <LoadingText>Loading post...</LoadingText>
    <PacmanLoader color={'#235789'} loading={loading} size={50} />
    </>
    );
  if (error) return <p>{error}</p>;

  if (!post) return <p>Post not found</p>;

  const formattedPostText = post.post_text.split('\n').map((line, index) =>(
    <span key={index}>
      {line}
      <br />
    </span>
  ))

  return (
    <GeneralContainer>
        <ReturnLink href={"/"}>Voltar</ReturnLink>
    <PostContainer>
      <PostTitle>{post.post_title}</PostTitle>
      <PostContent>{formattedPostText}</PostContent>
      <PostDetails>
        <p>Publicado por: {post.teacher_name}</p>
        <small>Data de publicação: {formatDate(post.post_date)}</small>
      </PostDetails>
    </PostContainer>
    </GeneralContainer>
  );
};

export default PostPage;
