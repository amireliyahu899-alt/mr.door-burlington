
import React from 'react';
import { 
  Wrench, DoorOpen, ShieldCheck, GlassWater, Construction, 
  Settings, Lock, Home, Warehouse, Layout 
} from 'lucide-react';
import { Neighborhood, Service } from './types';

export const NEIGHBORHOODS: Neighborhood[] = [
  { id: 'aldershot', name: 'Aldershot', description: 'Expert door services for the Lakeside community.' },
  { id: 'alton-village', name: 'Alton Village', description: 'Modern door solutions for North Burlington homes.' },
  { id: 'brant-hills', name: 'Brant Hills', description: 'Trusted door repairs in the heart of Brant Hills.' },
  { id: 'headon-forest', name: 'Headon Forest', description: 'Comprehensive door maintenance for Headon Forest.' },
  { id: 'millcroft', name: 'Millcroft', description: 'Premium door installation for Millcroft residents.' },
  { id: 'mountainside', name: 'Mountainside', description: '24/7 emergency door repairs in Mountainside.' },
  { id: 'orchard', name: 'The Orchard', description: 'Quality door craftsmanship for The Orchard.' },
  { id: 'palmer', name: 'Palmer', description: 'Local door experts serving the Palmer neighborhood.' },
  { id: 'roseland', name: 'Roseland', description: 'Specialized door restoration for Roseland estates.' },
  { id: 'shoreacres', name: 'Shoreacres', description: 'Luxury door services for Shoreacres properties.' },
  { id: 'tyandaga', name: 'Tyandaga', description: 'Professional door technicians in scenic Tyandaga.' },
];

export const RAW_SERVICES = [
  "Door Replacement", "Glass Door Repair", "Automatic Door Repair", "Barn Door Installation",
  "Basement Door Installation", "Broken Door Repair", "Broken Front Door", "Business Door Repair",
  "Closet Door Fix", "Closet Door Installation", "Closet Door Repair Near Me", "Closet Glass Door Repair",
  "Closet Sliding Door Repair", "Commercial Door Repair", "Door And Windows Repair Near Me",
  "Door Casing Repair", "Door Closer Repair Near Me", "Door Contractor", "Door Expert",
  "Door Installation Near Me", "Door Installations", "Door Issue", "Door Lock Repair Near Me",
  "Door Repair", "Door Repair Mississauga", "Door Repair Near Me", "Door Service",
  "Door Specialist Near Me", "Door Technician", "Door Warped", "Door Weather Stripping Service",
  "Doors Repair Service Near Me", "Emergency Door Repair", "Entry Door Repair", "Entry Door Repairs Near Me",
  "Exterior Door Installer Near Me", "Exterior Door Repair Service", "Exterior Door Weather Stripping Repair",
  "Fiberglass Door Repair", "Fix Slide Door", "Frame Door Repair", "French Door Installation",
  "Front Door Jammed", "Front Door Lock Repair Near Me", "Front Door Repair", "Front Door Repairs Near Me",
  "Front Door Replacement", "Garage Broke", "Garage Door Maintenance Services", "Glass Door Repair",
  "Glass Shower Door Repair Near Me", "Handyman For Door Repair", "Handyman To Hang Doors",
  "Hoppe Door Hardware Repair", "Indoor Door Installation", "Install Interior Door",
  "Interior Door Installation", "Interior Door Repair", "Metal Door Repair", "Metal Door Repair Near Me",
  "Mr Door Repair", "My Closet Door Came Off Track", "Patio Door Rail Repair", "Patio Door Repair",
  "Patio Door Repair Near Me", "Patio Sliding Door Repair", "Patio Sliding Door Track Repair",
  "Pocket Door Fell Off Track", "Pocket Door Repair", "Repair Front Door", "Residential Door Repair",
  "Residential Door Repair Near Me", "Shower Door Doesn't Close", "Shower Door Repair",
  "Shower Door Repair Near Me", "Shower Glass Door Repair Near Me", "Shower Glass Door Replacement Cost",
  "Sliding Door Broken", "Sliding Door Fix Near Me", "Sliding Door Lock Repair", "Sliding Pocket Door Repair",
  "Sliding Wardrobe Door Repairs Near Me", "Steel Door Repair", "Store Front Door Repair",
  "Storefront Door Repair", "Storm Door Glass Repair", "Storm Door Install", "Storm Door Repair",
  "Storm Door Repairs", "Swing Door Repair", "Vinyl Door Repair", "Window And Door Repair",
  "Window And Door Repair Near Me", "Wood Door Restoration Near Me", "Wood Doors Restoration", "Wooden Door Repair"
];

const getIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('glass') || n.includes('shower')) return <GlassWater className="w-6 h-6" />;
  if (n.includes('repair') || n.includes('fix')) return <Wrench className="w-6 h-6" />;
  if (n.includes('install') || n.includes('replacement')) return <Construction className="w-6 h-6" />;
  if (n.includes('lock') || n.includes('hardware')) return <Lock className="w-6 h-6" />;
  if (n.includes('commercial') || n.includes('business') || n.includes('store')) return <Warehouse className="w-6 h-6" />;
  if (n.includes('garage')) return <Settings className="w-6 h-6" />;
  if (n.includes('front') || n.includes('entry') || n.includes('exterior')) return <ShieldCheck className="w-6 h-6" />;
  if (n.includes('interior') || n.includes('closet') || n.includes('barn')) return <Home className="w-6 h-6" />;
  return <DoorOpen className="w-6 h-6" />;
};

export const SERVICES: Service[] = RAW_SERVICES.map(name => ({
  id: name.toLowerCase().trim().replace(/\s+/g, '-'),
  name: name,
  description: `Professional ${name} in Burlington, ON. High-quality service for all local neighborhoods.`,
  icon: name,
  longDescription: `Need reliable ${name}? Mr. Door Burlington specializes in professional door services tailored to your needs. Our certified technicians bring years of experience to every job, ensuring your doors are safe, functional, and aesthetically pleasing. We serve all Burlington neighborhoods with 24/7 support.`
}));

export const getIconComponent = (name: string) => getIcon(name);
