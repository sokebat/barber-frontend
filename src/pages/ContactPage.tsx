import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/SectionTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();
  
  const onSubmit = (data: ContactFormData) => {
    console.log('Form data submitted:', data);
    // In a real application, you would send this data to your backend
    
    toast({
      title: "Message sent!",
      description: "We've received your message and will get back to you soon.",
    });
    
    reset();
  };
  
  return (
    <Layout>
      {/* Contact Hero Section */}
      <div className="bg-brand-blue text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl">
            Have questions or ready to schedule an appointment? We'd love to hear from you.
          </p>
        </div>
      </div>
      
      {/* Contact Details & Form Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-brand-blue mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Address</h3>
                    <p>123 Beauty Lane</p>
                    <p>Wellness City, WC 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-brand-blue mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p>(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-brand-blue mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p>info@salonsuite.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-brand-blue mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                    <p>Saturday: 9:00 AM - 6:00 PM</p>
                    <p>Sunday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="h-[300px] rounded-lg overflow-hidden shadow-lg mt-8">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215583065787!2d-74.00597242346168!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s123%20Broadway%2C%20New%20York%2C%20NY%2010007!5e0!3m2!1sen!2sus!4v1642809505176!5m2!1sen!2sus" 
                  className="w-full h-full border-0" 
                  allowFullScreen 
                  loading="lazy"
                  title="SalonSuite Location"
                ></iframe>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    {...register("phone", { required: "Phone number is required" })}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    {...register("subject", { required: "Subject is required" })}
                    className={errors.subject ? "border-red-500" : ""}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    {...register("message", { required: "Message is required" })}
                    className={errors.message ? "border-red-500" : ""}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>
                
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <SectionTitle 
            title="Frequently Asked Questions" 
            subtitle="Find answers to common questions about our services and policies."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">Do I need to book an appointment?</h3>
              <p>
                Yes, we recommend booking an appointment to ensure availability. You can book online or by calling us directly.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">What is your cancellation policy?</h3>
              <p>
                We require 24 hours notice for cancellations. Late cancellations or no-shows may be subject to a fee.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">Do you offer gift cards?</h3>
              <p>
                Yes! Gift cards are available for purchase in-store or online in any denomination.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">What payment methods do you accept?</h3>
              <p>
                We accept all major credit cards, debit cards, cash, and digital payment methods like Apple Pay and Google Pay.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;