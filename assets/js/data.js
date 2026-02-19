// assets/js/data.js

// --- Sample Events (default) ---
let events = JSON.parse(localStorage.getItem("events")) || [
  {
    id: 1,
    title: "Tree Plantation Drive",
    category: "Tree Plantation",
    location: "Panjim, Goa",
    date: "2026-02-25",
    time: "08:00 AM",
    ngo: "Green Goa NGO",
    description: "Join us for a tree plantation drive to make Goa greener.",
    volunteersApplied: []
  },
  {
    id: 2,
    title: "Beach Cleanup",
    category: "Cleanliness",
    location: "Miramar Beach, Goa",
    date: "2026-02-26",
    time: "07:00 AM",
    ngo: "Swachh Goa Foundation",
    description: "Help us clean Miramar beach and spread awareness.",
    volunteersApplied: []
  }
];

localStorage.setItem("events", JSON.stringify(events));


// --- Applications ---
let applications = JSON.parse(localStorage.getItem("applications")) || [];
localStorage.setItem("applications", JSON.stringify(applications));
