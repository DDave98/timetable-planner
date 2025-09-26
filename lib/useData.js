import { useState, useEffect } from 'react';
import { loadData, saveData, 
  updateEntity, getEntity, addToEntity, updateItemInEntity, 
  removeFromEntity, getScheduleForClass, saveScheduleForClass, 
  getSelectedClass, setSelectedClass, importData, exportAllData 
} from './storage';
import { defaultClasses, defaultTeachers, 
  defaultSubjects, defaultClassrooms, 
  defaultStudyProgram, defaultClassroomTypes } from './data';

// Hook pro správu dat aplikace
export const useData = () => {
  const [data, setData] = useState({
    classes: [],
    teachers: [],
    subjects: [],
    classrooms: [],
    classroomTypes: [],
    studyPrograms: [],
    schedule: {},
    selectedClass: null
  });
  const [loading, setLoading] = useState(true);

  // Načtení dat při inicializaci
  useEffect(() => {
    const loadedData = loadData();
    
    // Pokud nejsou žádná data, načíst výchozí
    if (loadedData.classes.length === 0 && loadedData.teachers.length === 0 && loadedData.subjects.length === 0) {
      const defaultData = {
        classes: defaultClasses,
        teachers: defaultTeachers,
        subjects: defaultSubjects,
        classrooms: defaultClassrooms,
        classroomTypes: defaultClassroomTypes,
        studyPrograms: defaultStudyProgram,
        schedule: {},
        selectedClass: null
      };
      setData(defaultData);
      saveData(defaultData);
    } else {
      setData(loadedData);
    }
    
    setLoading(false);
  }, []);

  // Automatické ukládání při změně dat
  useEffect(() => {
    if (!loading) {
      saveData(data);
    }
  }, [data, loading]);

  // Aktualizace konkrétní entity
  const updateEntityData = (entityType, newData) => {
    setData(prev => ({
      ...prev,
      [entityType]: newData
    }));
  };

  // Přidání nové položky
  const addItem = (entityType, newItem) => {
    setData(prev => ({
      ...prev,
      [entityType]: [...(prev[entityType] || []), newItem]
    }));
  };

  // Aktualizace položky
  const updateItem = (entityType, itemId, updatedItem) => {
    setData(prev => ({
      ...prev,
      [entityType]: (prev[entityType] || []).map(item => 
        item.id === itemId ? { ...item, ...updatedItem } : item
      )
    }));
  };

  // Smazání položky
  const removeItem = (entityType, itemId) => {
    setData(prev => ({
      ...prev,
      [entityType]: (prev[entityType] || []).filter(item => item.id !== itemId)
    }));
  };

  // Správa rozvrhu
  const updateSchedule = (classId, schedule) => {
    setData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [classId]: schedule
      }
    }));
  };

  // Správa vybrané třídy
  const selectClass = (selectedClass) => {
    setData(prev => ({
      ...prev,
      selectedClass
    }));
  };

  // Import dat
  const importDataFromFile = (importedData) => {
    setData(prev => ({
      ...prev,
      ...importedData
    }));
  };

  // Reset dat
  const resetData = () => {
    const defaultData = {
      classes: defaultClasses,
      teachers: defaultTeachers,
      subjects: defaultSubjects,
      classrooms: defaultClassrooms,
      studyPrograms: [],
      schedule: {},
      selectedClass: null
    };
    setData(defaultData);
    saveData(defaultData);
  };

  return {
    data,
    loading,
    updateEntityData,
    addItem,
    updateItem,
    removeItem,
    updateSchedule,
    selectClass,
    importDataFromFile,
    resetData,
    exportAllData: () => exportAllData()
  };
};
