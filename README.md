# SecureVault Dashboard

A modern enterprise-grade file explorer built for SecureVault Inc. using React and TailwindCSS.

This project was designed and developed as part of a frontend engineering challenge focused on recursive UI architecture, accessibility, and modern interaction design.

---

# Live Demo

🔗 Live Application: https://secure-vault-dashboard-zyld.vercel.app/

---

# Design File

 Figma Design: 
 https://www.figma.com/design/zYf2dRQIkQ2E0v8mLwUQhR/Secure-vault?node-id=0-1&p=f&t=BTRjcDJASYBjTk8L-0


# Features

## Recursive File Explorer
- Fully recursive folder and file rendering
- Supports deeply nested folder structures
- Dynamic expand/collapse behavior

## Keyboard Accessibility
- Arrow Up / Down navigation
- Arrow Right expands folders
- Arrow Left collapses folders
- Enter selects focused items

## Properties Inspector
Displays:
- File name
- File type
- File size
- Security metadata

## Recursive Search & Auto Expand
- Search filters files recursively
- Parent folders auto-expand when matches are found
- Improves navigation for deeply nested enterprise data

## VS Code–Style Focus System
- Selection persists independently from focus
- Clicking outside removes visual focus while preserving selection

---

# Wildcard Feature

## Smart Recursive Search + Auto Folder Expansion

I implemented a recursive search system that automatically expands parent folders when nested matches are detected.

### Why this adds value
Enterprise users often work with deeply nested folder structures containing thousands of files. Automatically revealing matching paths significantly improves navigation speed and usability.

This feature reduces the time required to locate sensitive files and improves the overall user experience for power users.

---

# Recursive Rendering Strategy

The file explorer uses a recursive component architecture.

Each folder node renders its own children using the same `TreeNode` component recursively. This allows the UI to support any depth of nested folders without requiring additional hardcoded levels.

The recursive search system also traverses nested children dynamically to identify matching nodes and expand their parent folders automatically.

---

# Tech Stack

- React
- Vite
- TailwindCSS

---

# Installation

```bash
npm install
npm run dev

# Run:

```bash id="plslfe"
git add .
git commit -m "Write professional project documentation and README"
git push