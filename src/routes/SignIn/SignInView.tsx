import React, { useContext, useCallback } from 'react';
import { Card, Button, Form, Input, Icon } from 'antd';
import { Link } from 'react-router-dom';
import ContentWrapper from '../../components/ContentWrapper';
import imgLogo from '../../imgs/logo.png';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import AppContext from '../../contexts/AppContext';
import { useHistory } from 'react-router';
import MessageModal from '../../components/MessageModal/index';
import { MessageModalType } from '../../components/MessageModal/MessageModal';

interface ISignInViewProps {
  form: WrappedFormUtils;
  onClickLogin: () => void;
  isLoading: boolean;
}

const SignInView = ({ form }: ISignInViewProps) => {
  const { userStore } = useContext(AppContext);
  const { signInUser, isLoading } = userStore;
  const history = useHistory();

  const handleOnClickLogin = useCallback(() => {
    form.validateFields(async (err, values) => {
      if (!err) {
        try {
          await signInUser(values);
        } catch (error) {
          return MessageModal({
            type: MessageModalType.error,
            content: error.message,
          });
        }
        if (history.length > 1) history.go(-1);
        else history.push('/');
      }
    });
  }, [form, history, signInUser]);

  return (
    <ContentWrapper>
      <Card
        style={{ width: 450, maxWidth: '100%', padding: 24, margin: 'auto' }}
      >
        <div className='text-center'>
          <Link to='/'>
            <img
              src={imgLogo}
              alt='로고'
              style={{ width: 180, marginBottom: 24 }}
            />
          </Link>
        </div>
        <Form>
          <Form.Item>
            {form.getFieldDecorator('email', {
              rules: [
                { required: true, message: '이메일 주소를 입력해주세요.' },
              ],
            })(
              <Input
                type='email'
                prefix={
                  <Icon type='user' style={{ color: 'rgba(0,0,0,0.25)' }} />
                }
                size='large'
                placeholder='이메일 주소'
                onPressEnter={handleOnClickLogin}
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('password', {
              rules: [{ required: true, message: '비밀번호를 입력해주세요.' }],
            })(
              <Input
                prefix={
                  <Icon type='lock' style={{ color: 'rgba(0,0,0,0.25)' }} />
                }
                size='large'
                type='password'
                placeholder='비밀번호'
                onPressEnter={handleOnClickLogin}
              />
            )}
          </Form.Item>
          <Form.Item>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className='pull-right cursor-pointer'>비밀번호를 잊으셨나요?</a>
            <Button
              type='primary'
              block
              size='large'
              loading={isLoading}
              onClick={handleOnClickLogin}
              icon='login'
            >
              로그인
            </Button>
            <div className='text-center' style={{ paddingTop: 24 }}>
              아직 회원이 아니신가요? <Link to='/sign-up'>회원가입</Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </ContentWrapper>
  );
};

export default Form.create()(SignInView);
