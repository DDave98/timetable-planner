import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import TeacherBlocking from '../components/TeacherBlocking';
import { useData } from '../lib/useData';
import { createTeacher } from '../lib/data';

export default function TeachersPage() {
  const { 
    data, 
    loading, 
    updateEntityData, 
    addItem, 
    updateItem, 
    removeItem 
  } = useData();

  const { teachers } = data;
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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

  const handleAddTeacher = () => {
    if (!formData.name || !formData.email) {
      alert('Vyplňte všechna povinná pole');
      return;
    }

    const newTeacher = createTeacher(formData.name, formData.email, formData.subjects);
    addItem('teachers', newTeacher);
    setFormData({ name: '', email: '', subjects: [] });
    setShowAddForm(false);
  };

  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      subjects: teacher.subjects
    });
    setShowAddForm(true);
  };

  const handleUpdateTeacher = () => {
    if (!formData.name || !formData.email) {
      alert('Vyplňte všechna povinná pole');
      return;
    }

    updateItem('teachers', editingTeacher.id, {
      name: formData.name,
      email: formData.email,
      subjects: formData.subjects
    });
    setFormData({ name: '', email: '', subjects: [] });
    setEditingTeacher(null);
    setShowAddForm(false);
  };

  const handleDeleteTeacher = (teacherId) => {
    if (confirm('Opravdu chcete smazat tohoto učitele?')) {
      removeItem('teachers', teacherId);
    }
  };

  const handleTeachersChange = (newTeachers) => {
    updateEntityData('teachers', newTeachers);
  };

  const handleSubjectToggle = (subjectCode) => {
    const newSubjects = formData.subjects.includes(subjectCode)
      ? formData.subjects.filter(s => s !== subjectCode)
      : [...formData.subjects, subjectCode];
    setFormData({ ...formData, subjects: newSubjects });
  };

  const availableSubjects = [
    'MAT', 'CJ', 'AJ', 'FYZ', 'CHE', 'BIO', 'DEJ', 'ZEM', 
    'INF', 'OS', 'DB', 'PROG', 'TV', 'HV', 'VV'
  ];

  return (
    <>
      <Head>
        <title>Učitelé - Rozvrh školy</title>
        <meta name="description" content="Správa učitelů" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Správa učitelů</h2>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setEditingTeacher(null);
                setFormData({ name: '', email: '', subjects: [] });
                setShowAddForm(!showAddForm);
              }}
            >
              {showAddForm ? 'Zrušit' : 'Přidat učitele'}
            </button>
          </div>

          {showAddForm && (
            <div style={{ 
              background: '#f9fafb', 
              padding: '20px', 
              borderRadius: '8px', 
              marginBottom: '20px' 
            }}>
              <h3>{editingTeacher ? 'Upravit učitele' : 'Nový učitel'}</h3>
              
              <div className="form-group">
                <label>Jméno *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Zadejte jméno učitele"
                />
              </div>
              
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Zadejte email učitele"
                />
              </div>
              
              <div className="form-group">
                <label>Předměty</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
                  {availableSubjects.map(subject => (
                    <label key={subject} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <input
                        type="checkbox"
                        checked={formData.subjects.includes(subject)}
                        onChange={() => handleSubjectToggle(subject)}
                      />
                      {subject}
                    </label>
                  ))}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn btn-primary"
                  onClick={editingTeacher ? handleUpdateTeacher : handleAddTeacher}
                >
                  {editingTeacher ? 'Uložit změny' : 'Přidat učitele'}
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingTeacher(null);
                    setFormData({ name: '', email: '', subjects: [] });
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
            {teachers.map(teacher => (
              <div key={teacher.id} style={{ 
                background: '#f9fafb', 
                padding: '20px', 
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <h3 style={{ margin: 0, color: '#2563eb' }}>{teacher.name}</h3>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button
                      className="btn btn-secondary"
                      style={{ padding: '5px 10px', fontSize: '12px' }}
                      onClick={() => handleEditTeacher(teacher)}
                    >
                      Upravit
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ padding: '5px 10px', fontSize: '12px' }}
                      onClick={() => handleDeleteTeacher(teacher.id)}
                    >
                      Smazat
                    </button>
                  </div>
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <strong>Email:</strong> {teacher.email}
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <strong>Předměty:</strong> {teacher.subjects.length > 0 ? teacher.subjects.join(', ') : 'Žádné'}
                </div>
                
                <div>
                  <strong>Blokace:</strong> {teacher.blockings?.length || 0}
                </div>
              </div>
            ))}
          </div>
        </div>

        <TeacherBlocking 
          teachers={teachers}
          onTeachersChange={handleTeachersChange}
        />
      </Layout>
    </>
  );
}
