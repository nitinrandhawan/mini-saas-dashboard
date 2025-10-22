"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads, deleteLead } from "@/store/slices/leadSlice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LeadFormDialog from "@/components/LeadFormDialog";
import Sidebar from "@/components/Sidebar";
import toast from "react-hot-toast";
import EditLeadDialog from "@/components/EditLeadDialog";
import { Input } from "@/components/ui/input"; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 

export default function LeadsPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.leads);
  const { user } = useSelector((state) => state.user);

  const [openDialog, setOpenDialog] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleEditLead = (lead) => {
    setSelectedLead(lead);
    setOpenEdit(true);
  };

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

  // Filter items based on search and status
  const filteredItems = items.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || statusFilter === ""
        ? true
        : lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-5">
        <div className="flex flex-col md:flex-row justify-between md:items-center max-md:w-sm max-md:ml-20 mb-4 gap-3">
          <h1 className="text-2xl font-bold hidden md:block">All Leads</h1>

          <div className="flex flex-row md:flex-row gap-2 w-sm items-center">
            <Input
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="unqualified">Unqualified</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={() => setOpenDialog(true)}>+ Add Lead</Button>
          </div>
        </div>

        {/* Add/Edit Lead Dialogs */}
        <LeadFormDialog open={openDialog} setOpen={setOpenDialog} />
        <EditLeadDialog
          open={openEdit}
          setOpen={setOpenEdit}
          lead={selectedLead}
        />

        {/* Leads Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Status</th>
                {user?.role === "admin" && (
                  <th className="p-2 border">Owner</th>
                )}
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((lead) => (
                  <tr key={lead._id}>
                    <td className="p-2 border">{lead.name}</td>
                    <td className="p-2 border">{lead.email}</td>
                    <td className="p-2 border">{lead.status}</td>
                    {user?.role === "admin" && (
                      <td className="p-2 border">{lead?.owner?.name}</td>
                    )}
                    <td className="p-2 border space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-gray-800 text-white"
                        onClick={() => handleEditLead(lead)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-600 text-white"
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
                  <td
                    colSpan={user?.role === "admin" ? 5 : 4}
                    className="p-2 border text-center"
                  >
                    No leads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation */}
        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Lead</DialogTitle>
            </DialogHeader>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this lead? This action cannot be
              undone.
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
    </div>
  );
}
