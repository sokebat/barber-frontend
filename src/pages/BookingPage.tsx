import Layout from "@/components/layout/Layout";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useServices } from "@/contexts/ServiceContext";
import { useTeam } from "@/contexts/TeamContext";
import { useToast } from "@/hooks/use-toast";
import { UIService } from "@/types/AppointmentService.types";
import AppointmentService from "@/services/appointment.service";
import { Team } from "@/types/team.type";
import { format, parse } from "date-fns";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

const BookingPage: React.FC = () => {
  // Step management: 1: Service; 2: Specialist; 3: Date; 4: Time; 5: Confirm
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<UIService[]>([]);
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const { teams } = useTeam();
  const [selectedService, setSelectedService] = useState<UIService | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { services: filteredServices } = useServices();

  // Available time slots in 12-hour format
  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  // If the user is authenticated, pre-fill the name if available
  useEffect(() => {
    if (user?.fullName) {
      setName(user.fullName);
    }
  }, [user]);

  // Get query parameters (for direct booking from other pages)
  useEffect(() => {
    const fetchData = async () => {
      // Wait until filteredServices and teams are available
      if (!filteredServices.length || !teams.length) return;

      setLoading(true);
      try {
        setServices(filteredServices);

        const queryParams = new URLSearchParams(location.search);
        const serviceId = queryParams.get("service");
        const specialistId = queryParams.get("specialist");

        if (serviceId) {
          const service = filteredServices.find((s) => +s.id === parseInt(serviceId));
          if (service) {
            setSelectedService(service);
            setStep(2);
          }
        }

        if (specialistId) {
          const specialist = teams.find((s) => s.id === parseInt(specialistId));
          if (specialist) {
            setSelectedSpecialist(specialist.name);
            setStep(serviceId ? 3 : 1);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
  }, [location.search, filteredServices, teams, toast]);

  const handleServiceSelect = (service: UIService) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleSpecialistSelect = (specialist: Team) => {
    setSelectedSpecialist(specialist.name);
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

  // Helper: Convert 12-hour time (e.g., "1:00 PM") to 24-hour format string "HH:mm:ss"
  const convertTo24HourFormat = (time12h: string) => {
    const parsedTime = parse(time12h, "h:mm a", new Date());
    return format(parsedTime, "HH:mm:ss");
  };

  // Helper: Combine selectedDate and 24-hour formatted time to form an ISO datetime string
  const combineDateAndTime = (date: Date, time24: string) => {
    const [hours, minutes, seconds] = time24.split(":").map(Number);
    const combined = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
      seconds
    );
    return combined.toISOString();
  };

  const validateName = (name: string): boolean => {
    if (!name.trim()) {
      setNameError("Name is required");
      return false;
    }
    if (!/^[A-Za-z\s]+$/.test(name)) {
      setNameError("Name can only contain letters and spaces");
      return false;
    }
    setNameError("");
    return true;
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to complete your booking.",
        variant: "destructive",
      });
      navigate("/login?redirect=/book");
      return;
    }

    if (!validateName(name)) {
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
      // Convert the selected time to 24-hour format
      const time24 = convertTo24HourFormat(selectedTime);
      // Combine the selected date and time into an ISO datetime string
      const appointmentCombined = combineDateAndTime(selectedDate, time24);
      // Format the appointment date as yyyy-MM-dd
      const formattedAppointmentDate = format(selectedDate, "yyyy-MM-dd");

      const response = await AppointmentService.createAppointment({
        id: Math.random(),
        serviceName: selectedService.name,
        specialistName: selectedSpecialist,
        customerName: name,
        appointment: appointmentCombined,
        appointmentDate: formattedAppointmentDate,
        appointmentTime: time24,
        isApproved: false,
      });

      if (response.success) {
        toast({
          title: "Booking Successful",
          description: "Your appointment has been scheduled. You will receive a confirmation email shortly.",
        });
        navigate("/appointments"); // Redirect to appointments page
      } else {
        toast({
          title: "Booking Failed",
          description: response.message || "Failed to schedule your appointment. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error booking appointment:", error);
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to schedule your appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Render step content based on current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-fade-in">
            <SectionTitle title="Choose a Service" align="left" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card
                  key={service.id}
                  className={`cursor-pointer transition-all ${
                    selectedService?.id === service.id
                      ? "ring-2 ring-brand-blue"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => handleServiceSelect(service)}
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={service.serviceImageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{service.name}</CardTitle>
                    <CardDescription>
                      ${service.price} • {service.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" aria-label={`Select ${service.name} service`}>
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
              {teams.map((specialist) => (
                <Card
                  key={specialist.id}
                  className={`cursor-pointer transition-all ${
                    selectedSpecialist === specialist.name
                      ? "ring-2 ring-brand-blue"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => handleSpecialistSelect(specialist)}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={specialist.profileImageUrl}
                      alt={specialist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{specialist.name}</CardTitle>
                    <CardDescription>{specialist.specialty}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-3">{specialist.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" aria-label={`Select ${specialist.name} as specialist`}>
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
            <SectionTitle title="Enter Your Name & Select a Date" align="left" />
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="mt-6 mb-8 max-w-md w-full">
                <label htmlFor="name" className="block text-lg font-medium mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    validateName(e.target.value);
                  }}
                  placeholder="Enter your name"
                  aria-describedby={nameError ? "name-error" : undefined}
                />
                {nameError && (
                  <p id="name-error" className="text-red-500 text-sm mt-1">
                    {nameError}
                  </p>
                )}
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border bg-card p-3 w-72 pointer-events-auto"
                disabled={(date) => date < new Date() || date.getDay() === 0}
                aria-label="Select appointment date"
              />
            </div>
            <div className="flex justify-center">
              <Button variant="outline" onClick={() => setStep(2)} className="mr-2">
                Back to Specialists
              </Button>
              <Button onClick={() => selectedDate && setStep(4)} disabled={!selectedDate}>
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
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => handleTimeSelect(time)}
                  className="h-12"
                  aria-label={`Select ${time} time slot`}
                >
                  {time}
                </Button>
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="outline" onClick={() => setStep(3)} className="mr-2">
                Back to Date
              </Button>
              <Button onClick={() => setStep(5)} disabled={!selectedTime}>
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
                  <span className="font-medium">Name:</span>
                  <span>{name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Service:</span>
                  <span>{selectedService?.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Specialist:</span>
                  <span>{selectedSpecialist}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Date:</span>
                  <span>{selectedDate ? format(selectedDate, "PPPP") : ""}</span>
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
                <Button variant="outline" onClick={() => setStep(4)}>
                  Back
                </Button>
                <Button onClick={handleBooking} disabled={loading || !!nameError}>
                  {loading ? "Processing..." : "Confirm Booking"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        );

      default:
        return null;
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
              {["Service", "Specialist", "Date", "Time", "Confirm"].map((label, index) => {
                const stepNum = index + 1;
                const isActive = step === stepNum;
                const isCompleted = step > stepNum;

                return (
                  <div key={label} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white mb-2 ${
                        isActive
                          ? "bg-brand-blue"
                          : isCompleted
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    >
                      {stepNum}
                    </div>
                    <span
                      className={`text-sm ${isActive ? "text-brand-blue font-medium" : ""}`}
                    >
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