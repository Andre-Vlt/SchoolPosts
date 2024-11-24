export async function getPostById(id: string) {
    const response = await fetch(`https://school-bqfd.onrender.com/student/posts/${id}`)
    if (!response.ok) {
        throw new Error('Failed to load post')
    }
    return response.json()
}