'use client'
import HomeComponent from "@/pages/home";
import LoginComponent from "@/pages/login";
import Recover from "@/pages/login/recover";
import Profile from "@/pages/profile/profile";
import EditTaskComponent from "@/pages/task/[id]";
import CreateTaskComponent from "@/pages/task/create";
import RegisterComponent from "@/pages/login/register";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/login/register" element={<RegisterComponent />} />
          <Route path="/login/recover" element={<Recover />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/task/create" element={<CreateTaskComponent />} />
          <Route path='/task/:id' element={<EditTaskComponent />} />
          <Route path="/profile/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
          
