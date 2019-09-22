import React, { memo } from 'react';
import { Card, Button, Form, Input, Icon } from 'antd';
import { Link } from 'react-router-dom';
import ContentWrapper from '../../components/ContentWrapper';
import imgLogo from '../../imgs/logo.png';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface ISignInViewProps {
  form: WrappedFormUtils;
  onClickLogin: () => void;
  isLoading: boolean;
}

const SignInView = ({ form, onClickLogin, isLoading }: ISignInViewProps) => {
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
                onPressEnter={onClickLogin}
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
                onPressEnter={onClickLogin}
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
              onClick={onClickLogin}
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

export default memo(SignInView);
