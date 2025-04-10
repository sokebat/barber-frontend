import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { PlusCircle, Pencil, Trash2, Loader2 } from "lucide-react";
import { useTeam } from "@/contexts/TeamContext";
import { Team, UpdateTeamDto, CreateTeamDto } from "@/types/team.type";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "../ui/use-toast";
import TeamService from "@/services/team.service";

const TeamTab = () => {
  const { teams, getAllTeams, loading } = useTeam();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [formData, setFormData] = useState<CreateTeamDto>({
    id: Math.floor(Math.random() * 100000),
    name: "",
    specialty: "",
    profileImageUrl: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isDialogOpen) {
      setFormData({
        id: Math.floor(Math.random() * 100000),
        name: "",
        specialty: "",
        profileImageUrl: "",
        description: "",
      });
      setSelectedTeam(null);
      setIsAdding(false);
    }
  }, [isDialogOpen]);

  const handleOpenAddDialog = () => {
    setIsAdding(true);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (team: Team) => {
    setSelectedTeam(team);
    setFormData({
      id: team.id,
      name: team.name,
      specialty: team.specialty || "",
      profileImageUrl: team.profileImageUrl || "",
      description: team.description || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      try {
        const response = await TeamService.deleteTeam(id);
        if (response.success) {
          toast({
            title: "Success",
            description: "Team member deleted successfully",
          });
          getAllTeams();
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        console.error("Error deleting team member:", error);
        toast({
          title: "Error",
          description: "Failed to delete team member",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isAdding) {
        const response = await TeamService.createTeam(formData);
        if (response.success) {
          toast({
            title: "Success",
            description: "Team member added successfully",
          });
          setIsDialogOpen(false);
          getAllTeams();
        } else {
          throw new Error(response.message);
        }
      } else if (selectedTeam) {
        const updateData: UpdateTeamDto = { ...formData };
        const response = await TeamService.updateTeam(
          selectedTeam.id.toString(),
          updateData
        );
        if (response.success) {
          toast({
            title: "Success",
            description: "Team member updated successfully",
          });
          setIsDialogOpen(false);
          getAllTeams();
        } else {
          throw new Error(response.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>View and manage staff</CardDescription>
            </div>
            <Button onClick={handleOpenAddDialog} disabled={loading}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
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
                {teams.length > 0 ? (
                  teams.map((member: Team) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                          <img
                            src={
                              member.profileImageUrl || "/default-avatar.png"
                            }
                            alt={member.name}
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
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenEditDialog(member)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:bg-red-50"
                          onClick={() => handleDelete(member.id.toString())}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No team members found. Click "Add Team Member" to create
                      one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
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
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter name"
                required
                disabled={submitting}
              />
            </div>
            <div>
              <Label htmlFor="specialty">Specialty</Label>
              <Input
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleInputChange}
                placeholder="Enter specialty"
                required
                disabled={submitting}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                required
                disabled={submitting}
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
            <div className="flex justify-end space-x-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isAdding ? "Add Member" : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamTab;