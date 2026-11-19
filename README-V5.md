# CAPE3D — V5 immersive experience

## Ce qui change

- Nouvelle séquence immersive en ouverture, avec scène Three.js procédurale plein écran.
- Timeline GSAP / ScrollTrigger synchronisée au défilement : assemblage, décomposition, apparition d'une structure en treillis, balayage lumineux, réassemblage.
- La composition finale revient vers la pose de départ pour créer une boucle visuelle cohérente.
- Quatre chapitres éditoriaux intégrés à la scène : conception, ingénierie, fabrication, résultat.
- Modèle 3D construit en géométrie procédurale (pas de dépendance à un fichier GLB externe).
- Réutilisation des images et du logo CAPE3D existants, conservation des sections métiers, méthode, atelier et contact.
- Dégradation gracieuse si WebGL n'est pas disponible, et adaptation mobile.

## Lancer en local

Pré-requis : Node.js 22 LTS.

```bash
npm install
npm run dev
```

## Construire pour GitHub Pages

```bash
npm run build
```

Le dossier `dist/` est généré par Astro. Le workflow GitHub Actions existant est conservé.

## À savoir

La scène 3D actuelle est un prototype procédural intégré au code : elle ne nécessite aucun asset 3D à ajouter. Elle constitue une base fonctionnelle pour la direction artistique V5. Pour une finition encore plus réaliste, la prochaine évolution pourra remplacer certaines pièces procédurales par un modèle CAO/GLB optimisé, sans changer l'architecture de navigation ou de scroll.

Le formulaire actuel conserve son fonctionnement de préparation d'un email : les fichiers sélectionnés ne sont pas téléversés automatiquement et doivent être joints manuellement à l'email.
