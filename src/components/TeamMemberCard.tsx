
import React from 'react';
import { TeamMember } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={member.profileImageUrl} 
          alt={member.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
        />
      </div>
      <div className="p-5 text-center">
        <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
        <p className="text-brand-gold mb-3">{member.specialty}</p>
        <p className="text-gray-600 mb-4 line-clamp-3">{member.description}</p>
        <Button asChild>
          <Link to={`/book?specialist=${member.id}`}>Book With {member.name.split(' ')[0]}</Link>
        </Button>
      </div>
    </div>
  );
};

export default TeamMemberCard;
