# ✅ Vintage Story Market: Two-Week Checklist (June 4–June 18)

## 🔹 WEEK 1: UI + Structure (June 4–June 10)
**Goal:** React and Flask are connected. You have a working homepage and a simple “Post a Story” form.

### 🧱 Project Setup
- [ ] Organize project folders (React in `frontend/`, Flask in `backend/` or similar)
- [ ] Confirm Flask blueprint structure is registered and routing works
- [ ] Confirm React dev server proxies API correctly (`proxy` setting in `package.json`)

### 🎨 UI Components
- [ ] Build homepage layout in React (`Home.jsx`)
- [ ] Create basic navbar (Home | Post | About)
- [ ] Add a “Post a Story” form:
  - [ ] Title
  - [ ] Description
  - [ ] Image upload input (not functional yet)

### 📌 By June 10:
- [ ] You can visit your app in the browser and interact with the form (even if data isn't saved yet)

---

## 🔹 WEEK 2: Flask Integration (June 11–June 18)
**Goal:** Stories are saved and displayed using Flask routes + state in React.

### 🔄 Back-End Flask API
- [ ] Create `/api/stories` GET route to return list of posts
- [ ] Create `/api/stories` POST route to accept form submissions
- [ ] Store data temporarily in JSON file or SQLite (your choice)

### 🔗 React Integration
- [ ] Submit form data to Flask with `fetch` or Axios
- [ ] On success, show confirmation or refresh feed
- [ ] Build a basic feed of “story cards” below the form:
  - [ ] Display title
  - [ ] Description
  - [ ] Image preview (use mock placeholder if image upload isn’t ready)

### 📌 By June 18:
- [ ] You can create a story post and see it added to a visible list on the homepage

---

## 🌱 Optional Stretch Goals
- [ ] Add one playful/gamified feature (e.g., “shuffle collage” or “memory match”)
- [ ] Write a short mission statement or landing page copy
- [ ] Add light styling: soft edges, big fonts, calm colors
