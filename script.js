window.onload = function () {
    const loginBtn = document.getElementById('loginBtn');
    const signUpBtn = document.getElementById('signUpBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const goToSignUp = document.getElementById('goToSignUp');
    const goToLogin = document.getElementById('goToLogin');
    const menuLogin = document.getElementById('menuLogin');
    const menuSignUp = document.getElementById('menuSignUp');
    const menuClearDB = document.getElementById('menuClearDB');



    if (localStorage.user) {
        showView('online');
    } else {
        showView('offline');
    }

    function showView(view) {
        //Om inloggat
        if (view == "online") {
            document.getElementById('offline').style.display = "none";
            document.getElementById('signUpForm').style.display = "none";
            document.getElementById('online').style.display = "flex";
            document.getElementById('title').innerText = "Welcome " + localStorage.user;
            document.getElementById('userImg').style.backgroundImage = "url(images/" + localStorage.userImg + ")";
            document.getElementById('menuLogin').style.display = "none";
            document.getElementById('menuSignUp').style.display = "none";
        } else {
            if (view == "signup") {
                document.getElementById('loginForm').style.display = "none";
                document.getElementById('signUpForm').style.display = "flex";
                document.getElementById('title').innerText = "Skapa ett konto"
                document.getElementById('menuSignUp').style.display = "none";
                document.getElementById('menuLogin').style.display = "block";
            } else {
                document.getElementById('online').style.display = "none";
                document.getElementById('signUpForm').style.display = "none";
                document.getElementById('loginForm').style.display = "flex";
                document.getElementById('offline').style.display = "flex";
                document.getElementById('menuSignUp').style.display = "block";
                document.getElementById('menuLogin').style.display = "none";
                reset();
            }
        }
    }


    function reset() {
        document.getElementById('title').innerText = "Medlemszon";
        document.getElementById('errorText').innerText = "";
        document.getElementById('errorTextS').innerText = "";
        document.getElementById('loginForm').reset();
        document.getElementById('signUpForm').reset();
    }


    function setUsers() {
        if (!localStorage.users) {
            const users = new Array();
            user1 = new Object();
            user2 = new Object();
            user3 = new Object();

            user1 = {
                user: 'fredrik',
                pass: '12345',
                userImg: 'unknown.png'
            }

            user2 = {
                user: 'ronaldo',
                pass: '54321',
                userImg: 'ronaldo.png'
            }

            user3 = {
                user: 'victor',
                pass: 'hej123',
                userImg: 'victor.png'
            }

            users.push(user1);
            users.push(user2);
            users.push(user3);

            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    function loginUser(user, pass) {
        const eT = document.getElementById('errorText');
        let checkLogin = false
        let userImg = 'unknown.png';

        //DB
        const users = JSON.parse(localStorage.users)

        for (let x of users) {
            if (user === x['user'] && pass === x['pass']) {
                checkLogin = true
                userImg = x['userImg']
                break;
            }
        }
        if (checkLogin === true) {
            //Lyckad inloggning
            localStorage.setItem("user", user);
            localStorage.setItem("userImg", userImg);


            eT.innerText = "Success " + localStorage.user;


            reset();
            showView('online');
            


        } else {

            eT.innerText = "Felaktikgt användarnamn eller lösenord!";
        }

    }






    function signUp(user, pass) {
        const eT = document.getElementById('errorTextS');


        const users = JSON.parse(localStorage.users)

        if (user && pass) {

            newUser = new Object();

            newUser = {
                user: user,
                pass: pass,
                userImg: 'unknown.png',
            }

            users.push(newUser);

            localStorage.setItem('users', JSON.stringify(users));

            localStorage.setItem("user", user);
            localStorage.setItem("userImg", newUser.userImg);

            reset();
            showView('online');


        } else {
            //Felaktig inloggning
            eT.innerText = "Du måste fylla i både Användarnamn och Lösenord";
        }

    }



    loginBtn.addEventListener('click', function () {
        const l_username = document.getElementById('l_username').value;
        const l_password = document.getElementById('l_password').value;

        loginUser(l_username, l_password);
    });

    signUpBtn.addEventListener('click', function () {
        const s_username = document.getElementById('s_username').value;
        const s_password = document.getElementById('s_password').value;

        signUp(s_username, s_password);
    });

    goToSignUp.addEventListener('click', function () {
        showView('signup');
    });

    goToLogin.addEventListener('click', function () {
        showView('login');
    });

    menuSignUp.addEventListener('click', function () {
        showView('signup');
    });

    menuLogin.addEventListener('click', function () {
        showView('login');
    });

    menuClearDB.addEventListener('click', function () {
        localStorage.clear();
        alert("Databasen har rensats");
        location.reload()

    });

    //Logga ut
    logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('user');
        localStorage.removeItem("userImg");
        showView('offline');
    });

    setUsers();
}