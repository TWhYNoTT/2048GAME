var tkn = localStorage.getItem("token");
const host = "127.0.0.1:5001/social-ba173/us-central1/app"
if (tkn) {
    let xhr0 = new XMLHttpRequest();
    xhr0.open("POST", "http://" + host + "/api/getuserdata");
    xhr0.setRequestHeader('Content-type', 'application/json')

    xhr0.onreadystatechange = () => {
        if (xhr0.readyState == 4) {
            if (xhr0.status == 200) {
                window.location.replace("/");
            }
        }
    }
    xhr0.send(JSON.stringify({
        token: tkn
    }));

}
else {
    let htmlContent = `<form id="myForm" action="" onsubmit="handlesubmit(event)">
    <h2>Login</h2>
    <label for="email">Email</label><input type="email" name="email" id="email" required>
    <label for="pass">Password</label><input type="password" name="password" id="pass" required>

    <input type="submit" value="Login">

    <a href="/register">Create New Account</a>
</form>`
    document.body.innerHTML = htmlContent;
}

var xhr = new XMLHttpRequest();



xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            localStorage.setItem("token", event.target.response);
            window.location.replace("/");
        }
    }
}



function handlesubmit(e) {
    e.preventDefault();
    xhr.open("POST", "http://" + host + "/api/login");
    xhr.setRequestHeader('Content-type', 'application/json');
    var email0 = document.getElementById("email").value;
    var password0 = document.getElementById("pass").value;
    xhr.send(JSON.stringify({
        email: email0,
        password: password0
    }));
}