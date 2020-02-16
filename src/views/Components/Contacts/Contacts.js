import React, {useContext, useState, useEffect} from 'react';
import './style.css';
import {
    Grid,
    Header,
    Image,
    Form,
    Input,
    Message,
    Modal,
    Button,
    Icon
} from 'semantic-ui-react';
import {
    CONTACTS_LINK,
    USER_ID,
    TEMPLATE_ID,
    NAME_LENGTH,
    MINIMUM_MESSAGE_LENGTH,
    MAX_MESSAGE_LENGTH,
    EMAIL_VALIDATION
} from '../../../constants';
import LangContext from '../../../context/LangContext';
import * as emailjs from 'emailjs-com'
import Swal from 'sweetalert2';

// sweet alert


const checkEmail = value => EMAIL_VALIDATION.test(value);
const checkName = value => value && value.length >= NAME_LENGTH;
const checkMessage = value => value && value.length > MINIMUM_MESSAGE_LENGTH && value.length < MAX_MESSAGE_LENGTH;


const Contacts = () => {
    const {contacts} = useContext(LangContext).currentLangData;
    const initForm = {message: '', name: '', email: ''};
    const [form, handleForm] = useState(initForm);
    const [clickedButton, handleClick] = useState(false);
    const [modal, setModal] = useState(false);
    const [statusMessage, setMessage] = useState(null);
    const passValid = checkMessage(form.message) && checkEmail(form.email) && checkName(form.name) && true;

    const [alert, setAlert] = useState(null);

    const statusContent = statusMessage === 200 ? contacts.messageSuccessContent :
        contacts.messageFailContent;

    const fireAlert = () => {
        return Swal.fire({
            icon: statusMessage === 200 ? 'success' : 'error',
            heightAuto: false,
            title: contacts.messageHeader,
            text: statusContent,
            customClass: {
                confirmButton: 'ui green basic button'
            }
        })
    };

    const handleSubmit = (form, passValid) => passValid && sendFeedback({
        message_html: form.message,
        from_name: form.name,
        reply_to: form.email
    });

    const sendFeedback = values => {
        const templateId = TEMPLATE_ID;
        const user_id = USER_ID;
        emailjs.send('gmail', templateId, values, user_id).then(res => {
            setMessage(res.status)
            // setModal(true);

            setAlert(true)
            handleClick(false);
            handleForm(initForm)
        })
            .catch(err => {
                setMessage(err.status)
                // setModal(true);
                setAlert(true);
                handleClick(false);
                handleForm(initForm)
            });
    };


    useEffect(() => {
        if (modal) {
            setTimeout(() => setModal(false), 2000)
        }
    });
    return (
        <div
            id="contacts">
            <Grid>
                <Grid.Column
                    computer={8}
                    mobile={16}
                    stretched
                    className='contacts-image-column'
                >
                    <Image
                        className='image-contacts'
                        src={CONTACTS_LINK}
                    />
                </Grid.Column>
                <Grid.Column
                    computer={8}
                    mobile={16}
                >
                    <Header
                        textAlign='center'
                        className='header-contacts'
                        as='h2'>
                        {contacts.header}
                    </Header>
                    <Form
                        // ref={nameStatus}
                        className='form-contacts'
                    >
                        <Form.Field
                            required
                            className='form-field-name'
                        >
                            <Form.Input
                                required
                                error={clickedButton && !checkName(form.name) && {
                                    content: contacts.nameError
                                }}
                                control={Input}
                                label={contacts.userName}
                                onChange={(e, data) => {
                                    handleForm({
                                        ...form,
                                        name: data.value
                                    })
                                }}
                                value={form.name}
                                placeholder={contacts.userName}
                            />
                        </Form.Field>

                        <Form.Field
                            required
                            className='form-field-email'
                        >
                            <Form.Input
                                required
                                control={Input}
                                error={clickedButton && !checkEmail(form.email) && {
                                    content: contacts.emailError,
                                }}
                                label={contacts.userEmail}
                                onChange={(e, data) => {
                                    handleForm({
                                        ...form,
                                        email: data.value
                                    })
                                }}
                                placeholder={contacts.userEmail}
                                value={form.email}

                            />
                        </Form.Field>

                        <div className='contacts-message-length'>{MAX_MESSAGE_LENGTH - form.message.length}</div>
                        <Form.TextArea
                            required
                            error={clickedButton && !checkMessage(form.message) && {
                                content: contacts.textError,
                                // pointing: 'below',
                            }}
                            onChange={(e, data) => handleForm({...form, message: data.value})}
                            value={form.message}
                            label={contacts.message}
                            placeholder={contacts.message}>

                        </Form.TextArea>

                        <Form.Button
                            onClick={(e, data) => {
                                handleClick(true);
                                handleSubmit(form, passValid)
                                // fireAlert()
                            }}

                            className='contacts-button'
                            type='submit'>
                            {contacts.send}
                        </Form.Button>
                    </Form>

                </Grid.Column>
            </Grid>
        </div>
    );
};

export default Contacts;
