import React, { useCallback, memo } from 'react';
import { Form } from 'antd';
import PictureWall from '../PictureWall';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface IPictureUploadFormItem {
  form: WrappedFormUtils;
  label: string;
  required?: boolean;
  requiredMessage?: string;
  name: string;
  max?: number;
  useCrop?: boolean;
  cropOptions?: any;
  initialValue?: any;
}

const PictureUploadFormItem = ({
  form,
  label,
  required = false,
  requiredMessage = '필수항목입니다.',
  name,
  max = 1,
  useCrop = false,
  cropOptions,
  initialValue,
}: IPictureUploadFormItem) => {
  const normFile = useCallback(e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }, []);

  return (
    <Form.Item label={label} colon={false} required={required}>
      {form.getFieldDecorator(name, {
        valuePropName: 'fileList',
        getValueFromEvent: normFile,
        rules: [
          {
            required: required,
            message: requiredMessage,
          },
        ],
        initialValue,
      })(<PictureWall max={max} cropOptions={cropOptions} useCrop={useCrop} />)}
    </Form.Item>
  );
};

export default memo(PictureUploadFormItem);
