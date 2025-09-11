export const organs = [
  {
    id: 1,
    name: "Heart",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
    bloodGroups: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    urgency: "High",
    description: "Vital organ responsible for pumping blood throughout the body"
  },
  {
    id: 2,
    name: "Liver",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
    bloodGroups: ["A+", "B+", "AB+", "O+"],
    urgency: "Medium",
    description: "Largest internal organ, essential for detoxification"
  },
  {
    id: 3,
    name: "Kidney",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
    bloodGroups: ["A+", "A-", "B+", "B-", "O+", "O-"],
    urgency: "High",
    description: "Filters blood and produces urine"
  },
  {
    id: 4,
    name: "Eyes",
    image: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=400",
    bloodGroups: ["Universal"],
    urgency: "Low",
    description: "Corneal transplants can restore vision"
  },
  {
    id: 5,
    name: "Lungs",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
    bloodGroups: ["A+", "B+", "AB+", "O+"],
    urgency: "High",
    description: "Essential for breathing and oxygen exchange"
  },
  {
    id: 6,
    name: "Blood",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400",
    bloodGroups: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    urgency: "Medium",
    description: "Can be donated regularly to save lives"
  }
];

export const hospitalOrgans = [
  {
    id: 1,
    organName: "Heart",
    bloodGroup: "O+",
    hospital: "City General Hospital",
    distance: "2.5 km",
    urgency: "Critical",
    quantity: 1,
    expiryTime: "12 hours"
  },
  {
    id: 2,
    organName: "Kidney",
    bloodGroup: "A+",
    hospital: "St. Mary's Medical Center",
    distance: "5 km",
    urgency: "High",
    quantity: 2,
    expiryTime: "24 hours"
  },
  {
    id: 3,
    organName: "Liver",
    bloodGroup: "B+",
    hospital: "Central Hospital",
    distance: "0 km",
    urgency: "Medium",
    quantity: 1,
    expiryTime: "18 hours"
  },
  {
    id: 4,
    organName: "Eyes",
    bloodGroup: "Universal",
    hospital: "Eye Care Institute",
    distance: "8 km",
    urgency: "Low",
    quantity: 4,
    expiryTime: "48 hours"
  },
  {
    id: 5,
    organName: "Blood",
    bloodGroup: "AB-",
    hospital: "Regional Blood Bank",
    distance: "3 km",
    urgency: "High",
    quantity: 10,
    expiryTime: "35 days"
  }
];

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const urgencyReasons = [
  "Emergency surgery required",
  "Critical condition",
  "Scheduled transplant",
  "Preventive care",
  "Quality of life improvement"
];
