
import axiosInstance from '@/app/services/api';
import { AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import Alert from "@/components/Alert";
import IntlCurrencyInput from "react-intl-currency-input"

interface NavbarProps {
    isOpen: boolean;
    title: string;
    setModalOpen: any;
    product?: Product | null
    deleteModal?: boolean;
}

const currencyConfig = {
    locale: "pt-BR",
    formats: {
      number: {
        BRL: {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  };

export default function ModalProduct({ isOpen, setModalOpen, title, product, deleteModal }: NavbarProps) {
    const [alert, setAlert] = useState<[string, "error" | "success"] | null>(null);
    const [file, setFile] = useState(null);

    const {
        register,
        reset,
        handleSubmit,
    } = useForm()
    const session: any = useSession()
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };


    useEffect(() => {
        reset({
            name: product?.name || "",
            description: product?.description || "",
            price: product?.price || "",
            picture: product?.picture || "",
        })
    }, [product]);

    async function handleCreateProduct(data: any) {
        try {
            setAlert(null)
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('price', data.price);
            formData.append('category', data.category);
            formData.append('picture', file);
            await axiosInstance.post('products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${session.data.accessToken}`
                }
            });
            setAlert(["Produto criado com sucesso.", "success"]);
            reset()
            setModalOpen(false);
        } catch (error: any) {
            setAlert([error?.response?.data?.message || 'Erro ao criar usuário', 'error']);
            return
        }

    }
    async function handleEditProduct(data: object) {
        try {
            setAlert(null)
            await axiosInstance.put(`products/${product?.id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.data.accessToken}`
                }
            });
            setAlert(["Produto atualizado com sucesso.", "success"]);
            setModalOpen(false);
            reset()
        } catch (error: any) {
            setAlert([error?.response?.data?.message || 'Erro ao alterar informações do usuário.', 'error']);
            return;
        }

    }

    async function handleDeleteProduct() {
        try {
            setAlert(null)
            await axiosInstance.delete(`products/${product?.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.data.accessToken}`
                }
            });
            setAlert(["Produto deletado com sucesso.", "success"]);
            setModalOpen(false);
            reset()
        } catch (error: any) {
            setAlert([error?.response?.data?.message || 'Erro ao excluir usuário.', 'error']);
            return;
        }

    }

  

    return (
        <>
            {alert ? <Alert message={alert[0]} showAlert={true} alertType={alert[1]} /> : <></>}

            <div className={`fixed z-40 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 ${isOpen ? 'opacity-100 transition-opacity duration-300' : 'opacity-0 transition-opacity duration-300 pointer-events-none'}`}>
                <div className="fixed z-40 w-full max-w-md">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                            {deleteModal ?
                                <div
                                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div
                                        className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div
                                            className="sm:flex sm:items-start">
                                            <div
                                                className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <svg
                                                    className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                                </svg>
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Excluir Produto</h3>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">Tem certeza de que deseja excluir este produto?</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div
                                        className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={handleDeleteProduct}>Excluir</button>
                                        <button type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={setModalOpen}>Cancelar</button>
                                    </div>
                                </div>
                                :
                                <>
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {title}
                                        </h3>
                                        <button onClick={() => { setModalOpen(); reset() }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>

                                    <form className="p-4 md:p-5" onSubmit={handleSubmit(product ? handleEditProduct : handleCreateProduct)} >
                                        <div className="grid gap-4 mb-4 grid-cols-2">
                                            <div className="col-span-2">

                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                                            </div>
                                            <div className="col-span-2">
                                                <label htmlFor="picture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Foto Produto</label>
                                                <input type="file" onChange={handleFileChange} name="picture" id="picture" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nome produto" />
                                            </div>
                                            <div className="col-span-2 sm:col-span-1">
                                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Preço</label>
                                                
                                                <input type="number"  {...register('price')} name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="R$ 20,00" />
                                            </div>
                                            <div className="col-span-2 sm:col-span-1">
                                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoria</label>
                                                <select id="category" {...register('category')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                    <option selected={false} >Selecionar categoria</option>
                                                    <option value="TV">TV/Monitors</option>
                                                    <option value="PC">PC</option>
                                                    <option value="GA">Gaming/Console</option>
                                                    <option value="PH">Phones</option>
                                                </select>
                                            </div>
                                            <div className="col-span-2">
                                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                                                <textarea id="description"  {...register('description')} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Crie uma descrição para o seu produto"></textarea>
                                            </div>

                                        </div>
                                        {product
                                            ?
                                            < button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                                Editar
                                            </button> :

                                            <button type="submit" className="text-white mr-6 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                                Adicionar
                                            </button>
                                        }


                                    </form>
                                </>
                            }
                        </div>
                    </div>
                </div>

            </div >

        </>


    );
}
