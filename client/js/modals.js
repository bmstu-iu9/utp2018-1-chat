document.addEventListener('DOMContentLoaded', function () {

    /* === Окон создания новой беседы === */
    (function () {
        let dlgcm = document.getElementById('dlg-conv-modal');

        let dlgcopen = document.getElementById("dlg-conv-open");

        let dlgccancel = document.getElementById("dlg-conv-btn-cancel");

        dlgcopen.onclick = function () {
            dlgcm.style.display = "block";
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
            const dlgcmembers = document.getElementById("dlg-conv-members").value;

            Chat.createDialog('conversation', dlgctitle, dlgcdescription, '', dlgcmembers);
        }
    })();
});
