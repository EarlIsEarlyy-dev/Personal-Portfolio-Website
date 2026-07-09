emailjs.init({
  publicKey: "7fDz_WoSFMUVkz6MH",
});

const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = form.querySelector("button[type='submit']");
  const originalText = submitBtn.textContent;

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  formMsg.textContent = "";
  formMsg.className = "form-msg";

  emailjs.sendForm(
    "service_a0r34j4",
    "template_np24aoc",
    form
  )
  .then(() => {
    formMsg.textContent = "Message sent! I'll get back to you soon.";
    formMsg.className = "form-msg success";
    form.reset();
  })
  .catch((error) => {
    console.error("EmailJS error:", error);
    formMsg.textContent = "Something went wrong. Please try again or email me directly.";
    formMsg.className = "form-msg error";
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  });
});