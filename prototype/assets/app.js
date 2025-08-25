document.addEventListener('DOMContentLoaded', () => {
    const modulesContainer = document.getElementById('course-modules-container');
    const testimonialsContainer = document.getElementById('testimonials-container');

    // Fetch data and initialize the application
    const initApp = async () => {
        try {
            const response = await fetch('assets/dummy-data.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            renderModules(data.courseModules);
            renderTestimonials(data.testimonials);
        } catch (error) {
            console.error('Failed to load data:', error);
            modulesContainer.innerHTML = '<p>Error loading course content.</p>';
            testimonialsContainer.innerHTML = '<p>Error loading testimonials.</p>';
        }
    };

    // Render course modules to the DOM
    const renderModules = (modules) => {
        if (!modulesContainer) return;
        modulesContainer.innerHTML = modules.map(module => `
            <div class="module-card">
                <div class="module-header">
                    <h3>${module.title}</h3>
                    <span class="icon">+</span>
                </div>
                <div class="module-content">
                    <p>${module.description}</p>
                </div>
            </div>
        `).join('');
        
        // Add event listeners for accordion functionality
        addAccordionListeners();
    };

    // Render testimonials to the DOM
    const renderTestimonials = (testimonials) => {
        if (!testimonialsContainer) return;
        testimonialsContainer.innerHTML = testimonials.map(testimonial => `
            <div class="testimonial-card">
                <p class="quote">"${testimonial.quote}"</p>
                <div>
                    <p class="author">${testimonial.name}</p>
                    <p class="handle">${testimonial.handle}</p>
                </div>
            </div>
        `).join('');
    };

    // Accordion functionality for modules
    const addAccordionListeners = () => {
        const moduleCards = document.querySelectorAll('.module-card');
        moduleCards.forEach(card => {
            const header = card.querySelector('.module-header');
            header.addEventListener('click', () => {
                // Close other open cards
                moduleCards.forEach(otherCard => {
                    if (otherCard !== card && otherCard.classList.contains('active')) {
                        closeModule(otherCard);
                    }
                });

                // Toggle the clicked card
                toggleModule(card);
            });
        });
    };

    const toggleModule = (card) => {
        if (card.classList.contains('active')) {
            closeModule(card);
        } else {
            openModule(card);
        }
    };
    
    const openModule = (card) => {
        const content = card.querySelector('.module-content');
        card.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
    }

    const closeModule = (card) => {
        const content = card.querySelector('.module-content');
        card.classList.remove('active');
        content.style.maxHeight = null;
    }

    initApp();
});
