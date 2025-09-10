import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { useData } from '../lib/useData';
import { createClass } from '../lib/data';

export default function ClassesPage() {
  const { 
    data, 
    loading, 
    addItem, 
    updateItem, 
    removeItem 
  } = useData();

  const { classes, subjects } = data;
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    year: 1,
    subjects: []
  });

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

  const handleAddClass = () => {
    if (!formData.name) {
      alert('Vyplňte název třídy');
      return;
    }

    const newClass = createClass(formData.name, formData.year, formData.subjects);
    addItem('classes', newClass);
    setFormData({ name: '', year: 1, subjects: [] });
    setShowAddForm(false);
  };

  const handleEditClass = (classItem) => {
    setEditingClass(classItem);
    setFormData({
      name: classItem.name,
      year: classItem.year,
      subjects: classItem.subjects
    });
    setShowAddForm(true);
  };

  const handleUpdateClass = () => {
    if (!formData.name) {
      alert('Vyplňte název třídy');
      return;
    }

    updateItem('classes', editingClass.id, {
      name: formData.name,
      year: formData.year,
      subjects: formData.subjects
    });
    setFormData({ name: '', year: 1, subjects: [] });
    setEditingClass(null);
    setShowAddForm(false);
  };

  const handleDeleteClass = (classId) => {
    if (confirm('Opravdu chcete smazat tuto třídu?')) {
      removeItem('classes', classId);
    }
  };

  const handleSubjectToggle = (subjectCode) => {
    const newSubjects = formData.subjects.includes(subjectCode)
      ? formData.subjects.filter(s => s !== subjectCode)
      : [...formData.subjects, subjectCode];
    setFormData({ ...formData, subjects: newSubjects });
  };

  const getSubjectName = (subjectCode) => {
    const subject = subjects.find(s => s.code === subjectCode);
    return subject ? subject.name : subjectCode;
  };

  return (
    <>
      <Head>
        <title>Třídy - Rozvrh školy</title>
        <meta name="description" content="Správa tříd" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Správa tříd</h2>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setEditingClass(null);
                setFormData({ name: '', year: 1, subjects: [] });
                setShowAddForm(!showAddForm);
              }}
            >
              {showAddForm ? 'Zrušit' : 'Přidat třídu'}
            </button>
          </div>

          {showAddForm && (
            <div style={{ 
              background: '#f9fafb', 
              padding: '20px', 
              borderRadius: '8px', 
              marginBottom: '20px' 
            }}>
              <h3>{editingClass ? 'Upravit třídu' : 'Nová třída'}</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div className="form-group">
                  <label>Název třídy *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Např. 1.A, 2.B"
                  />
                </div>
                
                <div className="form-group">
                  <label>Rok</label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  >
                    <option value={1}>1. ročník</option>
                    <option value={2}>2. ročník</option>
                    <option value={3}>3. ročník</option>
                    <option value={4}>4. ročník</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Předměty</label>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                  gap: '10px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  background: 'white'
                }}>
                  {subjects.map(subject => (
                    <label key={subject.id} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      padding: '5px',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        checked={formData.subjects.includes(subject.code)}
                        onChange={() => handleSubjectToggle(subject.code)}
                      />
                      <span>{subject.name} ({subject.code})</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn btn-primary"
                  onClick={editingClass ? handleUpdateClass : handleAddClass}
                >
                  {editingClass ? 'Uložit změny' : 'Přidat třídu'}
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingClass(null);
                    setFormData({ name: '', year: 1, subjects: [] });
                  }}
                >
                  Zrušit
                </button>
              </div>
            </div>
          )}

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
            gap: '20px' 
          }}>
            {classes.map(classItem => (
              <div key={classItem.id} style={{ 
                background: '#f9fafb', 
                padding: '20px', 
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <h3 style={{ margin: 0, color: '#2563eb' }}>{classItem.name}</h3>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button
                      className="btn btn-secondary"
                      style={{ padding: '5px 10px', fontSize: '12px' }}
                      onClick={() => handleEditClass(classItem)}
                    >
                      Upravit
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ padding: '5px 10px', fontSize: '12px' }}
                      onClick={() => handleDeleteClass(classItem.id)}
                    >
                      Smazat
                    </button>
                  </div>
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <strong>Rok:</strong> {classItem.year}. ročník
                </div>
                
                <div>
                  <strong>Předměty ({classItem.subjects.length}):</strong>
                  <div style={{ 
                    marginTop: '5px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '5px'
                  }}>
                    {classItem.subjects.map(subjectCode => (
                      <span key={subjectCode} style={{
                        background: '#2563eb',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}>
                        {getSubjectName(subjectCode)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}
