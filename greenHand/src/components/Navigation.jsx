// import { Home, Package, MessageCircle, User } from 'lucide-react';

// export function Navigation({ activeScreen, setActiveScreen }) {
//   const navItems = [
//     { id: 'home', icon: Home, label: 'Home' },
//     { id: 'inventory', icon: Package, label: 'Inventory' },
//     { id: 'chatbot', icon: MessageCircle, label: 'Chat' },
//     { id: 'profile', icon: User, label: 'Profile' },
//   ];

//   return (
//     <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6">
//       <div className="max-w-md mx-auto">
//         <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl px-6 py-4">
//           <div className="flex items-center justify-between">
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = activeScreen === item.id;
//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => setActiveScreen(item.id)}
//                   className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
//                     isActive ? 'bg-white/30 backdrop-blur-sm' : 'hover:bg-white/10'
//                   }`}
//                 >
//                   <Icon
//                     className={`${isActive ? 'text-white' : 'text-white/70'}`}
//                     size={24}
//                   />
//                   <span className={`text-xs ${isActive ? 'text-white' : 'text-white/70'}`}>
//                     {item.label}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
