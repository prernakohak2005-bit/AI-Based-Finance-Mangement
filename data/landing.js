import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
} from "lucide-react";

/* ================= HELPER FUNCTIONS ================= */

// Format number to Indian currency (₹)
export const formatINR = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// Convert large number to Crore format (for UI like landing page)
export const formatToCrore = (amount) => {
  return (amount / 10000000).toFixed(0) + " Cr+";
};

/* ================= STATS DATA ================= */

export const statsData = [
  {
    value: "50K+",
    label: "Active Users",
  },
  {
    value: "₹16,000 Cr+",
    label: "Transactions Tracked",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
  {
    value: "4.9/5",
    label: "User Rating",
  },
];

/* ================= FEATURES DATA ================= */

export const featuresData = [
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "Advanced Analytics",
    description:
      "Get detailed insights into your spending patterns with AI-powered analytics",
  },
  {
    icon: <Receipt className="h-8 w-8 text-blue-600" />,
    title: "Smart Receipt Scanner",
    description:
      "Extract data automatically from receipts using advanced AI technology",
  },
  {
    icon: <PieChart className="h-8 w-8 text-blue-600" />,
    title: "Budget Planning",
    description:
      "Create and manage budgets with intelligent recommendations",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-blue-600" />,
    title: "Multi-Account Support",
    description:
      "Manage multiple accounts and credit cards in one place",
  },
  {
    icon: <Globe className="h-8 w-8 text-blue-600" />,
    title: "Multi-Currency Support",
    description:
      "Handle multiple currencies with real-time conversion (₹, $, € etc.)",
  },
  {
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    title: "Automated Insights",
    description:
      "Get automated financial insights and recommendations",
  },
];

/* ================= HOW IT WORKS ================= */

export const howItWorksData = [
  {
    icon: <CreditCard className="h-8 w-8 text-blue-600" />,
    title: "1. Create Your Account",
    description:
      "Get started in minutes with our simple and secure sign-up process",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "2. Track Your Spending",
    description:
      "Automatically categorize and track your transactions in real-time",
  },
  {
    icon: <PieChart className="h-8 w-8 text-blue-600" />,
    title: "3. Get Insights",
    description:
      "Receive AI-powered insights and recommendations to optimize your finances",
  },
];

/* ================= TESTIMONIALS ================= */

export const testimonialsData = [
  {
    name: "Rohit Sharma",
    role: "Small Business Owner",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "Welth has completely changed how I manage my finances. The AI insights helped me save thousands every month.",
  },
  {
    name: "Priya Mehta",
    role: "Freelancer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "The receipt scanner is a lifesaver! No more manual expense tracking.",
  },
  {
    name: "Amit Verma",
    role: "Financial Advisor",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    quote:
      "Perfect for Indian users. The ₹ support and analytics make it very practical.",
  },
];