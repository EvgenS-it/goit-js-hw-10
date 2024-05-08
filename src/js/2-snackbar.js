import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector(".form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const delay = formEl.elements.delay.value;
    const state = formEl.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay);
    });

    promise
        .then((value) => {
            iziToast.success({
                message: value,
                position: "topRight",
                class: "success",
                color: "green"
            });
        })
        .catch((error) => {
            iziToast.error({
                message: error,
                position: "topRight",
                class: "error",
                color: "red"
            });
        });

    formEl.reset();
});