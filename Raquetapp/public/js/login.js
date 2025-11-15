let btnTester = document.getElementById("btnTester");
let inputMail = document.getElementById("mail");
let inputPassword = document.getElementById("password");
let form = document.getElementById("form");

btnTester.addEventListener("click", () => {
    inputMail.value = "tester@tester.com";
    inputPassword.value = "tester";
    form.submit();
});
