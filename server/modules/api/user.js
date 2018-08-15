'use strict'

const qs = require('querystring');
const cookie = require('cookies');

const receiver = async (methods, request, response) => {
    console.log(methods);

    if (request.method === 'GET') {
        if (!methods[1])
            console.log('err');

        let userInfo = getUserInfo(methods[1]);

        const db = await Database.get();

        db.users.findOne(login)
            .exec()
            .then(async (doc) => {
                if (doc == null) {
                    response.writeHead(204, {
                        'Content-Type': 'text/html'
                    });

                    response.end('User doesn\'t exist')

                } else {

                    let userr = {
                        login: doc.get('login'),
                        date: doc.get('date')
                    };

                    response.writeHead(200, {
                        'Content-Type': 'application/json'
                    });

                    response.end(JSON.stringify(userr))
                }
            });

        // TODO : task #24.1

    } else if (request.method === 'POST') {
        let data = '';
        request.on('data', (chunk) => {
            data += chunk.toString();
        });

        request.on('end', () => {
            if (methods[1] === 'signin')
                require('auth/login').signin(response, qs.parse(data));
            else if (methods[1] === 'signup')
                require('auth/registration').signup(response, qs.parse(data));
        });

    } else if (request.method === 'PUT') {
        // Не очень поняла, как доставать из куки инфу :(

        const db = await Database.get();

        let person = db.users.findOne(methods[1]);

        let data = '';
        request.on('data', (chunk) => {
            data += chunk.toString();
        });

        request.on('end', () => {
            data = qs.parse(data);
            data.on('login', (anotherText1) =>{
                person.login.type = anotherText1;
            });

            data.on('password', (anotherText2) =>{
                person.password = anotherText2;
            });

            data.on('birthday', (anotherText3) =>{
                person.birthday = anotherText3;
            });

        });

    } else if (request.method === 'DELETE') {

        const db = await Database.get();
        let login = db.users.findOne(methods[1]).login.type;
        db.users.findOne(login)
            .exec()
            .then(async (doc) => {
                if (!doc) {
                    response.writeHead(204, {
                        'Content-Type': 'text/html'
                    });

                    response.end('User doesn\'t exist')
                } else {
                    await doc.remove();

                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });

                    response.end(`DELETE user ${login}`);
                }
            });

        await db.destroy();
    } else {
        // error
        source.send404(response);
    }


}

const getUserInfo = (login) => {
    // TODO : task #24.1
};

module.exports.receiver = receiver;
