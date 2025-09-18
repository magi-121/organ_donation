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

export const hospitals = [
  {
    id: 1,
    name: "City General Hospital",
    location: "Downtown District",
    distance: "2.5 km",
    contact: "+1-234-567-8900",
    availableOrgans: [
      { organName: "Heart", bloodGroup: "O+", quantity: 1, urgency: "Critical", expiryTime: "12 hours" },
      { organName: "Kidney", bloodGroup: "B+", quantity: 2, urgency: "High", expiryTime: "24 hours" }
    ]
  },
  {
    id: 2,
    name: "St. Mary's Medical Center",
    location: "North Avenue",
    distance: "5 km",
    contact: "+1-234-567-8901",
    availableOrgans: [
      { organName: "Liver", bloodGroup: "A+", quantity: 1, urgency: "High", expiryTime: "18 hours" },
      { organName: "Eyes", bloodGroup: "Universal", quantity: 4, urgency: "Low", expiryTime: "48 hours" }
    ]
  },
  {
    id: 3,
    name: "Central Hospital",
    location: "Medical District",
    distance: "0 km",
    contact: "+1-234-567-8902",
    availableOrgans: [
      { organName: "Blood", bloodGroup: "AB-", quantity: 10, urgency: "Medium", expiryTime: "35 days" },
      { organName: "Kidney", bloodGroup: "O-", quantity: 1, urgency: "Critical", expiryTime: "20 hours" }
    ]
  },
  {
    id: 4,
    name: "Regional Medical Center",
    location: "East Side",
    distance: "8 km",
    contact: "+1-234-567-8903",
    availableOrgans: [
      { organName: "Heart", bloodGroup: "A-", quantity: 1, urgency: "Critical", expiryTime: "10 hours" },
      { organName: "Lungs", bloodGroup: "B+", quantity: 1, urgency: "High", expiryTime: "15 hours" }
    ]
  },
  {
    id: 5,
    name: "University Hospital",
    location: "Campus Area",
    distance: "12 km",
    contact: "+1-234-567-8904",
    availableOrgans: [
      { organName: "Liver", bloodGroup: "AB+", quantity: 2, urgency: "Medium", expiryTime: "20 hours" },
      { organName: "Blood", bloodGroup: "O+", quantity: 15, urgency: "Low", expiryTime: "30 days" }
    ]
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
