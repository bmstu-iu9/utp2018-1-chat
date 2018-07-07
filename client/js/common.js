// Выполнение по загрузки HTML и построении DOM
document.addEventListener('DOMContentLoaded', function() {

}, false);

// Переключение между диалогами
function switchDialog(evt, dlg) {
    var tabContent = document.getElementsByClassName('tab-content');
    for (i = 0; i < tabContent.length; i++)
        tabContent[i].style.display = 'none';


    tabLinks = document.getElementsByClassName('tab-links');
    for (i = 0; i < tabLinks.length; i++)
        tabLinks[i].className = tabLinks[i].className.replace(' focus', '');

    document.getElementById(dlg).style.display = 'block';
    evt.currentTarget.className += ' focus';

    console.log('Переключено на ', evt.currentTarget);
}
