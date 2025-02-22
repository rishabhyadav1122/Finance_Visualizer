import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, PieChart, PiggyBank  } from 'lucide-react';

function Sidebar({ isOpen }) {
  const menuItems = [
    { icon: PieChart, text: 'Analytics', path: '/analytics' },
    { icon: PiggyBank , text: 'Budget', path: '/budget' },
  ];
 
  return (
    <motion.div
    initial={{ width: 0 }}
    animate={{ width: isOpen ? 256 : 0 }}
    className="fixed top-0 left-0 h-full bg-gray-900 text-white overflow-hidden border-r border-gray-800"
  >
    {/* Unique Heading */}
    <div className="text-center mt-16  bg-gray-900 text-xl font-bold tracking-wide uppercase">
      💸 Finance Mastery
    </div>
  
    <div className="mt-6 p-6 space-y-4">
      {menuItems.map((item, index) => (
        <motion.div key={index} whileHover={{ x: 10 }} className="block">
          <Link
            to={item.path}
            className="flex items-center px-4 py-2 hover:bg-gray-800 rounded-lg transition-all"
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.text}
          </Link>
        </motion.div>
      ))}
    </div>
  </motion.div>
  
  );
}

export default Sidebar;