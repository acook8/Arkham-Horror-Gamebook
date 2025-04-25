import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import GameStart from './components/GameStart';

const App = () => {
  const [gameStarted, setGameStarted] = useState(() => {
    const savedInvestigator = localStorage.getItem('investigator');
    return savedInvestigator ? true : false;
  });

  const [investigator, setInvestigator] = useState(() => {
    const savedInvestigator = localStorage.getItem('investigator');
    if (!savedInvestigator) return null;

    const parsedInvestigator = JSON.parse(savedInvestigator);
    
    // Handle migration from old format
    if (!parsedInvestigator.startingItem && parsedInvestigator.majorItem) {
      return {
        ...parsedInvestigator,
        startingItem: parsedInvestigator.majorItem,
        majorAbility: parsedInvestigator.majorAbility,
        majorWeakness: parsedInvestigator.majorWeakness,
        items: parsedInvestigator.items || [],
        abilities: parsedInvestigator.abilities || [],
        weaknesses: parsedInvestigator.weaknesses || []
      };
    }

    // Initialize uses if not present
    if (parsedInvestigator.startingItem?.item?.uses > 0 && parsedInvestigator.startingItem.item.currentUses === undefined) {
      parsedInvestigator.startingItem.item.currentUses = parsedInvestigator.startingItem.item.uses;
    }
    if (parsedInvestigator.majorAbility?.uses > 0 && parsedInvestigator.majorAbility.currentUses === undefined) {
      parsedInvestigator.majorAbility.currentUses = parsedInvestigator.majorAbility.uses;
    }

    return parsedInvestigator;
  });

  const [newItem, setNewItem] = useState('');
  const [newAbility, setNewAbility] = useState('');
  const [newWeakness, setNewWeakness] = useState('');
  const [showItemForm, setShowItemForm] = useState(false);
  const [showAbilityForm, setShowAbilityForm] = useState(false);
  const [showWeaknessForm, setShowWeaknessForm] = useState(false);
  const [diceResults, setDiceResults] = useState([]);
  const [itemInputRef] = useState(() => React.createRef());
  const [abilityInputRef] = useState(() => React.createRef());
  const [weaknessInputRef] = useState(() => React.createRef());
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const [showBookmarkForm, setShowBookmarkForm] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);

  useEffect(() => {
    if (investigator) {
      localStorage.setItem('investigator', JSON.stringify(investigator));
    }
  }, [investigator]);

  useEffect(() => {
    if (gameStarted) {
      localStorage.setItem('gameStarted', 'true');
    } else {
      localStorage.removeItem('gameStarted');
    }
  }, [gameStarted]);

  useEffect(() => {
    if (showItemForm) itemInputRef.current?.focus();
  }, [showItemForm]);

  useEffect(() => {
    if (showAbilityForm) abilityInputRef.current?.focus();
  }, [showAbilityForm]);

  useEffect(() => {
    if (showWeaknessForm) weaknessInputRef.current?.focus();
  }, [showWeaknessForm]);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  const handleSelectInvestigator = (selectedInvestigator) => {
    setInvestigator(selectedInvestigator);
    setGameStarted(true);
  };

  const startNewGame = () => {
    setGameStarted(false);
    setInvestigator(null);
    setCurrentPage(1);
    localStorage.removeItem('investigator');
    localStorage.removeItem('currentPage');
  };

  const updateStat = (stat, delta) => {
    setInvestigator((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: prev.stats[stat] + delta,
      },
    }));
  };

  const addItem = (item) => {
    setInvestigator((prev) => ({
      ...prev,
      items: [...prev.items, item]
    }));
  };

  const removeItem = (itemToRemove) => {
    setInvestigator((prev) => ({
      ...prev,
      items: prev.items.filter(item => item !== itemToRemove)
    }));
  };

  const addAbility = (ability) => {
    setInvestigator((prev) => ({
      ...prev,
      abilities: [...prev.abilities, ability]
    }));
  };

  const removeAbility = (abilityToRemove) => {
    setInvestigator((prev) => ({
      ...prev,
      abilities: prev.abilities.filter(ability => ability !== abilityToRemove)
    }));
  };

  const addWeakness = (weakness) => {
    setInvestigator((prev) => ({
      ...prev,
      weaknesses: [...prev.weaknesses, weakness]
    }));
  };

  const removeWeakness = (weaknessToRemove) => {
    setInvestigator((prev) => ({
      ...prev,
      weaknesses: prev.weaknesses.filter(weakness => weakness !== weaknessToRemove)
    }));
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    switch (type) {
      case 'item':
        if (newItem.trim()) {
          addItem(newItem.trim());
          setNewItem('');
          setShowItemForm(false);
        }
        break;
      case 'ability':
        if (newAbility.trim()) {
          addAbility(newAbility.trim());
          setNewAbility('');
          setShowAbilityForm(false);
        }
        break;
      case 'weakness':
        if (newWeakness.trim()) {
          addWeakness(newWeakness.trim());
          setNewWeakness('');
          setShowWeaknessForm(false);
        }
        break;
    }
  };

  const handleKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e, type);
    }
  };

  // Add useEffect to handle scrolling when dice results change
  useEffect(() => {
    if (diceResults.length > 0) {
      const diceContainer = document.querySelector('.dice-results');
      if (diceContainer) {
        diceContainer.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [diceResults]);

  const rollDice = (numDice) => {
    // Clear previous results first
    setDiceResults([]);
    // Ensure the maximum number of dice is 2
    numDice = Math.min(numDice, 2);
    // Generate new results
    const results = Array.from({ length: numDice }, () =>
      Math.floor(Math.random() * 6) + 1
    );
    // Set new results
    setDiceResults(results);
  };

  const renderDiceSVG = (value, index) => {
    const dot = (cx, cy) => <circle cx={cx} cy={cy} r="3" fill="black" />;
    const positions = {
      1: [dot(25, 25)],
      2: [dot(15, 15), dot(35, 35)],
      3: [dot(15, 15), dot(25, 25), dot(35, 35)],
      4: [dot(15, 15), dot(15, 35), dot(35, 15), dot(35, 35)],
      5: [dot(15, 15), dot(15, 35), dot(25, 25), dot(35, 15), dot(35, 35)],
      6: [dot(15, 15), dot(15, 25), dot(15, 35), dot(35, 15), dot(35, 25), dot(35, 35)],
    };

    return (
      <svg
        key={`dice-${index}-${value}`}
        width="50"
        height="50"
        viewBox="0 0 50 50"
        style={{ border: '0px solid black', margin: '5px' }}
      >
        <rect width="50" height="50" rx="5" fill="white" stroke="black" />
        {positions[value]}
      </svg>
    );
  };

  const calculateEffectiveCombat = (stats) => {
    const baseValue = stats.combat;
    if (stats.health >= 0) return baseValue;
    return Math.max(0, baseValue + stats.health); // Apply penalty based on negative health
  };

  const calculateEffectiveWillpower = (stats) => {
    const baseValue = stats.willpower;
    if (stats.sanity >= 0) return baseValue;
    return Math.max(0, baseValue + stats.sanity); // Apply penalty based on negative sanity
  };

  const updateCurrentPage = (newPage) => {
    if (newPage && !isNaN(newPage) && newPage > 0) {
      setCurrentPage(newPage);
      setShowBookmarkForm(false);
    }
  };

  const handleUse = (type) => {
    setInvestigator(prev => {
      // Create a deep copy of the investigator object
      const updated = JSON.parse(JSON.stringify(prev));
      
      if (type === 'startingItem' && 
          updated.startingItem?.item?.currentUses > 0) {
        updated.startingItem.item.currentUses = updated.startingItem.item.currentUses - 1;
      } else if (type === 'majorAbility' && 
                 updated.majorAbility?.currentUses > 0) {
        updated.majorAbility.currentUses = updated.majorAbility.currentUses - 1;
      }
      
      localStorage.setItem('investigator', JSON.stringify(updated));
      return updated;
    });
  };

  const handleStatClick = useCallback((e, stat) => {
    // Only show tooltip if clicking the stat container itself, not buttons
    if (!e.target.closest('.stat-buttons')) {
      if (stat === 'health' || stat === 'sanity') {
        // Toggle tooltip: close if it's already showing for this stat
        if (activeTooltip === stat) {
          setActiveTooltip(null);
        } else {
          setActiveTooltip(stat);
          // Auto-hide tooltip after 5 seconds
          setTimeout(() => {
            setActiveTooltip(null);
          }, 5000);
        }
      }
    }
  }, [activeTooltip]);

  if (!gameStarted || !investigator) {
    return <GameStart onSelectInvestigator={handleSelectInvestigator} />;
  }

  return (
    <div className="fade-in">
      <div className="header">
        <h1>{investigator.name}</h1>
        {investigator.title && <h2 className="subtitle">{investigator.title}</h2>}
        <button onClick={startNewGame} className="new-game-button">New Game</button>
      </div>

      <div className="bookmark-section">
        <h3>Current Page: {currentPage}</h3>
        {!showBookmarkForm ? (
          <button onClick={() => setShowBookmarkForm(true)} className="bookmark-button">
            Change Page
          </button>
        ) : (
          <form onSubmit={(e) => {
            e.preventDefault();
            const newPage = parseInt(e.target.elements.page.value, 10);
            updateCurrentPage(newPage);
          }} className="bookmark-form">
            <input
              type="number"
              name="page"
              min="1"
              placeholder="Enter page number..."
              className="text-input"
              autoFocus
            />
            <div className="bookmark-buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setShowBookmarkForm(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>

      <h2>Stats</h2>
      <ul className="stats-grid">
        {Object.entries(investigator.stats).map(([stat, value]) => (
          <li 
            key={stat} 
            onClick={(e) => handleStatClick(e, stat)}
            data-health-penalty={stat === 'combat' && investigator.stats.health < 0}
            data-sanity-penalty={stat === 'willpower' && investigator.stats.sanity < 0}
            className={activeTooltip === stat ? 'show-tooltip' : ''}
          >
            <span className="stat-name">{stat.charAt(0).toUpperCase() + stat.slice(1)}</span>
            {(stat === 'health' || stat === 'sanity') && (
              <div className="tooltip">
                {stat === 'health' && "If your health falls below 0, you will suffer a penalty equal to it when using your combat value. Current health penalty: " + 
                  (investigator.stats.health < 0 ? Math.abs(investigator.stats.health) : "none")}
                {stat === 'sanity' && "If your sanity falls below 0, you will suffer a penalty equal to it when using your willpower value. Current sanity penalty: " + 
                  (investigator.stats.sanity < 0 ? Math.abs(investigator.stats.sanity) : "none")}
              </div>
            )}
            <span className="stat-value">
              {stat === 'combat' && investigator.stats.health < 0 ? (
                <>
                  {value} <span className="combat-penalty">({calculateEffectiveCombat(investigator.stats)})</span>
                </>
              ) : stat === 'willpower' && investigator.stats.sanity < 0 ? (
                <>
                  {value} <span className="willpower-penalty">({calculateEffectiveWillpower(investigator.stats)})</span>
                </>
              ) : (
                value
              )}
            </span>
            <div className="stat-buttons">
              <button onClick={() => updateStat(stat, -1)}>-</button>
              <button onClick={() => updateStat(stat, 1)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <h2>Items</h2>
      <div className="item-list">
        <div className="item-entry major-item">
          <div className="item-content">
            <div className="item-header">
              <div className="item-name">{investigator.startingItem.item.name} (Starting)</div>
              {investigator.startingItem.item.uses > 0 && investigator.startingItem.item.currentUses !== undefined && (
                <div className="uses-container">
                  <span className="uses-count">Uses: {investigator.startingItem.item.currentUses}</span>
                  {investigator.startingItem.item.currentUses > 0 && (
                    <button onClick={() => handleUse('startingItem')} className="use-button">Use</button>
                  )}
                </div>
              )}
            </div>
            <div className="item-description">{investigator.startingItem.item.description}</div>
          </div>
        </div>
        {investigator.items.map((item, index) => (
          <li key={index}>
            <div className="item-entry">
              <div className="item-content">
                <div className="item-name">{item}</div>
              </div>
              <button onClick={() => removeItem(item)}>Remove</button>
            </div>
          </li>
        ))}
      </div>
      <form onSubmit={(e) => handleSubmit(e, 'item')} className={`add-form ${!showItemForm ? 'hidden' : ''}`}>
        <input
          ref={itemInputRef}
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, 'item')}
          placeholder="Enter new item..."
          className="text-input"
        />
        <button type="submit">Add</button>
      </form>
      <div className="add-button-container">
        <button onClick={() => setShowItemForm(!showItemForm)}>
          {showItemForm ? 'Cancel' : 'Add Item'}
        </button>
      </div>

      <h2>Abilities</h2>
      <div className="item-list">
        <div className="item-entry major-ability">
          <div className="item-content">
            <div className="item-header">
              <div className="item-name">{investigator.majorAbility.name} (Major)</div>
              {investigator.majorAbility.uses > 0 && investigator.majorAbility.currentUses !== undefined && (
                <div className="uses-container">
                  <span className="uses-count">Uses: {investigator.majorAbility.currentUses}</span>
                  {investigator.majorAbility.currentUses > 0 && (
                    <button onClick={() => handleUse('majorAbility')} className="use-button">Use</button>
                  )}
                </div>
              )}
            </div>
            <div className="item-description">{investigator.majorAbility.description}</div>
          </div>
        </div>
        {investigator.abilities.map((ability, index) => (
          <li key={index}>
            <div className="item-entry">
              <div className="item-content">
                <div className="item-name">{ability}</div>
              </div>
              <button onClick={() => removeAbility(ability)}>Remove</button>
            </div>
          </li>
        ))}
      </div>
      <form onSubmit={(e) => handleSubmit(e, 'ability')} className={`add-form ${!showAbilityForm ? 'hidden' : ''}`}>
        <input
          ref={abilityInputRef}
          type="text"
          value={newAbility}
          onChange={(e) => setNewAbility(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, 'ability')}
          placeholder="Enter new ability..."
          className="text-input"
        />
        <button type="submit">Add</button>
      </form>
      <div className="add-button-container">
        <button onClick={() => setShowAbilityForm(!showAbilityForm)}>
          {showAbilityForm ? 'Cancel' : 'Add Ability'}
        </button>
      </div>

      <h2>Weaknesses</h2>
      <div className="item-list">
        <div className="item-entry major-weakness">
          <div className="item-content">
            <div className="item-name">{investigator.majorWeakness.name} (Major)</div>
            <div className="item-description">{investigator.majorWeakness.description}</div>
          </div>
        </div>
        {investigator.weaknesses.map((weakness, index) => (
          <li key={index}>
            <div className="item-entry">
              <div className="item-content">
                <div className="item-name">{weakness}</div>
              </div>
              <button onClick={() => removeWeakness(weakness)}>Remove</button>
            </div>
          </li>
        ))}
      </div>
      <form onSubmit={(e) => handleSubmit(e, 'weakness')} className={`add-form ${!showWeaknessForm ? 'hidden' : ''}`}>
        <input
          ref={weaknessInputRef}
          type="text"
          value={newWeakness}
          onChange={(e) => setNewWeakness(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, 'weakness')}
          placeholder="Enter new weakness..."
          className="text-input"
        />
        <button type="submit">Add</button>
      </form>
      <div className="add-button-container">
        <button onClick={() => setShowWeaknessForm(!showWeaknessForm)}>
          {showWeaknessForm ? 'Cancel' : 'Add Weakness'}
        </button>
      </div>
      <h2>Roll Dice</h2>
      <div className="dice-container">
        <button onClick={() => rollDice(1)}>Roll 1 Die</button>
        <button onClick={() => rollDice(2)}>Roll 2 Dice</button>
      </div>
      {diceResults.length > 0 && (
        <div className="fade-in dice-results">
          <h3>Dice Results:</h3>
          <div className="dice-container">
            {diceResults.map((result, index) => renderDiceSVG(result, index))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;