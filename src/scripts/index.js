import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import swRegister from './utils/sw-register';
import routes from './routes/routes'; // Added .js extension to routes import
import UrlParser from './routes/url-parser';

const renderPage = async () => {
  const url = UrlParser.parseActiveUrlWithCombiner();
  const page = routes[url];
  document.querySelector('.restaurant-list').innerHTML = await page.render();
  await page.afterRender();
};

window.addEventListener('hashchange', renderPage);
window.addEventListener('load', renderPage);

swRegister(); // Register service worker

document.addEventListener('DOMContentLoaded', () => {
  const buttonSkipToContent = document.querySelector('.skip-link');
  const mainElement = document.querySelector('#mainContent');

  if (buttonSkipToContent && mainElement) {
    buttonSkipToContent.addEventListener('click', (event) => {
      event.preventDefault();
      mainElement.scrollIntoView({ behavior: 'smooth' });
      mainElement.setAttribute('tabindex', '-1');
      mainElement.focus(); // Agar fokus ke konten
      mainElement.removeAttribute('tabindex'); // Hapus tabindex setelah fokus        });
      buttonSkipToContent.addEventListener('keypress', () => {
        if (event.key === 'Enter') {
          event.preventDefault();
          mainElement.scrollIntoView({ behavior: 'smooth' });
          mainElement.setAttribute('tabindex', '-1');
          mainElement.focus(); // Set focus to the main content
          mainElement.removeAttribute('tabindex');
        }
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const hamburgerButton = document.getElementById('hamburgerButton');
  const navItems = document.querySelector('.nav-items');

  hamburgerButton.addEventListener('click', () => {
    navItems.classList.toggle('open');
  });
});
