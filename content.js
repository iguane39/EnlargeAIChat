// Fonction pour appliquer les styles d'élargissement
function applyWidening() {
  const hostname = window.location.hostname;

  if (hostname.includes('openai.com') || hostname.includes('chatgpt.com')) {
    applyForChatGPT();
  } else if (hostname.includes('claude.ai')) {
    applyForClaude();
  } else if (hostname.includes('gemini.google.com')) {
    applyForGemini();
  }
}

// Fonction utilitaire pour appliquer les styles
function applyStyles(element, width = '75vw') {
  if (!element) return;
  element.style.setProperty('max-width', width, 'important');
  element.style.setProperty('width', width, 'important');
  element.style.setProperty('margin-left', 'auto', 'important');
  element.style.setProperty('margin-right', 'auto', 'important');
}

function applyForChatGPT() {
  // Élargir main
  const main = document.querySelector('main');
  if (main) {
    main.style.setProperty('max-width', '75vw', 'important');
    main.style.setProperty('width', '75vw', 'important');
    main.style.setProperty('margin-left', 'auto', 'important');
    main.style.setProperty('margin-right', 'auto', 'important');
  }

  // Élargir SEULEMENT les grands conteneurs (pas les boutons/dropdowns)
  const selectors = [
    'main > div',
    'main > div > div',
    'main div.flex.flex-col',
    'main article',
    'main div[class*="relative"][class*="flex"]'
  ];

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      // Ne cibler que les grands conteneurs (>300px)
      if (el.offsetWidth > 300) {
        el.style.setProperty('max-width', '100%', 'important');
      }
    });
  });
}

function applyForClaude() {
  // Claude utilise aussi Tailwind avec max-w-*
  const selectors = [
    'main',
    'main [class*="ConversationPane"]',
    'main [class*="max-w-"]',
    'main div.mx-auto'
  ];

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.style.setProperty('max-width', '75vw', 'important');
    });
  });
}

function applyForGemini() {
  // Supprimer l'espace de 72px à gauche causé par la sidebar
  const bardSidenavContent = document.querySelector('bard-sidenav-content');
  if (bardSidenavContent) {
    bardSidenavContent.style.setProperty('position', 'static', 'important');
    bardSidenavContent.style.setProperty('inset-inline', '0', 'important');
    bardSidenavContent.style.setProperty('width', '100%', 'important');
    bardSidenavContent.style.setProperty('max-width', '100%', 'important');
  }

  // Cibler chat-window - le conteneur principal et le centrer à 75vw
  const chatWindow = document.querySelector('chat-window');
  if (chatWindow) {
    chatWindow.style.setProperty('max-width', '75vw', 'important');
    chatWindow.style.setProperty('width', '75vw', 'important');
    chatWindow.style.setProperty('margin-left', 'auto', 'important');
    chatWindow.style.setProperty('margin-right', 'auto', 'important');
  }

  // S'assurer que tous les conteneurs enfants prennent 100% de la largeur
  const selectors = [
    'chat-window-content',
    '.content-wrapper',
    '.chat-history',
    '.zero-state-container'
  ];

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.style.setProperty('max-width', '100%', 'important');
      el.style.setProperty('width', '100%', 'important');
    });
  });
}

// Observer pour détecter les changements DOM
const observer = new MutationObserver((mutations) => {
  applyWidening();
});

// Appliquer au chargement initial
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyWidening);
} else {
  applyWidening();
}

// Observer les changements dans le DOM
observer.observe(document.body || document.documentElement, {
  childList: true,
  subtree: true
});

// Réappliquer périodiquement (au cas où les styles sont écrasés)
setInterval(applyWidening, 1000);
