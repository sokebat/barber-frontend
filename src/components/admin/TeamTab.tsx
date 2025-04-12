// src/components/TeamTab.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PlusCircle,
  Pencil,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import TeamService from "@/services/team.service";
import { Team, CreateTeamDto, UpdateTeamDto } from "@/types/team.type";

const TeamTab: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [teamToDelete, setTeamToDelete] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [formData, setFormData] = useState<CreateTeamDto>({
    name: "",
    specialty: "",
    profileImageUrl: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Fetch all teams on component mount
  useEffect(() => {
    fetchTeams();
  }, []);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isDialogOpen) {
      setFormData({
        name: "",
        specialty: "",
        profileImageUrl: "",
        description: "",
      });
      setSelectedTeam(null);
      setIsAdding(false);
      setFormError(null);
      setFormSuccess(null);
      setError(null);
    }
  }, [isDialogOpen]);

  const fetchTeams = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await TeamService.getAllTeam();
      if (response.success && response.data) {
        setTeams(response.data);
      } else {
        throw new Error(response.message || "Failed to fetch teams");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch teams";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddDialog = () => {
    setIsAdding(true);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (team: Team) => {
    setSelectedTeam(team);
    setFormData({
      name: team.name,
      specialty: team.specialty || "",
      profileImageUrl: team.profileImageUrl || "",
      description: team.description || "",
    });
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = (id: string) => {
    setTeamToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!teamToDelete) return;

    setSubmitting(true);
    try {
      const response = await TeamService.deleteTeam(teamToDelete);
      if (response.success) {
        setTeams((prev) =>
          prev.filter((team) => team.id.toString() !== teamToDelete)
        );
        toast({
          title: "Success",
          description: "Team member deleted successfully",
          className: "bg-green-50 text-green-800 border-green-200",
        });
      } else {
        throw new Error(response.message || "Failed to delete team member");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete team member";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
      setIsDeleteDialogOpen(false);
      setTeamToDelete(null);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setFormError("Name is required");
      return false;
    }
    if (!formData.specialty.trim()) {
      setFormError("Specialty is required");
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      if (isAdding) {
        const response = await TeamService.createTeam(formData);
        if (response.success && response.data) {
          setTeams((prev) => [...prev, response.data]);
          setFormSuccess("Team member added successfully");
          toast({
            title: "Success",
            description: "Team member added successfully",
            className: "bg-green-50 text-green-800 border-green-200",
          });
          setTimeout(() => {
            setIsDialogOpen(false);
          }, 1000);
        } else {
          throw new Error(response.message || "Failed to create team member");
        }
      } else if (selectedTeam) {
        const updateData: UpdateTeamDto = { ...formData, id: selectedTeam.id };
        const response = await TeamService.updateTeam(
          selectedTeam.id.toString(),
          updateData
        );
        if (response.success) {
          setFormSuccess("Team member updated successfully");
          toast({
            title: "Success",
            description: "Team member updated successfully",
            className: "bg-green-50 text-green-800 border-green-200",
          });
          setIsDialogOpen(false);
          fetchTeams();
        } else {
          throw new Error(response.message || "Failed to update team member");
        }
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setFormError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError || formSuccess) {
      setFormError(null);
      setFormSuccess(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>Manage your barbers and staff</CardDescription>
            </div>
            <Button onClick={handleOpenAddDialog} disabled={loading}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : teams.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Photo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                          <img
                            src={
                              member.profileImageUrl || "/default-avatar.png"
                            }
                            alt={`${member.name}'s profile`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/default-avatar.png";
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {member.name}
                      </TableCell>
                      <TableCell>{member.specialty}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenEditDialog(member)}
                            aria-label={`Edit ${member.name}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:bg-red-50"
                            onClick={() =>
                              handleConfirmDelete(member.id.toString())
                            }
                            aria-label={`Delete ${member.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No team members found. Click "Add Team Member" to create one.
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isAdding ? "Add Team Member" : "Edit Team Member"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}

            {formSuccess && (
              <Alert
                variant="default"
                className="bg-green-50 text-green-800 border-green-200"
              >
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{formSuccess}</AlertDescription>
              </Alert>
            )}

            <div>
              <Label htmlFor="name">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter name"
                required
                disabled={submitting}
                className={
                  formError && !formData.name.trim() ? "border-red-500" : ""
                }
              />
            </div>
            <div>
              <Label htmlFor="specialty">
                Specialty <span className="text-red-500">*</span>
              </Label>
              <Input
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleInputChange}
                placeholder="Enter specialty (e.g., Haircut, Beard Trim)"
                required
                disabled={submitting}
                className={
                  formError && !formData.specialty.trim()
                    ? "border-red-500"
                    : ""
                }
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                disabled={submitting}
                className="min-h-24"
              />
            </div>
            <div>
              <Label htmlFor="profileImageUrl">Profile Image URL</Label>
              <Input
                id="profileImageUrl"
                name="profileImageUrl"
                value={formData.profileImageUrl}
                onChange={handleInputChange}
                placeholder="Enter image URL"
                disabled={submitting}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting || formSuccess !== null}
              >
                {submitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isAdding ? "Add Member" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the
              team member from your system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={submitting}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TeamTab;
