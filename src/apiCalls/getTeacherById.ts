import { getTeacherByPersonId } from "./getTeacherByPersonId"

export async function getTeacherById(){


    const teacherId = await getTeacherByPersonId();

    const response = await fetch (`https://school-bqfd.onrender.com/adm/teacher/${teacherId}`)


    if (response.ok){
        return true
    }
    else{
        return false
    }
}