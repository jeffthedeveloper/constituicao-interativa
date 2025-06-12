// Funcionalidades JavaScript para o site
document.addEventListener('DOMContentLoaded', function() {
    
    // Configuração inicial
    initializeWebsite();
    
    // Event listeners
    setupEventListeners();
    
    // Animações e efeitos
    setupAnimations();
    
    // Navegação suave
    setupSmoothScrolling();
    
    // Botão voltar ao topo
    setupBackToTop();
    
    // Busca no documento
    setupSearch();
    
    // Modo escuro/claro
    setupThemeToggle();
    
    // Progresso de leitura
    setupReadingProgress();
});

// Inicialização do website
function initializeWebsite() {
    console.log('🚀 Site da Proposta de Desburocratização carregado com sucesso!');
    
    // Adicionar classes para animações
    const elements = document.querySelectorAll('h1, h2, h3, p, ul, .summary');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        el.classList.add('fade-in');
    });
    
    // Verificar se há hash na URL para navegação direta
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }, 500);
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Listener para redimensionamento da janela
    window.addEventListener('resize', debounce(handleResize, 250));
    
    // Listener para scroll
    window.addEventListener('scroll', throttle(handleScroll, 16));
    
    // Listener para teclas
    document.addEventListener('keydown', handleKeyPress);
    
    // Listener para cliques em links
    document.addEventListener('click', handleLinkClicks);
}

// Configurar animações
function setupAnimations() {
    // Intersection Observer para animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animar elementos filhos com delay
                const children = entry.target.querySelectorAll('p, li, h3');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('slide-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observar seções
    const sections = document.querySelectorAll('section, .summary, .references');
    sections.forEach(section => observer.observe(section));
}

// Configurar navegação suave
function setupSmoothScrolling() {
    // Criar menu de navegação dinâmico
    createNavigationMenu();
    
    // Configurar scroll suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Adicionar efeito de destaque
                highlightSection(target);
            }
        });
    });
}

// Criar menu de navegação
function createNavigationMenu() {
    const headers = document.querySelectorAll('h2');
    if (headers.length === 0) return;
    
    const nav = document.createElement('nav');
    nav.className = 'nav-menu';
    nav.innerHTML = '<ul></ul>';
    
    const ul = nav.querySelector('ul');
    
    headers.forEach((header, index) => {
        // Criar ID se não existir
        if (!header.id) {
            header.id = `section-${index + 1}`;
        }
        
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${header.id}`;
        a.textContent = header.textContent.substring(0, 30) + (header.textContent.length > 30 ? '...' : '');
        a.title = header.textContent;
        
        li.appendChild(a);
        ul.appendChild(li);
    });
    
    // Inserir navegação após o cabeçalho
    const header = document.querySelector('h1');
    if (header && header.parentNode) {
        header.parentNode.insertBefore(nav, header.nextSibling);
    }
}

// Configurar botão voltar ao topo
function setupBackToTop() {
    const backToTop = document.createElement('a');
    backToTop.href = '#';
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.title = 'Voltar ao topo';
    
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Configurar busca no documento
function setupSearch() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" id="search-input" placeholder="Buscar no documento..." />
        <div id="search-results"></div>
    `;
    
    // Inserir busca no início do container
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(searchContainer, container.firstChild);
    
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    searchInput.addEventListener('input', debounce(function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length < 3) {
            searchResults.innerHTML = '';
            clearHighlights();
            return;
        }
        
        performSearch(query, searchResults);
    }, 300));
}

// Realizar busca
function performSearch(query, resultsContainer) {
    clearHighlights();
    
    const textElements = document.querySelectorAll('p, h1, h2, h3, li');
    const results = [];
    
    textElements.forEach((element, index) => {
        const text = element.textContent.toLowerCase();
        if (text.includes(query)) {
            results.push({
                element: element,
                text: element.textContent,
                index: index
            });
            
            // Destacar termo encontrado
            highlightText(element, query);
        }
    });
    
    // Mostrar resultados
    if (results.length > 0) {
        resultsContainer.innerHTML = `
            <div class="search-summary">
                Encontrados ${results.length} resultado(s) para "${query}"
            </div>
        `;
    } else {
        resultsContainer.innerHTML = `
            <div class="search-summary">
                Nenhum resultado encontrado para "${query}"
            </div>
        `;
    }
}

// Destacar texto
function highlightText(element, query) {
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    const originalHTML = element.innerHTML;
    
    // Evitar destacar dentro de tags HTML
    if (!element.querySelector('mark')) {
        element.innerHTML = originalHTML.replace(regex, '<mark class="highlight">$1</mark>');
    }
}

// Limpar destaques
function clearHighlights() {
    const highlights = document.querySelectorAll('mark.highlight');
    highlights.forEach(mark => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
    });
}

// Configurar alternância de tema
function setupThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.title = 'Alternar tema escuro/claro';
    
    document.body.appendChild(themeToggle);
    
    // Verificar preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '☀️';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        this.innerHTML = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Configurar barra de progresso de leitura
function setupReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', throttle(updateReadingProgress, 16));
}

// Atualizar progresso de leitura
function updateReadingProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    const progressBar = document.querySelector('.reading-progress');
    if (progressBar) {
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    }
}

// Manipular scroll
function handleScroll() {
    const scrollTop = window.pageYOffset;
    
    // Mostrar/ocultar botão voltar ao topo
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        if (scrollTop > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    // Atualizar navegação ativa
    updateActiveNavigation();
    
    // Efeito parallax sutil no cabeçalho
    const header = document.querySelector('header');
    if (header) {
        header.style.transform = `translateY(${scrollTop * 0.1}px)`;
    }
}

// Atualizar navegação ativa
function updateActiveNavigation() {
    const sections = document.querySelectorAll('h2[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section.id;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Manipular redimensionamento
function handleResize() {
    // Reajustar elementos responsivos se necessário
    console.log('Janela redimensionada');
}

// Manipular teclas
function handleKeyPress(e) {
    // Atalhos de teclado
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'f':
                e.preventDefault();
                const searchInput = document.getElementById('search-input');
                if (searchInput) {
                    searchInput.focus();
                }
                break;
            case 'Home':
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
        }
    }
    
    // Navegação com setas
    if (e.key === 'ArrowUp' && e.altKey) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Manipular cliques em links
function handleLinkClicks(e) {
    const link = e.target.closest('a');
    if (link && link.href.startsWith('http') && !link.href.includes(window.location.hostname)) {
        // Links externos abrem em nova aba
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    }
}

// Destacar seção
function highlightSection(element) {
    element.classList.add('highlighted');
    setTimeout(() => {
        element.classList.remove('highlighted');
    }, 2000);
}

// Utilitários
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Adicionar estilos CSS para funcionalidades JavaScript
const additionalStyles = `
    .search-container {
        margin: 20px 0;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 10px;
        border: 1px solid #e9ecef;
    }
    
    #search-input {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid #3498db;
        border-radius: 25px;
        font-size: 16px;
        outline: none;
        transition: all 0.3s ease;
    }
    
    #search-input:focus {
        border-color: #2980b9;
        box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }
    
    .search-summary {
        margin-top: 10px;
        padding: 10px;
        background: #e3f2fd;
        border-radius: 5px;
        font-size: 14px;
        color: #1976d2;
    }
    
    .highlight {
        background: #ffeb3b;
        padding: 2px 4px;
        border-radius: 3px;
        font-weight: bold;
    }
    
    .theme-toggle {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .theme-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }
    
    .reading-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3498db, #e74c3c);
        z-index: 1001;
        transition: width 0.1s ease;
    }
    
    .highlighted {
        background: rgba(52, 152, 219, 0.1);
        border-radius: 5px;
        padding: 10px;
        transition: all 0.3s ease;
    }
    
    .fade-in {
        opacity: 0;
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .animate-in {
        transform: translateY(0);
        opacity: 1;
    }
    
    .slide-in {
        animation: slideInLeft 0.5s ease-out forwards;
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .nav-menu a.active {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
    }
    
    /* Tema escuro */
    .dark-theme {
        background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
        color: #ecf0f1;
    }
    
    .dark-theme .container {
        background: #34495e;
        color: #ecf0f1;
    }
    
    .dark-theme h1, .dark-theme h2, .dark-theme h3 {
        color: #3498db;
    }
    
    .dark-theme p {
        color: #bdc3c7;
    }
    
    .dark-theme .search-container {
        background: #2c3e50;
        border-color: #34495e;
    }
    
    .dark-theme .references {
        background: #2c3e50;
        color: #ecf0f1;
    }
    
    @media (max-width: 768px) {
        .theme-toggle {
            top: 10px;
            right: 10px;
            width: 40px;
            height: 40px;
            font-size: 16px;
        }
        
        .search-container {
            margin: 10px 0;
            padding: 15px;
        }
        
        #search-input {
            font-size: 14px;
            padding: 10px 14px;
        }
    }
`;

// Adicionar estilos ao documento
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

