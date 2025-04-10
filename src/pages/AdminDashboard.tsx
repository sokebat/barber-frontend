
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Appointment, Service, Product, TeamMember } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  Check,
  Users,
  Store,
  Scissors,
  Bell,
  X,
  Search,
  PlusCircle,
  Menu,
  FileText,
  LogOut,
  Home,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard: React.FC = () => {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('appointments');
  const [isMobile, setIsMobile] = useState(false);
  
  // Mock data
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is admin, otherwise redirect
    if (!authState.isAuthenticated || authState.user?.role !== 'admin') {
      toast({
        title: "Unauthorized",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app we would fetch data from the API
        
        // Mock data
        const appointmentsData: Appointment[] = [
          {
            id: 1,
            serviceName: 'Premium Haircut & Styling',
            specialistName: 'Sophia Rodriguez',
            customerName: 'John Smith',
            appointmentDate: '2025-04-12T10:00:00',
            appointmentTime: '10:00 AM',
            isApproved: true
          },
          {
            id: 2,
            serviceName: 'Relaxation Massage',
            specialistName: 'James Wilson',
            customerName: 'Emma Johnson',
            appointmentDate: '2025-04-12T14:00:00',
            appointmentTime: '2:00 PM',
            isApproved: true
          },
          {
            id: 3,
            serviceName: 'Hair Coloring',
            specialistName: 'Sophia Rodriguez',
            customerName: 'Michael Davis',
            appointmentDate: '2025-04-13T11:00:00',
            appointmentTime: '11:00 AM',
            isApproved: false
          },
          {
            id: 4,
            serviceName: 'Signature Facial',
            specialistName: 'Emma Chen',
            customerName: 'Sarah Wilson',
            appointmentDate: '2025-04-14T15:00:00',
            appointmentTime: '3:00 PM',
            isApproved: false
          }
        ];
        
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
            name: 'Relaxation Massage',
            description: 'Release tension and promote relaxation with our skilled therapists.',
            serviceImageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            price: 85,
            duration: '60 min'
          },
          {
            id: 3,
            name: 'Signature Facial',
            description: 'Revitalize your skin with our customized facial treatments.',
            serviceImageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            price: 75,
            duration: '45 min'
          }
        ];
        
        const productsData: Product[] = [
          {
            id: 1,
            name: 'Hydrating Shampoo',
            description: 'Premium hydrating shampoo for all hair types.',
            price: 24.99,
            discountPrice: 19.99,
            imageUrl: 'https://images.unsplash.com/photo-1626766632648-f5e0c0a1506a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            categoryName: 'Hair Care'
          },
          {
            id: 2,
            name: 'Beard Oil',
            description: 'Nourishing beard oil for a healthy, shiny beard.',
            price: 29.99,
            imageUrl: 'https://images.unsplash.com/photo-1621607512022-6aecc4fed814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
            categoryName: 'Beard Care'
          }
        ];
        
        const teamData: TeamMember[] = [
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
        
        setAppointments(appointmentsData);
        setServices(servicesData);
        setProducts(productsData);
        setTeam(teamData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [authState, navigate, toast]);
  
  const handleApproveAppointment = (id: number) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, isApproved: true } : appointment
    ));
    
    toast({
      title: "Appointment Approved",
      description: "The appointment has been approved successfully.",
    });
  };
  
  const handleRejectAppointment = (id: number) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
    
    toast({
      title: "Appointment Rejected",
      description: "The appointment has been rejected and removed.",
    });
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const getOverviewStats = () => {
    return {
      totalAppointments: appointments.length,
      pendingAppointments: appointments.filter(a => !a.isApproved).length,
      totalServices: services.length,
      totalProducts: products.length,
      totalTeamMembers: team.length,
    };
  };
  
  const stats = getOverviewStats();
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Button */}
      <div className="block lg:hidden fixed z-20 top-4 left-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-white shadow-md"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Sidebar */}
      <aside 
        className={`fixed lg:relative z-10 h-full bg-brand-blue text-white transition-all duration-300 ${
          isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h1 className={`text-xl font-bold ${!isSidebarOpen && 'lg:hidden'}`}>
                Admin<span className="text-brand-gold">Panel</span>
              </h1>
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-white hover:bg-brand-blue/60 -mr-2"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
          
          <nav className="flex-1 px-4 pb-4">
            <ul className="space-y-2">
              <li>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-white hover:bg-brand-blue/60 ${activeTab === 'dashboard' ? 'bg-brand-blue/60' : ''}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className={!isSidebarOpen ? 'lg:hidden' : ''}>Dashboard</span>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-white hover:bg-brand-blue/60 ${activeTab === 'appointments' ? 'bg-brand-blue/60' : ''}`}
                  onClick={() => setActiveTab('appointments')}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className={!isSidebarOpen ? 'lg:hidden' : ''}>Appointments</span>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-white hover:bg-brand-blue/60 ${activeTab === 'services' ? 'bg-brand-blue/60' : ''}`}
                  onClick={() => setActiveTab('services')}
                >
                  <Scissors className="h-5 w-5 mr-2" />
                  <span className={!isSidebarOpen ? 'lg:hidden' : ''}>Services</span>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-white hover:bg-brand-blue/60 ${activeTab === 'products' ? 'bg-brand-blue/60' : ''}`}
                  onClick={() => setActiveTab('products')}
                >
                  <Store className="h-5 w-5 mr-2" />
                  <span className={!isSidebarOpen ? 'lg:hidden' : ''}>Products</span>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-white hover:bg-brand-blue/60 ${activeTab === 'team' ? 'bg-brand-blue/60' : ''}`}
                  onClick={() => setActiveTab('team')}
                >
                  <Users className="h-5 w-5 mr-2" />
                  <span className={!isSidebarOpen ? 'lg:hidden' : ''}>Team</span>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-white hover:bg-brand-blue/60 ${activeTab === 'reports' ? 'bg-brand-blue/60' : ''}`}
                  onClick={() => setActiveTab('reports')}
                >
                  <FileText className="h-5 w-5 mr-2" />
                  <span className={!isSidebarOpen ? 'lg:hidden' : ''}>Reports</span>
                </Button>
              </li>
            </ul>
          </nav>
          
          <div className="p-4 border-t border-brand-blue/30">
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-brand-blue/60"
              onClick={() => navigate('/')}
            >
              <Home className="h-5 w-5 mr-2" />
              <span className={!isSidebarOpen ? 'lg:hidden' : ''}>Back to Site</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-brand-blue/60 mt-2"
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span className={!isSidebarOpen ? 'lg:hidden' : ''}>Logout</span>
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className={`flex-1 p-6 lg:p-8 ${isSidebarOpen ? 'lg:ml-0' : ''} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === 'dashboard' && 'Dashboard Overview'}
                {activeTab === 'appointments' && 'Appointment Management'}
                {activeTab === 'services' && 'Services Management'}
                {activeTab === 'products' && 'Product Management'}
                {activeTab === 'team' && 'Team Management'}
                {activeTab === 'reports' && 'Reports & Analytics'}
              </h1>
              <p className="text-gray-500 mt-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="w-10 h-10 rounded-full bg-brand-gold text-brand-blue flex items-center justify-center font-bold mr-2">
                {authState.user?.fullName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">{authState.user?.fullName}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">Loading dashboard data...</p>
            </div>
          ) : (
            <>
              {/* Dashboard Overview */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.totalAppointments}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {stats.pendingAppointments} pending approval
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Services</CardTitle>
                        <Scissors className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.totalServices}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Available services
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Products</CardTitle>
                        <Store className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.totalProducts}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          In inventory
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.totalTeamMembers}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Active staff
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="col-span-1">
                      <CardHeader>
                        <CardTitle>Recent Appointments</CardTitle>
                        <CardDescription>Latest appointment bookings</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Customer</TableHead>
                              <TableHead>Service</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {appointments.slice(0, 5).map(appointment => (
                              <TableRow key={appointment.id}>
                                <TableCell>{appointment.customerName}</TableCell>
                                <TableCell>{appointment.serviceName}</TableCell>
                                <TableCell>{formatDate(appointment.appointmentDate)}</TableCell>
                                <TableCell>
                                  <Badge variant={appointment.isApproved ? "default" : "outline"}>
                                    {appointment.isApproved ? "Approved" : "Pending"}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                    
                    <Card className="col-span-1">
                      <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common tasks and operations</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button className="w-full justify-start" onClick={() => setActiveTab('appointments')}>
                          <Calendar className="mr-2 h-4 w-4" />
                          Manage Appointments
                        </Button>
                        <Button className="w-full justify-start" onClick={() => setActiveTab('services')}>
                          <Scissors className="mr-2 h-4 w-4" />
                          Add New Service
                        </Button>
                        <Button className="w-full justify-start" onClick={() => setActiveTab('products')}>
                          <Store className="mr-2 h-4 w-4" />
                          Manage Inventory
                        </Button>
                        <Button className="w-full justify-start" onClick={() => setActiveTab('team')}>
                          <Users className="mr-2 h-4 w-4" />
                          Schedule Staff
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Bell className="mr-2 h-4 w-4" />
                          Send Notifications
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
              
              {/* Appointments Tab */}
              {activeTab === 'appointments' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <CardTitle>Appointment Management</CardTitle>
                          <CardDescription>View and manage client appointments</CardDescription>
                        </div>
                        <div className="flex mt-4 md:mt-0">
                          <div className="relative w-full md:w-64">
                            <Input
                              placeholder="Search appointments..."
                              className="pl-10"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="upcoming">
                        <TabsList className="mb-4">
                          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
                          <TabsTrigger value="all">All Appointments</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="upcoming" className="space-y-4">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead>Specialist</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {appointments
                                .filter(a => a.isApproved)
                                .map(appointment => (
                                <TableRow key={appointment.id}>
                                  <TableCell>{appointment.customerName}</TableCell>
                                  <TableCell>{appointment.serviceName}</TableCell>
                                  <TableCell>{appointment.specialistName}</TableCell>
                                  <TableCell>
                                    {formatDate(appointment.appointmentDate)}
                                    <div className="text-sm text-gray-500">{appointment.appointmentTime}</div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge>Approved</Badge>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button variant="outline" size="sm">
                                      Details
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TabsContent>
                        
                        <TabsContent value="pending" className="space-y-4">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead>Specialist</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {appointments
                                .filter(a => !a.isApproved)
                                .map(appointment => (
                                <TableRow key={appointment.id}>
                                  <TableCell>{appointment.customerName}</TableCell>
                                  <TableCell>{appointment.serviceName}</TableCell>
                                  <TableCell>{appointment.specialistName}</TableCell>
                                  <TableCell>
                                    {formatDate(appointment.appointmentDate)}
                                    <div className="text-sm text-gray-500">{appointment.appointmentTime}</div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="outline">Pending</Badge>
                                  </TableCell>
                                  <TableCell className="text-right space-x-2">
                                    <Button 
                                      variant="default" 
                                      size="sm"
                                      onClick={() => handleApproveAppointment(appointment.id)}
                                    >
                                      <Check className="h-4 w-4 mr-1" />
                                      Approve
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="border-red-300 text-red-500 hover:text-red-600"
                                      onClick={() => handleRejectAppointment(appointment.id)}
                                    >
                                      <X className="h-4 w-4 mr-1" />
                                      Reject
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                              
                              {appointments.filter(a => !a.isApproved).length === 0 && (
                                <TableRow>
                                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                                    No pending appointments
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TabsContent>
                        
                        <TabsContent value="all" className="space-y-4">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead>Specialist</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {appointments.map(appointment => (
                                <TableRow key={appointment.id}>
                                  <TableCell>{appointment.customerName}</TableCell>
                                  <TableCell>{appointment.serviceName}</TableCell>
                                  <TableCell>{appointment.specialistName}</TableCell>
                                  <TableCell>
                                    {formatDate(appointment.appointmentDate)}
                                    <div className="text-sm text-gray-500">{appointment.appointmentTime}</div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant={appointment.isApproved ? "default" : "outline"}>
                                      {appointment.isApproved ? "Approved" : "Pending"}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button variant="outline" size="sm">
                                      Details
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {/* Services Tab */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <CardTitle>Services Management</CardTitle>
                          <CardDescription>View and manage salon services</CardDescription>
                        </div>
                        <div className="flex gap-2 mt-4 md:mt-0">
                          <Button>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add New Service
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {services.map(service => (
                            <TableRow key={service.id}>
                              <TableCell>
                                <div className="w-12 h-12 rounded-md overflow-hidden">
                                  <img 
                                    src={service.serviceImageUrl} 
                                    alt={service.name} 
                                    className="w-full h-full object-cover" 
                                  />
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">{service.name}</TableCell>
                              <TableCell>${service.price?.toFixed(2)}</TableCell>
                              <TableCell>{service.duration}</TableCell>
                              <TableCell className="text-right space-x-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {/* Products Tab */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <CardTitle>Product Management</CardTitle>
                          <CardDescription>View and manage inventory</CardDescription>
                        </div>
                        <div className="flex gap-2 mt-4 md:mt-0">
                          <Button>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add New Product
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Discount</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.map(product => (
                            <TableRow key={product.id}>
                              <TableCell>
                                <div className="w-12 h-12 rounded-md overflow-hidden">
                                  <img 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover" 
                                  />
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">{product.name}</TableCell>
                              <TableCell>{product.categoryName}</TableCell>
                              <TableCell>${product.price.toFixed(2)}</TableCell>
                              <TableCell>
                                {product.discountPrice ? (
                                  <Badge variant="secondary">
                                    ${product.discountPrice.toFixed(2)}
                                  </Badge>
                                ) : (
                                  <span className="text-gray-500">-</span>
                                )}
                              </TableCell>
                              <TableCell className="text-right space-x-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {/* Team Tab */}
              {activeTab === 'team' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <CardTitle>Team Management</CardTitle>
                          <CardDescription>View and manage staff</CardDescription>
                        </div>
                        <div className="flex gap-2 mt-4 md:mt-0">
                          <Button>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Team Member
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
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
                          {team.map(member => (
                            <TableRow key={member.id}>
                              <TableCell>
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                  <img 
                                    src={member.profileImageUrl} 
                                    alt={member.name} 
                                    className="w-full h-full object-cover" 
                                  />
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">{member.name}</TableCell>
                              <TableCell>{member.specialty}</TableCell>
                              <TableCell className="text-right space-x-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="outline" size="sm">Schedule</Button>
                                <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {/* Reports Tab */}
              {activeTab === 'reports' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Reports & Analytics</CardTitle>
                      <CardDescription>View business performance and metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <p className="text-gray-500">Reports feature will be available soon.</p>
                        <Button className="mt-4">Generate Sample Report</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
