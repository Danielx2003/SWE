const authButtons = document.getElementById("auth-buttons"); 
const auth = document.getElementById("auth")

const leftAuthButton = document.getElementById("left-auth")
const rightAuthButton = document.getElementById("right-auth")

const registerHTML = `
    <form class="" action="POST">
        <div class="mb-3">
            <label for="uname">Username</label>
            <input class="form-control" type="text" id="uname" value="" placeholder="Enter username here...">
        </div>

        <div class="mb-3">
            <label for="uname">Email</label>
            <input class="form-control" type="text" id="uname" value="" placeholder="Email address here...">
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" type="password" id="password" value="" placeholder="Enter password here...">
            <input class="form-control" type="password" id="password" value="" placeholder="Re-enter your password here...">
        </div>
        <button class="btn btn-login" type="submit">LOGIN</button>
    </form>
    `

const loginHTML = `
    <form class="" action="POST">
        <div class="form-group">
            <label for="uname">Username</label>
            <input class="form-control" type="text" id="uname" value="" placeholder="Enter username or email here...">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" type="password" id="password" value="" placeholder="Enter password here...">
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="remember" value="" placeholder="Enter password here...">
            <label class="form-check-label pl-2 mb-3" for="remember">Remember me?</label>
        </div>
        <button class="btn btn-login" type="submit">LOGIN</button>
        <small class="float-end mt-2"><a class="text-muted mt-3" href="">Forgotten your password?</a></small>
    </form>
    `

leftAuthButton.addEventListener("click", event => {
    if (authButtons.dataset.currentlySelected == "2") {
        authButtons.dataset.currentlySelected = "1"

        auth.innerHTML = loginHTML;
    } 
})

rightAuthButton.addEventListener("click", event => {
    if (authButtons.dataset.currentlySelected == "1") {
        authButtons.dataset.currentlySelected = "2"

        auth.innerHTML = registerHTML;
    } 
})