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
    fetch(l,{
        method: 'POST',
        body: data
    }).then((response)=>response.json()).then((data)=>{}).catch((error)=>{
        message1.textContent = error
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
        body: JSON.stringify(data)
    }).then((response)=>response.json()).then((data)=>{}).catch((error)=>{
        message1.textContent = error
    })
})
search.addEventListener('submit',(e)=>{
    e.preventDefault()
    const name = searchName.value
    message1.textContent = 'loading'
    const l = 'http://127.0.0.1:3000/toys?name=' + name
    fetch(l).then((response)=>{
        response.json().then((data)=>{
            message1.textContent = data.name
            message2.textContent = data.description
        })
    })
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
    fetch(l,{
        method: 'POST',
        body: data
    }).then((response)=>{
        response.json().then((data)=>{
            message1.textContent = data.name
            message2.textContent = data.description
        })
    })
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
    fetch(l,{
        method: 'PATCH',
        body: data
    }).then((response)=>{
        response.json().then((data)=>{
            message1.textContent = data.name
            message2.textContent = data.description
        })
    })
})
deletetoy.addEventListener('submit',(e)=>{
    e.preventDefault()
    const name = deleteName.value
    message1.textContent = 'loading'
    const l = 'http://127.0.0.1:3000/toys?name=' + name
    fetch(l,{
        method: 'DELETE'
    }).then((response)=>{
        response.json().then((data)=>{
            message1.textContent = data.name
            message2.textContent = data.description
        })
    })
})

