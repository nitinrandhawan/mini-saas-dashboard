"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads, deleteLead } from "@/store/slices/leadSlice";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LeadFormDialog from "@/components/LeadFormDialog";
import Sidebar from "@/components/Sidebar";
import toast from "react-hot-toast";

export default function LeadsPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.leads);

  const [openDialog, setOpenDialog] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteLead = async () => {
     setConfirmOpen(false);
     const toastId = toast.loading("Deleting lead...");
     try {
         await dispatch(deleteLead(selectedId)).unwrap();
         toast.dismiss(toastId);
         setSelectedId(null);
      toast.success("Lead deleted successfully");
    } catch (error) {
      toast.dismiss(toastId);
         setSelectedId(null);

      toast.error(error || "Failed to delete lead");
    } 
  };

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  if (loading) return <div className="p-5">Loading...</div>;

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-5">
        {/* Header */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">All Leads</h1>
          <Button onClick={() => setOpenDialog(true)}>+ Add Lead</Button>
        </div>

        {/* Add Lead Dialog */}
        <LeadFormDialog open={openDialog} setOpen={setOpenDialog} />

        {/* Leads Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items?.length > 0 ? (
                items.map((lead) => (
                  <tr key={lead._id}>
                    <td className="p-2 border">{lead.name}</td>
                    <td className="p-2 border">{lead.email}</td>
                    <td className="p-2 border">{lead.status}</td>
                    <td className="p-2 border space-x-2">
                         <Button
                        variant="outline"
                        size="sm"
                        className={"bg-red-600 text-white"}
                        onClick={() => handleUpdateLead(lead)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={"bg-red-600 text-white"}
                        onClick={() => {
                          setSelectedId(lead._id);
                          setConfirmOpen(true);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-2 border text-center">
                    No leads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🧩 Confirmation Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Lead</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete this lead? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteLead}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
