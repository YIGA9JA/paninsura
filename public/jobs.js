// jobs.js
document.addEventListener('DOMContentLoaded', () => {
  const jobsContainer = document.getElementById('jobsContainer');

  const jobs = [
    { id: 'job1', title: 'Claims Adjuster', location: 'Berlin, Germany', summary: 'Handle and evaluate insurance claims efficiently.' },
    { id: 'job2', title: 'Customer Support Specialist', location: 'Remote', summary: 'Provide support to policyholders across Europe.' },
    { id: 'job3', title: 'Risk Analyst', location: 'Madrid, Spain', summary: 'Analyze and manage insurance risk portfolios.' },
    { id: 'job4', title: 'Insurance Sales Consultant', location: 'Paris, France', summary: 'Drive sales of innovative insurance plans.' },
    { id: 'job5', title: 'Data Analyst', location: 'Remote', summary: 'Analyze insurance data and optimize processes.' },
    { id: 'job6', title: 'Marketing Specialist', location: 'London, UK', summary: 'Promote insurance products across channels.' }
  ];

  jobsContainer.innerHTML = '';
  jobs.forEach(job => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Location:</strong> ${job.location}</p>
      <p>${job.summary}</p>
      <button class="btn apply-btn" data-id="${job.id}">Apply</button>
    `;
    jobsContainer.appendChild(card);
  });

  document.querySelectorAll('.apply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const jobId = btn.getAttribute('data-id');
      localStorage.setItem('selectedJobId', jobId);
      window.location.href = 'application.html';
    });
  });
});
