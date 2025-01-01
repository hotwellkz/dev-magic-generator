import React from 'react';

export const Footer = () => {
  return (
    <footer className="border-t p-4 text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} ИИ Генератор Кода. Все права защищены.
    </footer>
  );
};