export const investigators = {
  'Agnes Baker': {
    name: 'Agnes Baker',
    title: 'The Waitress',
    stats: {
      willpower: 5,
      intellect: 2,
      combat: 2,
      health: 6,
      sanity: 8,
      resources: 0,
      clues: 0,
      doom: 0,
    },
    startingItem: {
      item: {
        name: 'Heirloom of Hyperborea',
        description: 'If you succeed in a test using your WILLPOWER, gain +1 resource',
        uses: -1
      }
    },
    majorAbility: {
      name: 'Sorcerer',
      description: 'When you take horror: Deal 1 damage to an enemy at your location.',
      uses: -1
    },
    majorWeakness: {
      name: 'Dark Memories',
      description: 'Each time you spend a CLUE, roll a dice. On a roll of a 1, Agnes loses -1 SANITY.'
    },
    items: [],
    abilities: ['Mystic', 'Sorcery', 'Arcane Studies'],
    weaknesses: ['Haunted']
  },
  'Rex Murphy': {
    name: 'Rex Murphy',
    title: 'The Reporter',
    stats: {
      willpower: 3,
      intellect: 4,
      combat: 2,
      health: 6,
      sanity: 9,
      resources: 0,
      clues: 1,
      doom: 0,
    },
    startingItem: {
      item: {
        name: 'Reporter\'s Notebook',
        description: 'You begin with +1 CLUE.',
        uses: 0
      }
    },
    majorAbility: {
      name: 'Reporter',
      description: 'If you roll a 6 while using your INTELLECT, gain +1 CLUE.',
      uses: -1
    },
    majorWeakness: {
      name: 'Rex\'s Curse',
      description: 'If you roll a double when using your INTELLECT or WILLPOWER, treat the score on each dice as a 1.'
    },
    items: [],
    abilities: ['Seeker'],
    weaknesses: ['Cursed']
  },
  'Nathaniel Cho': {
    name: 'Nathaniel Cho',
    title: 'The Boxer',
    stats: {
      willpower: 3,
      intellect: 2,
      combat: 5,
      health: 9,
      sanity: 6,
      resources: 0,
      clues: 0,
      doom: 0,
    },
    startingItem: {
      item: {
        name: 'Hidden Weapon',
        description: 'Once per adventure, you may add +3 to your COMBAT.',
        uses: 1
      }
    },
    majorAbility: {
      name: 'Boxer',
      description: 'If you roll a 6 while using your COMBAT, add +1 to your total score. (If you are rolling more than one dice, add +1 for each 6. you roll.)',
      uses: -1
    },
    majorWeakness: {
      name: 'Hunted By The Mob',
      description: 'Each time you gain a RESOURCE, roll a die. If the score is below your current number of RESOURCE, do not gain a RESOURCE.'
    },
    items: [],
    abilities: ['Guardian', 'Fighter', 'Tough'],
    weaknesses: ['Criminal']
    },
    'Stella Clark': {
    name: 'Stella Clark',
    title: 'The Letter Carrier',
    stats: {
      willpower: 3,
      intellect: 2,
      combat: 3,
      health: 8,
      sanity: 8,
      resources: 0,
      clues: 0,
      doom: 0,
    },
   startingItem: {
     item: {
       name: 'Mailbag',
       description: 'Whenever you gain an ITEM, if you do not already gain 1 RESOURCE, gain 1 RESOURCE',
       uses: -1
     }
   },
   majorAbility: {
     name: 'Nor Gloom Of Night',
     description: 'When you roll less than the required score in any test using your WILLPOWER, choose to gain 1 RESOURCE, 1 HEALTH or 1 SANITY. You may not increase your HEALTH or SANITY above their starting level using this ability',
     uses: -1
   },
   majorWeakness: {
     name: 'Called By The Mists',
     description: 'Whenever you lose SANITY, roll one dice. (If you are in Kingsport, roll two dice and pick the highest.) If the score is higher than your current SANITY, lose 1 RESOURCE.'
   },
   items: [],
   abilities: ['Survivor', 'Tough', 'Civic'],
   weaknesses: ['Haunted']
    },
    'Amanda Sharpe': {
    name: 'Amanda Sharpe',
    title: 'The Student',
    stats: {
      willpower: 2,
      intellect: 2,
      combat: 2,
      health: 7,
      sanity: 7,
      resources: 0,
      clues: 2,
      doom: 0,
    },
   startingItem: {
     item: {
       name: 'Obscure Tome',
       description: 'You begin the adventure with 2 CLUES.',
       uses: 0
     }
   },
   majorAbility: {
     name: 'Scholar',
     description: 'Whenever you spend a CLUE or RESOURCE as part of a test, if the test is successful, gain 1 CLUE or 1 RESOURCE (your choice).',
     uses: -1
   },
   majorWeakness: {
     name: 'Whispers Of The Deep',
     description: 'Whenever you lose SANITY, also lose 1 RESOURCE or 1 CLUE (your choice).'
   },
   items: [],
   abilities: ['Seeker', 'Academic', 'Arcane Studies'],
   weaknesses: ['Troubled', 'Dreams']
    },
    'Skids O\'Toole': {
    name: 'Skids O\'Toole',
    title: 'The Ex-Con',
    stats: {
      willpower: 2,
      intellect: 3,
      combat: 3,
      health: 8,
      sanity: 6,
      resources: 6,
      clues: 0,
      doom: 0,
    },
   startingItem: {
     item: {
       name: '.45 Automatic',
       description: 'Start with 6 ammo. When a test allows you to spend a RESOURCE to add to your COMBAT, you may spend 1 ammo, instead.',
       uses: 6
     }
   },
   majorAbility: {
     name: 'Ex-Con',
     description: 'You may spend 1 RESOURCE to attempt any failed test again. Repeat the test using the same number of dice you used the first time and counting any other modifiers the same. You can only repeat each failed test once.',
     uses: -1
   },
   majorWeakness: {
     name: 'Hospital Debts',
     description: 'When you spend a RESOURCE, lose one additional RESOURCE (if you have one).'
   },
   items: [],
   abilities: ['Rogue'],
   weaknesses: ['Criminal']
    }
};