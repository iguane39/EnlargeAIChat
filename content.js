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
  } else if (hostname.includes('mistral.ai')) {
    applyForMistral();
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
  // Perplexity utilise Tailwind CSS
  // Stratégie : Cibler les conteneurs de largeur contrainte et les forcer à 95%

  // Cibler plus large : max-w-screen-* mais aussi max-w-3xl, 4xl etc.
  const allElements = document.querySelectorAll('[class*="max-w-"]');

  allElements.forEach(el => {
    // On ne touche que les éléments qui semblent être des conteneurs principaux
    if (el.offsetWidth > 500) {
      // Récupérer toutes les classes actuelles
      let classes = el.className.split(' ');

      // Filtrer pour supprimer les classes de largeur et de padding latéral
      classes = classes.filter(c =>
        !c.includes('max-w-') &&
        !c.startsWith('px-') &&
        !c.includes(':px-')
      );

      // Réappliquer les classes nettoyées
      el.className = classes.join(' ');

      // Appliquer nos styles : 95% de largeur
      el.style.setProperty('max-width', '95%', 'important');
      el.style.setProperty('width', '95%', 'important');
      el.style.setProperty('margin-left', 'auto', 'important');
      el.style.setProperty('margin-right', 'auto', 'important');
    }
  });

  // Cibler spécifiquement la grille ou le layout principal si nécessaire
  const main = document.querySelector('main');
  if (main) {
    main.style.setProperty('max-width', '100%', 'important');
    main.style.setProperty('width', '100%', 'important');
    main.style.setProperty('padding-left', '0', 'important');
    main.style.setProperty('padding-right', '0', 'important');
  }
}

function applyForMistral() {
  // Stratégie "Hyper Nucléaire" v2.2.5
  // Support Multi-Main + Flexbox Centering + Absolute Positioning

  try {
    // 1. Cibler TOUS les éléments main (pas juste le premier)
    const mains = document.querySelectorAll('main');
    mains.forEach(main => {
      main.style.setProperty('max-width', '100%', 'important');
      main.style.setProperty('width', '100%', 'important');

      // Scanner les enfants directs et profonds
      const allElements = main.querySelectorAll('*');

      allElements.forEach(el => {
        // Optimisation
        if (el.offsetWidth < 300) return;
        if (el.tagName === 'SVG' || el.tagName === 'PATH') return;

        const style = window.getComputedStyle(el);
        const parentStyle = el.parentElement ? window.getComputedStyle(el.parentElement) : null;

        // CAS 1 : Centrage par Marges (margin: auto)
        const marginLeft = parseInt(style.marginLeft) || 0;
        const marginRight = parseInt(style.marginRight) || 0;
        if (marginLeft > 50 && marginRight > 50 && Math.abs(marginLeft - marginRight) < 20) {
          el.style.setProperty('max-width', '95%', 'important');
          el.style.setProperty('width', '95%', 'important');
          el.style.setProperty('margin-left', 'auto', 'important');
          el.style.setProperty('margin-right', 'auto', 'important');
        }

        // CAS 2 : Centrage Flexbox (parent align-items/justify-content center)
        // Si l'élément a une max-width définie et est dans un parent flex centré
        if (parentStyle && parentStyle.display === 'flex') {
          if (parentStyle.justifyContent === 'center' || parentStyle.alignItems === 'center') {
            if (style.maxWidth !== 'none' && style.maxWidth !== '100%') {
              el.style.setProperty('max-width', '95%', 'important');
              el.style.setProperty('width', '95%', 'important');
              // On laisse le flex faire le centrage, on force juste la largeur
            }
          }
        }

        // CAS 3 : Classes Tailwind explicites (max-w-*)
        // On ressuscite ce sélecteur car il est très efficace si présent
        if (el.className && typeof el.className === 'string' && el.className.includes('max-w-')) {
          // Vérifier si c'est une contrainte "étroite" (pas max-w-full)
          if (!el.className.includes('max-w-full') && !el.className.includes('max-w-screen')) {
            el.style.setProperty('max-width', '95%', 'important');
            el.style.setProperty('width', '95%', 'important');
          }
        }

        // CAS 4 : Position Absolute Centrée
        if (style.position === 'absolute' || style.position === 'fixed') {
          if (style.left !== 'auto' && style.right !== 'auto') {
            // Si ancré des deux côtés avec une marge, on élargit
            const left = parseInt(style.left);
            const right = parseInt(style.right);
            if (left > 100 && right > 100) {
              el.style.setProperty('left', '2.5%', 'important');
              el.style.setProperty('right', '2.5%', 'important');
              el.style.setProperty('width', '95%', 'important');
              el.style.setProperty('max-width', '95%', 'important');
            }
          }
        }
      });
    });

    // 2. Ciblage spécifique Input (Textarea parents)
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
      let parent = textarea.parentElement;
      let count = 0;
      // Remonter jusqu'à trouver le conteneur qui bride la largeur
      while (parent && count < 6) {
        const pStyle = window.getComputedStyle(parent);
        if (parent.offsetWidth > 300 && pStyle.maxWidth !== 'none') {
          parent.style.setProperty('max-width', '95%', 'important');
          parent.style.setProperty('width', '95%', 'important');
        }
        parent = parent.parentElement;
        count++;
      }
    });

  } catch (e) {
    console.error("Enlarge AI Chat: Error in applyForMistral", e);
  }
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
