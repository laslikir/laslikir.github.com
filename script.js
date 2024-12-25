document.querySelectorAll('.left-tabs li').forEach(tab => {
    tab.addEventListener('click', function () {
        // Remove active class from all tabs
        document.querySelector('.left-tabs li.active').classList.remove('active');
        
        // Add active class to the clicked tab
        this.classList.add('active');
        
        // Update the main content based on the clicked tab
        const mainContent = document.querySelector('.main-content');
        const tabName = this.innerText;

        // Define content for each tab
        const tabContent = {
            "Home": `<h2>Welcome to Flipper Zero Hub</h2>
                     <p>Explore content, projects, and resources related to Flipper Zero. Use the tabs on the left to navigate!</p>`,
            "Projects": `<h2>Projects</h2>
                         <p>Here you'll find a collection of Flipper Zero projects, tools, and hacks.</p>`,
            "Resources": `<h2>Resources</h2>
                          <p>Browse guides, tutorials, and references for maximizing your Flipper Zero's potential.</p>`,
            "Contact": `<h2>Contact</h2>
                        <p>Have questions or suggestions? Reach out to us!</p>`
        };

        // Set the content for the selected tab, defaulting to "Coming Soon" if not defined
        mainContent.innerHTML = tabContent[tabName] || `<h2>${tabName}</h2><p>Content coming soon...</p>`;
    });
});
