'use client'

import Alert from "@/components/Alert";
import LoginImage from "@/components/svgs/LoginImage";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { object, ref, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
  const validationSchema = object().shape({
    email: string().email('Email inválido.')
      .required('Por favor, digite seu email'),
    password: string()
      .required('Por favor, digite sua nova senha')
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })
  async function onSubmit(data: any) {
    setError(null)
    const { email, password } = data
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (result?.error) {
      setError('E-mail ou Senha inválido.');
      return
    }
    else {
      router.replace('/home')
    }
  }

  return (
    <div className="bg-gray-900 flex  w-full h-screen roboto-regular">
      {error && <Alert message={error} showAlert={true} alertType="error" />}
      <div className="hidden lg:flex items-center justify-center flex-1">
        <div className="max-w-max text-center">
          <LoginImage />
        </div>
      </div>
      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl mb-6 text-left roboto-medium">Login</h1>
          <form className="w-[400px] flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="p-2 block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              type="text"
              placeholder="Digite seu e-mail"
              {...register('email')}

            />
            {errors.email && (
              <p className="text-xs roboto-medium  text-red-500">{errors.email.message}</p>
            )}
            <div>
              <div className="items-end">
                <div className="text-sm text-right">
                  <a href="forgot-password" className="font-semibold">Esqueceu sua senha?</a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  placeholder="Digite sua senha"
                  {...register('password')}

                  id="password" name="password" type="password" autoComplete="off"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />

                {errors.password && (
                  <p className="text-xs roboto-medium  text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="h-12 rounded-md bg-gray-900 text-white hover:bg-gray-700"
            >
              Entrar
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}