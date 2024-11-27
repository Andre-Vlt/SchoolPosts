export const searchPostsByKeyWord = async (keyWord: string) => {
    const response = await fetch(`https://school-bqfd.onrender.com/student/search?keyWord=${encodeURIComponent(keyWord)}`)
    if (!response.ok){
        throw new Error('Erro ao buscar posts')
    }
    return response.json()
}