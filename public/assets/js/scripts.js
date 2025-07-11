/* Modal functionality for post/product/service views */
const modal = document.getElementById('postModal');
const modalTitle = document.getElementById('postTitle');
const modalImage = document.getElementById('postImage');
const modalContent = document.getElementById('postContent');
const closeModalBtn = document.getElementById('closePostModal');

function trapFocus(modalElement) {
    const focusableSelectors = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusableElements = modalElement.querySelectorAll(focusableSelectors);
    if (focusableElements.length === 0) return;
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    modalElement.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    });
}

function loadModalContent(postId) {
    const data = {
        featured: {
            title: "Understanding Comprehensive Insurance",
            img: "https://source.unsplash.com/800x500/?insurance,featured",
            content: "Comprehensive insurance covers a wide range of incidents including theft, vandalism, and natural disasters..."
        },
        post1: {
            title: "Tips for Choosing Health Insurance",
            img: "https://source.unsplash.com/800x500/?insurance,1",
            content: "Selecting the right health insurance requires understanding your needs, comparing plans, and checking provider networks..."
        },
        post2: {
            title: "Car Insurance Essentials",
            img: "https://source.unsplash.com/800x500/?insurance,2",
            content: "Auto insurance is essential for every driver in Europe. Learn about the different coverages and why they matter..."
        },
        post3: {
            title: "Travel Insurance Guide",
            img: "https://source.unsplash.com/800x500/?insurance,3",
            content: "Travel with peace of mind by understanding how travel insurance protects you during trips..."
        },
        default: {
            title: "PanInsura",
            img: "https://source.unsplash.com/800x500/?insurance",
            content: "Detailed content will appear here."
        }
    };
    const post = data[postId] || data['default'];
    modalTitle.textContent = post.title;
    modalImage.src = post.img;
    modalContent.textContent = post.content;
}

const readMoreButtons = document.querySelectorAll('.read-more-btn, .learn-more-btn');

if (readMoreButtons.length && modal) {
    readMoreButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const postId = btn.getAttribute('data-post') || 'default';
            loadModalContent(postId);
            modal.style.display = 'block';
            trapFocus(modal);
            modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')?.focus();
        });
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});
