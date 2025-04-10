
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/SectionTitle';
import { Service, TeamMember, Appointment } from '@/types';
import { serviceAPI, teamAPI, appointmentAPI } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { 
  ArrowRight, 
  Calendar as CalendarIcon 
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const BookingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [specialists, setSpecialists] = useState<TeamMember[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<TeamMember | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { authState } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Available time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];
  
  // Get query parameters (for direct booking from other pages)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const serviceId = queryParams.get('service');
    const specialistId = queryParams.get('specialist');
    
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, we would fetch from the API
        // const [servicesData, specialistsData] = await Promise.all([
        //   serviceAPI.getAll(),
        //   teamAPI.getAll()
        // ]);
        
        // Mock data for demonstration
        const servicesData: Service[] = [
          {
            id: 1,
            name: 'Premium Haircut & Styling',
            description: 'Complete transformation with expert cutting and styling techniques.',
            serviceImageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            price: 65,
            duration: '60 min'
          },
          {
            id: 2,
            name: 'Men\'s Haircut & Beard Trim',
            description: 'Classic men\'s haircut with precision beard trimming and styling.',
            serviceImageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            price: 45,
            duration: '45 min'
          },
          {
            id: 3,
            name: 'Hair Coloring',
            description: 'Vibrant, long-lasting hair color services including full color, highlights, balayage, and ombre.',
            serviceImageUrl: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            price: 95,
            duration: '120 min'
          },
          {
            id: 4,
            name: 'Relaxation Massage',
            description: 'Release tension and promote relaxation with our skilled therapists.',
            serviceImageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            price: 85,
            duration: '60 min'
          },
          {
            id: 5,
            name: 'Signature Facial',
            description: 'Revitalize your skin with our customized facial treatments.',
            serviceImageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            price: 75,
            duration: '45 min'
          }
        ];
        
        const specialistsData: TeamMember[] = [
          {
            id: 1,
            name: 'Sophia Rodriguez',
            description: 'With over 10 years of experience, Sophia specializes in cutting-edge hair design and coloring techniques.',
            profileImageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            specialty: 'Hair Stylist'
          },
          {
            id: 2,
            name: 'James Wilson',
            description: 'James is a certified massage therapist with expertise in Swedish, deep tissue, and hot stone massage.',
            profileImageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            specialty: 'Massage Therapist'
          },
          {
            id: 3,
            name: 'Emma Chen',
            description: 'Emma is a licensed esthetician specializing in customized facials and skin treatments.',
            profileImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            specialty: 'Esthetician'
          }
        ];
        
        setServices(servicesData);
        setSpecialists(specialistsData);
        
        // Set pre-selected service or specialist if provided in URL
        if (serviceId) {
          const service = servicesData.find(s => s.id === parseInt(serviceId));
          if (service) {
            setSelectedService(service);
            setStep(2);
          }
        }
        
        if (specialistId) {
          const specialist = specialistsData.find(s => s.id === parseInt(specialistId));
          if (specialist) {
            setSelectedSpecialist(specialist);
            setStep(specialistId && serviceId ? 3 : 1);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load booking data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [location.search, toast]);
  
  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep(2);
  };
  
  const handleSpecialistSelect = (specialist: TeamMember) => {
    setSelectedSpecialist(specialist);
    setStep(3);
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) setStep(4);
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(5);
  };
  
  const handleBooking = async () => {
    if (!authState.isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to complete your booking.",
        variant: "destructive",
      });
      navigate('/login?redirect=book');
      return;
    }
    
    if (!selectedService || !selectedSpecialist || !selectedDate || !selectedTime) {
      toast({
        title: "Incomplete Booking",
        description: "Please complete all booking steps.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // In a real app, we would call the API
      // const appointment: Omit<Appointment, 'id'> = {
      //   serviceName: selectedService.name,
      //   specialistName: selectedSpecialist.name,
      //   customerName: authState.user?.fullName || '',
      //   appointmentDate: selectedDate.toISOString(),
      //   appointmentTime: selectedTime,
      //   isApproved: false
      // };
      // 
      // await appointmentAPI.create(appointment);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Booking Successful",
        description: "Your appointment has been scheduled. You will receive a confirmation email shortly.",
      });
      
      navigate('/appointments');
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Booking Failed",
        description: "Failed to schedule your appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-fade-in">
            <SectionTitle title="Choose a Service" align="left" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => (
                <Card 
                  key={service.id} 
                  className={`cursor-pointer transition-all ${selectedService?.id === service.id ? 'ring-2 ring-brand-blue' : 'hover:shadow-md'}`}
                  onClick={() => handleServiceSelect(service)}
                >
                  <div className="h-40 overflow-hidden">
                    <img src={service.serviceImageUrl} alt={service.name} className="w-full h-full object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle>{service.name}</CardTitle>
                    <CardDescription>${service.price} • {service.duration}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Select Service <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="animate-fade-in">
            <SectionTitle title="Choose a Specialist" align="left" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialists.map(specialist => (
                <Card 
                  key={specialist.id} 
                  className={`cursor-pointer transition-all ${selectedSpecialist?.id === specialist.id ? 'ring-2 ring-brand-blue' : 'hover:shadow-md'}`}
                  onClick={() => handleSpecialistSelect(specialist)}
                >
                  <div className="h-48 overflow-hidden">
                    <img src={specialist.profileImageUrl} alt={specialist.name} className="w-full h-full object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle>{specialist.name}</CardTitle>
                    <CardDescription>{specialist.specialty}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-3">{specialist.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Select Specialist <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="animate-fade-in">
            <SectionTitle title="Select a Date" align="left" />
            <div className="flex justify-center mb-6">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border bg-card p-3 pointer-events-auto"
                disabled={(date) => {
                  // Disable past dates and Sundays
                  return date < new Date() || date.getDay() === 0;
                }}
              />
            </div>
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="mr-2"
              >
                Back to Specialists
              </Button>
              <Button
                onClick={() => selectedDate && setStep(4)}
                disabled={!selectedDate}
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="animate-fade-in">
            <SectionTitle title="Select a Time" align="left" />
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
              {timeSlots.map(time => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => handleTimeSelect(time)}
                  className="h-12"
                >
                  {time}
                </Button>
              ))}
            </div>
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setStep(3)}
                className="mr-2"
              >
                Back to Date
              </Button>
              <Button
                onClick={() => setStep(5)}
                disabled={!selectedTime}
              >
                Review Booking <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="animate-fade-in max-w-2xl mx-auto">
            <SectionTitle title="Review & Confirm" align="left" />
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
                <CardDescription>Please review your appointment details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Service:</span>
                  <span>{selectedService?.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Specialist:</span>
                  <span>{selectedSpecialist?.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Date:</span>
                  <span>{selectedDate ? format(selectedDate, 'PPPP') : ''}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Time:</span>
                  <span>{selectedTime}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Price:</span>
                  <span>${selectedService?.price}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${selectedService?.price}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep(4)}
                >
                  Back
                </Button>
                <Button
                  onClick={handleBooking}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Confirm Booking"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        );
    }
  };
  
  return (
    <Layout>
      <div className="bg-brand-blue text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">Book Your Appointment</h1>
          <p className="text-xl">
            Schedule your beauty or wellness service in a few simple steps.
          </p>
        </div>
      </div>
      
      <section className="section-padding">
        <div className="container-custom">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex justify-between items-center max-w-3xl mx-auto">
              {['Service', 'Specialist', 'Date', 'Time', 'Confirm'].map((label, index) => {
                const stepNum = index + 1;
                const isActive = step === stepNum;
                const isCompleted = step > stepNum;
                
                return (
                  <div key={label} className="flex flex-col items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white mb-2 ${
                        isActive ? 'bg-brand-blue' : isCompleted ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      {stepNum}
                    </div>
                    <span className={`text-sm ${isActive ? 'text-brand-blue font-medium' : ''}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="relative max-w-3xl mx-auto mt-4 hidden sm:block">
              <div className="absolute top-0 left-[10%] right-[10%] h-1 bg-gray-200"></div>
              <div 
                className="absolute top-0 left-[10%] h-1 bg-brand-blue transition-all" 
                style={{ width: `${(step - 1) * 20}%` }}
              ></div>
            </div>
          </div>
          
          {loading && step === 1 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : (
            renderStep()
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BookingPage;
