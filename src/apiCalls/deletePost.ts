export async function deletePost(id: number): Promise<void>{
    await fetch (`https://school-bqfd.onrender.com/teacher/post/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )

    return
}