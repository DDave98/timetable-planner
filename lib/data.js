import { v4 as uuidv4 } from 'uuid';

// Datové modely
export const createSubject = (name, code, recommendedClassrooms = [], year = 1) => ({
  id: uuidv4(),
  name,
  code,
  recommendedClassrooms,
  year
});

export const createClassroom = (name, capacity, type = 'standard') => ({
  id: uuidv4(),
  name,
  capacity,
  type
});

export const createClassroomTypes = (name, description, color, icon, isCustom = true) => ({
  id: uuidv4(),
  name,
  description,
  color,
  icon,
  isCustom
});

export const createTeacher = (name, email, subjects = [], blockings = []) => ({
  id: uuidv4(),
  name,
  email,
  subjects,
  blockings
});

export const createClass = (name, year, subjects = []) => ({
  id: uuidv4(),
  name,
  year,
  subjects
});

export const createStudyProgram = (name, years, subjects = []) => ({
  id: uuidv4(),
  name,
  years,
  subjects
});

 export const predefinedIcons = [
    '🏫', '💻', '🧪', '🏃', '🎭', '🎵', '🎨', '📚', 
    '🔬', '⚗️', '🧬', '📖', '✏️', '📝', '🎯', '🎪'
  ];

  export const predefinedColors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1',
    '#14b8a6', '#eab308', '#dc2626', '#7c3aed', '#0891b2'
  ];

// Výchozí data
export const defaultClassrooms = [
  createClassroom('Učebna 101', 30, 'standard'),
  createClassroom('Učebna 102', 30, 'standard'),
  createClassroom('Učebna 103', 30, 'standard'),
  createClassroom('Počítačová učebna A', 20, 'computer'),
  createClassroom('Počítačová učebna B', 20, 'computer'),
  createClassroom('Laboratoř chemie', 15, 'lab'),
  createClassroom('Laboratoř fyziky', 15, 'lab'),
  createClassroom('Tělocvična', 40, 'gym'),
  createClassroom('Aula', 100, 'auditorium')
];

export const defaultSubjects = [
  createSubject('Matematika', 'MAT', ['standard'], 1),
  createSubject('Český jazyk', 'CJ', ['standard'], 1),
  createSubject('Anglický jazyk', 'AJ', ['standard'], 1),
  createSubject('Fyzika', 'FYZ', ['standard', 'lab'], 1),
  createSubject('Chemie', 'CHE', ['standard', 'lab'], 1),
  createSubject('Biologie', 'BIO', ['standard', 'lab'], 1),
  createSubject('Dějepis', 'DEJ', ['standard'], 1),
  createSubject('Zeměpis', 'ZEM', ['standard'], 1),
  createSubject('Informatika', 'INF', ['computer'], 1),
  createSubject('Operační systémy', 'OS', ['computer'], 2),
  createSubject('Databáze', 'DB', ['computer'], 2),
  createSubject('Programování', 'PROG', ['computer'], 2),
  createSubject('Tělesná výchova', 'TV', ['gym'], 1),
  createSubject('Hudební výchova', 'HV', ['standard'], 1),
  createSubject('Výtvarná výchova', 'VV', ['standard'], 1)
];

export const defaultTeachers = [
  createTeacher('Jan Novák', 'jan.novak@skola.cz', ['MAT', 'FYZ']),
  createTeacher('Marie Svobodová', 'marie.svobodova@skola.cz', ['CJ', 'DEJ']),
  createTeacher('Petr Dvořák', 'petr.dvorak@skola.cz', ['AJ']),
  createTeacher('Anna Kratochvílová', 'anna.kratochvilova@skola.cz', ['CHE', 'BIO']),
  createTeacher('Tomáš Procházka', 'tomas.prochazka@skola.cz', ['INF', 'OS', 'DB', 'PROG']),
  createTeacher('Jana Malá', 'jana.mala@skola.cz', ['TV']),
  createTeacher('Pavel Velký', 'pavel.velky@skola.cz', ['ZEM', 'HV', 'VV'])
];

export const defaultClasses = [
  createClass('1.A', 1, ['MAT', 'CJ', 'AJ', 'FYZ', 'CHE', 'BIO', 'DEJ', 'ZEM', 'INF', 'TV', 'HV', 'VV']),
  createClass('1.B', 1, ['MAT', 'CJ', 'AJ', 'FYZ', 'CHE', 'BIO', 'DEJ', 'ZEM', 'INF', 'TV', 'HV', 'VV']),
  createClass('2.A', 2, ['MAT', 'CJ', 'AJ', 'FYZ', 'CHE', 'BIO', 'DEJ', 'ZEM', 'INF', 'OS', 'DB', 'TV', 'HV', 'VV']),
  createClass('2.B', 2, ['MAT', 'CJ', 'AJ', 'FYZ', 'CHE', 'BIO', 'DEJ', 'ZEM', 'INF', 'OS', 'DB', 'TV', 'HV', 'VV'])
];

export const defaultStudyProgram = [
  createStudyProgram('IT', 1, ['MAT', 'CJ' ]),
  createStudyProgram('IT', 2, ['MAT', 'CJ' ]),
  createStudyProgram('IT', 3, ['MAT', 'CJ' ]),
  createStudyProgram('IT', 4, ['MAT', 'CJ' ]),
];

export const defaultClassroomTypes = [
  createClassroomType("TUcebna", "", predefinedColors.at(0), predefinedIcons.at(14))
];

// Časy pro rozvrh
export const timeSlots = [
  '7:10-7:55',
  '8:00-8:45',
  '8:55-9:40',
  '10:00-10:45',
  '10:55-11:40',
  '11:50-12:35',
  '12:45-13:30',
  '13:40-14:25',
  '14:35-15:20',
  '15:30-16:15'
];

export const days = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek'];

// Utility funkce
export const getSubjectById = (subjects, id) => subjects.find(s => s.id === id);
export const getClassroomById = (classrooms, id) => classrooms.find(c => c.id === id);
export const getTeacherById = (teachers, id) => teachers.find(t => t.id === id);
export const getClassById = (classes, id) => classes.find(c => c.id === id);

export const getRecommendedClassrooms = (subject, classrooms) => {
  if (!subject || !subject.recommendedClassrooms) return classrooms;
  
  return classrooms.filter(classroom => 
    subject.recommendedClassrooms.includes(classroom.type)
  );
};

export const isTeacherBlocked = (teacher, day, timeSlot) => {
  if (!teacher.blockings) return false;
  
  return teacher.blockings.some(blocking => 
    blocking.day === day && blocking.timeSlot === timeSlot
  );
};

// Import/Export funkce
export const exportToCSV = (data, filename) => {
  const csv = convertToCSV(data);
  downloadFile(csv, filename, 'text/csv');
};

export const exportToJSON = (data, filename) => {
  const json = JSON.stringify(data, null, 2);
  downloadFile(json, filename, 'application/json');
};

const convertToCSV = (data) => {
  if (!data || data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
  ].join('\n');
  
  return csvContent;
};

const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importFromFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const extension = file.name.split('.').pop().toLowerCase();
        
        if (extension === 'csv') {
          const data = parseCSV(content);
          resolve(data);
        } else if (extension === 'json') {
          const data = JSON.parse(content);
          resolve(data);
        } else {
          reject(new Error('Nepodporovaný formát souboru'));
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(file);
  });
};

const parseCSV = (csv) => {
  const lines = csv.split('\n');
  const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const values = lines[i].split(',').map(v => v.replace(/"/g, ''));
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      data.push(row);
    }
  }
  
  return data;
};
