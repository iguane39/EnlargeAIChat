# Enlarge AI Chat - Extension Chrome

[🇬🇧 English Version](README_EN.md)

Extension Chrome qui élargit la fenêtre de chat de ChatGPT, Claude, Gemini, Perplexity et Mistral à 95% de la largeur de l'écran pour une meilleure expérience de lecture.

## Fonctionnalités

- ✅ Élargit automatiquement la zone de chat à 95% de la largeur de l'écran
- ✅ Compatible avec ChatGPT (chat.openai.com & chatgpt.com)
- ✅ Compatible avec Claude (claude.ai)
- ✅ Compatible avec Gemini (gemini.google.com)
- ✅ Compatible avec Perplexity (perplexity.ai)
- ✅ Compatible avec Mistral Le Chat (chat.mistral.ai)
- ✅ S'applique automatiquement sans configuration
- ✅ Réapplique les styles si la page change dynamiquement

## Installation

### Étape 1 : Créer les icônes
Avant d'installer l'extension, vous devez créer les icônes PNG. Consultez [ICONS_README.md](ICONS_README.md) pour les instructions détaillées.

Les fichiers suivants doivent être présents :
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

### Étape 2 : Charger l'extension dans Chrome

1. Ouvrez Chrome et allez à `chrome://extensions/`
2. Activez le **"Mode développeur"** (coin supérieur droit)
3. Cliquez sur **"Charger l'extension non empaquetée"**
4. Sélectionnez le dossier `EnlargeAIChat`
5. L'extension est maintenant installée !

## Utilisation

1. Visitez l'un des sites supportés :
   - https://chat.openai.com ou https://chatgpt.com
   - https://claude.ai
   - https://gemini.google.com
   - https://www.perplexity.ai
   - https://chat.mistral.ai

2. La zone de chat s'élargira automatiquement à 95% de la largeur de l'écran

## Structure des fichiers

```
EnlargeAIChat/
├── manifest.json          # Configuration de l'extension
├── content.js            # Script qui applique l'élargissement
├── styles.css            # Styles CSS pour chaque plateforme
├── icon.svg              # Icône source SVG
├── icon16.png            # Icône 16x16 (à créer)
├── icon48.png            # Icône 48x48 (à créer)
├── icon128.png           # Icône 128x128 (à créer)
├── create-icons.html     # Outil pour générer les icônes
├── ICONS_README.md       # Instructions pour créer les icônes
└── README.md             # Ce fichier
```

## Fonctionnement technique

L'extension utilise :
- **Content Scripts** : Injectés automatiquement sur les pages des sites supportés
- **CSS Injection** : Applique des styles pour élargir les conteneurs
- **MutationObserver** : Détecte les changements DOM et réapplique les styles
- **Interval Timer** : Réapplique les styles toutes les secondes pour contrer les modifications dynamiques

## Désinstallation

1. Allez à `chrome://extensions/`
2. Trouvez "Enlarge AI Chat"
3. Cliquez sur **"Supprimer"**

## Personnalisation

Pour modifier la largeur (actuellement 75%), éditez les fichiers :
- [content.js](content.js) : Changez `'75vw'` par la valeur souhaitée (ex: `'80vw'` pour 80%)
- [styles.css](styles.css) : Changez `75vw` par la même valeur

## Compatibilité

- Chrome version 88+
- Microsoft Edge version 88+
- Tous les navigateurs basés sur Chromium supportant Manifest V3

## Licence

Ce projet est libre d'utilisation et de modification.
