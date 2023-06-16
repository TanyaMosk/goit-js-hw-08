import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_TIME_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');

const player = new Player(iframe, {
  id: 'vimeo-player', 
});

player.on('timeupdate', throttle(getCurrentTime, 1000));

// Отримуємо поточний час в секундах та зберігаємо в локальному сховищі
function getCurrentTime(currentTime) {
  const timeInSeconds = currentTime.seconds;
  localStorage.setItem(STORAGE_TIME_KEY, JSON.stringify(timeInSeconds));
}

player.setCurrentTime(JSON.parse(localStorage.getItem(STORAGE_TIME_KEY)) ?? 0);

// // Отримуємо поточний час відтворення та виводимо у консоль
// player.on('pause', function () {
//   player
//     .getCurrentTime()
//     .then(function (time) {
//       console.log('Відео на паузі. Час відтворення:', time, 'сек');
//     })
//     .catch(function (error) {
//       console.log('Помилка отримання часу відтворення:', error);
//     });
// });
