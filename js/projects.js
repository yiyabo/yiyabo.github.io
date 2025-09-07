// Project filtering functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card[data-category]');

    // Filter projects based on category
    function filterProjects(category) {
        projectCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter projects
            const category = button.dataset.filter;
            filterProjects(category);
        });
    });

    // Animate project cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all project cards
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        projectObserver.observe(card);
    });

    // Add hover effects for project stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const originalText = stat.textContent;
        
        stat.addEventListener('mouseenter', () => {
            if (originalText.includes('+')) {
                stat.style.transform = 'scale(1.1)';
                stat.style.color = '#2563eb';
            }
        });
        
        stat.addEventListener('mouseleave', () => {
            stat.style.transform = 'scale(1)';
            stat.style.color = '';
        });
    });
});

// Project search functionality
function createProjectSearch() {
    const searchContainer = document.querySelector('.project-categories .container');
    
    const searchInput = document.createElement('div');
    searchInput.className = 'project-search';
    searchInput.innerHTML = `
        <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="搜索项目..." id="project-search-input">
        </div>
    `;
    
    searchContainer.appendChild(searchInput);
    
    const searchInputField = document.getElementById('project-search-input');
    
    searchInputField.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const projectCards = document.querySelectorAll('.project-card[data-category]');
        
        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const tech = Array.from(card.querySelectorAll('.project-tech span'))
                .map(span => span.textContent.toLowerCase())
                .join(' ');
            
            const matches = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          tech.includes(searchTerm);
            
            if (matches || searchTerm === '') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', createProjectSearch);

// Project modal functionality
function createProjectModal() {
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="" alt="">
                </div>
                <div class="modal-info">
                    <h2></h2>
                    <p class="modal-description"></p>
                    <div class="modal-features"></div>
                    <div class="modal-tech"></div>
                    <div class="modal-links"></div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .project-modal {
            display: none;
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            background-color: white;
            margin: 5% auto;
            padding: 0;
            border-radius: 15px;
            width: 90%;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        }
        
        .modal-close {
            position: absolute;
            right: 20px;
            top: 20px;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            z-index: 1;
            color: #666;
            background: white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .modal-close:hover {
            color: #2563eb;
        }
        
        .modal-body {
            padding: 2rem;
        }
        
        .modal-image img {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: 10px;
            margin-bottom: 2rem;
        }
        
        .modal-info h2 {
            color: #1e293b;
            margin-bottom: 1rem;
        }
        
        .modal-description {
            color: #64748b;
            line-height: 1.7;
            margin-bottom: 2rem;
        }
        
        .modal-features {
            margin-bottom: 2rem;
        }
        
        .modal-features h4 {
            color: #1e293b;
            margin-bottom: 1rem;
        }
        
        .modal-features ul {
            list-style: none;
            padding: 0;
        }
        
        .modal-features li {
            padding: 0.5rem 0;
            color: #64748b;
            position: relative;
            padding-left: 1.5rem;
        }
        
        .modal-features li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
        }
        
        .modal-tech {
            margin-bottom: 2rem;
        }
        
        .modal-tech span {
            display: inline-block;
            background: linear-gradient(45deg, #2563eb, #7c3aed);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 25px;
            font-size: 0.9rem;
            margin: 0.25rem;
        }
        
        .modal-links {
            display: flex;
            gap: 1rem;
        }
        
        .modal-links a {
            padding: 0.75rem 1.5rem;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            transition: background 0.3s ease;
        }
        
        .modal-links a:hover {
            background: #1d4ed8;
        }
    `;
    
    document.head.appendChild(modalStyles);
    
    // Add click events to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open modal if clicking on links
            if (e.target.closest('.project-links')) return;
            
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            const image = card.querySelector('img').src;
            const features = card.querySelector('.project-features');
            const tech = card.querySelectorAll('.project-tech span');
            const links = card.querySelectorAll('.project-links a');
            
            // Populate modal
            modal.querySelector('.modal-info h2').textContent = title;
            modal.querySelector('.modal-description').textContent = description;
            modal.querySelector('.modal-image img').src = image;
            
            // Copy features if they exist
            if (features) {
                modal.querySelector('.modal-features').innerHTML = features.innerHTML;
            }
            
            // Copy tech tags
            const modalTech = modal.querySelector('.modal-tech');
            modalTech.innerHTML = '';
            tech.forEach(techSpan => {
                const span = document.createElement('span');
                span.textContent = techSpan.textContent;
                modalTech.appendChild(span);
            });
            
            // Copy links
            const modalLinks = modal.querySelector('.modal-links');
            modalLinks.innerHTML = '';
            links.forEach(link => {
                const a = document.createElement('a');
                a.href = link.href;
                a.target = '_blank';
                a.textContent = link.querySelector('i').classList.contains('fa-github') ? 'GitHub' : '查看项目';
                modalLinks.appendChild(a);
            });
            
            modal.style.display = 'block';
        });
    });
    
    // Close modal events
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Initialize modal functionality
document.addEventListener('DOMContentLoaded', createProjectModal);

console.log('🎯 Projects page loaded successfully!');
