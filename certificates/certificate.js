const volName = document.getElementById("volName");
const eventName = document.getElementById("eventName");
const eventDate = document.getElementById("eventDate");
const hours = document.getElementById("hours");
const ngoName = document.getElementById("ngoName");

const certName = document.getElementById("certName");
const certEvent = document.getElementById("certEvent");
const certDate = document.getElementById("certDate");
const certHours = document.getElementById("certHours");
const certNgo = document.getElementById("certNgo");
const certId = document.getElementById("certId");

const generateBtn = document.getElementById("generateBtn");
const resetBtn = document.getElementById("resetBtn");
const downloadBtn = document.getElementById("downloadBtn");

function makeCertificateId() {
  // Example: SEVA-483920
  const num = Math.floor(100000 + Math.random() * 900000);
  return `SEVA-${num}`;
}

function formatDate(dateValue) {
  if (!dateValue) return "--/--/----";
  const d = new Date(dateValue);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

generateBtn.addEventListener("click", () => {
  certName.innerText = volName.value.trim() || "Your Name";
  certEvent.innerText = eventName.value.trim() || "Event Name";
  certDate.innerText = formatDate(eventDate.value);
  certHours.innerText = hours.value.trim() || "0";
  certNgo.innerText = ngoName.value.trim() || "NGO Name";
  certId.innerText = makeCertificateId();

  // Save in LocalStorage (optional but adds professionalism)
  const data = {
    name: volName.value,
    event: eventName.value,
    date: eventDate.value,
    hours: hours.value,
    ngo: ngoName.value,
    id: certId.innerText
  };

  localStorage.setItem("sevasphere_certificate", JSON.stringify(data));
});

resetBtn.addEventListener("click", () => {
  volName.value = "";
  eventName.value = "";
  eventDate.value = "";
  hours.value = "";
  ngoName.value = "";

  certName.innerText = "Your Name";
  certEvent.innerText = "Event Name";
  certDate.innerText = "--/--/----";
  certHours.innerText = "0";
  certNgo.innerText = "NGO Name";
  certId.innerText = "SEVA-XXXXXX";

  localStorage.removeItem("sevasphere_certificate");
});

downloadBtn.addEventListener("click", async () => {
  const cert = document.getElementById("certificate");

  // Generate image from certificate div
  const canvas = await html2canvas(cert, { scale: 2 });

  const link = document.createElement("a");
  link.download = "SevaSphere_Certificate.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

// Auto-load last saved certificate (nice feature)
window.addEventListener("load", () => {
  const saved = localStorage.getItem("sevasphere_certificate");
  if (!saved) return;

  const data = JSON.parse(saved);

  volName.value = data.name || "";
  eventName.value = data.event || "";
  eventDate.value = data.date || "";
  hours.value = data.hours || "";
  ngoName.value = data.ngo || "";

  certName.innerText = data.name || "Your Name";
  certEvent.innerText = data.event || "Event Name";
  certDate.innerText = formatDate(data.date);
  certHours.innerText = data.hours || "0";
  certNgo.innerText = data.ngo || "NGO Name";
  certId.innerText = data.id || "SEVA-XXXXXX";
});
