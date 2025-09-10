# Rozvrh školy

Jednoduchá webová aplikace pro tvorbu rozvrhů školy vytvořená v Next.js s modulární strukturou stránek.

## Funkce

- **Tvorba rozvrhů**: Drag & drop rozhraní pro umísťování předmětů do rozvrhu
- **Výběr učeben**: Automatické doporučování vhodných učeben pro předměty
- **Blokace učitelů**: Možnost nastavit, kdy učitelé nejsou k dispozici
- **Import/Export**: Podpora CSV a JSON formátů pro všechny data
- **Modulární správa**: Samostatné stránky pro správu jednotlivých entit

## Struktura stránek

- **Rozvrh** (`/`) - Tvorba a úprava rozvrhů
- **Učitelé** (`/teachers`) - Správa učitelů a jejich blokací
- **Třídy** (`/classes`) - Správa tříd a jejich předmětů
- **Předměty** (`/subjects`) - Správa předmětů a jejich doporučení
- **Učebny** (`/classrooms`) - Správa učeben s kapacitami a typy
- **Obor** (`/study-programs`) - Správa studijních oborů
- **Import/Export** (`/import-export`) - Import a export dat

## Instalace

1. Nainstalujte závislosti:
```bash
npm install
```

2. Spusťte vývojový server:
```bash
npm run dev
```

3. Otevřete [http://localhost:3000](http://localhost:3000) v prohlížeči

## Použití

### 1. Tvorba rozvrhu
- Na hlavní stránce vyberte třídu z rozbalovacího menu
- Přetáhněte předměty z panelu do rozvrhu
- Klikněte na buňku pro výběr učebny
- Systém doporučí vhodné učebny na základě typu předmětu

### 2. Správa učitelů
- V sekci "Učitelé" přidejte, upravte nebo smažte učitele
- Nastavte blokace pro učitele (kdy nejsou k dispozici)
- Přiřaďte učitelům předměty

### 3. Správa tříd
- V sekci "Třídy" vytvořte nové třídy
- Přiřaďte třídám předměty podle ročníku
- Upravte nebo smažte existující třídy

### 4. Správa předmětů
- V sekci "Předměty" vytvořte nové předměty
- Nastavte doporučené typy učeben pro každý předmět
- Přiřaďte předměty k ročníkům

### 5. Správa učeben
- V sekci "Učebny" přidejte nové učebny
- Nastavte kapacitu a typ učebny
- Učebny se automaticky doporučují podle typu předmětu

### 6. Správa oborů
- V sekci "Obor" vytvořte studijní obory
- Přiřaďte oborům předměty podle ročníků
- Spravujte délku studia

### 7. Import/Export dat
- V sekci "Import/Export" exportujte data do CSV nebo JSON
- Importujte data ze souborů
- Exportujte všechna data najednou

## Typy učeben

- **standard**: Klasické učebny pro matematiku, češtinu, atd.
- **computer**: Počítačové učebny pro informatiku
- **lab**: Laboratoře pro chemii, fyziku, biologii
- **gym**: Tělocvičny pro tělesnou výchovu
- **auditorium**: Auly pro přednášky

## Formát importu

### CSV
První řádek musí obsahovat hlavičky:
- Třídy: id, name, year, subjects
- Učitelé: id, name, email, subjects, blockings
- Předměty: id, name, code, year, recommendedClassrooms
- Učebny: id, name, capacity, type

### JSON
Pole objektů s odpovídajícími vlastnostmi.

## Technologie

- Next.js 14
- React 18
- React Beautiful DnD
- PapaParse (CSV parsing)
- UUID (generování ID)

## Struktura projektu

```
├── components/
│   ├── ScheduleGrid.js      # Hlavní rozvrh s drag & drop
│   ├── SubjectsPanel.js     # Panel s předměty
│   ├── ClassroomModal.js    # Výběr učeben
│   ├── TeacherBlocking.js   # Blokace učitelů
│   └── ImportExport.js      # Import/Export funkcionalita
├── lib/
│   └── data.js             # Datové modely a utility funkce
├── pages/
│   └── index.js            # Hlavní stránka
└── styles/
    └── globals.css         # Styly aplikace
```
