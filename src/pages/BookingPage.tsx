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
import { UIService } from "@/types/ServiceService.types";
import AppointmentService from "@/services/appointment.service";
import { Team } from "@/types/team.type";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion"; 

const BookingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<UIService[]>([]);
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const { teams } = useTeam();
  const [selectedService, setSelectedService] = useState<UIService | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Team | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { services: filteredServices } = useServices();

  // Time slots (24-hour format, aligned with backend)
  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  // Mock unavailable slots (replace with API call if available)
  const unavailableSlots = selectedDate
    ? ["10:00", "14:00"] // Example: slots booked on selected date
    : [];

  // Pre-fill name if authenticated
  useEffect(() => {
    if (user?.fullName) {
      setName(user.fullName);
    }
  }, [user]);

  // Handle query parameters
  useEffect(() => {
    const fetchData = async () => {
      if (!filteredServices.length || !teams.length) return;

      setLoading(true);
      try {
        setServices(filteredServices);

        const queryParams = new URLSearchParams(location.search);
        const serviceId = queryParams.get("service");
        const specialistId = queryParams.get("specialist");

        if (serviceId) {
          const service = filteredServices.find((s) => s.id === serviceId);
          if (service) {
            setSelectedService(service);
            setStep(2);
          } else {
            toast({
              title: "Invalid Service",
              description: "The selected service is not available.",
              variant: "destructive",
            });
          }
        }

        if (specialistId) {
          const specialist = teams.find((s) => s.id === specialistId);
          if (specialist) {
            setSelectedSpecialist(specialist);
            setStep(serviceId ? 3 : 2);
          } else {
            toast({
              title: "Invalid Specialist",
              description: "The selected specialist is not available.",
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load booking data.",
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
    setSelectedSpecialist(specialist);
    setStep(3);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(""); // Reset time when date changes
    if (date) setStep(4);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(5);
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
      const appointmentDate = format(selectedDate, "yyyy-MM-dd");

      const response = await AppointmentService.createAppointment({
        serviceName: selectedService.name,
        specialistName: selectedSpecialist.name,
        customerName: name,
        appointmentDate,
        appointmentTime: selectedTime,
        isApproved: false,
      });

      if (response.success) {
        toast({
          title: "Booking Successful",
          description: "Your appointment has been scheduled. Check your appointments for details.",
        });
        navigate("/book ");
      } else {
        toast({
          title: "Booking Failed",
          description: response.message || "Unable to schedule your appointment.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedSpecialist(null);
    setSelectedDate(undefined);
    setSelectedTime("");
    setName(user?.fullName || "");
    setNameError("");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SectionTitle title="Choose a Service" align="left" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card
                  key={service.id}
                  className={`cursor-pointer transition-all duration-300 rounded-xl overflow-hidden ${
                    selectedService?.id === service.id
                      ? "ring-2 ring-brand-blue shadow-lg"
                      : "hover:shadow-xl hover:scale-105"
                  }`}
                  onClick={() => handleServiceSelect(service)}
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={service.serviceImageUrl || "https://via.placeholder.com/400x200"}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">{service.name}</CardTitle>
                    <CardDescription className="text-brand-gold">
                      NPR{" "}  {service.price} • {service.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-3">{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white rounded-full"
                      aria-label={`Select ${service.name} service`}
                    >
                      Select Service <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              {services.length === 0 && (
                <p className="text-center text-gray-500 col-span-full py-8">
                  No services available at this time.
                </p>
              )}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SectionTitle title="Choose a Specialist" align="left" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((specialist) => (
                <Card
                  key={specialist.id}
                  className={`cursor-pointer transition-all duration-300 rounded-xl overflow-hidden ${
                    selectedSpecialist?.id === specialist.id
                      ? "ring-2 ring-brand-blue shadow-lg"
                      : "hover:shadow-xl hover:scale-105"
                  }`}
                  onClick={() => handleSpecialistSelect(specialist)}
                >
                  <div className="h-60 overflow-hidden">
                    <img
                      src={specialist.profileImageUrl || "https://via.placeholder.com/400x300"}
                      alt={specialist.name}
                      className="h-56 w-full  object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">{specialist.name}</CardTitle>
                    <CardDescription className="text-brand-gold">
                      {specialist.specialty}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-3">{specialist.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white rounded-full"
                      aria-label={`Select ${specialist.name} as specialist`}
                    >
                      Select Specialist <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              {teams.length === 0 && (
                <p className="text-center text-gray-500 col-span-full py-8">
                  No specialists available at this time.
                </p>
              )}
            </div>
            <div className="mt-8 flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="rounded-full"
                aria-label="Back to services"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                className="rounded-full"
                aria-label="Reset booking"
              >
                Reset
              </Button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SectionTitle title="Enter Your Name & Select a Date" align="left" />
            <div className="flex flex-col items-center justify-center space-y-6 mb-8">
              <div className="w-full max-w-md">
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
                  className={`rounded-full ${nameError ? "border-red-500" : ""}`}
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
                className="rounded-xl border shadow-md bg-white p-4 w-80"
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today;
                }}
                modifiers={{
                  booked: (date) => {
                    // Mock booked dates (replace with API check)
                    const bookedDates = ["2025-04-15", "2025-04-20"];
                    return bookedDates.includes(format(date, "yyyy-MM-dd"));
                  },
                }}
                modifiersStyles={{
                  booked: { backgroundColor: "#fee2e2", color: "#dc2626" },
                }}
                aria-label="Select appointment date"
              />
            </div>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="rounded-full"
                aria-label="Back to specialists"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={() => setStep(4)}
                disabled={!selectedDate}
                className="rounded-full"
                aria-label="Continue to time selection"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SectionTitle title="Select a Time" align="left" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => handleTimeSelect(time)}
                  disabled={unavailableSlots.includes(time)}
                  className={`h-12 rounded-full transition-all ${
                    unavailableSlots.includes(time)
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-md"
                  }`}
                  aria-label={`Select ${time} time slot`}
                >
                  {time}
                </Button>
              ))}
            </div>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setStep(3)}
                className="rounded-full"
                aria-label="Back to date selection"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={() => setStep(5)}
                disabled={!selectedTime}
                className="rounded-full"
                aria-label="Review booking"
              >
                Review Booking <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <SectionTitle title="Review & Confirm" align="left" />
            <Card className="rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Booking Summary</CardTitle>
                <CardDescription>Please review your appointment details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Name:</span>
                  <span>{name || "N/A"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Service:</span>
                  <span>{selectedService?.name || "N/A"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Specialist:</span>
                  <span>{selectedSpecialist?.name || "N/A"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Date:</span>
                  <span>{selectedDate ? format(selectedDate, "PPPP") : "N/A"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Time:</span>
                  <span>{selectedTime || "N/A"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Price:</span>
                  <span>NPR{" "}{selectedService?.price ?? "N/A"}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>NPR{" "}{selectedService?.price ?? "N/A"}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep(4)}
                  className="rounded-full"
                  aria-label="Back to time selection"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={handleBooking}
                  disabled={loading || !!nameError}
                  className="rounded-full"
                  aria-label="Confirm booking"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-r from-brand-blue to-blue-700 text-white py-16">
        <div className="container-custom">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Book Your Appointment
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl"
          >
            Schedule your beauty or wellness service in a few simple steps.
          </motion.p>
        </div>
      </div>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex justify-between items-center max-w-4xl mx-auto">
              {["Service", "Specialist", "Date", "Time", "Confirm"].map((label, index) => {
                const stepNum = index + 1;
                const isActive = step === stepNum;
                const isCompleted = step > stepNum;

                return (
                  <motion.div
                    key={label}
                    className="flex flex-col items-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-2 transition-colors duration-300 ${
                        isActive
                          ? "bg-brand-blue shadow-md"
                          : isCompleted
                          ? "bg-green-500 shadow-md"
                          : "bg-gray-300"
                      }`}
                    >
                      {stepNum}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isActive ? "text-brand-blue" : isCompleted ? "text-green-500" : "text-gray-500"
                      }`}
                    >
                      {label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
            <div className="relative max-w-4xl mx-auto mt-4 hidden sm:block">
              <div className="absolute top-0 left-[10%] right-[10%] h-1 bg-gray-200"></div>
              <motion.div
                className="absolute top-0 left-[10%] h-1 bg-brand-blue"
                animate={{ width: `${(step - 1) * 20}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-brand-blue" />
                <p className="text-gray-500 mt-4">Loading...</p>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default BookingPage;