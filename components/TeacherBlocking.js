import React, { useState } from 'react';
import { createTeacher } from '../lib/data';

const TeacherBlocking = ({ teachers, onTeachersChange }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [blockingDay, setBlockingDay] = useState('');
  const [blockingStartTime, setBlockingStartTime] = useState('');
  const [blockingEndTime, setBlockingEndTime] = useState('');
  const [blockingReason, setBlockingReason] = useState('');

  const timeSlots = [
    '7:10-7:55', '8:00-8:45', '8:55-9:40', '10:00-10:45', '10:55-11:40', 
    '11:50-12:35', '12:45-13:30', '13:40-14:25', '14:35-15:20', '15:30-16:15'
  ];
  const days = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek'];

  const handleAddBlocking = () => {
    if (!selectedTeacher || !blockingDay || !blockingStartTime || !blockingEndTime) return;

    const teacher = teachers.find(t => t.id === selectedTeacher);
    if (!teacher) return;

    // Získat indexy časových slotů
    const startIndex = timeSlots.indexOf(blockingStartTime);
    const endIndex = timeSlots.indexOf(blockingEndTime);
    
    if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
      alert('Neplatný rozsah časů');
      return;
    }

    // Vytvořit blokace pro všechny časové sloty v rozsahu
    const newBlockings = [];
    for (let i = startIndex; i <= endIndex; i++) {
      newBlockings.push({
        id: `${Date.now()}-${i}`,
        day: blockingDay,
        timeSlot: timeSlots[i],
        reason: blockingReason
      });
    }

    const updatedTeacher = {
      ...teacher,
      blockings: [...(teacher.blockings || []), ...newBlockings]
    };

    const updatedTeachers = teachers.map(t => 
      t.id === selectedTeacher ? updatedTeacher : t
    );

    onTeachersChange(updatedTeachers);

    // Reset form
    setSelectedTeacher('');
    setBlockingDay('');
    setBlockingStartTime('');
    setBlockingEndTime('');
    setBlockingReason('');
    setShowAddForm(false);
  };

  const handleRemoveBlocking = (teacherId, blockingId) => {
    const updatedTeachers = teachers.map(teacher => {
      if (teacher.id === teacherId) {
        return {
          ...teacher,
          blockings: teacher.blockings.filter(b => b.id !== blockingId)
        };
      }
      return teacher;
    });
    onTeachersChange(updatedTeachers);
  };

  const getTeacherBlockings = (teacher) => {
    return teacher.blockings || [];
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>Blokace učitelů</h3>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Zrušit' : 'Přidat blokaci'}
        </button>
      </div>

      {showAddForm && (
        <div style={{ 
          background: '#f9fafb', 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '20px' 
        }}>
          <h4>Nová blokace</h4>
          <div className="form-group">
            <label>Učitel</label>
            <select 
              value={selectedTeacher} 
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="">Vyberte učitele</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Den</label>
            <select 
              value={blockingDay} 
              onChange={(e) => setBlockingDay(e.target.value)}
            >
              <option value="">Vyberte den</option>
              {days.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div className="form-group">
              <label>Čas od</label>
              <select 
                value={blockingStartTime} 
                onChange={(e) => setBlockingStartTime(e.target.value)}
              >
                <option value="">Vyberte čas</option>
                {timeSlots.map(timeSlot => (
                  <option key={timeSlot} value={timeSlot}>{timeSlot}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Čas do</label>
              <select 
                value={blockingEndTime} 
                onChange={(e) => setBlockingEndTime(e.target.value)}
                disabled={!blockingStartTime}
              >
                <option value="">Vyberte čas</option>
                {timeSlots.map((timeSlot, index) => {
                  const startIndex = timeSlots.indexOf(blockingStartTime);
                  if (startIndex === -1 || index < startIndex) return null;
                  return (
                    <option key={timeSlot} value={timeSlot}>{timeSlot}</option>
                  );
                })}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Důvod (volitelné)</label>
            <input
              type="text"
              value={blockingReason}
              onChange={(e) => setBlockingReason(e.target.value)}
              placeholder="Např. jiná práce, studium VŠ..."
            />
          </div>
          
          <button 
            className="btn btn-primary"
            onClick={handleAddBlocking}
            disabled={!selectedTeacher || !blockingDay || !blockingStartTime || !blockingEndTime}
          >
            Přidat blokaci
          </button>
        </div>
      )}

      <div>
        {teachers.map(teacher => {
          const blockings = getTeacherBlockings(teacher);
          if (blockings.length === 0) return null;

          // Seskupit blokace podle dne a důvodu
          const groupedBlockings = {};
          blockings.forEach(blocking => {
            const key = `${blocking.day}-${blocking.reason || 'bez důvodu'}`;
            if (!groupedBlockings[key]) {
              groupedBlockings[key] = {
                day: blocking.day,
                reason: blocking.reason,
                timeSlots: []
              };
            }
            groupedBlockings[key].timeSlots.push(blocking.timeSlot);
          });

          return (
            <div key={teacher.id} style={{ marginBottom: '15px' }}>
              <h4>{teacher.name}</h4>
              {Object.values(groupedBlockings).map((group, groupIndex) => (
                <div key={groupIndex} className="teacher-blocking">
                  <div className="time">
                    {group.day} {group.timeSlots.length === 1 
                      ? group.timeSlots[0] 
                      : `${group.timeSlots[0]} - ${group.timeSlots[group.timeSlots.length - 1]}`
                    }
                  </div>
                  {group.reason && (
                    <div>Důvod: {group.reason}</div>
                  )}
                  <button
                    className="btn btn-danger"
                    style={{ 
                      marginTop: '5px', 
                      padding: '5px 10px', 
                      fontSize: '12px' 
                    }}
                    onClick={() => {
                      // Odstranit všechny blokace v této skupině
                      group.timeSlots.forEach(timeSlot => {
                        const blocking = blockings.find(b => 
                          b.day === group.day && b.timeSlot === timeSlot
                        );
                        if (blocking) {
                          handleRemoveBlocking(teacher.id, blocking.id);
                        }
                      });
                    }}
                  >
                    Odstranit
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeacherBlocking;
