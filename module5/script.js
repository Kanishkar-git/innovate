document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const refreshBtn = document.getElementById('refresh-btn');
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');
    const errorState = document.getElementById('error-state');

    // Public API URL for random quotes
    const API_URL = 'https://api.quotable.io/random';
    
    // We will use a fallback API because quotable sometimes blocks requests or has CORS issues depending on environment
    // Specifically dummyjson's quote API is very reliable for basic demos
    const DUMMY_API_URL = 'https://dummyjson.com/quotes/random';

    // Fetch data asynchronously
    async function fetchQuote() {
        // UI State: Loading
        showLoadingState();

        try {
            // Wait for response
            const response = await fetch(DUMMY_API_URL);
            
            // Handle HTTP errors
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parse JSON data
            const data = await response.json();
            
            // UI State: Success (Update DOM with fetched data)
            updateDOM(data);

        } catch (error) {
            console.error('Error fetching quote:', error);
            // UI State: Error
            showErrorState();
        }
    }

    function updateDOM(data) {
        // The exact structure depends on the API. dummyjson returns { quote, author, id }
        quoteText.textContent = `"${data.quote}"`;
        quoteAuthor.textContent = `- ${data.author}`;
        
        // Hide loader, show content
        loader.style.display = 'none';
        errorState.style.display = 'none';
        content.style.display = 'block';
        
        // Remove button spinner
        refreshBtn.classList.remove('spinning');
        
        // Small hack to re-trigger the CSS fade-in animation
        content.style.animation = 'none';
        content.offsetHeight; /* trigger reflow */
        content.style.animation = null; 
    }

    function showLoadingState() {
        loader.style.display = 'block';
        content.style.display = 'none';
        errorState.style.display = 'none';
        refreshBtn.classList.add('spinning');
    }

    function showErrorState() {
        loader.style.display = 'none';
        content.style.display = 'none';
        errorState.style.display = 'block';
        refreshBtn.classList.remove('spinning');
    }

    // Set up the button click event listener
    refreshBtn.addEventListener('click', fetchQuote);

    // Fetch the initial quote on page load
    fetchQuote();
});
