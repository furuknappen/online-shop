/**          Info:
* This function expects two inputs: the toastmessage and type of message. 
Type can be "error", "warning" or "success", as a string.
*/
export function toastNotification(message, type) {
  const notificationMessage = document.createElement("toast-parent");
  notificationMessage.classList.add("toastNotification");
  notificationMessage.classList.add("toast-" + type);

  const info = document.createElement("p");
  info.innerHTML = message;
  const icon = document.createElement("div");

  switch (type) {
    case "error":
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>`;
      break
    case "warning":
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-exclamation-mark"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 19v.01" /><path d="M12 15v-10" /></svg>`;
      break

    case "success":
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>`;
      break
  }

  notificationMessage.append(icon, info);
  displayToastNotification(notificationMessage);
}

function displayToastNotification(info) {
  document.querySelector(".toast-parent").append(info);
    setTimeout(() => {
    removeToastNotification();
  }, 2000);
}

function removeToastNotification() {
  document.querySelector(".toastNotification").remove();
}
