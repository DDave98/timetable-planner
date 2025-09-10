import React, { useState } from 'react';
import { exportToCSV, exportToJSON, importFromFile } from '../lib/data';

const ImportExport = ({ 
  classes, 
  teachers, 
  subjects, 
  classrooms, 
  onDataImport 
}) => {
  const [importing, setImporting] = useState(false);
  const [importType, setImportType] = useState('');

  const handleExport = (type, data, filename) => {
    if (type === 'csv') {
      exportToCSV(data, filename);
    } else if (type === 'json') {
      exportToJSON(data, filename);
    }
  };

  const handleImport = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    setImporting(true);
    try {
      const data = await importFromFile(file);
      onDataImport(type, data);
      alert(`Úspěšně importováno ${data.length} záznamů`);
    } catch (error) {
      alert(`Chyba při importu: ${error.message}`);
    } finally {
      setImporting(false);
      event.target.value = ''; // Reset file input
    }
  };

  const exportData = {
    classes: classes.map(c => ({
      id: c.id,
      name: c.name,
      year: c.year,
      subjects: c.subjects.join(',')
    })),
    teachers: teachers.map(t => ({
      id: t.id,
      name: t.name,
      email: t.email,
      subjects: t.subjects.join(','),
      blockings: JSON.stringify(t.blockings || [])
    })),
    subjects: subjects.map(s => ({
      id: s.id,
      name: s.name,
      code: s.code,
      year: s.year,
      recommendedClassrooms: s.recommendedClassrooms.join(',')
    })),
    classrooms: classrooms.map(c => ({
      id: c.id,
      name: c.name,
      capacity: c.capacity,
      type: c.type
    }))
  };

  return (
    <div className="card">
      <h3>Import a Export dat</h3>
      
      <div className="import-export">
        <div>
          <h4>Export</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary"
              onClick={() => handleExport('csv', exportData.classes, 'tridy.csv')}
            >
              Export tříd (CSV)
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => handleExport('json', exportData.classes, 'tridy.json')}
            >
              Export tříd (JSON)
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => handleExport('csv', exportData.teachers, 'ucitele.csv')}
            >
              Export učitelů (CSV)
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => handleExport('json', exportData.teachers, 'ucitele.json')}
            >
              Export učitelů (JSON)
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => handleExport('csv', exportData.subjects, 'predmety.csv')}
            >
              Export předmětů (CSV)
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => handleExport('json', exportData.subjects, 'predmety.json')}
            >
              Export předmětů (JSON)
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => handleExport('csv', exportData.classrooms, 'ucebny.csv')}
            >
              Export učeben (CSV)
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => handleExport('json', exportData.classrooms, 'ucebny.json')}
            >
              Export učeben (JSON)
            </button>
          </div>
        </div>

        <div>
          <h4>Import</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div className="file-input">
              <label>Třídy</label>
              <input
                type="file"
                accept=".csv,.json"
                onChange={(e) => handleImport(e, 'classes')}
                disabled={importing}
              />
            </div>
            <div className="file-input">
              <label>Učitelé</label>
              <input
                type="file"
                accept=".csv,.json"
                onChange={(e) => handleImport(e, 'teachers')}
                disabled={importing}
              />
            </div>
            <div className="file-input">
              <label>Předměty</label>
              <input
                type="file"
                accept=".csv,.json"
                onChange={(e) => handleImport(e, 'subjects')}
                disabled={importing}
              />
            </div>
            <div className="file-input">
              <label>Učebny</label>
              <input
                type="file"
                accept=".csv,.json"
                onChange={(e) => handleImport(e, 'classrooms')}
                disabled={importing}
              />
            </div>
          </div>
        </div>
      </div>

      {importing && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px', 
          color: '#2563eb' 
        }}>
          Importuji data...
        </div>
      )}

      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        background: '#f0f9ff', 
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <h4>Formát importu</h4>
        <p><strong>CSV:</strong> První řádek musí obsahovat hlavičky (id, name, email, atd.)</p>
        <p><strong>JSON:</strong> Pole objektů s odpovídajícími vlastnostmi</p>
        <p><strong>Předměty pro třídy:</strong> Oddělené čárkami (např. "MAT,CJ,AJ")</p>
        <p><strong>Blokace učitelů:</strong> JSON string v poli blockings</p>
      </div>
    </div>
  );
};

export default ImportExport;
