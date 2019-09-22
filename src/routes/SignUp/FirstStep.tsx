import React from 'react';
import { Form, Input } from 'antd';
import { createRule } from '../../libs/validators';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface IFirstStepProps {
  form: WrappedFormUtils;
  checkDupEmail: (email: string) => Promise<{ data: boolean }>;
  checkDupNickname: (email: string) => Promise<{ data: boolean }>;
  show: boolean;
}

const FirstStep = ({
  form,
  checkDupEmail,
  checkDupNickname,
  show,
}: IFirstStepProps) => {
  return (
    <Form style={{ display: show ? 'block' : 'none' }}>
      <Form.Item
        label='이메일주소'
        colon={false}
        required
        extra='비밀번호 찾기를 위해 실제 사용 메일을 입력해주세요.'
      >
        {form.getFieldDecorator('email', {
          rules: createRule({
            required: true,
            customValidator: (_rule: any, value: any, callback: any) => {
              checkDupEmail(value).then(res => {
                const isDup = res;
                if (isDup) {
                  callback('이미 사용중인 이메일주소입니다.');
                } else {
                  callback();
                }
              });
            },
          }).emailRule,
          validateTrigger: 'onBlur',
        })(
          <Input
            size='large'
            type='email'
            placeholder='아이디로 사용할 이메일주소'
          />
        )}
      </Form.Item>
      <Form.Item
        label='비밀번호'
        colon={false}
        required
        extra='비밀번호는 암호화되어 안전하게 보관됩니다.'
      >
        {form.getFieldDecorator('password', {
          rules: createRule({
            required: true,
          }).passwordRule,
        })(
          <Input
            size='large'
            type='password'
            placeholder='6~20자리의 비밀번호'
          />
        )}
      </Form.Item>
      <Form.Item label='비밀번호 확인' colon={false} required>
        {form.getFieldDecorator('passwordConfirm', {
          rules: createRule({
            required: true,
            customValidator: (_rule: any, value: any, callback: any) => {
              if (value && value !== form.getFieldValue('password')) {
                callback('입력하신 비밀번호와 다릅니다.');
              } else {
                callback();
              }
            },
          }).passwordRule,
        })(
          <Input
            size='large'
            type='password'
            placeholder='앞의 비밀번호와 동일한 비밀번호'
          />
        )}
      </Form.Item>
      <Form.Item
        label='닉네임'
        colon={false}
        required
        extra='추후 변경이 불가하므로 신중하게 결정해주세요.'
      >
        {form.getFieldDecorator('nickname', {
          rules: createRule({
            required: true,
            customValidator: (_rule: any, value: any, callback: any) => {
              checkDupNickname(value).then(res => {
                const isDup = res;
                if (isDup) {
                  callback('이미 사용중인 닉네임입니다.');
                } else {
                  callback();
                }
              });
            },
          }).nicknameRule,
          validateTrigger: 'onBlur',
        })(<Input size='large' type='email' placeholder='1~8자의 닉네임' />)}
      </Form.Item>
    </Form>
  );
};

export default FirstStep;
