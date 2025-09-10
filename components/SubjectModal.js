import React, { useState } from 'react';
import { getSubjectById } from '../lib/data';

const SubjectModal = ({ 
  onClose, 
  onSelect, 
  subjects, 
  selectedClass 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!selectedClass) return null;

  const classSubjects = subjects.filter(subject => 
    selectedClass.subjects.includes(subject.code)
  );

  const filteredSubjects = classSubjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubjectClick = (subject) => {
    onSelect(subject);
  };

  return (
    <div className="classroom-modal">
      <div className="classroom-modal-content">
        <h2>Výběr předmětu</h2>
        <p>
          Vyberte předmět pro {selectedClass.name} - {selectedClass.year}. ročník
        </p>

        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label>Hledat předmět</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Zadejte název nebo kód předmětu..."
          />
        </div>

        <div style={{ 
          maxHeight: '400px', 
          overflowY: 'auto',
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          padding: '10px'
        }}>
          {filteredSubjects.length > 0 ? (
            <div style={{ display: 'grid', gap: '8px' }}>
              {filteredSubjects.map(subject => (
                <div
                  key={subject.id}
                  className="classroom-item"
                  onClick={() => handleSubjectClick(subject)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '500', fontSize: '16px' }}>
                        {subject.name}
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        {subject.code} - {subject.year}. ročník
                      </div>
                    </div>
                    <div style={{ 
                      background: '#2563eb', 
                      color: 'white', 
                      padding: '4px 8px', 
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}>
                      Vybrat
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              color: '#666' 
            }}>
              <h3>Žádné předměty</h3>
              <p>
                {searchTerm 
                  ? 'Nebyly nalezeny žádné předměty odpovídající vyhledávání'
                  : 'Pro tuto třídu nejsou definovány žádné předměty'
                }
              </p>
            </div>
          )}
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Zrušit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectModal;
