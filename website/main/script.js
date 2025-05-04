document.addEventListener('DOMContentLoaded', function () {
    const sessionButtons = document.querySelectorAll('.sessions-btn');

    const sessionsData = {
        'Ждун': {
            places: ['ул. Бобруйская, 6', 'просп. Победителей, 9', 'ул. Петра Мстиславца, 11'],
            times: ['12:00', '15:00', '18:00']
        },
        'Иллюзия обмана': {
            places: ['ул. Бобруйская, 6', 'просп. Победителей, 9', 'ул. Петра Мстиславца, 11'],
            times: ['14:00', '16:30', '19:50']
        }
    };

    sessionButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const filmInfo = button.closest('.film-info');
            const sessionsContainer = filmInfo.querySelector('.sessions-container');

            const filmTitle = filmInfo.querySelector('.film-title').textContent;

            const { places, times } = sessionsData[filmTitle] || {
                places: ['Зал 1', 'З ROUNDTRIP', 'Зал 3'],
                times: ['12:00', '15:00', '18:00']
            };

            sessionsContainer.innerHTML = '';

            if (button.classList.contains('active')) {
                sessionsContainer.style.display = 'none';
                button.classList.remove('active');
            } else {
                let sessionsHTML = '<h3 class="sessions-title">Доступные сеансы:</h3>';
                places.forEach(place => {
                    sessionsHTML += `<h4 class="session-place">${place}</h4><ul class="session-times">`;
                    times.forEach(time => {
                        sessionsHTML += `<li>${time}</li>`;
                    });
                    sessionsHTML += '</ul>';
                });

                sessionsContainer.innerHTML = sessionsHTML;
                sessionsContainer.style.display = 'block';
                button.classList.add('active');

                document.querySelectorAll('.sessions-container').forEach(container => {
                    if (container !== sessionsContainer) {
                        container.style.display = 'none';
                    }
                });
                document.querySelectorAll('.sessions-btn').forEach(btn => {
                    if (btn !== button) {
                        btn.classList.remove('active');
                    }
                });
            }
        });
    });
});