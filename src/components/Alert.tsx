import { useState, useEffect } from 'react';

interface AlertProps {
    message: string;
    showAlert: boolean; 
    alertType: 'error' | 'success';
}

const Alert: React.FC<AlertProps> = ({ message, showAlert, alertType }) => {
    const [visible, setVisible] = useState(showAlert);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (visible) {
            timer = setTimeout(() => {
                setVisible(false);
            }, 3000);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [visible]);
    const alertClassName = `fixed block right-0 w-1/4 p-4 m-4 text-base leading-5 text-white rounded-lg roboto-regular ${
        alertType === 'error' ? 'bg-red-500' : 'bg-green-500'
    }`;
    return (
        <>
            {visible && (
                <div className={alertClassName} role="alert">
                    {message}
                </div>
            )}
        </>
    );
};

export default Alert;
