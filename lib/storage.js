// Centralizovaná správa localStorage pro aplikaci Rozvrh školy

const STORAGE_KEY = 'rozvrh-data';

// Výchozí data
const defaultData = {
  classes: [],
  teachers: [],
  subjects: [],
  classrooms: [],
  classroomTypes: [],
  studyPrograms: [],
  schedule: {},
  selectedClass: null
};

// Načtení dat z localStorage
export const loadData = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const data = JSON.parse(savedData);
      // Zajistit, že všechny klíče existují
      return {
        ...defaultData,
        ...data
      };
    }
  } catch (error) {
    console.error('Chyba při načítání dat z localStorage:', error);
  }
  return defaultData;
};

// Uložení dat do localStorage
export const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Chyba při ukládání dat do localStorage:', error);
    return false;
  }
};

// Aktualizace konkrétní entity
export const updateEntity = (entityType, data) => {
  const currentData = loadData();
  currentData[entityType] = data;
  saveData(currentData);
  return currentData;
};

// Načtení konkrétní entity
export const getEntity = (entityType) => {
  const data = loadData();
  return data[entityType] || [];
};

// Přidání nové položky k entitě
export const addToEntity = (entityType, newItem) => {
  const currentData = loadData();
  const currentEntity = currentData[entityType] || [];
  currentEntity.push(newItem);
  currentData[entityType] = currentEntity;
  saveData(currentData);
  return currentData;
};

// Aktualizace konkrétní položky v entitě
export const updateItemInEntity = (entityType, itemId, updatedItem) => {
  const currentData = loadData();
  const currentEntity = currentData[entityType] || [];
  const updatedEntity = currentEntity.map(item => 
    item.id === itemId ? { ...item, ...updatedItem } : item
  );
  currentData[entityType] = updatedEntity;
  saveData(currentData);
  return currentData;
};

// Smazání položky z entity
export const removeFromEntity = (entityType, itemId) => {
  const currentData = loadData();
  const currentEntity = currentData[entityType] || [];
  const filteredEntity = currentEntity.filter(item => item.id !== itemId);
  currentData[entityType] = filteredEntity;
  saveData(currentData);
  return currentData;
};

// Reset všech dat na výchozí
export const resetData = (defaultDataOverride = null) => {
  const dataToSave = defaultDataOverride || defaultData;
  saveData(dataToSave);
  return dataToSave;
};

// Načtení rozvrhu pro konkrétní třídu
export const getScheduleForClass = (classId) => {
  const data = loadData();
  return data.schedule[classId] || {};
};

// Uložení rozvrhu pro konkrétní třídu
export const saveScheduleForClass = (classId, schedule) => {
  const currentData = loadData();
  currentData.schedule[classId] = schedule;
  saveData(currentData);
  return currentData;
};

// Načtení vybrané třídy
export const getSelectedClass = () => {
  const data = loadData();
  return data.selectedClass;
};

// Uložení vybrané třídy
export const setSelectedClass = (selectedClass) => {
  const currentData = loadData();
  currentData.selectedClass = selectedClass;
  saveData(currentData);
  return currentData;
};

// Import dat z JSON
export const importData = (importedData) => {
  const currentData = loadData();
  
  // Aktualizovat pouze existující klíče
  Object.keys(importedData).forEach(key => {
    if (currentData.hasOwnProperty(key)) {
      currentData[key] = importedData[key];
    }
  });
  
  saveData(currentData);
  return currentData;
};

// Export všech dat
export const exportAllData = () => {
  return loadData();
};

// Kontrola, zda jsou data načtena
export const isDataLoaded = () => {
  const data = loadData();
  return data.classes.length > 0 || data.teachers.length > 0 || data.subjects.length > 0;
};
