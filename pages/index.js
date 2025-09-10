import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Head from 'next/head';
import Layout from '../components/Layout';
import ScheduleGrid from '../components/ScheduleGrid';
import SubjectsPanel from '../components/SubjectsPanel';
import ScheduleImportExport from '../components/ScheduleImportExport';
import { useData } from '../lib/useData';

export default function SchedulePage() {
  const { 
    data, 
    loading, 
    updateSchedule, 
    selectClass 
  } = useData();

  const { classes, subjects, classrooms, teachers, selectedClass, schedule } = data;

  const handleScheduleChange = (newSchedule) => {
    if (selectedClass) {
      updateSchedule(selectedClass.id, newSchedule);
    }
  };

  const handleClassSelect = (classId) => {
    const selectedClass = classes.find(c => c.id === classId);
    selectClass(selectedClass);
  };

  const handleScheduleImport = (importedSchedule) => {
    if (selectedClass) {
      updateSchedule(selectedClass.id, importedSchedule);
    }
  };

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

  return (
    <>
      <Head>
        <title>Rozvrh - Rozvrh školy</title>
        <meta name="description" content="Tvorba a správa rozvrhů" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <div className="card">
          <h2>Tvorba rozvrhu</h2>
          <p>Vyberte třídu a vytvořte rozvrh přetažením předmětů</p>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Vyberte třídu:
            </label>
            <select 
              value={selectedClass?.id || ''} 
              onChange={(e) => handleClassSelect(e.target.value)}
              style={{ 
                padding: '10px', 
                minWidth: '300px', 
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            >
              <option value="">Vyberte třídu</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} (rok {cls.year})
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedClass && (
          <div className="schedule-layout" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 300px', 
            gap: '20px'
          }}>
            {/* Levý sloupec - Rozvrh */}
            <div>
              <ScheduleImportExport
                selectedClass={selectedClass}
                schedule={schedule}
                onScheduleImport={handleScheduleImport}
              />
              
              <div className="card">
                <h3>Rozvrh pro {selectedClass.name}</h3>
                <p>Klikněte na buňku pro přidání předmětu a výběr učebny</p>
                <ScheduleGrid
                  schedule={schedule}
                  onScheduleChange={handleScheduleChange}
                  subjects={subjects}
                  classrooms={classrooms}
                  teachers={teachers}
                  selectedClass={selectedClass}
                />
              </div>
            </div>

            {/* Pravý sloupec - Předměty */}
            <div>
              <SubjectsPanel 
                subjects={subjects} 
                selectedClass={selectedClass} 
              />
            </div>
          </div>
        )}

        {!selectedClass && (
          <div className="card">
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              color: '#666' 
            }}>
              <h3>Vyberte třídu pro tvorbu rozvrhu</h3>
              <p>Nejdříve vyberte třídu z rozbalovacího menu výše</p>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}