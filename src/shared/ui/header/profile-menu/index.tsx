import React, { useState } from 'react';
import authenticate from '../../../api/auth';
import DropdownMenu from '../../dropdown-menu/dropdown-menu';
import { useAuth } from '../../../hooks/useAuth';
import UserButton from './userButton';
import MenuList from './menuList';
import AuthModal from './authModal';

const ProfileMenu = () => {
  const { user, login, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('+7');
  const [errors, setErrors] = useState({ phone: '', password: '' });
  const [isFocused, setIsFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const userInitial = user ? user.phoneNumber.charAt(1).toUpperCase() : '';

  const validate = () => {
    const newErrors = { phone: '', password: '' };
    if (!phone || phone.length <= countryCode.length) newErrors.phone = 'Enter your phone number';
    if (!password) newErrors.password = 'Enter your password';
    setErrors(newErrors);
    return !newErrors.phone && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const user = await authenticate(phone, password);
      console.log('Successful login:', user);
      login(user);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Authorization error:', error);
      setErrors((prev) => ({ ...prev, phone: 'Login error' }));
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (value: string) => {
    const sanitizedValue = value.replace(/[^0-9]/g, '');
  
    if (sanitizedValue.startsWith(countryCode.replace('+', ''))) {
      setPhone('+' + sanitizedValue);
    } else {
      setPhone(countryCode + sanitizedValue.replace(countryCode.replace('+', ''), ''));
    }
  };

  const handleCountryCodeChange = (newCode: string) => {
    setCountryCode(newCode);
    if (isFocused) {
      setPhone(newCode);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (!phone) {
      setPhone(countryCode);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (phone === countryCode) {
      setPhone('');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPhone('');
    setPassword('');
    setCountryCode('+7');
    setErrors({ phone: '', password: '' });
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <DropdownMenu
        button={
          <UserButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            userInitial={userInitial}
            isLoggedIn={!!user}
          />
        }
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
      >
      <MenuList
        isLoggedIn={!!user}
        onLogout={logout}
        onLoginOpen={() => setIsModalOpen(true)}
        onClose={handleMenuClose}
      />
      </DropdownMenu>
      <AuthModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        phone={phone}
        password={password}
        countryCode={countryCode}
        errors={errors}
        isFocused={isFocused}
        loading={loading}
        onSubmit={handleSubmit}
        onPhoneChange={handlePhoneChange}
        onPasswordChange={setPassword}
        onCountryCodeChange={handleCountryCodeChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </>
  );
};

export default ProfileMenu;
