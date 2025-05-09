import { getUser } from "./services/user.js";
import { getRepositories } from "./services/repositories.js";
import { getEvents } from "./services/events.js";

import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validateEmptyInput(userName)) return
    getUserData(userName);
});

document.getElementById('input-search').addEventListener('keyup', e => {
    const userName = e.target.value
    const key = e.key || e.code
    const isEnterKeyPressed = key === 'Enter';

    if (isEnterKeyPressed) {

        if(validateEmptyInput(userName)) return
        getUserData(userName)
    }
});

function validateEmptyInput(userName) {
    if(userName.length === 0) {
        alert("Preencha o campo com o nome do usuário do GitHub")
        return true
    }
}

async function getUserData(userName) {

    const userResponse = await getUser(userName)
    const repositoriesResponse = await getRepositories(userName)
    const eventResponse = await getEvents(userName)

    if(userResponse.message === "Not Found") {
        return screen.renderNotFound()
    }
    
    user.setInfo(userResponse)
    user.setEvents(eventResponse)
    user.setRepositories(repositoriesResponse)

    screen.renderUser(user)
};