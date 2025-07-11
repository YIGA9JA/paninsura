// Enable infinite horizontal scroll simulation
document.querySelectorAll('.scroll-container').forEach(container => {
  container.addEventListener('wheel', (evt) => {
    evt.preventDefault();
    container.scrollBy({
      left: evt.deltaY < 0 ? -100 : 100,
      behavior: 'smooth'
    });
  });
});
