import React, { useState } from 'react';
import { exportToJSON, importFromFile } from '../lib/data';

const ScheduleImportExport = ({ 
  selectedClass, 
  schedule, 
  onScheduleImport 
}) => {
  const [importing, setImporting] = useState(false);

  const handleExportSchedule = () => {
    if (!selectedClass) {
      alert('Nejdříve vyberte třídu');
      return;
    }

    const scheduleData = {
      classId: selectedClass.id,
      className: selectedClass.name,
      year: selectedClass.year,
      schedule: schedule,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    exportToJSON(scheduleData, `rozvrh-${selectedClass.name}-${new Date().toISOString().split('T')[0]}.json`);
  };

  const handleImportSchedule = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImporting(true);
    try {
      const data = await importFromFile(file);
      
      // Validace dat
      if (!data.classId || !data.schedule) {
        throw new Error('Neplatný formát souboru rozvrhu');
      }

      // Kontrola, zda je rozvrh pro správnou třídu
      if (data.classId !== selectedClass?.id) {
        const confirmImport = confirm(
          `Rozvrh je pro třídu "${data.className || data.classId}". ` +
          `Chcete ho importovat do třídy "${selectedClass?.name}"?`
        );
        if (!confirmImport) return;
      }

      onScheduleImport(data.schedule);
      alert('Rozvrh byl úspěšně importován');
    } catch (error) {
      alert(`Chyba při importu rozvrhu: ${error.message}`);
    } finally {
      setImporting(false);
      event.target.value = ''; // Reset file input
    }
  };

  const handleClearSchedule = () => {
    if (confirm('Opravdu chcete vymazat celý rozvrh pro tuto třídu?')) {
      onScheduleImport({});
    }
  };

  if (!selectedClass) {
    return (
      <div className="card">
        <h3>Import/Export rozvrhu</h3>
        <p>Nejdříve vyberte třídu pro správu rozvrhu</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Import/Export rozvrhu pro {selectedClass.name}</h3>
      <p>Spravujte rozvrh této třídy pomocí importu a exportu</p>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button 
          className="btn btn-primary"
          onClick={handleExportSchedule}
        >
          Export rozvrhu (JSON)
        </button>
        
        <div className="file-input">
          <input
            type="file"
            accept=".json"
            onChange={handleImportSchedule}
            disabled={importing}
          />
          <label>Import rozvrhu (JSON)</label>
        </div>

        <button 
          className="btn btn-danger"
          onClick={handleClearSchedule}
        >
          Vymazat rozvrh
        </button>
      </div>

      {importing && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px', 
          color: '#2563eb' 
        }}>
          Importuji rozvrh...
        </div>
      )}

      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        background: '#f0f9ff', 
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <h4>Formát importu rozvrhu</h4>
        <p><strong>JSON:</strong> Soubor musí obsahovat pole "schedule" s daty rozvrhu</p>
        <p><strong>Struktura:</strong> Rozvrh je organizován podle dnů a časových slotů</p>
        <p><strong>Kompatibilita:</strong> Rozvrh lze importovat i do jiné třídy</p>
      </div>
    </div>
  );
};

export default ScheduleImportExport;
