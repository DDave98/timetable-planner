import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { useData } from '../lib/useData';

export default function ClassroomTypesPage() {
  const { 
    data, 
    loading, 
    addItem, 
    updateItem, 
    removeItem 
  } = useData();

  const { classroomTypes = [] } = data;
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3b82f6',
    icon: '🏫'
  });

  const predefinedIcons = [
    '🏫', '💻', '🧪', '🏃', '🎭', '🎵', '🎨', '📚', 
    '🔬', '⚗️', '🧬', '📖', '✏️', '📝', '🎯', '🎪'
  ];

  const predefinedColors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1',
    '#14b8a6', '#eab308', '#dc2626', '#7c3aed', '#0891b2'
  ];

  if (loading) {
    return (
      <Layout>
        <div className="card">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h3>Načítání dat...</h3>
          </div>
        </div>
      </Layout>
    );
  }

  const handleAddType = () => {
    if (!formData.name) {
      alert('Vyplňte název typu učebny');
      return;
    }

    const newType = {
      id: `type-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      color: formData.color,
      icon: formData.icon,
      isCustom: true
    };

    addItem('classroomTypes', newType);
    setFormData({ name: '', description: '', color: '#3b82f6', icon: '🏫' });
    setShowAddForm(false);
  };

  const handleEditType = (type) => {
    setEditingType(type);
    setFormData({
      name: type.name,
      description: type.description,
      color: type.color,
      icon: type.icon
    });
    setShowAddForm(true);
  };

  const handleUpdateType = () => {
    if (!formData.name) {
      alert('Vyplňte název typu učebny');
      return;
    }

    updateItem('classroomTypes', editingType.id, {
      name: formData.name,
      description: formData.description,
      color: formData.color,
      icon: formData.icon
    });
    setFormData({ name: '', description: '', color: '#3b82f6', icon: '🏫' });
    setEditingType(null);
    setShowAddForm(false);
  };

  const handleDeleteType = (typeId) => {
    if (confirm('Opravdu chcete smazat tento typ učebny?')) {
      removeItem('classroomTypes', typeId);
    }
  };

  const handleColorChange = (color) => {
    setFormData({ ...formData, color });
  };

  const handleIconChange = (icon) => {
    setFormData({ ...formData, icon });
  };

  return (
    <>
      <Head>
        <title>Typy učeben - Rozvrh školy</title>
        <meta name="description" content="Správa typů učeben" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Správa typů učeben</h2>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setEditingType(null);
                setFormData({ name: '', description: '', color: '#3b82f6', icon: '🏫' });
                setShowAddForm(!showAddForm);
              }}
            >
              {showAddForm ? 'Zrušit' : 'Přidat typ učebny'}
            </button>
          </div>

          {showAddForm && (
            <div style={{ 
              background: '#f9fafb', 
              padding: '20px', 
              borderRadius: '8px', 
              marginBottom: '20px' 
            }}>
              <h3>{editingType ? 'Upravit typ učebny' : 'Nový typ učebny'}</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div className="form-group">
                  <label>Název typu *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Např. Knihovna, Dílna, Ateliér"
                  />
                </div>
                
                <div className="form-group">
                  <label>Popis</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Krátký popis typu učebny"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div className="form-group">
                  <label>Ikona</label>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(8, 1fr)', 
                    gap: '10px',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    background: 'white'
                  }}>
                    {predefinedIcons.map(icon => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => handleIconChange(icon)}
                        style={{
                          padding: '8px',
                          border: formData.icon === icon ? '2px solid #2563eb' : '1px solid #e5e7eb',
                          borderRadius: '4px',
                          background: formData.icon === icon ? '#eff6ff' : 'white',
                          cursor: 'pointer',
                          fontSize: '20px'
                        }}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Barva</label>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(5, 1fr)', 
                    gap: '10px',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    background: 'white'
                  }}>
                    {predefinedColors.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => handleColorChange(color)}
                        style={{
                          width: '40px',
                          height: '40px',
                          border: formData.color === color ? '3px solid #000' : '1px solid #e5e7eb',
                          borderRadius: '50%',
                          background: color,
                          cursor: 'pointer'
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => handleColorChange(e.target.value)}
                      style={{ width: '100%', height: '40px', border: 'none', borderRadius: '4px' }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ 
                padding: '15px', 
                background: 'white', 
                borderRadius: '4px', 
                border: '1px solid #e5e7eb',
                marginBottom: '20px'
              }}>
                <h4>Náhled:</h4>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  background: formData.color,
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  <span style={{ fontSize: '16px' }}>{formData.icon}</span>
                  {formData.name || 'Název typu'}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn btn-primary"
                  onClick={editingType ? handleUpdateType : handleAddType}
                >
                  {editingType ? 'Uložit změny' : 'Přidat typ'}
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingType(null);
                    setFormData({ name: '', description: '', color: '#3b82f6', icon: '🏫' });
                  }}
                >
                  Zrušit
                </button>
              </div>
            </div>
          )}

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '20px' 
          }}>
            {classroomTypes.map(type => (
              <div key={type.id} style={{ 
                background: '#f9fafb', 
                padding: '20px', 
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                borderLeft: `4px solid ${type.color}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px' }}>{type.icon}</span>
                    <h3 style={{ margin: 0, color: type.color }}>{type.name}</h3>
                  </div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button
                      className="btn btn-secondary"
                      style={{ padding: '5px 10px', fontSize: '12px' }}
                      onClick={() => handleEditType(type)}
                    >
                      Upravit
                    </button>
                    {type.isCustom && (
                      <button
                        className="btn btn-danger"
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                        onClick={() => handleDeleteType(type.id)}
                      >
                        Smazat
                      </button>
                    )}
                  </div>
                </div>
                
                {type.description && (
                  <div style={{ marginBottom: '10px', color: '#666' }}>
                    {type.description}
                  </div>
                )}
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  marginTop: '10px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: type.color
                  }}></div>
                  <span style={{ fontSize: '12px', color: '#666' }}>
                    {type.isCustom ? 'Vlastní typ' : 'Předdefinovaný typ'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {classroomTypes.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              color: '#666' 
            }}>
              <h3>Žádné typy učeben</h3>
              <p>Začněte přidáním prvního typu učebny</p>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
