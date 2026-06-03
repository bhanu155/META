# META (Dynamic Project Management and Tracking Application)

META is a comprehensive web application engineered to facilitate dynamic project management, role-based workflow coordination, and precise task tracking. Designed with a robust Node.js and Express backend, it provides a centralized platform where cross-functional teams can create projects, map granular tasks into milestones/modules, and monitor operational progress in real-time.

---

## 👥 Team & Mentorship
M-E-T-A is the result of a collective, dedicated effort by a cross-functional team of skilled individuals under the professional guidance and mentorship of **PROF. KUNAL ANAND**.

### Core Team
* Chandra Bhanu
* Kanishk
* Ria
* Sourav Pandey
* Utkarsh Shrivastava

---

## 🚀 Key Features

* **Dual-Role Dashboard Architecture**: Structured system supporting separate registration, authentication, and unique dashboards for Managers and Employees.
* **Granular Project Tracking**: Create projects with metrics such as project name, start date, explicit deadlines, dynamically calculating time durations, and total progress completion percentages.
* **Module & Kanban Boards**: Projects are divided into functional modules containing progress state tracking (`backlog`, `in-progress`, `completed`) to visualize delivery phases.
* **Smart Metrics & Archiving**: Automated recalculation of module state breakdowns per project (tracking counts for backlogs, active items, and finished elements) alongside explicit workspace cleanups via project archiving features.
* **Secure Session Authentication**: Integrated authentication workflows built via Passport middleware to safeguard user resources and route tracking privileges.

---

## 🛠️ Tech Stack & Architecture

### Backend Ecosystem
* **Runtime Environment**: Node.js
* **Framework**: Express.js
* **Authentication**: Passport.js with Local Strategy (`passport-local-mongoose`)
* **ODM / Database Layer**: Mongoose & MongoDB

### Frontend Ecosystem
* **View Engine**: EJS (Embedded JavaScript templates)
* **Styling**: Bootstrap 4, custom CSS dashboards tailored for both administrative and execution layers.
* **Visualizations & Interactivity**: Client-side JavaScript rendering interactive Kanban cards, project timelines, performance graphs, and client-side form validations.

---

## 📂 Project Structure

```text
META/
├── data_schema/         # MongoDB/Mongoose database models
│   ├── user.js          # Authentication base schema
│   ├── employee.js      # Employee profiles & metrics
│   ├── project.js       # Project structures and lifecycle properties
│   └── module.js        # Granular task modules within projects
├── middleware/          # Access control wrappers and authentication filters
├── public/              # Client-side assets served statically
│   ├── assets/          # Static icons, logos, and ui layouts
│   ├── scripts/         # Charts, line-graphs, and form validation libraries
│   └── stylesheets/     # Custom UI layouts (Kanban, dashboard modules)
├── routes/              # Express routing engine (Endpoints logic mapping)
├── views/               # EJS application layout templates
├── index.js             # Main server execution hook and configuration
├── package.json         # Node deployment dependency tree
└── README.md            # Documentation manifest
