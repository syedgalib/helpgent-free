// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg';
import { useSelector } from 'react-redux';
import checkCircle from 'Assets/svg/icons/check-circle.svg';
import { useEffect } from 'react';
import { useResetStore } from '../../../store/reset';

function Success() {
    const resetStore = useResetStore();

    const { templateOptions } = useSelector((state) => {
        return {
            templateOptions:
                state.chatboxTemplate.template &&
                state.chatboxTemplate.template.options
                    ? state.chatboxTemplate.template.options
                    : {},
        };
    });

    // Init State
    useEffect(function () {
        resetStore();
    }, []);

    return (

            <div className='wpwax-vm-record-send-success wpwax-vm-h-100pr wpwax-vm-d-flex wpwax-vm-flex-direction-column wpwax-vm-text-center wpwax-vm-font-family'>
                <div className='wpwax-vm-record-send-success__top wpwax-vm-text-white'>
                    <span className='wpwax-vm-record-send-success__check'>
                        <ReactSVG src={checkCircle} />
                    </span>

                    <h4 className='wpwax-vm-m-0 wpwax-vm-mt-20 wpwax-vm-font-size-20 wpwax-vm-font-w-bold'>
                        Success!
                    </h4>
                </div>

                <div className='wpwax-vm-flex-grow-1 wpwax-vm-d-flex wpwax-vm-flex-direction-column'>
                    <div className='wpwax-vm-record-send-success__content wpwax-vm-flex-grow-1 wpwax-vm-d-flex wpwax-vm-flex-direction-column wpwax-vm-justify-content-center wpwax-vm-p-30'>
                        <div className="wpwax-vm-record-send-success__content-inner wpwax-vm-custom-scrollbar">
                            <h3 className='wpwax-vm-success__title wpwax-vm-m-0'>
                                {templateOptions.thank_page_title}
                            </h3>

                            {templateOptions.show_thank_page_description && (
                                <p className='wpwax-vm-text-color wpwax-vm-font-size-16 wpwax-vm-font-weight-500'>
                                    {templateOptions.thank_page_description}
                                </p>
                            )}
                        </div>
                    </div>

                    {templateOptions.show_thank_page_cta_button && (
                        <div className='wpwax-vm-record-send-success__bottom wpwax-vm-p-25'>
                            <a
                                href={templateOptions.thank_page_cta_button_url}
                                className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-primary'
                            >
                                {templateOptions.thank_page_cta_button_text}
                            </a>
                        </div>
                    )}
                </div>
            </div>


    );
}

export default Success;
