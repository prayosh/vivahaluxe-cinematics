/**
 * Vivahaluxe Cinematics - Advanced Animation Engine
 * Specialized luxury animation framework & interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. ASYMMETRICAL SCROLL REVEAL ENGINE
  const initScrollReveal = () => {
    const revealItems = document.querySelectorAll('.reveal-item');
    if (revealItems.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target); // Trigger once for cinema look
        }
      });
    }, observerOptions);

    revealItems.forEach((item, index) => {
      // Determine direction: Alternating index unless explicitly set via data attribute
      const explicitReveal = item.getAttribute('data-reveal');
      if (explicitReveal === 'left') {
        item.classList.add('reveal-left');
      } else if (explicitReveal === 'right') {
        item.classList.add('reveal-right');
      } else {
        // Dynamic alternation
        if (index % 2 === 0) {
          item.classList.add('reveal-left');
        } else {
          item.classList.add('reveal-right');
        }
      }
      observer.observe(item);
    });
  };

  // 2. STICKY BLURRED NAVBAR SCROLL SENSE
  const initNavbarScroll = () => {
    const navbar = document.querySelector('nav');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('bg-velvet-black/95', 'border-rose-gold/20', 'py-4', 'shadow-2xl');
        navbar.classList.remove('bg-velvet-black/70', 'border-rose-gold/10', 'py-6');
      } else {
        navbar.classList.add('bg-velvet-black/70', 'border-rose-gold/10', 'py-6');
        navbar.classList.remove('bg-velvet-black/95', 'border-rose-gold/20', 'py-4', 'shadow-2xl');
      }
    });
  };

  // 3. INFINITE TESTIMONIAL MARQUEE CLONE (FOR SMOOTH INFINITE FLOW)
  const initMarqueeClone = () => {
    const marqueeTrack = document.querySelector('.marquee-track');
    if (!marqueeTrack) return;

    // Clone the inner reviews once to create infinite wrapping structure
    const clone = marqueeTrack.innerHTML;
    marqueeTrack.innerHTML = clone + clone;
  };

  // 4. ACTIVE PORTFOLIO CATEGORY SELECTION FILTER (if applicable)
  const initPortfolioFilters = () => {
    const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active buttons
        filterButtons.forEach(btn => btn.classList.remove('text-rose-gold', 'border-rose-gold', 'bg-rose-gold/10'));
        filterButtons.forEach(btn => btn.classList.add('text-white/60', 'border-white/10'));
        button.classList.add('text-rose-gold', 'border-rose-gold', 'bg-rose-gold/10');
        button.classList.remove('text-white/60', 'border-white/10');

        const category = button.getAttribute('data-filter');
        portfolioCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  };

  // 5. INTERACTIVE BOOKING ESTIMATOR & FORM VALIDATION
  const initBookingForm = () => {
    const bookingForm = document.getElementById('bookingForm');
    const budgetInput = document.getElementById('estimatedBudget');
    const budgetDisplay = document.getElementById('budgetSliderVal');
    const calculateEstimateBtn = document.getElementById('calculateEstimateBtn');
    const estimationOutput = document.getElementById('estimationOutput');

    if (budgetInput && budgetDisplay) {
      budgetInput.addEventListener('input', (e) => {
        const val = parseInt(e.target.value).toLocaleString('en-IN');
        budgetDisplay.textContent = `₹${val}+`;
      });
    }

    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show elegant submission modal or feedback state
        const fields = ['coupleNames', 'eventDate', 'venueLocation', 'guestCount'];
        let valid = true;

        fields.forEach(f => {
          const el = document.getElementById(f);
          if (el && !el.value) {
            el.classList.add('border-red-500/50');
            valid = false;
          } else if (el) {
            el.classList.remove('border-red-500/50');
          }
        });

        if (!valid) {
          alert("Please fill in all mandatory luxury consultation parameters.");
          return;
        }

        // Elegant success substitution
        const innerContainer = document.getElementById('consultationPanelInner');
        if (innerContainer) {
          innerContainer.innerHTML = `
            <div class="text-center py-16 px-8 animate-fade-in">
              <div class="w-20 h-20 rounded-full border border-rose-gold flex items-center justify-center mx-auto mb-6 bg-rose-gold/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e0a96d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              </div>
              <h3 class="font-serif text-3xl text-rose-gold mb-4">A Legacy Awaits</h3>
              <p class="text-white/80 max-w-lg mx-auto leading-relaxed text-sm mb-6">
                Thank you for initiating your bespoke consultation. Ranveer Singh Vardhan and our master visual directors are checking scheduling availability for your dates. We will connect with you via email and scheduling call within 12 hours.
              </p>
              <div class="text-xs font-mono text-white/40 border-t border-white/10 pt-4 max-w-xs mx-auto">
                SECURE TOKEN: VLX-${Math.floor(Math.random() * 90000) + 10000}
              </div>
            </div>
          `;
        }
      });
    }

    // Budget service estimates
    if (calculateEstimateBtn && estimationOutput) {
      calculateEstimateBtn.addEventListener('click', () => {
        const guestCount = parseInt(document.getElementById('guestCount')?.value || "150");
        const budgetCategory = parseInt(budgetInput?.value || "350000");
        
        let tiers = "Standard Cinematic Package";
        let directors = "Associate Senior Cinematograph Collective";
        let equipment = "Sony FX6 / FX3 Cinema Rigs & G-Master Primes";

        if (budgetCategory > 500000) {
          tiers = "Royal Heritage Signature";
          directors = "Ranveer Singh Vardhan (Lead) + Senior Candid Collective";
          equipment = "RED V-Raptor 8K System, ARRI Alexa Mini LF B-Cam, Custom Anamorphic Glass";
        } else if (budgetCategory > 400000) {
          tiers = "Bespoke Avant-Garde Editorial";
          directors = "Priya Sharma Kapur (Lead Candids) + Master Lighting Director";
          equipment = "Sony FX9, FX6 System, Master Portrait Primes, Premium Tethered Lighting";
        }

        estimationOutput.innerHTML = `
          <div class="p-6 bg-white/[0.02] border border-rose-gold/20 rounded-xl space-y-4">
            <h4 class="font-serif text-lg text-rose-gold">Suggested Production Alignment</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span class="text-white/40 block">ARTISTIC GRADE</span>
                <span class="text-white font-sans text-sm font-semibold">${tiers}</span>
              </div>
              <div>
                <span class="text-white/40 block">DIRECTOR ALIGNMENT</span>
                <span class="text-white font-sans text-sm font-semibold">${directors}</span>
              </div>
              <div class="md:col-span-2">
                <span class="text-white/40 block">CAPTURE GEAR COMPLEMENT</span>
                <span class="text-white font-sans text-sm text-xs">${equipment}</span>
              </div>
            </div>
            <p class="text-xs text-white/50 italic font-sans">
              *Estimates are calculated subject to travel schedules & destination complexities in Mumbai or worldwide.
            </p>
          </div>
        `;
        estimationOutput.classList.remove('hidden');
      });
    }
  };

  // 6. MAP MATRIC INITIALIZATION
  const initMapButtons = () => {
    const mapBtn = document.getElementById('initializeMapRouteBtn');
    if (mapBtn) {
      mapBtn.addEventListener('click', () => {
        const bkcStudioAddress = "Vivahaluxe Studios, Level 5, The Capital Building, G-Block, Bandra Kurla Complex, Mumbai, Maharashtra 400051";
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bkcStudioAddress)}`;
        window.open(mapUrl, '_blank');
      });
    }
  };

  // 7. NEWSLETTER INTEGRATION
  const initNewsletter = () => {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input[type="email"]');
        if (input && input.value) {
          alert(`Welcome to our inner circle. Editorial catalogues will be delivered to ${input.value}.`);
          input.value = '';
        }
      });
    }
  };

  // 8. 3D PARALLAX HOVER DEPTH EFFECT FOR IMMERSIVE WEDDING PORTFOLIOS
  const initParallaxDepthEffect = () => {
    // Target both custom parallax cards and general portfolio card images
    const cards = document.querySelectorAll('.parallax-card, .portfolio-card, article[data-category]');
    if (cards.length === 0) return;

    cards.forEach(card => {
      const img = card.querySelector('img');
      if (!img) return;

      // Add smooth styling for translation / transition bounds
      img.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
      img.style.transformOrigin = 'center center';

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        // Mouse coordinate relative to card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate center offset from -1 to 1
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const dx = (x - xc) / xc; 
        const dy = (y - yc) / yc;

        // Apply slight high-end translation (max 15px) and scale zoom shift
        img.style.transform = `scale(1.1) translate(${dx * 15}px, ${dy * 15}px)`;
      });

      card.addEventListener('mouseleave', () => {
        // Smoothly restore base state
        img.style.transform = 'scale(1) translate(0px, 0px)';
      });
    });
  };

  // 9. ROMANTIC INTERACTIVE FLOATING ROSE PETALS BACKGROUND GENERATOR
  const initRosePetalsBackground = () => {
    // Dynamically build the fixed petal container if it doesn't already exist in DOM
    let petalContainer = document.getElementById('petal-container');
    if (!petalContainer) {
      petalContainer = document.createElement('div');
      petalContainer.id = 'petal-container';
      document.body.prepend(petalContainer);
    }

    const MAX_PETALS = 30;
    const PETAL_TYPES = ['rose-petal-type-1', 'rose-petal-type-2', 'rose-petal-type-3'];

    const spawnPetal = () => {
      // Respect strict screen limit constraints
      const currentPetals = petalContainer.querySelectorAll('.petal-parent').length;
      if (currentPetals >= MAX_PETALS) {
        return;
      }

      const parent = document.createElement('div');
      parent.className = 'petal-parent';

      const child = document.createElement('div');
      child.className = 'petal-child';

      // Natural Variance using Math.random() as requested
      const sizeList = [12, 15, 18, 20, 22, 25];
      const selectedSize = sizeList[Math.floor(Math.random() * sizeList.length)];
      const randomLeft = Math.random() * 100; // Left percentage position (0vw - 100vw)
      const randomDelay = Math.random() * 5; // Staggered delays 0s to 5s
      const randomFallDuration = 6 + Math.random() * 6; // Varying fall duration 6s to 12s
      const randomSwayDuration = 3 + Math.random() * 3; // Varying sway durations
      const randomOpacity = 0.5 + Math.random() * 0.5; // Slight opacity changes
      const randomType = PETAL_TYPES[Math.floor(Math.random() * PETAL_TYPES.length)];

      // Apply dimensions
      parent.style.left = `${randomLeft}vw`;
      parent.style.width = `${selectedSize}px`;
      parent.style.height = `${selectedSize}px`;
      
      // Setup animation style attributes for smooth custom timelines
      parent.style.animationDuration = `${randomFallDuration}s`;
      parent.style.animationDelay = `${randomDelay}s`;
      parent.style.opacity = `${randomOpacity}`;

      child.classList.add(randomType);
      child.style.animationDuration = `${randomSwayDuration}s`;
      child.style.animationDelay = `${Math.random() * 3}s`;

      parent.appendChild(child);
      petalContainer.appendChild(parent);

      // Performance Optimization: Eliminate petal elements securely when they exit screen
      parent.addEventListener('animationend', () => {
        parent.remove();
      });
    };

    // Begin recurring spawn cycle
    // Spawn initial set to make the page populated seamlessly, staggered across space
    for (let i = 0; i < 12; i++) {
      spawnPetal();
    }

    // Keep spawning new ones at balanced intervals to maintain luxurious ambiance
    setInterval(spawnPetal, 400);
  };

  // 10. LUXURY CINEMATIC PORTRAIT SLIDESHOW CONTROLLER 
  const initClassicSlideshow = () => {
    const slideshow = document.getElementById('hero-slideshow');
    if (!slideshow) return;

    const slides = slideshow.querySelectorAll('.slideshow-slide');
    const titleEl = document.getElementById('slideshow-title');
    const subtitleEl = document.getElementById('slideshow-subtitle');
    const prevBtn = document.getElementById('slideshow-prev');
    const nextBtn = document.getElementById('slideshow-next');
    const dotsContainer = document.getElementById('slideshow-dots');

    if (slides.length === 0) return;

    let currentIdx = 0;
    let slideshowInterval = null;
    const AUTOPLAY_TIMEOUT = 6000; // 6 seconds per slide for cinematic gaze

    // Dynamically inject indicator dots based on number of slides if container exists
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-rose-gold scale-125' : 'bg-white/30 hover:bg-white/60'}`;
        dot.setAttribute('data-target-idx', idx);
        dot.setAttribute('aria-label', `Go to Slide ${idx + 1}`);
        dotsContainer.appendChild(dot);
      });
    }

    const dots = dotsContainer ? dotsContainer.querySelectorAll('button') : [];

    // Synchronize 3D Parallax hover inside slide images
    const syncImageTransformState = (activeSlide) => {
      // Clear any custom inline transforms of other slides immediately upon transition
      slides.forEach(slide => {
        if (slide !== activeSlide) {
          const img = slide.querySelector('img');
          if (img) img.style.transform = 'scale(1) translate(0px, 0px)';
        }
      });
    };

    const updateSlideshowState = (nextIdx) => {
      if (nextIdx === currentIdx) return;

      // Handle cyclic boundaries
      if (nextIdx < 0) nextIdx = slides.length - 1;
      if (nextIdx >= slides.length) nextIdx = 0;

      const currentSlide = slides[currentIdx];
      const targetSlide = slides[nextIdx];

      // Grab metadata from target slide HTML attributes
      const title = targetSlide.getAttribute('data-title') || 'Featured Work';
      const subtitle = targetSlide.getAttribute('data-subtitle') || '';

      // Fade out old slide representation
      currentSlide.classList.replace('opacity-100', 'opacity-0');
      currentSlide.classList.remove('z-10');

      // Fade in new slide representation
      targetSlide.classList.replace('opacity-0', 'opacity-100');
      targetSlide.classList.add('z-10');

      // Reset parallax zoom scale offsets of adjacent slides
      syncImageTransformState(targetSlide);

      // Fade title overlay out & in smoothly
      if (titleEl) {
        titleEl.style.opacity = '0';
        setTimeout(() => {
          titleEl.textContent = title;
          titleEl.style.opacity = '1';
        }, 300);
      }

      // Fade subtitle overlay out & in smoothly
      if (subtitleEl) {
        subtitleEl.style.opacity = '0';
        setTimeout(() => {
          subtitleEl.textContent = subtitle;
          subtitleEl.style.opacity = '1';
        }, 350);
      }

      // Update dot active styling representation
      dots.forEach((dot, idx) => {
        if (idx === nextIdx) {
          dot.classList.add('bg-rose-gold', 'scale-125');
          dot.classList.remove('bg-white/30');
        } else {
          dot.classList.remove('bg-rose-gold', 'scale-125');
          dot.classList.add('bg-white/30');
        }
      });

      currentIdx = nextIdx;
    };

    const nextSlide = () => {
      updateSlideshowState(currentIdx + 1);
    };

    const prevSlide = () => {
      updateSlideshowState(currentIdx - 1);
    };

    // Autoplay execution lifecycle
    const startAutoplay = () => {
      stopAutoplay();
      slideshowInterval = setInterval(nextSlide, AUTOPLAY_TIMEOUT);
    };

    const stopAutoplay = () => {
      if (slideshowInterval) {
        clearInterval(slideshowInterval);
      }
    };

    // Setup event bounds
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        prevSlide();
        startAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nextSlide();
        startAutoplay();
      });
    }

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetIdx = parseInt(dot.getAttribute('data-target-idx'), 10);
        updateSlideshowState(targetIdx);
        startAutoplay();
      });
    });

    // Autoplay pauses when cursor hovers of the showcase, resumes when it leaves
    const parentContainer = slideshow.closest('.aspect-\\[16\\/9\\]');
    if (parentContainer) {
      parentContainer.addEventListener('mouseenter', stopAutoplay);
      parentContainer.addEventListener('mouseleave', startAutoplay);
    }

    // Prepare slide depth layer
    slides[0].classList.add('z-10');

    startAutoplay();
  };

  // 11. INTERACTIVE CAMERA VIEWFINDER FAQ ACCORDION SENSE
  const initViewfinderFAQ = () => {
    const accordionContainer = document.getElementById('viewfinder-faq-accordion');
    if (!accordionContainer) return;

    const cards = accordionContainer.querySelectorAll('.viewfinder-card');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        if (card.classList.contains('active-focus')) {
          // Rule says: "Only one card can hold the active focus lock state at any given second."
          // So once locked, selecting it will maintain focus.
          return;
        }

        cards.forEach(otherCard => {
          if (otherCard !== card) {
            otherCard.classList.remove('active-focus');
            otherCard.classList.remove('border-white/10');
            otherCard.classList.add('border-white/5');
            const otherBody = otherCard.querySelector('.faq-accordion-body');
            if (otherBody) {
              otherBody.classList.replace('grid-rows-[1fr]', 'grid-rows-[0fr]');
              otherBody.classList.replace('opacity-100', 'opacity-0');
            }
          }
        });

        card.classList.add('active-focus');
        card.classList.remove('border-white/5');
        card.classList.add('border-white/10');
        const body = card.querySelector('.faq-accordion-body');
        if (body) {
          body.classList.replace('grid-rows-[0fr]', 'grid-rows-[1fr]');
          body.classList.replace('opacity-0', 'opacity-100');
        }
      });
    });
  };

  // 12. HIGH-FIDELITY LUXURY MOBILE NAV DRAWER SENSE
  const initMobileMenu = () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuOverlay = document.getElementById('mobile-menu-overlay');
    if (!menuBtn || !menuOverlay) return;

    const line1 = document.getElementById('menu-line-1');
    const line2 = document.getElementById('menu-line-2');
    const line3 = document.getElementById('menu-line-3');

    let isOpen = false;

    const toggleMenu = () => {
      isOpen = !isOpen;
      if (isOpen) {
        menuOverlay.classList.remove('opacity-0', 'pointer-events-none');
        menuOverlay.classList.add('opacity-100');
        document.body.style.overflow = 'hidden';

        if (line1 && line2 && line3) {
          line1.style.transform = 'translateY(7px) rotate(45deg)';
          line2.style.opacity = '0';
          line3.style.transform = 'translateY(-7px) rotate(-45deg)';
        }
      } else {
        menuOverlay.classList.add('opacity-0', 'pointer-events-none');
        menuOverlay.classList.remove('opacity-100');
        document.body.style.overflow = '';

        if (line1 && line2 && line3) {
          line1.style.transform = '';
          line2.style.opacity = '1';
          line3.style.transform = '';
        }
      }
    };

    menuBtn.addEventListener('click', toggleMenu);

    const links = menuOverlay.querySelectorAll('.mobile-menu-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (isOpen) toggleMenu();
      });
    });
  };

  // Initialize all modular items
  initScrollReveal();
  initNavbarScroll();
  initMarqueeClone();
  initPortfolioFilters();
  initBookingForm();
  initMapButtons();
  initNewsletter();
  initParallaxDepthEffect();
  initRosePetalsBackground();
  initClassicSlideshow();
  initViewfinderFAQ();
  initMobileMenu();
});
