import React, { useState } from 'react';
import { getRecommendedClassrooms, getSubjectById } from '../lib/data';

const ClassroomModal = ({ 
  onClose, 
  onSelect, 
  classrooms, 
  selectedClass, 
  schedule, 
  selectedCell,
  selectedSubject 
}) => {
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  if (!selectedCell || !selectedSubject) return null;

  const { day, timeSlot } = selectedCell;
  const subject = selectedSubject;
  
  // Získat doporučené učebny
  const recommendedClassrooms = subject ? getRecommendedClassrooms(subject, classrooms) : [];
  const otherClassrooms = classrooms.filter(c => !recommendedClassrooms.some(rc => rc.id === c.id));

  const handleSelect = (classroomId) => {
    setSelectedClassroom(classroomId);
  };

  const handleConfirm = () => {
    if (selectedClassroom) {
      onSelect(selectedClassroom);
    }
  };

  return (
    <div className="classroom-modal">
      <div className="classroom-modal-content">
        <h2>Výběr učebny</h2>
        <p>
          Předmět: <strong>{subject?.name || 'Neznámý předmět'}</strong>
        </p>
        <p>
          Čas: <strong>{day} {timeSlot}</strong>
        </p>

        {recommendedClassrooms.length > 0 && (
          <div>
            <h3>Doporučené učebny</h3>
            {recommendedClassrooms.map(classroom => (
              <div
                key={classroom.id}
                className={`classroom-item ${selectedClassroom === classroom.id ? 'selected' : 'recommended'}`}
                onClick={() => handleSelect(classroom.id)}
              >
                <div><strong>{classroom.name}</strong></div>
                <div>Kapacita: {classroom.capacity} míst</div>
                <div>Typ: {classroom.type}</div>
              </div>
            ))}
          </div>
        )}

        {otherClassrooms.length > 0 && (
          <div>
            <h3>Ostatní učebny</h3>
            {otherClassrooms.map(classroom => (
              <div
                key={classroom.id}
                className={`classroom-item ${selectedClassroom === classroom.id ? 'selected' : ''}`}
                onClick={() => handleSelect(classroom.id)}
              >
                <div><strong>{classroom.name}</strong></div>
                <div>Kapacita: {classroom.capacity} míst</div>
                <div>Typ: {classroom.type}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <button 
            className="btn btn-primary" 
            onClick={handleConfirm}
            disabled={!selectedClassroom}
          >
            Potvrdit
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Zrušit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassroomModal;
