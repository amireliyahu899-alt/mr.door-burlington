
import React from 'react';
import { 
  Wrench, DoorOpen, ShieldCheck, GlassWater, Construction, 
  Settings, Lock, Home, Warehouse, Layout 
} from 'lucide-react';
import { Neighborhood, Service } from './types';

export const NEIGHBORHOODS: Neighborhood[] = [
  { id: 'aldershot', name: 'Aldershot', description: 'Serving the beautiful lakeside community of Aldershot with premium door solutions.' },
  { id: 'alton-village', name: 'Alton Village', description: 'Fast and reliable door repairs for the modern homes of Alton Village.' },
  { id: 'brant-hills', name: 'Brant Hills', description: 'Expert door installations for the family-friendly Brant Hills neighborhood.' },
  { id: 'headon-forest', name: 'Headon Forest', description: 'Comprehensive door maintenance services throughout Headon Forest.' },
  { id: 'millcroft', name: 'Millcroft', description: 'High-end door replacements and repairs for the Millcroft golf community.' },
  { id: 'mountainside', name: 'Mountainside', description: 'Local door experts available 24/7 for Mountainside residents.' },
  { id: 'orchard', name: 'The Orchard', description: 'Quality door craftsmanship for the growing Orchard community.' },
  { id: 'palmer', name: 'Palmer', description: 'Trusted door repair services for the established Palmer neighborhood.' },
  { id: 'roseland', name: 'Roseland', description: 'Specialized door restoration and repair for Roseland historic homes.' },
  { id: 'shoreacres', name: 'Shoreacres', description: 'Premium exterior and interior door services in Shoreacres.' },
  { id: 'tyandaga', name: 'Tyandaga', description: 'Professional door technicians serving the scenic Tyandaga area.' },
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
  "Front Door Replacement", "Garage Broke", "Garage Door Maintenance Services", "Glass Shower Door Repair Near Me", 
  "Handyman For Door Repair", "Handyman To Hang Doors", "Hoppe Door Hardware Repair", "Indoor Door Installation", 
  "Install Interior Door", "Interior Door Installation", "Interior Door Repair", "Metal Door Repair", 
  "Metal Door Repair Near Me", "Mr Door Repair", "My Closet Door Came Off Track", "Patio Door Rail Repair", 
  "Patio Door Repair", "Patio Door Repair Near Me", "Patio Sliding Door Repair", "Patio Sliding Door Track Repair", 
  "Pocket Door Fell Off Track", "Pocket Door Repair", "Repair Front Door", "Residential Door Repair", 
  "Residential Door Repair Near Me", "Shower Door Doesn't Close", "Shower Door Repair", "Shower Door Repair Near Me", 
  "Shower Glass Door Repair Near Me", "Shower Glass Door Replacement Cost", "Sliding Door Broken", 
  "Sliding Door Fix Near Me", "Sliding Door Lock Repair", "Sliding Pocket Door Repair", 
  "Sliding Wardrobe Door Repairs Near Me", "Steel Door Repair", "Store Front Door Repair", 
  "Storefront Door Repair", "Storm Door Glass Repair", "Storm Door Install", "Storm Door Repair", 
  "Storm Door Repairs", "Swing Door Repair", "Vinyl Door Repair", "Window And Door Repair", 
  "Window And Door Repair Near Me", "Wood Door Restoration Near Me", "Wood Doors Restoration", "Wooden Door Repair"
];

const getIcon = (name: string) => {
  if (name.includes('Glass')) return <GlassWater className="w-6 h-6" />;
  if (name.includes('Repair')) return <Wrench className="w-6 h-6" />;
  if (name.includes('Installation') || name.includes('Install')) return <Construction className="w-6 h-6" />;
  if (name.includes('Lock')) return <Lock className="w-6 h-6" />;
  if (name.includes('Commercial') || name.includes('Business')) return <Warehouse className="w-6 h-6" />;
  if (name.includes('Garage')) return <Settings className="w-6 h-6" />;
  if (name.includes('Front') || name.includes('Entry')) return <ShieldCheck className="w-6 h-6" />;
  if (name.includes('Interior') || name.includes('Closet')) return <Home className="w-6 h-6" />;
  return <DoorOpen className="w-6 h-6" />;
};

export const SERVICES: Service[] = RAW_SERVICES.map(name => ({
  id: name.toLowerCase().replace(/\s+/g, '-'),
  name: name,
  description: `Professional ${name} services in Burlington, Ontario. High-quality craftsmanship and reliable service.`,
  icon: name, // We use the mapping function in the component
  longDescription: `At Mr. Door Burlington, our ${name} services are designed to restore security, functionality, and aesthetic appeal to your property. Whether you are dealing with wear and tear or require a brand new installation, our certified technicians bring years of expertise to every project in Burlington. We use only premium materials and the latest techniques to ensure long-lasting results.`
}));

export const getIconComponent = (name: string) => getIcon(name);
