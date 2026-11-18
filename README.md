# CAPE3D — Landing page V1

Landing page française, premium et responsive pour CAPE3D. Stack : Astro 5, Three.js et GSAP. Préparée pour un déploiement statique sur GitHub Pages avec le domaine `cape-3d.fr`.

## Ce qui est inclus

- Direction artistique dark / industriel, logo CAPE3D fourni.
- Hero avec rendu 3D photoréaliste et objet Three.js interactif (rotation subtile au pointeur), avec fallback visuel si WebGL est indisponible.
- Visuels photoréalistes dédiés aux expertises FDM, SLA et gravure laser.
- Sections approche, expertises, méthode, présentation CAPE3D, FAQ et contact.
- Navigation mobile, barre de progression, animations au scroll et prise en charge de `prefers-reduced-motion`.
- Responsive desktop, tablette et mobile.
- SEO de base : titres, description, canonical, Open Graph, favicon, robots.txt et sitemap.xml.
- Page de mentions légales en trame, à compléter avec les informations exactes de l'entreprise avant publication.
- Workflow GitHub Actions pour déploiement GitHub Pages.

## Ce qui est volontairement reporté

Le formulaire de devis, l'envoi d'emails et le dépôt de fichiers ne sont pas développés dans cette V1. La page Contact renvoie vers `mailto:contact@cape-3d.fr`. Aucun formulaire factice ne prétend transmettre des informations. Le VPS KVM 2 n'est pas nécessaire pour héberger cette première version statique.

## Prérequis

- Node.js 22 LTS
- Git
- Compte GitHub
- Accès au DNS du domaine chez Hostinger

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

1. Créer un dépôt GitHub (par exemple `cape3d-site`).
2. Décompresser le projet et envoyer le contenu du dossier `cape3d-site` à la racine du dépôt, sur la branche `main`.
3. Dans **Settings → Pages**, choisir **GitHub Actions** comme source de déploiement.
4. Le workflow `.github/workflows/deploy.yml` construit le site puis publie le dossier `dist`.
5. Dans **Settings → Pages → Custom domain**, saisir `cape-3d.fr`.
6. Chez Hostinger, configurer les DNS Web indiqués par GitHub Pages pour le domaine racine et `www`.
7. Attendre la validation DNS puis activer **Enforce HTTPS** dans GitHub Pages.

Pour cette prévisualisation GitHub Pages, aucun fichier `CNAME` n'est présent. La configuration utilise temporairement `base: '/cape3d-site'`. Les adresses IP GitHub Pages peuvent évoluer : reprendre les valeurs affichées dans la documentation GitHub au moment de la configuration.

### Important — préserver les emails Hostinger

Le site web et les emails utilisent des enregistrements DNS distincts. Lors de la configuration de GitHub Pages, ne supprimez ni ne remplacez les enregistrements MX, SPF, DKIM ou DMARC déjà configurés pour `contact@cape-3d.fr`. Ne modifiez que les enregistrements A/AAAA/CNAME nécessaires au site, après avoir vérifié la configuration existante.

## Arborescence

- `src/pages/index.astro` : landing page.
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

## Informations à valider avant lancement public

- Compléter les champs de la page Mentions légales : raison sociale, forme juridique, adresse, SIREN/SIRET et directeur de publication.
- Vérifier les capacités exactes, matériaux, finitions et délais affichés.
- Confirmer le libellé « région Lyon–Genève » et l'adresse de contact.
- Ajouter une politique de confidentialité si un formulaire, des statistiques ou d'autres outils de collecte sont ajoutés.
- Remplacer les rendus 3D de présentation par des images de pièces réelles lorsque disponibles, si souhaité.

## Documentation utile

- GitHub Pages : https://docs.github.com/pages
- Domaine personnalisé : https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site
- Hostinger DNS : https://www.hostinger.com/fr/tutoriels/gerer-les-enregistrements-dns
