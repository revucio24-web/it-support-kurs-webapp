# Kursvergleich – IT-Support Level 1 & 2

Stand: 2026-10-19. Quellen: siehe `research/quellen.md`.

## 1. Vergleichsmatrix

| Kurs / Lehrplan | Anbieter | Zielgruppe | Themenabdeckung | Stärken | Lücken | Format | Preis |
|---|---|---|---|---|---|---|---|
| Google IT Support Professional Certificate | Google (Coursera) | Quereinsteiger, Entry-Level | Hardware, Internet/Protokolle, OS (Win+Linux), Sysadmin, Security, Troubleshooting, Customer Service | Breite Übersicht; Hands-on-Labs/Widgets; 6 Module; Zertifikat; AI-Tools-Modul | Englisch; wenig DACH-Kontext; kein Homelab-Aufbau; keine Ticket-Simulation; keine Fehler-Datenbank | Online, ~126 h, 6 Kurse | Coursera Plus (~$59/Monat) |
| CompTIA A+ V15 (220-1201/220-1202) | CompTIA | Entry-Level Tech | Core1: Mobile, Networking, Hardware, Virtualization/Cloud, HW+Net-Troubleshooting; Core2: OS, Security, Software-Troubleshooting, Operational Procedures | Industry-Standard; klare Domains+Gewichtung; Windows 11 explizit; PBQs; deutsche Prüfung Core2 | Multiple-Choice-lastig; keine Praxis-Labs; kein Deutsch bei Core1; keine Ticket-Simulation | 2 Prüfungen, 90 Min, 90 Q | ~$500 (Prüfung) |
| Microsoft Learn (Win11/Intune/Entra) | Microsoft | Admins/Support | Windows 11 Admin-Tools, Client-Management, MDM, Intune, Entra ID, Conditional Access | Offiziell, aktuell, kostenlos; Windows 11 Pro Accreditation 2026 | Fragmentiert; keine Kuratierung; englisch; keine Didaktik | Selbstlern-Module | Kostenlos |
| ITIL 4 Foundation | PeopleCert/AXELOS | ITSM-Praktiker | Service Management, Incident/Problem/Service Request, Change Control, SLA, Service Desk, 4 Dimensionen, SVS | Standardisiertes Vokabular; Incident/Problem-Differenzierung; SLA/OLA/UC | Theorie-lastig; keine Tech-Praxis; keine Fehlerfälle | 2 Tage Kurs + Prüfung | ~$400 |
| IHK Fachinformatiker Systemintegration / IT-Systemelektroniker | IHK/BiBB | Auszubildende (3 Jahre) | OS, Netzwerk, IT-Sicherheit, AD, Datenbanken, Projektmanagement, Kundenberatung | Deutscher Kontext; Betriebliche Praxis; anerkannter Abschluss | 3 Jahre; betrieblich; kein Selbststudium; kein Web-Format | Duale Ausbildung | Ausbildungsvergütung |
| Professor Messer (A+ Kurs) | Prof. Messer | A+-Kandidaten | A+-Objectives, Video-basiert | Kostenlos; strukturiert nach Objectives; Study Groups | Englisch; keine Hands-on-Labs; keine Ticket-Sim | YouTube/Videos | Kostenlos (Werbe-finanziert) |
| Cisco NetAcad | Cisco | Netzwerk-Einsteiger | Networking Basics, CCNA-Grundlagen, Cybersecurity Essentials | Kostenlos; interaktive Labs (Packet Tracer); Zertifikate | Fokus Netzwerk; wenig Windows/Support; englisch | Online-Kurs | Kostenlos |
| TryHackMe / LetsDefend Basics | TryHackMe/LetsDefend | Security-Einsteiger | Security-Fundamentals, SOC-Basics, Phishing, Malware | Hands-on; gamifiziert; kostenlose Tier | Security-Fokus; kein Helpdesk; englisch | Online-Labs | Freemium |

## 2. Abgeleitete Lücken der Referenzkurse (was fehlt)

1. **Kein reproduzierbares Homelab** auf einem normalen Windows-11-Home-PC (Hypervisor-Einschränkungen nicht adressiert).
2. **Keine aggregierte Fehler-Datenbank** (Symptom → Ursache → Diagnose → Lösung → Prävention).
3. **Keine Ticket-Simulation** mit aufklappbarer Lösung.
4. **Kein Deutsch** mit englischen Fachbegriffen in Klammern (DACH-Kontext, IHK-Bezug).
5. **Keine verifizierten Quellen pro Lektion** mit Abrufdatum und Windows-Build.
6. **Keine "kaputt machen und reparieren"-Szenarien** für reproduzierbare Übungen.

## 3. Was unser Kurs BESSER macht

- **Deutsch + englische Fachbegriffe** (z. B. "Ereignisanzeige (Event Viewer)"), IHK-Kontext als Referenz, aber praxisorientiert.
- **Homelab auf Windows 11 Home** mit dokumentierten Einschränkungen (kein Hyper-V/gpedit/RDP-Host) und VMware Workstation Pro (kostenlos seit Nov 2024) als primäre Empfehlung.
- **Reproduzierbare Fehlererzeugung** in VMs (DNS falsch, Dienst gestoppt, Treiber deaktiviert, GPO-Fehler) – Snapshots zum Zurücksetzen.
- **Aggregierte Fehler-Datenbank** (eigene Seite, filterbar) aus allen Lektionen.
- **Ticket-Szenario pro Lektion** mit aufklappbarer Lösung (Selbstprüfung).
- **Quellenpflicht**: jede Faktbehauptung mit URL + Abrufdatum in `research/quellen.md`; offizielle Quellen bevorzugt; nicht Verifizierbares wird als "UNGEPRÜFT" markiert.
- **last_verified + Windows-Version/Build** im Frontmatter jeder Lektion.
- **Progress (localStorage)**, Suche (Pagefind), Dark Mode, mobil nutzbar, kein Backend.

## 4. Themenabdeckung – Mapping auf unsere Module

| Referenz-Domain (CompTIA A+ V15) | Unser Modul |
|---|---|
| Mobile Devices | 2 (Hardware/Peripherie) |
| Networking (23%) | 5, 12 |
| Hardware (25%) | 2 |
| Virtualization & Cloud (11%) | 0 (Homelab), 14 |
| HW+Net Troubleshooting (28%) | 4, 5, 12 |
| OS (28%) | 3, 9, 10 |
| Security (28%) | 7, 14 |
| Software Troubleshooting (23%) | 9, 13, 15 |
| Operational Procedures (21%) | 1, 16, 17 |
| ITIL Incident/Problem/SR | 1, 16 |
| M365/Intune/Entra | 6, 14 |

## 5. Schlussfolgerung

Unser Kurs kombiniert die Breite des Google-Zertifikats, die Struktur der CompTIA-Domains, die offiziellen Microsoft-Docs, das ITIL-Vokabular und den deutschen IHK-Kontext – ergänzt um das, was allen fehlt: Homelab, reproduzierbare Fehler, Ticket-Simulation, Fehler-Datenbank, Quellenpflicht. Format: statische Webapp (Astro), kostenlos, lokal lauffähig, später deploybar.
