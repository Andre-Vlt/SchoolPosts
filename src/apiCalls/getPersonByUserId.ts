export async function getPersonByUserId() {
    const userId = localStorage.getItem('userId');
    const response = await fetch(`https://school-bqfd.onrender.com/adm/person/userid/${userId}`);
    const data = await response.json();
    const personId = data.id_person;
    return personId;
}