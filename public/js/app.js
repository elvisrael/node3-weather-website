const weatherForm = document.querySelector('form')
const searchElmnt = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()
        messageTwo.textContent = ''
        messageOne.textContent = 'Loading....'
        fetch('/weather?address=' + searchElmnt.value).then((response) => {
            response.json().then((data) =>{
            if(data.error){
                messageOne.textContent = data.error;
            }else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
            
        })
        
    })
})