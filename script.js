emailjs.init("RnGxGT8vHuHPqKOBn");

let bookingData = {};
let selectedRating = 0;
let currentImageIndex = 0;
const galleryImages = [
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&h=800&fit=crop",
];

window.addEventListener("DOMContentLoaded", function () {
  const today = new Date().toISOString().split("T")[0];
  const startDateInput = document.getElementById("startDate");
  if (startDateInput) {
    startDateInput.setAttribute("min", today);
  }
});

function showPage(pageId) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".nav-menu a")
    .forEach((a) => a.classList.remove("active"));

  const page = document.getElementById(pageId);
  if (page) page.classList.add("active");

  const navLink = document.querySelector('.nav-menu a[href="#' + pageId + '"]');
  if (navLink) navLink.classList.add("active");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function selectAndBook(dest) {
  const destSelect = document.getElementById("destination");
  if (destSelect) destSelect.value = dest;
  showPage("booking");
}

// Lightbox Functions
function openLightbox(imgSrc, index) {
  currentImageIndex = index !== undefined ? index : 0;
  document.getElementById("lightbox-img").src = imgSrc;
  document.getElementById("lightbox").classList.add("active");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
}

function changeImage(direction) {
  currentImageIndex += direction;
  if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;
  if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
  document.getElementById("lightbox-img").src =
    galleryImages[currentImageIndex];
}

// Star Rating
document.querySelectorAll(".star").forEach((star) => {
  star.addEventListener("click", function () {
    selectedRating = parseInt(this.getAttribute("data-rating"));
    document.getElementById("rating").value = selectedRating;

    document
      .querySelectorAll(".star")
      .forEach((s) => s.classList.remove("active"));
    for (let i = 0; i < selectedRating; i++) {
      document.querySelectorAll(".star")[i].classList.add("active");
    }
    document.getElementById("ratingText").textContent =
      "You rated us " + selectedRating + " stars!";
  });
});

// Booking Form
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const bookingRef =
      "FA" +
      Date.now().toString().slice(-6) +
      Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");

    bookingData = {
      bookingRef: bookingRef,
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      destination: document.getElementById("destination").value,
      startDate: document.getElementById("startDate").value,
      duration: document.getElementById("duration").value,
      numPeople: document.getElementById("numPeople").value,
      package: document.getElementById("package").value,
      requirements: document.getElementById("requirements").value || "None",
    };

    document.getElementById("bookingRef").textContent = bookingRef;

    const detailsHTML =
      '<div class="detail-row"><strong>Name:</strong><span>' +
      bookingData.name +
      "</span></div>" +
      '<div class="detail-row"><strong>Email:</strong><span>' +
      bookingData.email +
      "</span></div>" +
      '<div class="detail-row"><strong>Phone:</strong><span>' +
      bookingData.phone +
      "</span></div>" +
      '<div class="detail-row"><strong>Destination:</strong><span>' +
      bookingData.destination +
      "</span></div>" +
      '<div class="detail-row"><strong>Start Date:</strong><span>' +
      new Date(bookingData.startDate).toLocaleDateString("en-IN") +
      "</span></div>" +
      '<div class="detail-row"><strong>Duration:</strong><span>' +
      bookingData.duration +
      " days</span></div>" +
      '<div class="detail-row"><strong>People:</strong><span>' +
      bookingData.numPeople +
      "</span></div>" +
      '<div class="detail-row"><strong>Package:</strong><span>' +
      bookingData.package +
      "</span></div>" +
      '<div class="detail-row"><strong>Booking ID:</strong><span>' +
      bookingRef +
      "</span></div>";

    document.getElementById("bookingDetails").innerHTML = detailsHTML;
    showPage("confirmation");
  });
}

// Feedback Form
const feedbackForm = document.getElementById("feedbackForm");
if (feedbackForm) {
  feedbackForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!selectedRating) {
      alert("Please rate your experience!");
      return;
    }

    const name = document.getElementById("feedbackName").value;
    const message = document.getElementById("feedbackMsg").value;
    const stars = "⭐".repeat(selectedRating);

    const feedbackCard = document.createElement("div");
    feedbackCard.className = "feedback-card";
    feedbackCard.innerHTML =
      '<div class="feedback-header">' +
      '<span class="feedback-name">' +
      name +
      "</span>" +
      '<span class="stars">' +
      stars +
      "</span>" +
      "</div>" +
      "<p>" +
      message +
      "</p>";

    document.getElementById("feedbackCards").prepend(feedbackCard);

    alert("🎉 Thank you for your feedback!");
    this.reset();
    selectedRating = 0;
    document
      .querySelectorAll(".star")
      .forEach((s) => s.classList.remove("active"));
    document.getElementById("ratingText").textContent = "";
  });
}

// Contact Form
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert(
      "✅ Message sent successfully! We'll get back to you within 24 hours."
    );
    this.reset();
  });
}

function newBooking() {
  const form = document.getElementById("bookingForm");
  if (form) form.reset();
  showPage("booking");
}

function downloadPDF() {
  if (typeof window.jspdf === "undefined") {
    alert("PDF library is loading. Please try again.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(22);
  doc.text("FLY-AWAY BOOKING", 105, 20, { align: "center" });
  doc.setFontSize(12);
  let y = 40;
  Object.keys(bookingData).forEach((key) => {
    doc.text(key + ": " + bookingData[key], 20, y);
    y += 10;
  });
  doc.save("FlyAway_" + bookingData.bookingRef + ".pdf");
}

function downloadText() {
  const text =
    "FLY-AWAY BOOKING\n\n" +
    Object.keys(bookingData)
      .map((key) => key + ": " + bookingData[key])
      .join("\n");
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "FlyAway_" + bookingData.bookingRef + ".txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Close lightbox on escape/arrows
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") changeImage(-1);
  if (e.key === "ArrowRight") changeImage(1);
});
