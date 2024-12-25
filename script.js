// Tab Functionality
const tabs = document.querySelectorAll('.left-tabs li');
const mainContent = document.querySelector('.main-content');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // Remove 'active' class from all tabs
        tabs.forEach((t) => t.classList.remove('active'));

        // Add 'active' class to the clicked tab
        tab.classList.add('active');

        // Update main content based on the clicked tab
        switch (index) {
            case 0:
                mainContent.innerHTML = `
                    <h2>Welcome to Flipper Zero Hub</h2>
                    <p>Explore content, projects, and resources related to Flipper Zero. Use the tabs on the left to navigate!</p>
                `;
                break;
            case 1:
                mainContent.innerHTML = `
                    <h2>Projects</h2>
                    <p>Discover amazing projects created using Flipper Zero. From hacking tools to creative mods, there's plenty to explore.</p>
                `;
                break;
            case 2:
                mainContent.innerHTML = `
                    <h2>Resources</h2>
                    <p>Access tutorials, guides, and documentation to help you get the most out of your Flipper Zero.</p>
                `;
                break;
            case 3:
                mainContent.innerHTML = `
                    <h2>Contact</h2>
                    <p>Have questions? Get in touch with the community or the developers for support and collaboration opportunities.</p>
                `;
                break;
            default:
                mainContent.innerHTML = `
                    <h2>Welcome</h2>
                    <p>Select a tab to see its content.</p>
                `;
                break;
        }
    });
});
