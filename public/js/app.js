const login = document.getElementById('login')
const signup = document.getElementById('signup')
const search = document.getElementById('search')
const create = document.getElementById('create')
const modify = document.getElementById('modify')
const deletetoy = document.getElementById('delete')
const searchName = document.getElementById('searchName')
const createName = document.getElementById('createName')
const createDescription = document.getElementById('createDescription')
const modifyName = document.getElementById('modifyName')
const modifyDescription = document.getElementById('modifyDescription')
const deleteName = document.getElementById('deleteName')
const message1 = document.getElementById('message-1')
const message2 = document.getElementById('message-2')
var authToken = ""
login.addEventListener('submit',(e)=>{
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const data = {
        email:email,
        password:password
    }
    message1.textContent = 'loading'
    const l = 'http://127.0.0.1:3000/login'
    fetch('http://127.0.0.1:3000/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response)=>{
        if (!response.ok) {
            throw Error("wtf?");
        }
        message1.textContent = response
        return response.json();
    }).then((rec)=>{
        if(rec){
            message1.textContent = "logged in"
            authToken = rec.token
        }
    }).catch((error)=>{
    })
})
signup.addEventListener('submit',(e)=>{
    e.preventDefault()
    const name = document.getElementById('name').value
    const email = document.getElementById('e').value
    const password = document.getElementById('p').value
    const age = document.getElementById('age').value
    const data = {
        name,
        email,
        password,
        age
    }
    console.log(data)
    message1.textContent = 'loading'
    const l = 'http://127.0.0.1:3000/signup'
    fetch('http://127.0.0.1:3000/signup',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response)=>response.json()).then((data)=>{
        if(data!==undefined&&!data.error){
            authToken = data.token
            message1.textContent = "signed in"
        }
    }).catch((error)=>{
        message1.textContent = "error"
    })
})
search.addEventListener('submit',(e)=>{
    e.preventDefault()
    const name = searchName.value
    message1.textContent = 'loading'
    fetch('http://127.0.0.1:3000/toys?name=' + name,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+authToken
        }
    }).then((response)=>
        response.json()).then((data)=>{
            message1.textContent = JSON.stringify(data)
            message2.textContent = " "
        }).catch((error)=>{ message1.textContent = error })
})
create.addEventListener('submit',(e)=>{
    e.preventDefault()
    const name = createName.value
    const description = createDescription.value
    const data = {
        name: name,
        description: description
    }
    message1.textContent = 'loading'
    const l = 'http://127.0.0.1:3000/toys'
    fetch('http://127.0.0.1:3000/toys',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+authToken
        },
        body: JSON.stringify(data)
    }).then((response)=>
    response.json()).then((data)=>{
        message1.textContent = JSON.stringify(data)
        message2.textContent = " "
    }).catch((error)=>{ message1.textContent = error })
})
modify.addEventListener('submit',(e)=>{
    e.preventDefault()
    const name = modifyName.value
    const description = modifyDescription.value
    const data = {
        description: description
    }
    message1.textContent = 'loading'
    const l = 'http://127.0.0.1:3000/toys'
    fetch('http://127.0.0.1:3000/toys',{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+authToken
        },
        body:JSON.stringify(data)
    }).then((response)=>
    response.json()).then((data)=>{
        message1.textContent = JSON.stringify(data)
        message2.textContent = " "
    }).catch((error)=>{ message1.textContent = error })
})
deletetoy.addEventListener('submit',(e)=>{
    e.preventDefault()
    const name = deleteName.value
    message1.textContent = 'loading'
    const l = 'http://127.0.0.1:3000/toys?name=' + name
    fetch(l,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+authToken
        }
    }).then((response)=>
    response.json()).then((data)=>{
        message1.textContent = "Deleted "+JSON.stringify(data)
    }).catch((error)=>{ message1.textContent = error })
})


