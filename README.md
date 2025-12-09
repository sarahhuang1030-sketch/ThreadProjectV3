# 🌍 Travel Experts – Full-Stack Web Application

A full-stack travel booking platform built with **Next.js**, **Azure SQL**, and **modern cloud deployment practices**.  
This project demonstrates real-world authentication, database integration, internationalization, and cloud connectivity.

---

## 🚀 Live Demo

🔗 **Website:** https://travel-expert-website.onrender.com  
📦 **API Example:** `/api/packages`

---

## 🧠 Project Overview

<img width="1918" height="947" alt="Screenshot 2025-12-09 094235" src="https://github.com/user-attachments/assets/c5ed3f08-12a4-46d8-8567-66249d5e6bbb" />
<img width="1919" height="947" alt="Screenshot 2025-12-09 094251" src="https://github.com/user-attachments/assets/f7c1d932-96d3-4ac6-babe-1fdf77c4cb42" />

---

**Travel Experts** allows users to:
- Browse active & expired vacation packages
- View package details and availability
- Book vacation packages
- View agency locations via Google Maps
- Switch languages (EN / ES)
- Persist user session data
- Integrate securely with a cloud SQL database

This project focuses on **production-ready architecture**, not just UI.

---

## 🛠 Tech Stack


### Frontend
- **Next.js 13+ (App Router)**
- React (Client & Server Components)
- Bootstrap + Tailwind utility classes
- Internationalization (i18n)
- Google Maps API (Advanced Markers)
- Fetch-based API data loading

### Backend
- **Next.js API Routes**
- Azure SQL Database
- MSSQL Node driver with connection pooling
- Secure environment-based configuration

### Cloud & Deployment
- **Render** (Production hosting)
- **Azure SQL Database**
- Environment variable-driven configuration
- SSL/TLS encrypted connections

---

## 🗂 Key Features

✅ Dynamic package loading (active & expired)  
✅ Client-side rendering to avoid SSR build failures  
✅ Azure SQL connection pooling  
✅ Booking creation with relational data inserts  
✅ Google Maps with clickable agency markers  
✅ Language switcher (ES / EN)  
✅ Secure environment configuration  
✅ Production-safe error handling  

---

## 🧱 Architecture Highlights

```text
Next.js App
├── app/
│   ├── api/
│   │   ├── packages/
│   │   ├── bookings/
│   │   └── agencies/
│   ├── components/
│   ├── context/
│   └── lib/
│       ├── database.js
│       └── package.js
