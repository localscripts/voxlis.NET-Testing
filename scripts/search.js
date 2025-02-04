document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
            const content = card.querySelector('.card-content')?.textContent.toLowerCase() || '';
            const types = Array.from(card.querySelectorAll('.tooltip')).map(t => t.textContent.toLowerCase()).join(' ');
            
            const isVisible = title.includes(searchTerm) || 
                            content.includes(searchTerm) || 
                            types.includes(searchTerm);
            
            if (isVisible) {
                card.style.display = '';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
                card.style.animation = '';
            }
        });
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                performSearch();
            }
        });
    });

    const cardsContainer = document.getElementById('cards-align');
    observer.observe(cardsContainer, { childList: true, subtree: true });

    searchInput.addEventListener('input', performSearch);

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            performSearch();
        }
    });
});