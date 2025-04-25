import React, { useState } from 'react';
import { investigators } from '../data/investigators';

const GameStart = ({ onSelectInvestigator }) => {
  const [mode, setMode] = useState(null);
  const [customInvestigator, setCustomInvestigator] = useState({
    name: '',
    title: '',
    stats: {
      willpower: 3,
      intellect: 3,
      combat: 3,
      health: 7,
      sanity: 7,
      resources: 0,
      clues: 0,
      doom: 0,
    },
    startingItem: {
      item: {
        name: '',
        description: ''
      }
    },
    majorAbility: {
      name: '',
      description: ''
    },
    majorWeakness: {
      name: '',
      description: ''
    },
    items: [],
    abilities: [],
    weaknesses: []
  });

  const [startingItemName, setStartingItemName] = useState('');
  const [startingItemDesc, setStartingItemDesc] = useState('');
  const [majorAbilityName, setMajorAbilityName] = useState('');
  const [majorAbilityDesc, setMajorAbilityDesc] = useState('');
  const [majorWeaknessName, setMajorWeaknessName] = useState('');
  const [majorWeaknessDesc, setMajorWeaknessDesc] = useState('');
  const [newItem, setNewItem] = useState('');
  const [newAbility, setNewAbility] = useState('');
  const [newWeakness, setNewWeakness] = useState('');

  const handleCustomStatChange = (stat, delta) => {
    setCustomInvestigator(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: Math.max(0, prev.stats[stat] + delta)
      }
    }));
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      setCustomInvestigator(prev => ({
        ...prev,
        items: [...prev.items, newItem.trim()]
      }));
      setNewItem('');
    }
  };

  const handleAddAbility = () => {
    if (newAbility.trim()) {
      setCustomInvestigator(prev => ({
        ...prev,
        abilities: [...prev.abilities, newAbility.trim()]
      }));
      setNewAbility('');
    }
  };

  const handleAddWeakness = () => {
    if (newWeakness.trim()) {
      setCustomInvestigator(prev => ({
        ...prev,
        weaknesses: [...prev.weaknesses, newWeakness.trim()]
      }));
      setNewWeakness('');
    }
  };

  const handleRemoveItem = (itemToRemove) => {
    setCustomInvestigator(prev => ({
      ...prev,
      items: prev.items.filter(item => item !== itemToRemove)
    }));
  };

  const handleRemoveAbility = (abilityToRemove) => {
    setCustomInvestigator(prev => ({
      ...prev,
      abilities: prev.abilities.filter(ability => ability !== abilityToRemove)
    }));
  };

  const handleRemoveWeakness = (weaknessToRemove) => {
    setCustomInvestigator(prev => ({
      ...prev,
      weaknesses: prev.weaknesses.filter(weakness => weakness !== weaknessToRemove)
    }));
  };

  const handleSubmitCustom = (e) => {
    e.preventDefault();
    if (customInvestigator.name.trim() && 
        startingItemName.trim() && 
        startingItemDesc.trim() &&
        majorAbilityName.trim() && 
        majorAbilityDesc.trim() &&
        majorWeaknessName.trim() && 
        majorWeaknessDesc.trim()) {
      
      const investigator = {
        ...customInvestigator,
        startingItem: {
          item: {
            name: startingItemName.trim(),
            description: startingItemDesc.trim(),
            uses: customInvestigator.startingItem.item.uses || 0,
            currentUses: customInvestigator.startingItem.item.uses || 0
          }
        },
        majorAbility: {
          name: majorAbilityName.trim(),
          description: majorAbilityDesc.trim(),
          uses: customInvestigator.majorAbility.uses || 0,
          currentUses: customInvestigator.majorAbility.uses || 0
        },
        majorWeakness: {
          name: majorWeaknessName.trim(),
          description: majorWeaknessDesc.trim()
        }
      };
      
      onSelectInvestigator(investigator);
    }
  };

  const handlePrebuiltSelect = (investigator) => {
    // Initialize currentUses for prebuilt investigators
    const processedInvestigator = {
      ...investigator,
      startingItem: {
        ...investigator.startingItem,
        item: {
          ...investigator.startingItem.item,
          currentUses: investigator.startingItem.item.uses > 0 ? investigator.startingItem.item.uses : undefined
        }
      },
      majorAbility: {
        ...investigator.majorAbility,
        currentUses: investigator.majorAbility.uses > 0 ? investigator.majorAbility.uses : undefined
      }
    };
    onSelectInvestigator(processedInvestigator);
  };

  if (!mode) {
    return (
      <div className="game-start fade-in">
        <h2>Choose Your Path</h2>
        <div className="start-buttons">
          <button onClick={() => setMode('prebuilt')}>Select Prebuilt Investigator</button>
          <button onClick={() => setMode('custom')}>Create Custom Investigator</button>
        </div>
      </div>
    );
  }

  if (mode === 'prebuilt') {
    return (
      <div className="investigator-select fade-in">
        <h2>Select an Investigator</h2>
        <div className="investigator-grid">
          {Object.values(investigators).map((investigator) => (
            <div key={investigator.name} className="investigator-card" onClick={() => handlePrebuiltSelect(investigator)}>
              <h3>{investigator.name}</h3>
              <h4>{investigator.title}</h4>
            </div>
          ))}
        </div>
        <button onClick={() => setMode(null)} className="back-button">Back</button>
      </div>
    );
  }

  return (
    <div className="custom-investigator fade-in">
      <h2>Create Custom Investigator</h2>
      <form onSubmit={handleSubmitCustom}>
        <div className="form-group">
          <input
            type="text"
            value={customInvestigator.name}
            onChange={(e) => setCustomInvestigator(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Investigator Name"
            required
          />
          <input
            type="text"
            value={customInvestigator.title}
            onChange={(e) => setCustomInvestigator(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Title (e.g. The Detective)"
          />
        </div>

        <h3>Stats</h3>
        <div className="stats-grid">
          {Object.entries(customInvestigator.stats).map(([stat, value]) => (
            <li key={stat}>
              <span className="stat-name">{stat.charAt(0).toUpperCase() + stat.slice(1)}</span>
              <span className="stat-value">{value}</span>
              <div className="stat-buttons">
                <button type="button" onClick={() => handleCustomStatChange(stat, -1)}>-</button>
                <button type="button" onClick={() => handleCustomStatChange(stat, 1)}>+</button>
              </div>
            </li>
          ))}
        </div>

        <h3>Starting Item</h3>
        <div className="add-list">
          <input
            type="text"
            value={startingItemName}
            onChange={(e) => setStartingItemName(e.target.value)}
            placeholder="Starting item name..."
            required
          />
          <input
            type="text"
            value={startingItemDesc}
            onChange={(e) => setStartingItemDesc(e.target.value)}
            placeholder="Starting item description..."
            required
          />
        </div>

        <h3>Major Ability</h3>
        <div className="add-list">
          <input
            type="text"
            value={majorAbilityName}
            onChange={(e) => setMajorAbilityName(e.target.value)}
            placeholder="Major ability name..."
            required
          />
          <input
            type="text"
            value={majorAbilityDesc}
            onChange={(e) => setMajorAbilityDesc(e.target.value)}
            placeholder="Major ability description..."
            required
          />
        </div>

        <h3>Major Weakness</h3>
        <div className="add-list">
          <input
            type="text"
            value={majorWeaknessName}
            onChange={(e) => setMajorWeaknessName(e.target.value)}
            placeholder="Major weakness name..."
            required
          />
          <input
            type="text"
            value={majorWeaknessDesc}
            onChange={(e) => setMajorWeaknessDesc(e.target.value)}
            placeholder="Major weakness description..."
            required
          />
        </div>

        <h3>Additional Items</h3>
        <div className="add-list">
          <ul>
            {customInvestigator.items.map((item, index) => (
              <li key={index}>
                <div className="item-entry">
                  <div className="item-content">
                    <div className="item-name">{item}</div>
                  </div>
                  <button type="button" onClick={() => handleRemoveItem(item)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Item name..."
          />
          <button type="button" onClick={handleAddItem}>Add Item</button>
        </div>

        <h3>Additional Abilities</h3>
        <div className="add-list">
          <ul>
            {customInvestigator.abilities.map((ability, index) => (
              <li key={index}>
                <div className="item-entry">
                  <div className="item-content">
                    <div className="item-name">{ability}</div>
                  </div>
                  <button type="button" onClick={() => handleRemoveAbility(ability)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newAbility}
            onChange={(e) => setNewAbility(e.target.value)}
            placeholder="Ability name..."
          />
          <button type="button" onClick={handleAddAbility}>Add Ability</button>
        </div>

        <h3>Additional Weaknesses</h3>
        <div className="add-list">
          <ul>
            {customInvestigator.weaknesses.map((weakness, index) => (
              <li key={index}>
                <div className="item-entry">
                  <div className="item-content">
                    <div className="item-name">{weakness}</div>
                  </div>
                  <button type="button" onClick={() => handleRemoveWeakness(weakness)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newWeakness}
            onChange={(e) => setNewWeakness(e.target.value)}
            placeholder="Weakness name..."
          />
          <button type="button" onClick={handleAddWeakness}>Add Weakness</button>
        </div>

        <div className="form-buttons">
          <button type="submit">Create Investigator</button>
          <button type="button" onClick={() => setMode(null)}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default GameStart;