// Script de débogage - à exécuter dans la console du navigateur
// Pour ChatGPT, Claude ou Gemini

console.log('=== DEBUG ENLARGE AI CHAT ===');
console.log('Hostname:', window.location.hostname);

// Trouver tous les conteneurs principaux
const mainContainers = document.querySelectorAll('main, [role="main"]');
console.log('Main containers:', mainContainers.length);
mainContainers.forEach((el, i) => {
  console.log(`Main ${i}:`, {
    tag: el.tagName,
    classes: el.className,
    width: el.offsetWidth,
    maxWidth: getComputedStyle(el).maxWidth
  });
});

// Trouver les sidebars/navigation
const navs = document.querySelectorAll('nav, aside, [class*="sidebar"]');
console.log('Navigation elements:', navs.length);
navs.forEach((el, i) => {
  console.log(`Nav ${i}:`, {
    tag: el.tagName,
    classes: el.className,
    width: el.offsetWidth,
    display: getComputedStyle(el).display
  });
});

// Pour Gemini - Material Design
if (window.location.hostname.includes('gemini.google.com')) {
  const matElements = document.querySelectorAll('mat-drawer-container, mat-sidenav-container, mat-drawer, mat-sidenav, mat-sidenav-content');
  console.log('Material Design elements:', matElements.length);
  matElements.forEach((el, i) => {
    console.log(`Mat ${i}:`, {
      tag: el.tagName,
      classes: el.className,
      width: el.offsetWidth
    });
  });
}

// Trouver les conteneurs avec max-width
const maxWContainers = document.querySelectorAll('[class*="max-w-"]');
console.log('Max-width containers:', maxWContainers.length);
console.log('First 5 max-w containers:');
Array.from(maxWContainers).slice(0, 5).forEach((el, i) => {
  console.log(`MaxW ${i}:`, {
    classes: el.className,
    width: el.offsetWidth,
    maxWidth: getComputedStyle(el).maxWidth
  });
});
