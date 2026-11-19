# CAPE3D — Site vitrine

Site vitrine français pour CAPE3D. Stack : Astro 5, Three.js et GSAP. Déploiement statique GitHub Pages sur le domaine personnalisé `cape-3d.fr`.

## Direction et contenu

- Direction artistique éditoriale : ivoire minéral, graphite, détails cuivre discrets.
- Hero photographique avec rendu du composant mécanique et scène Three.js interactive en surimpression légère.
- Visuels existants réutilisés pour les expertises FDM, SLA et gravure laser.
- Sections approche, expertises, méthode, atelier, FAQ et demande de devis.
- Navigation mobile, progression de lecture, animations au scroll et prise en charge de `prefers-reduced-motion`.
- Formulaire de brief qui prépare un email dans la messagerie du visiteur. Les fichiers choisis sont listés dans l'email mais doivent être ajoutés manuellement en pièces jointes : GitHub Pages ne traite pas lui-même les uploads ni l'envoi de formulaire.
- SEO de base : titres, description, canonical, Open Graph, favicon, robots.txt et sitemap.xml.
- Page de mentions légales en trame, à compléter avant publication.
- Workflow GitHub Actions pour construire et déployer le dossier `dist`.

## Prérequis

- Node.js 22 LTS
- npm
- Compte GitHub avec GitHub Pages activé
- Accès DNS au domaine chez Hostinger

## Tester en local

```bash
npm install
npm run dev
```

Pour vérifier la version optimisée :

```bash
npm run build
npm run preview
```

## Publier sur GitHub Pages

1. Décompresser le projet et envoyer le contenu du dossier `CAPE3D` à la racine du dépôt GitHub, sur la branche `main`.
2. Dans **Settings → Pages**, choisir **GitHub Actions** comme source de déploiement.
3. Le workflow `.github/workflows/deploy.yml` installe les dépendances, construit le site puis publie le dossier `dist`.
4. Le fichier `public/CNAME` déclare le domaine `cape-3d.fr`.
5. Dans **Settings → Pages → Custom domain**, vérifier que `cape-3d.fr` est bien renseigné.
6. Chez Hostinger, vérifier les enregistrements DNS demandés par GitHub Pages pour le domaine racine et `www`.
7. Après propagation DNS et validation, activer **Enforce HTTPS** dans GitHub Pages.

Le site est configuré pour la racine du domaine personnalisé (`base: '/'`). Si tu souhaites revenir à l'adresse de prévisualisation `cape3d.github.io/cape3d-site/`, il faudra rétablir une configuration `base` dédiée et retirer le CNAME.

### Important — préserver les emails Hostinger

Le site web et les emails utilisent des enregistrements DNS distincts. Lors de la configuration de GitHub Pages, ne supprime ni ne remplace les enregistrements MX, SPF, DKIM ou DMARC déjà configurés pour `contact@cape-3d.fr`. Ne modifie que les enregistrements web nécessaires, après vérification de la configuration existante.

## Arborescence

- `src/pages/index.astro` : landing page et formulaire de brief.
- `src/pages/mentions-legales.astro` : trame des mentions légales.
- `src/pages/404.astro` : page d'erreur.
- `src/layouts/MainLayout.astro` : métadonnées et structure HTML.
- `src/styles/global.css` : styles et responsive.
- `src/scripts/hero.js` : scène Three.js interactive.
- `src/scripts/motion.js` : animations GSAP / ScrollTrigger.
- `src/scripts/navigation.js` : menu mobile.
- `src/scripts/progress.js` : barre de progression de lecture.
- `public/images/` : logo et rendus 3D optimisés.
- `public/CNAME` : domaine personnalisé.
- `.github/workflows/deploy.yml` : déploiement automatique.

## À valider avant lancement public

- Compléter les mentions légales : raison sociale, forme juridique, adresse, SIREN/SIRET et directeur de publication.
- Vérifier les capacités exactes, matériaux, finitions et délais affichés.
- Confirmer le libellé « région Lyon–Genève » et l'adresse de contact.
- Pour un véritable dépôt de fichiers et un envoi automatique, connecter un service de formulaire (par exemple Formspree ou une API dédiée) et mettre à jour la politique de confidentialité.
- Remplacer les rendus de présentation par des photographies de pièces réellement produites lorsque tu en auras.

## Documentation

- GitHub Pages : https://docs.github.com/pages
- Domaine personnalisé : https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site
- Hostinger DNS : https://www.hostinger.com/fr/tutoriels/gerer-les-enregistrements-dns
