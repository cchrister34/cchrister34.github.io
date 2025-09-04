
document.addEventListener('DOMContentLoaded', function() {
    
    const smoothScroll = (target) => {
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    const videos = document.querySelectorAll('.project-video');
    videos.forEach(video => {
        video.addEventListener('loadstart', function() {
            this.style.opacity = '0.5';
        });
        
        video.addEventListener('canplay', function() {
            this.style.opacity = '1';
        });
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        skill.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const linkType = this.textContent.trim();
            console.log(`Social link clicked: ${linkType}`);
        });
    });

    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectTitle = this.querySelector('.project-title').textContent;
            console.log(`Project clicked: ${projectTitle}`);
        });
    });

    const introduction = document.querySelector('.introduction');
    if (introduction) {
        const originalText = introduction.textContent;
        const typeWriter = (text, element, speed = 50) => {
            element.textContent = '';
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, speed);
        };

    }

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.section');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos * 0.1}px)`;
        });
    });

    videos.forEach(video => {
        video.addEventListener('mouseenter', function() {
            this.play();
        });
        
        video.addEventListener('mouseleave', function() {
            // Keep playing but you can pause if preferred
            // this.pause();
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.classList.contains('project-card')) {
            e.target.click();
        }
    });

    projectCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View ${card.querySelector('.project-title').textContent} project details`);
    });

    console.log('Portfolio loaded successfully!');
});
