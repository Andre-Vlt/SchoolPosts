

export interface Posts{
    id_post: number;
    id_teacher: string;
    id_subject: number;
    post_text: string;
    post_title: string;
    post_date: string;
    teacher_name: string;
    subject_name: string;
}

export async function getAllPosts(): Promise<Posts[]>{

    const response = await fetch('https://school-bqfd.onrender.com/teacher/posts?limit=1000');

    const data = await response.json();

    if (Array.isArray(data)) {
        return data.map(post => ({
            id_post: post.id_post,
            id_teacher: post.id_teacher,
            id_subject: post.id_subject,
            post_text: post.post_text,
            post_title: post.post_title,
            post_date: post.post_date,
            teacher_name: post.teacher_name,
            subject_name: post.subject_name
        }));
    } else {
        throw new Error('Unexpected API response: not an array');
    }
}