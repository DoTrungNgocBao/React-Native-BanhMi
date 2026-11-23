
export const services = [
  {
    id: "1",
    name: "Cắt tóc Premium",
    category: "HAIR STUDIO",
    duration: 45,
    price: 120000,
    rating: "4.9",
    icon: "✂️",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900",
    description: "Trải nghiệm cắt tóc chuyên nghiệp, tư vấn kiểu tóc và tạo kiểu theo phong cách cá nhân."
  },
  {
    id: "2",
    name: "Massage thư giãn",
    category: "WELLNESS SPA",
    duration: 60,
    price: 350000,
    rating: "4.9",
    icon: "🌿",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900",
    description: "Không gian thư giãn yên tĩnh, giúp cơ thể nghỉ ngơi sau những giờ học tập và làm việc."
  },
  {
    id: "3",
    name: "Chăm sóc móng",
    category: "NAIL STUDIO",
    duration: 50,
    price: 180000,
    rating: "4.8",
    icon: "💅",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900",
    description: "Làm sạch, chăm sóc và trang trí móng với nhiều phong cách và màu sắc."
  },
  {
    id: "4",
    name: "Chăm sóc da",
    category: "SKIN CARE",
    duration: 75,
    price: 420000,
    rating: "4.9",
    icon: "✨",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900",
    description: "Quy trình chăm sóc da nhẹ nhàng với không gian hiện đại và thoải mái."
  }
];

export const formatPrice = (price) =>
  price.toLocaleString("vi-VN") + "đ";
