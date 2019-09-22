import React from 'react';
import { Form, Input } from 'antd';
import PictureUploadFormItem from '../../components/PictureUploadFormItem';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface ISecondStepProps {
  form: WrappedFormUtils;
  show: boolean;
}

const SecondStep = ({ form, show }: ISecondStepProps) => {
  return (
    <Form style={{ display: show ? 'block' : 'none' }}>
      <Form.Item label='자기소개' colon={false}>
        {form.getFieldDecorator('introduce', {
          rules: [
            {
              min: 0,
              max: 40,
              message: '40자 이하로 입력해주세요.',
            },
          ],
        })(
          <Input.TextArea
            rows={2}
            placeholder='40자 이하의 자기소개 (필수아님)'
          />
        )}
      </Form.Item>
      <PictureUploadFormItem
        form={form}
        label='프로필사진'
        name='profileImage'
        max={1}
        useCrop
        cropOptions={{
          cropWidth: 150,
          cropHeight: 150,
        }}
      />
    </Form>
  );
};

export default SecondStep;
