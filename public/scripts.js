document.addEventListener('DOMContentLoaded', () => {
  const storiesData = [
    {
      title: "10 Tips for Stress-Free Travel",
      excerpt: "Learn how to prepare, pack, and enjoy your trips without the hassle...",
      url: "https://yourblog.com/10-tips-for-stress-free-travel"
    },
    {
      title: "Healthy Eating on a Budget",
      excerpt: "Discover nutritious meal ideas that won’t break the bank...",
      url: "https://yourblog.com/healthy-eating-on-a-budget"
    },
    {
      title: "How to Save Money on Home Insurance",
      excerpt: "Simple steps to get the best rates and protect your home...",
      url: "https://yourblog.com/save-money-home-insurance"
    },
    {
      title: "Emergency Preparedness Checklist",
      excerpt: "Be ready for any situation with this easy-to-follow guide...",
      url: "https://yourblog.com/emergency-preparedness-checklist"
    },
    {
      title: "Work-Life Balance Strategies",
      excerpt: "Tips to help you manage time and reduce burnout...",
      url: "https://yourblog.com/work-life-balance-strategies"
    },
    {
      title: "Benefits of Regular Exercise",
      excerpt: "How staying active improves your health and wellbeing...",
      url: "https://yourblog.com/benefits-of-regular-exercise"
    },
    {
      title: "Protecting Your Digital Privacy",
      excerpt: "Simple ways to keep your online information safe and secure...",
      url: "https://yourblog.com/protecting-digital-privacy"
    }
  ];

  const container = document.getElementById('storiesContainer');

  // Helper: create card element
  function createCard(story) {
    const a = document.createElement('a');
    a.className = 'story-card';
    a.href = story.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = `
      <div class="story-title">${story.title}</div>
      <div class="story-excerpt">${story.excerpt}</div>
      <div class="read-more">Read More →</div>
    `;
    return a;
  }

  // Populate initial cards
  storiesData.forEach(story => {
    container.appendChild(createCard(story));
  });

  // Infinite scroll simulation: clone cards as you scroll near end
  container.addEventListener('scroll', () => {
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
      // Clone all cards and append
      storiesData.forEach(story => {
        container.appendChild(createCard(story));
      });
    }
  });
});
function setupHorizontalScroll(containerId, dataArray, createCardFn) {
  const container = document.getElementById(containerId);

  if (!container) return;

  // Insert initial cards
  dataArray.forEach(item => {
    container.appendChild(createCardFn(item));
  });

  // Infinite scroll simulation by cloning cards when near the end
  container.addEventListener('scroll', () => {
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
      dataArray.forEach(item => {
        container.appendChild(createCardFn(item));
      });
    }
  });
}


const form = document.getElementById('applicationForm');
const dropZone = document.getElementById('dropZone');
const resumeInput = document.getElementById('resume');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const toast = document.getElementById('toast');

// Drag and Drop Handling
dropZone.addEventListener('click', () => resumeInput.click());
dropZone.addEventListener('dragover', e => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  resumeInput.files = e.dataTransfer.files;
  dropZone.textContent = resumeInput.files[0].name;
});
resumeInput.addEventListener('change', () => {
  dropZone.textContent = resumeInput.files[0].name;
});

// Show Toast
function showToast(message, color = '#333') {
  toast.textContent = message;
  toast.style.background = color;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Form Submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const address = form.address.value.trim();
  const countryCode = form.countryCode.value;
  const mobileNumber = form.mobileNumber.value.trim();
  const email = form.email.value.trim();
  const file = resumeInput.files[0];

  if (!file) {
    showToast('Please attach your resume', 'crimson');
    return;
  }

  try {
    progressContainer.style.display = 'block';

    const storageRef = storage.ref(`resumes/${Date.now()}_${file.name}`);
    const uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progressBar.style.width = `${progress}%`;
    }, err => {
      console.error(err);
      showToast('Upload failed!', 'crimson');
    }, async () => {
      const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

      await db.collection('applications').add({
        firstName,
        lastName,
        address,
        countryCode,
        mobileNumber,
        email,
        resumeURL: downloadURL,
        submittedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      showToast('Application submitted successfully!', 'green');
      form.reset();
      dropZone.textContent = 'Drag & Drop Resume Here or Click to Upload';
      progressBar.style.width = '0%';
      progressContainer.style.display = 'none';
    });
  } catch (error) {
    console.error(error);
    showToast('An error occurred while submitting', 'crimson');
  }
});
document.addEventListener("DOMContentLoaded", function() {
    if (!localStorage.getItem('paninsura_cookie_preferences')) {
        document.getElementById('cookieConsentModal').style.display = 'block';
    } else {
        initializeFirebaseBasedOnConsent();
    }
});

function acceptAllCookies() {
    const preferences = {
        performance: true,
        functional: true,
        marketing: true
    };
    localStorage.setItem('paninsura_cookie_preferences', JSON.stringify(preferences));
    document.getElementById('cookieConsentModal').style.display = 'none';
    initializeFirebaseBasedOnConsent();
}

function openCookieSettings() {
    document.getElementById('cookieConsentModal').style.display = 'none';
    document.getElementById('cookieSettingsModal').style.display = 'block';
}

function saveCookiePreferences() {
    const preferences = {
        performance: document.getElementById('performanceCookies').checked,
        functional: document.getElementById('functionalCookies').checked,
        marketing: document.getElementById('marketingCookies').checked
    };
    localStorage.setItem('paninsura_cookie_preferences', JSON.stringify(preferences));
    document.getElementById('cookieSettingsModal').style.display = 'none';
    initializeFirebaseBasedOnConsent();
}

function initializeFirebaseBasedOnConsent() {
    const preferences = JSON.parse(localStorage.getItem('paninsura_cookie_preferences'));
    if (!preferences) return;

    // Initialize Firebase only if performance consent is given
    if (preferences.performance) {
        import('https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js').then(() => {
            import('https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js').then(() => {
                const firebaseConfig = {
                    apiKey: "YOUR_API_KEY",
                    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
                    projectId: "YOUR_PROJECT_ID",
                    storageBucket: "YOUR_PROJECT_ID.appspot.com",
                    messagingSenderId: "YOUR_SENDER_ID",
                    appId: "YOUR_APP_ID",
                    measurementId: "YOUR_MEASUREMENT_ID"
                };
                const app = firebase.initializeApp(firebaseConfig);
                if (preferences.performance) {
                    firebase.analytics();
                }
            });
        });
    }
}
