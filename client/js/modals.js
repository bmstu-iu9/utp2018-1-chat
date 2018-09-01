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
            dlgcm.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == dlgcm) {
                dlgcm.style.display = "none";
            }
        }

        document.getElementById("dlg-conv-btn-create").onclick = function () {
            const dlgctitle = document.getElementById("dlg-conv-title").value;
            const dlgcdescription = document.getElementById("dlg-conv-description").value;
            const dlgcmembers = document.getElementById("dlg-conv-members").value + ` ${Chat.getThisUserByToken()}`;

            Chat.createDialog('conversation', dlgctitle, dlgcdescription, 'default.jpg', dlgcmembers);
        }
    })();

    /* === Окон настроек === */
    (function () {
        let setm = document.getElementById('settings-modal');

        let setopen = document.querySelector('.header-settings__link');

        let setcancel = document.getElementById('settings-btn-cancel');

        setopen.onclick = function () {
            setm.style.display = "grid";
        }

        setcancel.onclick = function () {
            setm.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == setm) {
                setm.style.display = "none";
            }
        }
    })();
});
