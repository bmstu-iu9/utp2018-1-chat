document.addEventListener('DOMContentLoaded', function () {
    /* === Событие нажатия на кнопку входа === */
    document.querySelector('#sign-in').onclick = () => {
        Auth.singin(
            document.querySelector('#in-login').value,
            document.querySelector('#in-password').value
        );
    };

    /* === Событие нажатия на кнопку регистрации === */
    document.querySelector('#sign-up').onclick = () => {
        Auth.singup(
            document.querySelector('#up-login').value,
            document.querySelector('#up-password').value,
            document.querySelector('#up-confirm').value
        );
    };
});

/* === Перключение формы авторизации === */
function flip () {
    const content = document.querySelector('.content');
    const flip__content = document.querySelector('.flip__content');

    if (cssClasses.has(flip__content, 'flip-on')) {
        cssClasses.remove(flip__content, 'flip-on');
        cssClasses.remove(flip__content, 'content_up');
    } else {
        cssClasses.add(flip__content, 'flip-on');
        cssClasses.add(flip__content, 'content_up');
    }
}

let Auth = (function () {
    let auth = {};

    const _checkInput = (login, password, confirm) => {
        const reg = /[0-9a-zA-Z-_.]{4,}/;

        if (!login || !password) return 1;
        if (!reg.test(login) || !reg.test(password)) return 2;
        if (confirm !== undefined && password !== confirm) return 3;

        return 0;
    };

    auth.singin = function (login, password) {
        const validation = _checkInput(login, password);
        if (validation !== 0) {
            if (validation === 1) alert('Введите логин и пароль для нового аккаунта.');
            else if (validation === 2) alert('Логин и пароль должны состоять из маленьких или больших латинских букв, цифр, точки, дефиса или нижнего подчеркивания.');
            else if (validation === 3) alert('Подтверждение пароля не совпадает');
            return;
        }

        fetch(`/api/user/signin`, {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `in-login=${login}&in-password=${password}`
        })
        .then(response => {
            if (!response.ok)
                throw Error(response);

            response.json().then((status) => {
                //if (status === {"status":"SUCCESS"}) {
                    window.location.href = "http://localhost:8080";
                //} else {
                    //alert(JSON.stringify(status));
                //}
            });
        })
        .catch(error => {
            throw new Error(`Request failed: ${error}`);
        });


    };

    auth.singup = function (login, password, cpassword) {
        const validation = _checkInput(login, password, cpassword);
        if (validation !== 0) {
            if (validation === 1) alert('Введите логин и пароль для нового аккаунта.');
            else if (validation === 2) alert('Логин и пароль должны состоять из маленьких или больших латинских букв, цифр, точки, дефиса или нижнего подчеркивания (минимум 4 символа).');
            else if (validation === 3) alert('Подтверждение пароля не совпадает');
            return;
        }

        fetch(`/api/user/signup`, {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `up-login=${login}&up-password=${password}&up-confirm=${cpassword}`
        })
        .then(response => {
            if (!response.ok)
                throw Error(response);

            response.json().then((status) => {
                if (status.status === 'SUCCESS') {
                    window.location.href = "http://localhost:8080";
                } else {
                    alert(JSON.stringify(status));
                }
            });
        })
        .catch(error => {
            throw new Error(`Request failed: ${error}`);
        });
    };

    return auth;
})();
