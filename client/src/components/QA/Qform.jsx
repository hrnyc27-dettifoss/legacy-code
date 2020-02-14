import React, { useState, useEffect } from 'react';
import { Modal, Button, Header, Form } from 'semantic-ui-react';
import axios from 'axios';

const Qform = ({ productName, id, refreshList }) => {
  const [questionInput, setQuestionInput] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [questionInputError, setQuestionInputError] = useState(false);
  const [nicknameInputError, setNicknameInputError] = useState(false);
  const [emailInputError, setEmailInputError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (questionInput === '') {
      setQuestionInputError(true);
    } else if (nicknameInput === '') {
      setNicknameInputError(true);
    } else if (!emailInput.includes('@')) {
      setEmailInputError(true);
    } else {
      postQuestion();
    }
  };

  const postQuestion = () => {
    axios
      .post(`https://3.134.102.30/qa/${id}`, {
        body: questionInput,
        name: nicknameInput,
        email: emailInput
      })
      .then(res => refreshList())
      .then(res => setModalIsOpen(false))
      .catch(err => console.error(err));
  };

  return (
    <>
      <span>
        <button onClick={() => setModalIsOpen(true)}>+ Ask a Question </button>
      </span>
      <Modal
        closeIcon={true}
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      >
        <Header size="large" textAlign="left">
          Ask Your Question
        </Header>
        <Modal.Content>
          <Form>
            <Form.TextArea
              label="Your Question"
              name="questionInput"
              type="text"
              required={true}
              value={questionInput}
              maxLength="1000"
              onChange={e => setQuestionInput(e.target.value)}
              placeholder={`about the ${productName}...`}
              error={
                questionInputError
                  ? {
                      content: 'Please enter a question',
                      pointing: 'below'
                    }
                  : false
              }
            />
            <Form.Input
              type="text"
              label="Nickname"
              required={true}
              maxLength="60"
              placeholder="Example: jackson11!"
              name="nicknameInput"
              value={nicknameInput}
              onChange={e => setNicknameInput(e.target.value)}
              error={
                nicknameInputError
                  ? {
                      content: 'Please enter a nickname',
                      pointing: 'below'
                    }
                  : false
              }
            />
            <small>
              For Privacy reasons, do not use your full name or email address.
            </small>
            <br />
            <Form.Input
              label="Email"
              type="email"
              maxLength="60"
              placeholder="Example: jackson11@gmail.com"
              name="emailInput"
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              required={true}
              error={
                emailInputError
                  ? {
                      content: 'Please enter a valid email address',
                      pointing: 'below'
                    }
                  : false
              }
            />
            <small>For authentication reasons, you will not be emailed.</small>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            type="submit"
            basic
            color="olive"
            content="Submit Question"
            onClick={e => handleSubmit(e)}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default Qform;
