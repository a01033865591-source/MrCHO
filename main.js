const body = document.getElementById('body');
const themeToggle = document.getElementById('theme-toggle');
const pressMeButton = document.getElementById('press-me');

pressMeButton.addEventListener('click', () => {
  console.log('hello');
});

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDarkMode = body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
});

// Check for saved theme preference
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true') {
  body.classList.add('dark-mode');
}
