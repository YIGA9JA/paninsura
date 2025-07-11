const blogContainer = document.getElementById('blogContainer');

let postIndex = 0;
const postsPerLoad = 5;

const posts = [
  {
    title: "Health Insurance Tips for Families",
    excerpt: "Learn how to choose the best health insurance for your family...",
    tag: "Health",
    body: `
<h3>Why Health Insurance Matters</h3>
<p>Health insurance protects your family from unexpected medical costs and ensures timely healthcare access.</p>
<h4>Understanding Premiums and Deductibles</h4>
<p>Learn how to balance lower premiums with higher deductibles and vice versa based on your family's health needs.</p>
<h4>Choosing the Right Network</h4>
<p>Review the hospital and doctor networks associated with each plan to avoid surprises when you need care.</p>
<h4>Using Preventative Care</h4>
<p>Take advantage of included checkups, screenings, and immunizations to prevent bigger issues later.</p>
`
  },
  {
    title: "Why You Need Auto Insurance",
    excerpt: "Discover the importance of auto insurance and how it protects you...",
    tag: "Auto",
    body: `
<h3>Legal Requirements</h3>
<p>Auto insurance is legally required in most countries to protect all road users.</p>
<h4>Types of Coverage</h4>
<p>Understand the differences between liability, collision, and comprehensive coverage and when you need each.</p>
<h4>Financial Protection</h4>
<p>Insurance protects your finances if an accident occurs, covering repair costs and medical bills.</p>
<h4>Peace of Mind</h4>
<p>Drive confidently knowing you are protected from potential lawsuits or unexpected damages.</p>
`
  },
  {
    title: "Travel Insurance Essentials 2025",
    excerpt: "Protect your trips with comprehensive travel insurance...",
    tag: "Travel",
    body: `
<h3>What Travel Insurance Covers</h3>
<p>Coverage includes trip cancellations, medical emergencies, lost luggage, and more.</p>
<h4>Medical Emergencies Abroad</h4>
<p>Healthcare abroad can be costly. Travel insurance covers emergency medical expenses and evacuations.</p>
<h4>Trip Cancellation Protection</h4>
<p>Recover your prepaid expenses if you need to cancel your trip for covered reasons.</p>
<h4>Lost or Delayed Luggage</h4>
<p>Receive reimbursement for essentials if your luggage is lost or delayed during travel.</p>
`
  },
  {
    title: "Protecting Your Small Business",
    excerpt: "Insurance solutions every small business owner should consider...",
    tag: "Business",
    body: `
<h3>Why Business Insurance is Essential</h3>
<p>Protects your business against unexpected losses and legal liabilities.</p>
<h4>Property Insurance</h4>
<p>Covers physical assets including office equipment, inventory, and buildings.</p>
<h4>Liability Insurance</h4>
<p>Protects your business if you are found liable for injuries or damages.</p>
<h4>Business Interruption Insurance</h4>
<p>Compensates for lost income if your business operations are halted due to covered events.</p>
`
  },
  {
    title: "Understanding Life Insurance",
    excerpt: "Learn how life insurance can secure your family's financial future...",
    tag: "Life",
    body: `
<h3>What is Life Insurance?</h3>
<p>Life insurance provides financial support to your dependents in case of your passing.</p>
<h4>Types of Life Insurance</h4>
<p>Term, whole, and universal life insurance explained to help you choose what’s best for your family.</p>
<h4>Benefits of Starting Early</h4>
<p>Starting early means lower premiums and peace of mind for your family’s future.</p>
<h4>How Much Coverage Do You Need?</h4>
<p>Calculate based on your family's needs, debts, and long-term goals.</p>
`
  },
  {
    title: "Insurance Claim Filing Guide",
    excerpt: "Step-by-step guide to filing your insurance claims efficiently...",
    tag: "Guide",
    body: `
<h3>When to File a Claim</h3>
<p>File a claim promptly after an incident to avoid complications.</p>
<h4>Gather Necessary Documents</h4>
<p>Have your policy number, incident reports, photos, and receipts ready.</p>
<h4>Contact Your Insurer</h4>
<p>Notify your insurance company immediately to start the process.</p>
<h4>Follow Up</h4>
<p>Maintain records and follow up regularly to track your claim's progress.</p>
`
  },
  {
    title: "Car Insurance Myths Debunked",
    excerpt: "Think you know car insurance? Let’s bust some myths...",
    tag: "Auto",
    body: `
<h3>Myth: Red Cars Cost More to Insure</h3>
<p>Car color doesn't affect your insurance rates; factors like model, age, and driver history do.</p>
<h4>Myth: Minimum Coverage is Enough</h4>
<p>While legally compliant, minimum coverage may not fully protect you in major accidents.</p>
<h4>Myth: Older Cars Don't Need Insurance</h4>
<p>Older vehicles still need coverage for liability and potential repair costs.</p>
`
  },
  {
    title: "How to Lower Your Insurance Premiums",
    excerpt: "Reduce your insurance premiums while maintaining essential coverage...",
    tag: "Finance",
    body: `
<h3>Bundle Policies</h3>
<p>Combine auto, home, and life insurance with one provider for discounts.</p>
<h4>Improve Your Credit Score</h4>
<p>Many insurers consider credit scores in premium calculations.</p>
<h4>Increase Your Deductible</h4>
<p>Higher deductibles typically result in lower premium payments.</p>
<h4>Review Policies Regularly</h4>
<p>Adjust coverage to reflect current needs and avoid overpaying.</p>
`
  },
  {
    title: "Pet Insurance: Is It Worth It?",
    excerpt: "Explore the benefits of pet insurance for your furry companions...",
    tag: "Health",
    body: `
<h3>What Pet Insurance Covers</h3>
<p>Coverage may include accidents, illnesses, and preventative care.</p>
<h4>Cost of Veterinary Care</h4>
<p>Vet bills can be high; pet insurance helps manage these costs.</p>
<h4>Choosing a Policy</h4>
<p>Consider your pet's age, breed, and potential health risks.</p>
<h4>Peace of Mind</h4>
<p>Having pet insurance ensures your pet gets the care they need without financial strain.</p>
`
  },
  {
    title: "Fire Safety and Home Insurance",
    excerpt: "Keep your home safe with fire safety practices and proper insurance...",
    tag: "Home",
    body: `
<h3>Importance of Fire Safety</h3>
<p>Preventive measures reduce the risk of fire damage in your home.</p>
<h4>Home Fire Safety Tips</h4>
<p>Install smoke detectors, keep fire extinguishers, and plan evacuation routes.</p>
<h4>Insurance Coverage for Fire Damage</h4>
<p>Home insurance typically covers fire damage, but review your policy limits.</p>
<h4>Documenting Your Belongings</h4>
<p>Maintain an inventory for smoother claims processing after an incident.</p>
`
  }
];

// Load posts in batches
function loadPosts() {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < postsPerLoad; i++) {
    if (postIndex >= posts.length) return;
    const post = posts[postIndex];

    const card = document.createElement('div');
    card.className = 'blog-card';
    card.innerHTML = `
      <div class="blog-card-content">
        <h2>${post.title}</h2>
        <p>${post.excerpt}</p>
        <span class="tag">${post.tag}</span>
      </div>
    `;
    card.addEventListener('click', () => {
      openBlogModal(post.title, post.body);
    });

    fragment.appendChild(card);
    postIndex++;
  }
  blogContainer.appendChild(fragment);
}

// Infinite scroll
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadPosts();
  }
});

// Modal controls
function openBlogModal(title, body) {
  document.getElementById('blogModalTitle').innerText = title;
  document.getElementById('blogModalBody').innerHTML = body;
  document.getElementById('blogModal').style.display = 'flex';
}

function closeBlogModal(event) {
  if (event.target.id === 'blogModal' || event.target.className === 'close') {
    document.getElementById('blogModal').style.display = 'none';
  }
}

// Initial load
loadPosts();
