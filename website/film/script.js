const modal = document.getElementById("movieModal");
const modalTitle = document.getElementById("movieTitle");
const modalSessions = document.getElementById("movieSessions");
const closeBtn = document.querySelector(".close");

async function loadMovies() {
  try {
    const response = await fetch("movies.xml");
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    const movieNodes = xmlDoc.getElementsByTagName("movie");
    const movieData = {};

    for (let movie of movieNodes) {
      const id = movie.getAttribute("id");
      const title = movie.getElementsByTagName("title")[0].textContent;
      const address = movie.getElementsByTagName("address")[0].textContent;
      const sessionNodes = movie.getElementsByTagName("session");
      const sessions = Array.from(sessionNodes).map(node => node.textContent);

      movieData[id] = { title, sessions, address };
    }

    return movieData;
  } catch (error) {
    console.error("Ошибка при загрузке XML:", error);
    return {};
  }
}

function openModal(movieData, movieClass) {
  const movie = movieData[movieClass];
  if (movie) {
    modalTitle.textContent = movie.title;
    modalSessions.innerHTML = `
      <p>Сеансы:</p>
      <ul>${movie.sessions.map(session => `<li>${session}</li>`).join("")}</ul>
      <p>Адрес кинотеатра: ${movie.address}</p>
    `;
    modal.style.display = "block";
  }
}

function closeModal() {
  modal.style.display = "none";
}

async function init() {
  const movieData = await loadMovies();

  document.querySelectorAll(".movie-frame").forEach(frame => {
    frame.addEventListener("click", () => {
      const movieClass = frame.classList[1]; 
      openModal(movieData, movieClass);
    });
  });

  closeBtn.addEventListener("click", closeModal);

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

init();