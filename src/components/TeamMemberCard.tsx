import React from "react";
import { Team } from "@/types/team.type";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TeamMemberCardProps {
  member: Team;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  // Fallback image if profileImageUrl is missing
  const fallbackImage = "https://via.placeholder.com/400x300?text=No+Image";

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image Section */}
      <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
        <img
          src={member.profileImageUrl || fallbackImage}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {/* Gradient Overlay for better text contrast (optional) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-6 text-center flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">{member.name}</h3>
          <p className="text-brand-gold font-medium mb-3">{member.specialty}</p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {member.description}
          </p>
        </div>
        <Button
          asChild
          className="mt-4 bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300"
        >
          <Link to={`/book?specialist=${member.id}`}>
            Book With {member.name.split(" ")[0]}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default TeamMemberCard;