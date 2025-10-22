"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { updateLead } from "@/store/slices/leadSlice";
import toast from "react-hot-toast";

export default function EditLeadDialog({ open, setOpen, lead }) {
  const [form, setForm] = useState({ name: "", email: "", status: "new" });
  const dispatch = useDispatch();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (lead) {
      setForm({
        name: lead.name || "",
        email: lead.email || "",
        status: lead.status || "new",
      });
    }
  }, [lead]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    const loading = toast.loading("Updating lead...");
    try {
      await dispatch(updateLead({ id: lead._id, data: form })).unwrap();
      toast.dismiss(loading);
      toast.success("Lead updated successfully");
      setOpen(false);
    } catch (error) {
      toast.dismiss(loading);
      toast.error(error || "Failed to update lead");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Lead</DialogTitle>
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
            Update
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
