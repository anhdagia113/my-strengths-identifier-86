
export const SERVICES = [
  { 
    id: "1", 
    name: "Chăm sóc da cơ bản", 
    price: 450000,
    description: "Làm sạch, tẩy tế bào chết và dưỡng ẩm chuyên sâu",
    duration: 60,
    category: "Chăm sóc da"
  },
  { 
    id: "2", 
    name: "Trị mụn chuyên sâu", 
    price: 650000,
    description: "Điều trị mụn, thâm nám và các vấn đề da khác",
    duration: 90,
    category: "Điều trị"
  },
  { 
    id: "3", 
    name: "Trẻ hóa da", 
    price: 850000,
    description: "Sử dụng công nghệ hiện đại giúp làn da trẻ trung hơn",
    duration: 120,
    category: "Trẻ hóa"
  },
];

export const SPECIALISTS = [
  { 
    id: "1", 
    name: "Nguyễn Thị A",
    role: "Chuyên viên điều trị da",
    experience: "5 năm",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    availability: ["09:00", "10:00", "14:00", "15:00"]
  },
  { 
    id: "2", 
    name: "Trần Văn B",
    role: "Chuyên viên trẻ hóa",
    experience: "7 năm",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    availability: ["10:00", "11:00", "15:00", "16:00"]
  },
  { 
    id: "3", 
    name: "Lê Thị C",
    role: "Chuyên viên massage",
    experience: "3 năm",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    availability: ["09:00", "11:00", "14:00", "17:00"]
  },
];

export const TIME_SLOTS = [
  "09:00", "10:00", "11:00",
  "14:00", "15:00", "16:00", "17:00"
];
