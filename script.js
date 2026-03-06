const API_BASE_URL = "https://api-pearl-two-79.vercel.app";
const DEFAULT_ERROR = "Unable to fetch devils.";
const form = document.getElementById("generator-form");
const countInput = document.getElementById("count");
const statusText = document.getElementById("status");
const resultsList = document.getElementById("results");
const submitButton = form.querySelector("button");

function setStatus(message) {
  statusText.textContent = message;
}

function renderResults(devils) {
  resultsList.replaceChildren(
    ...devils.map((devil) => {
      const item = document.createElement("li");
      item.textContent = devil;
      return item;
    }),
  );
}

async function generateDevils(event) {
  event.preventDefault();
  const count = Number.parseInt(countInput.value, 10);
  if (!Number.isInteger(count) || count < 1) {
    setStatus("Enter a number greater than 0.");
    return;
  }
  submitButton.disabled = true;
  setStatus("Generating...");
  try {
    const response = await fetch(`${API_BASE_URL}/api/devils?n=${count}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || DEFAULT_ERROR);
    }
    renderResults(data.devils || []);
    setStatus(`Generated ${data.count} devil${data.count === 1 ? "" : "s"}.`);
  } catch (error) {
    renderResults([]);
    setStatus(error instanceof Error ? error.message : DEFAULT_ERROR);
  } finally {
    submitButton.disabled = false;
  }
}

form.addEventListener("submit", generateDevils);
generateDevils(new Event("submit"));
