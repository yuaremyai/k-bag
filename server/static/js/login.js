import axios from 'axios'

console.log(axios)

function get_forms(event){
    event.preventDefault()
    email = document.getElementById('email').value
    password = document.getElementById('pass').value
    event.submitter.classList.contains('log-btn') ? login(): register()
    data = {'email': email, 'password': password}
}


function register(){
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/login/register")
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(data))
    xhttp.onload = function(){
        resp = JSON.parse(this.response)
        if (this.status === 400){
            document.querySelector('.status-block').textContent = resp.message
            document.querySelector('.status-block').style.color = 'red'
            return
        }
        login()
    }
}


function login(){
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/login/auth")
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(data))
    xhttp.onload = function(){
        resp = JSON.parse(this.response)
        localStorage.setItem('token', resp.token)
    }
}