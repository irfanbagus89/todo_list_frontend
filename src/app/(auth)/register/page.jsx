'use client';

import AuthLayout from '@/layout/AuthLayout/AuthLayout';
import Login from '@/container/Auth/Login';
import Register from '@/container/Auth/Register';

export default function RegisterPage() {
  return <AuthLayout><Register /></AuthLayout>;
}
