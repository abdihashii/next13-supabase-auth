'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BiShow, BiHide } from 'react-icons/bi';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

type FormData = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const SignIn = () => {
  const supabase = createClientComponentClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);

  async function handleSignIn(formData: FormData) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert(error.message);
    }

    alert(JSON.stringify(data, null, 2));
  }

  const onSubmit = handleSubmit((data) => {
    const formData = {
      email: data.email,
      password: data.password,
    };

    handleSignIn(formData);
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="rounded border border-gray-300 px-4 py-2"
            id="email"
            {...register('email')}
          />
          <p className="text-red-500">{errors.email?.message}</p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <div className="relative flex flex-row items-center justify-between">
            <input
              className="w-full rounded border border-gray-300 px-4 py-2"
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
            />
            <button
              className="absolute right-4 text-blue-500 hover:text-blue-600"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BiHide /> : <BiShow />}
            </button>
          </div>
          <p className="text-red-500">{errors.password?.message}</p>
        </div>

        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          type="submit"
        >
          Sign In
        </button>

        <Link href="/sign-up">Don&apos;t have an account? Sign up.</Link>
      </form>
    </div>
  );
};

export default SignIn;
