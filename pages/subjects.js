import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { useData } from '../lib/useData';
import { createSubject } from '../lib/data';

export default function SubjectsPage() {
  const { 
    data, 
    loading, 
    addItem, 
    updateItem, 
    removeItem 
  } = useData();

  const { subjects } = data;
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    year: 1,
    recommendedClassrooms: []
  });

  const classroomTypes = [
    { value: 'standard', label: 'Standardní učebna' },
    { value: 'computer', label: 'Počítačová učebna' },
    { value: 'lab', label: 'Laboratoř' },
    { value: 'gym', label: 'Tělocvična' },
    { value: 'auditorium', label: 'Aula' }
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

  const handleAddSubject = () => {
    if (!formData.name || !formData.code) {
      alert('Vyplňte název a kód předmětu');
      return;
    }

    const newSubject = createSubject(formData.name, formData.code, formData.recommendedClassrooms, formData.year);
    addItem('subjects', newSubject);
    setFormData({ name: '', code: '', year: 1, recommendedClassrooms: [] });
    setShowAddForm(false);
  };

  const handleEditSubject = (subject) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name,
      code: subject.code,
      year: subject.year,
      recommendedClassrooms: subject.recommendedClassrooms
    });
    setShowAddForm(true);
  };

  const handleUpdateSubject = () => {
    if (!formData.name || !formData.code) {
      alert('Vyplňte název a kód předmětu');
      return;
    }

    updateItem('subjects', editingSubject.id, {
      name: formData.name,
      code: formData.code,
      year: formData.year,
      recommendedClassrooms: formData.recommendedClassrooms
    });
    setFormData({ name: '', code: '', year: 1, recommendedClassrooms: [] });
    setEditingSubject(null);
    setShowAddForm(false);
  };

  const handleDeleteSubject = (subjectId) => {
    if (confirm('Opravdu chcete smazat tento předmět?')) {
      removeItem('subjects', subjectId);
    }
  };

  const handleClassroomTypeToggle = (type) => {
    const newTypes = formData.recommendedClassrooms.includes(type)
      ? formData.recommendedClassrooms.filter(t => t !== type)
      : [...formData.recommendedClassrooms, type];
    setFormData({ ...formData, recommendedClassrooms: newTypes });
  };

  const getClassroomTypeLabel = (type) => {
    const classroomType = classroomTypes.find(ct => ct.value === type);
    return classroomType ? classroomType.label : type;
  };

  return (
    <>
      <Head>
        <title>Předměty - Rozvrh školy</title>
        <meta name="description" content="Správa předmětů" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Správa předmětů</h2>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setEditingSubject(null);
                setFormData({ name: '', code: '', year: 1, recommendedClassrooms: [] });
                setShowAddForm(!showAddForm);
              }}
            >
              {showAddForm ? 'Zrušit' : 'Přidat předmět'}
            </button>
          </div>

          {showAddForm && (
            <div style={{ 
              background: '#f9fafb', 
              padding: '20px', 
              borderRadius: '8px', 
              marginBottom: '20px' 
            }}>
              <h3>{editingSubject ? 'Upravit předmět' : 'Nový předmět'}</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div className="form-group">
                  <label>Název předmětu *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Např. Matematika"
                  />
                </div>
                
                <div className="form-group">
                  <label>Kód předmětu *</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="Např. MAT"
                    style={{ textTransform: 'uppercase' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
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
                <label>Doporučené typy učeben</label>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                  gap: '10px',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  background: 'white'
                }}>
                  {classroomTypes.map(type => (
                    <label key={type.value} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      padding: '5px',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        checked={formData.recommendedClassrooms.includes(type.value)}
                        onChange={() => handleClassroomTypeToggle(type.value)}
                      />
                      <span>{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn btn-primary"
                  onClick={editingSubject ? handleUpdateSubject : handleAddSubject}
                >
                  {editingSubject ? 'Uložit změny' : 'Přidat předmět'}
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingSubject(null);
                    setFormData({ name: '', code: '', year: 1, recommendedClassrooms: [] });
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
            {subjects.map(subject => (
              <div key={subject.id} style={{ 
                background: '#f9fafb', 
                padding: '20px', 
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <h3 style={{ margin: 0, color: '#2563eb' }}>{subject.name}</h3>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button
                      className="btn btn-secondary"
                      style={{ padding: '5px 10px', fontSize: '12px' }}
                      onClick={() => handleEditSubject(subject)}
                    >
                      Upravit
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ padding: '5px 10px', fontSize: '12px' }}
                      onClick={() => handleDeleteSubject(subject.id)}
                    >
                      Smazat
                    </button>
                  </div>
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <strong>Kód:</strong> {subject.code}
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <strong>Rok:</strong> {subject.year}. ročník
                </div>
                
                <div>
                  <strong>Doporučené učebny:</strong>
                  <div style={{ 
                    marginTop: '5px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '5px'
                  }}>
                    {subject.recommendedClassrooms.map(type => (
                      <span key={type} style={{
                        background: '#10b981',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}>
                        {getClassroomTypeLabel(type)}
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
