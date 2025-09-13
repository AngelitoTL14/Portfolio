// Animación Matrix de fondo
class MatrixAnimation {
    constructor() {
        this.canvas = document.getElementById('matrixCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        this.init();
    }

    init() {
        this.resizeCanvas();
        this.setupColumns();
        this.animate();
        
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.setupColumns();
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupColumns() {
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = new Array(this.columns).fill(1);
    }

    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = `${this.fontSize}px Courier New, monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters[Math.floor(Math.random() * this.characters.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            this.ctx.fillText(text, x, y);
            
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Efecto de escritura para el header
class TypewriterEffect {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.currentIndex = 0;
        this.isDeleting = false;
        this.start();
    }

    start() {
        this.type();
    }

    type() {
        const currentText = this.text.substring(0, this.currentIndex);
        this.element.textContent = currentText;
        
        if (!this.isDeleting && this.currentIndex < this.text.length) {
            this.currentIndex++;
            setTimeout(() => this.type(), this.speed);
        } else if (this.isDeleting && this.currentIndex > 0) {
            this.currentIndex--;
            setTimeout(() => this.type(), this.speed / 2);
        } else if (this.currentIndex === this.text.length) {
            setTimeout(() => {
                this.isDeleting = true;
                this.type();
            }, 2000);
        } else if (this.isDeleting && this.currentIndex === 0) {
            this.isDeleting = false;
            setTimeout(() => this.type(), 500);
        }
    }
}

// Carousel de servicios
class ServicesCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.dots = document.querySelectorAll('.dot');
        this.totalSlides = this.slides.length;
        this.autoSlideInterval = null;
        this.init();
    }

    init() {
        this.showSlide(0);
        this.startAutoSlide();
        this.setupEventListeners();
    }

    showSlide(index) {
        // Asegura que el índice esté dentro del rango
        if (index < 0) index = this.totalSlides - 1;
        if (index >= this.totalSlides) index = 0;
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
        this.dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });
        this.currentSlide = index;
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.showSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(prevIndex);
    }

    goToSlide(index) {
        this.showSlide(index);
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    }

    setupEventListeners() {
        // Pausar auto-slide al hacer hover
        const carousel = document.querySelector('.carousel');
        carousel.addEventListener('mouseenter', () => this.stopAutoSlide());
        carousel.addEventListener('mouseleave', () => this.startAutoSlide());
    }
}

// Sistema de modales
class ModalSystem {
    constructor() {
        this.modals = {
            penetration: document.getElementById('penetrationModal'),
            malware: document.getElementById('malwareModal'),
            incident: document.getElementById('incidentModal'),
            intelligence: document.getElementById('intelligenceModal'),
            bugbounty: document.getElementById('bugbountyModal'),
            training: document.getElementById('trainingModal')
        };
        this.setupEventListeners();
    }

    open(modalName) {
        const modal = this.modals[modalName];
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            // Efecto de entrada
            modal.querySelector('.modal-content').style.animation = 'modalSlideIn 0.3s ease';
        }
    }

    close(modalName) {
        const modal = this.modals[modalName];
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    setupEventListeners() {
        // Cerrar modal al hacer click fuera del contenido
        Object.values(this.modals).forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    const modalName = Object.keys(this.modals).find(key => this.modals[key] === modal);
                    this.close(modalName);
                }
            });
        });

        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                Object.keys(this.modals).forEach(modalName => {
                    if (this.modals[modalName].style.display === 'block') {
                        this.close(modalName);
                    }
                });
            }
        });
    }
}

// Chatbot inteligente
class Chatbot {
    constructor() {
        this.isOpen = false;
        this.messages = document.getElementById('chatbotMessages');
        this.input = document.getElementById('chatInput');
        this.window = document.getElementById('chatbotWindow');
        this.faq = {
            'precio': 'Los precios van desde $200 hasta $25,000 dependiendo del servicio. ¿Te interesa algún servicio específico?',
            'penetration testing': 'El Penetration Testing incluye análisis de vulnerabilidades, pruebas web y de red. Duración: 1-4 semanas. Precio: $2,000-$25,000',
            'malware analysis': 'El análisis de malware incluye análisis estático/dinámico, reverse engineering y detección de IOCs. Duración: 3-10 días. Precio: $1,500-$15,000',
            'incident response': 'Respuesta inmediata 24/7 a incidentes de seguridad. Incluye contención, análisis forense y recuperación. Precio: $3,000-$20,000',
            'cyber intelligence': 'Inteligencia cibernética con análisis de amenazas, monitoreo dark web y reportes. Duración: 2-6 semanas. Precio: $5,000-$25,000',
            'contacto': 'Puedes contactarme a través del botón de contacto en cada servicio o enviando un mensaje aquí mismo.',
            'servicios': 'Ofrezco: Penetration Testing, Malware Analysis, Incident Response, Cyber Intelligence y Bug Bounty Reports.',
            'experiencia': 'Soy ANGEL_TERAN, Ethical Hacker especialista en cybersecurity con amplia experiencia en análisis de amenazas y respuesta a incidentes.',
            'tiempo': 'Los tiempos varían según el servicio: desde 3 días para análisis de malware hasta 6 semanas para inteligencia cibernética.',
            'confidencialidad': 'Todos los servicios incluyen acuerdos de confidencialidad y manejo seguro de información.',
            'ethical hacker': 'Soy un Ethical Hacker certificado que utiliza técnicas de hacking para ayudar a las organizaciones a mejorar su seguridad, siempre de manera legal y ética.',
            'hacker': 'Como Ethical Hacker, me especializo en encontrar vulnerabilidades de seguridad para ayudar a las empresas a protegerse de amenazas reales.'
        };
        this.setupEventListeners();
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.window.classList.toggle('active', this.isOpen);
        
        if (this.isOpen) {
            this.input.focus();
        }
    }

    sendMessage() {
        const message = this.input.value.trim();
        if (message) {
            this.addMessage(message, 'user');
            this.processMessage(message);
            this.input.value = '';
        }
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${sender}-message`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        this.messages.appendChild(messageDiv);
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = '';

        // Buscar coincidencias en FAQ
        for (const [key, value] of Object.entries(this.faq)) {
            if (lowerMessage.includes(key)) {
                response = value;
                break;
            }
        }

        // Si no hay coincidencia, respuesta genérica
        if (!response) {
            const genericResponses = [
                'Interesante pregunta. ¿Podrías ser más específico sobre qué servicio te interesa?',
                'Puedo ayudarte con información sobre nuestros servicios de cybersecurity. ¿Qué te gustaría saber?',
                'Para más detalles específicos, te recomiendo revisar los servicios detallados en la página.',
                '¿Te interesa algún servicio en particular? Puedo darte más información sobre precios y características.'
            ];
            response = genericResponses[Math.floor(Math.random() * genericResponses.length)];
        }

        // Simular delay de respuesta
        setTimeout(() => {
            this.addMessage(response, 'bot');
        }, 1000);
    }

    setupEventListeners() {
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }
}

// Funciones globales para HTML
let carousel, modalSystem, chatbot;

function scrollToServices() {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
}

function changeSlide(direction) {
    if (direction === 1) {
        carousel.nextSlide();
    } else {
        carousel.prevSlide();
    }
}

function currentSlide(index) {
    carousel.goToSlide(index - 1);
}

function openModal(serviceName) {
    modalSystem.open(serviceName);
}

function closeModal(serviceName) {
    modalSystem.close(serviceName);
}

function contactService(serviceName) {
    alert(`Contacto para ${serviceName}: angel.teran@hacker.com\nTeléfono: +1-555-HACKER\n\n¡Gracias por tu interés!`);
    closeModal(serviceName.replace(' ', '').toLowerCase());
}

function toggleChatbot() {
    chatbot.toggle();
}

function sendMessage() {
    chatbot.sendMessage();
}

// Efectos de scroll suave
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Efectos de parallax y animaciones al scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animaciones a elementos
    document.querySelectorAll('.service-card-detailed, .service-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar animación Matrix
    new MatrixAnimation();

    // Inicializar efecto de escritura
    new TypewriterEffect(document.getElementById('typingText'), 'ANGEL_TERAN');

    // Carrusel funcional y sencillo
    const carouselData = [
        {
            icon: '🔒',
            title: 'Penetration Testing',
            desc: 'Evaluación completa de seguridad de sistemas y aplicaciones'
        },
        {
            icon: '🦠',
            title: 'Malware Analysis',
            desc: 'Análisis detallado de malware y reverse engineering'
        },
        {
            icon: '🚨',
            title: 'Incident Response',
            desc: 'Respuesta rápida y efectiva a incidentes de seguridad'
        },
        {
            icon: '🔍',
            title: 'Cyber Intelligence',
            desc: 'Inteligencia cibernética y análisis de amenazas'
        },
        {
            icon: '🐛',
            title: 'Bug Bounty Reports',
            desc: 'Reportes detallados de vulnerabilidades encontradas'
        }
    ];
    let carouselIndex = 0;
    const card = document.getElementById('carouselCard');
    const indicator = document.getElementById('carouselIndicator');
    function renderCarousel(idx) {
        const item = carouselData[idx];
        card.innerHTML = `<div class="service-icon" style="font-size:3rem">${item.icon}</div>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>`;
        indicator.textContent = `${idx + 1} / ${carouselData.length}`;
    }
    document.getElementById('carouselPrev').onclick = function() {
        carouselIndex = (carouselIndex - 1 + carouselData.length) % carouselData.length;
        renderCarousel(carouselIndex);
    };
    document.getElementById('carouselNext').onclick = function() {
        carouselIndex = (carouselIndex + 1) % carouselData.length;
        renderCarousel(carouselIndex);
    };
    // Auto-rotación
    setInterval(function() {
        carouselIndex = (carouselIndex + 1) % carouselData.length;
        renderCarousel(carouselIndex);
    }, 4000);
    renderCarousel(carouselIndex);

    // Inicializar sistema de modales
    modalSystem = new ModalSystem();

    // Inicializar chatbot
    chatbot = new Chatbot();

    // Configurar scroll suave
    setupSmoothScrolling();

    // Configurar animaciones de scroll
    setupScrollAnimations();

    // Efecto de partículas adicionales
    createParticleEffect();

    // Configurar formulario de contacto
    setupContactForm();
});

// Efecto de partículas flotantes
function createParticleEffect() {
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '1';
    document.body.appendChild(particleContainer);

    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = '#00ff00';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.boxShadow = '0 0 10px #00ff00';
        particle.style.animation = `floatUp ${3 + Math.random() * 4}s linear forwards`;
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 7000);
    }

    // Crear partículas periódicamente
    setInterval(createParticle, 2000);
}

// Configurar formulario de contacto
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const service = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            // Simular envío del formulario
            alert(`¡Mensaje enviado!\n\nNombre: ${name}\nEmail: ${email}\nServicio: ${service}\n\nTe contactaré pronto como Ethical Hacker especialista.`);
            
            // Limpiar formulario
            this.reset();
        });
    }
}

// CSS para animación de partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-100vh);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
