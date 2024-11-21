import { getPersonByUserId } from "./getPersonByUserId";

export async function getTeacherByPersonId() {
    const personId = await getPersonByUserId();

    const response = await fetch(`https://school-bqfd.onrender.com/adm/teacher/person/${personId}`);
    const data = await response.json();
    
    const teacherId = data.id_teacher;
    return teacherId;
}