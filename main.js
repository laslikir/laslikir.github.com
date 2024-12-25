document.querySelectorAll('.left-tabs li').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelector('.left-tabs li.active').classList.remove('active');
        this.classList.add('active');

        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = `<h2>${this.innerText}</h2><p>Content for ${this.innerText} coming soon...</p>`;
    });
});

