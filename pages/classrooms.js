import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { useData } from '../lib/useData';
import { createClassroom } from '../lib/data';

export default function ClassroomsPage() {
  const { 
    data, 
    loading, 
    addItem, 
    updateItem, 
    removeItem 
  } = useData();

  const { classrooms, classroomTypes } = data;
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingClassroom, setEditingClassroom] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    capacity: 30,
    type: 'standard'
  });

  // Kombinace předdefinovaných a vlastních typů
  const allClassroomTypes = [
    { value: 'standard', label: 'Standardní učebna', description: 'Klasické učebny pro matematiku, češtinu, atd.', color: '#3b82f6', icon: '🏫' },
    { value: 'computer', label: 'Počítačová učebna', description: 'Učebny s počítači pro informatiku', color: '#8b5cf6', icon: '💻' },
    { value: 'lab', label: 'Laboratoř', description: 'Laboratoře pro chemii, fyziku, biologii', color: '#f59e0b', icon: '🧪' },
    { value: 'gym', label: 'Tělocvična', description: 'Tělocvičny pro tělesnou výchovu', color: '#10b981', icon: '🏃' },
    { value: 'auditorium', label: 'Aula', description: 'Auly pro přednášky a prezentace', color: '#ef4444', icon: '🎭' },
    ...classroomTypes.map(type => ({
      value: type.id,
      label: type.name,
      description: type.description,
      color: type.color,
      icon: type.icon
    }))
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

  const handleAddClassroom = () => {
    if (!formData.name) {
      alert('Vyplňte název učebny');
      return;
    }

    const newClassroom = createClassroom(formData.name, formData.capacity, formData.type);
    addItem('classrooms', newClassroom);
    setFormData({ name: '', capacity: 30, type: 'standard' });
    setShowAddForm(false);
  };

  const handleEditClassroom = (classroom) => {
    setEditingClassroom(classroom);
    setFormData({
      name: classroom.name,
      capacity: classroom.capacity,
      type: classroom.type
    });
    setShowAddForm(true);
  };

  const handleUpdateClassroom = () => {
    if (!formData.name) {
      alert('Vyplňte název učebny');
      return;
    }

    updateItem('classrooms', editingClassroom.id, {
      name: formData.name,
      capacity: formData.capacity,
      type: formData.type
    });
    setFormData({ name: '', capacity: 30, type: 'standard' });
    setEditingClassroom(null);
    setShowAddForm(false);
  };

  const handleDeleteClassroom = (classroomId) => {
    if (confirm('Opravdu chcete smazat tuto učebnu?')) {
      removeItem('classrooms', classroomId);
    }
  };

  const getClassroomTypeInfo = (type) => {
    const classroomType = allClassroomTypes.find(ct => ct.value === type);
    return classroomType || { 
      label: type, 
      description: '', 
      color: '#6b7280', 
      icon: '🏫' 
    };
  };

  return (
    <>
      <Head>
        <title>Učebny - Rozvrh školy</title>
        <meta name="description" content="Správa učeben" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Správa učeben</h2>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setEditingClassroom(null);
                setFormData({ name: '', capacity: 30, type: 'standard' });
                setShowAddForm(!showAddForm);
              }}
            >
              {showAddForm ? 'Zrušit' : 'Přidat učebnu'}
            </button>
          </div>

          {showAddForm && (
            <div style={{ 
              background: '#f9fafb', 
              padding: '20px', 
              borderRadius: '8px', 
              marginBottom: '20px' 
            }}>
              <h3>{editingClassroom ? 'Upravit učebnu' : 'Nová učebna'}</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div className="form-group">
                  <label>Název učebny *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Např. Učebna 101"
                  />
                </div>
                
                <div className="form-group">
                  <label>Kapacita</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 30 })}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Typ učebny</label>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                  gap: '10px',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  background: 'white'
                }}>
                  {allClassroomTypes.map(type => (
                    <label key={type.value} style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '8px',
                      padding: '10px',
                      cursor: 'pointer',
                      border: formData.type === type.value ? '2px solid #2563eb' : '1px solid #e5e7eb',
                      borderRadius: '4px',
                      background: formData.type === type.value ? '#eff6ff' : 'white'
                    }}>
                      <input
                        type="radio"
                        name="classroomType"
                        value={type.value}
                        checked={formData.type === type.value}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>{type.icon}</span>
                        <div>
                          <div style={{ fontWeight: '500', color: type.color }}>{type.label}</div>
                          <div style={{ fontSize: '12px', color: '#666' }}>{type.description}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn btn-primary"
                  onClick={editingClassroom ? handleUpdateClassroom : handleAddClassroom}
                >
                  {editingClassroom ? 'Uložit změny' : 'Přidat učebnu'}
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingClassroom(null);
                    setFormData({ name: '', capacity: 30, type: 'standard' });
                  }}
                >
                  Zrušit
                </button>
              </div>
            </div>
          )}

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '20px' 
          }}>
            {classrooms.map(classroom => {
              const typeInfo = getClassroomTypeInfo(classroom.type);
              return (
                <div key={classroom.id} style={{ 
                  background: '#f9fafb', 
                  padding: '20px', 
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  borderLeft: `4px solid ${typeInfo.color}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '20px' }}>{typeInfo.icon}</span>
                      <h3 style={{ margin: 0, color: '#2563eb' }}>{classroom.name}</h3>
                    </div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button
                        className="btn btn-secondary"
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                        onClick={() => handleEditClassroom(classroom)}
                      >
                        Upravit
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                        onClick={() => handleDeleteClassroom(classroom.id)}
                      >
                        Smazat
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Kapacita:</strong> {classroom.capacity} míst
                  </div>
                  
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Typ:</strong> 
                    <span style={{
                      background: typeInfo.color,
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      marginLeft: '8px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span>{typeInfo.icon}</span>
                      {typeInfo.label}
                    </span>
                  </div>
                  
                  {typeInfo.description && (
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {typeInfo.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
}
