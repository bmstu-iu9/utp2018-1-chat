'use strict'

const tit = document.title;
let snd = new Audio('../media/notify.wav');

let changeTitle = function() {
    this.title = function () {
        let title = document.title;
        document.title = (title === 'New message' ? tit : 'New message');
    }
};

changeTitle.prototype.start = function() {
    this.timer = setInterval(this.title, 1000);
};

changeTitle.prototype.stop = function() {
    clearInterval(this.timer)
};

let timerTitle = new changeTitle();

function onBlur() {
    timerTitle.start();
    snd.play();
}

function onFocus() {
    timerTitle.stop();
    document.title = tit;
}
