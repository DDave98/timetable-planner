import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import ImportExport from '../components/ImportExport';
import { useData } from '../lib/useData';

export default function ImportExportPage() {
  const { 
    data, 
    loading, 
    importDataFromFile, 
    resetData, 
    exportAllData 
  } = useData();

  const { classes, teachers, subjects, classrooms } = data;

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

  const handleDataImport = (type, data) => {
    const importData = {};
    importData[type] = data;
    importDataFromFile(importData);
  };

  const handleExportAll = () => {
    const allData = exportAllData();
    allData.exportDate = new Date().toISOString();
    allData.version = '1.0';
    
    const json = JSON.stringify(allData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rozvrh-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportAll = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        importDataFromFile(data);
        alert('Všechna data byla úspěšně importována');
      } catch (error) {
        alert(`Chyba při importu: ${error.message}`);
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset file input
  };

  const handleResetData = () => {
    if (confirm('Opravdu chcete resetovat všechna data na výchozí hodnoty? Tato akce se nedá vrátit zpět.')) {
      resetData();
      alert('Data byla resetována na výchozí hodnoty');
    }
  };

  return (
    <>
      <Head>
        <title>Import/Export - Rozvrh školy</title>
        <meta name="description" content="Import a export dat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <div className="card">
          <h2>Import a Export dat</h2>
          <p>Spravujte data aplikace pomocí importu a exportu</p>
        </div>

        <div className="card">
          <h3>Kompletní export/import</h3>
          <p>Exportujte nebo importujte všechna data najednou</p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary"
              onClick={handleExportAll}
            >
              Export všech dat (JSON)
            </button>
            
            <div className="file-input">
              <input
                type="file"
                accept=".json"
                onChange={handleImportAll}
              />
              <label>Import všech dat (JSON)</label>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Reset dat</h3>
          <p>Vraťte všechna data na výchozí hodnoty</p>
          
          <button 
            className="btn btn-danger"
            onClick={handleResetData}
          >
            Resetovat všechna data
          </button>
        </div>

        <ImportExport
          classes={classes}
          teachers={teachers}
          subjects={subjects}
          classrooms={classrooms}
          onDataImport={handleDataImport}
        />

        <div className="card">
          <h3>Statistiky dat</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px' 
          }}>
            <div style={{ 
              background: '#eff6ff', 
              padding: '20px', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h4 style={{ color: '#2563eb', margin: '0 0 10px 0' }}>Třídy</h4>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{classes.length}</div>
            </div>
            
            <div style={{ 
              background: '#f0fdf4', 
              padding: '20px', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h4 style={{ color: '#10b981', margin: '0 0 10px 0' }}>Učitelé</h4>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{teachers.length}</div>
            </div>
            
            <div style={{ 
              background: '#fef3c7', 
              padding: '20px', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h4 style={{ color: '#f59e0b', margin: '0 0 10px 0' }}>Předměty</h4>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{subjects.length}</div>
            </div>
            
            <div style={{ 
              background: '#fce7f3', 
              padding: '20px', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h4 style={{ color: '#ec4899', margin: '0 0 10px 0' }}>Učebny</h4>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{classrooms.length}</div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
