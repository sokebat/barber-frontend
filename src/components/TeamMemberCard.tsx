import React from "react";
import { Team } from "@/types/team.type";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TeamMemberCardProps {
  member: Team;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-xs mx-auto overflow-hidden">
      {/* Image */}
      <div className="h-64 overflow-hidden">
        <img
          src={member.profileImageUrl || fallbackImage}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{member.name}</h3>
        <p className="text-sm text-brand-gold mb-1">{member.specialty}</p>
        <p className="text-gray-600 text-xs line-clamp-2">{member.description}</p>

        <Button
          asChild
          className="mt-3 w-full bg-brand-blue hover:bg-brand-gold-dark text-white text-sm font-medium py-1.5 rounded-full"
        >
          <Link to={`/book`}>Book {member.name.split(" ")[0]}</Link>
        </Button>
      </div>
    </div>
  );
};

export default TeamMemberCard;
