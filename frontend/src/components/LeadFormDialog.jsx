"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { createLead } from "@/store/slices/leadSlice";
import toast from "react-hot-toast";

export default function LeadFormDialog({ open, setOpen }) {
  const [form, setForm] = useState({ name: "", email: "", status: "new" });
  const dispatch = useDispatch();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(form.email)) {
      toast.error("Please write valid email");
      return;
    }
    const loading = toast.loading("Creating Lead...");
    try {
      await dispatch(createLead(form)).unwrap();
      toast.dismiss(loading);

      setForm({ name: "", email: "", status: "new" });
      setOpen(false);
      toast.success("Lead is created successfully");
    } catch (error) {
      toast.dismiss(loading);

      toast.error(error || "failed to create lead");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-3">
          <Input
            placeholder="Name"
            value={form.name}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={form.email}
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <select
            value={form.status}
            required
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full border rounded p-2"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="unqualified">Unqualified</option>
          </select>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
