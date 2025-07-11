// application.js
document.addEventListener('DOMContentLoaded', () => {
  const jobDetails = document.getElementById('jobDetails');
  const otherJobsContainer = document.getElementById('otherJobsContainer');

  const jobs = [
    { id: 'job1', title: 'Claims Adjuster', location: 'Berlin, Germany', summary: 'Handle and evaluate insurance claims efficiently.' },
    { id: 'job2', title: 'Customer Support Specialist', location: 'Remote', summary: 'Provide support to policyholders across Europe.' },
    { id: 'job3', title: 'Risk Analyst', location: 'Madrid, Spain', summary: 'Analyze and manage insurance risk portfolios.' },
    { id: 'job4', title: 'Insurance Sales Consultant', location: 'Paris, France', summary: 'Drive sales of innovative insurance plans.' },
    { id: 'job5', title: 'Data Analyst', location: 'Remote', summary: 'Analyze insurance data and optimize processes.' },
    { id: 'job6', title: 'Marketing Specialist', location: 'London, UK', summary: 'Promote insurance products across channels.' }
  ];

  const selectedJobId = localStorage.getItem('selectedJobId');
  const selectedJob = jobs.find(job => job.id === selectedJobId) || jobs[0];

  jobDetails.innerHTML = `
    <div class="card">
      <h2>${selectedJob.title}</h2>
      <p><strong>Location:</strong> ${selectedJob.location}</p>
      <p>${selectedJob.summary}</p>
      <h3>Application Form</h3>
      <form id="applicationForm">
        <input type="text" placeholder="Full Name" required /><br/>
        <input type="email" placeholder="Email Address" required /><br/>
        <textarea placeholder="Cover Letter" required></textarea><br/>
        <button type="submit" class="btn">Submit Application</button>
      </form>
    </div>
  `;

  document.getElementById('applicationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Application submitted successfully!');
    e.target.reset();
  });

  otherJobsContainer.innerHTML = '';
  jobs.filter(job => job.id !== selectedJobId).forEach(job => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.minWidth = '200px';
    card.innerHTML = `
      <h3>${job.title}</h3>
      <p>${job.location}</p>
      <button class="btn apply-btn" data-id="${job.id}">Apply</button>
    `;
    otherJobsContainer.appendChild(card);
  });

  otherJobsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('apply-btn')) {
      const jobId = e.target.getAttribute('data-id');
      localStorage.setItem('selectedJobId', jobId);
      location.reload();
    }
  });
});
