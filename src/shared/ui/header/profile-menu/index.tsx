import React, { useState } from 'react';
import {authenticate, completeProfile} from '../../../api/auth';
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
  const [errors, setErrors] = useState({ phone: '', password: '', name: '' });
  const [isFocused, setIsFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authStep, setAuthStep] = useState<'auth' | 'name'>('auth');
  const [name, setName] = useState('');

  const validate = () => {
    const newErrors = { phone: '', password: '', name: '' };
    if (!phone || phone.length <= countryCode.length) newErrors.phone = 'Enter your phone number';
    if (!password) newErrors.password = 'Enter your password';
    setErrors(newErrors);
    return !newErrors.phone && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (authStep === 'auth') {
      if (!validate()) return;

      setLoading(true);
      try {
        const user = await authenticate(phone, password);
        console.log('Successful login:', user);
        if (!user.name) {
          setAuthStep('name');
          return;
        }
        login(user);
        setIsModalOpen(false);
      } catch (error) {
        console.error('Authorization error:', error);
        setErrors((prev) => ({ ...prev, phone: 'Login error' }));
      } finally {
        setLoading(false);
      }
    }

    if (authStep === 'name') {
      if (!name.trim()) {
        setErrors((prev) => ({ ...prev, name: 'Enter your name' }));
        return;
      }
      setLoading(true);
      try {
        const updatedUser = await completeProfile(name);
        login(updatedUser);
        setIsModalOpen(false);
      } catch (error) {
        console.error('Name saving error:', error);
        setErrors((prev) => ({ ...prev, name: 'Something went wrong' }));
      } finally {
        setLoading(false);
      }
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
    setAuthStep('auth');
    setErrors({ phone: '', password: '', name: '' });
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
            isLoggedIn={!!user}
            user={user}
          />
        }
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
        positionStyle={{ right: '0', top: '58px' }}
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
        name={name}
        setName={setName}
        authStep={authStep}
      />
    </>
  );
};

export default ProfileMenu;
