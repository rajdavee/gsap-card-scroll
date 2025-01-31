gsap.registerPlugin(ScrollTrigger);

// Hide center line and text container initially
gsap.set('.center-line', { opacity: 0 });
gsap.set('.text-container', { opacity: 0 });

// Add center line and text container animation
ScrollTrigger.create({
    trigger: '.container',
    start: 'top bottom',
    end: 'bottom bottom',
    onEnter: () => {
        gsap.to(['.center-line', '.text-container'], { opacity: 1, duration: 0.3 });
    },
    onLeave: () => {
        gsap.to(['.center-line', '.text-container'], { opacity: 0, duration: 0.3 });
    },
    onEnterBack: () => {
        gsap.to(['.center-line', '.text-container'], { opacity: 1, duration: 0.3 });
    },
    onLeaveBack: () => {
        gsap.to(['.center-line', '.text-container'], { opacity: 0, duration: 0.3 });
    }
});

const sections = gsap.utils.toArray('.image-section');
const contents = gsap.utils.toArray('.content');

// Remove the initial state setting since we'll handle it in the first scroll
gsap.set(contents, { 
    opacity: 0,
    y: 100
});

// Create a timeline for the initial animation
gsap.to(contents[0], {
    opacity: 1,
    y: 0,
    duration: 0.4,
    delay: 0.3
});

sections.forEach((section, i) => {
    const img = section.querySelector('.image-wrapper');
    
    ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
            // Add zoom in effect for images
            gsap.fromTo(img, 
                { scale: 0.8 },
                {
                    scale: 1,
                    duration: 1,
                    ease: "power2.out"
                }
            );
            
            // Text animations (existing code)
            contents.forEach(content => {
                if(content !== contents[i]) {
                    gsap.to(content, {
                        duration: 0.4,
                        y: '-100%',
                        opacity: 0,
                        ease: 'Power2.easeIn'
                    });
                }
            });

            gsap.fromTo(contents[i], 
                {
                    y: '100%',
                    opacity: 0
                },
                {
                    duration: 0.4,
                    y: '0%',
                    opacity: 1,
                    ease: 'Power2.easeOut'
                }
            );
        },
        onLeave: () => {
            // Add zoom out effect when leaving
            gsap.to(img, {
                scale: 0.8,
                duration: 1,
                ease: "power2.in"
            });
        },
        onEnterBack: () => {
            // Add zoom in effect when scrolling back
            gsap.to(img, {
                scale: 1,
                duration: 1,
                ease: "power2.out"
            });
            
            // Existing text animations
            contents.forEach(content => {
                if(content !== contents[i]) {
                    gsap.to(content, {
                        duration: 0.4,
                        y: '100%',
                        opacity: 0,
                        ease: 'Power2.easeIn'
                    });
                }
            });

            gsap.fromTo(contents[i], 
                {
                    y: '-100%',
                    opacity: 0
                },
                {
                    duration: 0.4,  
                    y: '0%',
                    opacity: 1,
                    ease: 'Power2.easeOut'
                }
            );
        },
        onLeaveBack: () => {
            // Add zoom out effect when scrolling back
            gsap.to(img, {
                scale: 0.8,
                duration: 1,
                ease: "power2.in"
            });
        }
    });

    // Modify parallax effect to work with scale
    gsap.to(img, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });
});

// Add smooth scrolling
gsap.to('.image-container', {
    y: 0,
    ease: "none",
    scrollTrigger: {
        trigger: '.container',
        start: "top top",
        end: "bottom bottom",
        scrub: 1
    }
});