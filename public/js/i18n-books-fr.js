// Traduction française des livres et des scènes 3D. L’espagnol est l’original (Supabase / data/hardware.json).
window.BOOKS_I18N = window.BOOKS_I18N || {};
window.SCENES_I18N = window.SCENES_I18N || {};
window.BOOKS_I18N.fr = {
  "rover-lunar-lrv": {
    name: "Rover lunaire (LRV)", mission: "Apollo 15, 16 et 17",
    arrived: "Juillet 1971 (Apollo 15)", ended: "Décembre 1972 (Apollo 17)",
    place: "Hadley-Apennins, Descartes et Taurus-Littrow",
    stats: [["Rovers sur la Lune", "3"], ["Poids sur Terre", "210 kg"], ["Trajet d’Apollo 17", "35,7 km"]],
    story: "Imagine une voiture qui voyage pliée comme une chaise de plage à l’intérieur d’un vaisseau spatial. C’est ainsi qu’est arrivé le rover lunaire : replié sur le côté du module d’atterrissage. Les astronautes tiraient sur des sangles et la voiture se dépliait toute seule. Grâce à lui, les équipages d’Apollo 15, 16 et 17 ont pu s’éloigner de plusieurs kilomètres du site d’atterrissage pour chercher des roches anciennes. À la fin de chaque mission, le rover est resté garé sur la Lune. Il n’y avait pas de place pour le ramener : aujourd’hui, trois voitures électriques sont arrêtées à la surface de la Lune.",
    science: "Le rover utilisait des batteries argent-zinc non rechargeables, et chaque roue avait son propre moteur électrique. Ses pneus n’étaient pas en caoutchouc : c’était un treillis de fil d’acier avec des plaques de titane, car le caoutchouc aurait été abîmé par le froid et la chaleur extrêmes. Grâce aux distances parcourues, les astronautes ont ramassé des échantillons de terrains différents, dont la célèbre « pierre de la Genèse » d’Apollo 15, un morceau de la croûte lunaire la plus ancienne.",
    today: "Les trois rovers sont toujours là où on les a laissés, sans énergie. La sonde LRO de la NASA les a photographiés depuis l’orbite, et on voit encore sur les images les traces de leurs roues, car sur la Lune il n’y a ni vent ni pluie pour les effacer.",
    fun: "Pendant Apollo 17, un garde-boue s’est cassé. Les astronautes l’ont réparé avec du ruban adhésif et des cartes plastifiées. Et la caméra du rover, pilotée depuis Houston, a filmé le décollage du vaisseau de retour : personne n’était là pour le filmer !"
  },
  "retrorreflectores-apollo": {
    name: "Rétroréflecteurs laser", mission: "Apollo 11, 14 et 15",
    arrived: "21 juillet 1969 (Apollo 11)", ended: "Toujours utilisés",
    place: "Mer de la Tranquillité, Fra Mauro et Hadley",
    stats: [["Prismes d’Apollo 15", "300"], ["Précision actuelle", "millimètres"], ["Énergie nécessaire", "aucune"]],
    story: "Parmi tout ce que les astronautes ont laissé sur la Lune, un objet travaille encore chaque jour, et il n’a même pas besoin d’électricité. C’est un panneau rempli de petits prismes de verre appelé rétroréflecteur. Neil Armstrong et Buzz Aldrin ont installé le premier en 1969. Ensuite, Apollo 14 et Apollo 15 en ont laissé deux autres. Depuis, des observatoires sur Terre leur envoient des rayons laser et attendent que la lumière revienne.",
    science: "Un prisme en coin renvoie la lumière exactement d’où elle vient. Si l’on mesure combien de temps met le laser pour faire l’aller-retour (environ 2,5 secondes), on connaît la distance de la Lune au millimètre près. C’est ainsi qu’on a découvert que la Lune s’éloigne de la Terre d’environ 3,8 centimètres chaque année. Ces mesures servent aussi à tester la théorie de la relativité d’Einstein.",
    today: "C’est l’une des rares expériences d’Apollo encore actives. Sur les milliers de milliards de photons envoyés, seuls quelques-uns reviennent : les scientifiques ont donc besoin de grands télescopes et de détecteurs très sensibles.",
    fun: "Les rétroréflecteurs fonctionnent comme les catadioptres d’un vélo ou les bandes réfléchissantes d’un gilet de sécurité. La même idée, mais à 384 000 kilomètres de distance !"
  },
  "eagle-etapa-descenso": {
    name: "Étage de descente de l’Eagle", mission: "Apollo 11",
    arrived: "20 juillet 1969", ended: "21 juillet 1969",
    place: "Mer de la Tranquillité",
    stats: [["Masse totale du module", "15 103 kg"], ["Temps à la surface", "21 h 36 min"], ["Roches rapportées", "21,55 kg"]],
    story: "Le module lunaire Eagle s’est posé le 20 juillet 1969 dans la mer de la Tranquillité. Il avait deux parties : celle du haut transportait Neil Armstrong et Buzz Aldrin ; celle du bas, avec ses pieds dorés, était le moteur d’atterrissage. Michael Collins les attendait en orbite. Les astronautes ont marché environ 250 mètres, sans jamais s’éloigner de plus de 100 m du vaisseau. En partant, la partie haute a décollé en utilisant celle du bas comme rampe de lancement, et l’étage de descente est resté pour toujours sur la Lune.",
    science: "L’étage de descente mesurait 4,2 m de large et ses pieds étaient écartés de 9,4 m. Son moteur, d’environ 45 000 newtons de poussée, pouvait accélérer et ralentir comme la pédale d’une voiture, ce qui était indispensable pour se poser en douceur. Les astronautes ont laissé l’ensemble scientifique EASEP (48 kg, avec des panneaux solaires), qui a fonctionné jusqu’en août 1969, et un miroir laser encore utilisé aujourd’hui.",
    today: "Il est toujours à sa place, avec cinq autres étages de descente d’Apollo. La sonde LRO a photographié le site : on distingue le vaisseau et les chemins laissés par les pas. La partie haute, en revanche, est restée en orbite et personne ne sait où elle est tombée.",
    fun: "À côté du vaisseau, ils ont laissé le drapeau, des objets en mémoire d’explorateurs disparus et une plaque sur un pied qui dit : « Ici, des hommes de la planète Terre ont posé le pied sur la Lune pour la première fois. Juillet 1969 apr. J.-C. Nous sommes venus en paix au nom de toute l’humanité. »"
  },
  "falcon-apollo-15": {
    name: "Module lunaire Falcon", mission: "Apollo 15",
    arrived: "30 juillet 1971", ended: "2 août 1971 (décollage)",
    place: "Hadley-Apennins, mer des Pluies",
    stats: [["Temps sur la Lune", "66 h 55 min"], ["Trajet en rover", "27,9 km"], ["Roches rapportées", "77,31 kg"]],
    story: "Le 30 juillet 1971, David Scott et James Irwin ont posé le Falcon au pied des monts Apennins, pendant qu’Alfred Worden les attendait en orbite. C’était la première mission à emporter une voiture lunaire pliée dans le vaisseau. En trois sorties totalisant 18 heures et 35 minutes, ils ont parcouru 27,9 km : ils ont visité le bord de la rainure Hadley et le pied des montagnes. Ils sont restés presque trois jours sur la Lune, plus longtemps que quiconque avant eux.",
    science: "Ils ont laissé une station ALSEP avec sept instruments, dont un sismomètre, un magnétomètre et un appareil mesurant la chaleur qui sort de l’intérieur de la Lune. Son énergie venait d’un générateur SNAP-27 d’environ 70 watts, avec près de 4 kg de plutonium 238, et elle a fonctionné jusqu’au 30 septembre 1977. Ils ont rapporté 77,31 kg de roches et de sol lunaire.",
    today: "À Hadley se trouvent encore l’étage de descente, le rover, la station ALSEP et une plaque. La partie haute du vaisseau a été larguée et s’est écrasée sur la Lune le 3 août 1971, exprès, pour que les sismomètres mesurent la secousse.",
    fun: "Scott a lâché un marteau et une plume en même temps : ils ont touché le sol ensemble, car il n’y a pas d’air sur la Lune ! Ils ont aussi laissé une petite figurine en mémoire de 14 explorateurs de l’espace disparus."
  },
  "alsep-sismometros": {
    name: "Stations scientifiques ALSEP", mission: "Apollo 12, 14, 15, 16 et 17",
    arrived: "Novembre 1969 (Apollo 12)", ended: "30 septembre 1977",
    place: "Cinq sites d’atterrissage Apollo",
    stats: [["Stations", "5"], ["Années de mesures", "presque 8"], ["Source d’énergie", "plutonium 238"]],
    story: "Les astronautes ne pouvaient rester que quelques jours sur la Lune, mais ils voulaient continuer à l’écouter après leur départ. Ils ont donc laissé de petits laboratoires automatiques appelés ALSEP. Chacun avait des sismomètres, des capteurs de chaleur, des détecteurs de vent solaire et une antenne pour envoyer des données vers la Terre. Pendant presque huit ans, ces stations ont transmis des informations sans relâche, jusqu’à ce que la NASA les éteigne en 1977.",
    science: "Les sismomètres ont découvert que la Lune a des « séismes lunaires ». Pour étudier son intérieur, la NASA a volontairement écrasé des morceaux de fusées sur la surface. Après l’un de ces impacts, la Lune a vibré comme une cloche pendant près d’une heure. Grâce à ces vibrations, on a appris que la Lune a des couches : une croûte, un manteau et un noyau. L’énergie venait d’un générateur qui transformait la chaleur du plutonium en électricité.",
    today: "Les stations sont toujours sur la Lune, éteintes. Leurs données, elles, sont encore étudiées : des scientifiques les analysent aujourd’hui avec des ordinateurs modernes et trouvent de nouveaux séismes lunaires passés inaperçus.",
    fun: "Apollo 11 avait emporté une version plus simple appelée EASEP. Son sismomètre a même enregistré les pas d’Armstrong et d’Aldrin qui marchaient à côté."
  },
  "surveyor-3": {
    mission: "Programme Surveyor",
    arrived: "20 avril 1967", ended: "Mai 1967",
    place: "Océan des Tempêtes",
    stats: [["Rebonds à l’atterrissage", "3"], ["Visiteurs humains", "2"], ["Années d’attente", "2,5"]],
    story: "Avant d’envoyer des humains, la NASA devait savoir si le sol lunaire supporterait le poids d’un vaisseau. Pour cela, elle a envoyé les robots Surveyor. Surveyor 3 a eu un atterrissage mouvementé : ses moteurs ne se sont pas coupés à temps et il a rebondi trois fois avant de s’immobiliser. Malgré tout, il a fonctionné, pris des milliers de photos et creusé des tranchées avec son bras. Deux ans et demi plus tard, il a reçu une visite inattendue : les astronautes d’Apollo 12 se sont posés à environ 180 mètres.",
    science: "Sa pelle mécanique a montré que la surface était ferme, comme du sable mouillé tassé, et qu’un vaisseau habité ne s’enfoncerait pas. Quand Pete Conrad et Alan Bean ont rendu visite à Surveyor 3, ils ont découpé sa caméra et d’autres pièces pour les rapporter sur Terre. Les scientifiques ont ainsi pu étudier comment l’environnement lunaire abîme les matériaux après des années d’exposition.",
    today: "La plus grande partie du vaisseau est toujours dans l’océan des Tempêtes. Sa caméra se trouve au Musée national de l’air et de l’espace du Smithsonian, à Washington.",
    fun: "Pendant des années, on a dit que des bactéries terrestres avaient survécu dans la caméra. Aujourd’hui, on pense qu’elle a été contaminée en l’ouvrant sur Terre : une belle leçon sur le fait que la science revérifie toujours ses résultats."
  },
  "lcross": {
    arrived: "Juin 2009 (lancement)", ended: "9 octobre 2009",
    place: "Cratère Cabeus, pôle Sud lunaire",
    stats: [["Impacts", "2"], ["Écart entre les chocs", "4 minutes"], ["Découverte", "de l’eau"]],
    story: "Certains vaisseaux terminent leur mission en s’écrasant… exprès. LCROSS a voyagé vers la Lune avec l’étage supérieur de sa fusée, appelé Centaur. Près du pôle Sud, les deux se sont séparés. D’abord, le Centaur s’est écrasé au fond sombre du cratère Cabeus et a soulevé un énorme nuage de poussière. LCROSS a traversé ce nuage en mesurant tout ce qu’il pouvait, puis, quatre minutes plus tard, il s’est écrasé à son tour.",
    science: "Le fond de certains cratères polaires ne reçoit jamais la lumière du Soleil et c’est l’un des endroits les plus froids du système solaire. Les scientifiques soupçonnaient qu’il pouvait y avoir de la glace cachée. Les instruments de LCROSS ont détecté de l’eau dans le nuage de matière soulevé. C’était une preuve clé que la Lune garde de la glace à ses pôles.",
    today: "Les restes de LCROSS et du Centaur se trouvent dans le cratère Cabeus. Leur découverte guide aujourd’hui les projets d’exploration du pôle Sud lunaire, où l’eau pourrait servir à boire ou à fabriquer du carburant.",
    fun: "Beaucoup de gens se sont réunis avec des télescopes pour regarder le choc en espérant un grand éclair… qu’on n’a pas vu depuis la Terre. L’important était dans les données, pas dans le spectacle."
  },
  "lro": {
    arrived: "Juin 2009", ended: "Toujours en orbite",
    place: "Orbite lunaire",
    stats: [["Années en orbite", "plus de 17"], ["Lancé avec", "LCROSS"], ["Photos des sites Apollo", "les 6"]],
    story: "Ce vaisseau n’est pas abandonné : c’est le gardien de tout ce que les autres ont laissé. LRO est arrivé à la Lune en 2009 et depuis, il tourne autour en prenant des photos et en mesurant sa surface. Grâce à lui, on peut voir depuis la Terre les modules Apollo, les rovers garés et même les chemins tracés par les bottes des astronautes.",
    science: "LRO a réalisé les cartes de la Lune les plus détaillées qui existent. Sa caméra peut distinguer des objets de la taille d’une table, et d’autres instruments mesurent la température du sol et cherchent de la glace dans les cratères. Ces cartes servent à choisir des endroits sûrs pour les futures missions habitées.",
    today: "Il est toujours actif après plus de 17 ans, bien plus que prévu. C’est comme une archive vivante : chaque nouvelle photo aide à voir comment la surface change et à trouver de nouveaux cratères creusés par des météorites.",
    fun: "LRO a photographié les endroits où d’autres vaisseaux se sont écrasés, comme les sondes jumelles GRAIL, et a ainsi confirmé le point exact de leurs impacts."
  },
  "viking-1": {
    mission: "Programme Viking",
    arrived: "20 juillet 1976", ended: "Novembre 1982",
    place: "Chryse Planitia",
    stats: [["Années de travail", "plus de 6"], ["Premières photos en couleur", "depuis la surface"], ["Expériences sur la vie", "3"]],
    story: "Le 20 juillet 1976, exactement sept ans après le premier pas sur la Lune, Viking 1 s’est posé sur Mars. C’était le premier vaisseau américain à fonctionner avec succès à la surface martienne. Il a envoyé des photos d’un paysage rouge plein de roches sous un ciel couleur caramel. Pendant plus de six ans, il a mesuré la météo martienne jour après jour, jusqu’à ce qu’une erreur dans un ordre envoyé depuis la Terre coupe la communication en 1982.",
    science: "Viking emportait un petit laboratoire pour chercher la vie : il prélevait du sol avec un bras, le mélangeait avec des nutriments et regardait si « quelque chose » respirait ou mangeait. Les résultats étaient confus et la plupart des scientifiques ont conclu qu’il n’y avait pas de vie, mais une chimie du sol très étrange. Ces questions ont guidé toutes les missions vers Mars qui ont suivi.",
    today: "Le vaisseau est toujours à Chryse Planitia, silencieux. Il a été rebaptisé « Station commémorative Thomas Mutch », en l’honneur du chef de l’équipe d’imagerie.",
    fun: "Son jumeau, Viking 2, s’est posé dans une autre région et a photographié du givre recouvrant le sol martien en hiver."
  },
  "sojourner-pathfinder": {
    name: "Sojourner et Pathfinder",
    arrived: "4 juillet 1997", ended: "27 septembre 1997",
    place: "Ares Vallis",
    stats: [["Poids du rover", "10,6 kg"], ["Vitesse maximale", "1 cm/s"], ["Mission prévue", "7 jours"]],
    story: "Pathfinder est arrivé sur Mars d’une façon très amusante : enveloppé dans des airbags géants, il a rebondi sur le sol comme un ballon avant de s’arrêter. En s’ouvrant, il a laissé sortir Sojourner, un rover de la taille d’un four à micro-ondes. C’était le premier véhicule à roues à rouler sur une autre planète. Il devait fonctionner une semaine et il a travaillé presque trois mois, en étudiant des roches que l’équipe a baptisées avec des noms de dessins animés.",
    science: "Sojourner avait un instrument qui analysait de quoi étaient faites les roches. Il a découvert des roches arrondies et des galets comme ceux que laissent les rivières, signes que de l’eau a coulé autrefois dans cette région. La mission a aussi prouvé qu’on pouvait se poser à moindre coût avec des airbags, une idée reprise ensuite par Spirit et Opportunity.",
    today: "L’atterrisseur Pathfinder, appelé « Station commémorative Carl Sagan », et le petit Sojourner sont toujours à Ares Vallis, à quelques mètres l’un de l’autre.",
    fun: "Le nom Sojourner a été proposé par une fille de 12 ans, Valerie Ambroise, lors d’un concours scolaire. Elle l’a choisi en l’honneur de Sojourner Truth, militante des droits civiques."
  },
  "spirit": {
    arrived: "4 janvier 2004", ended: "Mars 2010 (dernier contact)",
    place: "Cratère Gusev",
    stats: [["Mission prévue", "90 jours"], ["A duré", "plus de 6 ans"], ["Distance parcourue", "7,7 km"]],
    story: "Spirit est arrivé sur Mars pour une mission de trois mois et a travaillé plus de six ans. En 2006, une de ses roues s’est bloquée, alors l’équipe a décidé de le conduire en marche arrière, en traînant la roue cassée. En 2009, il s’est retrouvé coincé dans du sable mou, à un endroit appelé Troy. Les ingénieurs ont essayé de le libérer pendant des mois, mais l’hiver martien est arrivé et Spirit a cessé de répondre en mars 2010.",
    science: "Sa roue cassée s’est révélée très utile : en la traînant, Spirit a gratté le sol et mis au jour une matière blanche de silice presque pure. Sur Terre, cette matière se forme dans des sources chaudes ou de la vapeur volcanique, des endroits où les microbes adorent vivre. Ainsi, un accident est devenu l’une de ses plus grandes découvertes.",
    today: "Spirit est toujours coincé à Troy, couvert de poussière. Sa mission a été déclarée terminée en mai 2011.",
    fun: "Spirit et son jumeau Opportunity ont été lancés à un mois d’écart et se sont posés de part et d’autre de Mars."
  },
  "opportunity": {
    arrived: "25 janvier 2004", ended: "Juin 2018 (dernier contact)",
    place: "Meridiani Planum",
    stats: [["Mission prévue", "90 jours"], ["A duré", "plus de 14 ans"], ["Distance parcourue", "45 km"]],
    story: "Opportunity, « Oppy » pour les intimes, a eu un atterrissage chanceux : il a rebondi et a fini pile à l’intérieur d’un petit cratère, comme un trou en un au golf. Il devait travailler 90 jours et il est resté actif plus de 14 ans, parcourant plus qu’un marathon. En juin 2018, une tempête de poussière a recouvert toute la planète, caché la lumière du Soleil, et ses panneaux solaires ont cessé de se recharger.",
    science: "Opportunity a trouvé de petites sphères d’un minéral appelé hématite, que l’équipe a surnommées « myrtilles ». Sur Terre, ces sphères se forment généralement avec de l’eau. Avec d’autres roches en couches, elles ont prouvé que Meridiani avait autrefois de l’eau liquide, peut-être salée et acide.",
    today: "Il repose dans la vallée Perseverance, au bord du cratère Endeavour. La NASA a envoyé plus de mille appels avant de déclarer la mission terminée en février 2019.",
    fun: "La phrase « Ma batterie est faible et il commence à faire nuit » est devenue célèbre. Ce n’était pas un vrai message : c’est une traduction poétique de ses dernières données faite par un journaliste."
  },
  "phoenix": {
    arrived: "25 mai 2008", ended: "2 novembre 2008",
    place: "Vastitas Borealis, Arctique martien",
    stats: [["Jours de travail", "environ 160"], ["Découverte", "de la glace d’eau"], ["Livres à bord", "un DVD entier"]],
    story: "Phoenix est allé dans un endroit que personne n’avait visité : les plaines glacées près du pôle Nord de Mars. Avec son bras robotisé, il a creusé des tranchées et trouvé de petits morceaux blancs et brillants. Quelques jours plus tard, ils avaient disparu. Que s’était-il passé ? C’était de la glace d’eau qui s’était transformée en vapeur au contact du Soleil. Quand l’hiver martien est arrivé, Phoenix s’est retrouvé sans lumière et a cessé de communiquer.",
    science: "Phoenix a confirmé qu’il y a de la glace d’eau sous le sol de l’Arctique martien. Il a aussi découvert du perchlorate, un sel qui peut abaisser la température à laquelle l’eau gèle, et il a observé de la neige tomber des nuages, même si elle s’évaporait avant de toucher le sol.",
    today: "Des photos prises des années plus tard depuis l’orbite ont montré que ses panneaux solaires se sont brisés sous le poids de la glace de dioxyde de carbone accumulée dessus pendant l’hiver.",
    fun: "Phoenix est une bibliothèque sur Mars ! Il transporte un DVD appelé « Visions de Mars », avec des romans, des nouvelles et de l’art sur la planète rouge, ainsi que des milliers de noms de personnes, destiné aux futurs explorateurs."
  },
  "insight": {
    arrived: "26 novembre 2018", ended: "21 décembre 2022",
    place: "Elysium Planitia",
    stats: [["Séismes martiens détectés", "1 319"], ["Plus fort séisme", "magnitude 4,7"], ["Années d’écoute", "4"]],
    story: "InSight n’est pas venu regarder le paysage : il est venu écouter le cœur de Mars. Il a installé un sismomètre si sensible qu’il pouvait sentir des vibrations plus petites que la largeur d’un atome. Pendant quatre ans, il a enregistré plus d’un millier de « séismes martiens ». Mais la poussière martienne a peu à peu recouvert ses panneaux solaires, jusqu’à ce qu’il cesse de répondre en décembre 2022.",
    science: "Les ondes des séismes martiens traversent l’intérieur de la planète et changent selon ce qu’elles rencontrent, comme une échographie. Grâce à elles, les scientifiques ont mesuré l’épaisseur de la croûte de Mars et découvert que son noyau est liquide et plus grand que prévu. InSight avait aussi une foreuse, « la taupe », qui n’a pas réussi à s’enfoncer car le sol se tassait.",
    today: "InSight est toujours à Elysium Planitia, couvert de poussière. Ses données servent encore à comprendre comment se forment les planètes rocheuses, y compris la Terre.",
    fun: "InSight a aussi détecté des impacts de météorites. Ensuite, des sondes en orbite ont photographié les cratères tout neufs, et certains avaient mis de la glace à nu !"
  },
  "ingenuity": {
    mission: "Mars 2020 (hélicoptère)",
    arrived: "18 février 2021", ended: "18 janvier 2024 (dernier vol)",
    place: "Valinor Hills, cratère Jezero",
    stats: [["Vols (5 prévus)", "72"], ["Temps dans les airs", "128,8 min"], ["Distance parcourue en vol", "17 km"]],
    story: "Ingenuity a quitté la Terre le 30 juillet 2020, caché sous le rover Perseverance, et il est arrivé au cratère Jezero le 18 février 2021. C’était une expérience : il ne devait pas faire plus de cinq vols d’essai en 30 jours. Le 19 avril 2021, il s’est envolé et il est devenu la première machine à réaliser un vol motorisé et contrôlé sur une autre planète. Finalement, il a volé 72 fois en presque trois ans. Son dernier vol a eu lieu le 18 janvier 2024.",
    science: "L’air de Mars est moins de 1 % aussi dense que celui de la Terre. C’est pourquoi, avec seulement 1,8 kg, Ingenuity avait besoin de pales de 1,2 m tournant à environ 2 400 tours par minute. Un panneau solaire rechargeait ses batteries. Au total, il a volé 128,8 minutes et 17 km, il est monté jusqu’à 24 mètres et il a atteint 10 m/s. Il a aussi servi d’éclaireur aérien pour guider le rover.",
    today: "La NASA a déclaré sa mission terminée le 25 janvier 2024, quand ses pales ont été endommagées. Il ne vole plus, mais il est toujours sur les dunes de Valinor Hills, programmé pour se réveiller et enregistrer des données comme une petite station d’essai.",
    fun: "Le 25 avril 2021, il a pris la première photo du rover Perseverance vue du ciel. Et il emporte un petit morceau de toile du Flyer des frères Wright, le premier avion à moteur de la Terre."
  },
  "deposito-three-forks": {
    name: "Dépôt d’échantillons Three Forks",
    arrived: "Décembre 2022 à janvier 2023", ended: "En attente",
    place: "Three Forks, cratère Jezero",
    stats: [["Tubes déposés", "10"], ["Taille de chaque tube", "comme un feutre"], ["Contenu", "roche, sol et air"]],
    story: "Tout ce qu’on laisse dans l’espace n’est pas abandonné : certaines choses sont mises de côté. Entre décembre 2022 et janvier 2023, le rover Perseverance a déposé avec soin dix tubes métalliques sur le sol du cratère Jezero, à un endroit appelé Three Forks. À l’intérieur, il y a des morceaux de roche, de la poussière martienne et même un échantillon d’air. C’est une sorte de coffre-fort de secours pour l’avenir.",
    science: "Il y a des milliards d’années, Jezero était un lac avec le delta d’une rivière. Sur Terre, ce type de roches garde des traces de vie ancienne. Les analyser dans des laboratoires terrestres, avec des appareils impossibles à emporter sur Mars, pourrait répondre à la grande question : y a-t-il déjà eu de la vie sur Mars ?",
    today: "Les tubes sont toujours alignés sur le sol, en zigzag pour être faciles à retrouver. Comment et quand les ramener sur Terre est encore en discussion.",
    fun: "L’un des tubes est un « tube témoin » : il ne contient pas de roche, mais permet de savoir si les autres ont pu être contaminés par des matériaux venus de la Terre."
  },
  "maven": {
    arrived: "21 septembre 2014", ended: "Décembre 2025 (dernier contact)",
    place: "Orbite martienne",
    stats: [["Années en orbite", "11"], ["Question clé", "où est passé l’air ?"], ["Fin de mission", "2026"]],
    story: "Il y a très longtemps, Mars avait une atmosphère plus épaisse et peut-être des rivières et des lacs. Aujourd’hui, c’est un désert froid avec une atmosphère très fine. MAVEN est arrivé en 2014 pour résoudre le mystère : où est passé cet air ? Pendant onze ans, il a tourné autour de la planète en mesurant les gaz qui s’échappent vers l’espace. En décembre 2025, il a cessé de communiquer et, après des mois de tentatives, la NASA a déclaré la mission terminée en 2026.",
    science: "MAVEN a découvert que le vent solaire, un flot de particules venant du Soleil, arrache peu à peu l’atmosphère de Mars, surtout pendant les tempêtes solaires. Comme Mars a perdu son champ magnétique protecteur, elle est restée exposée. Il a aussi servi d’antenne, en relayant vers la Terre les messages des rovers.",
    today: "MAVEN tourne toujours autour de Mars, mais en silence. Son départ a laissé moins de vaisseaux pour surveiller la planète, dont la flotte vieillit déjà.",
    fun: "MAVEN emportait un DVD avec plus d’un millier de haïkus sur Mars, écrits et choisis par des gens du monde entier."
  },
  "voyager-1": {
    mission: "Programme Voyager",
    arrived: "5 septembre 1977 (lancement)", ended: "Envoie toujours des données",
    place: "Espace interstellaire",
    stats: [["Années de voyage", "49"], ["Instruments allumés", "2 sur 10"], ["Distance", "presque 1 jour-lumière"]],
    story: "Voyager 1 est l’objet fabriqué par l’humain qui est allé le plus loin. Lancé en 1977, il a visité Jupiter et Saturne, et en 2012 il est sorti de la bulle que le Soleil crée autour de lui pour entrer dans l’espace interstellaire. Ses signaux mettent presque une journée entière pour arriver sur Terre. Pour économiser l’énergie, l’équipe éteint ses instruments un par un : aujourd’hui, il n’en reste que deux allumés.",
    science: "Voyager 1 a découvert des volcans actifs sur Io, une lune de Jupiter, et étudié l’atmosphère de Titan, la grande lune de Saturne. Maintenant, il mesure les particules et les champs magnétiques d’une région qu’aucun autre vaisseau n’avait atteinte. Il fonctionne avec un générateur nucléaire qui perd environ 4 watts de puissance chaque année.",
    today: "Il est toujours en vie presque 49 ans après son lancement. Chaque instrument éteint prolonge un peu sa vie. Un jour, son signal n’arrivera plus, mais le vaisseau continuera de voyager parmi les étoiles.",
    fun: "En 1990, il a tourné sa caméra et photographié la Terre à 6 milliards de km : un « point bleu pâle ». Il emporte aussi un disque d’or avec des salutations en 55 langues, de la musique et des sons de notre planète."
  },
  "voyager-2": {
    mission: "Programme Voyager",
    arrived: "20 août 1977 (lancement)", ended: "Envoie toujours des données",
    place: "Espace interstellaire",
    stats: [["Planètes visitées", "4"], ["Seule visite à", "Uranus et Neptune"], ["Entrée dans l’espace interstellaire", "2018"]],
    story: "Voyager 2 a décollé deux semaines avant son jumeau, mais par une route plus longue. Il a profité d’un alignement des planètes qui se produit tous les 175 ans pour sauter de l’une à l’autre comme dans une course de relais. Il est passé près de Jupiter, Saturne, Uranus et Neptune. À ce jour, c’est le seul vaisseau à avoir visité Uranus et Neptune. En 2018, il a lui aussi franchi la frontière de l’espace interstellaire.",
    science: "Il a utilisé la gravité de chaque planète comme une fronde pour gagner de la vitesse et changer de direction, une technique appelée assistance gravitationnelle. Il a découvert de nouvelles lunes et de nouveaux anneaux autour d’Uranus et de Neptune, et il a photographié une grande tache sombre sur Neptune, une tempête géante.",
    today: "Comme Voyager 1, il envoie toujours des données avec très peu d’instruments allumés, car son énergie s’épuise lentement. L’équipe choisit avec soin ce qu’il faut éteindre pour qu’il dure le plus longtemps possible.",
    fun: "Il emporte le même disque d’or que Voyager 1. On y entend la pluie, les battements d’un cœur et une mère qui parle à son bébé."
  },
  "pioneer-10": {
    mission: "Programme Pioneer",
    arrived: "2 mars 1972 (lancement)", ended: "23 janvier 2003 (dernier signal)",
    place: "En route vers l’étoile Aldébaran",
    stats: [["Mission prévue", "21 mois"], ["A duré", "plus de 30 ans"], ["Masse", "258 kg"]],
    story: "Pioneer 10 a décollé le 2 mars 1972 de Cap Canaveral. Personne ne savait si un vaisseau pouvait traverser la ceinture d’astéroïdes sans être détruit. Il y est entré le 15 juillet 1972, l’a traversée sain et sauf et, le 4 décembre 1973, il est passé à 130 354 km de Jupiter. Ce fut le premier vaisseau à aller au-delà de Mars, à visiter Jupiter et à franchir l’orbite de Neptune (13 juin 1983). Il était conçu pour 21 mois… et il a fonctionné plus de 30 ans.",
    science: "Il a pris environ 500 photos de Jupiter, où l’on voit clairement la Grande Tache rouge, et la première image rapprochée de la lune Ganymède. Il a découvert que les radiations de Jupiter étaient bien plus fortes que prévu, une information vitale pour protéger les Voyager. Il était alimenté par deux générateurs nucléaires SNAP-19 (environ 140 watts près de Jupiter) : ce fut le premier vaisseau entièrement à énergie nucléaire.",
    today: "Son dernier signal est arrivé le 23 janvier 2003 depuis 12,23 milliards de km : il a mis 11 heures et 20 minutes à arriver ! En 2017, il se trouvait à environ 118,8 fois la distance Terre-Soleil. Il voyage en silence vers l’étoile Aldébaran, dans le Taureau, qu’il croisera dans environ deux millions d’années.",
    fun: "En quittant la Terre, il a atteint 51 682 km/h, plus vite que n’importe quel objet humain de son époque. Il emporte une plaque en aluminium avec un homme, une femme et une carte de 14 pulsars qui indique où se trouve le Soleil."
  },
  "pioneer-11": {
    mission: "Programme Pioneer",
    arrived: "6 avril 1973 (lancement)", ended: "30 septembre 1995 (dernier contact)",
    place: "En route vers la constellation du Sagittaire",
    stats: [["Premier à visiter", "Saturne"], ["Photos de Saturne", "440"], ["Masse", "258,5 kg"]],
    story: "Pioneer 11 était le jumeau de Pioneer 10. Il a décollé le 6 avril 1973 et traversé la ceinture d’astéroïdes sans une égratignure. Le 3 décembre 1974, il est passé à seulement 42 500 km des nuages de Jupiter, trois fois plus près que son jumeau, à 171 000 km/h. Ensuite, il a utilisé la gravité de Jupiter comme une fronde et, le 1er septembre 1979, il est devenu le premier vaisseau à visiter Saturne.",
    science: "Il a pris les premières photos des pôles de Jupiter et 440 images du système de Saturne. Il a découvert l’anneau F, un anneau fin à l’extérieur des anneaux principaux, et une petite lune d’environ 200 km. Il a mesuré pour la première fois le champ magnétique de Saturne et la température de Titan : 193 degrés sous zéro !",
    today: "Le 23 février 1990, il a franchi l’orbite de Neptune. Le dernier contact a eu lieu le 30 septembre 1995, à 44,1 fois la distance Terre-Soleil. Aujourd’hui, il voyage en silence vers le centre de la galaxie, en direction du Sagittaire, et passera près de l’étoile Lambda Aquilae dans presque quatre millions d’années.",
    fun: "Comme Pioneer 10, il emporte une plaque dorée avec un message pour les extraterrestres. C’était l’idée de l’astronome Carl Sagan : il voulait que celui qui la trouverait sache qui l’a envoyée et d’où."
  },
  "new-horizons": {
    arrived: "19 janvier 2006 (lancement)", ended: "Toujours dans la ceinture de Kuiper",
    place: "Ceinture de Kuiper",
    stats: [["A visité Pluton", "2015"], ["A visité Arrokoth", "2019"], ["Vitesse de lancement", "record"]],
    story: "Quand New Horizons a décollé en 2006, Pluton n’était qu’une tache floue dans les télescopes. Il a voyagé neuf ans et demi pour y arriver. Le 14 juillet 2015, il est passé près de Pluton et nous a montré un monde incroyable, avec des montagnes de glace et un grand « cœur » blanc. Ensuite, il a continué jusqu’à Arrokoth, un rocher glacé en forme de bonhomme de neige, l’objet le plus lointain jamais exploré de près.",
    science: "Il a découvert que Pluton a des glaciers d’azote qui coulent lentement, des montagnes de glace d’eau et une atmosphère bleutée. Arrokoth a montré comment se sont assemblés les premiers blocs qui ont formé les planètes, il y a plus de 4,5 milliards d’années.",
    today: "Il est toujours actif, il voyage dans la ceinture de Kuiper et étudie la poussière et les particules de cette région lointaine du système solaire.",
    fun: "Il emporte une petite partie des cendres de Clyde Tombaugh, l’astronome qui a découvert Pluton en 1930."
  }
};
window.SCENES_I18N.fr = {
  "spirit": [
    ["2004", "Spirit se pose dans le cratère Gusev et commence à explorer. Sa mission devait durer 90 jours."],
    ["2006", "Sa roue avant droite se bloque. L’équipe décide de le conduire en marche arrière, en la traînant."],
    ["Découverte", "La roue traînée gratte le sol et révèle de la silice blanche : signe d’anciennes sources chaudes."],
    ["2009", "Il reste coincé dans le sable mou de Troy. Ses roues tournent, mais il n’avance plus."],
    ["2010", "L’hiver martien arrive. Spirit cesse de répondre après plus de 6 ans."]
  ],
  "ingenuity": [
    ["2021", "Ingenuity voyage caché sous le ventre du rover Perseverance."],
    ["19 avr. 2021", "Premier vol motorisé sur une autre planète : il monte à 3 mètres pendant 39 secondes."],
    ["Vol", "Il devait voler 5 fois… vol n° {n}"],
    ["Janv. 2024", "Au vol 72, une pale se casse. Ingenuity se repose à Valinor Hills en enregistrant des données."]
  ],
  "rover-lunar-lrv": [
    ["1971", "Le rover voyage plié à côté du module lunaire. Les astronautes le déplient en tirant sur des sangles."],
    ["Apollo 15-17", "Avec lui, ils parcourent des kilomètres à la recherche de roches anciennes. Sur la Lune, tout pèse six fois moins."],
    ["Adieu", "En partant, ils le laissent garé. Sa caméra, pilotée depuis la Terre, filme le décollage."],
    ["Aujourd’hui", "Trois rovers sont toujours là. Sans vent ni pluie, leurs traces ne s’effacent pas."]
  ],
  "retrorreflectores-apollo": [
    ["1969", "Armstrong et Aldrin installent sur la Lune un panneau de 100 prismes de verre."],
    ["Depuis la Terre", "Un observatoire envoie un rayon laser vers le panneau."],
    ["2,5 secondes", "Les prismes renvoient la lumière d’où elle vient : aller-retour en 2,5 secondes."],
    ["Aujourd’hui", "En mesurant ce temps, on a découvert que la Lune s’éloigne de 3,8 cm par an. Il fonctionne toujours !"]
  ],
  "voyager-1": [
    ["1977", "Voyager 1 quitte la Terre en direction des planètes géantes."],
    ["1979", "Il passe près de Jupiter et découvre des volcans actifs sur sa lune Io."],
    ["1980", "Il visite Saturne et étudie l’atmosphère de Titan, sa plus grande lune."],
    ["1990", "Il tourne sa caméra et photographie la Terre : un « point bleu pâle » à 6 milliards de km."],
    ["2012", "Il traverse la bulle du Soleil et entre dans l’espace interstellaire."],
    ["Aujourd’hui", "À presque un jour-lumière de chez nous, seuls 2 de ses 10 instruments sont encore allumés."]
  ],
  "new-horizons": [
    ["2006", "New Horizons décolle : le vaisseau le plus rapide jamais lancé depuis la Terre à ce moment-là."],
    ["2015", "Après neuf ans et demi, il atteint Pluton et découvre un immense « cœur » de glace."],
    ["2019", "Il visite Arrokoth, un rocher glacé en forme de bonhomme de neige."],
    ["Aujourd’hui", "Il est toujours actif et explore la ceinture de Kuiper, aux confins du système solaire."]
  ]
};
