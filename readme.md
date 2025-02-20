# To-Do App  

This web app is built with **React** and initialized using **Vite**.  

## Getting Started  

To run the web app locally, follow these steps:  

1. Download the project code:

   ```sh
   git clone https://github.com/alessiogs/todo-app
   ```
   
3. Navigate to the `todo-app` directory.
   
   ```sh
   cd todo-app
   ```
   
5. Install dependencies:  

   ```sh
   npm install
   ```  

6. Start the development server:  

   ```sh
   npm run dev
   ```  

7. By default, the web app should be available at [http://localhost:5173](http://localhost:5173).  
   - If port `5173` is already in use, Vite will start the app on a different port. You can check the terminal output for the correct URL.  

---

## Overview  

The app interacts with a simulated backend using fake REST APIs from:  

🔗 **[JSONPlaceholder - /todos](https://jsonplaceholder.typicode.com/todos)**  

The API provides a list of 200 task objects, where each task has the following structure:  

```json
{
  "id": 1,          // Unique ID (1-200)
  "userId": 3,      // User ID (1-10) who owns the task
  "title": "Task description",
  "completed": false // Task status
}
```

---

## API Limitations  

Due to the nature of this fake API, there are some **functional limitations**:  

❌ **Cannot persist newly created tasks**  
- When creating a task via `POST`, the API always returns an object with `id: 201`, but it does **not** actually add the task to the database.  
- This means that if you refresh the page, the newly created task will disappear.  

❌ **Cannot modify or delete newly created tasks**  
- Since newly created tasks are not actually stored, trying to modify a task with `id: 201` will result in an error.  
- Only tasks **already existing in the database (id 1-200)** can be updated or deleted.  

✔️ **Existing tasks can be modified**  
- You can edit task titles, mark them as completed/incomplete, and delete them.  

---

## Testing  

The following tests can be performed:  

### ✅ Create a new task  
- Note: The new task **will not persist** after a page reload.  

### ✅ Modify an existing task  
- Edit the text of any **pre-existing** task (`id 1-200`).  
- Example PUT request to modify a task:  

### ✅ Mark a task as "Completed"  
- Toggle the `completed` status of an **existing** task (`id 1-200`).  

### ✅ Delete an existing task  
- Example DELETE request (`id 1-200`):

### 🛑 Simulate a **backend connection error**  
- Delete a letter from the `apiUrl` variable in `/src/api/api.js`:  

  ```js
  const apiUrl = "https://jsonplaceholder.typicode.com/todos"; // Delete a letter to break it
  ```

### 🛑 Simulate **data fetch failure**  
- Modify `/src/components/TasksList.js` (line 15) by setting `setTasks("")`:  

  ```js
  setTasks(""); // Simulate an empty response
  ```

### 🛑 Simulate **no tasks available**  
- Modify `/src/components/TasksList.js` (line 15) by setting `setTasks([])`:  

  ```js
  setTasks([]); // Simulate an empty task list
  ```

---

## Switching Users  

To simulate logging in as a different user:  

1. Open `/src/App.js`.  
2. Change the `id` value in the `user` state (line 6):  

   ```js
   const [user, setUser] = useState({ id: 2 }); // Change to another user ID (1-10)
   ```
---
