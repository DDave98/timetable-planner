import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { useData } from '../lib/useData';
import { createStudyProgram } from '../lib/data';

export default function StudyProgramsPage() {
  const { 
    data, 
    loading, 
    addItem, 
    updateItem, 
    removeItem 
  } = useData();

  const { studyPrograms, subjects } = data;
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    years: 4,
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

  const handleAddProgram = () => {
    if (!formData.name) {
      alert('Vyplňte název oboru');
      return;
    }

    const newProgram = createStudyProgram(formData.name, formData.years, formData.subjects);
    addItem('studyPrograms', newProgram);
    setFormData({ name: '', years: 4, subjects: [] });
    setShowAddForm(false);
  };

  const handleEditProgram = (program) => {
    setEditingProgram(program);
    setFormData({
      name: program.name,
      years: program.years,
      subjects: program.subjects
    });
    setShowAddForm(true);
  };

  const handleUpdateProgram = () => {
    if (!formData.name) {
      alert('Vyplňte název oboru');
      return;
    }

    updateItem('studyPrograms', editingProgram.id, {
      name: formData.name,
      years: formData.years,
      subjects: formData.subjects
    });
    setFormData({ name: '', years: 4, subjects: [] });
    setEditingProgram(null);
    setShowAddForm(false);
  };

  const handleDeleteProgram = (programId) => {
    if (confirm('Opravdu chcete smazat tento obor?')) {
      removeItem('studyPrograms', programId);
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

  const getSubjectsByYear = (program) => {
    const subjectsByYear = {};
    program.subjects.forEach(subjectCode => {
      const subject = subjects.find(s => s.code === subjectCode);
      if (subject) {
        const year = subject.year;
        if (!subjectsByYear[year]) subjectsByYear[year] = [];
        subjectsByYear[year].push(subject);
      }
    });
    return subjectsByYear;
  };

  return (
    <>
      <Head>
        <title>Obor - Rozvrh školy</title>
        <meta name="description" content="Správa oborů" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Správa oborů</h2>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setEditingProgram(null);
                setFormData({ name: '', years: 4, subjects: [] });
                setShowAddForm(!showAddForm);
              }}
            >
              {showAddForm ? 'Zrušit' : 'Přidat obor'}
            </button>
          </div>

          {showAddForm && (
            <div style={{ 
              background: '#f9fafb', 
              padding: '20px', 
              borderRadius: '8px', 
              marginBottom: '20px' 
            }}>
              <h3>{editingProgram ? 'Upravit obor' : 'Nový obor'}</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div className="form-group">
                  <label>Název oboru *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Např. Informatika, Ekonomika"
                  />
                </div>
                
                <div className="form-group">
                  <label>Ročník oboru</label>
                  <select
                    value={formData.years}
                    onChange={(e) => setFormData({ ...formData, years: parseInt(e.target.value) })}
                  >
                    <option value={1}>1 rok</option>
                    <option value={2}>2 roky</option>
                    <option value={3}>3 roky</option>
                    <option value={4}>4 roky</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Předměty oboru</label>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                  gap: '10px',
                  maxHeight: '300px',
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
                      <div>
                        <div>{subject.name} ({subject.code})</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {subject.year}. ročník
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn btn-primary"
                  onClick={editingProgram ? handleUpdateProgram : handleAddProgram}
                >
                  {editingProgram ? 'Uložit změny' : 'Přidat obor'}
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingProgram(null);
                    setFormData({ name: '', years: 4, subjects: [] });
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
            {studyPrograms.map(program => {
              const subjectsByYear = getSubjectsByYear(program);
              
              return (
                <div key={program.id} style={{ 
                  background: '#f9fafb', 
                  padding: '20px', 
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                    <h3 style={{ margin: 0, color: '#2563eb' }}>{program.name}</h3>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button
                        className="btn btn-secondary"
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                        onClick={() => handleEditProgram(program)}
                      >
                        Upravit
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                        onClick={() => handleDeleteProgram(program.id)}
                      >
                        Smazat
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <strong>Délka studia:</strong> {program.years} {program.years === 1 ? 'rok' : program.years < 5 ? 'roky' : 'let'}
                  </div>
                  
                  <div>
                    <strong>Předměty podle ročníků:</strong>
                    {Object.keys(subjectsByYear).sort().map(year => (
                      <div key={year} style={{ marginTop: '10px' }}>
                        <div style={{ 
                          fontWeight: '500', 
                          color: '#2563eb',
                          marginBottom: '5px'
                        }}>
                          {year}. ročník ({subjectsByYear[year].length} předmětů)
                        </div>
                        <div style={{ 
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '5px',
                          marginLeft: '10px'
                        }}>
                          {subjectsByYear[year].map(subject => (
                            <span key={subject.id} style={{
                              background: '#2563eb',
                              color: 'white',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '12px'
                            }}>
                              {subject.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {studyPrograms.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              color: '#666' 
            }}>
              <h3>Žádné obory</h3>
              <p>Začněte přidáním prvního oboru</p>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
