/**
 * Info: this function takes inn 4 parameters, heading, message, button text, and the function for the actionbutton
 */
export function createModal(heading, message, buttonText, actionBtnFunction, functionParameter) {
  // document.querySelector(".modal-parent") = ""
  console.log("enters modal");
  const dialog = document.createElement("dialog");
  dialog.classList.add("modal", "border");
  dialog.id = "login-modal";

  const header = document.createElement("h3")
  header.textContent = heading;

  const text = document.createElement("p");
  text.textContent = message;
  // "You need to be logged in to use the cart function";

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons-div");
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("btn-small");
  closeBtn.id = "close-modal-btn";
  closeBtn.textContent = "Close"

  const actionBtn = document.createElement("button");
  actionBtn.classList.add("btn");
  actionBtn.textContent = buttonText;
  
  actionBtn.addEventListener("click", (e) => {
    e.preventDefault()
   actionBtnFunction(functionParameter)
      dialog.close();
  })

  buttonsDiv.append(closeBtn, actionBtn);

  dialog.append(header, text, buttonsDiv);
  document.querySelector(".modal-parent").append(dialog);

console.log("before show modal")
    dialog.showModal();

  closeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
  });
}