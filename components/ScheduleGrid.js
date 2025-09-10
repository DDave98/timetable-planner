import React, { useState } from 'react';
import ClassroomModal from './ClassroomModal';
import SubjectModal from './SubjectModal';

const ScheduleGrid = ({ 
  schedule, 
  onScheduleChange, 
  subjects, 
  classrooms, 
  teachers,
  selectedClass 
}) => {
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showClassroomModal, setShowClassroomModal] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [timeSlots, days] = [
    ['7:10-7:55', '8:00-8:45', '8:55-9:40', '10:00-10:45', '10:55-11:40', '11:50-12:35', '12:45-13:30', '13:40-14:25', '14:35-15:20', '15:30-16:15'],
    ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek']
  ];

  const handleCellClick = (day, timeSlot) => {
    setSelectedCell({ day, timeSlot });
    setShowSubjectModal(true);
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setShowSubjectModal(false);
    setShowClassroomModal(true);
  };

  const handleClassroomSelect = (classroomId) => {
    if (!selectedCell || !selectedSubject) return;

    const { day, timeSlot } = selectedCell;
    const newSchedule = { ...schedule };
    
    if (!newSchedule[day]) newSchedule[day] = {};
    if (!newSchedule[day][timeSlot]) newSchedule[day][timeSlot] = [];
    
    newSchedule[day][timeSlot].push({
      id: `${selectedSubject.id}-${Date.now()}`,
      subjectId: selectedSubject.id,
      classroomId: classroomId
    });
    
    onScheduleChange(newSchedule);
    setShowClassroomModal(false);
    setSelectedCell(null);
    setSelectedSubject(null);
  };

  const removeSubject = (day, timeSlot, subjectIndex) => {
    const newSchedule = { ...schedule };
    if (newSchedule[day] && newSchedule[day][timeSlot]) {
      newSchedule[day][timeSlot].splice(subjectIndex, 1);
      onScheduleChange(newSchedule);
    }
  };

  const getSubject = (subjectId) => subjects.find(s => s.id === subjectId);
  const getClassroom = (classroomId) => classrooms.find(c => c.id === classroomId);

  const renderCell = (day, timeSlot) => {
    const cellSubjects = schedule[day]?.[timeSlot] || [];
    
    return (
      <div
        key={`${day}-${timeSlot}`}
        className="schedule-cell"
        onClick={() => handleCellClick(day, timeSlot)}
        style={{ cursor: 'pointer' }}
      >
        {cellSubjects.map((scheduleItem, index) => {
          const subject = getSubject(scheduleItem.subjectId);
          const classroom = getClassroom(scheduleItem.classroomId);
          
          return (
            <div key={scheduleItem.id} className="subject-card">
              <div>{subject?.name || 'Neznámý předmět'}</div>
              {classroom && (
                <div className="classroom">{classroom.name}</div>
              )}
              <button
                className="remove-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  removeSubject(day, timeSlot, index);
                }}
              >
                ×
              </button>
            </div>
          );
        })}
        {cellSubjects.length === 0 && (
          <div style={{ 
            color: '#999', 
            fontSize: '12px', 
            textAlign: 'center',
            padding: '10px'
          }}>
            Klikněte pro přidání předmětu
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="schedule-grid">
        {/* Prázdná buňka v levém horním rohu */}
        <div className="time-slot"></div>
        
        {/* Hlavičky dnů */}
        {days.map(day => (
          <div key={day} className="day-header">
            {day}
          </div>
        ))}
        
        {/* Řádky s časy a buňkami */}
        {timeSlots.map(timeSlot => (
          <React.Fragment key={timeSlot}>
            <div className="time-slot">
              {timeSlot}
            </div>
            {days.map(day => renderCell(day, timeSlot))}
          </React.Fragment>
        ))}
      </div>

      {showSubjectModal && selectedCell && (
        <SubjectModal
          onClose={() => {
            setShowSubjectModal(false);
            setSelectedCell(null);
          }}
          onSelect={handleSubjectSelect}
          subjects={subjects}
          selectedClass={selectedClass}
        />
      )}

      {showClassroomModal && selectedCell && selectedSubject && (
        <ClassroomModal
          onClose={() => {
            setShowClassroomModal(false);
            setSelectedCell(null);
            setSelectedSubject(null);
          }}
          onSelect={handleClassroomSelect}
          classrooms={classrooms}
          selectedClass={selectedClass}
          schedule={schedule}
          selectedCell={selectedCell}
          selectedSubject={selectedSubject}
        />
      )}
    </>
  );
};

export default ScheduleGrid;
