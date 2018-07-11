'use strict'

// Выполнение по загрузки HTML и построении DOM
document.addEventListener('DOMContentLoaded', function() {

}, false);

// Переключение между диалогами
function switchDialog(evt, dlg) {
    let tabContent = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContent.length; i++)
        tabContent[i].style.display = 'none';


    let tabLinks = document.getElementsByClassName('tab-links');
    for (let i = 0; i < tabLinks.length; i++)
        tabLinks[i].className = tabLinks[i].className.replace(' focus', '');

    document.getElementById(dlg).style.display = 'block';
    evt.currentTarget.className += ' focus';
    
    document.forms['messageField'].elements['message'].value = '';

    console.log('Переключено на ', evt.currentTarget);
}


//Отрисовка сообщений
function sendMessage() {

    //Поиск выбранного диалога
    let tabContent = document.getElementsByClassName('tab-content');
    let num = 0;
    for (let i = 0; i < tabContent.length; i++) {
        if (tabContent[i].style.display === 'block') {
            num = i+1;
            break;
        }
    }
    //Если пользователь не переключал диалоги, то нужно выбрать тот, который загружается по умолчанию
    if (num === 0)
        num = 2;

    //Составление HTML кода для вставки
    const MSG = document.forms['messageField'].elements['message'].value;
    const newLi = document.createElement('li');
    newLi.className = 'grid sent';
    newLi.innerHTML = '<div class="chat-msg grid">'
        + MSG
        + '</div><div class="user grid"><img src="img/user.png"></div>';

    //Вставка HTML кода
    let test = document
        .getElementById(num.toString())
        .getElementsByClassName('chat-messages')
        .item(0)
        .appendChild(newLi);

    console.log('Добавлено сообщение ', test);
}

