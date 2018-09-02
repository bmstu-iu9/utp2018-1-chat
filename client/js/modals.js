document.addEventListener('DOMContentLoaded', function () {

    /* === Окон создания новой беседы === */
    (function () {
        let dlgcm = document.getElementById('dlg-conv-modal');

        let dlgcopen = document.getElementById("dlg-conv-open");

        let dlgccancel = document.getElementById("dlg-conv-btn-cancel");

        dlgcopen.onclick = function () {
            dlgcm.style.display = "grid";
        }

        dlgccancel.onclick = function () {
            document.getElementById("dlg-conv-title").value = '';
            document.getElementById("dlg-conv-description").value = '';
            document.getElementById("dlg-conv-members").value = '';
            dlgcm.style.display = "none";
            dlgcm.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == dlgcm) {
                dlgcm.style.display = "none";
            }
        }

        document.getElementById("dlg-conv-btn-create").onclick = function () {
            Chat.getThisUserByToken().then(data => {
                const dlgctitle = document.getElementById("dlg-conv-title").value;
                const dlgcdescription = document.getElementById("dlg-conv-description").value;
                const dlgcmembers = document.getElementById("dlg-conv-members").value + ` ${data.login}`;

                if (!dlgctitle || !dlgcdescription || !dlgcmembers) {
                    alert('Необходимо заполнить все поля!');
                    return;
                }

                Chat.createDialog('conversation', dlgctitle, dlgcdescription, 'default.jpg', dlgcmembers);
            }).then(data => {
                document.getElementById("dlg-conv-title").value = '';
                document.getElementById("dlg-conv-description").value = '';
                document.getElementById("dlg-conv-members").value = '';
                dlgcm.style.display = "none";
            });
        }
    })();

    /* === Окон настроек === */
    (function () {
        let setm = document.getElementById('settings-modal');

        let setopen = document.querySelector('.header-settings__link');

        setopen.onclick = function () {
            setm.style.display = "grid";
        }

        window.onclick = function (event) {
            if (event.target == setm) {
                setm.style.display = "none";
            }
        }
    })();
});
