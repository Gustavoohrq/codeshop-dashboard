
import axiosInstance from '@/app/services/api';
import { AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import Alert from "@/components/Alert";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, ref, string } from 'yup';

interface NavbarProps {
    isOpen: boolean;
    setModalOpen: any;
    user?: User | null
}



export default function ModalPassword({ isOpen, setModalOpen, user }: NavbarProps) {
    const [alert, setAlert] = useState<[string, "error" | "success"] | null>(null);
    const session: any = useSession()
    const validationSchema = object().shape({
        password: string()
            .required('Por favor, digite sua senha atual'),
        passwordNew: string()
            .required('Por favor, confirme sua nova senha'),
        passwordNewConfirmation: string()
            .oneOf([ref('passwordNew'), ''], 'As senhas não coincidem')
            .required('Por favor, confirme sua nova senha'),
    });
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    })

    async function onSubmit(data: any) {
        try {
            delete data.passwordNewConfirmation
            setAlert(null)
            const response: AxiosResponse = await axiosInstance.post(`user/force-reset-password/${session?.data?.user?.id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.data?.access_token}`
                }
            })
            reset()
            setAlert([response?.data?.message, "success"]);
            setModalOpen(false);
        } catch (error: any) {
            setAlert([error?.response?.data?.message || 'Erro ao redefinir senha.', 'error']);
            return
        }
    }
    return (
        <>
            {alert ? <Alert message={alert[0]} showAlert={true} alertType={alert[1]} /> : <></>}
            <div className={`fixed z-40 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 ${isOpen ? 'opacity-100 transition-opacity duration-300' : 'opacity-0 transition-opacity duration-300 pointer-events-none'}`}>
                <div className="fixed z-40 w-full max-w-md">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">


                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Alterar senha
                                </h3>
                                <button onClick={() => { setModalOpen(); reset() }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)} >
                                <label htmlFor="price" className="block  text-sm font-medium text-gray-900 dark:text-white">Senha atual</label>
                                <input
                                    className="bg-gray-50 my-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    type="password"
                                    {...register('password')}
                                    placeholder="Digite sua senha atual"
                                />
                                {errors.password && (
                                    <p className="text-xs roboto-medium mb-3 text-red-500">{errors.password.message}</p>
                                )}
                                <label htmlFor="price" className="block  text-sm font-medium text-gray-900 dark:text-white">Nova senha</label>
                                <input
                                    className="bg-gray-50 my-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    type="password"
                                    {...register('passwordNew')}
                                    placeholder="Digite sua nova senha"
                                />
                                {errors.passwordNew && (
                                    <p className="text-xs roboto-medium mb-3 text-red-500">{errors.passwordNew.message}</p>
                                )}
                                <label htmlFor="price" className="block  text-sm font-medium text-gray-900 dark:text-white">Confirmar nova senha</label>
                                <input
                                    className="bg-gray-50 border my-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    type="password"
                                    {...register('passwordNewConfirmation')}
                                    placeholder="Confirme sua nova senha"
                                />
                                {errors.passwordNewConfirmation && (
                                    <p className="text-xs roboto-medium mb-3 text-red-500">{errors.passwordNewConfirmation.message}</p>
                                )}
                                < button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                                    Salvar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >

        </>


    );
}
