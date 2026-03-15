// Vanilla JavaScript Hash Router

// DOM elements
const appDiv = document.getElementById('app');
const navLinks = document.querySelectorAll('.nav-link');

// -------------------------------------------------------------
// Component Definitions (Views returned as HTML strings)
// -------------------------------------------------------------

const Home = () => `
    <div class="view hero">
        <h1>Welcome to HashSPA</h1>
        <p>A lightning-fast, zero-dependency Single Page Application built entirely with vanilla JavaScript and hash routing. No React, no Vue, just standard web APIs.</p>
        <a href="#/services" class="btn">Explore Our Services</a>
    </div>
`;

const Services = () => `
    <div class="view">
        <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 1rem;">Our Premium Services</h2>
        <p style="text-align: center; max-width: 600px; margin: 0 auto;">We offer a wide range of web development and design solutions tailored exactly to your business logic and needs.</p>
        
        <div class="grid">
            <div class="card">
                <span class="card-icon">🚀</span>
                <h3>Web Applications</h3>
                <p>Custom-built, scalable React and Node.js applications that perform efficiently under heavy traffic loads.</p>
            </div>
            
            <div class="card">
                <span class="card-icon">🎨</span>
                <h3>UI/UX Design</h3>
                <p>Beautiful, intuitive interfaces prioritizing user experience, accessibility, and high conversion rates.</p>
            </div>
            
            <div class="card">
                <span class="card-icon">📱</span>
                <h3>Mobile Development</h3>
                <p>Cross-platform mobile applications that give your users native-like experiences on iOS and Android.</p>
            </div>
        </div>
    </div>
`;

const Contact = () => `
    <div class="view">
        <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 2rem;">Get In Touch</h2>
        
        <div class="form-container">
            <form id="contactForm" onsubmit="event.preventDefault(); alert('Message sent successfully!');">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" placeholder="John Doe" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" placeholder="john@example.com" required>
                </div>
                
                <div class="form-group">
                    <label for="message">Your Message</label>
                    <textarea id="message" rows="5" placeholder="How can we help you today?" required></textarea>
                </div>
                
                <button type="submit" class="btn w-full">Send Message</button>
            </form>
        </div>
    </div>
`;

const NotFound = () => `
    <div class="view not-found">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>The routing path you are looking for does not exist in this Single Page Application.</p>
        <a href="#/home" class="btn" style="margin-top: 1rem;">Return Home</a>
    </div>
`;


// -------------------------------------------------------------
// Router Logic
// -------------------------------------------------------------

// Map routes to components
const routes = {
    '/': Home,
    '/home': Home,
    '/services': Services,
    '/contact': Contact
};

// Main routing function
const router = () => {
    // 1. Get current hash (e.g. #/about) and extract the path (e.g. /about)
    // If no hash exists, default to '/'
    let path = window.location.hash.slice(1) || '/';
    
    // 2. Look up the component based on path, fallback to NotFound
    const currentView = routes[path] || NotFound;
    
    // 3. Render the component into the DOM
    appDiv.innerHTML = currentView();
    
    // 4. Update dynamic active states on Navigation links
    updateNavUI(path);
};

// Change active class on navbar links based on current path
const updateNavUI = (currentPath) => {
    // Treat root as home for UI active state purposes
    if(currentPath === '/') currentPath = '/home';
    
    navLinks.forEach(link => {
        // Remove active class from all links
        link.classList.remove('active');
        
        // Add active class if link's data-route matches current path
        if (link.getAttribute('data-route') === currentPath) {
            link.classList.add('active');
        }
    });
};

// -------------------------------------------------------------
// Initialization & Event Listeners
// -------------------------------------------------------------

// Listen to hash changes (when user clicks link or uses back/forward buttons)
window.addEventListener('hashchange', router);

// Listen to page load to render initial path
window.addEventListener('load', () => {
    // Automatically add hash to URL if missing on load so UX is clean
    if (!window.location.hash) {
        window.location.hash = '#/home';
    } else {
        router();
    }
});
