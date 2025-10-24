# Mini SaaS Leads Dashboard

This is a **mini SaaS dashboard** built with **Next.js**, **Redux Toolkit**, **Tailwind CSS**, and **Shadcn UI**.  
It allows users to manage leads with **create, read, update, delete (CRUD)** functionality. The dashboard also supports role-based access control (Admin/User).

---

## Admin Credentials

You can use the following **admin credentials** to access the admin panel:

- **Email:** `sosophotography0@gmail.com`  
- **Password:** `nitin123`  

**user credentials**

- **Email:** `nitin@gmail.com`  
- **Password:** `nitin`  

> **Note:** Only admins can see all users’ leads. Normal users can only see and manage their own leads.


---
## Project Links

- **API URL:** [https://api.nowisttech.store/](https://api.nowisttech.store/)  
- **Web URL:** [https://nowisttech.store/](https://nowisttech.store/)

## Features

### Role-based Access

- **Admin**
  - Can view **all leads**.
  - Can **create, edit, and delete** any lead.
- **User**
  - Can view only their **own leads**.
  - Can **create, edit, and delete** only their leads.

### Leads Management

- **Create Lead** – Add a new lead with name, email, and status.  
- **Read Leads** – List leads in a table with search and filter functionality.  
- **Update Lead** – Edit any lead (admin) or own lead (user).  
- **Delete Lead** – Delete any lead (admin) or own lead (user).  

### UI & Features

- Responsive sidebar with mobile hamburger menu.  
- Search leads by **name or email**.  
- Filter leads by **status** (`New`, `Contacted`, `Qualified`, `Converted`, `Unqualified`).  
- Clean and modern UI with **Tailwind CSS** and **Shadcn UI** components.  
- Toast notifications for actions using **React Hot Toast**.


### Design Decisions

The dashboard was designed with simplicity and responsiveness in mind. Tailwind CSS and Shadcn UI were used for fast, consistent, and accessible styling. Redux Toolkit manages global state for leads and authentication, while the sidebar and table layouts are fully responsive. Role-based access ensures admins can manage all leads, whereas users can only view and edit their own, keeping data properly scoped.

### Time Taken

The project was developed, including frontend setup, API integration, and implementing CRUD operations. Extra focus was given to UX with toast notifications, modals, search, and status filtering, ensuring a clean for admin & users.
---


