export interface Scenario {
  id: string;
  icon: string;
  category: 'licenciement' | 'contentieux' | 'conformite' | 'urssaf' | 'audit' | 'rupture' | 'abonnement' | 'ia' | 'atmp';
  title: string;
  subtitle: string;
  situation: string;
  params: {
    salaire: number;
    anciennete?: number;
    effectif?: number;
    montantRedressement?: number;
  };
  risqueSansAvocat: {
    label: string;
    montantMin: number;
    montantMax: number;
    details: string[];
  };
  missionDairia: {
    label: string;
    honoraires: number;
    dureeJours: number;
    details: string[];
  };
  valeurCreee: {
    ratio: number; // pour 1 EUR investi, X EUR securises
    pointsCles: string[];
  };
}

export const CATEGORIES = [
  { id: 'all', label: 'Tous les cas' },
  { id: 'licenciement', label: 'Licenciement' },
  { id: 'contentieux', label: 'Contentieux' },
  { id: 'conformite', label: 'Conformite' },
  { id: 'urssaf', label: 'URSSAF' },
  { id: 'audit', label: 'Audit social' },
  { id: 'rupture', label: 'Rupture' },
  { id: 'abonnement', label: 'Abonnement' },
  { id: 'ia', label: 'DAIRIA IA' },
  { id: 'atmp', label: 'GérerMesATMP' },
] as const;

export const SCENARIOS: Scenario[] = [
  {
    id: 'licenciement-cadre',
    icon: '1',
    category: 'licenciement',
    title: 'Licenciement d\'un cadre senior',
    subtitle: 'Insuffisance professionnelle',
    situation: 'Un cadre a 65 000 EUR brut annuel, 12 ans d\'anciennete. L\'entreprise souhaite le licencier pour insuffisance professionnelle mais n\'a pas documente les faits ni mene d\'entretiens prealables structures.',
    params: { salaire: 65000, anciennete: 12 },
    risqueSansAvocat: {
      label: 'Risque sans accompagnement',
      montantMin: 32500,
      montantMax: 65000,
      details: [
        'Bareme Macron : 6 a 12 mois de salaire brut (anciennete 12 ans)',
        'Indemnite legale de licenciement : ~21 600 EUR',
        'Risque de requalification en licenciement sans cause reelle',
        'Frais de procedure (avocat adverse, expertise) : 5 000 a 15 000 EUR',
        'Temps DRH mobilise : 40h+ estimees',
      ],
    },
    missionDairia: {
      label: 'Mission DAIRIA',
      honoraires: 5000,
      dureeJours: 4,
      details: [
        'Audit du dossier et evaluation du risque',
        'Construction du dossier factuel (entretiens, courriers)',
        'Securisation de la procedure de licenciement',
        'Redaction de la lettre de licenciement',
      ],
    },
    valeurCreee: {
      ratio: 10,
      pointsCles: [
        'Risque prud\'homal elimine ou fortement reduit',
        'Procedure inattaquable sur la forme',
        'Dossier factuel solide en cas de contestation',
        'Temps DRH divise par 3',
      ],
    },
  },
  {
    id: 'faute-grave',
    icon: '2',
    category: 'licenciement',
    title: 'Licenciement pour faute grave',
    subtitle: 'Conteste aux prud\'hommes',
    situation: 'Un salarie a 42 000 EUR, 6 ans d\'anciennete, est licencie pour faute grave (insubordination repetee). Il conteste et reclame l\'integralite des indemnites plus des dommages et interets.',
    params: { salaire: 42000, anciennete: 6 },
    risqueSansAvocat: {
      label: 'Risque sans accompagnement',
      montantMin: 21000,
      montantMax: 42000,
      details: [
        'Si la faute grave n\'est pas retenue : indemnite de preavis (2-3 mois)',
        'Bareme Macron : 3 a 6 mois de salaire (6 ans d\'anciennete)',
        'Indemnite legale de licenciement : ~7 000 EUR',
        'Frais d\'avocat et procedure : 4 000 a 8 000 EUR',
        'Risque d\'execution provisoire',
      ],
    },
    missionDairia: {
      label: 'Mission DAIRIA',
      honoraires: 5000,
      dureeJours: 4,
      details: [
        'Analyse de la qualification de faute grave',
        'Preparation du dossier de defense employeur',
        'Representation devant le CPH',
        'Strategie de negociation si necessaire',
      ],
    },
    valeurCreee: {
      ratio: 6,
      pointsCles: [
        'Maintien de la qualification faute grave dans 80% des cas',
        'Reduction significative des condamnations',
        'Evitement de l\'execution provisoire',
        'Securisation de la position employeur',
      ],
    },
  },
  {
    id: 'controle-urssaf',
    icon: '3',
    category: 'urssaf',
    title: 'Controle URSSAF',
    subtitle: 'Redressement avantages en nature',
    situation: 'L\'URSSAF notifie un redressement de 85 000 EUR portant sur la requalification de frais professionnels en avantages en nature (vehicules, repas, telephones). L\'entreprise a 120 salaries.',
    params: { salaire: 0, effectif: 120, montantRedressement: 85000 },
    risqueSansAvocat: {
      label: 'Risque sans accompagnement',
      montantMin: 85000,
      montantMax: 127500,
      details: [
        'Redressement principal : 85 000 EUR',
        'Majorations de retard (5 a 10%) : 4 250 a 8 500 EUR',
        'Penalites pour mauvaise foi (40%) potentielles : 34 000 EUR',
        'Regularisation sur 3 ans supplementaires si pratique maintenue',
        'Impact sur les bulletins de paie et declarations sociales',
      ],
    },
    missionDairia: {
      label: 'Mission DAIRIA',
      honoraires: 5000,
      dureeJours: 4,
      details: [
        'Analyse detaillee de la lettre d\'observations',
        'Contestation argumentee point par point',
        'Negociation avec l\'inspecteur du recouvrement',
        'Mise en conformite pour l\'avenir',
        'Accompagnement CRA si necessaire',
      ],
    },
    valeurCreee: {
      ratio: 15,
      pointsCles: [
        'Reduction moyenne de 40 a 60% du redressement constatee',
        'Annulation des majorations pour mauvaise foi',
        'Securisation des pratiques pour les prochains controles',
        'Gain de temps direction : 80h+ economisees',
      ],
    },
  },
  {
    id: 'forfait-jours',
    icon: '4',
    category: 'conformite',
    title: 'Mise en conformite forfait jours',
    subtitle: 'Risque de rappel d\'heures supplementaires',
    situation: 'Une entreprise de 200 salaries a 45 cadres en forfait jours. L\'accord collectif date de 2008 et ne respecte pas les exigences jurisprudentielles actuelles. Trois salaries ont quitte l\'entreprise et menacent de reclamer des heures supplementaires.',
    params: { salaire: 55000, anciennete: 5, effectif: 45 },
    risqueSansAvocat: {
      label: 'Risque sans accompagnement',
      montantMin: 120000,
      montantMax: 450000,
      details: [
        'Rappel d\'heures sup par salarie : 20 000 a 80 000 EUR (3 ans)',
        'Pour 3 reclamants : 60 000 a 240 000 EUR',
        'Effet domino : si les 45 cadres reclament, exposition > 1M EUR',
        'Indemnite forfaitaire pour travail dissimule : 6 mois de salaire',
        'Risque penal en cas de travail dissimule avere',
      ],
    },
    missionDairia: {
      label: 'Mission DAIRIA',
      honoraires: 12000,
      dureeJours: 10,
      details: [
        'Audit complet de l\'accord forfait jours existant',
        'Redaction d\'un nouvel accord conforme',
        'Negociation avec les IRP / CSE',
        'Securisation des conventions individuelles',
        'Formation des managers au suivi de la charge',
        'Defense sur les 3 contentieux en cours',
      ],
    },
    valeurCreee: {
      ratio: 25,
      pointsCles: [
        'Neutralisation de l\'effet domino sur les 45 cadres',
        'Reduction du risque de 450K EUR a quasi-zero pour l\'avenir',
        'Accord negocie conforme a la jurisprudence 2024',
        'Defense optimisee sur les contentieux existants',
      ],
    },
  },
  {
    id: 'contentieux-hsup',
    icon: '5',
    category: 'contentieux',
    title: 'Contentieux heures supplementaires',
    subtitle: 'Defense employeur aux prud\'hommes',
    situation: 'Un ancien salarie (technicien, 38 000 EUR, 9 ans d\'anciennete) reclame 3 ans de rappel d\'heures supplementaires, repos compensateurs et indemnite pour travail dissimule. Demande totale : 67 000 EUR.',
    params: { salaire: 38000, anciennete: 9 },
    risqueSansAvocat: {
      label: 'Risque sans accompagnement',
      montantMin: 25000,
      montantMax: 67000,
      details: [
        'Rappel d\'heures supplementaires : jusqu\'a 35 000 EUR',
        'Repos compensateurs non pris : 8 000 EUR',
        'Indemnite travail dissimule (6 mois) : 19 000 EUR',
        'Conges payes sur rappel : 3 500 EUR',
        'Article 700 : 2 000 a 3 000 EUR',
      ],
    },
    missionDairia: {
      label: 'Mission DAIRIA',
      honoraires: 5000,
      dureeJours: 4,
      details: [
        'Analyse detaillee des decomptes du salarie',
        'Constitution du dossier de defense (pointages, plannings)',
        'Contestation de la charge de la preuve',
        'Conclusions de defense et plaidoirie',
      ],
    },
    valeurCreee: {
      ratio: 8,
      pointsCles: [
        'Reduction moyenne des condamnations de 50 a 70%',
        'Elimination de l\'indemnite travail dissimule dans 90% des cas',
        'Jurisprudence favorable exploitee',
        'Prevention des reclamations similaires',
      ],
    },
  },
  {
    id: 'rupture-conventionnelle',
    icon: '6',
    category: 'rupture',
    title: 'Rupture conventionnelle complexe',
    subtitle: 'Cadre dirigeant en difficulte',
    situation: 'Un directeur commercial (95 000 EUR, 15 ans d\'anciennete) souhaite negocier sa sortie. Contexte de tension, risque de harcelement moral invoque, arret maladie en cours.',
    params: { salaire: 95000, anciennete: 15 },
    risqueSansAvocat: {
      label: 'Risque sans accompagnement',
      montantMin: 80000,
      montantMax: 190000,
      details: [
        'Indemnite legale plancher : ~39 500 EUR',
        'Si contentieux : bareme Macron 6 a 15 mois = 47 500 a 118 750 EUR',
        'Demande de dommages et interets harcelement : 20 000 a 50 000 EUR',
        'Frais de procedure : 8 000 a 15 000 EUR',
        'Risque mediatique et climat social degrade',
      ],
    },
    missionDairia: {
      label: 'Mission DAIRIA',
      honoraires: 5500,
      dureeJours: 5,
      details: [
        'Evaluation precise du risque juridique',
        'Strategie de negociation calibree',
        'Redaction du protocole transactionnel',
        'Accompagnement dans les echanges',
        'Securisation fiscale et sociale de l\'accord',
      ],
    },
    valeurCreee: {
      ratio: 18,
      pointsCles: [
        'Negociation maitrisee avec enveloppe optimisee',
        'Protocole transactionnel blinde',
        'Evitement du contentieux (18 mois de procedure)',
        'Preservation du climat social interne',
      ],
    },
  },
  {
    id: 'audit-social',
    icon: '7',
    category: 'audit',
    title: 'Audit social preventif',
    subtitle: 'PME en croissance (80 salaries)',
    situation: 'Une PME en forte croissance (80 salaries, +30% en 2 ans) n\'a jamais fait auditer ses pratiques RH. Contrats anciens, accords non mis a jour, gestion du temps de travail approximative, classifications non revisees.',
    params: { salaire: 0, effectif: 80 },
    risqueSansAvocat: {
      label: 'Risque sans accompagnement',
      montantMin: 150000,
      montantMax: 500000,
      details: [
        'Risque forfait jours (20 cadres) : 100 000 a 300 000 EUR',
        'Risque URSSAF sur avantages en nature : 30 000 a 60 000 EUR',
        'Non-conformite temps de travail : 20 000 a 80 000 EUR',
        'Classifications erronees : rappels de salaire potentiels',
        'Risque penal pour travail dissimule',
        'Amende administrative pour non-respect des obligations',
      ],
    },
    missionDairia: {
      label: 'Mission DAIRIA',
      honoraires: 15000,
      dureeJours: 12,
      details: [
        'Audit 360 : contrats, accords, pratiques, paie',
        'Cartographie des risques avec scoring par gravite',
        'Plan d\'action priorise avec feuille de route',
        'Mise en conformite des documents critiques',
        'Formation equipe RH',
        'Suivi post-audit a 6 mois',
      ],
    },
    valeurCreee: {
      ratio: 20,
      pointsCles: [
        'Identification de 8 a 12 risques majeurs en moyenne',
        'Exposition financiere reduite de 80%+ apres correction',
        'Base RH solide pour la croissance future',
        'Equipe RH autonome sur les sujets cles',
      ],
    },
  },
  {
    id: 'inaptitude',
    icon: '8',
    category: 'licenciement',
    title: 'Procedure d\'inaptitude',
    subtitle: 'Licenciement post accident du travail',
    situation: 'Un salarie (35 000 EUR, 7 ans) est declare inapte suite a un accident du travail. L\'employeur doit gerer la procedure de reclassement puis le licenciement pour inaptitude, avec les regles protectrices renforcees de l\'origine professionnelle.',
    params: { salaire: 35000, anciennete: 7 },
    risqueSansAvocat: {
      label: 'Risque sans accompagnement',
      montantMin: 35000,
      montantMax: 70000,
      details: [
        'Indemnite speciale de licenciement (double) : ~11 600 EUR',
        'Indemnite de preavis (non execute) : 5 800 EUR',
        'Si procedure irreguliere : 12 mois de salaire = 35 000 EUR',
        'Dommages et interets manquement obligation securite : 10 000 a 20 000 EUR',
        'Risque faute inexcusable : rente majoree',
      ],
    },
    missionDairia: {
      label: 'Mission DAIRIA',
      honoraires: 3500,
      dureeJours: 3,
      details: [
        'Audit de la procedure d\'inaptitude',
        'Recherche de reclassement documentee',
        'Redaction de la lettre de licenciement',
        'Calcul securise des indemnites speciales',
      ],
    },
    valeurCreee: {
      ratio: 13,
      pointsCles: [
        'Procedure conforme aux exigences renforcees AT/MP',
        'Reclassement documente de maniere inattaquable',
        'Calcul exact des indemnites speciales',
        'Prevention de la contestation sur la forme',
      ],
    },
  },
  {
    id: 'pse-pme',
    icon: '9',
    category: 'licenciement',
    title: 'PSE en PME',
    subtitle: 'Restructuration de 15 postes',
    situation: 'Une PME de 90 salaries doit supprimer 15 postes pour raisons economiques. Elle doit mettre en place un PSE, consulter le CSE, respecter les criteres d\'ordre et proposer des mesures d\'accompagnement.',
    params: { salaire: 40000, effectif: 15 },
    risqueSansAvocat: {
      label: 'Risque sans accompagnement',
      montantMin: 200000,
      montantMax: 600000,
      details: [
        'Annulation du PSE par le DREETS : tous les licenciements nuls',
        'Indemnites pour 15 salaries (12 mois min si nul) : 600 000 EUR',
        'Risque de reintegration forcee',
        'Procedure suspendue = cout de maintien des salaries',
        'Atteinte a l\'image et climat social detruit',
      ],
    },
    missionDairia: {
      label: 'Mission DAIRIA',
      honoraires: 25000,
      dureeJours: 20,
      details: [
        'Elaboration du PSE et du document unilateral',
        'Pilotage de la procedure de consultation CSE',
        'Criteres d\'ordre et categorisation des postes',
        'Mesures d\'accompagnement (reclassement, formation)',
        'Depot et validation DREETS',
        'Suivi des licenciements individuels',
      ],
    },
    valeurCreee: {
      ratio: 16,
      pointsCles: [
        'PSE valide par le DREETS du premier coup',
        'Zero contentieux sur la procedure collective',
        'Mesures d\'accompagnement calibrees au budget',
        'Calendrier maitrise de bout en bout',
      ],
    },
  },
  {
    id: 'transaction',
    icon: '10',
    category: 'rupture',
    title: 'Transaction post-licenciement',
    subtitle: 'Eviter 18 mois de procedure',
    situation: 'Un salarie licencie (48 000 EUR, 10 ans d\'anciennete) menace de saisir les prud\'hommes. Il invoque un licenciement abusif et reclame des dommages et interets. L\'employeur prefere transiger pour eviter l\'incertitude judiciaire.',
    params: { salaire: 48000, anciennete: 10 },
    risqueSansAvocat: {
      label: 'Risque sans accompagnement',
      montantMin: 28000,
      montantMax: 60000,
      details: [
        'Bareme Macron (10 ans) : 6 a 12,5 mois = 24 000 a 50 000 EUR',
        'Frais de procedure (18-24 mois) : 6 000 a 12 000 EUR',
        'Temps mobilise direction/RH : 30h+ sur 18 mois',
        'Incertitude sur l\'issue (alea judiciaire)',
        'Risque d\'execution provisoire',
      ],
    },
    missionDairia: {
      label: 'Mission DAIRIA',
      honoraires: 3500,
      dureeJours: 3,
      details: [
        'Evaluation precise du risque contentieux',
        'Calibrage de l\'enveloppe transactionnelle',
        'Redaction du protocole transactionnel',
        'Securisation des clauses (renonciation, confidentialite)',
      ],
    },
    valeurCreee: {
      ratio: 11,
      pointsCles: [
        'Economie de 18 mois de procedure',
        'Enveloppe transactionnelle optimisee (30 a 50% sous le risque max)',
        'Protocole juridiquement blinde',
        'Serenite retrouvee pour la direction',
      ],
    },
  },
  {
    id: 'abonnement-groupe',
    icon: '11',
    category: 'abonnement',
    title: 'Abonnement accompagnement groupe',
    subtitle: 'Acces illimite a un avocat dedie',
    situation: 'Un groupe de 250 salaries avec 4 entites gere en interne ses problematiques RH. En moyenne 3 contentieux/an, 2 controles URSSAF sur 3 ans, des procédures disciplinaires regulieres et des questions juridiques quotidiennes. Sans abonnement, chaque intervention est facturee a l\'acte.',
    params: { salaire: 0, effectif: 250 },
    risqueSansAvocat: {
      label: 'Cout sans abonnement (annuel)',
      montantMin: 120000,
      montantMax: 250000,
      details: [
        '3 contentieux CPH/an a 5 000 EUR : 15 000 EUR',
        'Consultations ponctuelles (estimees 60h/an a 250 EUR/h) : 15 000 EUR',
        'Redaction/revision actes (estimees 40h/an) : 10 000 EUR',
        'Risque d\'erreurs sans conseil permanent : 50 000 a 150 000 EUR/an',
        'Accompagnement URSSAF ponctuel : 5 000 a 10 000 EUR',
        'Temps perdu a chercher un avocat disponible a chaque besoin',
      ],
    },
    missionDairia: {
      label: 'Abonnement DAIRIA',
      honoraires: 78000,
      dureeJours: 260,
      details: [
        'Hotline juridique illimitee (9h30-18h)',
        'Relecture et revision de tous les actes juridiques',
        'Accompagnement procedures disciplinaires',
        'Accompagnement precontentieux URSSAF',
        'Contentieux CPH inclus (max 5 000 EUR/dossier)',
        'Honoraire de resultat 10% en matiere URSSAF',
        'Acces e-business et espace relation client',
      ],
    },
    valeurCreee: {
      ratio: 2,
      pointsCles: [
        'Avocat dedie qui connait votre entreprise',
        'Reactivite immediate (pas de devis ni delai)',
        'Prevention des risques en amont = moins de contentieux',
        'Budget juridique previsible et maitrise',
        'ROI reel souvent x3 a x5 grace aux erreurs evitees',
      ],
    },
  },
  {
    id: 'abonnement-pme',
    icon: '12',
    category: 'abonnement',
    title: 'Abonnement PME / Association',
    subtitle: 'Securite juridique au quotidien',
    situation: 'Une association ou PME de 30 salaries n\'a pas de DRH. Le dirigeant gere lui-meme les sujets sociaux avec des risques d\'erreur eleves. Il fait face a 1-2 contentieux par an et des questions juridiques regulieres sans conseil permanent.',
    params: { salaire: 0, effectif: 30 },
    risqueSansAvocat: {
      label: 'Cout sans abonnement (annuel)',
      montantMin: 25000,
      montantMax: 80000,
      details: [
        '1-2 contentieux CPH/an (avocat ponctuel) : 8 000 a 12 000 EUR',
        'Consultations ponctuelles (30h/an a 250 EUR/h) : 7 500 EUR',
        'Erreur sur un licenciement : 10 000 a 30 000 EUR',
        'Non-conformite decouverte lors d\'un controle : 5 000 a 20 000 EUR',
        'Temps dirigeant perdu sur les sujets juridiques',
      ],
    },
    missionDairia: {
      label: 'Abonnement DAIRIA',
      honoraires: 15600,
      dureeJours: 260,
      details: [
        'Conseil juridique illimite en droit du travail',
        'Gestion des contentieux incluse',
        'Hotline juridique (appels illimites)',
        'Relecture de tous vos contrats et documents',
        'Reponses a vos questions juridiques precises',
        'Accompagnement procedures disciplinaires',
      ],
    },
    valeurCreee: {
      ratio: 3,
      pointsCles: [
        'Un "DRH externe" specialise pour 1 300 EUR/mois',
        'Zero surprise : budget juridique fixe et previsible',
        'Dirigeant libere des sujets RH complexes',
        'Chaque erreur evitee = plusieurs mois d\'abonnement rembourses',
        'ROI reel souvent x5 a x10 avec les contentieux evites',
      ],
    },
  },
  {
    id: 'dairia-ia-drh',
    icon: '13',
    category: 'ia',
    title: 'DAIRIA IA pour une DRH solo',
    subtitle: 'IA juridique 24/7 a 90 EUR/mois',
    situation: 'Une DRH seule gere 150 salaries. Elle passe en moyenne 8h/semaine a chercher des reponses juridiques (Google, appels avocat, recherche de jurisprudence). Elle hesite entre un avocat ponctuel (250 EUR/h) et DAIRIA IA (90 EUR HT/mois) connecte a Legifrance, BOSS, conventions collectives et jurisprudence.',
    params: { salaire: 0, effectif: 150 },
    risqueSansAvocat: {
      label: 'Cout sans outil IA (annuel)',
      montantMin: 15000,
      montantMax: 45000,
      details: [
        'Consultations avocat ponctuelles (60h/an a 250 EUR/h) : 15 000 EUR',
        'Temps DRH perdu en recherche (8h/sem x 46 sem) : 368h = 18 400 EUR de cout salarial',
        'Risque d\'erreur sur reponse non sourcee (Google) : 5 000 a 15 000 EUR',
        'Delai de reponse avocat (24-72h) = procedures bloquees',
        'Veille juridique non realisee = surprises reglementaires',
      ],
    },
    missionDairia: {
      label: 'Abonnement DAIRIA IA',
      honoraires: 1080,
      dureeJours: 365,
      details: [
        '90 EUR HT/mois, sans engagement',
        'Reponses sourcees en 2 minutes (Legifrance, BOSS, KALI, JORF)',
        'Profil entreprise contextuel (CCN, effectif, contrats)',
        'Dashboard d\'anticipation avec alertes scorees urgence/risque',
        'Veille personnalisee push (jurisprudence, decrets, avenants CCN)',
        'Disponible 24/7, y compris le dimanche soir a 23h',
      ],
    },
    valeurCreee: {
      ratio: 25,
      pointsCles: [
        'Temps de recherche divise par 10 (de 8h a 45min/semaine)',
        'Reponses sourcees et fiables vs Google = zero risque d\'erreur',
        '1 080 EUR/an vs 15 000 EUR de consultations ponctuelles',
        'Veille automatisee = plus de surprise reglementaire',
        'DRH autonome sur 90% des questions du quotidien',
      ],
    },
  },
  {
    id: 'dairia-ia-cabinet',
    icon: '14',
    category: 'ia',
    title: 'DAIRIA IA pour un expert-comptable',
    subtitle: 'Repondre aux questions sociales des clients',
    situation: 'Un cabinet d\'expertise comptable de 8 collaborateurs gere 200 dossiers de paie. Les clients posent regulierement des questions de droit social auxquelles le cabinet ne sait pas repondre. Aujourd\'hui, soit il renvoie vers un avocat (perte de valeur), soit il tente une reponse non securisee (risque).',
    params: { salaire: 0, effectif: 200 },
    risqueSansAvocat: {
      label: 'Manque a gagner annuel',
      montantMin: 20000,
      montantMax: 60000,
      details: [
        'Clients perdus car pas de conseil social integre : 10 000 a 25 000 EUR',
        'Reponses erronees = mise en cause du cabinet : risque 5 000 a 20 000 EUR',
        'Temps collaborateurs sur recherches juridiques (5h/sem) : 12 000 EUR/an',
        'Opportunite manquee : facturer du conseil social a valeur ajoutee',
        'Dependance a un avocat externe non disponible = frustration client',
      ],
    },
    missionDairia: {
      label: 'Abonnement DAIRIA IA',
      honoraires: 1080,
      dureeJours: 365,
      details: [
        '90 EUR HT/mois pour tout le cabinet',
        'Reponses immediates connectees aux sources legales officielles',
        'Permet de repondre aux clients en direct sans renvoyer vers un avocat',
        'Monetisation possible : facturer le conseil social en plus',
        'Memos pratiques integres sur les sujets courants (AT/MP, conges, ruptures)',
        'Powered by Claude — IA de derniere generation',
      ],
    },
    valeurCreee: {
      ratio: 35,
      pointsCles: [
        'Transformation du cabinet en "guichet unique" paie + droit social',
        'Nouveaux revenus de conseil social : 15 000 a 30 000 EUR/an',
        'Fidelisation clients grace a la reactivite',
        'Zero risque sur les reponses (sourcees et tracees)',
        'ROI de x35 : 1 080 EUR investis pour 30 000+ EUR de valeur',
      ],
    },
  },
  {
    id: 'atmp-pme',
    icon: '15',
    category: 'atmp',
    title: 'Optimisation taux AT/MP — PME BTP',
    subtitle: 'GererMesATMP vs gestion manuelle',
    situation: 'Une PME du BTP (60 salaries) subit 5-8 accidents du travail par an. Son taux AT/MP est a 8,5% (secteur median). L\'entreprise ne conteste jamais les AT reconnus et ne formule aucune reserve. Le cout annuel cotisation AT/MP est de 120 000 EUR.',
    params: { salaire: 0, effectif: 60, montantRedressement: 120000 },
    risqueSansAvocat: {
      label: 'Surcoat annuel sans optimisation',
      montantMin: 15000,
      montantMax: 40000,
      details: [
        'Taux AT/MP subi sans contestation = surprime estimee 15 a 40%',
        'AT reconnus par defaut (absence de reserves) : impact taux N+2, N+3',
        'Aucune strategie de contestation = 0 EUR recupere',
        'Temps RH perdu en declarations manuelles : 4h par AT',
        'Majorations pour declarations tardives potentielles',
        'Maladies professionnelles non detectees pesant sur le taux',
      ],
    },
    missionDairia: {
      label: 'Plateforme GererMesATMP',
      honoraires: 2400,
      dureeJours: 365,
      details: [
        'Declaration guidee avec detection d\'erreurs en temps reel',
        'Generation automatique de reserves motivees',
        'Contestation automatisee (saisines, recours)',
        'Assistant IA pour analyse documentaire et strategies',
        'Tableau de bord centralise (dossiers, delais, equipes)',
        'Support juridique integre 5j/7',
      ],
    },
    valeurCreee: {
      ratio: 8,
      pointsCles: [
        'Reduction du taux AT/MP de 15 a 30% en moyenne sur 2 ans',
        'Economies annuelles : 10 000 a 35 000 EUR de cotisations',
        'Temps de gestion AT divise par 3 (de 4h a 1h20 par dossier)',
        'Reserves motivees = enquete CPAM declenchee sur 70% des cas',
        'ROI : 2 400 EUR investis pour 10 000+ EUR economises',
      ],
    },
  },
  {
    id: 'atmp-eti',
    icon: '16',
    category: 'atmp',
    title: 'Gestion AT/MP multi-sites — ETI',
    subtitle: 'Centraliser et automatiser avec GererMesATMP',
    situation: 'Une ETI industrielle (450 salaries, 4 sites) gere 15-25 AT/an. Chaque site gere ses propres declarations de maniere heterogene. Pas de suivi centralise des delais. Plusieurs contestations ont ete perdues pour vices de forme. Le cout AT/MP total est de 380 000 EUR/an.',
    params: { salaire: 0, effectif: 450, montantRedressement: 380000 },
    risqueSansAvocat: {
      label: 'Surcout annuel gestion eclatee',
      montantMin: 50000,
      montantMax: 120000,
      details: [
        'Contestations perdues pour vice de forme : 20 000 a 40 000 EUR/an',
        'Declarations tardives (depassement 48h) : majorations et penalites',
        'Taux AT/MP subi sans optimisation multi-sites : surprime 50 000+ EUR',
        'Temps RH cumule 4 sites : 2 ETP dedies estimees',
        'Absence de statistiques = impossible d\'anticiper et prevenir',
        'Risque contentieux salarie (faute inexcusable) non detecte',
      ],
    },
    missionDairia: {
      label: 'Plateforme GererMesATMP — Multi-sites',
      honoraires: 6000,
      dureeJours: 365,
      details: [
        'Tableau de bord multi-sites centralise',
        'Workflow automatise par site avec alertes delais',
        'Contestation automatisee avec IA : reserves, saisines, recours',
        'Statistiques et analyses de tendances par site',
        'Support juridique integre + avocat pour dossiers complexes',
        'Formation des referents sites',
      ],
    },
    valeurCreee: {
      ratio: 12,
      pointsCles: [
        '-70% de temps de gestion RH sur les AT/MP',
        'Economies annuelles estimees : 40 000 a 80 000 EUR',
        'Zero contestation perdue pour vice de forme',
        'Taux AT/MP optimise grace a la contestation systematique',
        'Donnees centralisees = prevention ciblee par site',
      ],
    },
  },
];
