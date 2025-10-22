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

---


