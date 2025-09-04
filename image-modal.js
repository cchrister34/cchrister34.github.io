// Image Modal/Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Create modal HTML structure
    const modalHTML = `
        <div id="imageModal" class="image-modal">
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal()">&times;</button>
                <img id="modalImage" class="modal-image" src="" alt="">
                <div id="modalTitle" class="modal-title"></div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Get modal elements
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    
    // Add click event to code snippet containers (not just images)
    const codeContainers = document.querySelectorAll('.code-snippet-container');
    codeContainers.forEach(container => {
        const img = container.querySelector('.code-snippet-image');
        const title = container.querySelector('.snippet-title').textContent;
        
        // Make the entire container clickable
        container.style.cursor = 'pointer';
        
        container.addEventListener('click', function(e) {
            // Prevent default behavior and stop propagation
            e.preventDefault();
            e.stopPropagation();
            
            // Open modal with image details
            openModal(img.src, img.alt, title);
        });
        
        // Add visual feedback - make the whole container respond to hover
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Also add click to images directly as backup
    const codeImages = document.querySelectorAll('.code-snippet-image');
    codeImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openModal(this.src, this.alt, this.closest('.code-snippet-container').querySelector('.snippet-title').textContent);
        });
    });
    
    // Add click to hover explanations as well
    const hoverExplanations = document.querySelectorAll('.code-hover-explanation');
    hoverExplanations.forEach(explanation => {
        explanation.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const container = this.closest('.code-snippet-container');
            const img = container.querySelector('.code-snippet-image');
            const title = container.querySelector('.snippet-title').textContent;
            
            openModal(img.src, img.alt, title);
        });
    });
    
    // Open modal function
    window.openModal = function(imageSrc, imageAlt, title) {
        modalImg.src = imageSrc;
        modalImg.alt = imageAlt;
        modalTitle.textContent = title;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };
    
    // Close modal function
    window.closeModal = function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
        
        // Clear image after animation
        setTimeout(() => {
            modalImg.src = '';
            modalTitle.textContent = '';
        }, 300);
    };
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Prevent modal from closing when clicking on the image or title
    modalImg.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    document.querySelector('.modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

console.log('Image modal functionality loaded!');