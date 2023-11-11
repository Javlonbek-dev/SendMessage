const form =document.querySelector("form"),
statusTxt=form.querySelector(".button-area span");

form.onsubmit=(e)=>{
    e.preventDefault();
    statusTxt.style.display="block";
    statusTxt.style.color= "#0d6efd";

    let xhr=new XMLHttpRequest();
    xhr.open("POST","message.php",true);
    xhr.onload=()=>{
        if(xhr.readyState==4 && xhr.status==200){
            let response= xhr.response;
            if(response.indexOf("Sorry, failed to send your message")!=-1 || response.indexOf("Enter a valid email address")!=-1 || response.indexOf("Email and message required")!=-1){
                statusTxt.style.color="red";
            }
            else{
                form.reset();
                setTimeout(()=>{
                    statusTxt.style.display="none";
                },3000)
            }
            statusTxt.innerText=response;
        }
    }
    let formData= new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('message', document.getElementById('message').value);
    formData.append('website', document.getElementById('website').value);
    xhr.send(formData);
}