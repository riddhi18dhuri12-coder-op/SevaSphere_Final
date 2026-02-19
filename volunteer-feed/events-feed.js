const eventsList = document.getElementById("eventsList");
const emptyMsg = document.getElementById("emptyMsg");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const cityFilter = document.getElementById("cityFilter");
const clearBtn = document.getElementById("clearBtn");
const showSavedBtn = document.getElementById("showSavedBtn");

// Dummy events (frontend-only)
const events = [
  { id: 1, name: "Tree Plantation Drive - Panaji", category: "Tree Plantation", city: "Goa", date: "2026-03-01", ngo: "Green Earth Foundation" },
  { id: 2, name: "Beach Cleanup - Baga", category: "Beach Cleanup", city: "Goa", date: "2026-03-05", ngo: "Ocean Care NGO" },
  { id: 3, name: "Blood Donation Camp", category: "Blood Donation", city: "Mumbai", date: "2026-03-10", ngo: "Life Saver Trust" },
  { id: 4, name: "Teaching Kids - Weekend", category: "Teaching", city: "Pune", date: "2026-03-12", ngo: "Bright Future NGO" },
  { id: 5, name: "Food Distribution Drive", category: "Food Distribution", city: "Bangalore", date: "2026-03-15", ngo: "Helping Hands" },
  { id: 6, name: "Tree Plantation - City Park", category: "Tree Plantation", city: "Mumbai", date: "2026-03-20", ngo: "Green Earth Foundation" },
];

function getSavedEvents() {
  return JSON.parse(localStorage.getItem("sevasphere_saved_events")) || [];
}

function saveEvent(eventObj) {
  const saved = getSavedEvents();
  if (!saved.find(e => e.id === eventObj.id)) {
    saved.push(eventObj);
    localStorage.setItem("sevasphere_saved_events", JSON.stringify(saved));
  }
}

function removeSavedEvent(eventId) {
  let saved = getSavedEvents();
  saved = saved.filter(e => e.id !== eventId);
  localStorage.setItem("sevasphere_saved_events", JSON.stringify(saved));
}

function isSaved(eventId) {
  return getSavedEvents().some(e => e.id === eventId);
}

function renderEvents(list, mode = "all") {
  eventsList.innerHTML = "";

  if (list.length === 0) {
    emptyMsg.style.display = "block";
    return;
  } else {
    emptyMsg.style.display = "none";
  }

  list.forEach(ev => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${ev.name}</h3>

      <div class="tags">
        <span class="tag">${ev.category}</span>
        <span class="tag">${ev.city}</span>
      </div>

      <div class="meta"><b>NGO:</b> ${ev.ngo}</div>
      <div class="meta"><b>Date:</b> ${ev.date}</div>

      <div class="actions">
        <button class="apply">Apply</button>
        <button class="save">${isSaved(ev.id) ? "★ Saved" : "☆ Save"}</button>
      </div>
    `;

    // Apply button (frontend demo)
    card.querySelector(".apply").addEventListener("click", () => {
      alert(`✅ Applied for: ${ev.name}\n(Frontend demo only)`);
    });

    // Save button
    const saveBtn = card.querySelector(".save");
    saveBtn.addEventListener("click", () => {
      if (isSaved(ev.id)) {
        removeSavedEvent(ev.id);
        saveBtn.innerText = "☆ Save";
      } else {
        saveEvent(ev);
        saveBtn.innerText = "★ Saved";
      }
    });

    eventsList.appendChild(card);
  });
}

function applyFilters() {
  const searchText = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;
  const city = cityFilter.value;

  let filtered = [...events];

  if (searchText) {
    filtered = filtered.filter(e => e.name.toLowerCase().includes(searchText));
  }

  if (category !== "all") {
    filtered = filtered.filter(e => e.category === category);
  }

  if (city !== "all") {
    filtered = filtered.filter(e => e.city === city);
  }

  renderEvents(filtered);
}

// Events
searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
cityFilter.addEventListener("change", applyFilters);

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  categoryFilter.value = "all";
  cityFilter.value = "all";
  renderEvents(events);
});

showSavedBtn.addEventListener("click", () => {
  const saved = getSavedEvents();
  renderEvents(saved);

  if (saved.length > 0) {
    alert("⭐ Showing Saved Events (Wishlist)");
  } else {
    alert("No saved events yet.");
  }
});

// Initial render
renderEvents(events);
