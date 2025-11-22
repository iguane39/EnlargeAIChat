# Instructions pour créer les icônes

Pour créer les icônes PNG nécessaires, vous avez plusieurs options :

## Option 1 : Utiliser un outil en ligne
1. Ouvrez `icon.svg` dans un navigateur
2. Faites un clic droit > "Enregistrer l'image sous" et sauvegardez-la en PNG
3. Utilisez un outil comme https://www.iloveimg.com/resize-image/resize-png pour créer 3 versions :
   - icon16.png (16x16)
   - icon48.png (48x48)
   - icon128.png (128x128)

## Option 2 : Utiliser Inkscape ou GIMP
1. Ouvrez `icon.svg` avec Inkscape ou GIMP
2. Exportez l'image en PNG aux dimensions suivantes :
   - 16x16 pixels → icon16.png
   - 48x48 pixels → icon48.png
   - 128x128 pixels → icon128.png

## Option 3 : Utiliser ImageMagick (ligne de commande)
```bash
convert icon.svg -resize 16x16 icon16.png
convert icon.svg -resize 48x48 icon48.png
convert icon.svg -resize 128x128 icon128.png
```

## Option 4 : Utiliser create-icons.html
1. Ouvrez `create-icons.html` dans votre navigateur Chrome
2. Les 3 icônes seront automatiquement téléchargées

Placez tous les fichiers PNG dans le dossier racine de l'extension.
