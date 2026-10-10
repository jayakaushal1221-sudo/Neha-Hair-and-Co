const phoneNumber = "+917756999895";
const whatsappNumber = "917756999895";

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();

const bookingDialog = document.getElementById("bookingDialog");
const serviceSelect = document.getElementById("serviceSelect");
const dateInput = document.getElementById("appointmentDate");
const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
dateInput.min = localDate;

function openBooking(service = "") {
  if (service) serviceSelect.value = service;
  if (typeof bookingDialog.showModal === "function") bookingDialog.showModal();
  else alert("Please use a modern browser to request an appointment.");
  document.body.classList.add("no-scroll");
}
function closeBooking() {
  bookingDialog.close();
  document.body.classList.remove("no-scroll");
}
document.querySelectorAll("[data-book]").forEach(button => button.addEventListener("click", () => openBooking()));
document.querySelectorAll("[data-service]").forEach(button => button.addEventListener("click", () => openBooking(button.dataset.service)));
document.getElementById("closeDialog").addEventListener("click", closeBooking);
bookingDialog.addEventListener("close", () => document.body.classList.remove("no-scroll"));
bookingDialog.addEventListener("click", event => {
  if (event.target === bookingDialog) closeBooking();
});

document.getElementById("bookingForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = String(form.get("name")).trim();
  const phone = String(form.get("phone")).trim();
  const service = String(form.get("service"));
  const date = String(form.get("date"));
  const time = String(form.get("time"));
  const notes = String(form.get("notes") || "").trim();
  if (!name || !phone || !service || !date || !time) {
    event.currentTarget.reportValidity();
    return;
  }
  const message = [
    "Hello Neha Hair & Co. Salon! I'd like to request an appointment.",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Service: ${service}`,
    `Preferred date: ${date}`,
    `Preferred time: ${time}`,
    notes ? `Notes: ${notes}` : "",
    "",
    "Please confirm availability and the price. Thank you!"
  ].filter(Boolean).join("\n");
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
  closeBooking();
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal, .service-card, .review-card").forEach(element => {
  element.classList.add("reveal");
  revealObserver.observe(element);
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
document.querySelectorAll("[data-lightbox]").forEach(button => {
  button.addEventListener("click", () => {
    lightboxImage.src = button.dataset.lightbox;
    lightbox.showModal();
    document.body.classList.add("no-scroll");
  });
});
function closeLightbox() {
  lightbox.close();
  lightboxImage.removeAttribute("src");
  document.body.classList.remove("no-scroll");
}
document.getElementById("closeLightbox").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
lightbox.addEventListener("close", () => document.body.classList.remove("no-scroll"));

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});
