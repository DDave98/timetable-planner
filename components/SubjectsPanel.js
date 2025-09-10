import React from 'react';

const SubjectsPanel = ({ subjects, selectedClass }) => {
  if (!selectedClass) {
    return (
      <div className="card">
        <h3>Předměty</h3>
        <p>Nejdříve vyberte třídu</p>
      </div>
    );
  }

  const classSubjects = subjects.filter(subject => 
    selectedClass.subjects.includes(subject.code)
  );

  return (
    <div className="card">
      <h3>Předměty pro {selectedClass.name}</h3>
      <p>Klikněte na buňku v rozvrhu pro přidání předmětu</p>
      
      <div className="subjects-panel">
        {classSubjects.map((subject) => (
          <div
            key={subject.id}
            className="subject-item"
            style={{
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '15px',
              textAlign: 'center',
              cursor: 'default'
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', color: '#2563eb' }}>{subject.name}</h4>
            <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#666' }}>{subject.code}</p>
            <p style={{ margin: '0', fontSize: '12px', color: '#999' }}>{subject.year}. ročník</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectsPanel;
