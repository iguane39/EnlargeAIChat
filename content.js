// Fonction pour appliquer les styles d'élargissement
function applyWidening() {
  const hostname = window.location.hostname;

  if (hostname.includes('openai.com') || hostname.includes('chatgpt.com')) {
    applyForChatGPT();
  } else if (hostname.includes('claude.ai')) {
    applyForClaude();
  } else if (hostname.includes('gemini.google.com')) {
    applyForGemini();
  } else if (hostname.includes('perplexity.ai')) {
    applyForPerplexity();
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
    applyStyles(main);
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
  // Claude utilise Tailwind avec des classes comme max-w-3xl, max-w-[52rem], etc.
  // On doit cibler ces éléments et forcer une largeur plus grande.

  // 1. Cibler le conteneur principal de la conversation
  const mainSelectors = [
    'main',
    '.flex-1.overflow-hidden', // Souvent le conteneur scrollable
    '.h-full.w-full'
  ];

  mainSelectors.forEach(selector => {
    const els = document.querySelectorAll(selector);
    els.forEach(el => {
      // On ne touche pas aux petits conteneurs
      if (el.offsetWidth > 500) {
        el.style.setProperty('max-width', '100%', 'important');
        el.style.setProperty('width', '100%', 'important');
      }
    });
  });

  // 2. Cibler spécifiquement les éléments qui ont une contrainte de largeur (max-w-*)
  // On utilise un sélecteur d'attribut pour attraper toutes les classes Tailwind
  const constrainedElements = document.querySelectorAll('[class*="max-w-"]');

  constrainedElements.forEach(el => {
    // On vérifie si c'est un élément de contenu (pas un bouton ou une icône)
    // On ignore les éléments trop petits ou qui semblent être des UI controls
    if (el.offsetWidth > 400 || el.tagName === 'DIV' || el.tagName === 'SECTION') {
      // On remplace la contrainte par notre largeur
      el.style.setProperty('max-width', '90vw', 'important'); // 90vw pour être cohérent avec Gemini
      // el.style.setProperty('width', '100%', 'important'); // Pas forcément width 100% car ça peut casser le layout flex
    }
  });

  // 3. Cibler spécifiquement la zone de message (souvent mx-auto)
  const messageAreas = document.querySelectorAll('.mx-auto');
  messageAreas.forEach(el => {
    if (el.offsetWidth > 400) {
      el.style.setProperty('max-width', '90vw', 'important');
    }
  });
}

function applyForGemini() {
  // Stratégie "Nucléaire v10" : Largeur Maximale (95%) et Centrée

  // 1. Le conteneur principal (bard-sidenav-content)
  const mainContainers = [
    'bard-sidenav-content',
    'main'
  ];

  mainContainers.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.style.setProperty('width', '100%', 'important');
      el.style.setProperty('max-width', '100%', 'important');

      const style = window.getComputedStyle(el);
      if (style.display === 'flex') {
        el.style.setProperty('justify-content', 'center', 'important');
        el.style.setProperty('align-items', 'stretch', 'important');
      }

      el.style.setProperty('margin-left', '0', 'important');
      el.style.setProperty('margin-right', '0', 'important');
      el.style.setProperty('padding-left', '0', 'important');
    });
  });

  // 2. Zone de chat interne
  // On passe à 95% pour remplir l'écran comme demandé
  const chatAreas = document.querySelectorAll('chat-window, .conversation-container, .content-container, .input-area');
  chatAreas.forEach(el => {
    el.style.setProperty('max-width', '95%', 'important');
    el.style.setProperty('width', '95%', 'important');
    el.style.setProperty('margin-left', 'auto', 'important');
    el.style.setProperty('margin-right', 'auto', 'important');
  });

  // 3. Input Container (Zone de saisie)
  const inputs = document.querySelectorAll('input-container');
  inputs.forEach(el => {
    const style = window.getComputedStyle(el);
    if (style.position === 'fixed' || style.position === 'absolute') {
      // On définit la zone disponible (à droite de la sidebar)
      el.style.setProperty('left', '300px', 'important');
      el.style.setProperty('right', '0', 'important');

      // On prend 95% de cet espace
      el.style.setProperty('width', 'calc((100% - 300px) * 0.95)', 'important');

      el.style.setProperty('margin-left', 'auto', 'important');
      el.style.setProperty('margin-right', 'auto', 'important');
    } else {
      el.style.setProperty('max-width', '95%', 'important');
      el.style.setProperty('width', '95%', 'important');
      el.style.setProperty('margin-left', 'auto', 'important');
      el.style.setProperty('margin-right', 'auto', 'important');
    }
  });

  // 4. Nettoyage des éléments profonds
  const root = document.querySelector('main') || document.body;
  const allElements = root.querySelectorAll('div, section, article');

  allElements.forEach(el => {
    const style = window.getComputedStyle(el);
    const maxWidth = style.maxWidth;

    if (maxWidth && maxWidth.includes('px')) {
      const val = parseInt(maxWidth);
      if (val > 600 && val < 1200) {
        el.style.setProperty('max-width', '100%', 'important');
        el.style.setProperty('width', '100%', 'important');
      }
    }

    if (parseInt(style.marginLeft) > 50) {
      el.style.setProperty('margin-left', '0', 'important');
    }
  });
}

function applyForPerplexity() {
  // Perplexity utilise Tailwind CSS - nous devons modifier directement les classes

  // Cibler TOUS les éléments avec max-w-screen-md
  const allElements = document.querySelectorAll('[class*="max-w-screen-md"]');

  allElements.forEach(el => {
    // Récupérer toutes les classes actuelles
    let classes = el.className.split(' ');

    // Filtrer pour supprimer max-w-screen-md, px-md, px-lg, md:px-lg
    classes = classes.filter(c =>
      !c.includes('max-w-screen') &&
      !c.startsWith('px-') &&
      !c.includes(':px-')
    );

    // Réappliquer les classes sans les classes problématiques
    el.className = classes.join(' ');

    // Appliquer nos styles
    el.style.setProperty('max-width', '75vw', 'important');
    el.style.setProperty('width', '75vw', 'important');
    el.style.setProperty('margin-left', 'auto', 'important');
    el.style.setProperty('margin-right', 'auto', 'important');
    el.style.setProperty('padding-left', '0', 'important');
    el.style.setProperty('padding-right', '0', 'important');
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
