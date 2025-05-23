document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.wrapper');
  const btnPopup = document.querySelector('.btnLogin-popup');
  const iconClose = document.querySelector('.icon-close');
  const loginLink = document.querySelector('.login-link');
  const registerLink = document.querySelector('.register-link');

  // Debug log
  console.log('Elements loaded:', {
    wrapper,
    btnPopup,
    iconClose,
    loginLink,
    registerLink
  });

  // Auto-show login popup if it already has the active-popup class
  if (wrapper?.classList.contains('active-popup')) {
    wrapper.style.display = 'block';
    console.log('Auto-opening login popup due to errorMessage');
  }

  if (!btnPopup || !wrapper) {
    console.error('Essential elements not found');
    return;
  }

  try {
    btnPopup.addEventListener('click', (e) => {
      e.preventDefault();
      wrapper.classList.add('active-popup');
      wrapper.style.display = 'block';
    });

    if (iconClose) {
      iconClose.addEventListener('click', () => {
        wrapper.classList.remove('active-popup');
      });
    }

    if (loginLink && registerLink) {
      registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        wrapper.classList.add('active');
      });

      loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        wrapper.classList.remove('active');
      });
    }
  } catch (error) {
    console.error('Event listener error:', error);
  }

  // Smooth scroll to top
  document.querySelectorAll('a[href="#top"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
});