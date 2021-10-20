import Swal from "sweetalert2";

console.debug({ Swal });

const MSG_QUESTION = "question";
const MSG_INFO = "info";
const MSG_SUCCESS = "success";
const MSG_WARNING = "warning";
const MSG_ERROR = "error";

function fireToast(msgHtml, icon) {
  Swal.fire({
    title: msgHtml,
    // html: msgHtml,
    timer: 2000,
    // timerProgressBar: true,
    toast: true,
    showConfirmButton: false,
    position: "top-end",
    icon: icon,
  });
}

export default {
  MSG_QUESTION,
  MSG_INFO,
  MSG_SUCCESS,
  MSG_WARNING,
  MSG_ERROR,
  fireToast,
};
