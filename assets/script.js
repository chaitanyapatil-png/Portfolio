/* ==========================================================================
   CHAITANYA PATIL - FUTURISTIC CYBERSECURITY PORTFOLIO JAVASCRIPT LOGIC
   Features: Particle Background, Custom Cursor, Terminal Emulator, 
   Typed Effect, Live System Clock, GitHub API, Toast System, Scroll Progress
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initPreloader();
  initScrollProgress();
  initNavbar();
  initTypedEffect();
  initCyberTerminal();
  initSkillBars();
  initGitHubAPI();
  initProjectFilters();
  initLiveClock();
  initParticleBackground();
  initCyberQuotes();
});

/* --- 1. CUSTOM CYBER CURSOR --- */
function initCustomCursor() {
  const dot = document.querySelector('.cyber-cursor-dot');
  const outline = document.querySelector('.cyber-cursor-outline');
  
  if (!dot || !outline) return;

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // Add hover effect to interactive elements
  const interactables = document.querySelectorAll('a, button, input, textarea, .glass-card, .btn-cyber, .filter-btn');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
  });
}

/* --- 2. PRELOADER --- */
function initPreloader() {
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1200);
  }
}

/* --- 3. SCROLL PROGRESS BAR & STICKY NAVBAR --- */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  const header = document.querySelector('.navbar-header');
  
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (progressBar) progressBar.style.width = `${progress}%`;

    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Active Nav Link Update
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav.nav-menu a');
    let currentSection = '';

    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --- 4. MOBILE NAVBAR TOGGLE --- */
function initNavbar() {
  const hamburger = document.querySelector('.hamburger-btn');
  const navMenu = document.querySelector('nav.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking link
    document.querySelectorAll('nav.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }
}

/* --- 5. TYPED EFFECT IN HERO --- */
function initTypedEffect() {
  const typedEl = document.querySelector('.typed-text');
  if (!typedEl) return;

  const words = ['Cybersecurity Enthusiast'];
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIdx];
    if (isDeleting) {
      typedEl.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedEl.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentWord.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* --- 6. INTERACTIVE CYBER TERMINAL --- */
function initCyberTerminal() {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  
  if (!terminalBody || !terminalInput) return;

  const commands = {
    help: `Available Commands:
  <span class="term-prompt">whoami</span>    - Display profile summary
  <span class="term-prompt">skills</span>    - List core technical skills
  <span class="term-prompt">projects</span>  - Show featured projects
  <span class="term-prompt">labs</span>      - Show cybersecurity hands-on labs
  <span class="term-prompt">contact</span>   - Show contact channels & email
  <span class="term-prompt">matrix</span>    - Run cyber binary animation stream
  <span class="term-prompt">quote</span>     - Output random cybersecurity quote
  <span class="term-prompt">clear</span>     - Clear terminal screen`,

    whoami: `[IDENTITY]: Chaitanya Patil
[ROLE]: Cybersecurity Enthusiast & Python Developer
[EDUCATION]: BCA Student (Graduating 2027) | CGPA: 8.75
[STATUS]: Available for Cybersecurity Internships & Freelance Work`,

    skills: `[SKILLS]:
• Programming: Python, Java, JavaScript, C/C++ (DSA), Bash/Shell
• Cybersecurity: Linux, Kali Linux, Networking, Nmap, Wireshark, Burp Suite, OWASP Top 10
• Web Dev: HTML5, CSS3, JavaScript, Node.js, Express.js, MongoDB`,

    projects: `[FEATURED PROJECTS]:
1. Password Manager (Python + AES Encryption)
2. Smart SRB Financial Portal (Full Stack Node/Mongo)
3. Circle Clash Game (Python + Pygame)
4. Village Library Portal (HTML/CSS/JS)
5. CBP Tools & Multi-Tool Web Application`,

    labs: `[CYBERSECURITY LABS]:
• TryHackMe - Active Hands-on Labs & Privilege Escalation
• PortSwigger Web Security Academy - OWASP Top 10 Practice
• Linux Hardening & System Administration Practice
• Networking & Wireshark Packet Analysis Labs`,

    contact: `[GET IN TOUCH]:
Email: chaitanyapatil939@gmail.com
LinkedIn: linkedin.com/in/chaitanya-patil-72268b28b
GitHub: github.com/chaitanyapatil-png`,

    sudo: `[ACCESS DENIED]: User 'visitor' is not in the sudoers file. Incident reported to security team!`,

    matrix: `01000011 01011001 01000010 01000101 01010010 01010011 01000101 01000011
[+] INITIATING DEFENSE PROTOCOLS...
[+] SCANNING PORT 80, 443, 22...
[+] STATUS: SYSTEM SECURE & SHIELD ACTIVE!`
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const inputVal = terminalInput.value.trim().toLowerCase();
      if (!inputVal) return;

      // Print Command Line
      const cmdRow = document.createElement('div');
      cmdRow.className = 'term-line';
      cmdRow.innerHTML = `<span class="term-prompt">cbp@security:~$</span> <span class="term-cmd">${escapeHTML(inputVal)}</span>`;
      terminalBody.appendChild(cmdRow);

      // Process Output
      const outRow = document.createElement('div');
      outRow.className = 'term-line term-out';

      if (inputVal === 'clear') {
        terminalBody.innerHTML = '';
        terminalInput.value = '';
        return;
      } else if (inputVal === 'quote') {
        outRow.innerHTML = getRandomQuote();
      } else if (commands[inputVal]) {
        outRow.innerHTML = commands[inputVal].replace(/\n/g, '<br>');
      } else {
        outRow.innerHTML = `Command not recognized: '<span class="term-cmd">${escapeHTML(inputVal)}</span>'. Type <span class="term-prompt">'help'</span> for list of commands.`;
      }

      terminalBody.appendChild(outRow);
      terminalInput.value = '';
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* --- 7. ANIMATED SKILL BARS ON SCROLL --- */
function initSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetPercent = fill.getAttribute('data-percentage') || '85%';
        fill.style.width = targetPercent;
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.2 });

  skillFills.forEach(fill => observer.observe(fill));
}

/* --- 8. LIVE GITHUB API INTEGRATION --- */
async function initGitHubAPI() {
  const username = 'chaitanyapatil-png';
  const reposCountEl = document.getElementById('gh-repos-count');
  const starsCountEl = document.getElementById('gh-stars-count');
  const followersCountEl = document.getElementById('gh-followers-count');
  const repoListEl = document.getElementById('gh-repo-list');

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (userRes.ok) {
      const userData = await userRes.json();
      if (reposCountEl) reposCountEl.textContent = userData.public_repos || '15+';
      if (followersCountEl) followersCountEl.textContent = userData.followers || '10+';
    }

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`);
    if (reposRes.ok) {
      const repos = await reposRes.json();
      let totalStars = 0;
      if (repoListEl) repoListEl.innerHTML = '';

      repos.forEach(repo => {
        totalStars += repo.stargazers_count;
        if (repoListEl) {
          const item = document.createElement('div');
          item.className = 'glass-card';
          item.style.padding = '1rem';
          item.style.marginBottom = '0.8rem';
          item.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <h4 style="color:var(--primary); font-size:0.95rem; font-family:var(--font-mono);">${repo.name}</h4>
              <span style="font-size:0.75rem; color:var(--text-muted);"><i class="fas fa-star" style="color:var(--warning);"></i> ${repo.stargazers_count}</span>
            </div>
            <p style="font-size:0.82rem; color:var(--text-muted); margin:0.4rem 0;">${repo.description || 'Cybersecurity / Web Project Repository'}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem;">
              <span class="tech-pill">${repo.language || 'Code'}</span>
              <a href="${repo.html_url}" target="_blank" class="btn-cyber btn-outline" style="padding:0.25rem 0.6rem; font-size:0.72rem;">View Repo <i class="fas fa-external-link-alt"></i></a>
            </div>
          `;
          repoListEl.appendChild(item);
        }
      });

      if (starsCountEl) starsCountEl.textContent = totalStars;
    }
  } catch (err) {
    console.log('GitHub API fetch fallback engaged');
  }
}

/* --- 9. PROJECT FILTERS --- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .project-card-wrap');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- 10. LIVE SYSTEM CLOCK --- */
function initLiveClock() {
  const clockEl = document.getElementById('live-cyber-clock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `UTC+05:30 ${hrs}:${mins}:${secs}`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* --- 11. PARTICLE BACKGROUND CANVAS --- */
function initParticleBackground() {
  const canvas = document.createElement('canvas');
  canvas.id = 'cyber-particle-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-2';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 20), 60);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 255, ${p.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(0, 229, 255, 0.5)';
      ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 229, 255, ${0.15 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
}

/* --- 12. CYBER QUOTES & UTILITIES --- */
const cyberQuotes = [
  '"Security is not a product, but a process." - Bruce Schneier',
  '"There are only two types of companies: those that have been hacked, and those that will be." - Robert Mueller',
  '"If you think technology can solve your security problems, then you don\'t understand the problems and you don\'t understand the technology." - Gene Spafford',
  '"The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room." - Gene Spafford'
];

function getRandomQuote() {
  return cyberQuotes[Math.floor(Math.random() * cyberQuotes.length)];
}

function initCyberQuotes() {
  const quoteBtn = document.getElementById('get-quote-btn');
  const quoteDisplay = document.getElementById('quote-display');

  if (quoteBtn && quoteDisplay) {
    quoteBtn.addEventListener('click', () => {
      quoteDisplay.textContent = getRandomQuote();
      showToast('Cyber Quote Generated');
    });
  }
}

// TOAST NOTIFICATIONS
function showToast(msg) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `<i class="fas fa-shield-halved" style="color:var(--primary);"></i> <span>${msg}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// COPY EMAIL HELPER
function copyEmail() {
  const email = 'chaitanyapatil939@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    showToast('Email address copied to clipboard!');
  }).catch(() => {
    showToast('Email: chaitanyapatil939@gmail.com');
  });
}

/* --- PHOTO VIEWER LOGIC --- */
function openPhotoViewer(src, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  const modal = document.getElementById('photo-viewer-modal');
  const img = document.getElementById('photo-viewer-img');
  if (modal && img) {
    img.src = src;
    modal.style.display = 'flex';
    // Small timeout to allow display:flex to apply before adding opacity class
    setTimeout(() => {
      modal.classList.add('active');
    }, 10);
  }
}

function closePhotoViewer() {
  const modal = document.getElementById('photo-viewer-modal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
}
