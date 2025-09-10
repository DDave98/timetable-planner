# Vzorová data pro aplikaci Rozvrh školy

Tato složka obsahuje vzorová JSON data pro import do aplikace Rozvrh školy.

## Soubory

### Jednotlivé entity
- **`tridy.json`** - Vzorová data tříd (8 tříd od 1.A do 4.B)
- **`ucitele.json`** - Vzorová data učitelů (10 učitelů s různými předměty a blokacemi)
- **`predmety.json`** - Vzorová data předmětů (18 předmětů s doporučenými učebnami)
- **`ucebny.json`** - Vzorová data učeben (20 učeben různých typů)
- **`obory.json`** - Vzorová data studijních oborů (8 oborů)

### Kompletní data
- **`kompletni-data.json`** - Všechna data v jednom souboru pro kompletní import

### Vzorové rozvrhy
- **`vzorovy-rozvrh-1a.json`** - Vzorový rozvrh pro třídu 1.A (základní předměty)
- **`vzorovy-rozvrh-3a.json`** - Vzorový rozvrh pro třídu 3.A (IT zaměření)

## Použití

### Import jednotlivých entit
1. Přejděte na stránku **Import/Export** v aplikaci
2. Vyberte příslušný typ entity (Třídy, Učitelé, Předměty, Učebny, Obor)
3. Klikněte na **"Import"** a vyberte příslušný JSON soubor

### Import všech dat najednou
1. Přejděte na stránku **Import/Export** v aplikaci
2. V sekci **"Kompletní export/import"** klikněte na **"Import všech dat (JSON)"**
3. Vyberte soubor **`kompletni-data.json`**

### Import/Export rozvrhů
1. Přejděte na stránku **Rozvrh** v aplikaci
2. Vyberte třídu, pro kterou chcete spravovat rozvrh
3. V sekci **"Import/Export rozvrhu"** použijte tlačítka pro export nebo import
4. Pro import vyberte jeden ze vzorových souborů rozvrhů

## Struktura dat

### Třídy
- `id` - Jedinečný identifikátor
- `name` - Název třídy (např. "1.A")
- `year` - Ročník (1-4)
- `subjects` - Pole kódů předmětů

### Učitelé
- `id` - Jedinečný identifikátor
- `name` - Jméno učitele
- `email` - Email učitele
- `subjects` - Pole kódů předmětů, které učí
- `blockings` - Pole blokací (kdy není k dispozici)

### Předměty
- `id` - Jedinečný identifikátor
- `name` - Název předmětu
- `code` - Kód předmětu (např. "MAT")
- `year` - Ročník, ve kterém se předmět vyučuje
- `recommendedClassrooms` - Pole doporučených typů učeben

### Učebny
- `id` - Jedinečný identifikátor
- `name` - Název učebny
- `capacity` - Kapacita (počet míst)
- `type` - Typ učebny (standard/computer/lab/gym/auditorium)

### Obor
- `id` - Jedinečný identifikátor
- `name` - Název oboru
- `years` - Délka studia v letech
- `subjects` - Pole kódů předmětů oboru

### Rozvrh
- `classId` - ID třídy, pro kterou je rozvrh
- `className` - Název třídy
- `year` - Ročník třídy
- `schedule` - Objekt s rozvrhem organizovaným podle dnů a časových slotů
- `exportDate` - Datum exportu
- `version` - Verze formátu

## Typy učeben

- **`standard`** - Klasické učebny pro matematiku, češtinu, atd.
- **`computer`** - Počítačové učebny pro informatiku
- **`lab`** - Laboratoře pro chemii, fyziku, biologii
- **`gym`** - Tělocvičny pro tělesnou výchovu
- **`auditorium`** - Auly pro přednášky a prezentace

## Poznámky

- Všechna data jsou v českém jazyce
- ID jsou generována pro demonstrační účely
- Blokace učitelů obsahují příklady reálných situací
- Doporučené učebny jsou nastaveny podle typu předmětu
- Data jsou navržena tak, aby pokrývala různé scénáře použití
